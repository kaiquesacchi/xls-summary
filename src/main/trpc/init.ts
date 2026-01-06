import { initTRPC } from "@trpc/server";
import { Context } from "./context/context.types";

export const t = initTRPC.context<Context>().create({ isServer: true });
