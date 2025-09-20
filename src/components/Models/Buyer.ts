import { IBuyer } from "../../types";

//Покупатель
export class Buyer {
  //почта
  protected email: string;
  //телефон
  protected phone: string;
  //Способ оплаты
  protected payment: "online" | "uponReceipt" | "";
  //Адресс доставки
  protected address: string;
  constructor() {
    this.payment = "";
    this.address = "";
    this.email = "";
    this.phone = "";
  }

  chekData(): {
    payment: string;
    address: string;
    phone: string;
    email: string;
  } {
    let errors = {
      payment: "",
      address: "",
      phone: "",
      email: "",
    };
    if (!this.address) {
      errors.address = "Не указан адрес";
    }
    if (!this.payment) {
      errors.payment = "Не выбран способ оплаты";
    }
    if (!this.email) {
      errors.email = "Не указана электронная почта";
    }
    if (!this.phone) {
      errors.phone = "Не указан номер телефона";
    }
    return errors;
  }

  getBuyer(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }
  //получить данные
  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getPayment(): "online" | "uponReceipt" | "" {
    return this.payment;
  }

  getAddress(): string {
    return this.address;
  }

  //сохранить данные
  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setPayment(payment: "online" | "uponReceipt" | ""): void {
    this.payment = payment;
  }

  setAddress(address: string): void {
    this.address = address;
  }

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
}
