import { ICardActions } from "../../types";
import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasketData {
  itemList: HTMLElement[];
  price: string;
}

export class BasketView extends Component<IBasketData> {
  protected basketList: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected basketPrice: HTMLElement;
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.events = events;
    this.basketList = ensureElement<HTMLUListElement>(".basket__list", this.container);
    this.basketButton = ensureElement<HTMLButtonElement>(".basket__button", this.container);
    this.basketPrice = ensureElement<HTMLElement>(".basket__price", this.container);
    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:order");
    });
  }
  set itemList(items: HTMLElement[]) {
    this.basketList.innerHTML = "";

    if (items.length > 0) {
      items.forEach((item) => this.basketList.appendChild(item));
    } else {
      this.basketList.replaceChildren(createElement("p", { textContent: "Корзина пуста" }));
    }
  }
  set price(value: string) {
    this.basketPrice.textContent = value;
  }
  disableButton() {
    // const emptyBasket = new HTMLElement();
    // emptyBasket.innerHTML = "<div>Корзина пуста</div>";
    this.basketButton.disabled = true;
    // this.basketList.replaceChildren(emptyBasket);
  }
}
