class Restaurant
  # TODO: add relevant accessors if necessary
  attr_reader :average_rating, :city, :name
  def initialize(city, name)
    # TODO: implement constructor with relevant instance variables
    @name = name
    @city = city
    @average_rating = 0
    @city_restaurants = []
  end

  def rate(new_rate)
    @average_rating = (@average_rating += new_rate) / 2
  end

  def self.filter_by_city(restaurants, city)
    restaurants.map do |restaurant|
      return [restaurant] if restaurant.city == city
    end
  end
end


