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

      def fetchUser
        @user = User.find_by(uid: params[:uid])
        render json: {
          user:{
            id: @user.id,
            role: @user.role,
            email: @user.email,
            daycareId: @user.daycare_id,
            password: @user.password,
            gender: @user.gender,
            firstName: @user.first_name,
            lastName: @user.last_name,
            telephoneNumber: @user.telephone_number
          }
        }, status: 200
      end

      private

      def set_auth
        @auth = authenticate_token_by_firebase
      end
    end
  end
end
