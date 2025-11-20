/* eslint-disable @typescript-eslint/consistent-type-definitions */
import "react-spreadsheet-import";

declare module "react-spreadsheet-import" {
  export type ErrorLevel = "info" | "warning" | "error";

  export type Validation =
    | RequiredValidation
    | UniqueValidation
    | RegexValidation;

  export type RequiredValidation = {
    rule: "required";
    errorMessage?: string;
    level?: ErrorLevel;
  };

  export type UniqueValidation = {
    rule: "unique";
    allowEmpty?: boolean;
    errorMessage?: string;
    level?: ErrorLevel;
  };

  export type RegexValidation = {
    rule: "regex";
    value: string;
    flags?: string;
    errorMessage: string;
    level?: ErrorLevel;
  };

  export type FieldType = Checkbox | Select | Input;

  export type Checkbox = {
    type: "checkbox";
    /** Alternate values to be treated as booleans, e.g. {yes: true, no: false} */
    booleanMatches?: Record<string, boolean>;
  };

  export type Select = {
    type: "select";
    /** Options displayed in Select component */
    options: readonly SelectOption[];
  };

  export type SelectOption = {
    /** UI-facing option label */
    label: string;
    /** Field entry matching criteria as well as select output */
    value: string;
  };

  export type Input = {
    type: "input";
  };

  type Fields = Readonly<
    readonly {
      /** UI-facing field label*/
      label: string;
      /** Field's unique identifier*/
      key: string;
      /** UI-facing additional information displayed via tooltip and ? icon*/
      description?: string;
      /** Alternate labels used for fields' auto-matching
       * @example "fname" -> "firstName"
       * */
      alternateMatches?: readonly string[];
      /** Validations used for field entries*/
      validations?: readonly Validation[];
      /** Field entry component, default: Input*/
      fieldType: FieldType;
      /** UI-facing values shown to user as field examples pre-upload phase*/
      example?: string;
    }[]
  >;
}
