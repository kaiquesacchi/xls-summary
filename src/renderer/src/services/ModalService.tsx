import NiceModal, { type NiceModalHocProps } from "@ebay/nice-modal-react";
import React from "react";

/** Used to register a modal component to the context.
 *
 * > The modal prop 'id' is reserved and therefore cannot be used
 * @example ```
 * const Modal: React.FC<Props> = () => {...}
 * export default ModalService.create(Modal)
 * ```
 */
function create<TProps extends object>(
  component: React.FC<TProps extends { id: unknown } ? never : TProps>,
) {
  return NiceModal.create(component);
}

/** Displays the modal */
function show<T extends object>(
  component: React.FC<T & NiceModalHocProps>,
  props: T,
) {
  void NiceModal.show(component, props);
}

/** Hides the modal */
function hide<T extends object>(component: React.FC<T & NiceModalHocProps>) {
  void NiceModal.hide(component);
}

/** Hook that should be used inside the modal to access its controller */
const useModalController = NiceModal.useModal;

export const ModalService = { create, show, hide, useModalController };
