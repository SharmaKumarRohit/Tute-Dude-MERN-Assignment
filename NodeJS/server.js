// create simple server

// Loads the build-in HTTP module.
const http = require("http");

// create a simple server
const app = http.createServer((req, res) => console.log(req));

// port number of the server
const PORT = 4000;

// Server listening on port 4000
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
