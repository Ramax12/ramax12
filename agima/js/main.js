'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AboutExpertsSlider = function () {
    function AboutExpertsSlider($el) {
        _classCallCheck(this, AboutExpertsSlider);

        // Переменные
        this.$slider = $el;
        this.$scroll = this.$slider.find('.js-about-experts-scroll');
        this.$slides = this.$slider.find('.js-slide');
        this.$left = this.$slider.find('.js-left');
        this.$right = this.$slider.find('.js-right');
        this.$pagination = this.$slider.find('.js-pagination');
        this.currentIndex = 0;
        this.canAnimate = true;
        this.startX = null;

        // Функции
        this.setListeners();
        this.updatePager();
    }

    _createClass(AboutExpertsSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this = this;

            this.$left.on('click', function (e) {
                e.preventDefault();

                if (_this.canAnimate) {
                    _this.canAnimate = false;

                    _this.currentIndex--;

                    if (_this.currentIndex < 0) {
                        _this.currentIndex = 0;
                    }

                    _this.moveSlider();
                }
            });

            this.$right.on('click', function (e) {
                e.preventDefault();

                if (_this.canAnimate) {
                    _this.canAnimate = false;

                    _this.currentIndex++;

                    if (_this.currentIndex > _this.$slides.length - 1) {
                        _this.currentIndex = _this.$slides.length - 1;
                    }

                    _this.moveSlider();
                }
            });

            // swipe detected
            this.$slider.on('touchstart', function (e) {
                _this.startX = (e.touches || e.originalEvent.touches)[0].clientX;
            });

            this.$slider.on('touchmove', function (e) {
                if (!_this.startX) return;

                var xDelta = _this.startX - (e.touches || e.originalEvent.touches)[0].clientX;

                if (xDelta > 15) {
                    _this.$right.trigger('click');
                    _this.startX = null;
                } else if (xDelta < -15) {
                    _this.$left.trigger('click');
                    _this.startX = null;
                }
            });

            $(window).on('resize', function (e) {
                _this.$scroll.scrollLeft(_this.$slides.eq(_this.currentIndex).position().left);
            });
        }
    }, {
        key: 'updatePager',
        value: function updatePager() {
            this.$pagination.html('<span>' + (this.currentIndex + 1) + '</span>' + ' <i>/</i> ' + this.$slides.length);
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            var _this2 = this;

            var newX = this.$slides.eq(this.currentIndex).position().left;

            anime({
                targets: this.$scroll[0],
                scrollLeft: {
                    value: newX,
                    duration: 500,
                    easing: 'easeInOutCirc'
                },
                complete: function complete() {
                    _this2.canAnimate = true;

                    _this2.updatePager();
                }
            });
        }
    }]);

    return AboutExpertsSlider;
}();

$(function () {
    $('.js-about-experts-slider').each(function (i, item) {
        new AboutExpertsSlider($(item));
    });
});

var AboutLeadersSlider = function () {
    function AboutLeadersSlider($el) {
        _classCallCheck(this, AboutLeadersSlider);

        // Переменные
        this.$element = $el;

        this.$slides = this.$element.find('.js-slide');
        this.$videoSlides = this.$element.find('.js-slide-video');
        this.$dots = this.$element.find('.js-dot');
        this.$top = this.$element.find('.js-top');
        this.$bottom = this.$element.find('.js-bottom');
        this.currentIndex = 0;

        // Функции
        this.setListeners();

        // покажем первый слайд
        this.$slides.eq(this.currentIndex).addClass('is-active');
        this.$videoSlides.eq(this.currentIndex).addClass('is-active');
    }

    _createClass(AboutLeadersSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this3 = this;

            this.$top.on('click', function (e) {
                e.preventDefault();

                _this3.currentIndex--;

                if (_this3.currentIndex < 0) {
                    _this3.currentIndex = 0;
                }

                _this3.changeSlide();
            });

            this.$bottom.on('click', function (e) {
                e.preventDefault();

                _this3.currentIndex++;

                if (_this3.currentIndex > _this3.$slides.length - 1) {
                    _this3.currentIndex = _this3.$slides.length - 1;
                }

                _this3.changeSlide();
            });

            _.each(this.$dots, function (dot, i) {
                $(dot).on('click', function (e) {
                    e.preventDefault();

                    _this3.currentIndex = i;

                    _this3.changeSlide();
                });
            });
        }
    }, {
        key: 'changeSlide',
        value: function changeSlide() {
            this.$slides.removeClass('is-active');
            this.$slides.eq(this.currentIndex).addClass('is-active');

            this.$dots.removeClass('is-active');
            this.$dots.eq(this.currentIndex).addClass('is-active');

            this.$videoSlides.removeClass('is-active');
            this.$videoSlides.eq(this.currentIndex).addClass('is-active');
        }
    }]);

    return AboutLeadersSlider;
}();

$(function () {
    $('.js-about-leaders').each(function (i, item) {
        new AboutLeadersSlider($(item));
    });
});

var AboutSpecialProjectsSlider = function () {
    function AboutSpecialProjectsSlider($el) {
        _classCallCheck(this, AboutSpecialProjectsSlider);

        // Переменные
        this.$element = $el;
        this.$slider = this.$element.find('.js-slider');
        this.$slides = this.$element.find('.js-slide');
        this.$dots = this.$element.find('.js-dot');

        this.currentIndex = 0;

        // Функции
        this.setListeners();
    }

    _createClass(AboutSpecialProjectsSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this4 = this;

            this.$element.on('is-ready', function () {
                _this4.changeSlide();
            });

            _.forEach(this.$dots, function (dot, i) {
                $(dot).on('click', function (e) {
                    e.preventDefault();

                    _this4.currentIndex = i;

                    _this4.changeSlide();
                });
            });

            $(window).on('resize', function (e) {
                _this4.changeSlide();
            });
        }
    }, {
        key: 'changeSlide',
        value: function changeSlide() {
            var _this5 = this;

            if (window.innerWidth >= 1024) {
                this.$slides.removeClass('is-active');
                this.$dots.removeClass('is-active');

                setTimeout(function () {
                    _this5.$slides.eq(_this5.currentIndex).addClass('is-active');
                    _this5.$dots.eq(_this5.currentIndex).addClass('is-active');
                }, 555); // между слайдами задержка по времени ухода слайда (требование ТЗ)
            } else {
                this.$slides.addClass('is-active');
                this.$dots.removeClass('is-active');
                this.$dots.eq(this.currentIndex).addClass('is-active');

                anime({
                    targets: this.$slider[0],
                    scrollLeft: {
                        value: this.$slider.width() * this.currentIndex,
                        duration: 500,
                        easing: 'easeInOutCirc'
                    }
                });
            }
        }
    }]);

    return AboutSpecialProjectsSlider;
}();

;

$(function () {
    $('.js-about-special-projects').each(function (i, item) {
        new AboutSpecialProjectsSlider($(item));
    });
});

var AboutPromo = function () {
    function AboutPromo($el) {
        _classCallCheck(this, AboutPromo);

        // Переменные
        this.$element = $el;
        this.$toNextScreen = this.$element.find('.js-to-next-screen');

        // Функции
        this.setListeners();
    }

    _createClass(AboutPromo, [{
        key: 'setListeners',
        value: function setListeners() {
            this.$toNextScreen.on('click', function (e) {
                e.preventDefault();

                anime({
                    targets: ['html', 'body'],
                    scrollTop: {
                        value: window.innerHeight,
                        duration: 1500,
                        easing: 'easeOutExpo'
                    }
                });
            });
        }
    }]);

    return AboutPromo;
}();

$(function () {
    $('.js-about-promo').each(function (i, item) {
        new AboutPromo($(item));
    });
});

var AboutTrustUsSlider = function () {
    function AboutTrustUsSlider($el) {
        _classCallCheck(this, AboutTrustUsSlider);

        // Переменные
        this.$element = $el;
        this.$scroll = this.$element.find('.js-scroll');
        this.$slides = this.$element.find('.js-slide');
        this.$left = this.$element.find('.js-left');
        this.$right = this.$element.find('.js-right');
        this.$pagination = this.$element.find('.js-pagination');
        this.currentIndex = 0;
        this.canAnimate = true;
        this.startX = null;

        // Функции
        this.setListeners();
        this.updatePager();

        // первый слайд сделаем активным
        this.$slides.eq(this.currentIndex).addClass('is-active');
    }

    _createClass(AboutTrustUsSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this6 = this;

            this.$left.on('click', function (e) {
                e.preventDefault();

                if (_this6.canAnimate) {
                    //this.canAnimate = false;

                    _this6.currentIndex--;

                    if (_this6.currentIndex < 0) {
                        _this6.currentIndex = 0;
                    }

                    _this6.moveSlider();
                }
            });

            this.$right.on('click', function (e) {
                e.preventDefault();

                if (_this6.canAnimate) {
                    //this.canAnimate = false;

                    _this6.currentIndex++;

                    if (_this6.currentIndex > _this6.$slides.length - 1) {
                        _this6.currentIndex = _this6.$slides.length - 1;
                    }

                    _this6.moveSlider();
                }
            });

            // swipe detected
            this.$scroll.on('touchstart', function (e) {
                _this6.startX = (e.touches || e.originalEvent.touches)[0].clientX;
            });

            this.$scroll.on('touchmove', function (e) {
                if (!_this6.startX) return;

                var xDelta = _this6.startX - (e.touches || e.originalEvent.touches)[0].clientX;

                if (xDelta > 15) {
                    _this6.$right.trigger('click');
                    _this6.startX = null;
                } else if (xDelta < -15) {
                    _this6.$left.trigger('click');
                    _this6.startX = null;
                }
            });

            // $(window).on('resize', e => {
            //     this.$scroll.scrollLeft(this.$slides.eq(this.currentIndex).position().left);
            // });
        }
    }, {
        key: 'updatePager',
        value: function updatePager() {
            this.$pagination.html('<span>' + (this.currentIndex + 1) + '</span>' + ' <i>/</i> ' + this.$slides.length);
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            var newX = this.$slides.eq(this.currentIndex).position().left;

            this.$slides.removeClass('is-active');
            this.$slides.eq(this.currentIndex).addClass('is-active');

            this.updatePager();

            // anime({
            //     targets: this.$scroll[0],
            //     scrollLeft: {
            //         value: newX,
            //         duration: 500,
            //         easing: 'easeInOutCirc'
            //     },
            //     complete: () => {
            //         this.canAnimate = true;

            //         this.updatePager();
            //     }
            // });
        }
    }]);

    return AboutTrustUsSlider;
}();

$(function () {
    $('.js-about-trust-us').each(function (i, item) {
        new AboutTrustUsSlider($(item));
    });
});

var Approach = function () {
    function Approach($el) {
        _classCallCheck(this, Approach);

        // Переменные
        this.$element = $el;

        this.$tabsLinks = $('.js-go-to-section');
        this.$fixedMenu = $('.js-approach-fixed-menu');
        this.$tabsLinksInFixedMenu = this.$fixedMenu.find('.js-go-to-section');
        this.$header = $('.js-header');
        this.$limiter = $('.js-show-fixed-menu');
        this.$sliders = this.$element.find('.js-approach-slider');
        this.$accordions = this.$element.find('.js-approach-accordion');
        this.$accordionItems = this.$accordions.find('.js-approach-tabs-item');
        this.startX = null;

        // Функции
        this.setListeners();
        this.checkScroll();
        this.initSliders();
        this.initHash();
    }

    _createClass(Approach, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this7 = this;

            $(window).on('scroll', _.throttle(function (e) {
                _this7.checkScroll();
            }, 250));

            _.forEach(this.$tabsLinks, function (item) {
                $(item).on('click', function (e) {
                    e.preventDefault();

                    var $target = $($(item).attr('href'));

                    if ($target.length > 0) {
                        var newY = $target.offset().top - _this7.$header.height() - 100;

                        anime({
                            targets: ['html', 'body'],
                            scrollTop: {
                                value: newY,
                                duration: 1500,
                                easing: 'easeOutExpo'
                            }
                        });
                    }
                });
            });

            _.each(this.$accordionItems, function (item) {
                var $item = $(item);
                var $accordionLink = $item.find('.js-approach-tabs-link');
                var $accordionBlock = $item.find('.js-approach-tabs-content');

                $accordionLink.on('click', function (e) {
                    e.preventDefault();

                    // посчитаем высоту контента внутри
                    var height = _.sumBy($accordionBlock.children(), function (children) {
                        return $(children).height();
                    });

                    $accordionBlock.css({ height: height });
                    setTimeout(function () {
                        $item.toggleClass('is-collapsed');

                        setTimeout(function () {
                            $accordionBlock.removeAttr('style');
                        }, 500); // время в css
                    }, 33);
                });
            });
        }
    }, {
        key: 'checkScroll',
        value: function checkScroll() {
            if (window.pageYOffset >= this.$limiter.offset().top - this.$header.height()) {
                this.$fixedMenu.addClass('is-active');
            } else {
                this.$fixedMenu.removeClass('is-active');
            }

            // подсчвечиваем активный таб
            // возьмем текущий элемент на странице по центру и соберем всех его родителей
            var element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
            var path = function (r) {
                for (var n = []; r;) {
                    n.push(r), r = r.parentElement;
                }return n;
            }(element);

            this.$tabsLinksInFixedMenu.removeClass('is-active');

            var id = _.compact(_.map(path, function (o) {
                return o.getAttribute('id');
            }))[0];
            if (typeof id !== 'undefined' && id) {
                this.$tabsLinksInFixedMenu.filter('[href="#' + id + '"]').addClass('is-active');
            }
        }
    }, {
        key: 'initHash',
        value: function initHash() {
            var $targetTab = this.$tabsLinksInFixedMenu.filter('[href="' + window.location.hash + '"]');

            if ($targetTab.length > 0) {
                $targetTab.trigger('click');
            }
        }
    }, {
        key: 'initSliders',
        value: function initSliders() {
            var _this8 = this;

            _.forEach(this.$sliders, function (slider) {
                var $slider = $(slider);
                var $scroll = $slider.find('.js-approach-scroll');
                var $slides = $slider.find('.projects-catalog__item');
                var $left = $slider.find('.js-left');
                var $right = $slider.find('.js-right');
                var $pagination = $slider.find('.js-pagination');
                var currentIndex = 0;
                var canAnimate = true;

                var getSlidesOffset = function getSlidesOffset() {
                    return window.innerWidth < 1024 ? 1 : 2;
                };

                var updatePager = function updatePager() {
                    $pagination.html(currentIndex + getSlidesOffset() + ' <i>/</i> ' + $slides.length);
                };
                updatePager();

                var moveSlider = function moveSlider() {
                    var newX = $slides.eq(currentIndex).position().left;

                    anime({
                        targets: $scroll[0],
                        scrollLeft: {
                            value: newX,
                            duration: 500,
                            easing: 'easeInOutCirc'
                        },
                        complete: function complete() {
                            canAnimate = true;

                            updatePager();
                        }
                    });
                };

                $left.on('click', function (e) {
                    e.preventDefault();

                    if (canAnimate) {
                        canAnimate = false;

                        currentIndex -= getSlidesOffset();

                        if (currentIndex < 0) {
                            currentIndex = 0;
                        }

                        moveSlider();
                    }
                });

                $right.on('click', function (e) {
                    e.preventDefault();

                    if (canAnimate) {
                        canAnimate = false;

                        currentIndex += getSlidesOffset();

                        if (currentIndex > $slides.length - getSlidesOffset()) {
                            currentIndex = $slides.length - getSlidesOffset();
                        }

                        moveSlider();
                    }
                });

                _this8.$sliders.on('touchstart', function (e) {
                    _this8.startX = (e.touches || e.originalEvent.touches)[0].clientX;
                });

                _this8.$sliders.on('touchmove', function (e) {
                    if (!_this8.startX) return;

                    var xDelta = _this8.startX - (e.touches || e.originalEvent.touches)[0].clientX;

                    if (xDelta > 15) {
                        $right.trigger('click');
                        _this8.startX = null;
                    } else if (xDelta < -15) {
                        $left.trigger('click');
                        _this8.startX = null;
                    }
                });
            });
        }
    }]);

    return Approach;
}();

$(function () {
    $('.js-approach').each(function (i, item) {
        new Approach($(item));
    });
});

var BlogSlider = function () {
    function BlogSlider($el) {
        _classCallCheck(this, BlogSlider);

        // Переменные
        this.$element = $el;
        this.$slider = this.$element.find('.js-slider');
        this.$slides = this.$slider.find('.js-slide');
        this.$left = this.$element.find('.js-left');
        this.$right = this.$element.find('.js-right');
        this.$pagination = this.$element.find('.js-pagination');
        this.currentIndex = 0;
        this.canAnimate = true;

        // Функции
        this.setListeners();
        this.updatePager();
    }

    _createClass(BlogSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this9 = this;

            this.$left.on('click', function (e) {
                e.preventDefault();

                if (_this9.canAnimate) {
                    _this9.canAnimate = false;

                    _this9.currentIndex--;

                    if (_this9.currentIndex < 0) {
                        _this9.currentIndex = 0;
                    }

                    _this9.moveSlider();
                }
            });

            this.$right.on('click', function (e) {
                e.preventDefault();

                if (_this9.canAnimate) {
                    _this9.canAnimate = false;

                    _this9.currentIndex++;

                    if (_this9.currentIndex > _this9.$slides.length - 1) {
                        _this9.currentIndex = _this9.$slides.length - 1;
                    }

                    _this9.moveSlider();
                }
            });
        }
    }, {
        key: 'updatePager',
        value: function updatePager() {
            this.$pagination.html('<span>' + (this.currentIndex + 1) + '</span> <i>/</i> ' + this.$slides.length);
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            var _this10 = this;

            anime({
                targets: this.$slider[0],
                scrollLeft: {
                    value: this.$slider.width() * this.currentIndex,
                    duration: 500,
                    easing: 'easeInOutCirc'
                },
                complete: function complete() {
                    _this10.canAnimate = true;

                    _this10.updatePager();
                }
            });
        }
    }]);

    return BlogSlider;
}();

$(function () {
    $('.js-blog-slider').each(function (i, item) {
        new BlogSlider($(item));
    });
});

var Blog = function () {
    function Blog($el) {
        _classCallCheck(this, Blog);

        // Переменные
        this.$element = $el;
        this.$showMorePlaceholder = this.$element.find('.js-show-more-placeholder');
        this.$showMore = this.$element.find('.js-show-more');
        this.$gotoEvents = this.$element.find('.js-go-to-events');

        // Функции
        this.setListeners();
        this.initType();
    }

    _createClass(Blog, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this11 = this;

            // навешиваем на ссылку "показать еще" по клику создание секции с карточками
            this.$showMore.on('click', function (e) {
                e.preventDefault();

                var data = {
                    page: _this11.$showMore.attr('data-next-page')
                };

                $.ajax({
                    method: 'get',
                    dataType: 'json',
                    url: _this11.$showMore.attr('data-ajax'),
                    data: data,
                    processData: false,
                    contentType: false,
                    success: function success(response) {
                        if (response.success) {
                            _this11.$showMorePlaceholder.append($(response.data.html));

                            _this11.$showMore.attr('data-next-page', parseInt(_this11.$showMore.attr('data-next-page')) + 1);
                        } else {
                            console.error(response.error); // обработка исключения
                        }
                    }
                });
            });

            //плавный скрол к разделу мероприятия
            this.$gotoEvents.on('click', function (e) {
                e.preventDefault();

                var $target = $(_this11.$gotoEvents.attr('href'));
                console.log($target.offset().top);
                if ($target.length > 0) {
                    anime({
                        targets: ['html', 'body'],
                        scrollTop: {
                            value: $target.offset().top - 120,
                            duration: 1500,
                            easing: 'easeOutExpo'
                        }
                    });
                }
            });
        }
    }, {
        key: 'initType',
        value: function initType() {
            var getQueryParams = function getQueryParams(qs) {
                qs = qs.split("+").join(" ");
                var params = {},
                    tokens,
                    re = /[?&]?([^=]+)=([^&]*)/g;
                while (tokens = re.exec(qs)) {
                    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
                }return params;
            };

            var params = getQueryParams(document.location.search);
            if (params.type) {
                anime({
                    targets: ['html', 'body'],
                    scrollTop: {
                        value: $('.js-blog-nav').offset().top - 120,
                        duration: 1500,
                        easing: 'easeOutExpo'
                    }
                });
            }
        }
    }]);

    return Blog;
}();

$(function () {
    $('.js-blog').each(function (i, item) {
        new Blog($(item));
    });
});

var BlogItem = function () {
    function BlogItem($el) {
        _classCallCheck(this, BlogItem);

        this.$element = $el;
        this.$slider = this.$element.find('.js-main-slider');
        this.$slides = this.$slider.find('.js-main-slide');
        this.$prevBtn = this.$element.find('.js-prev-btn');
        this.$nextBtn = this.$element.find('.js-next-btn');
        this.$currentCount = this.$element.find('.js-current-count');
        this.$totalCount = this.$element.find('.js-total-count');
        this.$slideText = this.$element.find('.js-slide-text');
        this.slideCount = 0;
        this.touchStartX = 0;

        this.$form = this.$element.find('.js-validate');
        this.$inputFileCont = this.$element.find('.js-input-file');

        this.$popup = this.$element.find('.js-popup');
        this.$popupClose = this.$element.find('.js-popup-close');

        this.setListener();
        this.setSlider();
    }

    _createClass(BlogItem, [{
        key: 'setListener',
        value: function setListener() {
            var _this12 = this;

            this.$prevBtn.on('click', function (e) {
                e.preventDefault();

                _this12.showPrevSlide();
                _this12.moveSlider();
            });

            this.$nextBtn.on('click', function (e) {
                e.preventDefault();

                _this12.showNextSlide();
                _this12.moveSlider();
            });

            this.$slider.on('touchstart', function (e) {
                _this12.touchStartX = e.changedTouches[0].screenX;

                var onSliderTouchend = function onSliderTouchend(e) {
                    var touchEndX = e.changedTouches[0].screenX;

                    if (touchEndX > _this12.touchStartX) {
                        _this12.showPrevSlide();
                    } else if (touchEndX < _this12.touchStartX) {
                        _this12.showNextSlide();
                    }

                    _this12.$slider.off('touchend', function (e) {
                        return onSliderTouchend(e);
                    });
                };

                _this12.$slider.on('touchend', function (e) {
                    return onSliderTouchend(e);
                });
            });

            // успешный ответ от сервера
            setTimeout(function () {
                _this12.$form.data('formValidate').setCallback(function (response) {
                    $('html, body').addClass('is-mobile-overflow');
                    _this12.$popup.removeClass('h-hide');
                });
            }, 1000);

            // Закрытие попапа
            this.$popupClose.on('click', function (e) {
                e.preventDefault();

                _this12.$popup.addClass('h-hide');
                $('html, body').removeClass('is-mobile-overflow');

                _this12.$form[0].reset(); // очищение формы
                _this12.$form.find('input').removeClass('is-error is-valid'); // очищение формы
            });
        }
    }, {
        key: 'setSlider',
        value: function setSlider() {
            this.$currentCount.html('1');
            this.$totalCount.html(this.$slides.length);
            this.$slideText.html(this.$slides.eq(0).children().attr('alt'));
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            this.$slides.css({ 'transform': 'translate3d(-' + this.slideCount * 100 + '%, 0, 0)' });
            this.$currentCount.html(this.slideCount + 1);
            this.$slideText.html(this.$slides.eq(this.slideCount).children().attr('alt'));
        }
    }, {
        key: 'showPrevSlide',
        value: function showPrevSlide() {
            this.slideCount = !this.slideCount ? 0 : this.slideCount - 1;
            this.moveSlider();
        }
    }, {
        key: 'showNextSlide',
        value: function showNextSlide() {
            this.slideCount = this.slideCount === this.$slides.length - 1 ? this.$slides.length - 1 : this.slideCount + 1;
            this.moveSlider();
        }
    }]);

    return BlogItem;
}();

$(function () {
    $('.js-blog-item').each(function (i, item) {
        new BlogItem($(item));
    });
});

var BlogComponentSlider = function () {
    function BlogComponentSlider($el) {
        _classCallCheck(this, BlogComponentSlider);

        // Переменные
        this.$element = $el;
        this.$slider = this.$element.find('.js-slider');
        this.$slides = this.$slider.find('.js-slide');
        this.$left = this.$element.find('.js-left');
        this.$right = this.$element.find('.js-right');
        this.$pagination = this.$element.find('.js-pagination');
        this.currentIndex = 0;
        this.canAnimate = true;
        this.startX = null;

        // Функции
        this.setListeners();
        this.updatePager();
    }

    _createClass(BlogComponentSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this13 = this;

            this.$left.on('click', function (e) {
                e.preventDefault();

                if (_this13.canAnimate) {
                    _this13.canAnimate = false;

                    _this13.currentIndex--;

                    if (_this13.currentIndex < 0) {
                        _this13.currentIndex = 0;
                    }

                    _this13.moveSlider();
                }
            });

            this.$right.on('click', function (e) {
                e.preventDefault();

                if (_this13.canAnimate) {
                    _this13.canAnimate = false;

                    _this13.currentIndex++;

                    if (_this13.currentIndex > _this13.$slides.length - 1) {
                        _this13.currentIndex = _this13.$slides.length - 1;
                    }

                    _this13.moveSlider();
                }
            });

            // swipe detected
            this.$slider.on('touchstart', function (e) {
                _this13.startX = (e.touches || e.originalEvent.touches)[0].clientX;
            });

            this.$slider.on('touchmove', function (e) {
                if (!_this13.startX) return;

                var xDelta = _this13.startX - (e.touches || e.originalEvent.touches)[0].clientX;

                if (xDelta > 15) {
                    _this13.$right.trigger('click');
                    _this13.startX = null;
                } else if (xDelta < -15) {
                    _this13.$left.trigger('click');
                    _this13.startX = null;
                }
            });

            $(window).on('resize', function (e) {
                _this13.$slider.scrollLeft(_this13.$slider.width() * _this13.currentIndex);
            });
        }
    }, {
        key: 'updatePager',
        value: function updatePager() {
            this.$pagination.html('<span>' + (this.currentIndex + 1) + '</span> <i>/</i> ' + this.$slides.length);
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            var _this14 = this;

            anime({
                targets: this.$slider[0],
                scrollLeft: {
                    value: this.$slider.width() * this.currentIndex,
                    duration: 500,
                    easing: 'easeInOutCirc'
                },
                complete: function complete() {
                    _this14.canAnimate = true;

                    _this14.updatePager();
                }
            });
        }
    }]);

    return BlogComponentSlider;
}();

$(function () {
    $('.js-blog-component').each(function (i, item) {
        new BlogComponentSlider($(item));
    });
});

var CareersFilter = function () {
    function CareersFilter($el) {
        _classCallCheck(this, CareersFilter);

        // Переменные
        this.$element = $el;
        this.$tabs = this.$element.find('.js-tab');
        this.$items = this.$element.find('.js-item');

        // Функции
        this.setListeners();
    }

    _createClass(CareersFilter, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this15 = this;

            _.each(this.$tabs, function (tab) {
                $(tab).on('click', function (e) {
                    e.preventDefault();

                    // задаем активый класс на кликнутом табе
                    _this15.$tabs.removeClass('is-active');
                    $(tab).addClass('is-active');

                    // фильтруем
                    var currentCategory = $(tab).attr('data-category');

                    _this15.$items.removeClass('no-active');

                    if (currentCategory !== 'all') {
                        _this15.$items.filter(':not([data-category="' + currentCategory + '"])').addClass('no-active');
                    }
                });
            });
        }
    }]);

    return CareersFilter;
}();

$(function () {
    $('.js-careers-filters').each(function (i, item) {
        new CareersFilter($(item));
    });
});

var FixedMenu = function () {
    function FixedMenu($el) {
        _classCallCheck(this, FixedMenu);

        // Переменные
        this.$element = $el;

        this.$tabsLinks = $('.js-go-to-section');
        this.$fixedMenu = $('.js-careers-fixed-menu');
        this.$tabsLinksInFixedMenu = this.$fixedMenu.find('.js-go-to-section');
        this.$header = $('.js-header');
        this.$limiter = $('.js-show-fixed-menu');

        // статичные перменные
        this.$tabsLinksInFixedMenuIdArray = _.map(this.$tabsLinksInFixedMenu, function (o) {
            return o.getAttribute('href');
        });

        // Функции
        this.setListeners();
        this.checkScroll();
        this.initHash();
    }

    _createClass(FixedMenu, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this16 = this;

            $(window).on('scroll', _.throttle(function (e) {
                _this16.checkScroll();
            }, 250));

            _.forEach(this.$tabsLinks, function (item) {
                $(item).on('click', function (e) {
                    e.preventDefault();

                    var $target = $($(item).attr('href'));

                    if ($target.length > 0) {
                        var newY = $target.offset().top - _this16.$header.height() - 100;

                        anime({
                            targets: ['html', 'body'],
                            scrollTop: {
                                value: newY,
                                duration: 1500,
                                easing: 'easeOutExpo'
                            }
                        });
                    }
                });
            });
        }
    }, {
        key: 'checkScroll',
        value: function checkScroll() {
            if (window.pageYOffset >= this.$limiter.offset().top - 160 - this.$header.height()) {
                this.$fixedMenu.addClass('is-active');
            } else {
                this.$fixedMenu.removeClass('is-active');
            }

            // подсчвечиваем активный таб
            // возьмем текущий элемент на странице по центру и соберем всех его родителей
            var element = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
            var path = function (r) {
                for (var n = []; r;) {
                    n.push(r), r = r.parentElement;
                }return n;
            }(element);

            this.$tabsLinksInFixedMenu.removeClass('is-active');

            var id = _.compact(_.map(path, function (o) {
                return o.getAttribute('id');
            }))[0];
            if (typeof id !== 'undefined' && id) {
                this.$tabsLinksInFixedMenu.filter('[href="#' + id + '"]').addClass('is-active');
            }
        }
    }, {
        key: 'initHash',
        value: function initHash() {
            var $targetTab = this.$tabsLinksInFixedMenu.filter('[href="' + window.location.hash + '"]');
            if ($targetTab.length > 0) {
                $targetTab.trigger('click');
            }
        }
    }]);

    return FixedMenu;
}();

$(function () {
    $('.js-careers').each(function (i, item) {
        new FixedMenu($(item));
    });
});

var CareersSlider = function () {
    function CareersSlider($el) {
        _classCallCheck(this, CareersSlider);

        // Переменные
        this.$slider = $el;
        this.$scroll = this.$slider.find('.js-careers-scroll');
        this.$scrollQuotes = this.$slider.find('.js-careers-scroll-quotes');
        this.$slides = this.$slider.find('.js-slide');
        this.$quoteSlides = this.$slider.find('.js-quote-slide');
        this.$left = this.$slider.find('.js-left');
        this.$right = this.$slider.find('.js-right');
        this.$pagination = this.$slider.find('.js-pagination');
        this.currentIndex = 0;
        this.canAnimate = true;
        this.startX = null;

        // Функции
        this.setListeners();
        this.updatePager();

        // активный слайд
        this.$quoteSlides.eq(this.currentIndex).addClass('is-active');
    }

    _createClass(CareersSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this17 = this;

            this.$left.on('click', function (e) {
                e.preventDefault();

                if (_this17.canAnimate) {
                    _this17.canAnimate = false;

                    _this17.currentIndex--;

                    if (_this17.currentIndex < 0) {
                        _this17.currentIndex = 0;
                    }

                    _this17.moveSlider();
                }
            });

            this.$right.on('click', function (e) {
                e.preventDefault();

                if (_this17.canAnimate) {
                    _this17.canAnimate = false;

                    _this17.currentIndex++;

                    if (_this17.currentIndex > _this17.$slides.length - 1) {
                        _this17.currentIndex = _this17.$slides.length - 1;
                    }

                    _this17.moveSlider();
                }
            });

            // swipe detected
            this.$scroll.on('touchstart', function (e) {
                _this17.startX = (e.touches || e.originalEvent.touches)[0].clientX;
            });

            this.$scroll.on('touchmove', function (e) {
                if (!_this17.startX) return;

                var xDelta = _this17.startX - (e.touches || e.originalEvent.touches)[0].clientX;

                if (xDelta > 15) {
                    _this17.$right.trigger('click');
                    _this17.startX = null;
                } else if (xDelta < -15) {
                    _this17.$left.trigger('click');
                    _this17.startX = null;
                }
            });

            $(window).on('resize', function (e) {
                _this17.$scroll.scrollLeft(_this17.$slides.eq(_this17.currentIndex).position().left);
            });
        }
    }, {
        key: 'updatePager',
        value: function updatePager() {
            this.$pagination.html('<span>' + (this.currentIndex + 1) + '</span>' + ' <i>/</i> ' + this.$slides.length);
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            var _this18 = this;

            var newX = this.$slides.eq(this.currentIndex).position().left;

            this.$quoteSlides.removeClass('is-active');
            this.$quoteSlides.eq(this.currentIndex).addClass('is-active');

            anime({
                targets: window.innerWidth < 768 ? [this.$scroll[0], this.$scrollQuotes[0]] : this.$scroll[0],
                scrollLeft: {
                    value: newX,
                    duration: 500,
                    easing: 'easeInOutCirc'
                },
                complete: function complete() {
                    _this18.canAnimate = true;

                    _this18.updatePager();
                }
            });
        }
    }]);

    return CareersSlider;
}();

$(function () {
    $('.js-careers-slider').each(function (i, item) {
        new CareersSlider($(item));
    });
});

$(function () {
    var $map = $('.js-contacts-map');

    if ($map.length > 0 && typeof ymaps !== 'undefined') {
        var center = $map.attr('data-center').split(',');

        ymaps.ready(function () {
            var map = new ymaps.Map($map[0], {
                center: center,
                zoom: window.innerWidth < 768 ? 16 : 14
            }, {
                //searchControlProvider: 'yandex#search'
            });
            map.behaviors.disable('scrollZoom');

            var marker = new ymaps.Placemark(center, {
                // hintContent: 'AGIMA',
                // balloonContent: '<b>AGIMA</b><br/>107031, г. Москва, ул. Петровка, д. 19, стр. 4',
            }, {
                iconLayout: 'default#image',
                iconImageHref: $map.attr('data-marker-path'),
                iconImageSize: [89, 58],
                iconImageOffset: [-6, -50]
            });
            map.geoObjects.add(marker);
        });
    }
});

(function () {
    // аттрибуты к тегам, взяты с https://jqueryvalidation.org/documentation/
    // required – Makes the element required.
    // remote – Requests a resource to check the element for validity.
    // minlength – Makes the element require a given minimum length.
    // maxlength – Makes the element require a given maximum length.
    // rangelength – Makes the element require a given value range.
    // min – Makes the element require a given minimum.
    // max – Makes the element require a given maximum.
    // range – Makes the element require a given value range.
    // step – Makes the element require a given step.
    // email – Makes the element require a valid email
    // url – Makes the element require a valid url
    // date – Makes the element require a date.
    // dateISO – Makes the element require an ISO date.
    // number – Makes the element require a decimal number.
    // digits – Makes the element require digits only.
    // equalTo – Requires the element to be the same as another one
    // описание работы атррибутов https://jqueryvalidation.org/category/methods/

    // полезные методы
    // Validator.form() – Validates the form.
    // Validator.element() – Validates a single element.
    // Validator.resetForm() – Resets the controlled form.
    // Validator.showErrors() – Show the specified messages.
    // Validator.numberOfInvalids() – Returns the number of invalid fields.

    // глобальные команды
    // jQuery.validator.addMethod() – Add a custom validation method.
    // jQuery.validator.format() – Replaces {n} placeholders with arguments.
    // jQuery.validator.setDefaults() – Modify default settings for validation.
    // jQuery.validator.addClassRules() – Add a compound class method.

    $.extend($.validator.messages, {
        required: "Поле не заполнено",
        remote: "пожалуйста, введите правильное значение",
        email: "Email адрес не указан, или указан в некорректном формате",
        url: "пожалуйста, введите корректный URL",
        date: "Указана некорректная дата",
        dateISO: "пожалуйста, введите корректную дату в формате ISO",
        number: "пожалуйста, введите число",
        digits: "пожалуйста, вводите только цифры",
        creditcard: "пожалуйста, введите правильный номер кредитной карты",
        equalTo: "пожалуйста, введите такое же значение ещё раз",
        extension: "пожалуйста, выберите файл с правильным расширением",
        maxlength: $.validator.format("пожалуйста, введите не больше {0} символов"),
        minlength: $.validator.format("не менее {0} символов"),
        rangelength: $.validator.format("пожалуйста, введите значение длиной от {0} до {1} символов"),
        range: $.validator.format("пожалуйста, введите число от {0} до {1}"),
        max: $.validator.format("пожалуйста, введите число, меньшее или равное {0}"),
        min: $.validator.format("пожалуйста, введите число, большее или равное {0}")
    });

    $.validator.addMethod('realemail', function (value, element) {
        if (value.length === 0) return true;
        return (/^[А-ЯA-Z0-9._%+-]+@[А-ЯA-Z0-9.-]+\.[А-ЯA-Z]{2,20}$/i.test(value)
        );
    }, 'Укажите корректный адрес электронной почты');

    $.validator.addMethod('realphone', function (value, element) {
        return (/^(\s*)?(\+)?([- ():=+]?\d[- ():=+]?){7,14}(\s*)?$/.test(value)
        );
    }, 'Введите существующий номер телефона');

    $.validator.addMethod('cyrillic',
    // (value, element) => {
    //     if (value.match(/[а-яА-ЯЁё]/ig) && value.length <= 30 && value[0].match(/[А-Я]/)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // },
    // 'Вы можете использовать только кириллические cимволы \n' +
    // '(А-Я) и -. Первый символ должен быть заглавной буквой. \n' +
    // 'Длина не должна превышать 30 символов.'

    function (value, element) {
        return (/[а-яА-ЯЁё]/ig.test(value)
        );
    }, 'Вы можете использовать только кириллические cимволы (А-Я)');

    $.validator.addMethod('password', function (value, element) {
        if (value.length < 8 || value.length > 15 && !value.match(/\d{4}[\dA-Z][\dA-Z]\d{3}/)) {
            return false;
        } else {
            return true;
        }
    }, 'Пароль должен содержать от 8 до 15 цифр и букв латинского алфавита');

    var DATA_KEY = 'formValidate';

    var defaults = {
        errorClass: 'is-error',
        validClass: 'is-valid',
        errorElement: 'div',
        errorTextElement: 'span',
        submitSelector: '.js-submit',
        submitSelectors: '.js-submit, .js-fake-submit',
        ignoreSelector: '.is-validate-ignore',
        parentForErrorSelector: '.js-parent-input-error',
        errorSelector: '.error-message',
        dataToSend: {},
        onCallback: null // функция
    };

    var FormValidate = function () {
        function FormValidate(element, options) {
            _classCallCheck(this, FormValidate);

            var self = this;

            // опции
            self.$form = $(element);
            self.defaults = defaults;
            self.options = $.extend({}, self.defaults, $(element).data(), options);

            // создаем переменные

            // функции инициализации
            self.$form.validate({
                ignore: self.options.ignoreSelector,
                errorClass: self.options.errorClass,
                validClass: self.options.validClass,
                errorElement: self.options.errorElement,
                errorPlacement: function errorPlacement($error, element) {
                    self.errorPlacement($error, element);
                },
                success: function success($element_with_error_message, element) {
                    $element_with_error_message.addClass('is-valid');
                },
                submitHandler: function submitHandler(form, event) {
                    if (self.$form.hasClass('js-no-ajax')) {
                        form.submit();
                    } else {
                        self.submitHandler();
                    }
                }
            });
            self.setListeners();
        }

        // вешаем события


        _createClass(FormValidate, [{
            key: 'setListeners',
            value: function setListeners() {
                var self = this;
                var selfOptions = self.options;

                // событие на кнопках отправки формы
                self.$form.on('click', selfOptions.submitSelector, function (e) {
                    e.preventDefault();

                    self.$form.submit();
                });
            }

            // установка callback-функции

        }, {
            key: 'setCallback',
            value: function setCallback(callback) {
                this.options.onCallback = callback;
            }

            // установка

        }, {
            key: 'setDataToSend',
            value: function setDataToSend(obj) {
                this.options.dataToSend = obj || {};
            }

            // отправка запроса на сервер

        }, {
            key: 'submitHandler',
            value: function submitHandler() {
                var self = this;
                var selfOptions = self.options;

                if (self.$form.valid()) {
                    var data = new FormData(self.$form[0]);

                    // допишем к отправляемым данным нужные параменты
                    $.each(selfOptions.dataToSend, function (key, value) {
                        data.append(key, value); // перезатираем значение если было
                    });

                    // if (data.entries) {
                    //     for (var pair of data.entries()) {
                    //         console.log(pair[0] + ', ' + pair[1]);
                    //     }
                    // }

                    // отправляем ajax
                    $.ajax({
                        method: self.$form.attr('method') || 'post',
                        dataType: 'json',
                        url: self.$form.attr('action'),
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function success(response) {
                            if (response.success) {
                                // обрабатываем ошибки
                                if (response.data && response.data.formErrors) {
                                    self.parseErrors(response.data.formErrors);
                                } else {
                                    // вызываем callback-функцию
                                    if (selfOptions.onCallback != null && typeof selfOptions.onCallback == 'function') {
                                        selfOptions.onCallback(response);
                                    } else if (response.data.redirectUrl) {
                                        // иначе редиректим
                                        window.location.href = response.data.redirectUrl;
                                    } else {
                                        // иначе обновляем страницу
                                        window.location.reload();
                                    }
                                }
                            } else {
                                console.error(response.error); // обработка исключения
                            }
                        },
                        error: function error(jqXHR, textStatus, errorThrown) {
                            // console.error('Error 500: ' + errorThrown);
                        }
                    });
                }
            }

            // подставновка ошибок на форму

        }, {
            key: 'errorPlacement',
            value: function errorPlacement($error, element) {
                var self = this;
                var selfOptions = self.options;

                // положим сообщение об ошибке в нужное место
                var $parent = $(element).parents(selfOptions.parentForErrorSelector);
                if ($parent.length > 0) {
                    var $err = $parent.find(selfOptions.errorSelector);
                    if ($err.length > 0) {
                        $err.empty().append($error);
                    }
                }
            }

            // парсим ошибки от сервера

        }, {
            key: 'parseErrors',
            value: function parseErrors(errors) {
                var self = this;
                var selfOptions = self.options;

                $.each(errors, function (key, value) {
                    var $input = self.$form.find('[name=' + key + ']');

                    if ($input.length > 0) {
                        $input.addClass(selfOptions.errorClass).removeClass(selfOptions.validClass);

                        var $error = $('<' + selfOptions.errorTextElement + '>');
                        $error.addClass(selfOptions.errorClass);
                        $error.html(value);

                        self.errorPlacement($error, $input[0]);
                    }
                });
            }
        }], [{
            key: '_interface',
            value: function _interface(options) {
                return this.each(function (i, item) {
                    var data = $(item).data(DATA_KEY);

                    var _options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : {};
                    var _method = typeof options === 'string' ? options : null;

                    if (!data) {
                        data = new FormValidate(item, _options);
                        $(item).data(DATA_KEY, data);
                    }

                    if (_method) {
                        if (typeof data[_method] === 'undefined') {
                            throw new Error('No method named ' + _method);
                        } else if (typeof data[_method] === 'function') {
                            data[_method]();
                        }
                    }
                });
            }
        }]);

        return FormValidate;
    }();

    $.fn[DATA_KEY] = FormValidate._interface; // инициализация

    $(function () {
        $('.js-validate').each(function (i, item) {
            $(item).formValidate();
        });
    });
})();

var Footer = function () {
    function Footer($el) {
        _classCallCheck(this, Footer);

        // Переменные
        this.$element = $el;
        this.$mobileToDesktop = this.$element.find('.js-mobile-to-desktop');

        this.cookieName = 'agima_mobile_to_desktop';

        // Функции
        $.cookie(this.cookieName) && this.toggleMode(); // если куки были установлены, то сразу включаем десктопную версию

        this.setListeners();
    }

    _createClass(Footer, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this19 = this;

            this.$mobileToDesktop.on('click', function (e) {
                e.preventDefault();

                $('html, body').scrollTop(0);

                _this19.toggleMode();
            });
        }
    }, {
        key: 'toggleMode',
        value: function toggleMode() {
            // меняем текст между атрибутом и html
            var temp = this.$mobileToDesktop.attr('data-invert-text');
            this.$mobileToDesktop.attr('data-invert-text', this.$mobileToDesktop.html());
            this.$mobileToDesktop.html(temp);

            $('body').toggleClass('is-fake-desktop');

            if ($('body').hasClass('is-fake-desktop')) {
                $.cookie(this.cookieName, true, { expires: 7 });
            } else {
                $.removeCookie(this.cookieName);
            }
        }
    }]);

    return Footer;
}();

$(function () {
    $('.js-footer').each(function (i, item) {
        new Footer($(item));
    });
});

$(function () {
    var cookie_grid_name = 'agima_grid_cookie';

    $('body').on('keydown', function (e) {
        // "ctrl + ;"
        if (e.ctrlKey && e.keyCode === 186) {
            $('body').toggleClass('is-grid');

            if ($('body').hasClass('is-grid')) {
                $.cookie(cookie_grid_name, true, { expires: 7 });
            } else {
                $.removeCookie(cookie_grid_name);
            }
        }
    });

    if ($.cookie(cookie_grid_name)) {
        $('body').addClass('is-grid');
    }
});

var FirstScreen = function () {
    function FirstScreen($el) {
        _classCallCheck(this, FirstScreen);

        // Переменные
        this.$element = $el;
        this.$toNextScreen = this.$element.find('.js-to-next-screen');
        this.$header = $('.js-header');

        this.$header.addClass('is-transparent');
        this.$element.addClass('is-ready');

        // Функции
        this.setListeners();
    }

    _createClass(FirstScreen, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this20 = this;

            $(window).on('scroll', _.throttle(function (e) {
                var offset = window.innerWidth < 768 ? 30 : window.innerHeight / 4;

                if (window.pageYOffset >= offset) {
                    _this20.$header.removeClass('is-transparent');
                } else {
                    _this20.$header.addClass('is-transparent');
                }
            }, 250));
            $(window).trigger('scroll');

            this.$toNextScreen.on('click', function (e) {
                e.preventDefault();

                anime({
                    targets: ['html', 'body'],
                    scrollTop: {
                        value: window.innerHeight,
                        duration: 1500,
                        easing: 'easeOutExpo'
                    }
                });
            });
        }
    }]);

    return FirstScreen;
}();

$(function () {
    $('.js-first-screen').each(function (i, item) {
        new FirstScreen($(item));
    });
});

var Header = function () {
    function Header($el) {
        _classCallCheck(this, Header);

        // Переменные
        this.$element = $el;
        this.$burger = this.$element.find('.js-burger');
        this.$fullscreenMenu = $('.js-fullscreen-menu');
        this.$fullscreenMenuDivs = $('.fullscreen-menu__menu');

        // Функции
        this.setListeners();
    }

    _createClass(Header, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this21 = this;

            this.$burger.on('click', function (e) {
                e.preventDefault();

                _this21.$burger.toggleClass('is-active');
                $('body').toggleClass('is-fullscreen-menu');
                _this21.toggleClassIsTable();
            });

            $(window).on('resize', function () {
                //если меню было открыто перепроверяем соотношения сторон
                if (_this21.$burger.hasClass('is-active')) {
                    _this21.$burger.removeClass('is-active');
                    _this21.$fullscreenMenuDivs.removeClass('is-table');
                    setTimeout(function () {
                        _this21.$burger.addClass('is-active');
                        _this21.toggleClassIsTable();
                    }, 100);
                }
            });
        }
    }, {
        key: 'toggleClassIsTable',
        value: function toggleClassIsTable() {
            if (window.innerWidth <= 1023 && window.innerWidth > window.innerHeight) {
                this.$fullscreenMenuDivs.toggleClass('is-table');
            }
        }
    }]);

    return Header;
}();

$(function () {
    $('.js-header').each(function (i, item) {
        new Header($(item));
    });
});

var InputText = function () {
    function InputText($el) {
        _classCallCheck(this, InputText);

        // Переменные
        this.$element = $el;

        //создаём переменные
        this.$input = this.$element.find('.js-input');
        this.$inputPass = this.$element.find('.js-pass-input');
        this.$btnEye = this.$element.find('.js-btn-eye');
        this.$codeAgain = this.$element.find('.js-code-again');

        // Автоматическое растягивание textarea
        autosize($('.js-autosize'));

        // функции инициализации
        if (this.$input.hasClass('js-autocomplete')) {
            this.setCityInput();
        }
        this.setListeners();
        this.inputEmpty();
        // this.codeAgain();
        // this.inputDots();
    }

    _createClass(InputText, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this22 = this;

            this.$input.on('blur', function (e) {
                _this22.inputEmpty();
            });

            this.$btnEye.on('click', function (e) {
                var $inputPass = $(e.currentTarget).siblings('.js-pass-input');

                if ($inputPass.attr('type') === 'password') {
                    $inputPass.attr('type', 'text');
                    $inputPass.addClass('is-open');
                } else {
                    $inputPass.attr('type', 'password');
                    $inputPass.removeClass('is-open');
                }

                $inputPass.focus();
            });

            // this.$btnEye.on('mouseup touchend', (e) => {
            //     $(e.currentTarget).siblings('.js-pass-input').focus();
            // });
        }
    }, {
        key: 'inputEmpty',
        value: function inputEmpty() {
            if (this.$input.val() || this.$input.attr('placeholder')) {
                this.$input.addClass('is-filled');
            } else {
                this.$input.removeClass('is-filled');
            }
        }

        // codeAgain() {
        //     if (this.$codeAgain.length) {
        //         let dataAgain = this.$codeAgain.attr('data-again');

        //         setTimeout(function () {
        //             this.$codeAgain.text(dataAgain)
        //         }, 15000);
        //     }
        // }

    }]);

    return InputText;
}();

$(function () {
    $('.js-input-text').each(function (i, item) {
        new InputText($(item));
    });
});

var NewCustomers = function () {
    function NewCustomers($el) {
        _classCallCheck(this, NewCustomers);

        // Переменные
        this.$element = $el;

        //создаём переменные
        this.$form = this.$element.find('.js-validate');
        this.$inputFileCont = this.$element.find('.js-input-file');

        this.$popup = this.$element.find('.js-popup');
        this.$popupClose = this.$element.find('.js-popup-close');

        // функции инициализации
        this.setListeners();
    }

    _createClass(NewCustomers, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this23 = this;

            // успешный ответ от сервера
            this.$form.data('formValidate').setCallback(function (response) {
                $('html, body').addClass('is-mobile-overflow');
                _this23.$popup.removeClass('h-hide');
            });

            // Закрытие попапа
            this.$popupClose.on('click', function (e) {
                e.preventDefault();

                _this23.$popup.addClass('h-hide');
                $('html, body').removeClass('is-mobile-overflow');

                _this23.$form[0].reset(); // очищение формы
                _this23.$form.find('input, textarea').removeClass('is-error is-valid'); // очищение формы

                // почистим файлы
                _.each(_this23.$inputFileCont, function (cont) {
                    $(cont).find('input[type=file]').val('');
                    $(cont).find('input[type=hidden]').val('');
                    $(cont).find('.js-files-preview').empty();
                });
            });

            // визуальное отображение выбранных файлов
            _.each(this.$inputFileCont, function (cont) {
                var $input = $(cont).find('input[type=file]');
                var $hiddenInput = $(cont).find('input[type=hidden]');
                var $filesNames = $(cont).find('.js-files-preview');
                var files = [];

                // удаление файла из списка
                $filesNames.on('click', '.js-file-del', function (e) {
                    e.preventDefault();

                    var $parent = $(e.currentTarget).parent();
                    files.splice($parent.index(), 1);
                    $hiddenInput.val(files.join(','));
                    $parent.remove();
                });

                $input.on('change', function (e) {
                    files = _.map($input[0].files, function (o) {
                        return o.name;
                    });
                    $hiddenInput.val(files.join(','));

                    _.each(files, function (item) {
                        var $li = $('<li class="new-customers__content-file-item"><a class="js-file-del" href="#"></a>' + item + '</li>');
                        $filesNames.append($li);
                    });
                });
            });
        }
    }]);

    return NewCustomers;
}();

$(function () {
    $('.js-new-customers').each(function (i, item) {
        new NewCustomers($(item));
    });
});

var IsReady = function () {
    function IsReady($elements) {
        _classCallCheck(this, IsReady);

        // Переменные
        this.$elements = $elements;
        this.$header = $('.js-header');

        // Функции
        this.setListeners();

        // init
        setTimeout(function () {
            $(window).trigger('scroll');
        }, 250);
    }

    _createClass(IsReady, [{
        key: 'setListeners',
        value: function setListeners() {
            _.forEach(this.$elements, function (element) {
                var $element = $(element);

                var delay = $element.attr('data-is-ready-delay');
                delay = delay ? parseFloat(delay) : 0;

                $(window).on('scroll', _.throttle(function (e) {
                    if (!$element.hasClass('is-ready') && $element.offset().top <= window.pageYOffset + window.innerHeight) {
                        setTimeout(function () {
                            $element.addClass('is-ready');
                            $element.trigger('is-ready');
                        }, delay);
                    }
                }, 750));
            });
        }
    }]);

    return IsReady;
}();

$(function () {
    new IsReady($('.js-is-ready'));
});

var ProjectsFixedMenu = function () {
    function ProjectsFixedMenu($el) {
        _classCallCheck(this, ProjectsFixedMenu);

        // Переменные
        this.$element = $el;
        this.$header = $('.js-header');
        this.$limiter = $('.js-show-fixed-menu');

        // Функции
        this.setListeners();
        this.checkScroll();
    }

    _createClass(ProjectsFixedMenu, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this24 = this;

            $(window).on('scroll', _.throttle(function (e) {
                _this24.checkScroll();
            }, 250));
        }
    }, {
        key: 'checkScroll',
        value: function checkScroll() {
            if (window.pageYOffset >= this.$limiter.offset().top - this.$header.height()) {
                this.$element.addClass('is-active');
            } else {
                this.$element.removeClass('is-active');
            }
        }
    }]);

    return ProjectsFixedMenu;
}();

$(function () {
    $('.js-projects-fixed-menu').each(function (i, item) {
        new ProjectsFixedMenu($(item));
    });
});

var ToTop = function () {
    function ToTop($el) {
        _classCallCheck(this, ToTop);

        // Переменные
        this.$element = $el;
        this.$footer = $('.js-footer');

        // Функции
        this.setListeners();
        this.checkScroll();
    }

    _createClass(ToTop, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this25 = this;

            $(window).on('scroll', _.throttle(function (e) {
                _this25.checkScroll();
            }, 250));

            this.$element.on('click', function (e) {
                anime({
                    targets: ['html', 'body'],
                    scrollTop: {
                        value: 0,
                        duration: 1500,
                        easing: 'easeOutExpo'
                    }
                });
            });
        }
    }, {
        key: 'checkScroll',
        value: function checkScroll() {
            if (window.pageYOffset <= window.innerHeight || window.pageYOffset + window.innerHeight > this.$footer.offset().top - 150) {
                this.$element.removeClass('is-active');
            } else {
                this.$element.addClass('is-active');
            }
        }
    }]);

    return ToTop;
}();

$(function () {
    $('.js-to-top').each(function (i, item) {
        new ToTop($(item));
    });
});

var PromoProjectsSlider = function () {
    function PromoProjectsSlider($el) {
        _classCallCheck(this, PromoProjectsSlider);

        // Переменные
        this.$element = $el;
        this.$slider = this.$element.find('.js-slider');
        this.$slides = this.$slider.find('.js-slide');
        this.$left = this.$element.find('.js-left');
        this.$right = this.$element.find('.js-right');
        this.$pagination = this.$element.find('.js-pagination');
        this.currentIndex = 0;
        this.canAnimate = true;
        this.startX = null;

        // Функции
        this.setListeners();
        this.updatePager();
    }

    _createClass(PromoProjectsSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this26 = this;

            this.$left.on('click', function (e) {
                e.preventDefault();

                if (_this26.canAnimate) {
                    _this26.canAnimate = false;

                    _this26.currentIndex--;

                    if (_this26.currentIndex < 0) {
                        _this26.currentIndex = 0;
                    }

                    _this26.moveSlider();
                }
            });

            this.$right.on('click', function (e) {
                e.preventDefault();

                if (_this26.canAnimate) {
                    _this26.canAnimate = false;

                    _this26.currentIndex++;

                    if (_this26.currentIndex > _this26.$slides.length - 1) {
                        _this26.currentIndex = _this26.$slides.length - 1;
                    }

                    _this26.moveSlider();
                }
            });

            // swipe detected
            this.$slider.on('touchstart', function (e) {
                _this26.startX = (e.touches || e.originalEvent.touches)[0].clientX;
            });

            this.$slider.on('touchmove', function (e) {
                if (!_this26.startX) return;

                var xDelta = _this26.startX - (e.touches || e.originalEvent.touches)[0].clientX;

                if (xDelta > 15) {
                    _this26.$right.trigger('click');
                    _this26.startX = null;
                } else if (xDelta < -15) {
                    _this26.$left.trigger('click');
                    _this26.startX = null;
                }
            });

            $(window).on('resize', function (e) {
                _this26.$slider.scrollLeft(_this26.$slider.width() * _this26.currentIndex);
            });

            // анимация png-последовательности
            _.each(this.$slides, function (slide) {
                $(slide).on('is-ready', function () {
                    setTimeout(function () {
                        // запускаем png-анимацию
                        var $bg = $(slide).find('.js-sequense');
                        var pics = $bg.attr('data-pics').split(',');
                        var currentCount = 0;

                        var checkPics = function checkPics() {
                            currentCount++;
                            if (currentCount === pics.length - 1) {
                                var counter = 0;
                                var timer = setInterval(function () {
                                    $bg.css('background-image', 'url("' + _.trim(pics[counter]) + '")');

                                    if (counter >= pics.length - 1) {
                                        //counter = 0; // если нужно будет сделать бесконечный цикл
                                        clearInterval(timer);
                                    }

                                    counter++;
                                }, 33); // digital-магия fps
                            }
                        };

                        _.each(pics, function (pic) {
                            var img = new Image();
                            img.src = pic;
                            img.onload = checkPics;
                        });
                    }, 1000); // задержка по css
                });
            });
        }
    }, {
        key: 'updatePager',
        value: function updatePager() {
            this.$pagination.html('<span>' + (this.currentIndex + 1) + '</span> <i>/</i> ' + this.$slides.length);
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            var _this27 = this;

            anime({
                targets: this.$slider[0],
                scrollLeft: {
                    value: this.$slider.width() * this.currentIndex,
                    duration: 500,
                    easing: 'easeInOutCirc'
                },
                complete: function complete() {
                    _this27.canAnimate = true;

                    _this27.updatePager();
                }
            });
        }
    }]);

    return PromoProjectsSlider;
}();

$(function () {
    $('.js-promo-projects').each(function (i, item) {
        new PromoProjectsSlider($(item));
    });
});

var PromoAbout = function () {
    function PromoAbout($el) {
        _classCallCheck(this, PromoAbout);

        // Переменные
        this.$element = $el;
        this.$readies = this.$element.find('.js-is-ready:not(.js-no-animate-counters)');
        this.$video = this.$element.find('.js-video-parallax');

        // Функции
        this.setListeners();
    }

    _createClass(PromoAbout, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this28 = this;

            this.$readies.on('is-ready', function (e) {
                _this28.animateCounters($(e.currentTarget).find('.js-animate-counter'));
            });

            // паралакс
            $(window).on('scroll resize', function (e) {
                if (window.innerWidth >= 1024 && _this28.$video.offset().top - window.innerHeight < window.pageYOffset + window.innerHeight) {
                    var offsetY = -(_this28.$video.offset().top - window.pageYOffset) / 6;

                    _this28.$video.css({
                        transform: 'translate3d(0, ' + offsetY + 'px, 0)'
                    });
                } else {
                    _this28.$video.removeAttr('style');
                }
            });
        }

        // счетчик цифр

    }, {
        key: 'animateCounters',
        value: function animateCounters($counters) {
            _.each($counters, function (counter) {
                var end = parseInt(counter.innerHTML);

                var params = {
                    number: 0
                };

                anime({
                    targets: params,
                    number: {
                        value: end,
                        duration: 2000 + end * 2.5,
                        easing: 'easeOutExpo'
                    },
                    update: function update() {
                        counter.innerHTML = parseInt(params.number);
                    }
                });
            });
        }
    }]);

    return PromoAbout;
}();

$(function () {
    $('.js-promo-about').each(function (i, item) {
        new PromoAbout($(item));
    });
});

var SecondSlider = function () {
    function SecondSlider($el) {
        _classCallCheck(this, SecondSlider);

        // Переменные
        this.$element = $el;
        this.$tagsSlides = this.$element.find('.js-tags-slide');
        this.$slides = this.$element.find('.js-slide');
        this.$scroll = this.$element.find('.js-mobile-scroll');
        this.$dots = this.$element.find('.js-dot');
        this.$next = this.$element.find('.js-next');
        this.canAnimate = true;

        this.currentIndex = 0;
        this.timer = null;
        this.circleLength = 2 * Math.PI * parseFloat(this.$dots.eq(0).find('circle[stroke-dashoffset]').attr('r'));

        // Функции
        this.setListeners();
        this.resetPreloader();
    }

    _createClass(SecondSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this29 = this;

            this.$element.on('is-ready', function () {
                _this29.changeSlide();

                if (window.innerWidth >= 1024) {
                    _this29.setSliderInterval();
                }
            });

            this.$next.on('click', function (e) {
                e.preventDefault();

                _this29.nextSlide();

                _this29.setSliderInterval();
            });

            _.forEach(this.$dots, function (dot, i) {
                $(dot).on('click', function (e) {
                    e.preventDefault();

                    _this29.currentIndex = i;

                    _this29.changeSlide();

                    _this29.setSliderInterval();
                });
            });

            // swipe detected
            this.$scroll.on('touchstart', function (e) {
                _this29.startX = (e.touches || e.originalEvent.touches)[0].clientX;
            });

            this.$scroll.on('touchmove', function (e) {
                if (!_this29.startX) return;

                var xDelta = _this29.startX - (e.touches || e.originalEvent.touches)[0].clientX;

                if (xDelta > 15) {
                    _this29.nextSlide();
                    _this29.startX = null;
                } else if (xDelta < -15) {
                    _this29.prevSlide();
                    _this29.startX = null;
                }
            });

            $(window).on('resize', function () {
                if (window.innerWidth < 1024) {
                    clearInterval(_this29.timer);
                } else {
                    _this29.setSliderInterval();
                }
            });
        }
    }, {
        key: 'setSliderInterval',
        value: function setSliderInterval() {
            var _this30 = this;

            clearInterval(this.timer);

            this.timer = setInterval(function () {
                _this30.nextSlide();
            }, 10000); // 10 сек
        }
    }, {
        key: 'prevSlide',
        value: function prevSlide() {
            if (window.innerWidth < 768) {
                if (this.canAnimate) {
                    this.canAnimate = false;
                    this.currentIndex--;

                    if (this.currentIndex < 0) {
                        this.currentIndex = this.$slides.length - 1;
                    }

                    this.changeSlide();
                }
            } else {
                this.currentIndex--;

                if (this.currentIndex < 0) {
                    this.currentIndex = this.$slides.length - 1;
                }

                this.changeSlide();
            }
        }
    }, {
        key: 'nextSlide',
        value: function nextSlide() {
            if (window.innerWidth < 768) {
                if (this.canAnimate) {
                    this.canAnimate = false;
                    this.currentIndex++;

                    if (this.currentIndex > this.$slides.length - 1) {
                        this.currentIndex = 0;
                    }

                    this.changeSlide();
                }
            } else {
                this.currentIndex++;

                if (this.currentIndex > this.$slides.length - 1) {
                    this.currentIndex = 0;
                }

                this.changeSlide();
            }
        }
    }, {
        key: 'resetPreloader',
        value: function resetPreloader() {
            var _this31 = this;

            // сбросим svg анимацию пути
            _.forEach(this.$dots, function (dot) {
                var circle = dot.querySelector('circle[stroke-dashoffset]');
                circle.setAttributeNS(null, 'stroke-dashoffset', _this31.circleLength);
                circle.setAttributeNS(null, 'stroke-dasharray', _this31.circleLength + ' ' + _this31.circleLength);
            });
        }
    }, {
        key: 'changeSlide',
        value: function changeSlide() {
            var _this32 = this;

            this.$tagsSlides.removeClass('is-active');
            this.$slides.removeClass('is-active');
            this.$dots.removeClass('is-active');

            setTimeout(function () {
                _this32.$tagsSlides.eq(_this32.currentIndex).addClass('is-active');
                _this32.$slides.eq(_this32.currentIndex).addClass('is-active');
                _this32.$dots.eq(_this32.currentIndex).addClass('is-active');

                if (window.innerWidth < 768) {
                    var newX = _this32.$slides.eq(_this32.currentIndex).position().left;

                    _this32.$slides.removeClass('is-active');
                    _this32.$slides.eq(_this32.currentIndex).addClass('is-active');

                    anime({
                        targets: _this32.$scroll[0],
                        scrollLeft: {
                            value: newX,
                            duration: 500,
                            easing: 'easeInOutCirc'
                        },
                        complete: function complete() {
                            _this32.canAnimate = true;
                        }
                    });
                } else {
                    // установим svg анимацию пути
                    var circle = _this32.$dots.filter('.is-active').find('circle[stroke-dashoffset]')[0];
                    var params = {
                        dashOffset: _this32.circleLength
                    };

                    anime({
                        targets: params,
                        dashOffset: {
                            value: 0,
                            duration: 10000 - 555,
                            easing: 'linear'
                        },
                        update: function update() {
                            circle.setAttributeNS(null, 'stroke-dashoffset', params.dashOffset);
                        },
                        complete: function complete() {
                            _this32.resetPreloader();
                        }
                    });
                }
            }, 555); // между слайдами задержка по времени ухода слайда (требование ТЗ)
        }
    }]);

    return SecondSlider;
}();

$(function () {
    $('.js-second-slider').each(function (i, item) {
        new SecondSlider($(item));
    });
});

var SliderContainer = function () {
    function SliderContainer($el) {
        _classCallCheck(this, SliderContainer);

        // Переменные
        this.$element = $el;

        this.$sliderWrapper = this.$element.find('.js-slider-wrapper');
        this.$slider = this.$element.find('.js-slider');
        this.$slides = this.$element.find('.js-slide');

        this.$slideSample = this.$slides.eq(0);

        this.$slideAmount = this.$element.find('.js-amount');
        this.$btnLeft = this.$element.find('.js-btn-left');
        this.$btnRight = this.$element.find('.js-btn-right');

        this.$slideAmount.text(this.$slides.length);

        this.slideNumber = 0;
        this.$slideNumberBlock = this.$element.find('.js-number');

        // Функции
        this.getSlideWidth();
        this.setListeners();
        this.setDisabledButton();
    }

    _createClass(SliderContainer, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this33 = this;

            this.$slider.on('scroll', function (e) {
                _this33.setDisabledButton();
            });

            this.$btnLeft.on('click', function (e) {
                e.preventDefault();
                _this33.clickHandler(-1);
            });

            this.$btnRight.on('click', function (e) {
                e.preventDefault();
                _this33.clickHandler(1);
            });

            $(window).on('resize', _.throttle(function () {
                return _this33.getSlideWidth();
            }, 150));
        }
    }, {
        key: 'setDisabledButton',
        value: function setDisabledButton() {
            if (this.slideNumber < 1) {
                this.$btnLeft.addClass('is-disable');
            } else {
                this.$btnLeft.removeClass('is-disable');
            }

            if (this.slideNumber === this.$slides.length - 1) {
                this.$btnRight.addClass('is-disable');
            } else {
                this.$btnRight.removeClass('is-disable');
            }
        }
    }, {
        key: 'clickHandler',
        value: function clickHandler(diff) {
            this.slideNumber += diff;

            this.$slider.css('transform', 'translate3d(' + -100 * this.slideNumber + '%, 0, 0)');
            this.$slideNumberBlock.text(this.slideNumber + 1);

            this.setDisabledButton();
        }
    }, {
        key: 'getSlideWidth',
        value: function getSlideWidth() {
            this.slideWidth = Math.ceil(this.$slideSample.innerWidth());

            var wrapperWidth = Math.ceil(Math.min($(window).innerWidth(), 1920) * 1705 / 1920);

            if (window.innerWidth <= 1599) {
                wrapperWidth = Math.ceil($(window).innerWidth() * 1315 / 1440);
            }

            if (window.innerWidth <= 1439) {
                wrapperWidth = Math.ceil($(window).innerWidth() * 940 / 1024);
            }

            if (window.innerWidth <= 1023) {
                wrapperWidth = Math.ceil($(window).innerWidth() * 718 / 768);
            }

            if (window.innerWidth <= 767) {
                wrapperWidth = Math.ceil($(window).innerWidth() * 355 / 375);
            }

            this.$sliderWrapper.innerWidth(wrapperWidth);
        }

        // прокрутка слайдов тачем
        // touchScroll(e) {
        //     console.log("qqweqwe")
        //     const target = e.changedTouches[0].target;

        //     const startCoord = e.changedTouches[0].screenX;
        //     const endHandler = e => {
        //         const endCoord = e.changedTouches[0].screenX;

        //         // движение на более чем 30 пикселей, скорее всего, намеренное
        //         if (Math.abs(startCoord - endCoord) > 30) {
        //             if (endCoord > startCoord) {
        //                 this.currentIndex > 0 ? this.showPreviousSlide() : null;
        //             } else {
        //                 this.currentIndex < this.slidesTotal - 1 ? this.showNextSlide() : null;
        //             }
        //         }

        //         target.removeEventListener('touchend', endHandler);
        //     };

        //     target.addEventListener('touchend', endHandler);
        // }

    }]);

    return SliderContainer;
}();

$(function () {
    $('.js-slider-container').each(function (i, item) {
        new SliderContainer($(item));
    });
});

var Tabs = function () {
    function Tabs($el) {
        _classCallCheck(this, Tabs);

        this.$element = $el;

        this.$tabs = this.$element.find('.js-tab');

        // функции инициализации
        this.setListeners();
        this.initTabs();
    }

    _createClass(Tabs, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this34 = this;

            this.$tabs.on('click', function (e) {
                e.preventDefault();
                _this34.openTab($(e.currentTarget));
            });
        }

        // инициализирует табы, показывая первый или тот, который был задан через data-is-first=true

    }, {
        key: 'initTabs',
        value: function initTabs() {
            this.resetTabs();

            var activeTab = this.$tabs.filter('[data-is-first=true]');

            if (activeTab.length > 0) {
                activeTab.eq(0).addClass('is-active');
                $(activeTab.eq(0).attr('data-href')).removeClass('h-hide');
            } else {
                this.$tabs.eq(0).addClass('is-active');
                $(this.$tabs.eq(0).attr('data-href')).removeClass('h-hide');
            }
        }

        // открывает нужный таб

    }, {
        key: 'openTab',
        value: function openTab($tab) {
            var $curCont = $($tab.attr('data-href'));
            // Проверка на то, что таб с выпадающим блоком активен

            this.resetTabs();

            $tab.addClass('is-active');
            $curCont.removeClass('h-hide');
        }

        // сбрасывает все табы и скрывает все блоки

    }, {
        key: 'resetTabs',
        value: function resetTabs() {
            this.$tabs.each(function (i, item) {
                var $curCont = $($(item).attr('data-href'));

                $(item).removeClass('is-active');
                $curCont.addClass('h-hide');
            });
        }
    }]);

    return Tabs;
}();

$(function () {
    $('.js-tabs').each(function (i, item) {
        new Tabs($(item));
    });
});

var Vacancy = function () {
    function Vacancy($el) {
        _classCallCheck(this, Vacancy);

        // Переменные
        this.$element = $el;

        //создаём переменные
        this.$form = this.$element.find('.js-validate');
        this.$inputFileCont = this.$element.find('.js-input-file');

        this.$popup = this.$element.find('.js-popup');
        this.$popupClose = this.$element.find('.js-popup-close');

        // функции инициализации
        this.setListeners();
    }

    _createClass(Vacancy, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this35 = this;

            // успешный ответ от сервера
            this.$form.data('formValidate').setCallback(function (response) {
                $('html, body').addClass('is-mobile-overflow');
                _this35.$popup.removeClass('h-hide');
            });

            // Закрытие попапа
            this.$popupClose.on('click', function (e) {
                e.preventDefault();

                _this35.$popup.addClass('h-hide');
                $('html, body').removeClass('is-mobile-overflow');

                _this35.$form[0].reset(); // очищение формы
                _this35.$form.find('input, textarea').removeClass('is-error is-valid'); // очищение формы

                // почистим файлы
                _.each(_this35.$inputFileCont, function (cont) {
                    $(cont).find('input[type=file]').val('');
                    $(cont).find('input[type=hidden]').val('');
                    $(cont).find('.js-files-preview').empty();
                });
            });

            // визуальное отображение выбранных файлов
            _.each(this.$inputFileCont, function (cont) {
                var $input = $(cont).find('input[type=file]');
                var $hiddenInput = $(cont).find('input[type=hidden]');
                var $filesNames = $(cont).find('.js-files-preview');
                var files = [];

                // удаление файла из списка
                $filesNames.on('click', '.js-file-del', function (e) {
                    e.preventDefault();

                    var $parent = $(e.currentTarget).parent();
                    files.splice($parent.index(), 1);
                    $hiddenInput.val(files.join(','));
                    $parent.remove();
                });

                $input.on('change', function (e) {
                    files = _.map($input[0].files, function (o) {
                        return o.name;
                    });
                    $hiddenInput.val(files.join(','));

                    _.each(files, function (item) {
                        var $li = $('<li class="new-customers__content-file-item"><a class="js-file-del" href="#"></a>' + item + '</li>');
                        $filesNames.append($li);
                    });
                });
            });
        }
    }]);

    return Vacancy;
}();

$(function () {
    $('.js-vacancy').each(function (i, item) {
        new Vacancy($(item));
    });
});

var SpecialProjectsSlider = function () {
    function SpecialProjectsSlider($el) {
        _classCallCheck(this, SpecialProjectsSlider);

        // Переменные
        this.$element = $el;
        this.$slider = this.$element.find('.js-slider');
        this.$slides = this.$element.find('.js-slide');
        this.$dots = this.$element.find('.js-dot');

        this.currentIndex = 0;

        // Функции
        this.setListeners();
    }

    _createClass(SpecialProjectsSlider, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this36 = this;

            this.$element.on('is-ready', function () {
                _this36.changeSlide();
            });

            _.forEach(this.$dots, function (dot, i) {
                $(dot).on('click', function (e) {
                    e.preventDefault();

                    _this36.currentIndex = i;

                    _this36.changeSlide();
                });
            });

            $(window).on('resize', function (e) {
                _this36.changeSlide();
            });
        }
    }, {
        key: 'changeSlide',
        value: function changeSlide() {
            var _this37 = this;

            if (window.innerWidth >= 1024) {
                this.$slides.removeClass('is-active');
                this.$dots.removeClass('is-active');

                setTimeout(function () {
                    _this37.$slides.eq(_this37.currentIndex).addClass('is-active');
                    _this37.$dots.eq(_this37.currentIndex).addClass('is-active');
                }, 555); // между слайдами задержка по времени ухода слайда (требование ТЗ)
            } else {
                this.$slides.addClass('is-active');
                this.$dots.removeClass('is-active');
                this.$dots.eq(this.currentIndex).addClass('is-active');

                anime({
                    targets: this.$slider[0],
                    scrollLeft: {
                        value: this.$slider.width() * this.currentIndex,
                        duration: 500,
                        easing: 'easeInOutCirc'
                    }
                });
            }
        }
    }]);

    return SpecialProjectsSlider;
}();

;

$(function () {
    $('.js-special-projects').each(function (i, item) {
        new SpecialProjectsSlider($(item));
    });
});

var VideoWrapper = function () {
    function VideoWrapper($el) {
        _classCallCheck(this, VideoWrapper);

        // Переменные
        this.$element = $el;
        this.$play = this.$element.find('.js-play');
        this.video = this.$element.find('video')[0];

        // Функции
        this.setListeners();
    }

    _createClass(VideoWrapper, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this38 = this;

            this.$play.on('click', function (e) {
                e.preventDefault();

                _this38.$element.addClass('is-active');

                // и само видео запустим
                _this38.video.play();
            });
        }
    }]);

    return VideoWrapper;
}();

$(function () {
    $('.js-video-wrapper').each(function (i, item) {
        new VideoWrapper($(item));
    });
});