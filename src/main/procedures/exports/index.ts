import { router } from "../../trpc/trpc.server";
import { exportAll } from "./export-all";

export const exports = router({
  exportAll,
});
