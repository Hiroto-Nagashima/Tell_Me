class ChangeDataFavoritePlayToParents < ActiveRecord::Migration[6.1]
  def change
    change_column :kids, :favorite_food, :text
    change_column :kids, :favorite_play, :text
  end
end
