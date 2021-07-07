# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Posts', type: :request do
  describe 'GET /daycares/:daycare_id/users/:id/posts' do
    it 'ある保育園の先生の投稿を全て取得' do
      daycare = create(:daycare)
      user = create(:user)
      posts = create_list(:post, 10, daycare_id: daycare.id, user_id: user.id)
      get "/api/v1/daycares/#{daycare.id}/users/#{user.id}/posts"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.size).to eq 10
    end
  end

  describe 'GET /daycares/:id/posts' do
    it 'ある保育園の投稿を全て取得' do
      daycare = create(:daycare)
      posts = create_list(:post, 20, daycare_id: daycare.id)
      get "/api/v1/daycares/#{daycare.id}/posts"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(json.size).to eq 20
    end
  end

  describe 'POST /daycares/:daycare_id/users/:id/posts' do
    it 'ある保育園の先生の投稿を作成' do
      daycare = create(:daycare)
      user = create(:user)
      user_name = user.last_name + user.first_name
      expect do
        post "/api/v1/daycares/#{daycare.id}/users/#{user.id}/posts",
             params: { params: { poster: user_name, content: '今日はお散歩に行きました' } }
      end
        .to change(Post, :count).by(+1)
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
    end
  end
end
