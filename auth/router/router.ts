import express from "express";
import {
  accountVerification,
  createAccount,
  firstAccountVerification,
} from "../controller/authController";

const router = express.Router();

router.route("/create-account").post(createAccount);

router.route("/:token/first-mail").post(firstAccountVerification);

router.route("/:token/verify-account").get(accountVerification);

export default router;
