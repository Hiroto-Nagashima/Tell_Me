# frozen_string_literal: true

class CreateDaycares < ActiveRecord::Migration[6.1]
  def change
    create_table :daycares do |t|
      t.string :name
      t.string :address
      t.integer :telephone_number

      t.timestamps
    end
  end
end
