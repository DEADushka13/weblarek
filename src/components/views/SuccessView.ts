import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface ISuccessData {
  sum: string;
}
export class SuccessView extends Component<ISuccessData> {
  content: HTMLElement;
  orderSum: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    this.content = ensureElement("order-success", this.container);
    this.orderSum = ensureElement("order-success__description", this.container);
  }
  set sum(value: string) {
    this.orderSum.textContent = `Списано ${value}`;
  }
}
