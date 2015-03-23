document.createElement( "picture" );

    var responsive_viewport = $(window).width();

    /* if is below 481px */
    if (responsive_viewport < 481) {
        if ($('#splash-hero .background-gif').length){

        } else {
            $("#splash-hero").prepend("<div class='background-gif'><img src='/img/video/strapDevHands-m.gif'/></div>");
            $("#splash-hero video").remove();
        }

    } else if (responsive_viewport > 481) {

        if ($('#splash-hero video').length){

        } else {
            $("#splash-hero .background-gif").remove();
            $("#splash-hero").vide({
                mp4: '/img/video/strapDevHands.mp4',
                webm: '/img/video/strapDevHands.webm',
                ogv: '/img/video/strapDevHands.ogv',
                poster: '/img/video/strapDevHands.gif'
            }, {
                resizing:false,
                position: "50% 0%"
            });
        }
    }

    $( window ).resize(function() {
        var responsive_viewport = $(window).width();
        if (responsive_viewport < 481) {
            if ($('#splash-hero .background-gif').length){

            } else {
                $("#splash-hero").prepend("<div class='background-gif'><img src='/img/video/strapDevHands-m.gif'/></div>");
                $("#splash-hero video").remove();
            }
        } else if (responsive_viewport > 481) {
            if ($('#splash-hero video').length){

            } else {
                $("#splash-hero .background-gif").remove();
                $("#splash-hero").vide({
                    mp4: '/img/video/strapDevHands.mp4',
                    webm: '/img/video/strapDevHands.webm',
                    ogv: '/img/video/strapDevHands.ogv',
                    poster: '/img/video/strapDevHands.gif'
                }, {
                    resizing:false,
                    position: "50% 0%"
                });
            }
        }
    });

    $(document).on('submit', '#hero-register-form', function (e) {
        e.preventDefault();


        var $email = $(this).find('.account-email'),
            $submit = $(this).find('.account-submit'),
            email = $email.val();

        if (!email) return;

        $email.attr('disabled', 'disabled');
        $submit.button('loading');

        $.post('/register', { email: email }, function (data) {
            $submit.button('complete');

            setTimeout(function () {
                $submit.button('reset');
                $email.removeAttr('disabled');
                $email.val('');
                $email.focus();
            }, 2e3);
        });
    });
