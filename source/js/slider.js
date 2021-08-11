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
    arrows: false,
    fade: true,
    infinite: true,
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
    arrows: true,
    infinite: true,
    centerMode: true,
    focusOnSelect: true
  });
});
