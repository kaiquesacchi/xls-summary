import { ModalService } from "@renderer/services/ModalService";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { fields } from "./fields";

export function ImportCompanyStatement() {
  const modalController = ModalService.useModalController();
  return (
    <ReactSpreadsheetImport
      isOpen={modalController.visible}
      onClose={modalController.remove}
      onSubmit={(data) => {
        console.log(data);
      }}
      fields={fields}
    />
  );
}
