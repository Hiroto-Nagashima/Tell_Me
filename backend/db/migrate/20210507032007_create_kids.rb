# frozen_string_literal: true

class CreateKids < ActiveRecord::Migration[6.1]
  def change
    create_table :kids do |t|
      t.string :first_name
      t.string :last_name
      t.integer :gender
      t.integer :age
      t.integer :daycare_id
      t.string :favorite_play
      t.string :favorite_food

      t.timestamps
    end
  end
end
