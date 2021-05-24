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
            image: @user.image,
            daycareId: @user.daycare_id,
            password: @user.password,
            gender: @user.gender,
            firstName: @user.first_name,
            lastName: @user.last_name,
            telephoneNumber: @user.telephone_number,
            selfIntroduction: @user.self_introduction
          }
        }, status: 200
      end

      def registerImage
        user = User.find(params[:id])
        user.image = params[:image]
        if user.save!
          render json: {
            status: "ok",
          }
        else
          render json: {
            status: 400,
          }
        end
      end
      def update
        user = User.find(params[:id])
        if user.update(user_params)
          render json: {
            status: "ok",
            message: "更新が完了しました",
            selfIntroduction: user.self_introduction
          }
        else
          render json: {
            status: 400,
          }
        end
      end
      private
      def user_params
        params.require(:params).permit(:email, :password, :role, :first_name, :last_name, :gender, :daycare_id, :telephone_number, :self_introduction)
      end

      def set_auth
        @auth = authenticate_token_by_firebase
      end
    end
  end
end
