export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

//Товар
export interface IProduct {
    //id
    id: string;//можно тип guid
    //информация о товаре
    title: string;
    //ссылка на картинку
    image: string;//можно тип URL
    //цена
    price: number | null;
    //Тег(группа)
    category: string;//можно список доступных тегов
    //описание товара
    description: string;
}

type TPayment = "online" | "uponReceipt" | "";
export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}









//Заказ ??
// class Order {
//     //Покупатель
//     buyer: Buyer;
//     basket: Basket;
//     constructor() {
//         this.buyer = new Buyer;
//         this.basket = new Basket;
//     }
// }

