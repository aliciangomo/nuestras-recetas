require 'nokogiri'
require 'open-uri'


CHRISTMAS_LIST = {
  gifts: [
    {
      name: 'Car',
      status: false
    },
    {
      name: 'Parfum',
      status: true
    }
  ]
}


# List all products
def list_gift(christmas_list)
  CHRISTMAS_LIST.each do |_list, value|
    value.each do |gift|
      gift_index = value.index(gift).to_s
      gift[:status] ? puts("#{gift_index} - [X] #{gift[:name]}") : puts("#{gift_index} - [ ] #{gift[:name]}")
    end
  end
end

# list_gift(CHRISTMAS_LIST)
# Add/update an item

def add_gift(christmas_list, gift)
  gifts_array = CHRISTMAS_LIST[:gifts]
  gifts_array << { name: gift, status: false }
end

# p add_gift(christmas_list, "Lipstick")

# Delete an item

def delete_gift(christmas_list, gift_to_remove)
  gifts_array = CHRISTMAS_LIST[:gifts]
  gifts_array.delete_if { |item| item[:name] == gift_to_remove }
end

# delete_gift(christmas_list, "Lipstick")
# p christmas_list

# Mark as purchased
def mark_gift(christmas_list, gift_purchased)
  gifts_array = CHRISTMAS_LIST[:gifts]

  gifts_array.each do |item|
    gift_index = gifts_array.index(item).to_s
    item[:status] = true if gift_index == gift_purchased
  end
end
# mark_gift(CHRISTMAS_LIST, "1")
# p CHRISTMAS_LIST


def idea(article)
  filepath = "https://www.etsy.com/search?q=#{article}"
  # 1. We get the HTML page content
  html_content = open(filepath).read
  # 2. We build a Nokogiri document from this file
  doc = Nokogiri::HTML(html_content)
  # 3. We search for the correct elements containing the items' title in our HTML doc
  idea_array = doc.search('.v2-listing-card__info h2').map { |element| element.text.strip }
  ideas = idea_array.select { |item| item.length < 50 }
  sample_ideas = ideas.sample(7)
  sample_ideas.each_with_index { |idea, num| puts "#{num + 1} - #{idea}" }
  puts "Pick one to add to your list (give the number)"
  choice = gets.chomp.to_i
  add_gift(CHRISTMAS_LIST, sample_ideas[choice])
end

# def idea(article)
#   filepath = "https://www.etsy.com/search?q=#{article}"
#   # 1. We get the HTML page content
#   html_content = open(filepath).read
#   # 2. We build a Nokogiri document from this file
#   doc = Nokogiri::HTML(html_content)
#   # 3. We search for the correct elements containing the items' title in our HTML doc
#   idea_array = doc.search('.v2-listing-card__info h2').map do |element|
#     # 4. For each item found, we extract its title and print it
#     element.text.strip
#   end
#   ideas = idea_array.map { |item| item = item[/(\S+\s+){#{12}}/] }
#   sample_ideas = ideas.sample(7)
#   sample_ideas.each_with_index { |idea, num| puts "#{num + 1} - #{idea}" }
#   puts "Pick one to add to your list (give the number)"
#   choice = gets.chomp.to_i
#   add_gift(CHRISTMAS_LIST, sample_ideas[choice])
# end

