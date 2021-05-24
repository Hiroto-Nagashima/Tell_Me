class Kid < ApplicationRecord
  belongs_to :daycare
  has_many :users, through: :kid_users
  has_many :kid_users
  has_many :notebooks
  validates :first_name, :last_name, :age, :gender, :daycare_id, :favorite_food, :favorite_play, presence: true
  validates :age, :daycare_id, numericality: true
  mount_base64_uploader :image, ImageUploader
end
