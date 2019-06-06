def size_splitter(array, size)
  # TODO: Return an array of two arrays, the first containing
  #       words of length `size`, the second containing all the other words
  #       In addition to this split, each array should be *sorted*.
  new_array = []
  size_array = array.select { |n| n.length == size }
  rest_array = array.reject { |n| n.length == size }
  return new_array.push(size_array.sort, rest_array.sort)
end

p size_splitter(["Coke", "Alicia", "dog", "Madagascar", "Love"], 4)


def block_splitter(array)
  # TODO: Return an array of two arrays, the first containing
  #       elements for which the given block yields true,
  #       the second containing all the other elements.
  #       No sort needed this time.
  new_array = []
  first_array = array.select { |n| yield(n) }
  return new_array.push(first_array, array - first_array)
end


beatles = ["John", "Paul", "Ringo", "George"]
p block_splitter(beatles) { |beatle| beatle.start_with?("P") }
