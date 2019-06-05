def horse_racing_format!(race_array)
  # TODO: modify the given array so that it is horse racing consistent. This method should return nil.
  num = race_array.length

  race_array.reverse!

  race_array.map! { |horse| (num - race_array.index(horse)).to_s + "-" + horse + "!" }
end

