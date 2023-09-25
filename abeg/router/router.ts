import express from "express";
import {
  createAbeg,
  daleteBeg,
  updateBegInfo,
  viewAbeg,
} from "../controller/abegController";
import { verified } from "../utils/verified";

const router = express.Router();

router.route("/create-beg").post(verified, createAbeg);

router.route("/:begID/update-beg").post(updateBegInfo);

router.route("/:begID/view-beg").get(viewAbeg);

router.route("/:begID/delete-beg").delete(daleteBeg);

export default router;
