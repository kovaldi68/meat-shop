$(document).ready(function(){
  $('.slider--main').slick({
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

  $('.slider--gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true,
    pauseOnFocus: true,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    touchThresHold: 10,
    fade: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    asNavFor: '.slider--gallery-nav'
  });

  $('.slider--gallery-nav').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider--gallery',
    dots: true,
    arrows: false,
    variableWidth: true,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          initialSlide: 1,
          arrows: true
        }
      }
    ],
    mobileFirst: true
  });
});
