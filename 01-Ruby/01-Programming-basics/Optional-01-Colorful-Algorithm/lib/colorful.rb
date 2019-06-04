# def colorful?(number)
#   # TODO: return true if the number is colorful, false otherwise
#   a = number.digits.reverse
#   for i in 0..a.length - 1
#     a.push(a[i] * a[i + 1])
#   end
#   b = a.uniq
#   return a.size == b.size
# end

# puts colorful?(236)

def colorful?(number)
  # TODO: return true if the number is colorful, false otherwise
  a = number.digits.reverse
  for i in 0..a.length - 1
    a.push(a[i] * a[i + 1])
  end
  b = a.uniq
  return a.size == b.size
end

