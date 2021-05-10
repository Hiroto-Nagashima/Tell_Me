class Parent < ApplicationRecord
  belongs_to :kid, optional: true

  validates :first_name, :last_name, :telephone_number, :gender, :uid, :email, :password, presence: true

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

　VALID_PHONE_REGEX = /\A\d{10}$|^\d{11}\z/
　validates :telephone_number, format: { with: VALID_PHONE_REGEX }

end
