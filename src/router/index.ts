import express, { json } from "express";
import convert from "./convert";
import Elysia, { t } from "elysia";

export default () => {
  const app = new Elysia();

  app.post("/convert", convert, {
    body: t.Object({
      url: t.String(),
    }),
  });

  app.get("/", (ctx) => {
    ctx.set.redirect = 'https://github.com/ConnysCode/share.cny.sh';
    return;
  });

  return app;
};
