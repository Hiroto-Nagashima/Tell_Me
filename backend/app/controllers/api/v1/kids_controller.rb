module Api
  module V1
    class KidsController < ApplicationController
      def create
        daycare = Daycare.find(params[:daycare_id])
        kid = daycare.kids.build(kid_params)
        if kid.save
          parent = Parent.find_by(uid: params[:params][:uid])
          parent_kid = Parent.kids_parents.build
          parent_kid.kid_id = kid.id
          parent_kid.save!
          render json: {
            status: "ok"
          }
        else
          render json: {
            status: 400,
            message: "入力箇所に誤りがあります"
          }
        end
      end

      def index
        kids = Kids.all
        render json: kid, status: 200
      end

      private

      def kid_params
        params.require(:params).permit(:age, :first_name, :last_name, :gender, :favorite_food, :favorite_play)
      end
    end
  end
end
