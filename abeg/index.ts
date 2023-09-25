import express, { Application } from "express";
import cors from "cors";
import abeg from "./router/router";

const port: number = 3322;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", abeg);
app.listen(port, () => {
  console.log();
  console.log("Abeg Service connected...");
});
