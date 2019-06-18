class ViewCustomer
  def display_customers(customers)
    customers.each_with_index do |customer, index|
      puts "#{index + 1}. Name: #{customer.name} - Address: #{customer.address}"
    end
  end

  def customer_name
    puts "What's the name of the customer you'd like to add?"
    gets.chomp
  end

  def customer_address
    puts "What is the customer's address?"
    gets.chomp
  end
end
