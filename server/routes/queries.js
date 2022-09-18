"use strict";

import express from "express";

import { queriesController } from "../controller/queries";

const router = express.Router();

router.get("/", queriesController.getQueries);

router.post("/", queriesController.runQuery);

router.post("/versions", queriesController.saveQueries);

export const queriesRoute = router;
