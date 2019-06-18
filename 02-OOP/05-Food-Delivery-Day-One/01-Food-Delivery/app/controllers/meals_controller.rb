require_relative '../models/meal'
require_relative '../views/view_meal'
require_relative '../repositories/meal_repository'

class MealsController
  def initialize(mealrepository)
    @mealrepository = mealrepository
    @view_meal = ViewMeal.new
  end

  def list
    # 1- Ask repo for meals
    meals = @mealrepository.all
    # 2 - List them
    @view_meal.display_meals(meals)
  end

  def add
    # 1 - Ask the user for the name of the meal
    name = @view_meal.meal_name
    # 2 - Ask the user for the price
    price = @view_meal.meal_price
    # 3- Create a meal instance
    meal = Meal.new({name: name, price: price})
    # 4 - Save the meal in repo
    @mealrepository.add(meal)
  end


end
