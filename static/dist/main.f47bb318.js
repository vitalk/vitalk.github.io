/*! work 0.0.1 | (c) 2017 Vital Kudzelka <vital.kudzelka@gmail.com> | http://opensource.org/licenses/MIT
 */
(function($,window,document,undefined){'use strict';$.fn.flyout=function(parameters){var
query=arguments[0],response;this.each(function(){var
options=$.extend(true,{},$.fn.flyout.options,parameters),$instance=$(this),namespace=options.namespace,instance=$instance.data(namespace),module;module={init:function(options){instance=module;instance.options=options;instance.debug('Initializing instance with options',options);instance.bind.events();$instance.data(namespace,instance);},debug:function(){if(instance.options.debug){var debug=Function.prototype.bind.call(console.log,console,'['+instance.options.namespace+']');debug.apply(console,arguments);}},is:{opened:function(){return $instance.hasClass(instance.options.className.opened);},closed:function(){return!instance.is.opened();}},open:function(){module.debug('Opening flyout');if(instance.is.closed()){$instance.addClass(instance.options.className.opened).removeClass(instance.options.className.closed);}},close:function(){module.debug('Closing flyout');if(instance.is.opened()){$instance.addClass(instance.options.className.closed).removeClass(instance.options.className.opened);}},toggle:function(){if(instance.is.opened()){instance.close();}
else{instance.open();}},bind:{events:function(){instance.debug('Binding events');if(instance.options.trigger.open){$(instance.options.trigger.open).on('click',module.event.open);}
if(instance.options.trigger.close){$(instance.options.trigger.close).on('click',module.event.close);}
if(instance.options.trigger.toggle){$(instance.options.trigger.toggle).on('click',module.event.toggle);}}},event:{open:function(event){instance.open();event.preventDefault();},close:function(event){instance.close();event.preventDefault();},toggle:function(event){instance.toggle();event.preventDefault();}},invoke:function(query,passedArguments,context){var
object=instance,context=context||module,maxDepth,response,found;if(typeof query==='string'&&object!==undefined){query=query.split(/[\. ]/);maxDepth=query.length-1;$.each(query,function(depth,value){if($.isPlainObject(object[value])&&(depth!=maxDepth)){object=object[value];}
else if(object[value]!==undefined){found=object[value];return false;}
else{return false;}});}
if($.isFunction(found)){response=found.apply(context,passedArguments);}
else if(found!==undefined){response=found;}
return response;}};if(instance===undefined){module.init(options);}
response=instance.invoke(query);});return(response!==undefined)?response:this;};$.fn.flyout.options={namespace:'flyout',debug:false,className:{opened:'is-opened',closed:false},trigger:{open:false,close:false,toggle:false}};}(jQuery,window,document));;(function($){'use strict'
var selector={window:$(window),document:$(document),htmlbody:$('html,body'),nav:$('.nav-main'),flyout:$('.flyout'),fadeable:$('.js-banner,.project__info p'),scrollable:$('.js-scrollable'),gallery:$('.js-gallery'),showcase:$('.showcase')}
function App(opts){if(!(this instanceof App)){return new App(opts)}
this.opts=opts}
App.prototype.log=function(){Array.prototype.unshift.call(arguments,'['+this.opts.name+']')
if(window.console&&this.opts.debug){console.log.apply(console,arguments)}}
App.prototype.initGallery=function(){this.log('Initializing image gallery')
selector.showcase.each(function(){var
mobileShowcase,browserShowcase,opts,showcase,mobile,browser,nextButton,previousButton,hasNavigation
opts={allowfullscreen:false,arrows:false,enableifsingleframe:true,loop:true,nav:false}
showcase=$(this)
mobile=showcase.find('.showcase__mobile').find(selector.gallery)
browser=showcase.find('.showcase__browser').find(selector.gallery)
nextButton=showcase.find('.showcase__button_next')
previousButton=showcase.find('.showcase__button_prev')
hasNavigation=showcase.find('.showcase__button').length
mobileShowcase=mobile&&mobile.fotorama(opts).data('fotorama')
browserShowcase=browser&&browser.fotorama(opts).data('fotorama')
if(mobileShowcase&&browserShowcase){mobile.on('fotorama:show',function(){browserShowcase.show(mobileShowcase.activeIndex)})
browser.on('fotorama:show',function(){mobileShowcase.show(browserShowcase.activeIndex)})}
if(hasNavigation){nextButton.on('click',function(){if(mobileShowcase){mobileShowcase.show('>')}else if(browserShowcase){browserShowcase.show('>')}})
previousButton.on('click',function(){if(mobileShowcase){mobileShowcase.show('<')}else if(browserShowcase){browserShowcase.show('<')}})}})}
App.prototype.initMenu=function(){this.log('Initializing navigation menu')
selector.nav.flyout({debug:this.opts.debug,namespace:'navigation',trigger:{close:'.js-menu-close',open:'.js-menu-open'}})}
App.prototype.initFlyout=function(){this.log('Initializing flyout menu')
selector.flyout.flyout({debug:this.opts.debug,namespace:'about-me',trigger:{open:'.js-flyout'},className:{opened:'flyout_open'}})}
App.prototype.enableSmoothScroll=function(){this.log('Enabling smooth scrolling for links')
var opts=this.opts
selector.scrollable.on('click',function(event){event.preventDefault()
var href=$(this).attr('href')
var $el=$(href.substr(1,href.length))
selector.htmlbody.animate({scrollTop:$el.offset().top},opts.speed,opts.ease)})}
App.prototype.fadeBanner=function(){this.log('Fading banners on scroll')
var element,height,top,offsetTop,textOpacity,i,len
var elements=selector.fadeable
selector.window.on('scroll',function(){top=selector.window.scrollTop()
for(i=0,len=elements.length;i<len;++i){element=$(elements[i])
height=element.innerHeight()
offsetTop=element.offset().top
textOpacity=Math.round((1-((top-offsetTop)/height))*100)/100
textOpacity=(textOpacity>=0&&textOpacity<=1)?textOpacity:1
element.css('opacity',textOpacity)}})}
App.prototype.init=function(){this.initMenu()
this.initFlyout()
this.initGallery()
this.enableSmoothScroll()}
var app=App({debug:false,name:'app',speed:600,ease:'swing'})
selector.document.ready(function(){app.init()})}(window.jQuery))