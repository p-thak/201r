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

  $scope.user = []

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

}
