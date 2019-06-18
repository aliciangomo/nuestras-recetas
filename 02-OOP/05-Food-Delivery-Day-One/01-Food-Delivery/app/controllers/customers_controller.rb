require_relative '../models/customer'
require_relative '../views/view_customer'
require_relative '../repositories/customer_repository'

class CustomersController
  def initialize(customerrepository)
    @customerrepository = customerrepository
    @view_customer = ViewCustomer.new
  end

  def list
    # 1- Ask repo for customers
    customers = @customerrepository.all
    # 2 - List them
    @view_customer.display_customers(customers)
  end

  def add
    name = @view_customer.customer_name
    address = @view_customer.customer_address
    customer = Customer.new(name: name, address: address)
    @customerrepository.add(customer)
  end
end
