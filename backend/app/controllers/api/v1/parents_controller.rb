module Api
  module V1
    class ParentsController < ApplicationController
      include FirebaseAuthConcern
      before_action :set_auth, only: %i[create update]

      include CreateUserConcern
      def create
        create_parent(@auth)
      end

      def fetchParent
        parent = Parent.find_by(uid: params[:uid])
        render json: parent, status: 200
      end

      private

      def set_auth
        @auth = authenticate_token_by_firebase
      end
    end
  end
end
