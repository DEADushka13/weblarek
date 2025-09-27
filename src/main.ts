import { ProductCatalog } from "./components/Models/ProductCatalog";
import "./scss/styles.scss";
// import { apiProducts } from "./utils/data";
import { Api } from "./components/base/Api";
import { ProductApi } from "./components/ProductApi";
import { API_URL, CDN_URL } from "./utils/constants";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { GalleryProductCardView } from "./components/views/GalleryProductCardView";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import { GalleryView } from "./components/views/GalleryView";
import { OrderFormView } from "./components/views/OrderFormView";
import { IOrder, IProduct } from "./types";
import { PreviewProductCardView } from "./components/views/PreviewProductCardView";
import { ModalView } from "./components/views/ModalView";
import { BasketView } from "./components/views/BasketView";
import { HeaderView } from "./components/views/HeaderView";
import { ContactsFormView } from "./components/views/ContactsFormView";
import { BasketProductCardView } from "./components/views/BasketProductCardView";
import { SuccessView } from "./components/views/SuccessView";

//-----------------------------------------------------------------------------------------------
const api = new Api(API_URL);
const productApi = new ProductApi(api, CDN_URL);
const events = new EventEmitter();
const productCatalog = new ProductCatalog(events);
const gallery = new GalleryView(document.body);
const productPreviewTemplate =
  ensureElement<HTMLTemplateElement>("#card-preview");
const modal = new ModalView(document.body, events);
const basket = new Basket(events);
const headerView = new HeaderView(events, document.body);
const basketView = new BasketView(cloneTemplate("#basket"), events);
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
  const card = new PreviewProductCardView(
    cloneTemplate(productPreviewTemplate),
    events,
    {
      onClick: () => events.emit("card:buy", item),
    }
  );
  if (product) {
    if (basket.checkProduct(product.id)) {
      card.setButtonText("Удалить из корзины");
    }
    card.category = product.category;
    card.description = product.description;
    card.image = product.image;
    if (product.price === null) {
      card.setButtonText("Недоступно");
      card.disableButton();
    }
    card.price = product.price;
    card.title = product.title;
  }
  modal.render({ content: card.render() });
  modal.open();
});

// если у товара нет цены, кнопка в карточке должна быть заблокирована и иметь название «Недоступно».

events.on("basket:changed", () => {
  headerView.counter = basket.getProductCounter();
  basketView.price = basket.getTotalBasketSum();
  basketView.itemList = [];
  let index = 1;
  let itemList: HTMLElement[] = [];
  basket.getProductList().forEach((item) => {
    const basketCard = new BasketProductCardView(
      cloneTemplate("#card-basket"),
      {
        onClick: () => events.emit("card:remove", item),
      }
    );
    basketCard.index = index;
    index++;
    basketCard.price = item.price;
    basketCard.title = item.title;
    itemList.push(basketCard.render());
  });
  basketView.itemList = itemList;
  itemList = [];
  if (basket.getProductCounter() === 0) {
    basketView.disableButton();
  } else {
    basketView.enableButton();
  }
  basketView.render();
});

// если в корзине нет товаров, кнопка оформления должна быть деактивирована;
// если товаров нет в корзине — вместо списка товаров выводится надпись «Корзина пуста»;

const buyer = new Buyer(events);

const orderForm = new OrderFormView(cloneTemplate("#order"), events);
const contactForm = new ContactsFormView(cloneTemplate("#contacts"), events);
events.on("buyer:changed", () => {
  orderForm.render;
  contactForm.render;
});

events.on("card:buy", (item: IProduct) => {
  if (basket.checkProduct(item.id)) {
    basket.removeProduct(item);
    modal.close();
  } else {
    basket.addProduct(item);
    modal.close();
  }
});

// если товар находится в корзине, кнопка должна быть заменена на «Удалить из корзины»;
// при нажатии на кнопку «Удалить из корзины» товар удаляется из корзины;
// после нажатия кнопки модальное окно закрывается;

events.on("basket:open", () => {
  if (basket.getProductCounter() === 0) {
    basketView.disableButton();
  } else {
    basketView.enableButton();
  }
  modal.render({ content: basketView.render() });
  modal.open();
});

events.on("card:remove", (item: IProduct) => {
  basket.removeProduct(item);
  basketView.render();
});

events.on("basket:order", () => {
  modal.render({ content: orderForm.render() });
});

events.on("order:online", () => {
  if (buyer.getPayment() !== "online") {
    buyer.setPayment("online");
    orderForm.togglePayment("online");
  }
  events.emit("order:change");
});
events.on("order:cash", () => {
  if (buyer.getPayment() !== "uponReceipt") {
    buyer.setPayment("uponReceipt");
    orderForm.togglePayment("uponReceipt");
  }
  events.emit("order:change");
});

events.on<{ value: string }>("address:change", (value) => {
  buyer.setAddress(value.value);
  events.emit("order:change");
});

events.on("order:change", () => {
  let orderErrors = buyer.chekData();
  orderErrors.phone = "";
  orderErrors.email = "";
  if (!orderErrors.address && !orderErrors.payment) {
    orderForm.enableButton();
  } else {
    orderForm.disableButton();
    orderForm.errors = orderErrors;
    // orderForm.errors.payment = orderErrors.payment;
  }
});

// если адрес доставки не введён, появляется сообщение об ошибке;
// если способ оплаты не выбран, появляется сообщение об ошибке;

events.on("order:submit", () => {
  modal.render({ content: contactForm.render() });
});

events.on<{ value: string }>("phone:change", (value) => {
  buyer.setPhone(value.value);
  events.emit("contact:change");
});

events.on<{ value: string }>("email:change", (value) => {
  if (!value) {
    contactForm.disableButton();
  }
  buyer.setEmail(value.value);
  events.emit("contact:change");
});

events.on("contact:change", () => {
  const contactErrors = buyer.chekData();
  if (!contactErrors.phone && !contactErrors.email) {
    contactForm.enableButton();
  } else {
    contactForm.disableButton();
    contactForm.errors = contactErrors;
    // orderForm.errors.email = orderErrors.email;
  }
});

const success = new SuccessView(cloneTemplate("#success"), events);

events.on("contacts:submit", () => {
  success.sum = basket.getTotalBasketSum();

  const order: IOrder = {
    payment: "",
    email: "",
    phone: "",
    address: "",
    total: 0,
    items: [],
  };
  order.address = buyer.getAddress();
  // order.address = "123";
  order.email = buyer.getEmail();
  order.items = basket.getProductList().map((el) => {
    return el.id;
  });

  order.payment = buyer.getPayment();
  order.phone = String(buyer.getPhone());
  order.total = Number(basket.getTotalBasketSum().replace(" синапсов", ""));
  console.log(order);
  // const orderTest: IOrder = {
  //   payment: "online",
  //   email: "s",
  //   phone: "s",
  //   address: "S",
  //   total: 123,
  //   items: ["asd"],
  // };
  productApi
    .orderProducts(order)
    .then(({ id, total }) => {
      events.emit("success:open", { id, total });
    })
    .catch((err) => {
      console.error(
        "Ошибка при отправке заказа:",
        err.response ? err.response : err.message
      );
      alert("Не удалось отправить заказ");
    });
});

// при нажатии на кнопку оплаты выполняется передача данных о заказе на сервер,
// появляется сообщение об успешной оплате, товары удаляются из корзины, данные покупателя очищаются.
events.on<{ id: string; total: number }>("success:open", ({ id, total }) => {
  console.log(`Айди заказа: ${id} на сумму ${total}`);
  modal.render({ content: success.render() });
});

events.on("success:close", () => {
  modal.close();
  basket.clearBasket();
  buyer.clearData();
});

//
