# frozen_string_literal: true

class CreateNotebooks < ActiveRecord::Migration[6.1]
  def change
    create_table :notebooks do |t|
      t.integer :kid_id
      t.integer :body_temperature
      t.boolean :hasBathed
      t.text :dinner
      t.text :breakfast
      t.text :memo

      t.timestamps
    end
  end
end
