/**
 * Main application endpoint.
 *
 * @author Vital Kudzelka <vital.kudzelka@gmail.com>
 * @license MIT
 */
(function() {
  'use strict';

  var selector = {
    window:     $(window),
    document:   $(document),
    htmlbody:   $('html,body'),
    nav:        $('.nav-main'),
    flyout:     $('.flyout'),
    fadeable:   $('.js-banner,.project__info p'),
    scrollable: $('.js-scrollable'),
    gallery:    $('.js-gallery')
  };

  function App(opts) {
    if (!(this instanceof App)) {
      return new App(opts);
    }

    this.opts = opts;
  }

  App.prototype.log = function() {
    Array.prototype.unshift.call(arguments, '[' + this.opts.name + ']');

    if (window.console && this.opts.debug) {
      console.log.apply(console, arguments);
    }
  };

  App.prototype.initGallery = function() {
    this.log('Initializing image gallery');

    selector.gallery.each(function() {
      var
        $el = $(this),
        opts = {
          allowfullscreen: false,
          arrows: false,
          enableifsingleframe: true,
          loop: true,
        };

      var fotorama = $el.fotorama(opts).data('fotorama');
      var showcase = $el.closest('.project__showcase');
      var mobileShowcase = $el.closest('.showcase__mobile');
      var browserShowcase = $el.closest('.showcase__browser');

      if (mobileShowcase.length) {
        $el.on('fotorama:show', function() {
          var gallery = showcase
            .find('.showcase__browser')
            .find(selector.gallery)
            .data('fotorama');

          if (gallery) {
            gallery.show(fotorama.activeIndex);
          }
        });
      };

      if (browserShowcase.length) {
        $el.on('fotorama:show', function() {
          var gallery = showcase
            .find('.showcase__mobile')
            .find(selector.gallery)
            .data('fotorama');

          if (gallery) {
            gallery.show(fotorama.activeIndex);
          }
        });
      };
    });
  };

  App.prototype.initMenu = function() {
    this.log('Initializing navigation menu');
    selector.nav.flyout({
      debug: this.opts.debug,
      namespace: 'navigation',
      trigger: {close: '.js-menu-close', open: '.js-menu-open'}
    })
  };

  App.prototype.initFlyout = function() {
    this.log('Initializing flyout menu');
    selector.flyout.flyout({
      debug: this.opts.debug,
      namespace: 'about-me',
      trigger: {open: '.js-flyout'},
      className: {opened: 'flyout_open'}
    })
  };

  App.prototype.enableSmoothScroll = function() {
    this.log('Enabling smooth scrolling for links');
    var opts = this.opts;

    selector.scrollable.on('click', function(event) {
      event.preventDefault();

      var href = $(this).attr('href'),
          $el = $(href.substr(1, href.length));

      selector.htmlbody.animate(
        {scrollTop: $el.offset().top},
        opts.speed,
        opts.ease
      );
    });
  };

  App.prototype.fadeBanner = function() {
    this.log('Fading banners on scroll');

    var elements = selector.fadeable,
        element, height, top, offsetTop, textOpacity, i, len;

    selector.window.on('scroll', function() {
      top = selector.window.scrollTop()

      for (i = 0, len = elements.length; i < len; ++i) {
        element = $(elements[i]);

        height = element.innerHeight();
        offsetTop = element.offset().top;
        textOpacity = Math.round((1 - ((top - offsetTop) / height)) * 100) / 100;
        textOpacity = (textOpacity >= 0 && textOpacity <= 1) ? textOpacity : 1;

        element.css('opacity', textOpacity);
      };
    });
  };

  App.prototype.init = function() {
    this.initMenu();
    this.initFlyout();
    this.initGallery();
    this.enableSmoothScroll();
  };


  var app = App({debug: false, name: 'app', speed: 600, ease: 'swing'});


  selector.document.ready(function() {
    app.init();
  });

}());
