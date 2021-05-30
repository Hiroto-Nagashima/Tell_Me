FactoryBot.define do
  factory :kid do
    association :daycare
    sequence(:age) { |i| i }
    sequence(:gender) { |i| i }
    sequence(:last_name) { |i| "last_name#{i}" }
    sequence(:first_name) { |i| "frist_name#{i}" }
    sequence(:favorite_food) { |i| "favorite_food#{i}" }
    sequence(:favorite_play) { |i| "favorite_play#{i}" }
  end
end
