import { type AppRouter } from "../../../../main/procedures";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
