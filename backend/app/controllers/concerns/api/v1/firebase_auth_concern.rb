# frozen_string_literal: true

require 'jwt'
require 'yaml'
require 'net/http'

module Api
  module V1
    module FirebaseAuthConcern
      extend ActiveSupport::Concern
      include ActionController::HttpAuthentication::Token::ControllerMethods

      CONFIG = YAML.load_file(Rails.root.join('config/firebase_config.yml'))

      ALGORITHM       = 'RS256'
      ISSUER_BASE_URL = 'https://securetoken.google.com/'
      CLIENT_CERT_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'

      def authenticate_token_by_firebase
        authenticate_with_http_token do |token, _|
          return { data: verify_id_token(token) }
        rescue StandardError => e
          return { error: e.message }
        end
        { error: 'token invalid' }
      end

      private

      def verify_id_token(token)
        raise 'Id token must be a String' unless token.is_a?(String)

        full_decoded_token = decode_jwt(token, false)
        errors = validate(full_decoded_token)
        raise errors.join(' / ') if errors.present?

        public_key = fetch_public_keys[full_decoded_token[:header]['kid']]
        unless public_key
          raise <<-ERROR.squish
            Firebase ID token has "kid" claim which does not correspond to a known public key.
            Most likely the ID token is expired, so get a fresh token from your client app and try again.
          ERROR
        end

        # 証明書作成
        certificate = OpenSSL::X509::Certificate.new(public_key)
        # 証明書を使ってトークンをデコード
        decoded_token = decode_jwt(token, true, { algorithm: ALGORITHM, verify_iat: true }, certificate.public_key)

        { uid: decoded_token[:payload]['sub'], decoded_token: decoded_token }
      end

      def decode_jwt(token, verify, options = {}, key = nil)
        begin
          decoded_token = JWT.decode(token, key, verify, options)
        rescue JWT::ExpiredSignature => _e
          raise 'Firebase ID token has expired. Get a fresh token from your client app and try again.'
        rescue StandardError => e
          raise "Firebase ID token has invalid signature. #{e.message}"
        end

        { payload: decoded_token[0], header: decoded_token[1] }
      end

      # 公開鍵を取得
      def fetch_public_keys
        uri = URI.parse(CLIENT_CERT_URL)
        https = Net::HTTP.new(uri.host, uri.port)
        https.use_ssl = true

        res = https.start { https.get(uri.request_uri) }
        data = JSON.parse(res.body)

        return data unless data['error']

        msg = "Error fetching public keys for Google certs: #{data['error']} (#{res['error_description']})"
        raise msg
      end

      # トークンの中身がFirebaseの認証トークンとして正しいフォーマットになっているかをチェック
      def validate(json)
        errors = []
        project_id = CONFIG['project_info']['project_id']
        payload = json[:payload]
        header = json[:header]
        issuer = ISSUER_BASE_URL + project_id

        errors << 'Firebase ID token has no "kid" claim.' unless header['kid']
        unless header['alg'] == ALGORITHM
          errors << "Firebase ID token has incorrect algorithm. Expected '#{ALGORITHM}' but got '#{header['alg']}'"
        end

        errors << 'Firebase ID token has no "sub" (subject) claim.' unless payload['sub'].is_a?(String)
        errors << 'Firebase ID token has an empty string "sub" (subject) claim.' if payload['sub'].empty?
        errors << 'Firebase ID token has "sub" (subject) claim longer than 128 characters.' if payload['sub'].size > 128

        errors
      end
    end
  end
end
