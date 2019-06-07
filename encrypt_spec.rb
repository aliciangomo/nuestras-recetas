require_relative "../encrypt.rb"

describe "#encrypt" do
  it "should return an empty string when passed an empty string" do
    expect(encrypt("")).to eq("")
  end

  it "should return an encrypted string" do
    actual = encrypt("THE QUICK BORWN FOX JUMPS OVER THE LAZY DOG")
    expected = "QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD"
    expect(actual).to eq(expected)
  end
end
