class KidParent < ApplicationRecord
  belongs_to :kid, optional: true
  belongs_to :parent, optional: true
end
