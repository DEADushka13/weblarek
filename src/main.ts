import { ProductCatalog } from './components/Models/ProductCatalog';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Product } from "./components/Models/Product";
import { Api } from './components/base/Api';
import { ProductApi } from './components/ProductApi';
import { API_URL, CDN_URL } from './utils/constants';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';




//ProductApi
const api = new Api(API_URL);
const productApi = new ProductApi(api, CDN_URL);
const testApi = productApi.getProductList();
console.log('Массив товаров с сервера: ', testApi);

//Product
const testProduct = new Product;
console.log('Пустой товар: ', testProduct);

//ProductCatalog
const catalogModel = new ProductCatalog;
// catalogModel.setCatalogList(apiProducts.items);
catalogModel.setCatalogList(await testApi);
console.log('Массив товаров из каталога: ', catalogModel);
const testGetProductList = catalogModel.getCatalogList();
console.log('Массив товаров из каталога через get: ', testGetProductList);
const newProduct = new Product
catalogModel.setCurrentCard(newProduct);
const testCurrentCard = catalogModel.getCurrentCard();
console.log('Текущая карточка: ', testCurrentCard);
const testProductID = catalogModel.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390");
console.log('Товар по айди: ', testProductID);

//Buyer дописать проверку данных
const testBuyer = new Buyer;
testBuyer.setAddress("qwerty");
testBuyer.setEmail("asd@ya.ru");
testBuyer.setPayment("online");
testBuyer.setPhone("123");
const testAddress = testBuyer.getAddress();
console.log("Информация о покупателе и его адрес отдельно: ", testBuyer, testAddress);
testBuyer.clearData();
console.log("Пустая информация о покупателе", testBuyer);


//Basket
const testBasket = new Basket;
let testBasketProduct = catalogModel.getProduct("1c521d84-c48d-48fa-8cfb-9d911fa515fd");
if (testBasketProduct) {
    testBasket.addProduct(testBasketProduct);
}
console.log('Корзина товаров с товарами: ', testBasket);
const testBasketList = testBasket.getProductList();
console.log('Список товаров в корзине: ', testBasketList);
console.log('Товар, который есть в корзине', testBasket.checkProduct("1c521d84-c48d-48fa-8cfb-9d911fa515fd"));
console.log('Товар, которого нет в корзине', testBasket.checkProduct("2c521d84-c48d-48fa-8cfb-9d911fa515fd"));
console.log('Количество товаров в корзине: ', testBasket.getProductCounter());
console.log('Сумма  цен товаров в корзине: ', testBasket.getTotalBasketSum());
if (testBasketProduct) {
    testBasket.removeProduct(testBasketProduct);
}
console.log('Пустая корзина: ', testBasket)
if (testBasketProduct) {
    testBasket.addProduct(testBasketProduct);
}
testBasket.clearBasket();
console.log('Пустая корзина: ', testBasket)