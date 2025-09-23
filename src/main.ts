import { ProductCatalog } from "./components/Models/ProductCatalog";
import "./scss/styles.scss";
import { apiProducts } from "./utils/data";
import { Api } from "./components/base/Api";
import { ProductApi } from "./components/ProductApi";
import { API_URL, CDN_URL } from "./utils/constants";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { GalleryProductCardView } from "./components/views/GalleryProductCardView";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { EventEmitter, IEvents } from "./components/base/Events";
import { GalleryView } from "./components/views/GalleryView";
import { OrderFormView } from "./components/views/OrderFormView";
import { IProduct } from "./types";
import { PreviewProductCardView } from "./components/views/PreviewProductCardView";
import { ModalView } from "./components/views/ModalView";
import { BasketView } from "./components/views/BasketView";
import { HeaderView } from "./components/views/HeaderView";

//-----------------------------------------------------------------------------------------------
const api = new Api(API_URL);
const productApi = new ProductApi(api, CDN_URL);
const events = new EventEmitter();
const productCatalog = new ProductCatalog(events);
const gallery = new GalleryView(document.body);
const productPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const modal = new ModalView(document.body);
const basket = new Basket(events);
const basketView = new HeaderView(events, document.head);
//-----------------------------------------------------------------------------------------------

productApi
  .getProductList()
  .then((data) => {
    productCatalog.setCatalogList(data);
  })
  .catch((err) => {
    console.error(err);
    alert("Не удалось загрузить каталог");
  });

events.on("catalogList:changed", () => {
  const itemCards = productCatalog.getCatalogList().map((item) => {
    const card = new GalleryProductCardView(cloneTemplate("#card-catalog"), {
      onClick: () => events.emit("card:select", item),
    });
    return card.render(item);
  });
  gallery.render({ catalog: itemCards });
});

// Зачем это нужно, если в событие открытия карточки уже передаётся нужный товар?
// let currentCard: IProduct;
// events.on("currentCard:changed", (currentCardChanged: IProduct) => (currentCard = currentCardChanged));

events.on("card:select", (item: IProduct) => {
  const product = productCatalog.getProduct(item.id);
  const card = new PreviewProductCardView(cloneTemplate(productPreviewTemplate), events);
  if (product) {
    card.category = product.category;
    card.description = product.description;
    card.image = product.image;
    card.price = product.price;
    card.title = product.title;
  }
  // card.setData(product);
  // Кнопка в предпросмотре: если товар в корзине — "Удалить", иначе "Купить"
  // card.buttonText = cartData.checkProduct(product.id) ? "Удалить" : "Купить";
  modal.render({ content: card.render() });
  modal.open();
});


events.on("basket:changed", () => (basketView.counter = basket.getProductCounter()));


const buyer=new Buyer(events);
const orderForm= new OrderFormView(document.body);
events.on('buyer:changed',()=>orderForm.render)