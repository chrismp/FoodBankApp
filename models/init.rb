## LOCAL DB
DB = Sequel.connect(
	:adapter => 'mysql',
	:user => ARGV[0],
	:password => ARGV[1],
	:host => ARGV[2],
	:database => ARGV[3]
)

DB.create_table? :FoodPantries do 
	primary_key :Id
	varchar :FoodPantriesURL, :unique=>true, :null=>false
	varchar :Name
	varchar :StreetAddress
	varchar :City
	varchar :Phone
end

require_relative 'classes.rb'