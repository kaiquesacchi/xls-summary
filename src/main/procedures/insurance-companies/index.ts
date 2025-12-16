import { router } from "../../trpc/trpc.server";
import { list } from "./list";

export const insuranceCompanies = router({
  list,
});
