import { t } from "../init";

export const logIO = t.middleware(async (input) => {
  const reqName = `${input.type} ${input.path}`;
  const startTimestamp = Date.now();
  const result = await input.next();
  const endTimestamp = Date.now();
  const duration = `${endTimestamp - startTimestamp}ms`;

  if (result.ok) {
    console.log(
      `✅ [${reqName} - ${duration}]: ${JSON.stringify(result.data)}`,
    );
  } else {
    console.log(
      `❌ [${reqName} - ${duration}]: ${JSON.stringify(result.error)}`,
    );
  }
  return result;
});
