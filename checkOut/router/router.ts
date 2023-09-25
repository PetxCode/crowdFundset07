import express from "express";
import {
  createCheckOutWithWallet,
  createCheckOutWithPaystack,
} from "../controller/checkoutController";
import { verified } from "../utils/verified";

const router = express.Router();

router
  .route("/:begID/pay-with-wallet")
  .post(verified, createCheckOutWithWallet);

router.route("/:begID/pay-with-paystack").post(createCheckOutWithPaystack);

export default router;
