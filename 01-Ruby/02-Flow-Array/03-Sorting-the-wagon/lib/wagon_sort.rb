# def wagon_sort(students)
#   # TODO: return (not print!) a copy of students, sorted alphabetically
#   return students.sort.each {|student| puts student }
# end

def wagon_sort(students)
  # TODO: return (not print!) a copy of students, sorted alphabetically
  return students.sort_by(&:downcase)
end
