import { openImportCompanyStatementModal } from "@renderer/components/ImportCompanyStatementModal";
import { trpc } from "@renderer/utils/trpc/trpc.client";
import React from "react";
import { TransactionTypes } from "../../../../../shared/concepts/TransactionTypes";

export function useImportPanelController() {
  const insuranceCompanies = trpc.insuranceCompanies.list.useQuery();
  const insuranceCompaniesSelectRef = React.useRef<HTMLSelectElement>(null);
  const transactionTypesRef = React.useRef<HTMLSelectElement>(null);
  const [importResult, setImportResult] = React.useState<object>();

  const transactionTypes = getTransactionTypes();

  return {
    // Form data
    insuranceCompanies: {
      data: insuranceCompanies.data,
      isLoading: insuranceCompanies.isFetching,
      refetch: () => {
        void insuranceCompanies.refetch();
      },
    },
    transactionTypes,

    // Form fields
    insuranceCompaniesSelectRef,
    transactionTypesRef,

    // Import
    openImportModal,
    importResult,
  };

  function openImportModal() {
    openImportCompanyStatementModal({
      insuranceCompanyId: Number(insuranceCompaniesSelectRef.current?.value),
      transactionType: getSelectedTransactionType(),
      setImportResult,
    });
  }

  function getTransactionTypes() {
    return [
      { label: "Inferir da planilha", key: "" },
      ...TransactionTypes.list,
    ] as const;
  }

  function getSelectedTransactionType() {
    if (!transactionTypesRef.current?.value) return null;
    return transactionTypesRef.current.value as Exclude<
      (typeof transactionTypes)[number]["key"],
      ""
    >;
  }
}
