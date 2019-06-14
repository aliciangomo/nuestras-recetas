require_relative 'recipe'
require_relative 'cookbook'
require_relative 'view'

class Controller
  def initialize(cookbook)
    @cookbook = cookbook
  end

  def list
    # 1- Ask cookbook for recipes
    recipes = @cookbook.all
    # 2 - List them
    @view = View.new
    puts "The Cookbook contains the following recipes:"
    @view.display_recipes(recipes)
  end

  def create
    # 1 - Ask the user for the name of the recipe
    name = @view.recipe_name
    # 2 - Ask the user for the description
    description = @view.recipe_description
    # 3- Create a recipe instance
    recipe = Recipe.new(name, description)
    # 4 - Save the recipe in Cookbook
    @cookbook.add_recipe(recipe)
  end

  def destroy
    # 1- List all recipes by name
    list
    # 2 - Which recipe you want to delete (index)
    index = @view.ask_for_index
    # 4 - Delete recipe with index
    @cookbook.remove_recipe(index)
  end
end

