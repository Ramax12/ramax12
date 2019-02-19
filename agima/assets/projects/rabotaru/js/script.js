$(document).ready(function () {
    $(window).on("load scroll resize", function () {
        if ($.fn.scrollzip != undefined) {
            $('.js-animated').scrollzip({
                showFunction: function () {
                    $(this).addClass('animated');
                },
                hideFunction: function () {
                    $(this).removeClass('animated');
                },
            });
        }
    });

    /* scroll */
    (function ($) {
        $(window).on("load", function () {
            if ($.fn.mCustomScrollbar != undefined) {
                $(".js-scroll").mCustomScrollbar();
            };
        });
    })(jQuery);

    /* slider */
    if ($.fn.slick != undefined) {
        $('.js-slider').slick({
            arrows: false,
            infinite: true,
            draggable: false,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            fade: true,
        });
    }


});  /* end */
