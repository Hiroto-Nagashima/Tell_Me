module Api
  module V1
    class PostsController < ApplicationController
      def create
        daycare = Daycare.find(params[:daycare_id])
        teacher = User.find(params[:user_id])
      end

      def all_posts
      end

      def user_posts
      end
    end
  end
end
