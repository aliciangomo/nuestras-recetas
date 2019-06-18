class ViewMeal
  def display_meals(meals)
    meals.each_with_index do |meal, index|
      puts "#{index + 1}. #{meal.name} - €#{meal.price}"
    end
  end

  def meal_name
    puts "What's the name of the meal you'd like to add?"
    gets.chomp
  end

  def meal_price
    puts "How much is the meal?"
    gets.chomp.to_i
  end
end
