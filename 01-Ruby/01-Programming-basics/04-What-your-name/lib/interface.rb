require_relative "compute_name"

puts "Please enter your first name"
first_name = gets.chomp

puts "Please enter your middle name"
middle_name = gets.chomp

puts "Please enter your last name"
last_name = gets.chomp

full_name = compute_name(first_name, middle_name, last_name)

puts "Hello #{full_name}"


# TODO: ask for the first name
# TODO: ask for the middle name
# TODO: ask for the last name
# TODO: Print a greeting to the user with the full name concatenated,
#       something like "Hello, Boris Paillard"

