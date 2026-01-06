import { Context } from "./context.types";
import { set as lodashSet, PropertyPath } from "lodash";

export async function createContext(): Promise<Context> {
  const log = {};

  return new Promise((resolve) => {
    resolve({
      execLog: {
        log,
        set,
      },
    });
  });

  function set(path: PropertyPath, value: unknown) {
    lodashSet(log, path, value);
  }
}
