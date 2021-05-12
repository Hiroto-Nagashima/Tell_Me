class CreateKidParents < ActiveRecord::Migration[6.1]
  def change
    create_table :kids_parents do |t|
      t.integer :kid_id
      t.integer :parent_id

      t.timestamps
    end
  end
end
