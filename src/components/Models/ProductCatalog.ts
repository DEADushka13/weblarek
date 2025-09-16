import { IProduct } from "../../types";
import { Product } from "./Product";
//Каталог товаров
export class ProductCatalog {
    protected catalogList: IProduct[];
    protected currentCard: IProduct;
    setCurrentCard(product: IProduct): void { this.currentCard = product };
    getCurrentCard(): IProduct { return this.currentCard };
    setCatalogList(catalogList: IProduct[]): void { this.catalogList = catalogList; }
    getCatalogList(): IProduct[] { return this.catalogList };
    getProduct(id: string): IProduct | undefined {
        // if (this.catalogList.find(product => product.id === id)) {
        //     return this.catalogList.find(product => product.id === id)
        // }
        // else {
        //     return undefined
        // }
        return this.catalogList.find(product => product.id === id)
    }
    constructor() {
        this.catalogList = [];
        this.currentCard = new Product;
    }
}