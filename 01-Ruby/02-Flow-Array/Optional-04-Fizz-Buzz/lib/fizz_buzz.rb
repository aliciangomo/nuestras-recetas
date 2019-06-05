def fizz_buzz(number)
  # TODO: return an array of integers, 'Fizz', 'Buzz' or 'FizzBuzz'

  raise ArgumentError if number < 1

  nums = (1..number).to_a
  nums.map! do |num|
    if (num % 3).zero? && (num % 5).zero?
      "FizzBuzz"
    elsif (num % 5).zero?
      "Buzz"
    elsif (num % 3).zero?
      "Fizz"
    else
      num
    end
  end
  return nums
end

puts fizz_buzz(18)
