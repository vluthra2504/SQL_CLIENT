"use strict";

import express from "express";

import { connectionRoute } from "./connection.js";
import { queriesRoute } from "./queries.js";
import { tablesRoute } from "./tables.js";

const router = express.Router();

const use = (route, routes) => {
  router.use(route, routes);
};

use("/connections", connectionRoute);
use("/queries", queriesRoute);
use("/tables", tablesRoute);

export default router;
