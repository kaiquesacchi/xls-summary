import { TransactionType } from "src/shared/concepts/TransactionTypes";

export type ImportCompanyStatementModalProps = {
  insuranceCompanyId: number;
  transactionType: TransactionType | undefined;
  setImportResult: (data: object) => void;
};
