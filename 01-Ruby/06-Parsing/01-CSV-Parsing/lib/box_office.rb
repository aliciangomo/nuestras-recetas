require 'csv'

def most_successful(number, max_year, file_path)
  # TODO: return the `number` of most successful movies before `max_year`
  filepath = file_path

  movies = []
  CSV.foreach(filepath) do |row|
    year = row[1].to_i
    earnings = row[2].to_i
    next if year >= max_year

    movies << { name: row[0], year: year, earnings: earnings }
  end

  # movies.map! { |movie| "{ name: #{movie[0]}, year: #{year}, earnings: #{earnings}" }

  # movies_selection = movies.select { |movie| movies[:year] < max_year }

  movies.sort_by { |movie| movie[:earnings] }.reverse!.take(number)
end

# p most_successful(3, 2019, 'movies.csv')


# def most_successful(number, max_year, file_path)
#   all_movies = load_movies(file_path, max_year)

#   all_movies.sort_by { |movie| -movie[:earnings] }.take(number)
#   # OR: all_movies.max_by(number) { |movie| movie[:earnings] }
# end

# def load_movies(file_path, max_year)
#   movies = []

#   CSV.foreach(file_path) do |row|
#     year = row[1].to_i
#     next if year >= max_year

#     movies << { name: row[0], year: year, earnings: row[2].to_i }
#   end

#   movies
# end


