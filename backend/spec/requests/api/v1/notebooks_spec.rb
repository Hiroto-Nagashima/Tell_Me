require 'rails_helper'

RSpec.describe "Api::V1::Notebooks", type: :request do
  describe "GET /api/v1/kids/:id/notebooks/fetch_notebook" do
    it 'ある子供の連絡帳を全て取得' do
      kid = create(:kid)
      notebook = create(:notebook, kid_id: kid.id, date: "2021-04-27")
      get "/api/v1/kids/#{kid.id}/notebooks/fetch_notebook", params:{date: "2021-04-27"}
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['date']).to eq('2021-04-27')
    end
  end

end
