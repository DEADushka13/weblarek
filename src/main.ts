import { ProductCatalog } from './components/Models/ProductCatalog';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Product } from "./components/Models/Product";
import { Api } from './components/base/Api';
import { ProductApi } from './components/ProductApi';
import { API_URL, CDN_URL } from './utils/constants';
import { Basket } from './components/Models/Basket';




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

//Basket
const testBasket = new Basket;
