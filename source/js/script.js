'use strict';
const pageHeader = document.querySelector('.page-header');
const headerToggle = document.querySelector('.page-header__toggle');
const tabs = document.querySelectorAll('.tab-list__link');
const tabContentBlocks = document.querySelectorAll('.product-info');
const goodsCardLinks = document.querySelectorAll('.product-card__link-more');
const mediaLaptop = window.matchMedia("(min-width: 1024px)");
const buttonUp = document.querySelector('.page__button-up');

//header-menu

pageHeader.classList.remove('page-header--nojs');

const onHeaderToggleHandler = () => {
  const headerHeight = pageHeader.offsetHeight;

  if (pageHeader.classList.contains("page-header--opened")) {
    pageHeader.classList.remove("page-header--opened");
    headerToggle.classList.remove('toggle--active');
    document.body.style.paddingTop = 0;
  } else {
    pageHeader.classList.add("page-header--opened");
    headerToggle.classList.add('toggle--active');
    document.body.style.paddingTop = `${headerHeight}px`;
  }
}

const closeHeader = () => {
  if (window.matchMedia(mediaLaptop).matches) {
    document.body.style.paddingTop = 0;
    pageHeader.classList.remove("page-header--opened")
  }
}

const stickyHeader = () => {
  const headerHeight = pageHeader.offsetHeight;
  const offsetTop = window.pageYOffset;

  if (offsetTop > 700) {
    pageHeader.classList.add("page-header--fixed")
    document.body.style.paddingTop = `${headerHeight}px`;
  } else {
    pageHeader.classList.remove("page-header--fixed")
    document.body.style.paddingTop = 0;
  }
}

//button-up

const buttonUpHanlder = () => {
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

buttonUp.addEventListener('click', backToTop);
window.addEventListener("scroll", buttonUpHanlder);
window.addEventListener("scroll", stickyHeader);
window.addEventListener("resize", closeHeader);
headerToggle.addEventListener('click', onHeaderToggleHandler);
onTabClickHandler();
onCardLinkHandler();
