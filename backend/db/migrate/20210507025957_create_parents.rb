class CreateParents < ActiveRecord::Migration[6.1]
  def change
    create_table :parents do |t|
      t.string :first_name
      t.string :last_name
      t.integer :gender
      t.string :telephone_number
      t.string :uid

      t.timestamps
    end
  end
end
