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
const feedbackForm = document.querySelector('.form--feedback');
const orderButtons = document.getElementsByClassName('product-info__button');
const closeModalButtons = document.querySelectorAll('.button--close')
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

  if (offsetTop > 700) {
    pageHeader.classList.add("page-header--fixed")
    body.style.paddingTop = `${headerHeight}px`;
  } else {
    pageHeader.classList.remove("page-header--fixed")
    body.style.paddingTop = 0;
  }
}

//smooth navigation

const smoothNavigation = function() {
  for (let link of navigationLinks) {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = link.getAttribute('href').substr(1)
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
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

try {
  storageNumber = localStorage.getItem('userNumber');
  storageMail = localStorage.getItem('userMail');
} catch (err) {
  isStorageSupport = false;
}

const storageData = () => {
  if (storageNumber && storageMail) {
    userBuyNumber.value = storageNumber;
    userBuyMail.value = storageMail;
  }
}

//forms

const buyFormSubmitHandler = (evt) => {
  evt.preventDefault();
  makeOrderModal();
  showUpSuccessModal();

  if (isStorageSupport) {
    localStorage.setItem('userNumber', userBuyNumber.value);
    localStorage.setItem('userMail', userBuyMail.value);
    localStorage.setItem('userName', userBuyName.value);
  }
}

const feedbackFormSubmitHandler = (evt) => {
  evt.preventDefault();
  showUpSuccessModal();

  if (isStorageSupport) {
    localStorage.setItem('userNumber', userFeedbackNumber.value);
    localStorage.setItem('userMail', userFeedbackMail.value);
    localStorage.setItem('userName', userFeedbackName.value);
  }
}

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const successModalHandler = () => {
  successModal.classList.remove('modal--opened');

  document.removeEventListener('keydown', onSuccessEscHandler);
  document.removeEventListener('click', onSuccessClickHandler);
}

const makeOrderModal = () => {
  orderModal.classList.remove('modal--opened');
  body.classList.remove('page__body--modal-opened');

  document.removeEventListener('keydown', onBuyGoodEscHandler);
  document.removeEventListener('click', onMakeOrderClickHandler);
}

const onSuccessClickHandler = (evt) => {
  if (evt.target === document.querySelector('.modal--success')) {
    successModalHandler();
  }
}

const onMakeOrderClickHandler = (evt) => {
  if (evt.target === document.querySelector('.modal--buy')) {
    makeOrderModal();
  }
}

const onSuccessEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successModalHandler()
  }
}

const onBuyGoodEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    makeOrderModal()
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

  document.addEventListener('keydown', onSuccessEscHandler);
  document.addEventListener('click', onSuccessClickHandler)
}

//order-form

const removeGoodFromOrder = document.getElementsByClassName('button--remove');

const createOrderItem = function(good) {
  const clonedOrderItem = orderItem.cloneNode(true);
  const goodTitle = good.querySelector('.product-info__title');
  const goodImage = good.querySelector('.product-info__image');
  const goodPriceValue = good.querySelector('.product-info__price-value');

  clonedOrderItem.querySelector('.order-item__name-text').textContent = goodTitle.textContent;
  clonedOrderItem.querySelector('.order-item__image').src = goodImage.src;
  clonedOrderItem.querySelector('.order-item__price-value--number').textContent = goodPriceValue.textContent;

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

const allItemsInCart = formOrderList.getElementsByClassName('order-item');

const getSummOfGood = function() {
  for (let element of allItemsInCart) {
    const amountOfGood = element.querySelector('.order-item__input').value;
    const price = element.querySelector('.order-item__price-value--number').textContent;
    element.querySelector('.order-item__summary-value').textContent = `${+amountOfGood * +price.slice(0, -1) * 3} руб.`;
  }
}

const findRemoveButtons = function() {
  const removeButtons = document.getElementsByClassName('button--remove');

  return removeButtons;
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

const emptyText = document.querySelector('.form__empty-cart');

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
feedbackForm.addEventListener('submit', feedbackFormSubmitHandler);
goodAddtoOrder();
onTabClickHandler();
onCardLinkHandler();
buyGoodButtonHandler();
closeButtonHandler();
smoothNavigation();