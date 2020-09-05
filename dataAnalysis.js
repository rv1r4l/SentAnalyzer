let Parser = require("rss-parser");
let kmeans = require("node-kmeans");
let w2v = require("word2vec");
var fs = require('fs');

async function collectData(feed)
{
	let parser = new Parser();
	let rss = await parser.parseURL(feed);
	console.log(rss.title);

	var corpus = fs.createWriteStream('corpus.txt');
	rss.items.forEach(function (item) {console.log(item.description); corpus.write(item.description + "\n");});
	corpus.end();
}

collectData("https://rss.app/feeds/guZnePJxwzxvhiu5.xml");
w2v.word2vec("corpus.txt", "test.json", [minCount = 0], null);
