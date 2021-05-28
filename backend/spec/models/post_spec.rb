require 'rails_helper'

RSpec.describe Post, type: :model do
  describe '#presence' do
    context 'success' do
      it '必要項目を全て記入していれば成功' do
        post = build_stubbed(:post)
        expect(post).to be_valid
      end
    end

    context 'error' do
      it '投稿の内容が空欄の場合保存に失敗するか' do
        post = build_stubbed(:post, content: nil)
        post.valid?
        expect(post.errors.messages[:content]).to include("can't be blank")
      end

      it '投稿者が空欄の場合保存に失敗するか' do
        post = build_stubbed(:post, poster: nil)
        post.valid?
        expect(post.errors.messages[:poster]).to include("can't be blank")
      end

    end
  end

  describe '#length' do
    it '好きな食べ物が21字以上だとエラーになるか' do
      post = build_stubbed(:post, content: Faker::Base.regexify("[あ]{101}"))
      post.valid?
      expect(post.errors.messages[:content]).to include("is too long (maximum is 100 characters)")
    end
  end
end
