[
	'open-uri',
	'mechanize',
	'sequel'
].each{|g|
	require g
}

require_relative './models/init.rb'

agent = Mechanize.new
baseURL = 'http://www.foodpantries.org/'

p "OPENING #{baseURL}"
mainPage = agent.get(baseURL)

mainPage.search('#main_content .multicolumn li a').each{|a| 
	stateListingURL = a['href']

	p "OPENING #{stateListingURL}"
	stateListingPage = agent.get(stateListingURL)

	stateListingPage.search('.sidebar .widget')[1].search('li a').each{|a2|
		cityListingURL = a2['href']

		p "OPENING #{cityListingURL}"
		cityListingPage = agent.get(cityListingURL)
		
		cityListingPage.search('.nailthumb-container').zip(cityListingPage.search('div[style="float:left; margin:0px 20px 20px 0px; width:450px;"] p')){|div,pElem|
			foodpantriesURL = div.search('a').attr('href').text
			name = div.search('img').attr('alt').text
			address = div.search('img')
				.attr('src')
				.text
				.match(/center\=.*?(?=\&zoom)/)
				.to_s
				.gsub('center=','')
				
			phone = pElem.text.strip.split(/\r\n/)[-1].strip

			pantry = Pantry.new
			pantry.FoodPantriesURL = foodpantriesURL
			pantry.Name = name
			pantry.Address = address
			pantry.Phone = phone
			begin
				pantry.save_changes
				p pantry
			rescue Exception => e
				p "ERROR: #{e}"
			end
		}
		p '==='
	}

	p '=============================='
}