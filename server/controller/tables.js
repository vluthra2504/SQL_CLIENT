import { genericQuery as db } from "../app";

export const tablesController = {
  getAllTables: async (req, res, next) => {
    try {
      const newAppQuery = {
        text: `SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'`,
      };
      // connections, users, queries
      const { rows } = await db(global.client, newAppQuery);
      let tables = [];
      let tableName;

      for (var i = 0; i < rows.length; i++) {
        let table = {};
        let row = rows[i];
        tableName = row.tablename.toString();
        const oldAppQuery = {
          text: `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${tableName}';`,
        };

        const schema = await db(global.client, oldAppQuery);

        table.name = tableName;
        table.schema = schema.rows;
        tables.push(table);
      }
      res.status(200).json({
        success: true,
        name: req.bodyname,
        data: tables,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: err.message,
      });
    }
  },
};
