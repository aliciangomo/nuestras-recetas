# require_relative "wagon_sort"

# # TODO: Ask the user about students to add to the Wagon.
# #       Remember, to read an input from the command line, use:
# #       - `gets`:  http://www.ruby-doc.org/core-2.5.3/Kernel.html#method-i-gets
# #       - `chomp`: http://www.ruby-doc.org/core-2.5.3/String.html#method-i-chomp

# puts "Type a student name:"
# student1 = gets.chomp
# puts "Type another student name or press enter to finish:"
# student2 = gets.chomp
# puts "Type another student name or press enter to finish:"
# student3 = gets.chomp


# students = [student1, student2, student3]
# # TODO: Then call `wagon_sort` method defined in the wagon_sort.rb
# #       file and display the sorted student list

# puts "Congratulations! Your Wagon has #{students.size} students :"
# hola = wagon_sort(students)
# last = hola.pop
# puts "#{hola.join(', ')} and #{last}"

require_relative "wagon_sort"

# TODO: Ask the user about students to add to the Wagon.
#       Remember, to read an input from the command line, use:
#       - `gets`:  http://www.ruby-doc.org/core-2.5.3/Kernel.html#method-i-gets
#       - `chomp`: http://www.ruby-doc.org/core-2.5.3/String.html#method-i-chomp

students  = []
name      = nil

while name != ""
  puts students.empty? ? "Type a student name:" : "Type another student name (or press enter to finish):"
  name = gets.chomp
  p name

  students << name if name != ""
end

sorted_students = wagon_sort(students)

puts "Congratulations! Your Wagon has #{sorted_students.size} students:"
if sorted_students.size >= 2
  puts "#{sorted_students[0..-2].join(', ')} and #{sorted_students.last}"
else
  puts sorted_students.first
end
