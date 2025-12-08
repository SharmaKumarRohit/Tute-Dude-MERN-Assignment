// Importing http module
const http = require("http");

// using http module to createServer
const server = http.createServer((req, res) => {
  // here is all my HTML content
  const htmlContent = (tag, content, code) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<!DOCTYPE html>");
    res.write('<html lang="en">');
    res.write("<head>");
    res.write(`<title>${tag}</title>`);
    res.write(
      '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>'
    );
    res.write("</head>");
    res.write(`
        <body class="h-screen bg-neutral-400/80 flex justify-center items-center">
        <h1 class="text-3xl font-bold">${content}</h1>
        <div class="size-50 rounded-full bg-[#eb26fd] blur-[100px] z-10 absolute top-28 left-28"></div>
        <div class="size-50 rounded-full bg-[#eb26fd] blur-[100px] z-10 absolute top-[60%] right-30"></div>
        </body>
        `);
    res.write("</html>");
    res.statusCode = code;
  };
  // get the url value
  const { url } = req;
  // Defining all routes like home, about, services, contact, 404
  if (url === "/" || url === "/home") {
    htmlContent("Home", "Home page / Default page", 200);
    res.end();
  } else if (url === "/about") {
    htmlContent("About", "About page", 200);
    res.end();
  } else if (url === "/contact") {
    htmlContent("Contact", "Contact page", 200);
    res.end();
  } else if (url === "/services") {
    htmlContent("Services", "Services page", 200);
    res.end();
  } else {
    htmlContent("404", "404, Sorry your requested page not found", 404);
    res.end();
  }
  res.end();
});

// port number
const PORT = 3000;
// listening server
server.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
