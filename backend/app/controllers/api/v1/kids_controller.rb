# frozen_string_literal: true

module Api
  module V1
    class KidsController < ApplicationController

      before_action :set_kid ,only: [:update, :show, :register_image]

      def create
        kid = Kid.new(kid_params)
        if kid.save!
          user = User.find_by(uid: params[:params][:uid])
          kid_user = user.kid_users.build
          kid_user.kid_id = kid.id
          kid_user.save!
          render json: {
            kid: kid
          }
        else
          render json: {
            message: kid.errors.full_messages
          }, status: 422
        end
      end

      def update
        if @kid.update!(kid_params)
          render json: {
            message: '更新が完了しました',
            kid: {
              age: @kid.age,
              gender: @kid.gender,
              lastName: @kid.last_name,
              firstName: @kid.first_name,
              daycareId: @kid.daycare_id,
              favoritePlay: @kid.favorite_play,
              favoriteFood: @kid.favorite_food
            }
          }, status: 200
        else
          render status: 400
        end
      end

      def show
        render json: {
          kid: {
            id: @kid.id,
            age: @kid.age,
            gender: @kid.gender,
            lastName: @kid.last_name,
            firstName: @kid.first_name,
            daycareId: @kid.daycare_id,
            favoritePlay: @kid.favorite_play,
            favoriteFood: @kid.favorite_food
          }
        }, status: 200
      end

      def kids_of_parent
        user = User.find(params[:id])
        if user.kid_users.present?
          kids_box = []
          kid_users = user.kid_users
          kid_users.each do |kid_user|
            kids_box << Kid.find(kid_user.kid_id)
          end
          render json: kids_box, status: 200
        else
          render json: {
            message: '子供が未登録です'
          }
        end
      end

      # ある保育園の全ての子供とその両親、連絡帳を取得
      def kids_in_daycare
        daycare = Daycare.find(params[:id])
        kids = Kid.where(daycare_id: daycare.id).includes(:notebooks, kid_users: :user)
        arr = []
        kids.each do |kid|
          hash = { 'notebook' => nil, 'mother' => nil, 'father' => nil, 'kid' => nil }
          mother = nil
          father = nil
          notebook = kid.notebooks.last
          parents = kid.kid_users
          parents.each do |parent|
            user = parent.user
            if user.gender.zero?
              mother = user
            else
              father = user
            end
          end
          hash['notebook'] = notebook
          hash['mother'] = mother
          hash['father'] = father
          hash['kid'] = kid
          arr << hash
        end
        render json: arr, status: 200
      end

      def register_image
        @kid.image = params[:image]
        if @kid.save!
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

      def kid_params
        params.require(:params).permit(:age, :first_name, :daycare_id, :last_name, :gender, :favorite_food,
                                       :favorite_play)
      end

      def set_kid
        @kid = Kid.find(params[:id])
      end
    end
  end
end
