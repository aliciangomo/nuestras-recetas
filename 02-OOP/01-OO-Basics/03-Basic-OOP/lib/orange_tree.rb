class OrangeTree
  # TODO: Implement all the specs defined in the README.md :)
  attr_reader :is_dead, :height, :age, :fruits

  def initialize
    @height = 0
    @is_dead = false
    @age = 0
    @fruits = 0
    puts "This is our tree!"
  end
  # - You should be able to measure the height of the tree.

  def tree_height
    puts "The tree measures #{@height} meters heigh."
  end

  # - A tree grows 1 meter per year until it is 10 years old. Then it stops growing. (DONE)
  def tree_growth
    if @is_dead == false && @age < 11
      @height += 1
      puts "The tree now measures #{@height} meters heigh"
    end
  end


  # - You should be able to find out if the tree is dead. (DONE)
  # - The orange tree **cannot** die until it reaches 50 years old. (DONE)
  # - After 50 years, the probability of dying increases each year.
  # - No tree can live more than 100 years.

  def dead?
    if @age < 51
      @is_dead = false
    else
      @is_dead = true if rand(100) < (@age.to_i - 50) * 2
    end
    return @is_dead
  end
  # - A tree will produce 100 fruits a year once it is more than 5 years old.
  # - A tree will produce 200 fruits a year when it reaches 10 years old.
  # - A tree will not produce fruits once it reaches 15 years old.

# orange_tree = OrangeTree.new
# p orange_tree.dead?

  def grow_fruits
    @fruits = 0
    if @age < 6 || @age > 14
      puts "This tree does not produce fruit."
    elsif @age > 5 && @age < 10
      @fruits += 100
    else
      @fruits += 200
    end
    return @fruits
  end

  def pick_a_fruit!
    # - You should be able to pick **a single fruit** from the tree by calling the `pick_a_fruit!` method on your tree
    # - At the end of each year, the fruits which have not been picked **will fall off**.
    # - You should be able to find out how many fruits are left hanging on the tree.
    @fruits -= 1 if @fruits.positive?
    return @fruit
  end

  # - Each year, the tree should age by 1 year (it becomes older and taller, and eventually dies). (DONE)
  def one_year_passes!
    @age += 1
    dead?
    tree_growth
    grow_fruits
  end
end


