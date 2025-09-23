import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

//Корзина
export class Basket {
  //Список товаров в корзине
  protected productList: IProduct[];
  constructor(protected events: IEvents) {
    this.productList = [];
    this.events = events;
  }

  getProductList(): IProduct[] {
    //++
    return this.productList;
  }
  //узнать наличие товара
  checkProduct(id: string): boolean {
    //++
    if (this.productList.find((product) => product.id === id)) {
      return true;
    } else {
      return false;
    }
  }

  //Получение количества товаров в корзине
  getProductCounter(): number {
    //++
    return this.productList.length;
  }

  //Получение суммы цен товаров в корзине
  getTotalBasketSum(): string {
    //++
    const totalPrice = this.productList.reduce((total, product) => {
      if (!product.price) {
        return total;
      } else {
        return total + product.price;
      }
    }, 0);
    return `${totalPrice} синапсов`;
  }

  //добавить в корзину
  addProduct(product: IProduct): void {
    this.productList.push(product);
    this.events.emit('basket:changed');
  }
  //удалить из корзины
  removeProduct(product: IProduct): void {
    const id = product.id;
    const indexOfObject = this.productList.findIndex((object) => {
      return object.id === id;
    });
    if (indexOfObject !== -1) {
      this.productList.splice(indexOfObject, 1);
    }
    this.events.emit('basket:changed');
  }
  //очистка корзины
  clearBasket(): void {
    this.productList.splice(0, this.productList.length);
    this.events.emit('basket:changed');
  }
}
