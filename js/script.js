$(function(){
    // Nav bar for small devices
    function navToggle() {
        $('header .menu').off('click');
        $('nav a, nav + .rounded-btn').off('click.autoHide');
        if (window.innerWidth < 767) {
            $('header .menu').on('click', function() {
                $(this).toggleClass('active');
                $('.nav-box').slideToggle();
            });
    
            $('nav a, nav + .rounded-btn').on('click.autoHide', function() {
                $('header .menu').removeClass('active');
                $('.nav-box').slideUp();
            });
        } else {
            // reset menu for larger screens
            $('header .menu').removeClass('active');
            $('.nav-box').removeAttr('style');
        }
    }
    
    navToggle();
    
    // Debounced resize event listener
    let resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            navToggle();
        }, 200);
    });
    

    // ScrollBar enable disable hadling
    function disableScroll() {
        const scrollbarWidth = window.innerWidth - $(document).width();
        $('header, .banner').css({
            'padding-right': scrollbarWidth + 'px',
        });
        $('body').css({'overflow': 'hidden'});
    }

    function enableScroll() {
        $('header, .banner').css({
            'padding-right': '',
        });
        $('body').css({'overflow': ''});
    }

    // Signup button
    $('.signup').on('click', function() {
        $('.signup-popup .overlay, .signup-popup .popup').fadeIn(function() {
            $('.formgrid div:first-child input').trigger('focus');
            $('.signup-popup .overlay, .signup-popup .close').off('click').on('click', function() {
                $('.signup-popup .overlay, .signup-popup .popup').hide();
                enableScroll();
            });
        });
        disableScroll();
        $(window).off('keyup.signupClose').on('keyup.signupClose', function(e) {
            if (e.which === 27) {
                $('.signup-popup .overlay, .signup-popup .popup').hide();
                enableScroll();
            }
        });
    });

    // Banner Player
    $('.banner button, .banner a').on('click', function(e) {
        e.preventDefault();
        $('.banner-player .overlay, .banner-player .popup').fadeIn(function() {
            $('.banner-player .popup').html(`<button class="close"><span class="fa fa-times-circle"></span></button><iframe width=${Math.min(560, (screen.width - 60))} height="315" src="https://www.youtube.com/embed/tQJ4-e-qQVY?si=fDor2duKd6I-CeYg" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`)
            $('.banner-player .overlay, .banner-player .close').off('click').on('click', function() {
                $('.banner-player .popup').html('');
                $('.banner-player .overlay, .banner-player .popup').hide();
                enableScroll();
            });
        });
        disableScroll();
        $(window).off('keyup.bannerClose').on('keyup.bannerClose', function(e) {
            if (e.which === 27) {
                $('.banner-player .popup').html('');
                $('.banner-player .overlay, .banner-player .popup').hide();
                enableScroll();
            }
        });
    });

    // Work Section Buttons Event Listeners
    $('#works .rounded-btn').on('click', function() {
        $('#works .rounded-btn').removeClass('active');
        $(this).addClass('active');
        if($(this).text() === 'All') {
            $('#works .all').fadeIn();
        }
        if($(this).text() === 'Website') {
            $('#works .all').hide();
            $('#works .web').fadeIn();
        }
        if($(this).text() === 'Branding') {
            $('#works .all').hide();
            $('#works .branding').fadeIn();
        }
    })

    // Plus button event listener in work section
    $('#works .plus-btn').on('click', function() {
        $(this).children('span').toggleClass('fa-minus-circle');
        $('#works .hidden').fadeToggle();
    });

    // Teams section more button event listener
    $('#about .plus-btn').on('click', function() {
        $(this).children('span').toggleClass('fa-minus-circle');
        $('#about .hidden').fadeToggle();
    });

    // Accordian in skill section
    $('.accordian a').on('click', function(event) {
        event.preventDefault();
        const isActive = $(this).hasClass('active'); // Check if clicked <a> is already active
        $('.accordian a').removeClass('active');
        $('.accordian a').next().slideUp();

        if (!isActive) { // If it was not active before, now make it active
            $(this).addClass('active');
            $(this).next().slideDown();
        }
    });

    // Reviews
    $(".reviews").bxSlider({
        controls:false,
        auto:true,
        pause:5000,
        autoHover:true
    });
});