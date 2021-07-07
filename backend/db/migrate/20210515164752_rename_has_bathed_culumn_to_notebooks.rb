# frozen_string_literal: true

class RenameHasBathedCulumnToNotebooks < ActiveRecord::Migration[6.1]
  def change
    rename_column :notebooks, :hasBathed, :has_bathed
  end
end
