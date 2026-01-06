import { ModalService } from "@renderer/services/ModalService";
import { ImportSalesforceData } from "./ImportSalesforceData";
import { ImportSalesforceDataProps } from "./types";

const MODAL_ImportSalesforceDataModal =
  ModalService.create(ImportSalesforceData);

export function openImportSalesforceDataModal(
  props: ImportSalesforceDataProps,
) {
  ModalService.show(MODAL_ImportSalesforceDataModal, props);
}
