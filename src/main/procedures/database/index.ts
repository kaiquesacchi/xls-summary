import { router } from "../../trpc/trpc.server";
import { countDbEntries } from "./countDbEntries";
import { seed } from "./seed";

export const database = router({
  countDbEntries,
  seed,
});
