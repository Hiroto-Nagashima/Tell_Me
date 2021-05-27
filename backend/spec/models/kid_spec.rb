require 'spec_helper.rb'

RSpec.describe Kid, type: :model do

  describe 'presence' do
    context 'success' do
      let!(:kid) { FactoryBot.create(:kid) }
      it '名前、年齢、保育園名、メールアドレスがあれば成功' do
        expect(kid).to be_valid
        kid.save
      end
    end

    context 'error' do
      it '姓が空欄の場合保存に失敗するか' do
        kid = Kid.new(first_name: nil)
        expect(kid). not_to be_valid
        expect(kid.errors.messages[:first_name]).to include("can't be blank")
      end

      it '名が空欄の場合保存に失敗するか' do
        kid = Kid.new(last_name: nil)
        expect(kid). not_to be_valid
        expect(kid.errors.messages[:last_name]).to include("can't be blank")
      end

      it '年齢が空欄の場合保存に失敗するか' do
        kid = Kid.new(age: nil)
        expect(kid). not_to be_valid
        expect(kid.errors.messages[:age]).to include("can't be blank")
      end

      it '性別が空欄の場合保存に失敗するか' do
        kid = Kid.new(gender: nil)
        expect(kid). not_to be_valid
        expect(kid.errors.messages[:gender]).to include("can't be blank")
      end

      it '保育園のIDが空欄の場合保存に失敗するか' do
        kid = Kid.new(daycare_id: nil)
        expect(kid). not_to be_valid
        expect(kid.errors.messages[:daycare_id]).to include("can't be blank")
      end

      it 'お気に入りの食べ物が空欄の場合保存に失敗するか' do
        kid = Kid.new(favorite_food: nil)
        expect(kid). not_to be_valid
        expect(kid.errors.messages[:favorite_food]).to include("can't be blank")
      end

      it 'お気に入りの遊びが空欄の場合保存に失敗するか' do
        kid = Kid.new(favorite_play: nil)
        expect(kid). not_to be_valid
        expect(kid.errors.messages[:favorite_play]).to include("can't be blank")
      end

    end
  end
end
