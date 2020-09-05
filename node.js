//tag
let http = require('http');
let fs = require('fs');


let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    if (request.url === "/")
    {
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
              response.write(data);
          }
          response.end();
      });
    }
};

http.createServer(handleRequest).listen(8080);
