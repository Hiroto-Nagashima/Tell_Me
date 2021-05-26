class Daycare < ApplicationRecord
  has_many :kids
  has_many :posts
end
