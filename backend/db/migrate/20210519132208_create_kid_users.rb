# frozen_string_literal: true

class CreateKidUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :kid_users do |t|
      t.integer :user_id
      t.integer :kid_id

      t.timestamps
    end
  end
end
