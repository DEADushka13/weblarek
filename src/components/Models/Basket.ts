import { Product } from "./Product";

//Корзина
export class Basket {
    //Список товаров в корзине
    protected productList: Product[];
    constructor() {
        this.productList = [];
    }

    getProductList(): Product[] {//++
        return this.productList;
    }
    //узнать наличие товара
    checkProduct(id: string): boolean {//++
        if (this.productList.find(product => product.id === id)) {
            return true
        }
        else { return false }
    }

    //Получение количества товаров в корзине
    getProductCounter(): number {//++
        return this.productList.length;
    };

    //Получение суммы цен товаров в корзине
    getTotalBasketSum(): string {//++
        const totalPrice = this.productList.reduce((total, product) => {
            if (!product.price) {
                return total;
            }
            else {
                return total + product.price;
            };
        }, 0)
        return `${totalPrice} синапсов`;
    }

    //добавить в корзину
    addProduct(product: Product): void {
        this.productList.push(product);
    };
    //удалить из корзины
    removeProduct(product: Product): void {
        const id = product.id;
        const indexOfObject = this.productList.findIndex((object) => { return object.id === id; });
        if (indexOfObject !== -1) {
            this.productList.splice(indexOfObject, 1);
        }
    };
    //очистка корзины
    clearBasket(): void {
        this.productList.splice(0, this.productList.length)
    }
}