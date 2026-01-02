import { t } from "./init";
import { logIO } from "./middlewares/logIO.middleware";

export const router = t.router;
export const procedure = t.procedure.use(logIO);
