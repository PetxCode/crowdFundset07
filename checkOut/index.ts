import express, { Application } from "express";
import cors from "cors";
import checkout from "./router/router";

const port: number = 3333;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", checkout);
app.listen(port, () => {
  console.log();
  console.log("Checkout Service connected...");
});
