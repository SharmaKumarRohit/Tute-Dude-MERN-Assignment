// simple routing
// const http = require("http");

// const app = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.write("<h1>Home / Default Page</h1>");
//     return res.end();
//   } else if (req.url === "/products") {
//     res.write("<h1>Products Page</h1>");
//     return res.end();
//   } else if (req.url === "/about-us") {
//     res.write("<h1>About Us Page</h1>");
//     return res.end();
//   }
//   res.write("<h1>Implementation not done yet</h1>");
//   return res.end();
// });

// const PORT = 4000;
// app.listen(PORT, () =>
//   console.log(`Server is running on port http://localhost:${PORT}`)
// );

// routing redirection with form

// const http = require("http");
// const fs = require("fs");

// const app = http.createServer((req, res) => {
//   if (req.url === "/form") {
//     res.write("<h1>User Login Form:</h1>");
//     res.write(`
//             <form action="/submitted-data" method="POST">
//                 <lable for="username">Username:</lable>
//                 <input type="text" id="username" name="username" placeholder="Enter your name" />
//                 <br /> <br />
//                 <lable>Gender:</lable>
//                 <input type="radio" id="male" name="gender" value="male" />
//                 <label for="male">Male</lable>
//                 <input type="radio" id="female" name="gender" value="female" />
//                 <label for="female">Female</lable>
//                 <br /> <br />
//                 <button type="submit">Submit</button>
//             </form>
//             `);
//     res.statusCode = 201;
//     return res.end();
//   } else if (req.url === "/redirected") {
//     res.write("<h1>Redirected</h1>");
//     return res.end();
//   }
//   if (req.method === "POST" && req.url.toLowerCase() === "/submitted-data") {
//     res.statusCode = 302;
//     fs.writeFileSync("user-data.txt", "Rohit Kumar");
//     res.setHeader("Location", "/redirected");
//     return res.end();
//   }
//   res.write("<h1>No User Input !</h1>");
//   return res.end();
// });

// const PORT = 4000;
// app.listen(PORT, () =>
//   console.log(`Server is running on port http://localhost:${PORT}`)
// );

// navigating different pages

const http = require("http");

const app = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.write("<h1>Home Page</h1>");
    return res.end();
  } else if (req.url === "/about") {
    res.write("<h1>About Page</h1>");
    return res.end();
  } else if (req.url === "/contact") {
    res.write("<h1>Contact Page</h1>");
    return res.end();
  } else if (req.url === "/admin") {
    res.write("<h1>Admin Page</h1>");
    return res.end();
  } else if (req.url === "/user") {
    res.write("<h1>User Page</h1>");
    return res.end();
  }
  res.write(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Routing With NodeJS</title>
            </head>
            <body>
                <header>
                    <nav>
                        <ul>
                            <li><a href="/home">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/admin">Admin</a></li>
                            <li><a href="/user">User</a></li>
                        </ul>
                    </nav>
                </header>
            </body>
        </html>
        `);
  return res.end();
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
