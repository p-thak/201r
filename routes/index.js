var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });
});



  router.get('/getrandomcountry',function(req,res,next) {

          //console.log(req.query);             
          //var myRe = new RegExp("^" + req.query.q);
          //console.log(myRe);

     fs.readFile(__dirname + '/countrycodes.json',function(err,data) {
            if(err) throw err;
 	    var json = JSON.parse(data);

 	   // console.log(json);

            //var cities = data.toString().split("\n");
        	var randomNumber =Math.floor(Math.random() * (196 - 1 + 1)) + 1;      

		console.log(randomNumber);
                
	   var jsonresult = [];
        //for(var i = 0; i < json.length; i++) {
          //if(randomNumber == i) {
           console.log(json[randomNumber]);
           jsonresult.push({Name:json[randomNumber].Name},{Code:json[randomNumber].Code});
        //  }
      //  }
        //console.log(jsonresult);
        res.status(200).json(jsonresult);

        });

});



module.exports = router;
