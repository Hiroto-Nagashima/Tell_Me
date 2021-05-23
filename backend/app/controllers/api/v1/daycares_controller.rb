module Api
  module V1
    class DaycaresController < ApplicationController
      def index
        daycare = Daycare.find(params[:id])
        kids = Kid.where(daycare_id: daycare.id)
        render json: kids, status: 200
      end
    end
  end
end
