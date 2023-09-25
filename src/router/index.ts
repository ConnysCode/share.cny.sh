import convert from "./convert";
import Elysia from "elysia";

export default () => {
  const app = new Elysia();

  app.post("/convert", convert);

  app.get("/", (ctx) => {
    ctx.set.redirect = 'https://github.com/ConnysCode/share.cny.sh';
    return;
  });

  return app;
};
