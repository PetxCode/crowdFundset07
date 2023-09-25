import nodemailer from "nodemailer";
import { google } from "googleapis";

import path from "path";
import ejs from "ejs";
import jwt from "jsonwebtoken";

const googleID =
  "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const googleSecret = "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";
const googleRefresh =
  "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";
const googleURL = "https://developer.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(googleID, googleSecret, googleURL);

oAuth.setCredentials({ access_token: googleRefresh });

const URL: string = "http://localhost:3300";

export const sendFirstEmail = async (account: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientId: googleID,
        clientSecret: googleSecret,
        refreshToken: googleRefresh,
        accessToken: accessToken,
      },
    });

    const token = jwt.sign({ id: account.id }, "secret");

    const sharedData = {
      url: `${URL}/api/${token}/first-mail`,
      code: account.secretKey,
    };

    const pathData = path.join(__dirname, "../views/FirstMailSent.ejs");
    const realData = await ejs.renderFile(pathData, sharedData);

    const mailer = {
      from: "First Step-Account Opening 🚀🚀🚀 <codelabbest@gmail.com>",
      to: account.email,
      subject: "First Step",
      html: realData,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};

export const sendSecondEmail = async (account: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "codelabbest@gmail.com",
        clientId: googleID,
        clientSecret: googleSecret,
        refreshToken: googleRefresh,
        accessToken: accessToken,
      },
    });

    const token = jwt.sign({ id: account.id }, "secret");

    const sharedData = {
      url: `${URL}/api/${token}/verify-account`,
    };

    const pathData = path.join(__dirname, "../views/SecondMailSent.ejs");
    const realData = await ejs.renderFile(pathData, sharedData);

    const mailer = {
      from: "Final Step-Account Opening 🚀🚀🚀 <codelabbest@gmail.com>",
      to: account.email,
      subject: "Final Step",
      html: realData,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};
