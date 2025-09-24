# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component

Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`

#### Класс Api

Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter

Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

### Данные

#### Интерфейс IProduct

Содержит информацию о товаре для их учёта в приложении

Поля интерфейса:
`id: string` - хранит уникальный идентификатор товара
`title: string` - хранит название товара
`image: string` - хранит ссылку на картинку товара
`price: number | null` - хранит цену товара, null если товар бесценнен
`category: string` - хранит категорию товара
`description: string` - хранит описание товара

#### Интерфейс IBuyer

Содержит информацию о покупателе для их учёта в приложении

Поля интерфейса:
`email: string` - хранит адрес электронной почты покупателя
`phone: string` - хранит номер телефона покупателя
`payment: TPayment` - хранит способ оплаты, выбранный покупателем, где `type TPayment = "online" | "uponReceipt" | ""`. "" - если покупатель пока не выбрал как оплачивать
`address: string` - адрес покупателя для доставки

#### Интерфейс IOrder

Содержит информацию о покупателе и список товаров и их сумму цен в корзине

Поля интерфейса:
`extends IBuyer` - подключаем интерфейс покупателя
`productList: IProduct[]` - список товаров в корзине
`total: number` - сумма цен товаров в корзине

### Модели данных

#### Класс Buyer

Содержит информацию о покупателе для их учёта в приложении

Конструктор класса не принимает параметров.

Поля класса:
`protected email: string` - хранит адрес электронной почты покупателя
`protected phone: string` - хранит номер телефона покупателя
`protected payment: "online" | "uponReceipt" | ""` - хранит способ оплаты, выбранный покупателем. "" - если покупатель пока не выбрал как оплачивать
`protected address: string` - адрес покупателя для доставки

Методы класса:  
`chekData(): {payment: string;address: string;phone: string;email: string;}` - проверка данных о покупателе, возвращает объект с ошибками, если ошибок нет- значения объекта пустые
`getBuyer(): IBuyer` - метод для получения всех данных о покупателе
`getEmail(): string`,`getPhone(): string `,`getPayment(): "online" | "uponReceipt" | "`,`getAddress(): string ` - методы для получения различных данных о покупателе
`setEmail(email: string): void `,`setPhone(phone: string): void`,`setPayment(payment: "online" | "uponReceipt" | ""): void`,`setAddress(address: string): void` - методы для сохранения данных о покупателе
`clearData():void` - очистить данные о покупателе

#### Класс Basket

Содержит список товаров в корзине покупателя

Конструктор класса не принимает параметров.

Поля класса:
`protected productList: Product[]` - хранит список товаров

Методы класса:
`getProductList(): Product[]` - получение массива товаров, которые находятся в корзине
`checkProduct(id: string): boolean` - проверяет наличие товара в корзине
`getProductCounter(): number` - получение количества товаров в корзине
`getTotalBasketSum(): string` - получение суммы цен товаров в корзине, на выходе - строка формата "111 синапсов"
`addProduct(product: Product): void` - добавление товара в корзину
`removeProduct(product: Product): void` - удалениие товара из корзины
`clearBasket(): void` - метод очистки корзины

#### Класс ProductCatalog

Содержит каталог всех доступных товаров, данные сюда поступают через API с сервера

Конструктор класса не принимает параметров.

Поля класса:
`protected catalogList: Product[]` - содержит массив всех товаров
`protected currentCard: Product` - содержит выбранную карточку(товар, выбранный для подробного отображения)

Методы класса:
`setCurrentCard(product: Product):void` - сохраняет выбранную карточку
`getCurrentCard(): Product` - возвращает выбранную карточку
`setCatalogList(catalogList: Product[]):void` - сохраняет каталог товаров
`getCatalogList(): Product[]` - возвращает каталог товаров
`getProduct(id: string): IProduct | undefined` - возвращает Товар по его уникальному идентификатору

### Слой коммуникации

#### Класс ProductApi

Отвечает за получение данных с сервера и отправку данных на сервер. Используется функциональность класса API из стартового набора

Поля класса:
`api` - содержит базовое API для работы приложения
`cdnUrl` - содержит URL для работы с изображениями товаров

Методы класса:
`getProductList(): Promise<IProduct[]>` - возвращает набор товаров с сервера
`orderProducts(order: IOrder): Promise<IOrder>` - отправка данных о покупке

### Слой представления

#### Класс HeaderView

Отвечает за отображение и взаимодействие с кнопкой корзины товаров в хедере

Конструктор класса ищет в разметке(<header class="header">) два поля класса.

Интерфейс для дженерика Component:
`IHeaderData:{counter: number}`

Поля класса:
`protected basketButton: HTMLButtonElement` - кнопка "Корзина" (<button class="header__basket">)
`protected basketCounter: HTMLElement` - счетчик товаров в корзине (<span class="header__basket-counter">0</span>)

Методы класса:
`set counter(value: number):void` - изменяет счетчик

#### Класс GalleryView

Отвечает за отображение каталога карточек товаров

Конструктор класса ищет в разметке(<main class="gallery"></main>) поле класса.

Интерфейс для дженерика Component:
`GalleryData:{catalog:HTMLElement[]}`

Поля класса:
`protected gallery: HTMLElement` - галерея карточек

Методы класса:
`set catalog(value: HTMLElement[]):void` - устанавливает каталог карточек

#### Класс ModalView

Отвечает за отображение модального окна

Конструктор класса ищет в разметке(<div class="modal" id="modal-container">) поля класса.

Интерфейс для дженерика Component:
`ModalData:{content:HTMLElement}`

Поля класса:
`protected modal: HTMLElement` - Элемент, используемый для открытия и закрытия модального окна
`protected modalContent: HTMLElement` - Элемент с контентом(<div class="modal__content">)
`protected modalClose: HTMLButtonElement` - Кнопка закрытия(<button class="modal__close" aria-label="закрыть"></button>)

Методы класса:
`set content(content: HTMLElement):void` - устанавливает конктент в модальное окно
`open(): void` - открывает модальное окно
`close(): void` - закрывает модальное окно

#### Класс SuccessView

Отвечает за отображение успешной покупки

Конструктор класса ищет в разметке(<template id="success">) поля класса.

Интерфейс для дженерика Component:
`ISuccessData:{sum: string}`

Поля класса:
`successButton: HTMLButtonElement` - кнопка возвращения на главную страницу
`orderSum: HTMLElement` - сумма для списания(<p class="order-success__description">Списано 0 синапсов</p>)

Методы класса:
`set sum(value: string):void` - устанавливает списанную сумму

#### Класс ProductCard

Является родительским классом для: `GalleryProductCardView`,`PreviewProductCardView` и `BasketProductCardView`
Отвечает за отображение общих полей для трёх дочерних классов отображения карочек с товаром.

Конструктор класса ищет в разметке поля класса.

Интерфейс для дженерика Component:
`IProductCard:{title:string, price: number | null}`

Поля класса:
`protected cardTitle: HTMLElement` - название товара в карточке
`protected cardPrice: HTMLElement` - стоимость товара в карточке

Методы класса:
`set title(value: string):void` - устанавливает название товара
`set price(value: number | null):void` - устанавливает сумму товара

#### Класс GalleryProductCardView

Отвечает за отображение карточки товара в каталоге товаров

Конструктор класса ищет в разметке <template id="card-catalog"> поля класса.

Тип для дженерика Component:
`TCardGallery:Pick<IProduct,'image'|'category'>`

Поля класса:
`protected cardCategory:HTMLElement` - категория товара на карточке
`protected cardImage:HTMLImageElement` - картинка товара на карточке

Методы класса:
`set category(value:string):void` - устанавливает категорию в карточке
`set image(value:string)` - устанавливает картинку товара в карточке

#### Класс PreviewProductCardView

Отвечает за отображение карточки товара в модальном окне

Конструктор класса ищет в разметке <template id="card-preview"> поля класса.

Тип для дженерика Component:
`TCardPreview: Pick<IProduct, "image" | "category" | "description">`

Поля класса:
`protected cardCategory: HTMLElement` - категория товара на карточке
`protected cardImage: HTMLImageElement` - ссылка на картинку товара на карточке
`protected cardText: HTMLElement` - описание товара на карточке
`protected buttonBuyProduct: HTMLButtonElement` - кнопка покупки товара в модальном окне

Методы класса:
`set category(value: string):void` - устанавливает категорию в карточке
`set description(value: string):void` - устанавливает описание товара в карточке
`set image(value: string)` - устанавливает картинку товара в карточке
`setButtonText(text:string)` - устанавливает текст на кнопке
`disableButton()` - блокирует кнопку покупки

#### Класс BasketProductCardView

Отвечает за отображение карточки товара в модальном окне корзины товаров

Конструктор класса ищет в разметке <template id="card-basket"> поля класса.

Интерфейс для дженерика Component:
`BasketProductData:{index:number}`

Поля класса:
`protected basketProductIndex: HTMLElement` - номер товара в списке
`buttonDeleteProduct:HTMLButtonElement` - кнопка покупки товара в модальном окне

Методы класса:
`set index(value:number):void` - устанавливает номер товара в карточке товара в корзине

#### Класс BasketView

Отввечает за отображение корзины товаров внутри модального окна

Конструктор класса ищет в разметке <template id="basket"> поля класса.

Интерфейс для дженерика Component:
`BasketData:{itemList:HTMLElement[], price: string}`

Поля класса:
`protected basketList: HTMLElement` - список товаров в корзине(<ul class="basket__list">)
`protected basketButton: HTMLButtonElement` - кнопка оформления заказа
`protected basketPrice: HTMLElement` - сумма товаров в корзине

Методы класса:
`set itemList(items: HTMLElement[]):void` - установить список товаров в корзине
`set price(value: string):void` - установить цену всей корзины

#### Класс FormView

Является родительским классом для: `OrderFormView` и `ContactsFormView`
Отвечает за отображение общих полей для двух дочерних классов отображения форм.

Конструктор класса ищет в разметке поля класса.

Интерфейс для дженерика Component:
`IFormData:{errors: { payment: string; address: string; phone: string; email: string }}`

Поля класса:
`protected formErrors: HTMLElement` - отображение ошибок в заполнении формы
`protected submitButton: HTMLButtonElement` - кнопка подтверждения заполнения формы

Методы класса:
`changeField(field: keyof T, value: string)` - вызывает событие изменения ввода данных в форму
`set errors(errors: { payment: string; address: string; phone: string; email: string })` - устанавливает ошибки в заполнении формы
`enableButton()` - включает кнопку подтверждения в форме
`disableButton()` - блокирует кнопку подтверждения в форме

#### Класс OrderFormView

Отвечает за отображение формы с заполнением формы оплаты и адреса в модальном окне

Конструктор класса ищет в разметке поля класса.

Интерфейс для дженерика Component:
`OrderData:{address: string}`

Поля класса:
`protected buttonOnline: HTMLButtonElement` - кнопка оплаты онлайн
`protected buttonCash: HTMLButtonElement` - кнопка оплаты после покупки
`protected orderAddress: HTMLInputElement` - адрес покупателя

Методы класса:
`set address(value: string)` - установить адрес
`togglePayment(payment: TPayment): void` - метод отвечает за активную кнопку формы оплаты товара

#### Класс ContactsFormView

Отвечает за отображение формы с заполнением контактных данных в модальном окне

Конструктор класса ищет в разметке поля класса.

Интерфейс для дженерика Component:
`ContactData:{email: string, phone: string}`

Поля класса:
`protected contactEmail: HTMLInputElement` - отвечает за ввод адреса электронной почты
`protected contactPhone: HTMLInputElement` - отвечает за ввод номера телефона

Методы класса:
`set email(value: string)` - установить адрес электронной почты
`set phone(value: string)` - установить номер телефона

### Описание событий
`catalogList:changed` - при изменении каталога
`card:select` - при выборе карточки
`basket:changed` - при изменении корзины
`buyer:changed` - при изменении данных покупателя
`card:buy` - при нажатии кнопки покупки/УДАЛЕНИЯ карты товара
`basket:open` - при открытии корзины
`card:remove` - при нажатии кнопки удаления карточки товара
`basket:order` - при нажатии кнопки оформить заказ в корзине
`order:online` - при нажатии кнопки выбора онлайн оплаты
`order:cash` - при нажатии кнопки выбора оплаты после заказа
`address:change` - при изменении адреса в вводе
`order:change` - при изменении данных адреса и формы оплаты
`order:submit` - при нажатии кнопки подтверждения в форме выора оплаты и адреса
`phone:change` - при изменении номера телефона в вводе
`email:change` - при изменении почты в вводе
`contact:change` - при изменении контактной информации
`success:close` - при нажатии на кнопку возврата после заказа