var fs = require('fs')
var csv = require('fast-csv')
var mathWord = require('./' + process.argv[3])
var stemmer = require('porter-stemmer').stemmer

var counter = 0
var stream = fs.createReadStream("./" + process.argv[2])
var rejectedConcepts = {};
var acceptedConcepts = {};
var copy = '';

var csvStream = csv()
.on("data", function(data){
    if (counter > 0) {
        var conceptArray = JSON.parse(data[3]);
        for (var i = conceptArray.length - 1; i >= 0; i--) {
            var found = false;
            copy = conceptArray[i].text;
            var tokens = copy.split(" ");

            for (var j = tokens.length - 1; j >= 0; j--) {
                if(mathWord.terms.indexOf(stemmer(tokens[j].toLowerCase())) != -1) {
                  found = true;
                  break;
              } else {
                  found = false;
              }
          };
          if(found) {
            console.log('Found: ' + copy)
            var entry = copy.replace(/ /g, '_');
            acceptedConcepts[entry] = true;
        } else {
            console.log('Not Found: ' + copy)
            var entry = copy.replace(/ /g, '_');
            rejectedConcepts[entry] = true;
        }
    };

}
counter++;
})
.on("end", function(){
         var rejected = []
         for(var k in rejectedConcepts) rejected.push(k);
         console.log(rejected.sort());
         console.log('Total concepts rejected: ' + rejected.length);

         var accepted = []
         for(var k in acceptedConcepts) accepted.push(k);
         console.log(accepted.sort());
         console.log('Total concepts accepted: ' + accepted.length);

         console.log('Hit ratio: ' + accepted.length/(accepted.length+rejected.length));
         console.log('Miss ratio: ' + rejected.length/(accepted.length+rejected.length));         
     });

stream.pipe(csvStream)

