import express from "express";
import {
  updateCompanyProfile,
  createProfile,
  viewProfile,
  daleteProfile,
} from "../controller/profileController";
import { verified } from "../utils/verified";

const router = express.Router();

router.route("/create-profile").post(verified, createProfile);

router.route("/:profileID/update-company-info").post(updateCompanyProfile);

router.route("/:profileID/view-profile").get(viewProfile);

router.route("/:profileID/delete-profile").delete(daleteProfile);

export default router;
