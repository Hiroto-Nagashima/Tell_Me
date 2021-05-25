module Api
  module V1
    class DaycaresController < ApplicationController
      def postAnnouncement
        daycare = Daycare.find(params[:daycare_id])
        teacher = User.find(params[:user_id])
      end

      def show
        daycare = Daycare.find(params[:id])
        render json: {
            status: "ok",
            daycare:{
            id: daycare.id,
            name: daycare.name,
            address: daycare.address,
            telephoneNumber: daycare.telephone_number,
            }
        }
      end
      def index
        daycare = Daycare.find(params[:id])
        kids = Kid.where(daycare_id: daycare.id)
        arr = []
        kids.each do |kid|
          hash= {"notebook" => nil, "mother" => nil, "father" => nil, "kid" => nil}
          mother = nil
          father = nil
          notebook = kid.notebooks.last
          parents = kid.kid_users.where(kid_id: kid.id)
          parents.each do |parent|
            user = User.find(parent.user_id)
            if user.gender == 0
              mother = user
            else
              father = user
            end
          end
          hash["notebook"] = notebook
          hash["mother"] = mother
          hash["father"] = father
          hash["kid"] = kid
          arr << hash
        end
        render json: arr, status: 200
      end
    end
  end
end
