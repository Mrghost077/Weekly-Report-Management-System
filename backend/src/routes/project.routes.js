import express from "express";

import { create,getAll,update,remove} from "../controllers/project.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";


const router = express.Router();


// Manager only
router.post(
    "/",
    authMiddleware,
    roleMiddleware("MANAGER"),
    create
);


// Everyone authenticated
router.get(
    "/",
    authMiddleware,
    getAll
);


// Manager only
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("MANAGER"),
    update
);


// Manager only
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("MANAGER"),
    remove
);


export default router;