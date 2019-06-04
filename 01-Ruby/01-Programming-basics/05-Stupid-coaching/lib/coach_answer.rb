
# def coach_answer_enhanced(your_message)
#   until your_message == "I am going to work right now!" || your_message == "I am going to work right now!".upcase
#     if your_message == your_message.upcase
#       puts "I can feel your motivation!"
#     end
#     if your_message[-1] == "?"
#       puts "Silly question, get dressed and go to work!"
#       your_message = gets.chomp
#     else
#       puts "I don't care, get dressed and go to work!"
#       your_message = gets.chomp
#     end
#   end
# end

def coach_answer(your_message)
  if your_message == "I am going to work right now!" || your_message == "I am going to work right now!".upcase
    return ''
  end
  if your_message.include?("?")
    return "Silly question, get dressed and go to work!"
  else
    return "I don't care, get dressed and go to work!"
  end
end


def coach_answer_enhanced(your_message)
  if your_message == "I am going to work right now!" || your_message == "I am going to work right now!".upcase
    return ''
  end
  if your_message == your_message.upcase && your_message.include?("?")

      return "I can feel your motivation! Silly question, get dressed and go to work!"
  else
      return "I can feel your motivation! I don't care, get dressed and go to work!"
  end

end


