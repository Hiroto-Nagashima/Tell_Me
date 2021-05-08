class Kid < ApplicationRecord
  belongs_to :daycare
  has_many :parents
end
