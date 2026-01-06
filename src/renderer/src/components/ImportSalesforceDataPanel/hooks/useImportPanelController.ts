import React from "react";
import { openImportSalesforceDataModal } from "@renderer/components/ImportSalesforceDataModal";

export function useImportPanelController() {
  const [importResult, setImportResult] = React.useState<object>();

  return {
    // Import
    openImportModal,
    importResult,
  };

  function openImportModal() {
    openImportSalesforceDataModal({
      setImportResult,
    });
  }
}
