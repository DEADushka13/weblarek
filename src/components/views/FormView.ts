import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IFormData {
  errors: { payment: string; address: string; phone: string; email: string };
}
export class FormView<T> extends Component<T | IFormData> {
  protected formErrors: HTMLElement;
  protected submitButton: HTMLButtonElement;
  constructor(
    container: HTMLElement,
    protected events: IEvents,
    actions?: ICardActions
  ) {
    super(container);
    this.formErrors = ensureElement<HTMLElement>(
      ".form__errors",
      this.container
    );
    this.submitButton = ensureElement<HTMLButtonElement>(
      "button[type=submit]",
      this.container
    );
    if (actions?.onClick) {
      this.submitButton.addEventListener("click", actions.onClick);
    }

    this.container.addEventListener("input", (el) => {
      const target = el.target as HTMLInputElement;
      if (target && target.name) {
        const field = target.name as keyof T;
        const value = target.value;
        this.changeField(field, value);
      }
    });
  }

  changeField(field: keyof T, value: string) {
    this.events.emit(`${String(field)}:change`, {value} );
  }

  set errors(errors: {
    payment: string;
    address: string;
    phone: string;
    email: string;
  }) {
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

  enableButton() {
    this.submitButton.disabled = false;
    this.formErrors.textContent = "";
  }
  disableButton() {
    this.submitButton.disabled = true;
  }
}
