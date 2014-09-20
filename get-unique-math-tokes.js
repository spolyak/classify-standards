var fs = require('fs')

var conceptTokenSet = {};
var conceptTokenArray = [];

function isStopWord(word) {
	if(word == 'and' || word =='an' || word == 'a' ||  word == 'of' || word =='in' || word == ' ' || word == '' ||
		word == 'or' || word == 'by' || word == 'the' || word == 'for' || word == 'from') {
		return true;
}
return false;
}

fs.readFile(process.argv[2], function (err, data) {
	if (err) throw err
		var concepts = JSON.parse(data.toString())
	for (var i = concepts.length - 1; i >= 0; i--) {
		//console.log(concepts[i])
		var tokens = concepts[i].concept.split(" ");
		for (var j = tokens.length - 1; j >= 0; j--) {
			if(!isStopWord(tokens[j]))
				conceptTokenSet[tokens[j]] = true;
		}
	}
	for(var k in conceptTokenSet) conceptTokenArray.push(k);
	console.log(conceptTokenArray.sort());
})