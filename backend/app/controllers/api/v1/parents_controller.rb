module Api
  module V1
    class ParentsController < Api::V1::ApplicationController
      def show
        render json: current_parent, status: 200
      end
    end
  end
end
