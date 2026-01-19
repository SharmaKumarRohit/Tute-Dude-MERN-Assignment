# MERN Stack Project

- M: MongoDB (DB)
- E: ExpressJS (Backend)
- R: ReactJS (Frontend)
- N: NodeJS (Backend)

## Frontend (Browser / Client Side) Backend (Server) DB

    React APP               ExpressJS+NodeJS            MongoDB

## Live links:

- Frontend hosted on vercel: [Live demo link](https://tute-dude-mern-assignment.vercel.app/)
- Backend hosted on render: [Live demo link](https://tute-dude-mern-assignment.onrender.com)

## Project Preview Image

![preview_image](preview_img.png)

## Project Features

- Retrieving the list of todo.
- Creating a new todo.
- Updating todo details.
- Deleting a todo.
- Toggle completed (`true` or `false`)
- Search todo with debouncing feature
- Developing for backend using `MVC` architecture

## Endpoints, Methods and their Description

| Endpoint | Method              | Description                               |
| -------- | ------------------- | ----------------------------------------- |
| Get      | `/todos`            | Get all the todos                         |
| POST     | `/todos`            | Create a new todo                         |
| GET      | `/todos/:id`        | Get a single todo                         |
| PATCH    | `/todos/toggle/:id` | Toggle todo completed (`true` or `false`) |
| DELETE   | `/todos/:id`        | Delete a single todo                      |
| PATCH    | `/todos/:id`        | Update a single todo                      |

## Backend:

- Backend setup installation commands:

```bash
npm init -y
npm install express / npm i express
npm i nodemon --save-dev
npm i mongoose
npm i cors
npm i dotenv
```

- Run backend code for this command:

```bash
npm run dev
```

- `.env` file setup data

```bash
PORT=4000
MONGO_URI=mongodb+srv://<db_user>:<db_pass>@cluster0.wgvhanf.mongodb.net/
```

## Frontend setup installation commands:

```bash
npm create vite@latest
npm i react-router-dom
npm i axios
npm i date-fns
```

- Local host BASE_URI

```bash
http://localhost:4000/api
```
