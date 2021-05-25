class User < ApplicationRecord
  enum role: { 保護者: 0, 先生: 1 }
  belongs_to :daycare, optional: true
  has_many :kids, through: :kid_users
  has_many :kid_users
  has_many :posts
  validates :first_name, :last_name, :telephone_number, :uid, :email, :password, presence: true

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

  VALID_PHONE_REGEX = /\A\d{10}$|^\d{11}\z/
  validates :telephone_number, format: { with: VALID_PHONE_REGEX }
  mount_base64_uploader :image, ImageUploader
end
