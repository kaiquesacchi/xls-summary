import { TransactionType } from "src/shared/concepts/TransactionTypes";

export type ImportCompanyStatementModalProps = {
  insuranceCompanyId: number;
  transactionType: TransactionType | null;
  setImportResult: (data: object) => void;
};
