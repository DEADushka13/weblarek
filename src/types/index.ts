export type ApiPostMethods = "POST" | "PUT" | "DELETE";
export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};
export type ApiOrderResponse = {
  total: number;
  id: string;
};

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

//Товар
export interface IProduct {
  //id
  id: string; //можно тип guid
  //информация о товаре
  title: string;
  //ссылка на картинку
  image: string; //можно тип URL
  //цена
  price: number | null;
  //Тег(группа)
  category: string; //можно список доступных тегов
  //описание товара
  description: string;
}

export type TPayment = "online" | "uponReceipt" | "";
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export interface IOrder extends IBuyer {
  items: string[];
  total: number;
}

export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}