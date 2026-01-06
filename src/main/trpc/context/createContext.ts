import { Context } from "./context.types";

export function createContext(): Context {
  return {
    execLog: {},
  };
}
