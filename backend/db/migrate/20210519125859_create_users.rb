# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.integer :gender
      t.string :telephone_number
      t.string :password
      t.integer :role

      t.timestamps
    end
  end
end
