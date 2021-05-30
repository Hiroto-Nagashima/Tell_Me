require 'rails_helper'

RSpec.describe "Api::V1::Kids", type: :request do
  describe "GET /api/v1/daycares/:id/kids/fetch_kids_in_daycare" do
    it 'ある保育園に所属する子供を全て取得' do
      daycare = create(:daycare)
      get "/api/v1/daycares/#{daycare.id}/kids/fetch_kids_in_daycare"
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
    end
  end
end
