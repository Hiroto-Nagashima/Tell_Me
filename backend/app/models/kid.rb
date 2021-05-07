class Kid < ApplicationRecord
  belong_to: daycare
  has_many: parents
end
