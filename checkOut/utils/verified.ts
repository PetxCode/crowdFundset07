import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verified = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, "secret", (error: any, payload: any) => {
        if (error) {
          return res.status(401).json({ message: "Token is not valid" });
        } else {
          req.user = payload;
          next();
        }
      });
    } else {
      return res.status(404).json({
        message: "Error with Token",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error ",
    });
  }
};
