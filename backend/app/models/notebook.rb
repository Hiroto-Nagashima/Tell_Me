class Notebook < ApplicationRecord
  belongs_to :kid, optional: true
  validates  :body_temperature, :has_bath, :breakfast, :dinner, :memo, :date, presence: true
end