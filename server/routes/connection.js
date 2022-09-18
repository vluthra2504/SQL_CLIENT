"use strict";

import express from "express";

import { connectionController } from "../controller/connection";

const router = express.Router();

router.get("/", connectionController.getConnections);

router.get("/:id", connectionController.getConnection);

router.post("/", connectionController.createConnection);

router.delete("/:id", connectionController.removeConnection);

router.put("/:id", connectionController.updateConnection);

export const connectionRoute = router;
