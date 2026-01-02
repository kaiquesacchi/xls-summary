import { router } from "../../trpc/trpc.server";
import { countDbEntries } from "./countDbEntries";

export const database = router({
  countDbEntries,
});
