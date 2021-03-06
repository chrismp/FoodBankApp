$(function(){
	var tableObj = [
		{
			item: 'Canned food',
			inventory: 75,
			fiveDayPrediction: 68
		},
		{
			item: 'Bottled drinks',
			inventory: 74,
			fiveDayPrediction: 60
		},
		{
			item: 'Fruits',
			inventory: 80,
			fiveDayPrediction: 70
		},
		{
			item: 'Vegetables',
			inventory: 49,
			fiveDayPrediction: 40
		},
		{
			item: 'Bread',
			inventory: 90,
			fiveDayPrediction: 85
		},
		{
			item: 'Meat/seafood',
			inventory: 25,
			fiveDayPrediction: 15
		},
		{
			item: 'Other',
			inventory: 50,
			fiveDayPrediction: 45
		}
	];

	var rowsStr = '<tr>'+
					'<td><b>Food</b></td>'+
					'<td><b>Current</b></td>'+
					'<td><b>5-Day Forecast</b></td>'+
				   '</tr>';
	for (var i=0; i<tableObj.length; i++) {
		var obj = tableObj[i];
		var item = obj.item;
		var reserve = obj.inventory;
		var prediction = obj.fiveDayPrediction;
		var meterColor = reserve>=75 ? 'green' : reserve>=50 ? 'yellow' : 'red';
		var trArr = [
			'<tr>',
				'<td>'+item+'</td>',
				'<td class="'+meterColor+'"><span class="glyphicon glyphicon-grain" aria-hidden="true"></span>'+reserve.toString()+'%</td>',
				'<td class="prediction">'+prediction.toString()+'%</td>',
			'</tr>'
		];
		var trStr = trArr.join('');
		rowsStr += trStr;
	}

	$('#inventory-table').html(rowsStr);
});