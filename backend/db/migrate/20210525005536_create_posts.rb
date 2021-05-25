class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.integer :daycare_id
      t.integer :user_id
      t.text :content

      t.timestamps
    end
  end
end
