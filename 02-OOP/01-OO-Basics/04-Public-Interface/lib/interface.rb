require_relative "bank_account"

my_bank_account = BankAccount.new("Alicia", "FR1434674667534551606", 200, "hello")
p my_bank_account.withdraw(200)

