import { IProduct } from "../../types";

export class Product implements IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
    constructor(id?: string, description?: string, image?: string, title?: string, category?: string, price?: number | null) {
        if (id) {
            this.id = id;
        }
        else {
            this.id = ""
        }
        if (description) {
            this.description = description;
        }
        else {
            this.description = ""
        }
        if (image) {
            this.image = image;
        }
        else {
            this.image = ""
        }
        if (title) {
            this.title = title;
        }
        else {
            this.title = ""
        }
        if (category) {
            this.category = category;
        }
        else {
            this.category = ""
        }
        if (price) {
            this.price = price;
        }
        else {
            this.price = null
        }
    }
}