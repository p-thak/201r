$( document ).ready(function() {

     $("#generateFlag").click(function() {
           console.log("Key being pressed");

          var url = "../getrandomcountry";
        $.getJSON(url,function(data) {
           
            console.log(data); 
	    //var json = JSON.parse(data.json);

//	    console.log(json);
	    var countryName=  data[0].Name;
	    var countryCode = data[1].Code;
 	    
	    console.log(countryCode);
	    console.log(countryName);
            var url = "/images/"+countryCode.toLowerCase()+".png";	
		console.log(url);	
            $("#flagImage").html("<img src='"+url+"'>");
             $("#countryName").html("<p>"+countryName+"</p>");
          })
          .done(function() { console.log('getJSON request succeeded!'); })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
            console.log("incoming "+jqXHR.responseText);
          })
          .always(function() { console.log('getJSON request ended!');
          })
          .complete(function() { console.log("complete"); });
        });



});
