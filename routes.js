const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" placeholder="insert username" name="username"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    let username;
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      username = parsedBody.split('=')[1];
      
      // fs.writeFile('message.txt', message, err => {
      //   res.statusCode = 302;
      //   res.setHeader('Location', '/');
      //   return res.end();
      // });
      res.statusCode = 302;
      res.write('<html>');
      res.write('<head><title>Enter Message</title></head>');
      res.write(`<p>${username}</p>`);
      res.write('</html>');

      return res.end();
    });
    
    
  }
  // res.setHeader('Content-Type', 'text/html');
  // res.write('<html>');
  // res.write('<head><title>My First Page</title><head>');
  // res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  // res.write('</html>');
  // res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';