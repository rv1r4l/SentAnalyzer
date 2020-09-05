var Parser = require('rss-parser');
var Sentiment = require('sentiment');

async function collectData(feed)
{
	let parser = new Parser();
	let rss = await parser.parseURL(feed);

	let titles = [];
	let links = [];
	rss.items.forEach(function (item) {titles.push(item.title); links.push(item.link);});
	return {"titles": titles, "links": links};
}

async function analyzeSource(feed)
{
	let sentiment = new Sentiment();
	let data = await collectData(feed);
	let totalScore = 0;
	let totalArticles = 0;
	data.titles.forEach(function (item) {
		if (item.includes("virus") || item.includes("pandemic") || item.includes("cases"))
		{
			totalScore +=  sentiment.analyze(item).score;
			totalArticles++;
		}
	});
	return {"averageScore": totalScore / totalArticles, "titles": data.titles, "links": data.links};
}
