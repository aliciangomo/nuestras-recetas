# TODO: require relevant files to bootstrap the app.
# Then you can test your program with:
#   ruby app.rb
require_relative 'app/repositories/meal_repo'  # You need to create this file!
require_relative 'app/controllers/meal_controller' # You need to create this file!
require_relative 'app/router'

csv_file   = File.join(__dir__, 'data/meals.csv')
mealrepository   = MealRepository.new(csv_file)
mealcontroller = MealController.new(mealrepository)

router = Router.new(mealcontroller)

# Start the app
router.run


