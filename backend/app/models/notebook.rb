class Notebook < ApplicationRecord
  belongs_to :kid, optional: true
  validates :body_temperature, :has_bathed, :breakfast, :dinner, :date, presence: true

  validates :body_temperature, numericality: true
end
