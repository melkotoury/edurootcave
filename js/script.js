// IIFE with jQuery Wrapper
(function($) {
  'use strict';


  //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
  var MqL = 1170;

  function closeNav() {
    $('.rex-nav-trigger').removeClass('nav-is-visible');
    $('.rex-main-header').removeClass('nav-is-visible');
    $('.rex-primary-nav').removeClass('nav-is-visible');
    $('.rex-has-children ul').addClass('is-hidden');
    $('.rex-has-children a').removeClass('selected');
    $('.moves-out').removeClass('moves-out');
    $('.rex-main-content').removeClass('nav-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      $('body').removeClass('overflow-hidden');
    });
  }

  function toggleSearch(type) {
    if(type === 'close') {
      //close serach
      $('.rex-search').removeClass('is-visible');
      $('.rex-search-trigger').removeClass('search-is-visible');
      $('.rex-overlay').removeClass('search-is-visible');
    } else {
      //toggle search visibility
      $('.rex-search').toggleClass('is-visible');
      $('.rex-search-trigger').toggleClass('search-is-visible');
      $('.rex-overlay').toggleClass('search-is-visible');
      if($(window).width() > MqL && $('.rex-search').hasClass('is-visible')) {
        $('.rex-search').find('input[type="search"]').focus();
      }
      ($('.rex-search').hasClass('is-visible')) ? $('.rex-overlay').addClass('is-visible') : $('.rex-overlay').removeClass('is-visible') ;
    }
  }

  function checkWindowWidth() {
    //check window width (scrollbar included)
    var e = window,
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
      return true;
    } else {
      return false;
    }
  }

  function moveNavigation(){
    var navigation = $('.rex-nav');
      var desktop = checkWindowWidth();
        if ( desktop ) {
      navigation.detach();
      navigation.insertBefore('.rex-header-buttons');
    } else {
      navigation.detach();
      navigation.insertAfter('.rex-main-content');
    }
  }

  /*
   *----------------------------------
   * Document Ready
   *----------------------------------
   */
   $(document).ready(function() {

    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');
    //Checks if li has sub (ul) and adds class for toggle icon - just an UI


    $('.menu > ul > li > ul:not(:has(ul))').addClass('normal-sub');
    //Checks if drodown menu's li elements have anothere level (ul), if not the dropdown is shown as regular dropdown, not a mega menu (thanks Luka Kladaric)

    $('.menu > ul').before('<a href=\"#\" class=\"menu-mobile\">Menu</a>');

    //Adds menu-mobile class (for mobile toggle menu) before the normal menu
    //Mobile menu is hidden if width is more then 959px, but normal menu is displayed
    //Normal menu is hidden if width is below 959px, and jquery adds mobile menu
    //Done this way so it can be used with wordpress without any trouble

    if ($(window).width() > 943) {
      $('.menu > ul > li').on({
        mouseenter: function () {
          $(this).children('ul').stop(true, false).fadeToggle(150);
        },
        mouseleave: function () {
          $(this).children('ul').stop(true, false).fadeToggle(150);
        }
      });
    }


    //If width is more than 943px dropdowns are displayed on hover

    $('.menu > ul > li').on('click',function () {
        if ($(window).width() <= 943) {
            $(this).children('ul').fadeToggle(150);
        }
    });
    //If width is less or equal to 943px dropdowns are displayed on click (thanks Aman Jain from stackoverflow)

    $('.menu-mobile').on('click',function (e) {
        e.preventDefault();
        $('.menu > ul').toggleClass('show-on-mobile');
    });
    //when clicked on mobile-menu, normal menu is shown as a list, classic rwd menu story (thanks mwl from stackoverflow)



    // Testimonial
    $('#testimonials').owlCarousel({
      singleItem: true,
      slideSpeed : 800,
      paginationSpeed : 1600,
      rewindSpeed : 1500,
      navigation: true,
      navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });

    // Popular Courses
    $('#popular_courses').owlCarousel({
      items : 3,
      itemsCustom : false,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,2],
      itemsTablet: [768,1],
      itemsTabletSmall: false,
      itemsMobile : [479,1],
      singleItem : false,
      itemsScaleUp : false,
      slideSpeed : 800,
      paginationSpeed : 1600,
      rewindSpeed : 1500,
      navigation: true,
      navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });


    // Courses-Slider
    $('#courses-slider').owlCarousel({
      items : 1,
      itemsCustom : false,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,2],
      itemsTablet: [768,1],
      itemsTabletSmall: false,
      itemsMobile : [479,1],
      singleItem : false,
      itemsScaleUp : false,
      slideSpeed : 800,
      paginationSpeed : 1600,
      rewindSpeed : 1500,
      navigation: true,
      navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });


    // Instructors Page Slider
    $('#Instructors-page-slider').owlCarousel({
      items : 3,
      itemsCustom : false,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,2],
      itemsTablet: [768,1],
      itemsMobile : [479,1],
      itemsTabletSmall: false,
      singleItem : false,
      itemsScaleUp : false,
      slideSpeed : 800,
      paginationSpeed : 1600,
      rewindSpeed : 1500,
      navigation: true,
      navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });

    // counters

    $('#group-btn a').on('focus', function(){
      $('#group-btn a').toggleClass('active');
    });

  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });

  });// DOM Ready


  $('#list').on('click',function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});
  $('#grid').on('click',function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});


  /**
   * Google Map
   */
  if ( $('#googleMap').length ) {
    var mapProp = {
      center: new google.maps.LatLng(51.508742,-0.120850),
      zoom:9,
      scrollwheel: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
  }

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }

  // custom formatting example
  $('.count-title').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });

  var waypoints = $('#achievment').waypoint({
    handler: function(down) {
      // start all the timers
      $('.timer').each(count);
      this.destroy();
    },
    offset: 600
  });


  $('.rex-slider').DrSlider({
    transitionSpeed: 1500,
    showNavigation: false
  }); //Yes! that's it!

  $('[data-toggle="tooltip"]').tooltip();

    // DOM Content Load Event Actions;
  $( window ).load(function() {
    $('div.loading').remove();
    $('body').removeClass('loading');
  });


  if( $( window ).width() < 1024 ){
    $.scrollUp({
        scrollName: 'scrollUp',      // Element ID
        scrollDistance: 300,         // Distance from top/bottom before showing element (px)
        scrollFrom: 'top',           // 'top' or 'bottom'
        scrollSpeed: 300,            // Speed back to top (ms)
        easingType: 'linear',        // Scroll to top easing (see http://easings.net/)
        animation: 'fade',           // Fade, slide, none
        animationSpeed: 200,         // Animation speed (ms)
        scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
        scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
        scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>', // Text for element, can contain HTML
        scrollTitle: false,          // Set a custom <a> title if required.
        scrollImg: false,            // Set true to use image
        activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        zIndex: 2147483647           // Z-Index for the overlay
    });
  }

  var slider = $('.mis-stage').miSlider({
      slidesOnStage: false,
      slidePosition: 'center',
      slideScaling: 150,
      pause: 40000000000
  });




  $('#test').on('click', function(){
    $('#myNav').css( 'height' , '50px');
    if ($( window ).width() > 1024) {
      $('#myNav').css( 'height' , '65px');
    }
  });

  $('#closeNav').on('click', function(){
    $('#myNav').css( 'height' , '0%');
  });


  if( $( window ).width() < 767 ){
    // features Page Slider
    $('#features').owlCarousel({
      items : 3,
      slideSpeed : 800,
      paginationSpeed : 1600,
      navigation: true,
      navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });    
    $('#Instructors').owlCarousel({
      items : 3,
      slideSpeed : 800,
      paginationSpeed : 1600,
      navigation: true,
      navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    }); 
    $('#latest_news').owlCarousel({
      items : 3,
      slideSpeed : 800,
      paginationSpeed : 1600,
      navigation: true,
      navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
    });    
  }


}(jQuery)); // IIFE


