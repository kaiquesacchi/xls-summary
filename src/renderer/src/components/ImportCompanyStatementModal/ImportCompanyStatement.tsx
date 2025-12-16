import { ModalService } from "@renderer/services/ModalService";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { fields } from "./fields";
import { useSubmitCompanyStatement } from "./hooks/useSubmitCompanyStatement";

export function ImportCompanyStatement() {
  const modalController = ModalService.useModalController();
  const submitCompanyStatement = useSubmitCompanyStatement();

  return (
    <ReactSpreadsheetImport
      isOpen={modalController.visible}
      onClose={modalController.remove}
      onSubmit={submitCompanyStatement}
      fields={fields}
    />
  );
}
