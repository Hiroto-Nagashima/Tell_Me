module Api
  module V1
    class PostsController < ApplicationController
      def create
        daycare = Daycare.find(params[:daycare_id])
        user = User.find(params[:id])
        post = Post.new(post_params)
        post.daycare_id = daycare.id
        post.user_id = user.id
        if post.save!
          render json: {
            status: "ok",
            message: "投稿が完了しました！",
            post: post
          }
        else
          render json: {
            status: "422",
            message: post.errors.full_messages
          }
        end
      end

      def all_posts
        daycare = Daycare.find(params[:id])
        posts = Post.where(daycare_id: daycare.id)
        render json: posts
      end

      def user_posts
        daycare = Daycare.find(params[:daycare_id])
        user = User.find(params[:id])
        posts = Post.where(daycare_id: daycare.id, user_id: user.id)
        render json: posts
      end

      private

      def post_params
        params.require(:params).permit(:content, :poster)
      end
    end
  end
end
