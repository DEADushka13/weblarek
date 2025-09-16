import { ProductCatalog } from './components/Models/ProductCatalog';
import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { Product } from "./components/Models/Product";
import { Api } from './components/base/Api';
import { ProductApi } from './components/ProductApi';
import { API_URL } from './utils/constants';

const catalogModel = new ProductCatalog;
catalogModel.setCatalogList(apiProducts.items);
console.log('Массив товаров из каталога: ', catalogModel);

const testGetProductList = catalogModel.getCatalogList();
console.log('Массив товаров из каталога через get: ', testGetProductList);

const newProduct = new Product
catalogModel.setCurrentCard(newProduct);

const api = new Api(API_URL);
const productApi = new ProductApi(api);
const testApi = productApi.getProductList();
console.log('Массив товаров с сервера: ', testApi);