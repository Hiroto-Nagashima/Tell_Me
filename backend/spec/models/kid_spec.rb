require 'spec_helper.rb'

RSpec.describe Kid, type: :model do

  describe '#presence' do
    context 'success' do
      it '必要項目を全て記入していれば成功' do
        kid = build_stubbed(:kid)
        expect(kid).to be_valid
      end
    end

    context 'error' do
      it '姓が空欄の場合保存に失敗するか' do
        kid = build_stubbed(:kid, first_name: nil)
        kid.valid?
        expect(kid.errors.messages[:first_name]).to include("can't be blank")
      end

      it '名が空欄の場合保存に失敗するか' do
        kid = build_stubbed(:kid, last_name: nil)
        kid.valid?
        expect(kid.errors.messages[:last_name]).to include("can't be blank")
      end

      it '年齢が空欄の場合保存に失敗するか' do
        kid = build_stubbed(:kid, age: nil)
        kid.valid?
        expect(kid.errors.messages[:age]).to include("can't be blank")
      end

      it '性別が空欄の場合保存に失敗するか' do
        kid = build_stubbed(:kid, gender: nil)
        kid.valid?
        expect(kid.errors.messages[:gender]).to include("can't be blank")
      end

      it '保育園のIDが空欄の場合保存に失敗するか' do
        kid = build_stubbed(:kid, daycare_id: nil)
        kid.valid?
        expect(kid.errors.messages[:daycare_id]).to include("can't be blank")
      end

      it 'お気に入りの食べ物が空欄の場合保存に失敗するか' do
        kid = build_stubbed(:kid, favorite_food: nil)
        kid.valid?
        expect(kid.errors.messages[:favorite_food]).to include("can't be blank")
      end

      it 'お気に入りの遊びが空欄の場合保存に失敗するか' do
        kid = build_stubbed(:kid, favorite_play: nil)
        kid.valid?
        expect(kid.errors.messages[:favorite_play]).to include("can't be blank")
      end

    end
  end

  describe '#length' do
    it '好きな遊びが21字以上だとエラーになるか' do
      kid = build_stubbed(:kid, favorite_play: Faker::Base.regexify("[あ]{21}"))
      kid.valid?
      expect(kid.errors.messages[:favorite_play]).to include("is too long (maximum is 20 characters)")
    end

    it '好きな食べ物が21字以上だとエラーになるか' do
      kid = build_stubbed(:kid, favorite_food: Faker::Base.regexify("[あ]{21}"))
      kid.valid?
      expect(kid.errors.messages[:favorite_food]).to include("is too long (maximum is 20 characters)")
    end
  end
end
