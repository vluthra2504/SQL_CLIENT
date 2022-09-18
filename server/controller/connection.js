import { genericQuery as db } from "../app";
import { Pool } from "pg";
import { tablesController } from "./tables";
import { handler } from "../lib";
var ip = require("ip");

export const connectionController = {
  getConnections: async (req, res, next) => {
    try {
      const newAppQuery = {
        text: `SELECT * from connections`,
      };
      const { rows } = await db(global.mainClient, newAppQuery);
      res.status(200).json({
        success: true,
        message: "Connecions Fetched",
        connections: rows,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: err.message,
      });
    }
  },

  updateConnection: handler(async (req, res, next) => {
    try {
      const { user, host, database, password, port, name } = req.body;
      const updateConnQuery = {
        text: `UPDATE connections SET username=$1, host=$2, db_name=$3, 
              password=$4, port=$5, name= $6, updated_at=$7 where id=$8`,
        values: [
          user,
          host,
          database,
          password,
          port,
          name,
          new Date(),
          req.params.id,
        ],
      };
      const { rows } = await db(global.mainClient, updateConnQuery);
      return rows;
    } catch (err) {
      return new Error(err.message);
    }
  }),

  getConnection: async (req, res, next) => {
    const checkConnQuery = {
      text: `SELECT * FROM connections where id=${req.params.id}`,
    };
    const { rows } = await db(global.mainClient, checkConnQuery);
    if (rows[0]) {
      const { name, username, host, db_name, port, password } = rows[0];
      global.client = new Pool({
        user: username,
        host: host,
        database: db_name,
        password: password,
        port: port,
      });
      global.client
        .connect()
        .then(async (result) => {
          if (result) {
            return tablesController.getAllTables(req, res, next);
          }
        })
        .catch((err) => {
          res.status(200).json({
            success: false,
            message: err.message,
          });
        });
    } else {
      res.status(200).json({
        success: false,
        message: "Connection id doesn't exist",
      });
    }
  },

  removeConnection: handler(async (req) => {
    try {
      const removeConnQuery = {
        text: `DELETE FROM connections where id=${req.params.id}`,
      };
      const { rows } = await db(global.mainClient, removeConnQuery);
      return rows;
    } catch (err) {
      return new Error(err.message);
    }
  }),

  createConnection: async (req, res, next) => {
    const { user, host, database, password, port, name } = req.body;

    global.client = new Pool({
      user: user,
      host: host,
      database: database,
      password: password,
      port: port,
    });

    global.client
      .connect()
      .then(async (result) => {
        if (result) {
          const newAppQuery = {
            name: "create-connections",
            text: `INSERT INTO connections(created_at, updated_at, user_id, 
                    host, port, username, password, db_name, name) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) returning name `,
            values: [
              new Date(),
              new Date(),
              1,
              host,
              port,
              user,
              password,
              database,
              name,
            ],
          };
          const { rows } = await db(global.mainClient, newAppQuery);
          return tablesController.getAllTables(req, res, next);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(200).json({
          success: false,
          message: err.message,
        });
      });
  },
};
