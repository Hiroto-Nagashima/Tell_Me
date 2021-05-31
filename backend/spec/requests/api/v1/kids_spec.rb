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
      valid_params= attributes_for(:kid)
      expect{ post "/api/v1/kids", params:{params: valid_params }}.to change(Kid, :count).by(+1)
      expect(response).to have_http_status(200)
    end
  end
end
