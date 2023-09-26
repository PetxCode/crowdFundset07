import passport from "passport";
import GoogleStrate from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

import decode from "jwt-decode";

const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID =
  "199704572461-mqftjmpvtc6k62t49ki4mshaocr0e6hf.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      callback: any
    ) {
      try {
        if (profile.id_token) {
          const data: any = decode(profile.id_token);
          console.log(data);
          if (data) {
            const user = await prisma.crowdAuth.findUnique({
              where: { email: data.email },
            });

            if (user) {
              return callback(null, user);
            } else {
              const newUser = await prisma.crowdAuth.create({
                data: {
                  email: data.email,
                  password: "",
                  secretKey: "er45",
                  token: "",
                  verify: data.email_verified,
                  abeg: [],
                  profile: [],
                },
              });

              return callback(null, newUser);
            }
          } else {
            console.log("check Token...");
          }
        } else {
          const user = await prisma.crowdAuth.findUnique({
            where: { email: profile._json.email },
          });

          if (user) {
            return callback(null, user);
          } else {
            const newUser = await prisma.crowdAuth.create({
              data: {
                email: profile._json.email,
                password: "",
                secretKey: "er45",
                token: "",
                verify: true,
                abeg: [],
                profile: [],
              },
            });

            return callback(null, newUser);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);
