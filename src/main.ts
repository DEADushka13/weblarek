import { ProductCatalog } from './components/Models/ProductCatalog';
import './scss/styles.scss';
import { apiProducts } from './utils/data';

const catalogModel = new ProductCatalog;
catalogModel.setCatalogList(apiProducts.items);
console.log('Массив товаров из каталога: ', catalogModel);