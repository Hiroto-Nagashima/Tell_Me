module Api
  module V1
    class UsersController < ApplicationController
      include FirebaseAuthConcern
      before_action :set_auth, only: %i[create update]

      include CreateUserConcern
      def create
        create_user(@auth)
      end

      def fetchUserName
        user = User.find_by(uid: params[:uid])
        @user_name = user.last_name + user.first_name
        render json: @user_name, status: 200
      end

      def fetchUserArray
        @user = User.find_by(uid: params[:uid])
        render json: @user, status: 200
      end

      private

      def set_auth
        @auth = authenticate_token_by_firebase
      end
    end
  end
end
