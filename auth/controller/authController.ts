import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendFirstEmail, sendSecondEmail } from "../utils/email";

const prisma = new PrismaClient();

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const tokenValue = crypto.randomBytes(2).toString("hex");
    const secretKey = crypto.randomBytes(2).toString("hex");
    const token = jwt.sign(tokenValue, "token");

    const account = await prisma.crowdAuth.create({
      data: {
        email,
        password,
        secretKey,
        token,

        profile: [],
        abeg: [],
      },
    });

    sendFirstEmail(account).then(() => {
      console.log("Mail Sent...");
    });

    return res.status(201).json({
      message: "Your Account has been created successfully",
      data: account,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const allAccount = async (req: Request, res: Response) => {
  try {
    const account = await prisma.crowdAuth.findMany({});

    return res.status(200).json({
      message: "Viewing all Account",
      data: account,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const getSingleAccount = async (req: Request, res: Response) => {
  try {
    const { accountID } = req.params;

    const account = await prisma.crowdAuth.findUnique({
      where: { id: accountID },
    });

    return res.status(200).json({
      message: "Viewing single Account",
      data: account,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const firstAccountVerification = async (req: Request, res: Response) => {
  try {
    const { secretKey } = req.body;
    const { token } = req.params;

    jwt.verify(token, "secret", async (error, payload: any) => {
      if (error) {
        throw new Error();
      } else {
        const account = await prisma.crowdAuth.findUnique({
          where: { id: payload.id },
        });

        if (account?.secretKey === secretKey) {
          sendSecondEmail(account).then(() => {
            console.log("Mail Sent...");
          });

          return res.status(200).json({
            message: "PLease to verify your Account",
          });
        } else {
          return res.status(404).json({
            message: "Error with your Token",
          });
        }
      }
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const accountVerification = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    jwt.verify(token, "secret", async (error, payload: any) => {
      if (error) {
        throw new Error();
      } else {
        const account = await prisma.crowdAuth.findUnique({
          where: { id: payload.id },
        });

        if (account) {
          await prisma.crowdAuth.update({
            where: { id: payload.id },
            data: {
              token: "",
              verify: true,
            },
          });

          return res.status(200).json({
            message: "Congratulation your account has been Verifify!!!",
          });
        } else {
          return res.status(404).json({
            message: "Error with your Token",
          });
        }
      }
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
