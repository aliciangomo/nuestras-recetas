# TODO: you can build your christmas list program here!
require_relative 'christmas.rb'


user_input = ""

while user_input != "quit"
  puts "Welcome to your Christmas gift list
  Which action [list|add|delete|mark|idea|quit]?"
  user_input = gets.chomp
  case user_input
  when "list"
    list_gift(CHRISTMAS_LIST)
  when "add"
    puts "What item do you want to add"
    gift = gets.chomp
    add_gift(CHRISTMAS_LIST, gift)
  when "delete"
    puts "What item do you want to delete"
    gift_to_remove = gets.chomp
    delete_gift(CHRISTMAS_LIST, gift_to_remove)
  when "mark"
    puts "Which item have you bought (give the index)"
    gift_purchased = gets.chomp
    mark_gift(CHRISTMAS_LIST, gift_purchased)
  when "idea"
    puts "What are you looking for on Etsy?"
    article = gets.chomp
    idea(article)
  end
end
puts "Goodbye"
