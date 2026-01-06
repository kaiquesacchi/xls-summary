import { ResultService } from "../services/ResultService";
import { DateTime } from "luxon";

export const DateParsers = {
  fromDirtyString,
};

function fromDirtyString(input: string) {
  const brDateFormat = DateTime.fromFormat(input, "dd/MM/yyyy");
  if (brDateFormat.isValid) return ResultService.ok(brDateFormat);
  const usDateFormat = DateTime.fromFormat(input, "MM/dd/yyyy");
  if (usDateFormat.isValid) return ResultService.ok(usDateFormat);
  const isoDateFormat = DateTime.fromFormat(input, "yyyy-MM-dd");
  if (isoDateFormat.isValid) return ResultService.ok(isoDateFormat);

  return ResultService.error({
    origin: "DateParsers.fromDirtyString",
    type: "Invalid date format",
    error: {
      message: "Date format is invalid",
      cause: input,
      name: "InvalidDateFormat",
      stack: "",
      stringifiedError: "",
    },
  });
}
