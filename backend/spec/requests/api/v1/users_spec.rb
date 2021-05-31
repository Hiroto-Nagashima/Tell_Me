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

  describe "GET /users/fetch_user" do
    it 'uidを参照してユーザーを取得' do
      user = create(:user, first_name: "太郎")
      get "/api/v1/users/fetch_user", params:{uid: user.uid }
      json = JSON.parse(response.body)
      expect(json['user']['firstName']).to eq('太郎')
      expect(response).to have_http_status(200)
    end
  end

  # describe "POST /users" do
  #   it 'ユーザーを新規登録' do
  #   end
  # end

  describe "PUT /users/:id" do
    it 'ユーザーの情報を更新' do
      user = create(:user)
      put "/api/v1/users/#{user.id}", params:{params:{
        first_name: user.first_name,
        last_name: "山本",
        email: user.email,
        telephone_number: user.telephone_number,
      }}
      json = JSON.parse(response.body)
      expect(json['lastName']).to eq('山本')
      expect(response).to have_http_status(200)
    end
  end

end
