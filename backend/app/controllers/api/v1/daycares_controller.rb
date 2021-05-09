module Api
  module V1
    class DaycaresController < ApplicationController
      def show
        daycare = Daycare.find(parems[:id])
        render json: daycare, status: 200
      end
    end
  end
end
