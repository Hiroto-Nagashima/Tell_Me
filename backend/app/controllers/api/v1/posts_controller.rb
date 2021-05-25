module Api
  module V1
    class PostsController < ApplicationController
      def create
        daycare = Daycare.find(params[:daycare_id])
        user = User.find(params[:user_id])
        post = Post.new
        post.daycare_id = daycare.id
        post.user_id = user.id
        if post.save!
          render json: post, status: "ok"
        else
          render json: {
            status: 400,
          }
      end

      def all_posts
      end

      def user_posts
      end
    end
  end
end
