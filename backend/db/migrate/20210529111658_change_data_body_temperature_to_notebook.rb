class ChangeDataBodyTemperatureToNotebook < ActiveRecord::Migration[6.1]
  def change
  change_column :notebooks, :body_temperature, :decimal, precision: 3, scale: 1
  end
end
