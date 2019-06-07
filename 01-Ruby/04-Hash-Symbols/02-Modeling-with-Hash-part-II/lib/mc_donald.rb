CALORIES = {
  "Hamburger" => 250,
  "Cheese Burger" => 300,
  "Big Mac" => 540,
  "McChicken" => 350,
  "French Fries" => 230,
  "Salad" => 15,
  "Coca Cola" => 150,
  "Sprite" => 150
}

MEALS = {
  "Happy Meal" => ["Cheese Burger", "French Fries", "Coca Cola"],
  "Best Of Big Mac" => ["Big Mac", "French Fries", "Coca Cola"],
  "Best Of McChicken" => ["McChicken", "Salad", "Sprite"]
}


def poor_calories_counter(burger, side, beverage)
  # TODO: return number of calories for this mcDonald order
  [burger, side, beverage].map { |key| CALORIES.fetch(key) }.reduce(:+)
end

# p poor_calories_counter(MEALS['Happy Meal'][0], MEALS['Happy Meal'][1], MEALS['Happy Meal'][2])
# p poor_calories_counter("McChicken", "French Fries", "Sprite") # => 730


def calories_counter(orders)
  # TODO: return number of calories for a less constrained order
  total_calories = 0
  orders.each do |item|
    if CALORIES.key?(item)
      total_calories += CALORIES[item]
    else
      total_calories += poor_calories_counter(MEALS[item][0], MEALS[item][1], MEALS[item][2])
    end
  end
  return total_calories
end


my_order = ["Best Of Big Mac", "Salad", "Happy Meal", "Sprite"]
puts calories_counter(my_order)
