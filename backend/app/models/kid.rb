# frozen_string_literal: true

class Kid < ApplicationRecord
  belongs_to :daycare
  has_many :kid_users
  has_many :notebooks
  has_many :notebook_templates
  has_many :users, through: :kid_users

  validates :age, numericality: true
  validates :first_name, :last_name, :age, :gender, :daycare_id, :favorite_food, :favorite_play,
            presence: true

  validates :favorite_food, :favorite_play, length: { maximum: 20 }

  mount_base64_uploader :image, ImageUploader
end
