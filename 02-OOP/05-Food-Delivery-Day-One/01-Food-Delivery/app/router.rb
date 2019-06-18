# TODO: implement the router of your app.
class Router
  def initialize(attributes ={})
    @meal_controller = meal_controller
    @running    = true
  end

  def run
    puts "Welcome to our Menu!"
    puts "           --           "

    while @running
      display_tasks
      action = gets.chomp.to_i
      print `clear`
      route_action(action)
    end
  end

  private

  def route_action(action)
    case action
    when 1 then @meals_controller.list
    when 2 then @meals_controller.add
    when 3 then stop
    else
      puts "Please press 1, 2, or 3"
    end
  end

  def stop
    @running = false
  end

  def display_tasks
    puts ""
    puts "What do you want to do next?"
    puts "1 - List all meals"
    puts "2 - Create a new meal"
    # puts "3 - Destroy a recipe"
    # puts "4 - Import recipes from LetsCookFrench"
    # puts "5 - Mark recipe as done"
    puts "3 - Stop and exit the program"
  end
end
