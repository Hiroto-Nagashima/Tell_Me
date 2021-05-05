class ChangeDataTelephoneNumberDaycares < ActiveRecord::Migration[6.1]
  def change
    change_column :daycares, :telephone_number, :string
  end
end
