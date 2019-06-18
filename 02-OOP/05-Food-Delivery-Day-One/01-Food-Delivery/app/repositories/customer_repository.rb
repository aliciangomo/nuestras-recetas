require 'csv'
require_relative '../models/customer'

class CustomerRepository
  def initialize(csv_file)
    @csv_file = csv_file
    File.new(csv_file, "w+") unless File.exist?(csv_file)
    @customers = []
    @next_id = 0
    load_csv
  end

  def all
    return @customers
  end

  def add(customer)
    customer.id = @next_id #----> new id equals the lastest I have and I add one
    @customers << customer
    save_csv
    @next_id += 1
  end

  def save_csv
    csv_options = { headers: :first_row, col_sep: ',', force_quotes: true, quote_char: '"' }
    filepath = @csv_file
    CSV.open(filepath, 'wb', csv_options) do |csv|
      csv << ["name", "address", "id"]
      @customers.each do |customer|
        csv << [customer.name, customer.address, customer.id]
      end
    end
  end

  def find(id)
    return @customers.find { |customer| customer.id == id }
  end

  def load_csv
    csv_options = { headers: :first_row, header_converters: :symbol }
    filepath = @csv_file
    CSV.foreach(filepath, csv_options) do |row|
      row[:id] = row[:id].to_i
      @next_id = row[:id]
      @customers << Customer.new(row)
    end
    @next_id += 1
    return @customers
  end
end
