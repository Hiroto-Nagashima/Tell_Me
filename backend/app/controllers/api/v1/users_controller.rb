# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      include FirebaseAuthConcern
      before_action :set_auth, only: %i[create update]

      include CreateUserConcern

      def create
        create_user(@auth)
      end

      def update
        user = User.find(params[:id])
        if user.update!(user_params)
          render json: {
            message: '更新が完了しました',
            user: {
              id: user.id,
              role: user.role,
              email: user.email,
              image: user.image,
              gender: user.gender,
              firstName: user.first_name,
              lastName: user.last_name,
              selfIntroduction: user.self_introduction,
              telephoneNumber: user.telephone_number
            }
          }, status: 200
        else
          render status: 400
        end
      end

      def fetch_user
        user = User.find_by(uid: params[:uid])
        render json: {
          user: {
            id: user.id,
            role: user.role,
            email: user.email,
            image: user.image,
            daycareId: user.daycare_id,
            password: user.password,
            gender: user.gender,
            firstName: user.first_name,
            lastName: user.last_name,
            telephoneNumber: user.telephone_number,
            selfIntroduction: user.self_introduction
          }
        }, status: 200
      end

      def register_image
        user = User.find(params[:id])
        user.image = params[:image]
        if user.save
          render json: {
            message: '画像を登録しました',
            severity: 'success'
          }, status: 200
        else
          render json: {
            message: '画像を登録に失敗しました',
            severity: 'error'
          }, status: 400
        end
      end

      private

      def user_params
        params.require(:params).permit(:email, :password, :role, :first_name, :last_name, :gender, :daycare_id,
                                       :telephone_number, :self_introduction)
      end

      def set_auth
        @auth = authenticate_token_by_firebase
      end
    end
  end
end
