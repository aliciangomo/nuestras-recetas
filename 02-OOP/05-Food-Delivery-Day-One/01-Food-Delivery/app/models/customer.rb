class Customer
  attr_reader :name, :address
  attr_accessor :id

  def initialize(attributes = {})
    @name = attributes[:name]
    @address = attributes[:address]
    @id = attributes[:id] || 1
  end
end


# properties = { id: 1, name: "Paul McCartney", address: "Liverpool" }
# p customer = Customer.new(properties)
