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
const productAddButtons = document.querySelectorAll('.button--order');
const closeModalButtons = document.querySelectorAll('.button--close');
const userBuyName = orderModal.querySelector('[name = user-name]');
const userBuyNumber = orderModal.querySelector('[name = user-tel]');
const userBuyMail = orderModal.querySelector('[name = user-email]');
const userFeedbackNumber = feedbackForm.querySelector('[name = user-tel]');
const userFeedbackMail = feedbackForm.querySelector('[name = user-email]');
const userFeedbackName = feedbackForm.querySelector('[name = user-name]');

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

  document.removeEventListener('keydown', onBuyTourEscHandler);
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

const onBuyTourEscHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    makeOrderModal()
  }
}

const buyTourButtonHandler = () => {
  for (let button of productAddButtons) {
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

  document.addEventListener('keydown', onBuyTourEscHandler);
  document.addEventListener('click', onMakeOrderClickHandler);
}

const showUpSuccessModal = () => {
  successModal.classList.add('modal--opened');

  document.addEventListener('keydown', onSuccessEscHandler);
  document.addEventListener('click', onSuccessClickHandler)
}


window.addEventListener("scroll", buttonUpHandler);
window.addEventListener("scroll", buttonCartHandler);
window.addEventListener("scroll", stickyHeader);
window.addEventListener("resize", closeHeader);
buttonCart.addEventListener('click', showUpOrderModal)
buttonUp.addEventListener('click', backToTop);
headerToggle.addEventListener('click', onHeaderToggleHandler);
orderForm.addEventListener('submit', buyFormSubmitHandler);
feedbackForm.addEventListener('submit', feedbackFormSubmitHandler);
onTabClickHandler();
onCardLinkHandler();
buyTourButtonHandler();
closeButtonHandler();

const orderItem = document.querySelector('#order-item-template').querySelector('.order-item');

const articles = document.getElementsByClassName('article');
const productCards = document.getElementsByClassName('product-info');
const orderButtons = document.getElementsByClassName('button--order');


function renderAd() {
  const goodInfo = {
    title: article__title,
    price: article__price,
    photo: productinfo__photo,
  }
}
console.log(articles)