import { IBuyer } from "../../types";

//Покупатель
export class Buyer implements IBuyer {
    //почта
    email: string;
    //телефон
    phone: string;
    //Способ оплаты
    payment: "online" | "uponReceipt" | "";
    //Адресс доставки
    address: string;
    //проверка данных???
    chekData(): boolean { return true };//возможно возвращать ошибку, если что-то не так
    //получить данные
    getEmail(): string { return this.email }
    getPhone(): string { return this.phone }
    getPayment(): "online" | "uponReceipt" | "" { return this.payment }
    getAddress(): string { return this.address }
    //сохранить данные
    setEmail(email: string): void { this.email = email }
    setPhone(phone: string): void { this.phone = phone }
    setPayment(payment: "online" | "uponReceipt" | ""): void { this.payment = payment }
    setAddress(address: string): void { this.address = address }
    clearData(): void {
        this.email = "";
        this.phone = "";
        this.payment = "";
        this.address = "";
    }
    // constructor(email: string, phone: string, payment: "online" | "uponReceipt" | "", address: string) {
    //     this.payment = payment;
    //     this.address = address;
    //     this.email = email;
    //     this.phone = phone;
    // }
    constructor() {
        this.payment = "";
        this.address = "";
        this.email = "";
        this.phone = "";
    }
}