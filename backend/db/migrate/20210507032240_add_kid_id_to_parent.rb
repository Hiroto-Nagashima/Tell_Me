class AddKidIdToParent < ActiveRecord::Migration[6.1]
  def change
    add_column :parents, :kid_id, :integer
  end
end
