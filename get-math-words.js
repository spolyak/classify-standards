var htmlparser = require("htmlparser2");
var http = require('http');
var bl = require('bl');

var href = '';
var concept = '';

var parser = new htmlparser.Parser({
	onopentag: function(name, attribs){
		if(name === "a" && attribs.class === "index"){
			href = attribs.href;
		}
	},
	ontext: function(text){
		concept = text;
	},
	onclosetag: function(tagname){
		if(tagname === "a" && concept != ''){
			console.log("{'concept': '" + concept + "', 'url': '" + 'http://www.mathwords.com/' + href + "'},");
		}
		concept = '';
	}
});

http.get('http://www.mathwords.com/a_to_z.htm', function (response) {
	response.pipe(bl(function (err, data) {
		if (err)
			return console.error(err)
		parser.write(data.toString());
		parser.end();
	}))
})



