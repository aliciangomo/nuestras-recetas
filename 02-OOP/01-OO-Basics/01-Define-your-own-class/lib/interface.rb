require_relative "flat"

my_flat = Flat.new("London", 46, 1, 400_000)
my_moms_flat = Flat.new("Madrid", 80, 2, 190_000)

p my_moms_flat.location
p my_flat.price = 360_000
p my_flat.location = "Paris"
p my_flat.change_price(240_000)
my_flat.sell_flat

