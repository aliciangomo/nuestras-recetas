# NOTE: Read about BasicObject#object_id
# http://www.ruby-doc.org/core-2.5.3/BasicObject.html#method-i-__id__

# You can try launching `irb` to test some values
# irb> :foo.object_id
# irb> :foo.object_id
# irb> "foo".object_id
# irb> "foo".object_id

def are_identical_symbols_same_objects?
  # TODO: Answer the question by making this method to return true or false
  a = :hola
  b = :hola
  a.object_id == b.object_id
end

p are_identical_symbols_same_objects?


def are_identical_strings_same_objects?
  # TODO: Answer the question by making this method to return true or false
  a = "hola"
  b = "hola"
  a.object_id == b.object_id
end

p are_identical_strings_same_objects?
# Remember, RTFM! Your doc is your friend
# - http://www.ruby-doc.org/core-2.5.3/String.html
# - http://www.ruby-doc.org/core-2.5.3/Symbol.html

def convert_string_to_symbol(a_string)
  # TODO: return the symbol version of the parameter `a_string` passed to this method
  a_string.to_sym
end

p convert_string_to_symbol("Hola Salem")

def convert_symbol_to_string(a_symbol)
  # TODO: return the string version of the parameter `a_symbol` passed to this method
  a_symbol.to_s
end
p convert_symbol_to_string(:hola)

def me
  # TODO: return a Hash representing yourself, with keys such as age and name
  {
   age: 39,
   name: "Alicia"
  }
end

# p me_hash[:name]
# p me_hash[:age]

def fruits
  # TODO: return an array of fruits
  ["apple", "papaya", "lemon", "orange"]
end
p fruits

