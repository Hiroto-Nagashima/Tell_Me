# frozen_string_literal: true

FactoryBot.define do
  factory :notebook do
    sequence(:memo)      { |i| "memo#{i}" }
    date                 { Faker::Date.between(from: '2021-09-23', to: '2021-09-25') }
    dinner               { Faker::Food.dish }
    breakfast            { Faker::Food.dish }
    has_bathed           { true }
    body_temperature     { Faker::Number.within(range: 36.0..40.0) }
  end
end
