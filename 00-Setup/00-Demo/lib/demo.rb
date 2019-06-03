def circle_area(radius)
  # TODO: Implement the `circle_area` method
  return 0 if radius.negative?

  return 3.14 * radius * radius
end


# This is my own test
puts circle_area(3)
puts circle_area(1)
puts circle_area(0)
