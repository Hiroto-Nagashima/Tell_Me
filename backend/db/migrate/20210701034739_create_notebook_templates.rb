# frozen_string_literal: true

class CreateNotebookTemplates < ActiveRecord::Migration[6.1]
  def change
    create_table :notebook_templates do |t|
      t.integer :kid_id
      t.boolean :has_bathed
      t.text :breakfast
      t.text :dinner

      t.timestamps
    end
  end
end
