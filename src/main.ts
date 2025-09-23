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

//ProductCatalog
const catalogModel = new ProductCatalog();
catalogModel.setCatalogList(apiProducts.items);
const testGetProductList = catalogModel.getCatalogList();
console.log("Массив товаров из каталога через get: ", testGetProductList);
const testProduct = catalogModel.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
if (testProduct) {
  catalogModel.setCurrentCard(testProduct);
}

const testCurrentCard = catalogModel.getCurrentCard();
console.log("Текущая карточка: ", testCurrentCard);
console.log("Товар по айди: ", testProduct);

//Buyer дописать проверку данных
const testBuyer = new Buyer();
testBuyer.setAddress("qwerty");
testBuyer.setEmail("asd@ya.ru");
testBuyer.setPayment("online");
testBuyer.setPhone("123");
const testAddress = testBuyer.getAddress();
console.log("Информация о покупателе и его адрес отдельно: ", testBuyer, testAddress);
testBuyer.clearData();
console.log("Пустая информация о покупателе", testBuyer);
testBuyer.setAddress("qwerty");
testBuyer.setEmail("asd@ya.ru");
console.log("Покупатель: ", testBuyer);
const testBuyererrors = testBuyer.chekData();
console.log("Ошибки валидации: ", testBuyererrors);

//Basket
const testBasket = new Basket();
if (testProduct) {
  testBasket.addProduct(testProduct);
}
console.log("Корзина с товарами: ", testBasket);
const testBasketList = testBasket.getProductList();
console.log("Список товаров в корзине: ", testBasketList);
console.log("Товар, который есть в корзине", testBasket.checkProduct("854cef69-976d-4c2a-a18c-2aa45046c390"));
console.log("Товар, которого нет в корзине", testBasket.checkProduct("2c521d84-c48d-48fa-8cfb-9d911fa515fd"));
console.log("Количество товаров в корзине: ", testBasket.getProductCounter());
console.log("Сумма  цен товаров в корзине: ", testBasket.getTotalBasketSum());
if (testProduct) {
  testBasket.removeProduct(testProduct);
}
console.log("Пустая корзина: ", testBasket);
if (testProduct) {
  testBasket.addProduct(testProduct);
}
testBasket.clearBasket();
console.log("Пустая корзина: ", testBasket);

//ProductApi
const api = new Api(API_URL);
const productApi = new ProductApi(api, CDN_URL);
const testApi = productApi.getProductList();
console.log("Массив товаров с сервера: ", testApi);

//-----------------------------------------------------------------------------------------------

await productApi
  .getProductList()
  .then((data) => {
    catalogModel.setCatalogList(data);
  })
  .catch((err) => console.error(err));

const galleryContainer = document.querySelector("body") as HTMLElement;
console.log(galleryContainer);
const gallery = new GalleryView(galleryContainer);
console.log(gallery);

const events = new EventEmitter();

console.log(testApi);

// const itemCards = catalogModel.getCatalogList().map((item) => {
//   const card = new GalleryProductCardView(cloneTemplate("#card-catalog"), {
//     onClick: () => events.emit("card:select", item),
//   });
//   return card.render(item);
// });
// console.log("hjhj", itemCards);
// gallery.render({ catalog: itemCards });

events.on("catalog:changed", () => {
  const itemCards = catalogModel.getCatalogList().map((item) => {
    const card = new GalleryProductCardView(cloneTemplate("#card-catalog"), {
      onClick: () => events.emit("card:select", item),
    });
    return card.render(item);
  });
  console.log('hjhj',itemCards);
  gallery.render({ catalog: itemCards });
});
