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
      transactionType: transactionTypesRef.current
        ?.value as (typeof transactionTypes)[number]["key"],
      setImportResult,
    });
  }

  function getTransactionTypes() {
    return [
      { label: "Inferir da planilha", key: undefined },
      ...TransactionTypes.list,
    ] as const;
  }
}
