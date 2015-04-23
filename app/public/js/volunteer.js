$(function(){
	$('#click-me').click(function(){
	  if (confirm("Please confirm you will pick up 50 pounds of canned food at 12PM on April 10 at 901 Technology Way, Boca Raton FL?")){
	    window.location.replace('volunteer_done.html');
	  } else {
	    return false;
	  }
	});	
});