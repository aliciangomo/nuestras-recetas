class Employee
  attr_reader :name, :username, :role
  attr_accessor :id

  def initialize(attributes = {})
    @username = attributes[:username]
    @role = attributes[:role]
    @password = attributes[:password]
    @id = attributes[:id] || 1
  end

  def test_password(password)
    @password == password
  end
end
