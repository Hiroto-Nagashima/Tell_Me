require 'rails_helper'
RSpec.describe Notebook, type: :model do

  describe '#presence' do
    context 'success' do
      it '必要項目を全て記入していれば成功' do
        notebook = build_stubbed(:notebook)
        expect(notebook).to be_valid
      end
    end

    context 'error' do
      it '体温が空欄の場合保存に失敗するか' do
        notebook = build_stubbed(:notebook, body_temperature: nil)
        notebook.valid?
        expect(notebook.errors.messages[:body_temperature]).to include("can't be blank")
      end

      it '朝食が空欄の場合保存に失敗するか' do
        notebook= build_stubbed(:notebook, breakfast: nil)
        notebook.valid?
        expect(notebook.errors.messages[:breakfast]).to include("can't be blank")
      end

      it '夕食が空欄の場合保存に失敗するか' do
        notebook = build_stubbed(:notebook, dinner: nil)
        notebook.valid?
        expect(notebook.errors.messages[:dinner]).to include("can't be blank")
      end

      it '日付が選択されていない場合保存に失敗するか' do
        notebook = build_stubbed(:notebook, date: nil)
        notebook.valid?
        expect(notebook.errors.messages[:date]).to include("can't be blank")
      end

      it '入浴の有無が選択されていない場合保存に失敗するか' do
        notebook = build_stubbed(:notebook, has_bathed: nil)
        notebook.valid?
        expect(notebook.errors.messages[:has_bathed]).to include("can't be blank")
      end
    end
  end
end
