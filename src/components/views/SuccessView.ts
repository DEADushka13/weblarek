import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ISuccessData {
  sum: string;
}
export class SuccessView extends Component<ISuccessData> {
  orderSum: HTMLElement;
  successButton: HTMLButtonElement;
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.orderSum = ensureElement(".order-success__description", this.container);
    this.successButton = ensureElement<HTMLButtonElement>(".order-success__close", this.container);
    this.successButton.addEventListener("click", () => {
      this.events.emit("success:close");
    });
  }
  set sum(value: string) {
    this.orderSum.textContent = `Списано ${value}`;
  }
}
