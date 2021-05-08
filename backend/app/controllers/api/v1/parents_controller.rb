module Api
  module V1
    class ParentsController < Api::V1::ApplicationController
      include FirebaseAuthConcern
      before_action :set_auth, only: %i[create update]

      include CreateUserConcern
      def create
        byebug
        create_user!(@auth)
      end

      def show
        render json: current_parent, status: 200
      end

      private

      def set_auth
        byebug
        @auth = authenticate_token_by_firebase
      end
    end
  end
end
