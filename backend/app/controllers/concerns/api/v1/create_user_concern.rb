# frozen_string_literal: true

module Api
  module V1
    module CreateUserConcern
      extend ActiveSupport::Concern

      def create_user(auth)
        render json: auth, status: :unauthorized and return unless auth[:data]

        uid = auth[:data][:uid]
        user = User.new(user_params)
        user.uid = uid
        if user.save!
          render json: {
            user: {
              id: user.id,
              role: user.role,
              email: user.email,
              daycareId: user.daycare_id,
              password: user.password,
              gender: user.gender,
              firstName: user.first_name,
              lastName: user.last_name,
              telephoneNumber: user.telephone_number
            }
          }, status: 200
        else
          render json: user.errors.messages, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:params).permit(:email, :password, :role, :first_name, :last_name, :gender, :daycare_id,
                                       :telephone_number)
      end
    end
  end
end
