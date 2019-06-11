require 'nokogiri'
require 'open-uri'


filepath = "./lib/data/results.html"
# 1. We get the HTML page content
html_content = File.open(filepath)
# 2. We build a Nokogiri document from this file
doc = Nokogiri::HTML(html_content)

# 3. We search for the correct elements containing the items' title in our HTML doc
idea_array = doc.search('.v2-listing-card__info h2').map do |element|
  # 4. For each item found, we extract its title and print it
  element.text.strip
end

p idea_array.sample(7)
