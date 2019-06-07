# def encrypt(sentence)
#   alphabet = ('A'..'Z').to_a
#   words = sentence.split
#   new_sentence = []

#   words.each do |word|

#     encryption = word.chars.map do |letter|
#       index = alphabet.index(letter)
#       alphabet[index-3]
#     end
#     new_sentence << encryption.join
#   end
#   new_sentence.join(' ')
# end

# p encrypt("THE CAT AND THE DOG")


def encrypt(sentence)
  alphabet = ('A'..'Z').to_a
  words = sentence.split
  new_sentence = words.map do |word|

    encryption = word.chars.map do |letter|
      index = alphabet.index(letter)
      alphabet[index-3]
    end
    encryption.join
  end
return new_sentence.join (' ')
end

p encrypt("THE CAT AND THE DOG")
