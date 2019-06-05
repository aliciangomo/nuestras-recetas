#computer chooses a price
computer_price = rand(100)
puts "HINT, the price is #{computer_price}"

user_choice = 0
counter = 0

#ask user to choose a price
while condition computer_price != user_choice
  verb = user_choice < computer_price ? "higher" : "lower"
  puts "The price is #{verb}"
  puts "What's your price?"
  user_choice = gets.chomp.to_i
  counter += 1
end
puts "congrats!! It took you #{counter} times}"

#compare 2 prices
#give feedback to user ( if false back to step 2 and if right say congrats and state number of attempts)


