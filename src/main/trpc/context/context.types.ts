import { PropertyPath } from "lodash";

export type Context = {
  execLog: {
    log: Record<string, unknown>;
    set: (path: PropertyPath, value: unknown) => void;
  };
};
