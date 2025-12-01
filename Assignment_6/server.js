// Building a basic web server using the Node.js http module to handle different routes and serve corresponding HTML pages.

// Loads the build-in HTTP module
const http = require("http");

// PORT number of the server
const PORT = 3000;

// Styling for my different-different Pages
const styling = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, Helvetica, sans-serif;
      }
      html,
      body {
        width: 100%;
        height: 100%;
      }
      .container {
        max-width: 1280px;
        padding: 0 20px;
        margin: 0 auto;
      }
      header {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        padding: 1.25rem 0;
      }
      nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      nav h1 {
        font-size: 1.25rem;
      }
      .menu-items {
        display: flex;
        align-items: center;
        gap: 1rem;
        list-style: none;
      }
      .menu-items li a {
        text-decoration: none;
        color: inherit;
        transition: background-color 0.3s ease;
        padding: 0.5rem 1rem;
        border-radius: 10px;
      }
      .menu-items li a:hover {
        background-color: #f0f0f0;
      }
      .blue {
        color: #2563eb;
      }
      section {
        height: calc(100vh - (66.4px + 60px));
        display: grid;
        place-items: center;
      }
      section span {
        background-color: #f0f0f0;
        padding: 0.5rem 1.25rem;
        border-radius: 10px;
        font-size: 1.25rem;
      }
      .not-found-page {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        background-color: #f0f0f0;
        padding: 2rem;
        border-radius: 10px;
      }
      .not-found-page h1 {
        color: red;
      }
      .not-found-page a {
        color: inherit;
        padding: 1rem 1.25rem;
        background-color: #fff;
        border-radius: 10px;
        text-decoration: none;
        transition: color 0.3s ease;
      }
      .not-found-page a:hover {
        color: #2563eb;
      }
      footer {
        padding: 1.25rem;
        border-top: 2px solid #f0f0f0;
        text-align: center;
        opacity: 0.8;
      }
      footer p a {
        text-decoration: none;
        color: inherit;
        font-weight: 600;
      }
      footer p a:hover {
        text-decoration: underline;
      }
      @media screen and (max-width: 640px) {
        .container {
          padding: 0 15px;
        }
        nav {
          flex-direction: column;
          gap: 1.25rem;
        }
        .menu-items {
          gap: 0.2rem;
        }
        section {
          height: calc(100vh - (104.8px + 60px));
        }
      }
    </style>
`;

// Navigation menu HTML Content for every Pages
const navigation = `
    <header>
      <div class="container">
        <nav>
          <h1>🧺Laundry<span class="blue">Pro</span></h1>
          <ul class="menu-items">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
    `;

// Footer HTML Content for Pages
const footer = `
    <footer>
      <p>
        &copy; Creator by
        <a href="https://assignment4hai.netlify.app" target="_blank"
          >Rohit Kumar</a
        >. Let's build something crazy!
      </p>
    </footer>
    `;

// Showcasing Home Page HTML Content
const homePage = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home</title>
    ${styling}
  </head>
  <body>
  ${navigation}
    <main>
      <div class="container">
        <section>
          <span>Home Page</span>
        </section>
      </div>
    </main>
    ${footer}
  </body>
</html>
    `;

// Showcasing About Page HTML Content
const aboutPage = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About</title>
    ${styling}
  </head>
  <body>
  ${navigation}
    <main>
      <div class="container">
        <section>
          <span>About Page</span>
        </section>
      </div>
    </main>
    ${footer}
  </body>
</html>
    `;

// Showcasing Services Page HTML Content
const servicesPage = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Service</title>
    ${styling}
  </head>
  <body>
  ${navigation}
    <main>
      <div class="container">
        <section>
          <span>Services Page</span>
        </section>
      </div>
    </main>
    ${footer}
  </body>
</html>
    `;

// Showcasing Contact Page HTML Content
const contactPage = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact</title>
    ${styling}
  </head>
  <body>
  ${navigation}
    <main>
      <div class="container">
        <section>
          <span>Contact Page</span>
        </section>
      </div>
    </main>
    ${footer}
  </body>
</html>
    `;

// Showcasing Not_Found_Page HTML Content
const notFoundPage = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 - Page Not Found</title>
    ${styling}
  </head>
  <body>
  ${navigation}
    <main>
      <div class="container">
        <section>
            <div class="not-found-page">
                <h1>404 - Page Not Found</h1>
                <p>Oops! Your requested page not found.</p>
                <a href="/home">Go back Home</a>
            </div>
        </section>
      </div>
    </main>
    ${footer}
  </body>
</html>
    `;

// Create server with http module or different routes
const server = http.createServer((req, res) => {
  // Destructuring URL
  const { url } = req;

  // Home page route
  if (url === "/" || url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(homePage);
    // About page route
  } else if (url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(aboutPage);
    // Services page route
  } else if (url === "/services") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(servicesPage);
    // Contact page route
  } else if (url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(contactPage);
    // Not_Found_Page route
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(notFoundPage);
  }
});

// Server listening on PORT 3000
server.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
