require_relative '../models/meal'
require_relative '../views/view_meal'
require_relative '../repositories/meal_repository'

class MealsController
  def initialize(mealrepository)
    @mealrepository = mealrepository
    @view_meal = ViewMeal.new
  end

  def list
    # 1- Ask repo for customers
    meals = @mealrepository.all
    # 2 - List them
    @view_meal.display_meals(meals)
  end

  def add
    name = @view_meal.meal_name
    price = @view_meal.meal_price
    meal = MealRepository.new({ name: name, price: price })
    @mealrepository.add(meal)
  end
end
