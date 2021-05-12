class ChangeKidsParentsToKidParents < ActiveRecord::Migration[6.1]
  def change
    rename_table :kids_parents, :kid_parents
  end
end
