import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { FormView } from "./FormView";

interface ContactData {
  email: string;
  phone: string;
}

export class ContactsFormView extends FormView<ContactData> {
  protected contactEmail: HTMLInputElement;
  protected contactPhone: HTMLInputElement;
  constructor(container: HTMLElement, protected events: IEvents, actions?: ICardActions) {
    super(container, events, actions);
    this.contactEmail = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.contactPhone = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
  }
  set email(value: string) {
    this.contactEmail.value = value;
  }
  set phone(value: string) {
    this.contactPhone.value = value;
  }
}
