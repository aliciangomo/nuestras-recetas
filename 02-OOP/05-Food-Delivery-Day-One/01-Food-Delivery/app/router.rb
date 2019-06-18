# TODO: implement the router of your app.
class Router
  def initialize(attributes ={})
    @meals_controller = attributes[:meals_controller]
    @customers_controller = attributes[:customers_controller]
    @employee_repository = attributes[:employee_repository]
    @running = true
  end

  def run
    puts "Welcome to our Menu!"
    puts "           --           "

    sign_in
    while @running
      if @user.role == "manager"
        display_manager_tasks
        action_manager = gets.chomp.to_i
        print `clear`
        route_manager_action(action_manager)
      else
        display_delivery_guy_tasks
        action_delivery_guy = gets.chomp.to_i
        print `clear`
        route_delivery_guy_action(action_delivery_guy)
      end
    end
  end

  private

  def sign_in
    @user = nil
    while @user.nil?
      puts "Enter your username"
      puts ">"
      user_name = gets.chomp
      puts "password?"
      puts ">"
      password = gets.chomp
      employee = @employee_repository.find_employee(user_name)
      correct_password = employee.test_password(password)
      if correct_password
        @user = employee
        puts "Welcome #{user_name}!"
      else
        puts "Wrong credentials...Try again!"
      end
    end
  end

#DELIVERY_GUY_DASHBOARD

  def route_delivery_guy_action(action_delivery_guy)
    case action_delivery_guy
    when 1 then @meals_controller.list
    when 2 then @meals_controller.add
    when 3 then stop
    else
      puts "Please press 1, 2 or 3"
    end
  end

  def display_delivery_guy_tasks
    puts ""
    puts "What do you want to do next?"
    puts "1 - List all meals"
    puts "2 - Create a new meal"
    # puts "3 - List all employees"
    # puts "4 - tbd
    # puts "5 - tbd
    puts "3 - Stop and exit the program"
  end

#MANAGER DASHBOARD

   def route_manager_action(action_manager)
    case action_manager
    when 1 then @meals_controller.list
    when 2 then @meals_controller.add
    when 3 then @customers_controller.list
    when 4 then stop
    else
      puts "Please press 1, 2, 3 or 4"
    end
  end

  def display_manager_tasks
    puts ""
    puts "What do you want to do next?"
    puts "1 - List all meals"
    puts "2 - Create a new meal"
    puts "3 - List all employees"
    # puts "4 - Import recipes from LetsCookFrench"
    # puts "5 - Mark recipe as done"
    puts "4 - Stop and exit the program"
  end

# ---------------------------------------------------------------

  def stop
    @running = false
  end
end
