//Scripts for Main page

//Get everything rolling
$( window ).ready(kickstart);

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//Main function for homepage
function kickstart() {
	console.log("We are kickstarting "+page);
	switch(page) {
		case "docs":
			$(".fitVid").fitVids();
            videos();
		break;
        case "company":
            $(".fitVid").fitVids();
            company_contact();
            investor_form();
        break;
        case "enterprise":
            enterprise();
            enterprise_contact_form();
        break;
		default:
			homepage();
		break;
	}

	default_funcs();
}

function default_funcs() {
    var header = document.querySelector("#header");
    if (window.location.hash) {
        header.classList.add("header-show");
    }
    new Headroom(header, {
        tolerance: 5,
        offset: 75,
        classes: {
            initial: "animated",
            pinned: "header-show",
            unpinned: "header-hide"
        }
    }).init();

    $('.dropdown-toggle').each(function() {
        if ($(this).find('.dropdown-menu-nub').length==0) {
            $(this).prepend("<div class='dropdown-menu-nub'></div>");
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    document.createElement( "picture" );

	$(".scrollToLink").click(function(e, tmpl) {
        var _this = this;
        $('html, body').animate({
            scrollTop: $(e.currentTarget.hash).offset().top - 75
        }, 600);
    });
    //Thumbs
    $("#product-updates-register").on("change", function(e,t){
        var _this = e.currentTarget;
        if ($(_this).is(':checked')) {
            $('#updates .thumbs-up-left').addClass("checked");
        } else {
            $('#updates .thumbs-up-left').removeClass("checked");
        }
    });

    $("#blog-register").on("change", function(e,t){
        var _this = e.currentTarget;
        if ($(_this).is(':checked')) {
            $('#updates .thumbs-up-right').addClass("checked");
        } else {
            $('#updates .thumbs-up-right').removeClass("checked");
        }
    });
}
function homepage(){

    var responsive_viewport = $(window).width();

    /* if is below 481px */
    // if (responsive_viewport < 481) {
        // if ($('#home-hero .background-gif').length){

        // } else {
        //     $("#home-hero").prepend("<div class='background-gif'><img src='/img/video/strapDevHands-m.gif'/></div>");
        //     $("#home-hero video").remove();
        // }

    // } else if (responsive_viewport > 481) {

        if ($('#home-hero video').length){

        } else {
            $("#home-hero .background-gif").remove();
            $("#home-hero").vide({
                mp4: '/img/video/strapDevHands.mp4',
                webm: '/img/video/strapDevHands.webm',
                ogv: '/img/video/strapDevHands.ogv',
                poster: '/img/video/strapDevHands-m.gif'
            }, {
                resizing:true,
                position: "50% 0%"
            });
        }
    // }

    // $( window ).resize(function() {
    //     var responsive_viewport = $(window).width();
    //     if (responsive_viewport < 481) {
    //         if ($('#home-hero .background-gif').length){

    //         } else {
    //             $("#home-hero").prepend("<div class='background-gif'><img src='/img/video/strapDevHands-m.gif'/></div>");
    //             $("#home-hero video").remove();
    //         }
    //     } else if (responsive_viewport > 481) {
    //         if ($('#home-hero video').length){

    //         } else {
    //             $("#home-hero .background-gif").remove();
    //             $("#home-hero").vide({
    //                 mp4: '/img/video/strapDevHands.mp4',
    //                 webm: '/img/video/strapDevHands.webm',
    //                 ogv: '/img/video/strapDevHands.ogv',
    //                 poster: '/img/video/strapDevHands.gif'
    //             }, {
    //                 resizing:false,
    //                 position: "50% 0%"
    //             });
    //         }
    //     }
    // });

    function copyToClipBoard(event) {
        var clipboard = event.clipboardData,
            data = this.parents('pre').find('.hljs').text();

        clipboard.setData('text/plain', data);
    }

    ['#copy-clipboard-app', '#copy-clipboard-install'].forEach(function (sel) {
        (new ZeroClipboard($(sel))).on('copy', copyToClipBoard.bind($(sel)));
        $(sel).on('click', function (e) {
            analytics.track("Copy to clipboard", {element:sel});
            e.preventDefault();
        });
    });

    $("#video-hero").vide({
        mp4: '/img/video/strap-video-poster.mp4',
        webm: '/img/video/strap-video-poster.webm',
        ogv: '/img/video/strap-video-poster.ogv',
        poster: '/img/video/strap-video-poster.jpg'
    });


    $("#video-link .play-button").click(function(e,t) {
        var src = '//player.vimeo.com/video/115874822?autoplay=1';

        $('#myModal iframe').attr('src', src);
        $("#myModal").fitVids();

        analytics.track("Home Video Played");
    });

    $("#myModal a .icon-close").click(function() {
        $('#myModal iframe').removeAttr('src');
    });


    //Various forms
    updates_form();

}

function subscribe(subs, data, cb) {
    data.lists = subs;
	$.ajax({
		type: "POST",
		url: "/subscribe",
		data: data,
		success: cb
	});
}

function register_form() {

	$("#hero-register-form, #metrics-register-form").on("submit", function(e) {

        e.preventDefault();
        var email = $('#account-email').val() || $('#account-email-2').val();

        if (!email || !validateEmail(email) ) {
            return;
        }

        //Send some analytics
         analytics.track("Intent to Register",{
                email: email,
                'Page Location': this.id
         });

        window.location = dashboard+"/register?email="+encodeURI(email);

        return false;
    });
}

function investor_form() {

	$("#investors-form").on("submit", function(e) {
        e.preventDefault();

        var email = $("#investors-email").val() || "",
            name = $('#investors-name').val() || 'Subscriber',
            $submit = $('#investors-signup-btn');

        if (!email || !validateEmail(email) ) {
            return false;
        }

        //Create the Contact object
        var contact = {
            name: name,
            email: email
        };

        //create the User on the List
        subscribe( "investors", contact, function(response) {
            if (!response.success) {
                // bootbox.alert("Error signing you up! Shoot us a note at hello@straphq.com.");
            } else {
                // bootbox.alert("Thanks for signing up! Check your email to confirm the subscription.");
            }

            $submit.button('complete');

            setTimeout(function () {
                $submit.button('reset');
                $('#investors-email').val('');
                $('#investors-name').val('');
            }, 1e3);
        });

        //Send some analytics
        contact['Page Location'] = this.id;
        analytics.track("Investor Form",contact);

        return false;
    });
}

function enterprise() {
    $("#video-hero").vide({
        mp4: '/img/video/strap-video-poster.mp4',
        webm: '/img/video/strap-video-poster.webm',
        ogv: '/img/video/strap-video-poster.ogv',
        poster: '/img/video/strap-video-poster.jpg'
    });


    $("#video-link .play-button").click(function(e,t) {
        var src = '//player.vimeo.com/video/115874822?autoplay=1';

        $('#myModal iframe').attr('src', src);
        $("#myModal").fitVids();

        analytics.track("Home Video Played");
    });

    $("#myModal a .icon-close").click(function() {
        $('#myModal iframe').removeAttr('src');
    });
}

function company_contact() {
    $("#contact-form").on("submit", function(e, t) {
        e.preventDefault();

        // Reference relevant DOM elements
        var $form = $(this),
            $submit = $form.find('#contact-form-submit'),
            name = $('#contact-name').val(),
            email = $('#contact-email').val(),
            message = $('#contact-message').val();

        if (!name.length || !email.length || !message.length) {
            bootbox.alert("Please ensure all fields are filled in!");
            return;
        }

        var data = {
            name: name || email,
            email: email,
            message: message
        };

        // $submit.button('loading');
        $.ajax({
            type: "POST",
            url: "/email",
            data: data,
            success: function() {
                $submit.button('complete');
                $('#contact-name').val("");
                $('#contact-email').val("");
                $('#contact-message').val("");
                setTimeout(function () {
                    $submit.button('reset');
                }, 1000);
            }
        });


        //Send some analytics
        delete data.message;
        data['Page Location'] = this.id;
        analytics.track("Company Contact Form", data);

        return false;
    });


}

function updates_form() {

    $("#updates-register-form").on("submit", function(e, t) {
        e.preventDefault();

        // Reference self
        var $form = $(this);

        // Get / validate email
        var email = $("#updates-register-email").val();
        if (!email || !validateEmail(email) ) {
            return false;
        }

        // Build subscription list
        var subs = [];
        if ($('#product-updates-register').is(':checked')) subs.push('products');
        if ($('#blog-register').is(':checked')) subs.push('blog');

        //Check for checked lists
        if (subs.length === 0) {
            bootbox.alert("Check which updates you'd like to receive.");
            return;
        }
        //Create the Contact object
        var contact = { email:  email };

        // Get reference to submit button
        var $submit = $form.find('#updates-register-form-submit');
        $submit.button('loading');

        subscribe(subs, contact, function (response) {
            if (response.success) {
                // bootbox.alert("Thanks for signing up! Check your email to confirm the subscription.");
            } else {
                // bootbox.alert("Error signing you up! Shoot us a note at hello@straphq.com.");
                // Session.set("loading", false);
            }

            $submit.button('complete');

            setTimeout(function () {
                $submit.button('reset');
            }, 1e3);
        });

        // Send some analytics
        contact['Page Location'] = this.id;
        contact.productUpdates = ~subs.indexOf('products');
        contact.blogUpdates = ~subs.indexOf('blog');
        analytics.track("Stay Updated",contact);

        // Reset DOM
        $("#updates-register-email").val("");
        $('#product-updates-register').attr("checked", false);
        $('#blog-register').attr("checked", false);
        $('#updates .thumbs-up-right').removeClass("checked");
        $('#updates .thumbs-up-left').removeClass("checked");

        return false;
    });
}

function enterprise_contact_form() {
    $("#contact-form").on("submit", function(e, t) {
        e.preventDefault();

        // Reference relevant DOM elements
        var $form = $(this),
            $submit = $form.find('#contact-form-submit'),
            name = $('#contact-name').val(),
            email = $('#contact-email').val(),
            company = $('#contact-company').val(),
            message = $('#contact-message').val();

        if (!name.length || !email.length || !message.length || !company.length) {
            bootbox.alert("Please ensure all fields are filled in!");
            return;
        }

        var data = {
            name: name || email,
            email: email,
            company: company,
            message: message
        };

        var contact = { email: email };

        $.ajax({
            type: "POST",
            url: "/email",
            data: data,
            success: function() {
                $submit.button('complete');
                $('#contact-name').val("");
                $('#contact-email').val("");
                $('#contact-message').val("");
                $('#contact-company').val("");
                $('#product-updates-register').attr("checked", false);
                $('#blog-register').attr("checked", false);
                setTimeout(function () {
                    $submit.button('reset');
                }, 1000);
            }
        });


        data.subs = [];
        if ($('#product-updates-register').is(':checked')) data.subs.push('products');
        if ($('#blog-register').is(':checked')) data.subs.push('blog');

        // Send some analytics
        delete data.message;
        data['Page Location'] = this.id;
        analytics.track("Enterprise Contact Form", data);

        // Call out to subscribe
        if (data.subs.length) subscribe(data.subs, contact, function () {});

        return false;
    });
}
