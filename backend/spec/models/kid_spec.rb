require 'spec_helper.rb'

RSpec.describe Kid, type: :model do
  describe '入力値の有無' do
    it '名前が空欄の場合保存に失敗するか' do
        kid = Kid.new
        expect(kid). not_to be_valid
        expect(kid.errors.messages[:first_name]).to include("can't be blank")
      end

  end
end
