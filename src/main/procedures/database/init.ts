import { execSync } from "node:child_process";
import { procedure } from "../../trpc/trpc.server";

export const init = procedure.mutation(() => {
  execSync("pnpm db:push", { stdio: "inherit" });
});
