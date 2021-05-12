class RemoveKidIdFromParent < ActiveRecord::Migration[6.1]
  def change
    remove_column :parents, :kid_id
  end
end
