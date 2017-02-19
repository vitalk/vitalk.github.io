/**
 * Main application endpoint.
 *
 * @author Vital Kudzelka <vital.kudzelka@gmail.com>
 * @license MIT
 */
;(function ($) {
  'use strict'

  var selector = {
    window: $(window),
    document: $(document),
    htmlbody: $('html,body'),
    nav: $('.nav-main'),
    flyout: $('.flyout'),
    fadeable: $('.js-banner,.project__info p'),
    scrollable: $('.js-scrollable'),
    gallery: $('.js-gallery'),
    showcase: $('.showcase')
  }

  function App (opts) {
    if (!(this instanceof App)) {
      return new App(opts)
    }

    this.opts = opts
  }

  App.prototype.log = function () {
    Array.prototype.unshift.call(arguments, '[' + this.opts.name + ']')

    if (window.console && this.opts.debug) {
      console.log.apply(console, arguments)
    }
  }

  App.prototype.initGallery = function () {
    this.log('Initializing image gallery')

    selector.showcase.each(function () {
      var
        mobileShowcase,
        browserShowcase,
        opts,
        showcase,
        mobile,
        browser,
        nextButton,
        previousButton,
        hasNavigation

      opts = {
        allowfullscreen: false,
        arrows: false,
        enableifsingleframe: true,
        loop: true,
        nav: false
      }
      showcase = $(this)
      mobile = showcase.find('.showcase__mobile').find(selector.gallery)
      browser = showcase.find('.showcase__browser').find(selector.gallery)
      nextButton = showcase.find('.showcase__button_next')
      previousButton = showcase.find('.showcase__button_prev')
      hasNavigation = showcase.find('.showcase__button').length

      mobileShowcase = mobile && mobile.fotorama(opts).data('fotorama')
      browserShowcase = browser && browser.fotorama(opts).data('fotorama')

      if (mobileShowcase && browserShowcase) {
        mobile.on('fotorama:show', function () {
          browserShowcase.show(mobileShowcase.activeIndex)
        })

        browser.on('fotorama:show', function () {
          mobileShowcase.show(browserShowcase.activeIndex)
        })
      }

      if (hasNavigation) {
        nextButton.on('click', function () {
          if (mobileShowcase) {
            mobileShowcase.show('>')
          } else if (browserShowcase) {
            browserShowcase.show('>')
          }
        })

        previousButton.on('click', function () {
          if (mobileShowcase) {
            mobileShowcase.show('<')
          } else if (browserShowcase) {
            browserShowcase.show('<')
          }
        })
      }
    })
  }

  App.prototype.initMenu = function () {
    this.log('Initializing navigation menu')
    selector.nav.flyout({
      debug: this.opts.debug,
      namespace: 'navigation',
      trigger: {close: '.js-menu-close', open: '.js-menu-open'}
    })
  }

  App.prototype.initFlyout = function () {
    this.log('Initializing flyout menu')
    selector.flyout.flyout({
      debug: this.opts.debug,
      namespace: 'about-me',
      trigger: {open: '.js-flyout'},
      className: {opened: 'flyout_open'}
    })
  }

  App.prototype.enableSmoothScroll = function () {
    this.log('Enabling smooth scrolling for links')
    var opts = this.opts

    selector.scrollable.on('click', function (event) {
      event.preventDefault()

      var href = $(this).attr('href')
      var $el = $(href.substr(1, href.length))

      selector.htmlbody.animate(
        {scrollTop: $el.offset().top},
        opts.speed,
        opts.ease
      )
    })
  }

  App.prototype.fadeBanner = function () {
    this.log('Fading banners on scroll')

    var element, height, top, offsetTop, textOpacity, i, len
    var elements = selector.fadeable

    selector.window.on('scroll', function () {
      top = selector.window.scrollTop()

      for (i = 0, len = elements.length; i < len; ++i) {
        element = $(elements[i])

        height = element.innerHeight()
        offsetTop = element.offset().top
        textOpacity = Math.round((1 - ((top - offsetTop) / height)) * 100) / 100
        textOpacity = (textOpacity >= 0 && textOpacity <= 1) ? textOpacity : 1

        element.css('opacity', textOpacity)
      }
    })
  }

  App.prototype.init = function () {
    this.initMenu()
    this.initFlyout()
    this.initGallery()
    this.enableSmoothScroll()
  }

  var app = App({debug: false, name: 'app', speed: 600, ease: 'swing'})

  selector.document.ready(function () {
    app.init()
  })
}(window.jQuery))
