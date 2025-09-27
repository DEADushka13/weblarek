import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModalData {
  content: HTMLElement;
}
export class ModalView extends Component<IModalData> {
  protected modal: HTMLElement; //для открытия и закрытия окна
  protected modalContent: HTMLElement;
  protected modalClose: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.modalContent = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );
    this.modalClose = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );
    this.modal = ensureElement<HTMLElement>(".modal", this.container);
    this.modalClose.addEventListener("click", () => {
      this.close();
    });
    this.modal.addEventListener("click", (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }
  set content(content: HTMLElement) {
    if (content === null) {
      this.content.innerHTML = "";
    } else {
      this.modalContent.replaceChildren(content);
    }
  }

  open(): void {
    this.modal.classList.add("modal_active");
  }
  close(): void {
    this.modal.classList.remove("modal_active");
  }
}
