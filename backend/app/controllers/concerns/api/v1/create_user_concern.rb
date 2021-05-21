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
          render json: { message: '登録が成功しました' }
        else
          render json: user.errors.messages, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:params).permit(:email, :password,:role, :first_name, :last_name, :gender,:daycare_id, :telephone_number)
      end
    end
  end
end
