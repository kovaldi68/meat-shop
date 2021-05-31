'use strict';
var pageHeader = document.querySelector('.page-header');
var headerToggle = document.querySelector('.page-header__toggle');

pageHeader.classList.remove('page-header--nojs');

const onHeaderToggleHandler = () => {
  pageHeader.classList.toggle('page-header--opened');
  headerToggle.classList.toggle('toggle--active');
}

headerToggle.addEventListener('click', onHeaderToggleHandler);



//slider

$(document).ready(function(){
  $('.slider').slick({
    dots: true,
    responsive: [
      {
        breakpoint: 510,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      }
    ],
    mobileFirst: true,
  });
});
