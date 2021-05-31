require 'rails_helper'

RSpec.describe "Api::V1::Posts", type: :request do
  describe "GET /daycares/:daycare_id/users/:id/posts/user_posts" do
    it 'ある保育園の先生の投稿を全て取得' do
      daycare = create(:daycare)
      user = create(:user)
      posts = create_list(:post, 10, daycare_id:daycare.id, user_id: user.id)
      get "/api/v1/daycares/#{daycare.id}/users/#{user.id}/posts/user_posts"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.size).to eq 10
    end
  end

end
