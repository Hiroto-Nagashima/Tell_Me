module Api
  module V1
    class DaycaresController < ApplicationController
      def show
        daycare = Daycare.find(params[:id])
        render json: {
            daycare:{
            id: daycare.id,
            name: daycare.name,
            address: daycare.address,
            telephoneNumber: daycare.telephone_number,
            }
        }, status: 200
      end
    end
  end
end
