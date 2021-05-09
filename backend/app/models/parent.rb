class Parent < ApplicationRecord
  belongs_to :kid, optional: true
end
