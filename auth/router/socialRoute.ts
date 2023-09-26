import express from "express";
import { socialAuth, socialAuthFinal } from "../controller/socialController";

const router = express.Router();

router.route("/auth/google").get(socialAuth);
router.route("/auth/google/callback").get(socialAuthFinal);

export default router;
