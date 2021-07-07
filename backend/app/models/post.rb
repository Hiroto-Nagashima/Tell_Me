# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  belongs_to :daycare

  validates :content, :poster, presence: true
  validates :content, length: { maximum: 100 }
end
