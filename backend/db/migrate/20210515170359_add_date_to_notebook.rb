class AddDateToNotebook < ActiveRecord::Migration[6.1]
  def change
    add_column :notebooks, :date, :date
  end
end
