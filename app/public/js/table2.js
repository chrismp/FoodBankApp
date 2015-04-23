$(function(){
	var tableObj = [
		{
			item: 'Canned food',
			inventory: 70,
			fiveDayPrediction: 68
		},
		{
			item: 'Bottled drinks',
			inventory: 65,
			fiveDayPrediction: 60
		},
		{
			item: 'Fruits',
			inventory: 75,
			fiveDayPrediction: 70
		},
		{
			item: 'Vegetables',
			inventory: 45,
			fiveDayPrediction: 40
		},
		{
			item: 'Bread',
			inventory: 80,
			fiveDayPrediction: 75
		},
		{
			item: 'Meat/seafood',
			inventory: 25,
			fiveDayPrediction: 15
		},
		{
			item: 'Other',
			inventory: 40,
			fiveDayPrediction: 35
		}
	];

	var rowsStr = '<tr>'+
					'<td>Food</td>'+
					'<td>Reserve</td>'+
					'<td>5-day prediction</td>'+
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