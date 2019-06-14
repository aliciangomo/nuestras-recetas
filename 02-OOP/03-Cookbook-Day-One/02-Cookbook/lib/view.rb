require_relative 'recipe'

class View
  def display_recipes(recipes)
    recipes.each_with_index do |recipe, index|
      puts "#{index + 1} - #{recipe.name}"
    end
  end

  def recipe_name
    puts "What's the name of the new recipe?"
    return gets.chomp
  end

  def recipe_description
    puts "Enter a description"
    return gets.chomp
  end

  def ask_for_index
    puts "Which recipe would you like to destroy (give the index)"
    gets.chomp.to_i + 1
  end
end
