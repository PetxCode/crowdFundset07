import express from "express";
import {
  accountVerification,
  allAccount,
  createAccount,
  firstAccountVerification,
} from "../controller/authController";

const router = express.Router();

router.route("/create-account").post(createAccount);
router.route("/all-account").get(allAccount);

router.route("/:token/first-mail").post(firstAccountVerification);

router.route("/:token/verify-account").get(accountVerification);

export default router;
