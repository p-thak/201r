

$( document ).ready(function() {



});
var app = window.angular.module('app', [])

app.factory('userFetcher', userFetcher)
app.controller('mainCtrl', mainCtrl)

function userFetcher ($http) {

  var API_ROOT = 'user'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
     post: function (formData) {
      return $http
         .post(API_ROOT,formData)
         .then(function (resp) {
           console.log("Post worked");
         })
    } 
  }
}

function mainCtrl ($scope, userFetcher) {

  $scope.user = [];
  $scope.optionsList = [{value:"test"}];
  $scope.flagShowing = false;
  $scope.countryName = "";
 $scope.generateOptions = function() {

 	$scope.optionsList = [];     
        $scope.optionsList.push({value:$scope.countryName});
  	
        //var newOption =grabNewOption(); 
	//console.log(newOption);
    for(var i =0; i<5; i++){	
	grabNewOption(function(result){
		//console.log("new option: "+result);
		console.log(i);
             $scope.optionsList.push({value:result});	
		//console.log("size of array: "+$scope.optionsList.length);	
          if(i==5) {
	     console.log($scope.optionsList);
            $scope.flagShowing = true;
            console.log("flag showing: "+ $scope.flagShowing);
			
            }   
			$scope.$apply();
	});

      
	}

  }
 

   $scope.addUser = function() {
      var formData = {name:$scope.Name,highScore:$scope.highScore,currentScore:$scope.currentScore};
      console.log(formData);
      userFetcher.post(formData); // Send the data to the back end
      $scope.user.push(formData); // Update the model
    }

  userFetcher.get()
    .then(function (data) {
      $scope.user = data
    })

 function grabNewOption(callback){
 console.log("grabbing new option");

          var url = "../getrandomcountry";
        $.getJSON(url,function(data) {

            console.log(data);
            //var json = JSON.parse(data.json);

//          console.log(json);
            var countryNameOption=  data[0].Name;

            console.log(countryNameOption);
		callback(countryNameOption);
          })
          .done(function() { console.log('getJSON request succeeded!'); })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
            console.log("incoming "+jqXHR.responseText);
          })
          .always(function() { console.log('getJSON request ended!');
          })
          .complete(function() { console.log("complete"); });
        //});


}
	
$scope.generateFlag =function() {
           console.log("Key being pressed");

          var url = "../getrandomcountry";
        $.getJSON(url,function(data) {

            console.log(data);
            //var json = JSON.parse(data.json);

//          console.log(json);
            $scope.countryName=  data[0].Name;
            var countryCode = data[1].Code;

            console.log(countryCode);
//            console.log(countryName);
            var imageUrl = "/images/"+countryCode.toLowerCase()+".png";
                console.log(url);
	//CHECK IS URL EXISTS
		$.ajax({
		    type: 'HEAD',
		    url: imageUrl,
		success: function() {
		        // page existsi
			console.log("page exists!");
			// $scope.$apply();
		},
		error: function() {
        // page does not exist
			 console.log("page DOES NOT exist!");
			$scope.generateFlag();
			 return;
		}
		});



	/////////////
		
            $("#flagImage").html("<img id = 'mainImageFlag' src='"+imageUrl+"'>");
             //$("#countryName").html("<p>"+$scope.countryName+"</p>");

	    $scope.flagShowing=true;
	    $scope.generateOptions();	
	    $scope.$apply();

          })
          .done(function() { console.log('getJSON request succeeded!'); })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('getJSON request failed! ' + textStatus);
            console.log("incoming "+jqXHR.responseText);
          })
          .always(function() { console.log('getJSON request ended!');
          })
          .complete(function() { console.log("complete"); });
        };
    
  $scope.checkAnswer =function(answer) {
	console.log(answer);
	console.log("real answer: " +$scope.countryName);
       if(answer==$scope.countryName){
		console.log("correct!");
		$scope.generateFlag();
	} 
	else{
	
	console.log("INcorrect! TRY AGAIN");
	}	
	
 

   } ; 


  }

