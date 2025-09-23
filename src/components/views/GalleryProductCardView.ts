import { ICardActions, IProduct } from "../../types";
import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { ProductCard } from "./ProductCard";

type CategoryKey = keyof typeof categoryMap;
export type TCardGallery = Pick<IProduct,'image'|'category'>;


export class GalleryProductCardView extends ProductCard<TCardGallery>{
protected cardCategory:HTMLElement;
protected cardImage:HTMLImageElement;
constructor(container:HTMLElement,  actions?:ICardActions   ){
    super(container);
    this.cardCategory=ensureElement<HTMLElement>('.card__category',this.container);
    this.cardImage=ensureElement<HTMLImageElement>('.card__image',this.container);
    if(actions?.onClick){
        this.container.addEventListener('click',actions.onClick);
    }
}
set category(value:string){
    this.cardCategory.textContent=value;
    for(const key in categoryMap){
        this.cardCategory.classList.toggle(categoryMap[key as CategoryKey],key===value);
    }
}
set image(value:string){
    this.setImage(this.cardImage,value,this.title);
}
}