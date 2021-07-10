# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::V1::Notebooks', type: :request do
  describe 'GET /api/v1/kids/:id/notebooks/fetch_notebook' do
    it 'ある子供の連絡帳を全て取得' do
      kid = create(:kid)
      notebook = create(:notebook, kid_id: kid.id, date: '2021-04-27')
      get "/api/v1/kids/#{kid.id}/notebooks/fetch_notebook", params: { date: '2021-04-27' }
      json = JSON.parse(response.body)
      expect(response).to have_http_status(200)
      expect(json['date']).to eq('2021-04-27')
    end
  end

  describe 'POST /api/v1/kids/:id/notebooks/' do
    it 'ある子供の連絡帳を登録' do
      kid = create(:kid)
      valid_params = attributes_for(:notebook)
      expect { post "/api/v1/kids/#{kid.id}/notebooks", params: { notebook: valid_params } }
        .to change(Notebook, :count).by(+1)
      expect(response).to have_http_status(200)
    end
  end

  describe 'PUT /api/v1/kids/:kid_id/notebooks/:id' do
    it 'ある子供の連絡帳を更新' do
      kid = create(:kid)
      target_notebook = create(:notebook, kid_id: kid.id, memo: '普通です', date: '2021-4-26')
      put "/api/v1/kids/#{kid.id}/notebooks/#{target_notebook.id}",
          params: { notebook: { memo: '元気です' } }
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(target_notebook.reload.memo).to eq('元気です')
      expect(json['message']).to eq('更新が完了しました')
    end
  end
end
