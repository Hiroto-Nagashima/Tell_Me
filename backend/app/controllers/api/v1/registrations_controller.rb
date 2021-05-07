require_dependency 'api/v1/application_controller'
module Api
  module V1
    module Auth
      class RegistrationsController < V1::ApplicationController
        skip_before_action :authenticate_user

        def create
          FirebaseIdToken::Certificates.request
          raise ArgumentError, 'BadRequest Parameter' if payload.blank?
          @parent = Parent.find_or_initialize_by(uid: payload['sub'])
          if @user.save
            render json: @parent, status: :ok
          else
            render json: @parent.errors, status: :unprocessable_entity
          end
        end

        private

        def token_from_request_headers
          request.headers['Authorization']&.split&.last
        end

        def token
          params[:token] || token_from_request_headers
        end

        def payload
          @payload ||= FirebaseIdToken::Signature.verify token
        end
      end
    end
  end
end
