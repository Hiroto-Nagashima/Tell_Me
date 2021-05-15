module Api
  module V1
    class ParentsController < ApplicationController
      include FirebaseAuthConcern
      before_action :set_auth, only: %i[create update]

      include CreateUserConcern
      def create
        create_parent(@auth)
      end

      def fetchParentName
        parent = Parent.find_by(uid: params[:uid])
        @parent_name = parent.last_name + parent.first_name
        render json: @parent_name, status: 200
      end

      def fetchParentArray
        @parent = Parent.find_by(uid: params[:uid])
        render json: @parent, status: 200
      end

      private

      def set_auth
        @auth = authenticate_token_by_firebase
      end
    end
  end
end
