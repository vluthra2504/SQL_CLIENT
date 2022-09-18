import { Client } from "pg";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import initializingQuery from "./utils/migrations/init-query";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

// DB initialization
global.client = null;

global.mainClient = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

global.mainClient
  .connect()
  .then((res) => {
    if (true) console.log("PostgreSQL connected");
  })
  .catch((err) => {
    console.error(err);
  });

// a generic query, that executes all queries you send to it
export const genericQuery = (client, text) => {
  return new Promise((resolve, reject) => {
    client
      .query(text)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "SQL Client API",
  });
});

app.get("/migrateDB", (req, res) => {
  genericQuery(global.mainClient, initializingQuery);
  return res.status(200).json({
    message: "SQL Client API",
  });
});

module.exports = app;
