require 'rails_helper'
RSpec.describe Notebook, type: :model do

  describe '#presence' do
    context 'success' do
      it '必要項目を全て記入していれば成功' do
        notebook = build_stubbed(:notebook)
        expect(notebook).to be_valid
      end
    end

    # context 'error' do
    #   it '姓が空欄の場合保存に失敗するか' do
    #     kid = build_stubbed(:Ken, first_name: nil)
    #     kid.valid?
    #     expect(kid.errors.messages[:first_name]).to include("can't be blank")
    #   end
    # end
  end
end
