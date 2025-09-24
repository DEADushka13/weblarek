import { ICardActions, IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { ProductCard } from "./ProductCard";

type CategoryKey = keyof typeof categoryMap;
export type TCardPreview = Pick<IProduct, "image" | "category" | "description">;

export class PreviewProductCardView extends ProductCard<TCardPreview> {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardText: HTMLElement;
  protected buttonBuyProduct: HTMLButtonElement;
  constructor(container: HTMLElement, protected events: IEvents, actions?: ICardActions) {
    super(container);
    this.cardCategory = ensureElement<HTMLElement>(".card__category", this.container);
    this.cardImage = ensureElement<HTMLImageElement>(".card__image", this.container);
    this.cardText = ensureElement<HTMLElement>(".card__text", this.container);
    this.buttonBuyProduct = ensureElement<HTMLButtonElement>(".card__button", this.container);
    if (actions?.onClick) {
      this.buttonBuyProduct.addEventListener("click", actions.onClick);
    }
  }
  set category(value: string) {
    this.cardCategory.textContent = value;
    for (const key in categoryMap) {
      this.cardCategory.classList.toggle(categoryMap[key as CategoryKey], key === value);
    }
  }
  set description(value: string) {
    this.cardText.textContent = value;
  }
  set image(value: string) {
    this.setImage(this.cardImage, value, this.title);
  }
  setButtonText(text: string) {
    this.buttonBuyProduct.textContent = text;
  }
  disableButton() {
    this.buttonBuyProduct.disabled = true;
  }
}

// если товар находится в корзине, кнопка должна быть заменена на «Удалить из корзины»;
// при нажатии на кнопку «Удалить из корзины» товар удаляется из корзины;
// после нажатия кнопки модальное окно закрывается;
