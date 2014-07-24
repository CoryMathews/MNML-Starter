/* 
 * Creates a menu that slides in from the left on mobile devices.
 *
 * Usage:
 * body tag requires something such as:
 * <body data-mobilize-breakpoint="830" data-mobilize-box=".container" data-mobilize-nav=".navigation">
 *
 * and the navigation tag requires something like:
 * <ul class="navigation horizontal mobilenav" data-mobilize-width="15rem" data-mobilize-title="Menu">
 */
$(function() {
	"use strict";
	$.fn.mobilize = function(options) {
		console.log("[mobilize]: --start--");

		function appendToBody( content, menuTitle ) {
			$.each( [ "<strong>", "</strong>", "<em>", "</em>" ], function(i, v) {
				while( content.toLowerCase().indexOf( v ) > 0) {
					content = content.replace(v, ' ');
				}
			});
			content = '<ul id="mobileSlide" class="accordian"><div class="mobilize-closeMenu">' + menuTitle + ' <span>&#10006;</span></div>' + content + '</ul>';
			$('body').append( content );
			return content;
		}

		function removeWidths() {
			$('#mobileSlide li').each( function() {
				var t = $(this);
				$.each( [ 'w100', 'w95', 'w90', 'w85', 'w80', 'w75', 'w70', 'w66', 'w65', 'w60', 'w55', 'w50', 'w40', 'w45', 'w35', 'w34', 'w33', 'w30', 'w25', 'w20', 'w15', 'w10', 'w05' ], function( ind, val ) {
					t.removeClass(val);
				});
			});
		}

		function getData(d, fun) {
			if(d === undefined || d === '') {
				fun();
			} 
			return d;
		}

		function getBodyData(name, fun) {
			return getData( $('body').data(name), fun);
		}

		function getNavigationData(name, fun) {
			return getData( $('.navigation.mobilenav').data(name), fun);
		}

		function checkWindowWidth( point ) {
			if ($(window).width() < point) {
				$(originalMenu).fadeOut();
				$(menuLink).fadeIn();
			} else {
				$(originalMenu).fadeIn();
				$(menuLink).fadeOut();
			}
		}

		function closeNav() {
			$('.menuShow').removeClass('menuShow').fadeOut(200);
			console.log("[mobilize]: Closed Link");
		}

		var menuLink = '.mobilize-openmenu',
			originalMenu = getBodyData("mobilize-nav", function() { return ".navigation"; } ),
			menuTitle = getNavigationData('mobilize-title', function() { return 'Menu'; }),
			content = appendToBody( $(originalMenu).html(), menuTitle ),
			menu = $("#mobileSlide"),
			sideWidth = getNavigationData('mobilize-width', function() { return '15rem'; }),
			breakpoint = getBodyData('mobilize-breakpoint', function() { return '959'; });

		menu.css( { 'left': '-' + sideWidth, 'width': sideWidth } ).css( { '-webkit-transition': 'left 300ms ease', '-moz-transition': 'left  300ms ease', 'transition': 'left 300ms ease' } );
		menu.state = 'hide';
		removeWidths();
		$(originalMenu).after( "<div class='" + menuLink.replace('.', '') + "'>Menu &#9776;</div>" );
		$(menuLink).css("display", "none");
		console.log(menuLink + "||" + $(menuLink).html());
		checkWindowWidth( breakpoint );
		console.log("[mobilize]: created mobile menu");

		menu.show = function() {
			console.log("[mobilize]: show");
			menu.state = 'show';
			menu.css('left', '0');
			console.log("[mobilize]: show done");
		};

		menu.hide = function() {
			console.log("[mobilize]: hide");
			menu.state = 'hide';
			menu.css('left', '-' + sideWidth);
		};

		$(menuLink).on('click', function(event) {
			event.preventDefault();
			event.stopPropagation(); 
			console.log("[mobilize]: toggle; Current State: " + menu.state);
			if ( menu.state === 'hide' ) {
				menu.show();
			} else {
				menu.hide();
			}
		});

		$('.mobilize-closeMenu').on('click', function() {
			menu.hide();
		});

		$('#mobileSlide li a').on('click', function (e) {
			console.log("[mobilize]: mobile click");
			if($(this).parent().children("ul").length > 0) {
				e.preventDefault();
				var a = $(this).parent().children('ul:first');
				if( a.hasClass("openSlide") ) {
					a.removeClass('openSlide').slideToggle(200);
				} else {
					$(this).parent().parent().find('.openSlide').slideUp(200);
					a.addClass('openSlide').slideToggle(200);
				}
			} else {
				console.log("[mobilize]: redirect")
				e.stopPropagation(); 
			}
		});

		$(originalMenu + "  li").on("click", function(e) {
			e.stopPropagation(); 
			$('.menuShow').removeClass('menuShow').fadeOut(200);
			$(this).find("ul").addClass("menuShow").fadeIn(200);
			console.log("[mobilize]: Clicked Link");
		});

		$(window).on('resize', function() {
			checkWindowWidth( breakpoint );
		});

		$(document).on('click', function() {
			closeNav();
		});
	};
	$.fn.mobilize();
});