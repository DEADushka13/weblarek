import { TPayment } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { FormView } from "./FormView";
interface OrderData {
  address: string;
}
export class OrderFormView extends FormView<OrderData> {
  protected buttonOnline: HTMLButtonElement;
  protected buttonCash: HTMLButtonElement;
  protected orderAddress: HTMLInputElement;
  constructor(container: HTMLFormElement, protected events: IEvents) {
    super(container, events);
    this.orderAddress = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container
    );
    this.buttonOnline = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container
    );
    this.buttonCash = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container
    );
    this.buttonOnline.addEventListener("click", () => {
      this.events.emit("order:online");
    });
    this.buttonCash.addEventListener("click", () => {
      this.events.emit("order:cash");
    });
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
