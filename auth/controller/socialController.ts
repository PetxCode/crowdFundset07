import { Request, Response } from "express";
import passport from "passport";
import "../utils/social";
// "/auth/google",
export const socialAuth = async () => {
  await passport.authenticate("google", { scope: ["profile", "email"] });
};

export const socialAuthFinal = async () => {
  passport.authenticate("google", { failureRedirect: "/login" }),
    async (req: Request, res: Response) => {
      const user = req.user;
      res.status(200).json({
        message: "Well done...!",
        data: user,
      });
    };
};

// "/auth/google/callback",
