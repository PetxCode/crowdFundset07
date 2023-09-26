import express, { Application, NextFunction, Response } from "express";
import cors from "cors";
import abeg from "./router/router";
import { consumeConnection } from "./utils/connection";
import passport from "passport";
import "./utils/social";
import cookieSession from "cookie-session";

const port: number = 3322;
const app: Application = express();

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user!);
});

app
  .use(
    cookieSession({
      name: `${process.env.SESSION_NAME}`,
      keys: [`${process.env.SESSION_KEY}`],
      maxAge: 2 * 60 * 60 * 100,
    })
  )

  .use((req: any, res: Response, next: NextFunction) => {
    if (req.session && !req.session.regenerate) {
      req.session.regenerate = (cb: any) => {
        cb();
      };
    }
    if (req.session && !req.session.save) {
      req.session.save = (cb: any) => {
        cb();
      };
    }
    next();
  })
  .use(passport.initialize())
  .use(passport.session());

app.use(cors());
app.use(express.json());

app.use("/api", abeg);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    // res.redirect("/");
    res.status(200).json({
      message: "Well done...!",
    });
  }
);

app.listen(port, () => {
  console.log();
  console.log("Abeg Service connected...");
});

consumeConnection("check");
