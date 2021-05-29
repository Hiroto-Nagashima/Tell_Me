class Notebook < ApplicationRecord
  belongs_to :kid, optional: true
  validates :body_temperature, :breakfast, :dinner, :date, presence: true
end
