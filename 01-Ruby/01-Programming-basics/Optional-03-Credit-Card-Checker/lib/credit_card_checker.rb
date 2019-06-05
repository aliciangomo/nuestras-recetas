def visa?(card)
  # TODO: A visa card starts with a 4
  return card[0] == 4.to_s
end

def mastercard?(card)
  # TODO: A mastercard card starts with a 5
  return card[0] == 5.to_s
end

def valid_card?(card)
  # TODO: Implement the validator. Return true if the card is valid, false otherwise.
  numbers = card.split('.').map(&:to_i)
  numbers.each_with_index do |number, index|
    next_number = number[index+2]
    next_number*2
end

puts visa?("4567 3465 2387 3465")
puts mastercard?("4567 3465 2387 3465")
puts mastercard?("5567 3465 2387 3465")
puts visa?("5567 3465 2387 3465")
puts valid_card?("5567 3465 2387 3465")
