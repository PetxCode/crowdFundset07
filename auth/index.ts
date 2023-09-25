import express, { Application } from "express";
import cors from "cors";
import auth from "./router/router";
import { consumeAbegConnection, consumeConnection } from "./utils/connection";

const port: number = 3300;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", auth);
app.listen(port, () => {
  console.log("Auth Service connected...");
});

consumeConnection("profile");
consumeAbegConnection("beg");
