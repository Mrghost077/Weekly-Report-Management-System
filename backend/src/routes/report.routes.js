import express from "express";

import { create, getMine, update, submit, getAll} from "../controllers/report.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";


const router = express.Router();


router.post(
    "/",
    authMiddleware,
    create
);


router.get(
    "/my",
    authMiddleware,
    getMine
);

router.put(
    "/:id",
    authMiddleware,
    update
);


router.patch(
    "/:id/submit",
    authMiddleware,
    submit
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware("MANAGER"),
    getAll
);

export default router;