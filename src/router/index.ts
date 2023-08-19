import express, { json } from "express";
import convert from "./convert";

export default () => {
  const app = express();
  app.use(json());

  app.post("/convert", convert);

  app.use("/", (_req, res) => {
    res.redirect("https://github.com/ConnysCode/share.cny.sh");
  });

  return app;
};
