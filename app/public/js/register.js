$(function(){
	$('#volunteer-select').change(function(){
		console.log(parseInt($(this).val())>1);
		if(parseInt($(this).val())<3){
			$('.business-input').show();
		} else {
			$('.business-input').hide();	
		}
	});		
});