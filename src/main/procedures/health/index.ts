import { procedure, router } from "../../trpc/trpc.server";

export const health = router({
  ok: procedure.query(() => "OK"),
});
