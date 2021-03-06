# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_210_701_034_739) do
  create_table 'daycares', charset: 'utf8mb4', force: :cascade do |t|
    t.string 'name'
    t.string 'address'
    t.string 'telephone_number'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'kid_users', charset: 'utf8mb4', force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'kid_id'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'kids', charset: 'utf8mb4', force: :cascade do |t|
    t.string 'first_name'
    t.string 'last_name'
    t.integer 'gender'
    t.integer 'age'
    t.integer 'daycare_id'
    t.text 'favorite_play'
    t.text 'favorite_food'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'image'
  end

  create_table 'notebook_templates', charset: 'utf8mb4', force: :cascade do |t|
    t.integer 'kid_id'
    t.boolean 'has_bathed'
    t.text 'breakfast'
    t.text 'dinner'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'notebooks', charset: 'utf8mb4', force: :cascade do |t|
    t.integer 'kid_id'
    t.decimal 'body_temperature', precision: 3, scale: 1
    t.boolean 'has_bathed'
    t.text 'dinner'
    t.text 'breakfast'
    t.text 'memo'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.date 'date'
  end

  create_table 'posts', charset: 'utf8mb4', force: :cascade do |t|
    t.integer 'daycare_id'
    t.integer 'user_id'
    t.text 'content'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'poster'
  end

  create_table 'users', charset: 'utf8mb4', force: :cascade do |t|
    t.string 'first_name'
    t.string 'last_name'
    t.string 'email'
    t.integer 'gender'
    t.string 'telephone_number'
    t.string 'password'
    t.integer 'role'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'uid'
    t.integer 'daycare_id'
    t.text 'self_introduction'
    t.string 'image'
  end
end
