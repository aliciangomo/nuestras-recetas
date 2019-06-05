require_relative 'black_jack'

def state_of_the_game(player_score, bank_score)
  # TODO: return (not print!) a message containing the player's score and bank's score
  return "Your score is #{player_score}, bank is #{bank_score}"
end

def end_game_message(player_score, bank_score)
  # TODO: return (not print!) a message telling if the user won or lost.
  if player_score == 21
    return "BlackJack! You win!"
  elsif player_score > 21
    return "You lose"
  elsif player_score > bank_score
    return "You win!"
  elsif player_score == bank_score
    return "Push. You get your money back"
  elsif player_score < bank_score
    return "You lose"
  end
end

def play_game
  # TODO: make the user play from terminal in a while loop that will stop
  #       when the user will not be asking for  a new card
  player_score = 0
  bank_score = pick_bank_score
  user_input = "yes"

  while user_input == 'yes'
    puts "Card? 'yes' to get a new card"
    user_input = gets.chomp
    card = pick_player_card
    player_score = player_score + card
    puts state_of_the_game(player_score, bank_score)
  end
  puts end_game_message(player_score, bank_score)
end
