require 'rails_helper'

RSpec.describe "Api::V1::Daycares", type: :request do
  describe "GET /daycares/:id" do
    it 'IDをもとに保育園のレコードを一件取得' do
      daycare = create(:daycare, address:"東京都小平市")
      get "/api/v1/daycares/#{daycare.id}"
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['daycare']['address']).to eq("東京都小平市")
    end
  end

end
