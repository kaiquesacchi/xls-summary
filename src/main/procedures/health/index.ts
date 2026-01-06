import { DateTime } from "luxon";
import { procedure, router } from "../../trpc/trpc.server";

export const health = router({
  ok: procedure.query(({ ctx }) => {
    ctx.execLog.set("health.ok", DateTime.now().toISO());
    return "OK";
  }),
});
