import { chain, isEqual, isObject, join, map } from "lodash";

const debug = (requestId?: string, ...args: any[]) => {
  const debug = isEqual(process.env.DEBUG, "true");
  const contents = map(args, (arg) =>
    isObject(arg) ? JSON.stringify(arg, undefined, 0) : `${arg}`
  ).join(" ");

  if (debug) {
    console.log(`[Debug${requestId ? ` | ${requestId}` : ``}] ${contents}`);
  }
};

export default debug;
