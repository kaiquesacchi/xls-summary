import { ModalService } from "@renderer/services/ModalService";
import { ImportCompanyStatement } from "./ImportCompanyStatement";

const MODAL_ImportCompanyStatementModal = ModalService.create(
  ImportCompanyStatement,
);

export function openImportCompanyStatementModal() {
  ModalService.show(MODAL_ImportCompanyStatementModal, {});
}
