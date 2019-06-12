class Flat
  attr_reader :size
  attr_writer :price
  attr_accessor :location

  def initialize(location, size, floor, price)
    @location = location
    @size = size # in square meters
    @floor = floor
    @price = price
    @for_sale = false
  end

  def change_price(new_price)
    @price = new_price
    "The new price of this flat is #{new_price}"
  end

  def sell_flat
    if @for_sale == false
      puts "Do you want to sale your flat? y/n"
      user_input = gets.chomp
      if user_input.match(/y/i)
        @for_sale = true
        puts "Congrats! Your flat is now listed!"
      end
    end
  end
end
