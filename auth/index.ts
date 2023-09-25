import express, { Application } from "express";
import cors from "cors";
import auth from "./router/router";

const port: number = 3300;
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", auth);
app.listen(port, () => {
  console.log("Auth Service connected...");
});