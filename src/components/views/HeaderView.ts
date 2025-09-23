import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IHeaderView {
  counter: number;
}

export class HeaderView extends Component<IHeaderView> {
  protected basketCounter: HTMLElement;
  protected basketButton: HTMLButtonElement;
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    this.basketCounter = ensureElement<HTMLElement>(".header__basket-counter", this.container);
    this.basketButton = ensureElement<HTMLButtonElement>("header__basket", this.container);
    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }
  set counter(value: number) {
    this.basketCounter.textContent = String(value);
  }
}
