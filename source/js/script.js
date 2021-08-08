'use strict';

const pageHeader = document.querySelector('.page-header');
const headerToggle = document.querySelector('.page-header__toggle');
const tabs = document.querySelectorAll('.tab-list__link');
const tabContentBlocks = document.querySelectorAll('.product-info');
const goodsCardLinks = document.querySelectorAll('.product-card__link-more');
const mediaLaptop = window.matchMedia("(min-width: 1024px)");
const buttonUp = document.querySelector('.page__button-up');
const buttonCart = document.querySelector('.page__button-cart');
const body = document.querySelector('.page__body');
const orderForm = document.querySelector('.form--buy');
const orderModal = document.querySelector('.modal--buy');
const successModal = document.querySelector('.modal--success');
const successFeedbackModal = document.querySelector('.modal--success-feedback');
const feedbackForm = document.querySelector('.form--feedback');
const orderButtons = document.getElementsByClassName('product-info__button');
const closeModalButtons = document.querySelectorAll('.button--close');
const buttonToGoods = document.querySelector('.button--goods');
const userBuyName = orderModal.querySelector('[name = user-name]');
const userBuyNumber = orderModal.querySelector('[name = user-tel]');
const userBuyMail = orderModal.querySelector('[name = user-email]');
const userFeedbackNumber = feedbackForm.querySelector('[name = user-tel]');
const userFeedbackMail = feedbackForm.querySelector('[name = user-email]');
const userFeedbackName = feedbackForm.querySelector('[name = user-name]');
const navigationLinks = document.getElementsByClassName('navigation__link');
const orderItem = document.querySelector('#order-item-template').content.querySelector('.order-item');
const formOrderList = document.querySelector('.form__order-list');
const productCards = document.getElementsByClassName('product-info');
const summaryGoods = document.querySelector('.summary__value--goods');
const summaryTotal = document.querySelector('.summary__value--total');
const deliveryCheck = document.querySelector('.summary__checkbox');
const deliveryCost = document.querySelector('.summary__value--delivery');
const removeGoodFromOrder = document.getElementsByClassName('button--remove');
const emptyText = document.querySelector('.form__empty-cart');
const allItemsInCart = formOrderList.getElementsByClassName('order-item');
const orderSetButtons = document.getElementsByClassName('kit-list__button');
const allSlides = document.querySelectorAll('.slider__item');
const modalImage = document.querySelector('.modal--image');

const ALERT_SHOW_TIME = 3000;

allSlides.forEach(element => {
  element.addEventListener('click', function(evt) {
  evt.preventDefault();

  if (element.classList.contains('slick-current')) {

    modalImage.classList.add('modal--opened');
    body.classList.add('page__body--modal-opened');

    document.addEventListener('keydown', onImageModalEscHandler);
    document.addEventListener('click', onImageModalClickHandler);
    modalImage.querySelector('.modal__image').src = evt.target.src;
    modalImage.querySelector('.modal__image').alt = evt.target.alt;
    }
  })
});

const DELIVERY_COST_CIRCLE = '300 руб.';
const DELIVERY_COST_OUT_CIRCLE = 'Уточняйте у продавца';

//header-menu

pageHeader.classList.remove('page-header--nojs');

const onHeaderToggleHandler = () => {
  const headerHeight = pageHeader.offsetHeight;

  if (pageHeader.classList.contains("page-header--opened")) {
    pageHeader.classList.remove("page-header--opened");
    headerToggle.classList.remove('toggle--active');
    body.style.paddingTop = 0;
  } else {
    pageHeader.classList.add("page-header--opened");
    headerToggle.classList.add('toggle--active');
    body.style.paddingTop = `${headerHeight}px`;
  }
}

const closeHeader = () => {
  if (window.matchMedia(mediaLaptop).matches) {
    body.style.paddingTop = 0;
    pageHeader.classList.remove("page-header--opened")
  }
}

const stickyHeader = () => {
  const headerHeight = pageHeader.offsetHeight;
  const offsetTop = window.pageYOffset;

  if (offsetTop > 600) {
    pageHeader.classList.add("page-header--fixed")
    body.style.paddingTop = `${headerHeight}px`;
  } else {
    pageHeader.classList.remove("page-header--fixed")
    body.style.paddingTop = 0;
  }
}

//smooth navigation

const smoothScroll = function(evt) {
  evt.preventDefault()

  const blockID = evt.target.getAttribute('href').substr(1)

  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

const smoothNavigation = function() {
  for (let link of navigationLinks) {
    link.addEventListener('click', smoothScroll);
  }
}

//button-up

const buttonUpHandler = () => {
  const windowHeight = window.innerHeight;
  const offsetTop = window.pageYOffset;

  if (offsetTop > windowHeight) {
    buttonUp.classList.add('page__button-up--active');
  } else {
    buttonUp.classList.remove('page__button-up--active');
  }
}

const backToTop = () => {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}

//button-cart

const buttonCartHandler = () => {
  const windowHeight = window.innerHeight;
  const offsetTop = window.pageYOffset;

  if (offsetTop > windowHeight) {
    buttonCart.classList.add('page__button-cart--active');
  } else {
    buttonCart.classList.remove('page__button-cart--active');
  }
}

//tabs

const onTabClickHandler = () => {
  tabs.forEach(element => {
    element.addEventListener('click', selectProductTab)
  })
}

const selectProductTab = (evt) => {
  evt.preventDefault();
  if (evt.target) {
    tabs.forEach(element => {
      element.classList.remove('tab-list__link--active');
    })
    evt.target.classList.add('tab-list__link--active');
    let tabName = evt.target.dataset.productName;
    selectTabContent(tabName);
  }
}

const selectTabContent = (tabName) => {
  tabContentBlocks.forEach(element => {
    if (element.id === tabName) {
      element.classList.add('product-info--active');
    } else {
      element.classList.remove('product-info--active');
    }
  })
}

const onCardLinkHandler = () => {
  goodsCardLinks.forEach(element => {
    element.addEventListener('click', goToProduct)
  })
}

const goToProduct = (evt) => {
  let linkName = evt.target.getAttribute('href').substr(1);

  tabs.forEach(element => {
    element.classList.remove('tab-list__link--active');
    if (linkName == element.id) {
      element.classList.add('tab-list__link--active');
    }
  })
  let tabName = evt.target.dataset.productName;
  selectTabContent(tabName);
}

//localstoage

let isStorageSupport = true;
let storageNumber = '';
let storageMail = '';
let storageName = '';

try {
  storageNumber = localStorage.getItem('userNumber');
  storageMail = localStorage.getItem('userMail');
  storageName = localStorage.getItem('userName')
} catch (err) {
  isStorageSupport = false;
}

const storageData = () => {
  if (storageNumber && storageMail) {
    userBuyName.value = storageName;
    userBuyNumber.value = storageNumber;
    userBuyMail.value = storageMail;
  }
}

//forms

const getOrderList = function() {
    let list = [];
    const goodInfo = document.querySelectorAll('.order-item');

  for (let i = 0; i < goodInfo.length; i++) {
      let item = {};
      goodInfo[i].querySelector('[name = order-good-name]').value = goodInfo[i].querySelector('.order-item__name-text').textContent;
      let name = goodInfo[i].querySelector('[name = order-good-name]').value
      let number = goodInfo[i].querySelector('[name = goods-number]').value;
      goodInfo[i].querySelector('[name = order-good-sum]').value = goodInfo[i].querySelector('.order-item__summary-value').textContent;
      let sum = goodInfo[i].querySelector('[name = order-good-sum]').value;

      item["Наименование"] = name;
      item["Количество"] = number;
      item["Сумма"] = sum;

      list.push(item);
  }

  return list;
}

async function buyFormSubmitHandler(evt) {
  evt.preventDefault();
  let error = formValidate(orderForm);
  const summaryInfo = document.querySelector('.summary');

  summaryInfo.querySelector('[name = goods-sum]').value = summaryInfo.querySelector('.summary__value--goods').textContent;
  summaryInfo.querySelector('[name = total-sum]').value = summaryInfo.querySelector('.summary__value--total').textContent;

  const formData = new FormData(orderForm);
  const allGoodsInOrder = JSON.stringify(getOrderList());
  formData.append('orderGoodsList', allGoodsInOrder);

  if (formOrderList.children.length !== 0 && error === 0) {
    orderForm.classList.add('form--sending');

    let response = await fetch('sendmail.php', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      let result = await response.json();
      formOrderList.innerHTML = '';
      orderForm.classList.remove('form--sending');
      makeOrderModal();
      showUpSuccessModal();
    } else {
      createErrorMessage();
      orderForm.classList.remove('form--sending');
    }

    if (isStorageSupport) {
      localStorage.setItem('userNumber', userBuyNumber.value);
      localStorage.setItem('userMail', userBuyMail.value);
      localStorage.setItem('userName', userBuyName.value);
    }
  }
}

const createErrorMessage = function() {
  const message = document.createElement('div');
  message.classList.add('.form__error-message')
  message.textContent = 'Ошибка при отправке формы, свяжитесь с нами по телефону или через соц сети';
  message.style.zIndex = 100;
  message.style.width = '90%';
  message.style.margin = '0 auto';
  message.style.position = 'absolute';
  message.style.bottom = 0;
  message.style.left = 0;
  message.style.right = 0;
  message.style.padding = '5px';
  message.style.fontSize = '15px';
  message.style.background = '#500805';
  message.style.color = '#fff';
  message.style.textAlign = 'center';

  orderForm.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
}

const emailTest = function(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

const phoneTest = function(input) {
  return !/^[0-9]{10}/.test(input.value);
}

const formValidate = function(formToValidate) {
  let error = 0;
  let formReq = formToValidate.querySelectorAll('.form__input--required');

  for (let i = 0; i < formReq.length; i++) {
    const input = formReq[i];
    formRemoveError(input);

    if (input.classList.contains('form__input--mail')) {
      if (emailTest(input)) {
        formAddError(input);
        error++;
      }
    } else if (input.classList.contains('form__input--tel')) {
      if (phoneTest(input)) {
        formAddError(input);
        error++;
      }
    } else {
      if (input.value === '') {
        formAddError(input);
        error++;
      }
    }
  }

  return error;
}

const formRemoveError = function(input) {
  input.closest('div').classList.remove('form__input-wrapper--error');
  input.classList.remove('form__input--error')
}

const formAddError = function(input) {
  input.closest('div').classList.add('form__input-wrapper--error');
  input.classList.add('form__input--error')
}

async function feedbackFormSubmitHandler(evt) {
  evt.preventDefault();
  let error = formValidate(feedbackForm);

  const formData = new FormData(feedbackForm);

  if (error === 0) {
    feedbackForm.classList.add('form--sending');

    let response = await fetch('sendmail-feedback.php', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      let result = await response.json();
      feedbackForm.classList.remove('form--sending');
      feedbackForm.reset();
      showUpSuccessFeedbackModal();
    } else {
      createErrorMessage();
      feedbackForm.classList.remove('form--sending');
    }

    if (isStorageSupport) {
      localStorage.setItem('userNumber', userBuyNumber.value);
      localStorage.setItem('userMail', userBuyMail.value);
      localStorage.setItem('userName', userBuyName.value);
    }
  }
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
  return evt.key === ('Enter');
};

const onFormEnterHandler = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    return false;
  }
}

const successModalHandler = () => {
  successModal.classList.remove('modal--opened');
  body.classList.remove('page__body--modal-opened');

  document.removeEventListener('keydown', onSuccessEscHandler);
  document.removeEventListener('click', onSuccessClickHandler);
}

const successFeedbackModalHandler = () => {
  successFeedbackModal.classList.remove('modal--opened');
  body.classList.remove('page__body--modal-opened');

  document.removeEventListener('keydown', onSuccessEscHandler);
  document.removeEventListener('click', onSuccessClickHandler);
}

const makeOrderModal = () => {
  orderModal.classList.remove('modal--opened');
  body.classList.remove('page__body--modal-opened');

  document.removeEventListener('keydown', onBuyGoodEscHandler);
  document.removeEventListener('click', onMakeOrderClickHandler);
}

const imageModal = () => {
  modalImage.classList.remove('modal--opened');
  body.classList.remove('page__body--modal-opened');

  document.removeEventListener('keydown', onImageModalEscHandler);
  document.removeEventListener('click', onImageModalClickHandler);
}

const onSuccessClickHandler = (evt) => {
  if (evt.target === document.querySelector('.modal--success')) {
    successModalHandler();
  }
}
const onSuccessFeedbackClickHandler = (evt) => {
  if (evt.target === document.querySelector('.modal--success-feedback')) {
    successFeedbackModalHandler();
  }
}

const onMakeOrderClickHandler = (evt) => {
  if (evt.target === document.querySelector('.modal--buy')) {
    makeOrderModal();
  }
}

const onImageModalClickHandler = (evt) => {
  if (evt.target === document.querySelector('.modal--image')) {
    imageModal();
  }
}

const onSuccessEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successModalHandler()
    successFeedbackModalHandler();
  }
}

const onBuyGoodEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    makeOrderModal()
  }
}

const onImageModalEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    imageModal();
  }
}

const buySetButtonHandler = () => {
  for (let button of orderSetButtons) {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      showUpOrderModal();
    })
  }
}

const buyGoodButtonHandler = () => {
  for (let button of orderButtons) {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      showUpOrderModal();
    })
  }
}

const closeButtonHandler = () => {
  for (let button of closeModalButtons) {
    button.addEventListener('click', () => {
      button.closest('.modal').classList.remove('modal--opened')
      body.classList.remove('page__body--modal-opened');
    })
  }
}

const showUpOrderModal = () => {
  orderModal.classList.add('modal--opened');
  body.classList.add('page__body--modal-opened');
  storageData();
  userBuyName.focus();
  checkEmptyCart();
  getSummOfGood();
  getChangeOfSum();
  getSumOfOrder();
  getTotalSumm();


  document.addEventListener('keydown', onBuyGoodEscHandler);
  document.addEventListener('click', onMakeOrderClickHandler);
}

const showUpSuccessModal = () => {
  successModal.classList.add('modal--opened');
  body.classList.add('page__body--modal-opened');

  document.addEventListener('keydown', onSuccessEscHandler);
  document.addEventListener('click', onSuccessClickHandler);
}

const showUpSuccessFeedbackModal = () => {
  successFeedbackModal.classList.add('modal--opened');
  body.classList.add('page__body--modal-opened');

  document.addEventListener('keydown', onSuccessEscHandler);
  document.addEventListener('click', onSuccessFeedbackClickHandler);
}

//order-form

const createOrderItem = function(good) {
  const clonedOrderItem = orderItem.cloneNode(true);

  if (good.classList.contains('product-info')) {
    const goodTitle = good.querySelector('.product-info__title');
    const goodImage = good.querySelector('.product-info__image');
    const goodPriceValue = good.querySelector('.product-info__price-value');

    clonedOrderItem.querySelector('.order-item__name-text').textContent = goodTitle.textContent;
    clonedOrderItem.querySelector('.order-item__image').src = goodImage.src;
    clonedOrderItem.querySelector('.order-item__image').alt = goodImage.alt;
    clonedOrderItem.querySelector('.order-item__price-value--number').textContent = goodPriceValue.textContent;

    if (goodTitle.textContent.includes('цыплёнок') || goodTitle.textContent.includes('Утка')) {
        clonedOrderItem.querySelector('.order-item__price-value--amount').textContent = '/шт';
    }
  }

  if (good.classList.contains('kit-list__item')) {
    const setTitle = good.querySelector('.kit-list__title');
    const setImage = good.querySelector('.kit-list__image');
    const setPriceValue = good.querySelector('.kit-list__price');

    clonedOrderItem.querySelector('.order-item__name-text').textContent = `Набор ${setTitle.textContent}`;
    clonedOrderItem.querySelector('.order-item__image').src = setImage.src;
    clonedOrderItem.querySelector('.order-item__image').alt = setImage.alt;
    clonedOrderItem.querySelector('.order-item__price-value--number').textContent = setPriceValue.textContent;
    clonedOrderItem.querySelector('.order-item__price-value--amount').textContent = '';
  }

  return clonedOrderItem;
}

const goodRemoveFromOrder = function() {
  for (let button of removeGoodFromOrder) {
    button.addEventListener('click', function(evt) {
      const itemToDelete = evt.target.closest('.order-item');
      itemToDelete.remove();
      checkEmptyCart();
      getSummOfGood();
      getChangeOfSum();
      getSumOfOrder();
      getTotalSumm();
    })
  }
}

const getSummOfGood = function() {
  for (let element of allItemsInCart) {
    const amountOfGood = element.querySelector('.order-item__input').value;
    const price = element.querySelector('.order-item__price-value--number').textContent;
    const name = element.querySelector('.order-item__name-text').textContent;
    element.querySelector('.order-item__summary-value').textContent = `${+amountOfGood * +price.slice(0, -1)} руб.`;
  }
}

const findRemoveButtons = function() {
  const removeButtons = document.getElementsByClassName('button--remove');

  return removeButtons;
}

const setAddtoOrder = function() {
  for (let button of orderSetButtons) {
    button.addEventListener('click', function(evt) {
      evt.preventDefault();

      const goodItem = evt.target.closest('.kit-list__item');
      formOrderList.appendChild(createOrderItem(goodItem));
      findRemoveButtons();
      goodRemoveFromOrder();
    })
  }
}

const goodAddtoOrder = function() {
  for (let button of orderButtons) {
    button.addEventListener('click', function(evt) {
      const goodItem = evt.target.closest('.product-info');
      formOrderList.appendChild(createOrderItem(goodItem));
      findRemoveButtons();
      goodRemoveFromOrder();
    })
  }
}

const getSumOfOrder = function() {
  let sumsArray = [];
  for (let orderItem of allItemsInCart) {
    const itemCost = orderItem.querySelector('.order-item__summary-value').textContent;
    sumsArray.push(+itemCost.slice(0, -5));
  }
  let orderProductsSumm = sumsArray.reduce((accum, elem) => accum + elem, 0);
  summaryGoods.textContent = `${orderProductsSumm} руб.`

  return orderProductsSumm;
}

const getChangeOfSum = function() {
  const orderInputs = document.getElementsByClassName('order-item__input');

  for (let input of orderInputs) {
    input.addEventListener('change', getSummOfGood);
    input.addEventListener('change', getSumOfOrder);
    input.addEventListener('change', getTotalSumm);
  }
}

const getTotalSumm = function() {
  if (deliveryCheck.checked) {
    summaryTotal.textContent = `${getSumOfOrder() + +DELIVERY_COST_CIRCLE.slice(0, -5)} руб.`;
  } else {
    summaryTotal.textContent = `${getSumOfOrder()} руб. + доставка`;
  }
};

//check empty

const checkEmptyCart = function() {
  if (formOrderList.children.length === 0) {
    emptyText.style.display = 'block';
  } else {
    emptyText.style.display = 'none';
  }
}

//check delivery

const setDeliveryPrice = function() {
  if (deliveryCheck.checked) {
    deliveryCost.textContent = DELIVERY_COST_CIRCLE;
  } else {
    deliveryCost.textContent = DELIVERY_COST_OUT_CIRCLE;
  }
};

orderForm.addEventListener('keydown', onFormEnterHandler);
window.addEventListener("scroll", buttonUpHandler);
window.addEventListener("scroll", buttonCartHandler);
window.addEventListener("scroll", stickyHeader);
window.addEventListener("resize", closeHeader);
deliveryCheck.addEventListener('change', setDeliveryPrice);
deliveryCheck.addEventListener('change', getTotalSumm);
buttonCart.addEventListener('click', showUpOrderModal);
buttonUp.addEventListener('click', backToTop);
headerToggle.addEventListener('click', onHeaderToggleHandler);
orderForm.addEventListener('submit', buyFormSubmitHandler);
buttonToGoods.addEventListener('click', smoothScroll);
feedbackForm.addEventListener('submit', feedbackFormSubmitHandler);
setAddtoOrder();
buySetButtonHandler();
goodAddtoOrder();
onTabClickHandler();
onCardLinkHandler();
buyGoodButtonHandler();
closeButtonHandler();
smoothNavigation();
