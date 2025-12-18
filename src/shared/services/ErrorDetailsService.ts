import * as z from "zod";

export const ErrorDetailsService = {
  fromUnknown,
  fromZod,
};

export type ErrorDetails = Readonly<{
  /** Additional data about the causing issue */
  cause: string;
  /** The most important information provided by the error */
  message: string;
  /** Name of the Error class */
  name: string;
  /** Stringified version of the `error.stack` */
  stack: string;
  /** A complete stringified version of the error, for further analysis */
  stringifiedError: string;
}>;

/** Extracts details from an untyped error and formats it as a typed object */
function fromUnknown(error: unknown) {
  return {
    message: extractField(error, "message"),
    cause: extractField(error, "cause"),
    name: extractField(error, "name"),
    stack: extractField(error, "stack"),
    stringifiedError: stringify(error),
  } as const satisfies ErrorDetails;
}

/** Converts a ZodError into a DetailedError */
export function fromZod(error: z.ZodError, invalidInput: unknown) {
  // eslint-disable-next-line zod-x/require-schema-suffix
  const prettyError = z.prettifyError(error);
  return {
    message: prettyError,
    cause: JSON.stringify(invalidInput),
    name: error.name,
    stack: error.stack ?? "FIELD UNAVAILABLE",
    stringifiedError: stringify(error),
  } as const satisfies ErrorDetails;
}

/** Stringifies an unknown value */
function stringify(input: unknown) {
  // If already a string, return it
  if (typeof input === "string") return input;
  try {
    // Otherwise, try to stringify as a JSON. `getOwnPropertyNames` is needed
    // for Error objects.
    return JSON.stringify(input, Object.getOwnPropertyNames(input));
  } catch {
    return String(input);
  }
}

/** Attempts to extract a field from an unknown value */
function extractField(error: unknown, key: string) {
  if (error !== null && typeof error === "object" && key in error) {
    return stringify(error[key as keyof typeof error]);
  }

  return "FIELD UNAVAILABLE";
}
