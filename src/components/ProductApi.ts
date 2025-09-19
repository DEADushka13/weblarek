import {
  IApi,
  IProduct,
  IOrder,
  ApiListResponse,
  ApiOrderResponse,
} from "../types/index.ts";
export class ProductApi {
  protected api: IApi;
  protected cdnUrl: string;
  constructor(api: IApi, cdnUrl: string) {
    this.api = api;
    this.cdnUrl = cdnUrl;
  }

  getProductList(): Promise<IProduct[]> {
    return this.api.get(`/product`).then((response) =>
      (response as ApiListResponse<IProduct>).items.map((product) => ({
        ...product,
        image: this.cdnUrl + product.image,
      }))
    );
  }

  orderProducts(order: IOrder): Promise<ApiOrderResponse> {
    return this.api.post("/order", order) as Promise<ApiOrderResponse>;
  }
}
