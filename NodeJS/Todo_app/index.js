const http = require("http");

const PORT = 8081;

const todoList = ["Rohit Kumar", "Self", "Software Developer"];

http
  .createServer((req, res) => {
    const { method, url } = req;

    if (url.toLowerCase() === "/todos") {
      if (method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(todoList.toString());
      } else if (method === "POST") {
        let body = "";
        req
          .on("error", (error) => console.error(error))
          .on("data", (chunk) => {
            body += chunk;
            // console.log("Chunk:", chunk);
          })
          .on("end", () => {
            body = JSON.parse(body);
            // console.log("Body:", body);
            const newTodo = todoList;
            newTodo.push(body.item);
          });
      } else if (method === "DELETE") {
        let body = "";
        req
          .on("error", (error) => console.error(error))
          .on("data", (chunk) => {
            body += chunk;
          })
          .on("end", () => {
            body = JSON.parse(body);
            // const index = todoList.indexOf(body.item);
            // if (index > -1) {
            //   todoList.splice(index, 1);
            // }
            for (let i = 0; i < todoList.length; i++) {
              if (todoList[i] === body.item) {
                todoList.splice(i, 1);
                break;
              }
            }
          });
      } else {
        res.writeHead(501);
      }
    } else {
      res.writeHead(404);
    }
    res.end();
  })
  .listen(PORT, () =>
    console.log(`Server is running on port http://localhost:${PORT}`)
  );
