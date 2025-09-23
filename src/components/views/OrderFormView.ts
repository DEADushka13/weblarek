import { ICardActions, TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { FormView } from "./FormView";
interface OrderData {
  address: string;
}
export class OrderFormView extends FormView<OrderData> {
  protected buttonOnline: HTMLButtonElement;
  protected buttonCash: HTMLButtonElement;
  protected orderAddress: HTMLInputElement;
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.orderAddress = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    this.buttonOnline = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.buttonCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    if (actions?.onClick) {
      this.buttonOnline.addEventListener("click", actions.onClick);
      this.buttonCash.addEventListener("click", actions.onClick);
    }
  }
  set address(value: string) {
    this.orderAddress.textContent = value;
  }
  togglePayment(payment: TPayment): void {
    if (payment === "online") {
      this.buttonCash.classList.remove("button_alt-active");
      this.buttonOnline.classList.add("button_alt-active");
    } else if (payment === "uponReceipt") {
      this.buttonOnline.classList.remove("button_alt-active");
      this.buttonCash.classList.add("button_alt-active");
    }
  }
}
