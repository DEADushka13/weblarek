import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IFormData {
  errors: { payment: string; address: string; phone: string; email: string };
}
export class FormView<T> extends Component<T | IFormData> {
  protected formErrors: HTMLElement;
  protected submitButton: HTMLButtonElement;
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.formErrors = ensureElement<HTMLElement>(".form__errors", this.container);
    this.submitButton = ensureElement<HTMLButtonElement>("button[type=submit]", this.container);
    if (actions?.onClick) {
      this.submitButton.addEventListener("click", actions.onClick);
    }
  }
  set errors(errors: { payment: string; address: string; phone: string; email: string }) {
    if (errors.address !== "") {
      this.formErrors.textContent = errors.address;
    }
    if (errors.payment !== "") {
      this.formErrors.textContent = errors.payment;
    }
    if (errors.phone !== "") {
      this.formErrors.textContent = errors.phone;
    }
    if (errors.email !== "") {
      this.formErrors.textContent = errors.email;
    }
  }
}
