import { ModalService } from "@renderer/services/ModalService";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { fields } from "./fields/fields";
import { useSubmitSalesforceData } from "./hooks/useSubmitSalesforceData";
import { ImportSalesforceDataProps } from "./types";

export function ImportSalesforceData(props: ImportSalesforceDataProps) {
  const modalController = ModalService.useModalController();
  const submitSalesforceData = useSubmitSalesforceData(props);

  return (
    <ReactSpreadsheetImport
      isOpen={modalController.visible}
      onClose={modalController.remove}
      onSubmit={submitSalesforceData}
      fields={fields}
    />
  );
}
