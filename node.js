//tag
let http = require('http');
let fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let handleRequest = (request, response) => {
    if (request.url === "/")
    {
      response.writeHead(200, {
          'Content-Type': 'text/html'
      });
      fs.readFile('./index.html', null, function (error, data) {response.write(data)});
    }
    else {
      fs.readFile('.' + request.url, null, function (error, data) {
          if (error) {
              response.writeHead(404);
              response.write('The page you requested is not available');
              console.log(request.url);
          } else if (request.url === '/styles.css') {
              response.writeHead(200, {'Content-type' : 'text/css'});
              response.write(data);
          } else {
              response.writeHead(200, {
                  'Content-Type': 'text/html'
              });
              response.write(data);
          }
          response.end();
      });
    }
};

var Quiche = require('quiche');

var bar = new Quiche('bar');
bar.setWidth(400);
bar.setHeight(265);
bar.setTitle('Average Sentiment Rating');
bar.setBarWidth(0);
bar.setBarSpacing(6); // 6 pixles between bars/groups
bar.setLegendBottom(); // Put legend at bottom
bar.setTransparentBackground(); // Make background transparent

bar.addData([-1.1666666666666667], 'CNN', 'FF0000');
bar.addData([-0.375], 'FOX', '0000FF');
bar.addData([-0.8666666666666667], 'CBS', '008000');
bar.addData([-0.9444444444444444], 'CNBC', '00FF00');

bar.setAutoScaling(); // Auto scale y axis

var imageUrl = bar.getUrl(true); // First param controls http vs. https
console.log(imageUrl);

http.createServer(handleRequest).listen(8080);
