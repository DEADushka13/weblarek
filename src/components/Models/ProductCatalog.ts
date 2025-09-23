import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
// import { Product } from "./Product";
//Каталог товаров
export class ProductCatalog {
  protected catalogList: IProduct[];
  protected currentCard: IProduct;
  constructor(protected events: IEvents) {
    this.catalogList = [];
    this.currentCard = {
      id: "",
      category: "",
      description: "",
      image: "",
      price: 0,
      title: "",
    };
    this.events = events;
  }

  setCurrentCard(product: IProduct): void {
    this.currentCard = product;
    this.events.emit('currentCard:changed',this.currentCard);
  }

  getCurrentCard(): IProduct {
    return this.currentCard;
  }

  setCatalogList(catalogList: IProduct[]): void {
    this.catalogList = catalogList;
    this.events.emit('catalogList:changed', { catalogList });
  }

  getCatalogList(): IProduct[] {
    return this.catalogList;
  }

  getProduct(id: string): IProduct | undefined {
    return this.catalogList.find((product) => product.id === id);
  }
}
