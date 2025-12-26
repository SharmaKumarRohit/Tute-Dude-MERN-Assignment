const http = require("http");

const server = http.createServer((req, res) => {
  // req details
  //   console.log("Request_URL:", req.url);
  //   console.log("Request_Method:", req.method);
  //   console.log("Request_Headers:", req.headers);

  // res
  //   res.setHeader('Content-type', 'json')
  res.setHeader("Content-type", "text/html");

  //   res.write("<h1>Hello World!</h1>");
  //   res.write(`
  //     <html>
  //         <head>
  //             <title>NodeJS</title>
  //         </head>
  //         <body>
  //             <h1>This is Heading</h1>
  //             <p>This is Paragraph</p>
  //         </body>
  //     </html>
  //     `);

  res.write("<html>");
  res.write("<head> <title>NodeJS</title> </head>");
  res.write("<body> <h1>Hey, I'm learning nodejs</h1> </body>");
  res.write("</html>");

  // Exiting out of event loop (stop event loop)
  //   process.exit();
});

const PORT = 4000;
server.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);

// GET, POST, PUT, PATCH & DELETE - HTTP Methods
