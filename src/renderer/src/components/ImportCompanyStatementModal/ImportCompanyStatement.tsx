import { ModalService } from "@renderer/services/ModalService";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { fields } from "./fields/fields";
import { useSubmitCompanyStatement } from "./hooks/useSubmitCompanyStatement";
import { ImportCompanyStatementModalProps } from "./types";

export function ImportCompanyStatement(
  props: ImportCompanyStatementModalProps,
) {
  const modalController = ModalService.useModalController();
  const submitCompanyStatement = useSubmitCompanyStatement(props);

  return (
    <ReactSpreadsheetImport
      isOpen={modalController.visible}
      onClose={modalController.remove}
      onSubmit={submitCompanyStatement}
      fields={fields}
    />
  );
}
