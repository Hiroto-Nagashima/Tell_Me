FactoryBot.define do
  factory :parent, class: User do
    association :daycare
    role                         { 0 }
    email                        { Faker::Internet.email }
    password                     { Faker::Internet.password(min_length: 6) }
    uid                          { Faker::Internet.uuid }
    telephone_number             { '09012341234' }
    sequence(:last_name)         { |i| "last_name#{i}" }
    sequence(:first_name)        { |i| "frist_name#{i}" }
    sequence(:gender)            { 0 }
  end

  factory :user do
    association :daycare
    role                         { 1 }
    email                        { Faker::Internet.email }
    password                     { Faker::Internet.password(min_length: 6) }
    uid                          { Faker::Internet.uuid }
    telephone_number             { '09012341234' }
    sequence(:last_name)         { |i| "last_name#{i}" }
    sequence(:first_name)        { |i| "frist_name#{i}" }
    sequence(:self_introduction) { |i| "self_introduction#{i}"  }
  end
end
