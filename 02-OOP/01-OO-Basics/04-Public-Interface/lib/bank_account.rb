# This is how you define your own custom exception classes
class DepositError < StandardError
end

class BankAccount
  attr_reader :name, :balance, :transactions
  # Contract for the BankAccount class
  # - you can access full owner's name and balance, but partial IBAN
  # - you cannot access full IBAN
  # - you can print partial account info
  # - you can print transactions only with a password
  # - you can withdraw or deposit money
  # - You can see the balance of the account (through the balance variable)

  MIN_DEPOSIT = 100

  def initialize(name, iban, initial_deposit, password)
    fail DepositError, "Insufficient deposit" unless initial_deposit > MIN_DEPOSIT

    @password     = password
    @transactions = []
    @balance      = 0
    @name         = name
    @iban         = iban

    add_transaction(initial_deposit)
  end

  def withdraw(amount)
    # TODO: Call add_transaction with the right argument
    # TODO: returns a string with a message
    add_transaction(-amount)
    "You've just withdrawn #{amount} euros"
  end

  def deposit(amount)
    # TODO: Call add_transaction with the right argument
    # TODO: returns a string with a message
    add_transaction(amount)
    "You've just deposited #{amount} euros"
  end

  def transactions_history(args = {})
    # TODO: Check if there is a password and if so if it is correct
    # TODO: return a string displaying the transactions, BUT NOT return the transaction array!
    if args == { password: @password }
      @transactions.join('')
    elsif args != { password: @password } && args != {}
      "wrong password"
    else
      "no password given"
    end
  end


  # p iban("FR1434674667534551606")

  def to_s
    # Method used when printing account object as string (also used for string interpolation)
    # TODO: return a string with the account owner, the hidden iban and the balance of the account
    return "Owner: #{name} - IBAN: #{iban}- Balance: #{balance} euros}"
  end

  private

  def add_transaction(amount)
    # TODO: add the amount in the transactions array
    # TODO: update the current balance (which represents the balance of the account)
    @transactions << amount
    @balance += amount
  end

  def iban
    # TODO: Hide the middle of the IBAN like FR14**************606 and return it
    @iban = @iban.split('-')
    @iban = "#{@iban.first}*************#{@iban.last}"
    # @iban.gsub(@iban[4..25], '**************')
  end
end




