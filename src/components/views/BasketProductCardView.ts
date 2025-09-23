import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { ProductCard } from "./ProductCard";

export type TCardBasket = { index: number };
export class BasketProductCardView extends ProductCard<TCardBasket> {
  protected buttonDeleteProduct: HTMLButtonElement;
  protected basketProductIndex: HTMLElement;
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.basketProductIndex = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.buttonDeleteProduct = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);
    if (actions?.onClick) {
      this.buttonDeleteProduct.addEventListener("click", actions.onClick);
    }
  }
  set index(value: number) {
    this.basketProductIndex.textContent = String(value);
  }
}
