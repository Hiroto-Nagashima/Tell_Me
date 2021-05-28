require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#presence' do
    context 'success' do
      it '必要項目を全て記入していれば成功' do
        user = build_stubbed(:user)
        expect(user).to be_valid
      end
    end

    context 'error' do
      it '姓が空欄の場合保存に失敗するか' do
        user = build_stubbed(:user, first_name: nil)
        user.valid?
        expect(user.errors.messages[:first_name]).to include("can't be blank")
      end

      it '名が空欄の場合保存に失敗するか' do
        user = build_stubbed(:user, last_name: nil)
        user.valid?
        expect(user.errors.messages[:last_name]).to include("can't be blank")
      end

      it '電話番号が空欄の場合保存に失敗するか' do
        user = build_stubbed(:user, telephone_number: nil)
        user.valid?
        expect(user.errors.messages[:telephone_number]).to include("can't be blank")
      end

      it 'uidが空欄の場合保存に失敗するか' do
        user = build_stubbed(:user, uid: nil)
        user.valid?
        expect(user.errors.messages[:uid]).to include("can't be blank")
      end

      it 'メールアドレスが空欄の場合保存に失敗するか' do
        user = build_stubbed(:user, email: nil)
        user.valid?
        expect(user.errors.messages[:email]).to include("can't be blank")
      end

      it 'パスワードが空欄の場合保存に失敗するか' do
        user = build_stubbed(:user, password: nil)
        user.valid?
        expect(user.errors.messages[:password]).to include("can't be blank")
      end

    end
  end

  describe '#uniqueness' do
    it "登録済みのemailアドレスでは登録に失敗するか" do
      email = Faker::Internet.email
      user = create(:user, email: email)
      user2 = build(:user, email: email)
      user2.valid?
      expect(user2.errors[:email]).to include("has already been taken")
    end
  end

  describe '#length' do
    it 'パスワードが5文字以下だとエラーになるか' do
      password = Faker::Internet.password(min_length: 5, max_length: 5)
      user = build_stubbed(:user, password: password)
      user.valid?
      expect(user.errors.messages[:password]).to include("is too short (minimum is 6 characters)")
    end

    it '自己紹介が21字以上だとエラーになるか' do
      user = build_stubbed(:parent, self_introduction: Faker::Base.regexify("[あ]{81}"))
      user.valid?
      expect(user.errors.messages[:self_introduction]).to include("is too long (maximum is 80 characters)")
    end
  end
end
