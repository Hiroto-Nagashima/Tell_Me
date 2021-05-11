module Api
  module V1
    module CreateUserConcern
      extend ActiveSupport::Concern

      def create_parent(auth)
        render json: auth, status: :unauthorized and return unless auth[:data]
        uid = auth[:data][:uid]
        parent = Parent.new(parent_params)
        parent.uid = uid
        if parent.save!
          render json: { message: '登録が成功しました' }
        else
          render json: user.errors.messages, status: :unprocessable_entity
        end
      end

      private

      def parent_params
        params.require(:params).permit(:email, :password, :first_name, :last_name, :gender, :telephone_number)
      end
    end
  end
end
