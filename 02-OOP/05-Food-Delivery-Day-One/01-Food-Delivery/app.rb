# TODO: require relevant files to bootstrap the app.
# Then you can test your program with:
#   ruby app.rb
require_relative 'app/repositories/meal_repository'  # You need to create this file!
require_relative 'app/controllers/meals_controller' # You need to create this file!
require_relative 'app/router'
require_relative 'app/repositories/employee_repository'

meals_file = File.join(__dir__, 'data/meals.csv')
meal_repository = MealRepository.new(meals_file)
meals_controller = MealsController.new(meal_repository)
employee_file = File.join(__dir__, 'data/employees.csv')
employee_repository = EmployeeRepository.new(employee_file)

router = Router.new({meals_controller: meals_controller, employee_repository: employee_repository})

# Start the app
router.run


