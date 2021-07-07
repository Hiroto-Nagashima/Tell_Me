# frozen_string_literal: true

class KidUser < ApplicationRecord
  belongs_to :kid, optional: true
  belongs_to :user, optional: true
end
