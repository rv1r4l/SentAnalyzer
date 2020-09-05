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
              response.write('Whoops! File not found!');
              console.log(request.url);
          } else {
              response.write(data);
          }
          response.end();
      });
    }
};

http.createServer(handleRequest).listen(8080);
