class Meal
  attr_reader :name, :price
  attr_accessor :id

  def initialize(attributes={})
    @name = attributes[:name]
    @price = attributes[:price]
    @id = attributes[:id] || 1
  end
end


