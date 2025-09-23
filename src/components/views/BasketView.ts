import { ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IBasketData{itemList:HTMLElement[],price:string}

export class BasketView extends Component<IBasketData>{
protected basketList:HTMLElement;
protected basketButton:HTMLButtonElement;
protected basketPrice:HTMLElement;
constructor(container:HTMLElement,actions?:ICardActions){
    super(container);
    this.basketList=ensureElement<HTMLUListElement>('.basket__list',this.container);
    this.basketButton=ensureElement<HTMLButtonElement>('.basket__button',this.container);
    this.basketPrice=ensureElement<HTMLElement>('.basket__price',this.container);
    if (actions?.onClick) {
      this.basketButton.addEventListener("click", actions.onClick);
    }
}
set itemList(items:HTMLElement[]){
items.forEach((item) => this.basketList.appendChild(item));
}
set price(value:string){
    this.basketPrice.textContent=value;
}
}