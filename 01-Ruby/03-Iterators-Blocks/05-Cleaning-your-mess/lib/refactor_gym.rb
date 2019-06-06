# Very dirty code that needs refactoring...
def hop_hop_hop(number_of_exercises)
  gym_plan = (1..number_of_exercises).to_a
  gym_plan.each do |i|
    counter = 0
    until counter == i
      print "hop! "
      counter += 1
    end
    print 'One more time...' + "\n"
  end
  # Reset counter to 0 for the next exercise
end

hop_hop_hop(6)
