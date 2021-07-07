# frozen_string_literal: true

class User < ApplicationRecord
  enum role: { 保護者: 0, 先生: 1 }

  belongs_to :daycare, optional: true
  has_many :kids, through: :kid_users
  has_many :kid_users
  has_many :posts

  VALID_PHONE_REGEX = /\A\d{10}$|^\d{11}\z/
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :telephone_number, format: { with: VALID_PHONE_REGEX }
  validates :email, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :first_name, :last_name, :telephone_number, :uid, :email, :password, presence: true

  validates :password, length: { minimum: 6 }
  validates :self_introduction, length: { maximum: 80 }

  mount_base64_uploader :image, ImageUploader
end
