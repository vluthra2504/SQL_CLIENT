"use strict";

import express from "express";

import { tablesController } from "../controller/tables";

const router = express.Router();

router.get("/", tablesController.getAllTables);

export const tablesRoute = router;
