class AddPasswordToParent < ActiveRecord::Migration[6.1]
  def change
    add_column :parents, :password, :string
    add_column :parents, :email, :string
  end
end
