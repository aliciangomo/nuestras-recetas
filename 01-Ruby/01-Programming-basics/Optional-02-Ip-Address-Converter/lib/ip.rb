def ip_to_num(ip_address)
  # TODO: return the number version of the `ip_address` string
  # num = ip_address.
  # return num.to_i
  num = ip_address.split(".").map(&:to_i)
  num.pack('CCCC').unpack1('N')
end

def num_to_ip(number)
  # TODO: return the string IP address from the `number`
  [number].pack('N').unpack('CCCC').join('.')
end

puts ip_to_num("37.160.113.170")
puts num_to_ip(631271850)
