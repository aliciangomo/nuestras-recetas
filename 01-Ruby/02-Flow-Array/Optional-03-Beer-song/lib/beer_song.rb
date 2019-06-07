def beer_song(beer_start_count)
  # TODO: sing the song
  beers = (1..beer_start_count).to_a.reverse!

  beers.each do |beer|
    if beer > 1
      puts "#{beer} #{beer > 1 ? "bottles" : "bottle"} of beer on the wall, #{beer} of beer!
  Take one down, pass it around, #{beer - 1}  #{beer - 1} #{(beer -1) >1 ? "bottles" : "bottle"} of beer on the wall!"
    elseif beer == 1
      puts "#{beer} #{beer >1 ? "bottles" : "bottle"} of beer on the wall, #{beer} #{beer >1 ? "bottles" : "bottle"} of beer!
Take one down, pass it around, no more bottles of beer on the wall!"
    end
  end
end


puts beer_song(2)

