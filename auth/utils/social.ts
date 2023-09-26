import passport from "passport";
import GoogleStrate from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
const GoogleStrategy = GoogleStrate.Strategy;
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
    async (
      accessToken: any,
      refreshToken: any,
      profile: any,
      callback: any,
      err: any
    ) => {
      const data: any = decode(profile.id_token);
      console.log(data.email);

      // console.log(profile.emails[0].value);

      const user = await prisma.crowdAuth.findUnique({
        where: { email: data.email },
      });

      if (user) {
        console.log("User Present");

        return callback(err, user);
      } else {
        console.log("User not found");

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

        return callback(err, newUser);
      }

      // return cb;

      // User.findOrCreate({ googleId: profile.id },  (err:any, user:any) => {

      //   return cb;
      // });
    }
  )
);
