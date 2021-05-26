class Records < ActiveRecord::Migration[6.1]
  def change
    drop_table :kid_parents
    drop_table :parents
  end
end
