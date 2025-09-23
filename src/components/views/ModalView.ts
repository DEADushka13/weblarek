import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IModalData {
  content: HTMLElement;
}
export class ModalView extends Component<IModalData> {
  protected modal: HTMLElement; //для открытия и закрытия окна
  protected modalContent: HTMLElement;
  protected modalClose: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);
    this.modalContent = ensureElement<HTMLElement>(".modal__content", this.container);
    this.modalClose = ensureElement<HTMLButtonElement>(".modal__close", this.container);
    this.modal = ensureElement<HTMLElement>(".modal", this.container);
  }
  set content(content: HTMLElement) {
    this.modalContent = this.modalContent.appendChild(content); //поменять на replacechildren, только может не быть конента
  }
  open(): void {
    this.modal.classList.add("modal_active");
  }
  close(): void {
    this.modal.classList.remove("modal_active");
  }
}
