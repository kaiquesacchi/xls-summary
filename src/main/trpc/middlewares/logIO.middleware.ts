import { DateTime } from "luxon";
import { t } from "../init";

type Log = {
  trpcEndpoint: {
    type: string;
    path: string;
    input: unknown;
  };
  time: {
    start: string;
    end: string;
    duration: string;
  };
  error?: unknown; // TODO: Use ErrorDetails
  data?: unknown;
  exec?: unknown;
};

export const logIO = t.middleware(async (input) => {
  const start = DateTime.now();
  const result = await input.next();
  const end = DateTime.now();

  const log: Log = {
    time: {
      start: start.toISO(),
      end: end.toISO(),
      duration: `${end.diff(start).toMillis()}ms`,
    },
    trpcEndpoint: {
      type: input.type,
      path: input.path,
      input: input.input,
    },
    data: result.ok ? result.data : undefined,
    error: result.ok ? undefined : result.error,
    exec: input.ctx.execLog,
  };

  console.log(JSON.stringify(log));

  return result;
});
