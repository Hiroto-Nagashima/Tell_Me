# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    association :user
    association :daycare
    sequence(:poster)      { |i| "poster#{i}" }
    sequence(:content)     { |i| "content#{i}" }
  end
end
