# frozen_string_literal: true

class AddImageToKid < ActiveRecord::Migration[6.1]
  def change
    add_column :kids, :image, :string
  end
end
