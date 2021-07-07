# frozen_string_literal: true

class AddDaycareIdToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :daycare_id, :integer
  end
end
