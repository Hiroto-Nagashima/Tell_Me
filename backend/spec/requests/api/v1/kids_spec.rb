require 'rails_helper'

RSpec.describe "Api::V1::Kids", type: :request do
  describe "GET /api/v1/daycares/:id/kids" do
    it 'ある保育園に所属する子供を全て取得' do
      daycare = create(:daycare)
      kids = create_list(:kid, 10, daycare_id:daycare.id)
      get "/api/v1/daycares/#{daycare.id}/kids"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.size).to eq 10
    end
  end

  describe "GET /api/v1/users/:id/kids" do
    it 'ある親の子供を全て取得' do
      parent = create(:parent)
      Ken = create(:kid, id: 1)
      Ken_parent = KidUser.new({user_id: parent.id, kid_id: Ken.id})
      Ken_parent.save

      Takeshi = create(:kid, id: 2)
      Takashi_user = KidUser.new({user_id: parent.id, kid_id: Takeshi.id})
      Takashi_user.save

      get "/api/v1/users/#{parent.id}/kids"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.size).to eq 2
    end
  end

  describe "GET /kids/:id/fetch_posts" do
    it 'ある子供の保育園の投稿を全て取得' do
      daycare = create(:daycare)
      kid = create(:kid, daycare_id: daycare.id)
      posts = create_list(:post, 10 , daycare_id: daycare.id)

      get "/api/v1/kids/#{kid.id}/fetch_posts"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.size).to eq 10
    end
  end

  describe "POST /kids/:id/register_image" do
    let(:params) { { image: 'image.jpeg' } }
    it 'ある子供のプロフィール画像を登録' do
      kid = create(:kid)
      post "/api/v1/kids/#{kid.id}/register_image", params:{image: params }
      expect(kid.image).not_to eq(nil)
      expect(response).to have_http_status(200)
    end
  end

  describe "POST /kids" do
    it '子供を新規登録' do
      daycare = create(:daycare)
      user = create(:parent)
      expect{post "/api/v1/kids", params:{params:{
                first_name: "太郎",
                last_name: "山田",
                favorite_food: "たこ焼き",
                favorite_play: "球投げ",
                age: 1,
                daycare_id: user.daycare_id,
                gender: 1,
                uid: user.uid
      }
      }}.to change(Kid, :count).by(+1)
      expect(response).to have_http_status(200)
    end
  end

  describe "PUT /kids/:id" do
    it '子供の情報更新' do
      daycare = create(:daycare)
      kid = create(:kid)
      put "/api/v1/kids/#{kid.id}", params:{params:{
                first_name: "太郎",
                last_name: "山田",
                favorite_food: "たこ焼き",
                favorite_play: "球投げ",
                age: 1,
                daycare_id: daycare.id,
                gender: 1
      }}
      expect(response).to have_http_status(200)
      json = JSON.parse(response.body)
      expect(json['kid']['firstName']).to eq('太郎')
    end
  end

  describe "GET /kids/:id" do
    it 'IDに紐づいた子供のレコードを一件取得' do
      kid = create(:kid, first_name: "Takeshi")
      get "/api/v1/kids/#{kid.id}"
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(response.body).to include(kid.first_name)
    end
  end

end
