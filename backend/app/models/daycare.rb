# frozen_string_literal: true

class Daycare < ApplicationRecord
  has_many :kids
  has_many :posts
end
