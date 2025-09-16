import { IApi, IProduct, IOrder } from "../types/index.ts"
export class ProductApi {
    protected api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProductList(): Promise<IProduct[]> {
        return this.api.get(`/product`);
    }

    getProduct(id: string): Promise<IProduct> {
        return this.api.get(`/product/${id}`);
    }

    orderProducts(order: IOrder): Promise<IOrder> {
        return this.api
            .post('/order', order) as Promise<IOrder>;
    }
}

