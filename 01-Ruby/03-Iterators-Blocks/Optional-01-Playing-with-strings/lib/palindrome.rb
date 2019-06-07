def palindrome?(a_string)
  # TODO: check if a_string is a palindrome
  return false if a_string == ""
  word = a_string.downcase.chars
  word == word.reverse!
end



p palindrome?("")
p palindrome?("coche")

