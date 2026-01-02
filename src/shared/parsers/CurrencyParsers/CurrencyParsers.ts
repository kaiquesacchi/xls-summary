import { ResultService } from "../../services/ResultService";

export const CurrencyParsers = { fromDirtyString };

function fromDirtyString(input: string) {
  const isNegative = /-\s*[^\d]*\d/.test(input);

  const match = /\d{1,3}(?:[.,]\d{3})+(?:[.,]\d+)?|\d+(?:[.,]\d+)?/.exec(input);

  if (!match) {
    return ResultService.error({
      type: "Invalid currency format",
      origin: "CurrencyParsers.fromDirtyString",
      error: {
        cause: input,
        name: "InvalidCurrencyFormat",
        message: "Currency format is invalid",
        stack: "",
        stringifiedError: "",
      },
    });
  }

  let numeric = match[0];

  // Detecta qual é o separador decimal (último ponto ou vírgula)
  const lastComma = numeric.lastIndexOf(",");
  const lastDot = numeric.lastIndexOf(".");

  let decimalSeparator = "";
  if (lastComma > lastDot) decimalSeparator = ",";
  else if (lastDot > lastComma) decimalSeparator = ".";

  // Remove separadores de milhar
  if (decimalSeparator === ",") {
    numeric = numeric.replace(/\./g, "").replace(",", ".");
  } else {
    numeric = numeric.replace(/,/g, "");
  }

  let numberValue = Number(numeric);

  if (Number.isNaN(numberValue)) {
    return ResultService.error({
      type: "Invalid number",
      origin: "CurrencyParsers.fromDirtyString",
      error: {
        cause: input,
        name: "InvalidNumber",
        message: "Evaluated to NaN",
        stack: "",
        stringifiedError: "",
      },
    });
  }

  if (isNegative) numberValue *= -1;
  return ResultService.ok(Math.round(numberValue * 100));
}
