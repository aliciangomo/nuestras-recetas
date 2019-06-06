def sum_odd_indexed(array)
  # TODO: computes the sum of elements at odd indexes (1, 3, 5, 7, etc.)
  #       You should use Enumerable#each_with_index
  sum = 0
  array.each_with_index do |num, index|
    sum += num if index.odd?
  end
  return sum
end

puts sum_odd_indexed([2, 4, 6])

def even_numbers(array)
  # TODO: Return the even numbers from a list of integers.
  #       You should use Enumerable#select
  array.select do |num|
    num.even?
  end
end

puts even_numbers([1, 2, 3, 4])

def short_words(array, max_length)
  # TODO: Take an array of words, return the array of words not exceeding max_length characters
  #       You should use Enumerable#reject
  array.reject { |item, _m| item.length > max_length }
end

puts short_words(["hello", "Juan", "Alicia"], 6)

def first_under(array, limit)
  # TODO: Return the first number from an array that is less than limit.
  #       You should use Enumerable#find
  array.find { |item, _lim| item < limit }
end

puts first_under([1, 2, 4, 5], 3)

def add_bang(array)
  # TODO: Take an array of strings and return a new array with "!" appended to each string.
  #       You should use Enumerable#map
  array.map { |i| i + "!" }
end

puts add_bang(["hello", "Juan", "Alicia"])

def concatenate(array)
  # TODO: Concatenate all strings given in the array.
  #       You should use of Enumerable#reduce
  array.reduce(:+)
end

puts concatenate(["hello", "I", "am", "Alicia"])

def sorted_pairs(array)
  # TODO: Reorganize an array into slices of 2 elements, and sort each slice alphabetically.
  #       You should use of Enumerable#each_slice
  new_array = []
  array.each_slice(2) { |i| new_array << i.sort_by(&:downcase) }
  return new_array
end

puts sorted_pairs(["my", "say", "name", "say", "my", "name"])
