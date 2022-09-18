import { genericQuery as db } from "../app";
import { handler } from "../lib";

export const queriesController = {
  runQuery: handler(async (req, res, next) => {
    const query_string = req.body.query_string;
    const insertAppQuery = {
      text: `INSERT INTO queries(created_at, query_string) 
              VALUES($1, $2) returning id`,
      values: [new Date(), query_string],
    };
    const { done } = await db(global.mainClient, insertAppQuery);
    try {
      const newAppQuery = {
        text: query_string,
      };
      const { rows } = await db(global.client, newAppQuery);
      return rows;
    } catch (err) {
      return new Error(err.message);
    }
  }),

  getQueries: handler(async (req, res, next) => {
    const isVersion = req.query.version;
    let table = "queries";
    if (isVersion) {
      table = "queries_versions";
    }
    try {
      const newAppQuery = {
        text: `SELECT * from ${table}`,
      };
      const { rows } = await db(global.mainClient, newAppQuery);
      return rows;
    } catch (err) {
      return new Error(err.message);
    }
  }),

  saveQueries: handler(async (req, res, next) => {
    try {
      const query_string = req.body.query_string;
      const insertAppQuery = {
        text: `INSERT INTO queries_versions(created_at, query_string) 
                VALUES($1, $2)`,
        values: [new Date(), query_string],
      };
      const { rows } = await db(global.mainClient, insertAppQuery);
      return rows;
    } catch (err) {
      return new Error(err.message);
    }
  }),
};
