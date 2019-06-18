require 'csv'
require_relative '../models/employee'

class EmployeeRepository
  attr_reader :employees
  def initialize(csv_file)
    @csv_file = csv_file
    unless File.exist?(csv_file)
      File.new(csv_file, "w+")
    end
    @employees = []
    load_csv
  end

  def all
    return @employees
  end

  def load_csv
    csv_options = { headers: :first_row, header_converters: :symbol }
    filepath = @csv_file
    CSV.foreach(filepath, csv_options) do |row|
      row[:id] = row[:id].to_i
      @next_id = row[:id]
      @employees << Employee.new(row)
    end
    return @employees
  end

  def find_employee(user_name)
    employee = @employees.find {|employee| employee.username == user_name}
  end

  # def find_password(user_name, password)
  #   employee = @employees.find {|employee| employee.username == user_name}
  #   employee.test_password(password)
  # end
end
