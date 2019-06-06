def timer_for
  # TODO: Return time taken to execute the given block
  start_time = Time.now
  yield
  end_time = Time.now
  return end_time - start_time
end

# puts timer_for { |n| sleep(5)}


def my_map(array)
  # TODO: Re-implement the same behavior as `Enumerable#map` without using it! You can use `#each` though.
  new_array = []
  array.each { |element| new_array << yield(element) }
  return new_array
end

# puts my_map([2, 4, 6, 8]) {|element| element * element}


def tag(tag_name, attributes = nil)
  # TODO: Build HTML tags around content given in the block
  # The method can be called with an optional HTML attribute inputted as [attr_name, attr_value]

  if attributes.nil?
    "<#{tag_name}>" + yield + "</#{tag_name}>"
  else
    "<#{tag_name} " + attributes[0] + "=\"" + attributes[1] + "\">" + yield + "</#{tag_name}>"
  end
end


# puts tag("a", ["href", "www.google.com"]) { |_i| "Google it" }
# puts tag("h1") {|_i| "Some Title" }

