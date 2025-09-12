import { IProduct } from "../../types";

export class Product implements IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    constructor() {
        this.id = "";
        this.description = "";
        this.image = "";
        this.title = "";
        this.category = "";
        this.price = null;
    }
}