import passport from "passport";
import GoogleStrate from "passport-google-oauth20";

const GoogleStrategy = GoogleStrate.Strategy;

const GOOGLE_CLIENT_ID =
  "199704572461-mqftjmpvtc6k62t49ki4mshaocr0e6hf.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb: any) => {
      console.log("Message");

      return cb;

      // User.findOrCreate({ googleId: profile.id },  (err:any, user:any) => {

      //   return cb;
      // });
    }
  )
);
