import express, { Application } from "express";
import cors from "cors";
import abeg from "./router/router";
import { consumeConnection } from "./utils/connection";

const port: number = 3322;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", abeg);
app.listen(port, () => {
  console.log();
  console.log("Abeg Service connected...");
});

consumeConnection("check");
