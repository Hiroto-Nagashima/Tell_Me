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
            status: 400,
          }
        end
      end

      def all_posts
      end

      def user_posts
      end

      private

      def post_params
        params.require(:params).permit(:content)
      end
    end
  end
end
