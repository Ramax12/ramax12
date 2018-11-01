'use strict';

(function () {

  //burger menu
  var mainNav = document.querySelector('.main-nav');
  var navToggle = document.querySelector('.main-nav__toggle');

  mainNav.classList.add('main-nav--closed');
  navToggle.addEventListener('click', function() {
    if (mainNav.classList.contains('main-nav--closed')) {
      navToggle.style.transform = 'rotate(180deg)';
      mainNav.classList.remove('main-nav--closed');
      mainNav.classList.add('main-nav--opened');
    } else {
      navToggle.style.transform = 'rotate(0deg)';
      mainNav.classList.add('main-nav--closed');
      mainNav.classList.remove('main-nav--opened');
    }
  });

//slider
  var twoItemsSlides = document.querySelector('.slider--decor');
  var mqMobile = window.matchMedia("(max-width: 767px)"),
      mqTablet = window.matchMedia("(min-width: 768px)");

  var Slider = function(element) {
    this.el = document.querySelector(element);
    this.init();
  };
  Slider.prototype = {
    init: function() {
      this.slides = this.el.querySelectorAll('.slider__item');
      this.sliderToggle = this.el.querySelectorAll('.slider__toggle');
      this.sliderNumber = this.el.querySelectorAll('.slider__number');
      this.sliderScrolling = this.el.querySelectorAll('.slider__scrolling');
      this.prevBtn = this.el.querySelectorAll('.slider__previous-btn');
      this.nextBtn = this.el.querySelectorAll('.slider__next-btn');
      this.slides.currentSlide = 0;
      this.slides.showSlides = 1;
      this.navigate();
    },
    navigate: function() {
      var self = this;
      
      self.slides[self.slides.currentSlide].classList.add('slider__item--showing');
      if (this.el === twoItemsSlides && mqTablet.matches) {
        this.slides[self.slides.currentSlide + 1].classList.add('slider__item--showing');
        this.slides.showSlides = 2;
      };

      [].forEach.call(self.sliderNumber, function (containerNumber) {
        containerNumber.innerHTML = (self.slides.currentSlide + 1) + '/' + self.slides.length;
      });

      [].forEach.call(self.sliderScrolling, function (containerItem) {
        var touchstartX = 0,
            touchstartY = 0,
            touchendX = 0,
            touchendY = 0;

        containerItem.addEventListener('touchstart', function(evt) {
            touchstartX = evt.changedTouches[0].screenX;
        }, false);

        containerItem.addEventListener('touchend', function(evt) {
            touchendX = evt.changedTouches[0].screenX;
            if (touchendX - 50 < touchstartX) {
                goToSlide(self.slides.currentSlide + self.slides.showSlides);
            }
            if (touchendX + 50 > touchstartX) {
                goToSlide(self.slides.currentSlide - self.slides.showSlides);
            }
        }, false);
      });

      [].forEach.call(this.prevBtn, function (containerBtn) {
        containerBtn.addEventListener('click', function() {
          goToSlide(self.slides.currentSlide - self.slides.showSlides);
        }, false);
      });
      [].forEach.call(this.nextBtn, function (containerBtn) {
        containerBtn.addEventListener('click', function() {
          goToSlide(self.slides.currentSlide + self.slides.showSlides);
        }, false);
      });

      [].forEach.call(self.slides, function (containerItem) {
       var slidesBtn = containerItem.querySelectorAll('.view__btn');
      
        [].forEach.call(slidesBtn, function (containerBtn) {
          containerBtn.addEventListener('click', function(evt) {
            evt.preventDefault();

            var sliderFilling = document.querySelector('.slider--filling'),
                sliderSize = document.querySelector('.slider--size'),
                sliderDecor = document.querySelector('.slider--decor');
            var conclusion = document.querySelectorAll('.total__conclusion');
            var slidesImg = containerItem.querySelectorAll('.view__img');

            [].forEach.call(slidesImg, function (containerImg) {
              if (self.el === sliderFilling) {
                conclusion[0].value = containerImg.title;
              } else if (self.el === sliderSize) {
                conclusion[1].value = containerImg.title;
              } else if (self.el === sliderDecor) {
                conclusion[2].value = containerImg.title;
              }
            });
          }, false);
        });
      });

      [].forEach.call(self.slides, function (containerItem) {
        var reviewsBtn = containerItem.querySelectorAll('.reviews__btn');

        [].forEach.call(reviewsBtn, function (containerBtn) {
          containerBtn.addEventListener('click', function(evt) {
            evt.preventDefault();

            var reviewsContent = containerItem.querySelectorAll('.reviews__content');

            [].forEach.call(reviewsContent, function (containerContent) {
              if (containerContent.classList.contains('reviews__content--show')) {
                containerContent.classList.remove('reviews__content--show');
                containerBtn.innerHTML = 'Развернуть';
              } else {
                containerContent.classList.add('reviews__content--show');
                containerBtn.innerHTML = 'Свернуть';
              }
            });
          }, false); 
        });
      });

      var goToSlide = function(n) {
        self.slides.currentSlide = (n + self.slides.length) % self.slides.length;
        [].forEach.call(self.slides, function (containerItem) {
          containerItem.classList.remove('slider__item--showing');
        });
        self.slides[self.slides.currentSlide].classList.add('slider__item--showing');

        [].forEach.call(self.sliderNumber, function (containerNumber) {
          containerNumber.innerHTML = (self.slides.currentSlide + 1) + '/' + self.slides.length;
        });

        if (mqTablet.matches) {
          if (self.slides.showSlides === 2 && self.slides.currentSlide !== self.slides.length - 1) {
          self.slides[self.slides.currentSlide + 1].classList.add('slider__item--showing');
          } else if (self.slides.showSlides === 2 && self.slides.currentSlide === self.slides.length - 1) {
          self.slides[0].classList.add('slider__item--showing');
          }
        } else if (mqMobile.matches) {
          [].forEach.call(self.slides, function (containerItem) {
            var currentToggle = self.slides.currentSlide;
            if ((self.slides.length / self.sliderToggle.length) % self.sliderToggle.length && currentToggle >= self.sliderToggle.length - 1 && currentToggle !== self.slides.length - 1) {
              currentToggle = self.sliderToggle.length - 2;
            }
            else if (currentToggle === self.slides.length - 1) {
              currentToggle = self.sliderToggle.length - 1;
            }

            [].forEach.call(self.sliderToggle, function (containerToggle) {
              containerToggle.classList.remove('slider__toggle--active');
            });
            self.sliderToggle[currentToggle].classList.add('slider__toggle--active');
          });
        }
      };
    }
  };

  var sliderFilling = new Slider('.slider--filling'),
      sliderSize = new Slider('.slider--size'),
      sliderDecor = new Slider('.slider--decor'),
      sliderReviews = new Slider('.slider--reviews');

  //скролл якоря
  var nav = document.querySelectorAll('.nav');
  [].forEach.call(nav, function (containerNav) {
    var linkNav = containerNav.querySelectorAll('[href^="#"]');
    var V = 0.2;
    for (var i = 0; i < linkNav.length; i++) {
      linkNav[i].addEventListener('click', function(e) {
        e.preventDefault();
        var w = window.pageYOffset,
          hash = this.href.replace(/[^#]*(.*)/, '$1');
        var t = document.querySelector(hash).getBoundingClientRect().top,
          start = null;
        requestAnimationFrame(step);
        function step(time) {
          if (start === null) start = time;
          var progress = time - start,
              r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
          window.scrollTo(0,r);
          if (r != w + t) {
              requestAnimationFrame(step)
          } else {
              location.hash = hash
          }
        }
      }, false);
    }
  });
})();