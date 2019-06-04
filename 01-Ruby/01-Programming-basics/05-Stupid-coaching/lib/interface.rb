require_relative "coach_answer"
# TODO: Implement the program that makes you discuss with your coach from the terminal.

puts "Hello, I am your personal coach"
user_input = gets.chomp

until user_input != "I am going to work right now!" || "I am going to work right now!".upcase
  coach_answer(user_input)
end
