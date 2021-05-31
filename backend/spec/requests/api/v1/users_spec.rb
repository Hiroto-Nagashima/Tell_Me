require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do

  describe "POST /users/:id/register_image" do
    let(:params) { { image: 'image.jpeg' } }
    it 'ユーザーのプロフィール画像を登録' do
      user = create(:user)
      post "/api/v1/users/#{user.id}/register_image", params:{image: params }
      expect(user.image).not_to eq(nil)
      expect(response).to have_http_status(200)
    end
  end

end
