def array_to_hash(array)
  # TODO: implement the method :)
  my_hash = {}                                      # create empty hash
  array.each_with_index do |item, index|            # loop over array
    key = block_given? ? yield(index) : index.to_s  # ternary to set the key in both cases
    my_hash[key] = item                             # set the new key/value pair
  end
  p my_hash                                         # return built hash
end


array_to_hash(["Richard", "Aleks", "Claudio", "Salem", "David"])
array_to_hash(["Richard", "Aleks", "Claudio", "Salem", "David"]) { |index| "key#{index}" }
