FactoryBot.define do
  factory :daycare do
    sequence(:name) { |i| "daycare#{i}" }
    sequence(:address) { |i| "address#{i}" }
    sequence(:telephone_number) { |i| i }
  end
end
