module Api
  module V1
    class KidsController < ApplicationController
      def create
        kid = Kid.new(kid_params)
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
        kid_parents = parent.kid_parents
        kid_parents.each do |kid_parent|
          kids_box << Kid.find(kid_parent.kid_id)
        end
        render json: kids_box, status: 200
      end

      private

      def kid_params
        params.require(:params).permit(:age, :first_name, :daycare_id, :last_name, :gender, :favorite_food, :favorite_play)
      end
    end
  end
end
