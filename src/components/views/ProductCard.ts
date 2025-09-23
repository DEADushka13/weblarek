import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IProductCard {
  title: string;
  price: number | null;
}

export class ProductCard<T> extends Component<IProductCard | T> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    this.cardTitle = ensureElement<HTMLElement>(".card__title", this.container);
    this.cardPrice = ensureElement<HTMLElement>(".card__price", this.container);
  }
  set title(value: string) {
    this.cardTitle.textContent = value;
  }
  set price(value: number | null) {
    if (value === null) {
      this.cardPrice.textContent = "Бесценно";
    } else {
      this.cardPrice.textContent = `${value} синапсов`;
    }
  }
}
