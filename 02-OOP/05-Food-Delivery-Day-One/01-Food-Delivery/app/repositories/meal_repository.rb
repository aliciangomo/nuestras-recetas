require 'csv'
require_relative '../models/meal'

class MealRepository
  def initialize(csv_file)
    @csv_file = csv_file
    unless File.exist?(csv_file)
      File.new(csv_file, "w+")
    end
    @meals = []
    @next_id = 0
    load_csv
  end

  def all
    return @meals
  end

  def add(meal)
    meal.id = @next_id #----> new id equals the lastest I have and I add one
    @meals << meal
    save_csv
    @next_id += 1
  end

  def save_csv
    csv_options = { headers: :first_row, col_sep: ',', force_quotes: true, quote_char: '"' }
    filepath = @csv_file
    CSV.open(filepath, 'wb', csv_options) do |csv|
      csv  << ["name", "price", "id"]
      @meals.each do |meal|
        csv << [meal.name, meal.price, meal.id]
      end
    end
  end

  def find(id)
    return @meals.find { |meal| meal.id == id }
  end

  def load_csv
    csv_options = { headers: :first_row, header_converters: :symbol }
    filepath = @csv_file
    CSV.foreach(filepath, csv_options) do |row|
      row[:id] = row[:id].to_i
      row[:price] = row[:price].to_i
      @next_id = row[:id]
      @meals << Meal.new(row)
    end
    @next_id += 1
    return @meals
  end
end

mealrepository = MealRepository.new("meals.csv")
p mealrepository.all
