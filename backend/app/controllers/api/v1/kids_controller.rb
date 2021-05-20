module Api
  module V1
    class KidsController < ApplicationController
      def create
        kid = Kid.new(kid_params)
        if kid.save
          user = User.find_by(uid: params[:params][:uid])
          kid_user = user.kid_users.build
          kid_user.kid_id = kid.id
          kid_user.save!
          render json: {
            kid: kid
          }
        else
          render json: {
            status: 400,
            message: "入力箇所に誤りがあります"
          }
        end
      end

      def index
        user = User.find_by(uid: params[:uid])
        if user.kid_users.present?
          kids_box = []
          kid_users = user.kid_users
          kid_users.each do |kid_user|
            kids_box << Kid.find(kid_user.kid_id)
          end
          render json: kids_box, status: 200
        else
          render json: {
            message: "子供が未登録です"
          }
        end
      end

      def show
        kid = Kid.find(params[:id])
        render json: kid, status: 200
      end

      def registerImage
        kid = Kid.find(params[:id])
        kid.image = params[:image]
        if kid.save!
          render json: {
            status: "ok",
          }
        else
          render json: {
            status: 400,
          }
        end
      end

      private

      def kid_params
        params.require(:params).permit(:age, :first_name, :daycare_id, :last_name, :gender, :favorite_food, :favorite_play)
      end
    end
  end
end
