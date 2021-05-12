module Api
  module V1
    class KidsController < ApplicationController
      def create
        daycare = Daycare.find(params[:daycare_id])
        kid = daycare.kids.build(kid_params)
        if kid.save
          parent = Parent.find_by(uid: params[:params][:uid])
          parent_kid = parent.kid_parents.build
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
        kids_box = []
        parent = Parent.find_by(uid: params[:uid])
        kid_parents = Kid.kid_parents.where(parent_id: parent.id)
        kid_parents.each do |kid_parent|
          kids_box << Kid.find(kid_parent.kid_id)
        end
        render json: kids_box, status: 200
      end

      private

      def kid_params
        params.require(:params).permit(:age, :first_name, :last_name, :gender, :favorite_food, :favorite_play)
      end
    end
  end
end
