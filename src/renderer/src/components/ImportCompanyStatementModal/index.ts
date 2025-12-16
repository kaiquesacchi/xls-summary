import { ModalService } from "@renderer/services/ModalService";
import { ImportCompanyStatement } from "./ImportCompanyStatement";
import { ImportCompanyStatementModalProps } from "./types";

const MODAL_ImportCompanyStatementModal = ModalService.create(
  ImportCompanyStatement,
);

export function openImportCompanyStatementModal(
  props: ImportCompanyStatementModalProps,
) {
  ModalService.show(MODAL_ImportCompanyStatementModal, props);
}
