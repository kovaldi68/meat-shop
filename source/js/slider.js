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
