var csv = require("fast-csv");
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();

//console.log('Alchemy API concept tagging reading from: ' + process.argv[2])
var count=1;

csv
.fromPath(process.argv[2])
.on("data", function(data){
	if(count == 1) {
		console.log(data[0] + '|' + data[1] + '|' + data[2] + '|concepts');
	}
	if(count > 1) {
		//console.log(data[2]);
		alchemyapi.concepts("text", data[2], {}, function(response) {
			console.log(data[0] + '|' + data[1] + '|' + data[2] + '|' + JSON.stringify(response['concepts']));
		});     	
	}
	count++;
})
.on("end", function(){
     //console.log("done");
 });


