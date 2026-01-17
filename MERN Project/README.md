# MERN Stack Project

- M: MongoDB (DB)
- E: ExpressJS (Backend)
- R: ReactJS (Frontend)
- N: NodeJS (Backend)

## Frontend (Browser / Client Side) Backend (Server) DB

    React APP               ExpressJS+NodeJS            MongoDB

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

## Endpoints, Methods and their Description

| Endpoint | Method          | Description                 |
| -------- | --------------- | --------------------------- |
| Get      | `/workouts`     | Get all the Workout docs    |
| POST     | `/workouts`     | Create a new workout doc    |
| GET      | `/workouts/:id` | Get a single workout doc    |
| DELETE   | `/workouts/:id` | Delete a single workout doc |
| PATCH    | `/workouts/:id` | Update a single workout     |

## Frontend setup installation commands:

```bash
npm create vite@latest
npm install tailwindcss @tailwindcss/vite
npm i react-router-dom
npm i react-icons
npm i date-fns
```

- Base_URL

```bash
http://localhost:4000/api
```
