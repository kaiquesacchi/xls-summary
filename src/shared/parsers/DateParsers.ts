import { isValid, parse } from "date-fns";
import { ResultService } from "../services/ResultService";

export const DateParsers = {
  fromDirtyString,
};

function fromDirtyString(input: string) {
  const brDateFormat = parse(input, "dd/MM/yyyy", new Date());
  if (isValid(brDateFormat)) return ResultService.ok(brDateFormat);
  const usDateFormat = parse(input, "MM/dd/yyyy", new Date());
  if (isValid(usDateFormat)) return ResultService.ok(usDateFormat);
  const isoDateFormat = parse(input, "yyyy-MM-dd", new Date());
  if (isValid(isoDateFormat)) return ResultService.ok(isoDateFormat);

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
