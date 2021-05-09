module Api
  module V1
    module CreateUserConcern
      extend ActiveSupport::Concern

      def create_user(auth)
        render json: auth, status: :unauthorized and return unless auth[:data]

        uid = auth[:data][:uid]
        # render json: { message: 'すでに登録されています' } and return if User.find_by(uid: uid)

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
        params.permit(:email, :password, :first_name, :last_name, :gender, :telephone_number, :uid)
      end
    end
  end
end
