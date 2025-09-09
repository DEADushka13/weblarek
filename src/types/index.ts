export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

//-------------ГЛАВНАЯ СТРАНИЦА----------------------
//Каталог товаров
class ProductCatalog {
    catalogList: Product[];
    constructor() {
        this.catalogList = [];
    }
}

//Корзина
class Basket {
    //Список товаров в корзине
    productList: Product[];
    constructor() {
        this.productList = [];
    }

    //Получение количества товаров в корзине
    getProductCounter(): number {
        return this.productList.length;
    };

    //Получение суммы цен товаров в корзине
    getTotalBasketSum(productList: Product[]): string {
        const totalPrice = productList.reduce((total, product) => { return total + product.cost; }, 0)
        return `${totalPrice} синапсов`;
    }

    //добавить в корзину
    addProduct() {

    };
    //удалить из корзины
    removeProduct() { };
}





//Товар
class Product {
    //информация о товаре
    name: string;
    //ссылка на картинку
    image: string;//можно тип URL
    //цена
    cost: number;
    //Тег(группа)
    teg: string;//можно список доступных тегов
    //описание товара
    discription: string;
    //Статус товара = бесценен/в корзине/не в корзине
    status: "noCost" | "inBasket" | "outBasket";

    constructor() {
        this.cost = 0;
        this.name = "";
        this.image = "";
        this.teg = "";
        this.discription = "";
        this.status = "outBasket";
    }


}

//Покупатель
class Buyer {
    //почта
    email: string;
    //телефон
    phoneNumber: string;


    constructor() {
        this.email = "";
        this.phoneNumber = "";
    }
}

//Заказ
class Order {
    //Покупатель
    buyer: Buyer;
    //Способ оплаты
    payment: "online" | "uponReceipt";
    //Адресс доставки
    adress: string;
    //проверка данных
    constructor() {
        this.payment = "online";
        this.adress = "";
        this.buyer = new Buyer;
    }
}


//16:44