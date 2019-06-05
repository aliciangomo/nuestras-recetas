def sum_with_for(min, max)
  # CONSTRAINT: you should use a for..end structure
  if min > max
    return -1
  else
    sum = 0
    for num in min..max
      sum = num + sum
      num += 1
    end
    return sum
  end
end

def sum_with_while(min, max)
  # CONSTRAINT: you should use a while..end structure
  if min > max
    return -1
  else
    sum = 0
    num = min
    while num >= min && num <= max
      sum = num + sum
      num += 1
    end
    return sum
  end
end

puts sum_with_for(10, 6)
puts sum_with_while(10, 6)

