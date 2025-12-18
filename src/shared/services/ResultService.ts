import { ErrorDetailsService, type ErrorDetails } from "./ErrorDetailsService";

export const ResultService = { fromPromise, ok, error };

/** Converts a promise into a Result */
async function fromPromise<Value, ErrorType extends string>(
  promise: Promise<Value>,
  handleError: (
    errorDetails: ErrorDetails,
    rawError: unknown,
  ) => BaseError<ErrorType>,
) {
  try {
    const value = await promise;
    return ok(value);
  } catch (rawError: unknown) {
    const errorDetails = ErrorDetailsService.fromUnknown(rawError);
    return error(handleError(errorDetails, rawError));
  }
}

/** Creates an `ok` Result */
function ok<Value>(value: Value): Result<Value, never> {
  return { ok: true, value } as const;
}

/** Creates an `error` Result */
function error<ErrorType extends string>(
  error: BaseError<ErrorType>,
): Result<never, ErrorType> {
  return { ok: false, error } as const;
}

type Result<Success, ErrorType extends string> = Readonly<
  | {
      ok: true;
      value: Success;
    }
  | {
      ok: false;
      error: BaseError<ErrorType>;
    }
>;

type BaseError<ErrorType extends string> = Readonly<{
  type: ErrorType;
  origin: string;
  error: ErrorDetails;
}>;
