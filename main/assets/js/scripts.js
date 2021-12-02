function Util(){}Util.hasClass=function(e,t){return e.classList.contains(t)},Util.addClass=function(e,t){t=t.split(" ");e.classList.add(t[0]),1<t.length&&Util.addClass(e,t.slice(1).join(" "))},Util.removeClass=function(e,t){t=t.split(" ");e.classList.remove(t[0]),1<t.length&&Util.removeClass(e,t.slice(1).join(" "))},Util.toggleClass=function(e,t,n){n?Util.addClass(e,t):Util.removeClass(e,t)},Util.setAttributes=function(e,t){for(var n in t)e.setAttribute(n,t[n])},Util.getChildrenByClassName=function(e,t){for(var n=e.children,i=[],s=0;s<n.length;s++)Util.hasClass(n[s],t)&&i.push(n[s]);return i},Util.is=function(e,t){if(t.nodeType)return e===t;for(var n="string"==typeof t?document.querySelectorAll(t):t,i=n.length;i--;)if(n[i]===e)return!0;return!1},Util.setHeight=function(n,i,s,o,a,r){function l(e){var t=e-(u=u||e);o<t&&(t=o),e=parseInt(t/o*d+n),r&&(e=Math[r](t,n,i-n,o)),s.style.height=e+"px",t<o?window.requestAnimationFrame(l):a&&a()}var d=i-n,u=null;s.style.height=n+"px",window.requestAnimationFrame(l)},Util.scrollTo=function(n,i,s,e){var o=e||window,a=o.scrollTop||document.documentElement.scrollTop,r=null;e||(a=window.scrollY||document.documentElement.scrollTop);function l(e){var t=e-(r=r||e);i<t&&(t=i),e=Math.easeInOutQuad(t,a,n-a,i),o.scrollTo(0,e),t<i?window.requestAnimationFrame(l):s&&s()}window.requestAnimationFrame(l)},Util.moveFocus=function(e){(e=e||document.getElementsByTagName("body")[0]).focus(),document.activeElement!==e&&(e.setAttribute("tabindex","-1"),e.focus())},Util.getIndexInArray=function(e,t){return Array.prototype.indexOf.call(e,t)},Util.cssSupports=function(e,t){return"CSS"in window?CSS.supports(e,t):e.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})in document.body.style},Util.extend=function(){var n={},i=!1,e=0,t=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(i=arguments[0],e++);for(;e<t;e++)!function(e){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(i&&"[object Object]"===Object.prototype.toString.call(e[t])?n[t]=extend(!0,n[t],e[t]):n[t]=e[t])}(arguments[e]);return n},Util.osHasReducedMotion=function(){if(!window.matchMedia)return!1;var e=window.matchMedia("(prefers-reduced-motion: reduce)");return!!e&&e.matches},Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;if(!document.documentElement.contains(t))return null;do{if(t.matches(e))return t}while(null!==(t=t.parentElement||t.parentNode)&&1===t.nodeType);return null});{function CustomEvent(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}"function"!=typeof window.CustomEvent&&(CustomEvent.prototype=window.Event.prototype,window.CustomEvent=CustomEvent)}function resetFocusTabsStyle(){window.dispatchEvent(new CustomEvent("initFocusTabs"))}if(Math.easeInOutQuad=function(e,t,n,i){return(e/=i/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},Math.easeInQuart=function(e,t,n,i){return n*(e/=i)*e*e*e+t},Math.easeOutQuart=function(e,t,n,i){return e/=i,-n*(--e*e*e*e-1)+t},Math.easeInOutQuart=function(e,t,n,i){return(e/=i/2)<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t},Math.easeOutElastic=function(e,t,n,i){var s=1.70158,o=.7*i,a=n;return 0==e?t:1==(e/=i)?t+n:(o=o||.3*i,s=a<Math.abs(n)?(a=n,o/4):o/(2*Math.PI)*Math.asin(n/a),a*Math.pow(2,-10*e)*Math.sin((e*i-s)*(2*Math.PI)/o)+n+t)},function(){var i=document.getElementsByClassName("js-tab-focus"),e=!1,t=!1,n=!1;function s(){0<i.length&&(a(!1),window.addEventListener("keydown",o)),window.removeEventListener("mousedown",s),n=!(t=!1)}function o(e){9===e.keyCode&&(a(!0),window.removeEventListener("keydown",o),window.addEventListener("mousedown",s),t=!0)}function a(e){for(var t=e?"":"none",n=0;n<i.length;n++)i[n].style.setProperty("outline",t)}function r(){e?n&&a(t):(e=0<i.length,window.addEventListener("mousedown",s))}r(),window.addEventListener("initFocusTabs",r)}(),window.menuAim=function(e){!function(e){function t(e){window.requestAnimationFrame?window.requestAnimationFrame(function(){n(e)}):n(e)}function n(e){c.push({x:e.pageX,y:e.pageY}),c.length>l&&c.shift()}function i(){r&&clearTimeout(r),h.exitMenu(this)&&(u&&h.deactivate(u),u=null)}function s(){r&&clearTimeout(r),h.enter(this),g(this)}function o(){h.exit(this)}function a(){d(this)}var u=null,c=[],m=null,r=null,h=Util.extend({menu:"",rows:!1,submenuSelector:"*",submenuDirection:"right",tolerance:75,enter:function(){},exit:function(){},activate:function(){},deactivate:function(){},exitMenu:function(){}},e),v=h.menu,l=3,d=function(e){e!=u&&(u&&h.deactivate(u),h.activate(e),u=e)},g=function(e){var t=f();t?r=setTimeout(function(){g(e)},t):d(e)},f=function(){if(!u||!Util.is(u,h.submenuSelector))return 0;var e,t={top:(e=(e=v).getBoundingClientRect()).top+window.pageYOffset,left:e.left+window.pageXOffset},n={x:t.left,y:t.top-h.tolerance},i={x:t.left+v.offsetWidth,y:n.y},s={x:t.left,y:t.top+v.offsetHeight+h.tolerance},o={x:t.left+v.offsetWidth,y:s.y},a=c[c.length-1],r=c[0];if(!a)return 0;if((r=r||a).x<t.left||r.x>o.x||r.y<t.top||r.y>o.y)return 0;if(m&&a.x==m.x&&a.y==m.y)return 0;function l(e,t){return(t.y-e.y)/(t.x-e.x)}var d=i,t=o;"left"==h.submenuDirection?(d=s,t=n):"below"==h.submenuDirection?(d=o,t=s):"above"==h.submenuDirection&&(d=n,t=i);n=l(a,d),i=l(a,t),d=l(r,d),t=l(r,t);return n<d&&t<i?(m=a,300):(m=null,0)};v.addEventListener("mouseleave",i);var p=h.rows||v.children;if(0<p.length)for(var w=0;w<p.length;w++)!function(e){p[e].addEventListener("mouseenter",s),p[e].addEventListener("mouseleave",o),p[e].addEventListener("click",a)}(w);document.addEventListener("mousemove",t),v.addEventListener("reset",function(e){e=e.detail,r&&clearTimeout(r),u&&e&&h.deactivate(u),u=null}),v.addEventListener("destroy",function(){if(v.removeEventListener("mouseleave",i),document.removeEventListener("mousemove",t),0<p.length)for(var e=0;e<p.length;e++)p[e].removeEventListener("mouseenter",s),p[e].removeEventListener("mouseleave",o),p[e].removeEventListener("click",a)})}(e)},function(){var s,o,a,t,r,n,l=document.getElementsByClassName("reveal-fx"),i="IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype;function d(){for(var e=0;e<l.length;e++)n[e]=new IntersectionObserver(function(e,t){e[0].isIntersecting&&(function(e){e=Util.getIndexInArray(l,e);-1==a.indexOf(e)&&(m(e),a.push(e),v(),o=!1)}(e[0].target),t.unobserve(e[0].target))},{rootMargin:"0px 0px -"+r[e]+"px 0px"}),n[e].observe(l[e])}function u(){o||(o=!0,window.requestAnimationFrame?window.requestAnimationFrame(e):setTimeout(function(){e()},250))}function e(){s=window.innerHeight,c()}function c(){for(var e,t,n,i=0;i<l.length;i++)e=i,n=t=void 0,-1==a.indexOf(e)&&(t=l[e],n=e,t.getBoundingClientRect().top<=s-r[n]&&(m(e),a.push(e)));v(),o=!1}function m(e){t[e]&&0!=t[e]?setTimeout(function(){Util.addClass(l[e],"reveal-fx--is-visible")},t[e]):Util.addClass(l[e],"reveal-fx--is-visible")}function h(e){return"reveal-fx"!=window.getComputedStyle(e,"::before").getPropertyValue("content").replace(/'|"/g,"")}function v(){l.length>a.length||(window.removeEventListener("load",c),window.removeEventListener("resize",u))}0<l.length&&(!Util.osHasReducedMotion()&&i?h(l[0])?function(){for(var e=0;e<l.length;e++)Util.addClass(l[e],"reveal-fx--is-visible")}():(s=window.innerHeight,o=!1,a=[],t=function(){for(var e=[],t=0;t<l.length;t++)e.push(l[t].getAttribute("data-reveal-fx-delay")?parseInt(l[t].getAttribute("data-reveal-fx-delay")):0);return e}(),r=function(){for(var e=[],t=0;t<l.length;t++)e.push(l[t].getAttribute("data-reveal-fx-delta")?parseInt(l[t].getAttribute("data-reveal-fx-delta")):120);return e}(),window.addEventListener("load",c),window.addEventListener("resize",u),window.addEventListener("restartAll",function(){if(!Util.osHasReducedMotion()&&i&&!h(l[0])){l.length<=a.length&&(window.addEventListener("load",c),window.addEventListener("resize",u));for(var e=0;e<n.length;e++)n[e]&&n[e].disconnect();n=[];for(e=0;e<l.length;e++)Util.removeClass(l[e],"reveal-fx--is-visible");a=[],d()}}),n=[],d()):function(){for(;l[0];){var e=l[0].getAttribute("class").split(" ").filter(function(e){return 0!==e.lastIndexOf("reveal-fx--",0)});l[0].setAttribute("class",e.join(" ").trim()),Util.removeClass(l[0],"reveal-fx")}}())}(),function(){function e(e){this.element=e,this.tabList=this.element.getElementsByClassName("js-tabs__controls")[0],this.listItems=this.tabList.getElementsByTagName("li"),this.triggers=this.tabList.getElementsByTagName("a"),this.panelsList=this.element.getElementsByClassName("js-tabs__panels")[0],this.panels=Util.getChildrenByClassName(this.panelsList,"js-tabs__panel"),this.hideClass="is-hidden",this.customShowClass=!!this.element.getAttribute("data-show-panel-class")&&this.element.getAttribute("data-show-panel-class"),this.layout=this.element.getAttribute("data-tabs-layout")?this.element.getAttribute("data-tabs-layout"):"horizontal",this.deepLinkOn="on"==this.element.getAttribute("data-deep-link"),this.initTab()}e.prototype.initTab=function(){this.tabList.setAttribute("role","tablist");for(var e=0;e<this.triggers.length;e++){var t=0==e,n=this.panels[e].getAttribute("id");this.listItems[e].setAttribute("role","presentation"),Util.setAttributes(this.triggers[e],{role:"tab","aria-selected":t,"aria-controls":n,id:"tab-"+n}),Util.addClass(this.triggers[e],"js-tabs__trigger"),Util.setAttributes(this.panels[e],{role:"tabpanel","aria-labelledby":"tab-"+n}),Util.toggleClass(this.panels[e],this.hideClass,!t),t||this.triggers[e].setAttribute("tabindex","-1")}this.initTabEvents(),this.initDeepLink()},e.prototype.initTabEvents=function(){var i=this;this.tabList.addEventListener("click",function(e){e.target.closest(".js-tabs__trigger")&&i.triggerTab(e.target.closest(".js-tabs__trigger"),e)}),this.tabList.addEventListener("keydown",function(e){var t,n;e.target.closest(".js-tabs__trigger")&&(t=e,"horizontal"==(n=i.layout)&&(t.keyCode&&39==t.keyCode||t.key&&"ArrowRight"==t.key)||"vertical"==n&&(t.keyCode&&40==t.keyCode||t.key&&"ArrowDown"==t.key)?(e.preventDefault(),i.selectNewTab("next")):(n=e,("horizontal"==(t=i.layout)&&(n.keyCode&&37==n.keyCode||n.key&&"ArrowLeft"==n.key)||"vertical"==t&&(n.keyCode&&38==n.keyCode||n.key&&"ArrowUp"==n.key))&&(e.preventDefault(),i.selectNewTab("prev"))))})},e.prototype.selectNewTab=function(e){var t=this.tabList.querySelector('[aria-selected="true"]'),t=Util.getIndexInArray(this.triggers,t);(t=(t="next"==e?t+1:t-1)<0?this.listItems.length-1:t)>=this.listItems.length&&(t=0),this.triggerTab(this.triggers[t]),this.triggers[t].focus()},e.prototype.triggerTab=function(e,t){t&&t.preventDefault();var n=Util.getIndexInArray(this.triggers,e);if("true"!=this.triggers[n].getAttribute("aria-selected")){for(var i=0;i<this.triggers.length;i++){var s=i==n;Util.toggleClass(this.panels[i],this.hideClass,!s),this.customShowClass&&Util.toggleClass(this.panels[i],this.customShowClass,s),this.triggers[i].setAttribute("aria-selected",s),s?this.triggers[i].setAttribute("tabindex","0"):this.triggers[i].setAttribute("tabindex","-1")}this.deepLinkOn&&history.replaceState(null,"","#"+e.getAttribute("aria-controls"))}},e.prototype.initDeepLink=function(){if(this.deepLinkOn){var e=window.location.hash.substr(1),t=this;if(e&&""!=e)for(var n=0;n<this.panels.length;n++)if(this.panels[n].getAttribute("id")==e){this.triggerTab(this.triggers[n],!1),setTimeout(function(){t.panels[n].scrollIntoView(!0)});break}}};var t=document.getElementsByClassName("js-tabs");if(0<t.length)for(var n=0;n<t.length;n++)new e(t[n])}(),function(){function e(e){this.element=e,this.sections=this.element.getElementsByClassName("js-v-timeline__section"),this.animate=!(!this.element.getAttribute("data-animation")||"on"!=this.element.getAttribute("data-animation")),this.animationClass="v-timeline__section--animate",this.animationDelta="-150px",function(e){if(e.animate)for(var t=0;t<e.sections.length;t++)new IntersectionObserver(n.bind(e,t),{rootMargin:"0px 0px "+e.animationDelta+" 0px"}).observe(e.sections[t])}(this)}function n(e,t,n){t[0].isIntersecting&&(Util.addClass(this.sections[e],this.animationClass),n.unobserve(this.sections[e]))}var t=document.querySelectorAll(".js-v-timeline"),i="IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype,s=Util.osHasReducedMotion();if(0<t.length)for(var o=0;o<t.length;o++)i&&!s?new e(t[o]):t[o].removeAttribute("data-animation")}(),function(){function e(e){this.element=e,this.trigger=this.element.getElementsByClassName("js-dropdown__trigger")[0],this.dropdown=this.element.getElementsByClassName("js-dropdown__menu")[0],this.triggerFocus=!1,this.dropdownFocus=!1,this.hideInterval=!1,this.dropdownSubElements=this.element.getElementsByClassName("js-dropdown__sub-wrapper"),this.prevFocus=!1,this.addDropdownEvents()}e.prototype.addDropdownEvents=function(){var t=this;this.placeElement(),this.element.addEventListener("placeDropdown",function(e){t.placeElement()}),this.initElementEvents(this.trigger,this.triggerFocus),this.initElementEvents(this.dropdown,this.dropdownFocus),this.initSublevels()},e.prototype.placeElement=function(){this.dropdown.removeAttribute("style");var e=this.trigger.getBoundingClientRect(),e=window.innerWidth<e.left+parseInt(getComputedStyle(this.dropdown).getPropertyValue("width"));this.dropdown.setAttribute("style",e?"right: 0px; left: auto;":"left: 0px; right: auto;")},e.prototype.initElementEvents=function(e,t){var n=this;e.addEventListener("mouseenter",function(){n.showDropdown()}),e.addEventListener("focus",function(){n.showDropdown()}),e.addEventListener("mouseleave",function(){n.hideDropdown()}),e.addEventListener("focusout",function(){n.hideDropdown()})},e.prototype.showDropdown=function(){this.hideInterval&&clearInterval(this.hideInterval),this.dropdown.removeAttribute("style"),this.placeElement(),this.showLevel(this.dropdown,!0)},e.prototype.hideDropdown=function(){var t=this;this.hideInterval&&clearInterval(this.hideInterval),this.hideInterval=setTimeout(function(){var e=document.activeElement.closest(".js-dropdown"),e=e&&e==t.element;t.triggerFocus||t.dropdownFocus||e||(t.hideLevel(t.dropdown,!0),t.hideSubLevels(),t.prevFocus=!1)},300)},e.prototype.initSublevels=function(){for(var s=this,e=this.element.getElementsByClassName("js-dropdown__menu"),t=0;t<e.length;t++){e[t].children;new menuAim({menu:e[t],activate:function(e){var t=e.getElementsByClassName("js-dropdown__menu")[0];t&&(Util.addClass(e.querySelector("a"),"dropdown__item--hover"),s.showLevel(t))},deactivate:function(e){var t=e.getElementsByClassName("dropdown__menu")[0];t&&(Util.removeClass(e.querySelector("a"),"dropdown__item--hover"),s.hideLevel(t))},submenuSelector:".js-dropdown__sub-wrapper"})}this.element.addEventListener("keydown",function(e){(e.keyCode&&9==e.keyCode||e.key&&"Tab"==e.key)&&(s.prevFocus=document.activeElement)}),this.element.addEventListener("keyup",function(e){var t,n,i;(e.keyCode&&9==e.keyCode||e.key&&"Tab"==e.key)&&(i=(n=document.activeElement).closest(".js-dropdown__menu"),t=n.nextElementSibling,i&&!Util.hasClass(i,"dropdown__menu--is-visible")&&s.showLevel(i),t&&!Util.hasClass(t,"dropdown__menu--is-visible")&&s.showLevel(t),s.prevFocus&&(e=s.prevFocus.closest(".js-dropdown__menu"),n=s.prevFocus.nextElementSibling,e&&(i&&i==e?n&&s.hideLevel(n):n&&i&&i==n||t&&e&&t==e||((i=i.parentNode.closest(".js-dropdown__menu"))&&i==e?n&&s.hideLevel(n):e&&Util.hasClass(e,"dropdown__menu--is-visible")&&s.hideLevel(e)))))})},e.prototype.hideSubLevels=function(){var e=this.dropdown.getElementsByClassName("dropdown__menu--is-visible");if(0!=e.length){for(;e[0];)this.hideLevel(e[0]);for(var t=this.dropdown.getElementsByClassName("dropdown__item--hover");t[0];)Util.removeClass(t[0],"dropdown__item--hover")}},e.prototype.showLevel=function(e,t){null==t&&(Util.removeClass(e,"dropdown__menu--left"),t=e.getBoundingClientRect(),window.innerWidth-t.right<5&&t.left+window.scrollX>2*t.width&&Util.addClass(e,"dropdown__menu--left")),Util.addClass(e,"dropdown__menu--is-visible"),Util.removeClass(e,"dropdown__menu--is-hidden")},e.prototype.hideLevel=function(n,i){Util.hasClass(n,"dropdown__menu--is-visible")&&(Util.removeClass(n,"dropdown__menu--is-visible"),Util.addClass(n,"dropdown__menu--is-hidden"),n.addEventListener("transitionend",function e(t){"opacity"==t.propertyName&&(n.removeEventListener("transitionend",e),Util.removeClass(n,"dropdown__menu--is-hidden dropdown__menu--left"),i&&!Util.hasClass(n,"dropdown__menu--is-visible")&&n.setAttribute("style","width: 0px"))}))},window.Dropdown=e;var t=document.getElementsByClassName("js-dropdown");if(0<t.length)for(var n=0;n<t.length;n++)new e(t[n])}(),matchMedia){const qc=window.matchMedia("(max-width: 64rem)");qc.addListener(WidthChange),WidthChange(qc)}function WidthChange(e){if(e.matches){var t=document.getElementsByClassName("box-layout--hide");for(n=0;n<t.length;n++)t[n].classList.add("box-layout--hide-m")}else{var n,t=document.getElementsByClassName("box-layout--hide");for(n=0;n<t.length;n++)t[n].classList.remove("box-layout--hide-m")}}if(null!=document.getElementsByClassName("info-box__icon"))for(var iconContainer,iconSource=document.getElementsByClassName("info-box__icon"),i=0;i<iconSource.length;i++)""==iconSource[i].getAttribute("src")&&(iconContainer=document.getElementsByClassName("info-box__icon-container"))[i].classList.add("is-hidden");if(null!=document.getElementsByClassName("info-box"))for(var infoBox=document.getElementsByClassName("info-box"),i=0;i<infoBox.length;i++)infoBox[i].classList.contains("gradient-contrast--lighter")&&(document.getElementsByClassName("info-box__text-container")[i].classList.remove("color-white"),document.getElementsByClassName("info-box__title")[i].classList.remove("color-white"));if(null!=document.getElementsByClassName("info-box__title"))for(var infoTitle=document.getElementsByClassName("info-box__title"),i=0;i<infoTitle.length;i++)""==infoTitle[i].innerText&&(document.getElementsByClassName("info-box__title")[i].classList.add("is-hidden"),document.getElementsByClassName("info-box__text")[i].classList.remove("margin-top-sm"));!function(){function e(e){var t;this.element=e,this.search=this.element.getElementsByClassName("js-mega-nav__search"),this.searchActiveController=!1,this.menu=this.element.getElementsByClassName("js-mega-nav__nav"),this.menuItems=this.menu[0].getElementsByClassName("js-mega-nav__item"),this.menuActiveController=!1,this.itemExpClass="mega-nav__item--expanded",this.classIconBtn="mega-nav__icon-btn--state-b",this.classSearchVisible="mega-nav__search--is-visible",this.classNavVisible="mega-nav__nav--is-visible",this.classMobileLayout="mega-nav--mobile",this.classDesktopLayout="mega-nav--desktop",this.layout="mobile",this.dropdown=this.element.getElementsByClassName("js-dropdown"),this.expandedClass="mega-nav--expanded",this.hover=this.element.getAttribute("data-hover")&&"on"==this.element.getAttribute("data-hover"),n(t=this),function(n){if(0!=n.search.length){n.searchToggles=document.querySelectorAll('[aria-controls="'+n.search[0].getAttribute("id")+'"]');for(var e=0;e<n.searchToggles.length;e++)!function(t){n.searchToggles[t].addEventListener("click",function(e){s(n,n.search[0],"searchActiveController",n.classSearchVisible,n.searchToggles[t],!0),Util.hasClass(n.menu[0],n.classNavVisible)&&s(n,n.menu[0],"menuActiveController",n.classNavVisible,n.menuActiveController,!1),r(n,!1),d(n)})}(e)}}(t),function(n){if(0!=n.menu.length){n.menuToggles=document.querySelectorAll('[aria-controls="'+n.menu[0].getAttribute("id")+'"]');for(var e=0;e<n.menuToggles.length;e++)!function(t){n.menuToggles[t].addEventListener("click",function(e){s(n,n.menu[0],"menuActiveController",n.classNavVisible,n.menuToggles[t],!0),Util.hasClass(n.search[0],n.classSearchVisible)&&s(n,n.search[0],"searchActiveController",n.classSearchVisible,n.searchActiveController,!1),d(n)})}(e)}}(t),function(s){s.element.addEventListener("click",function(e){a(s,e,"click")}),s.hover&&(s.element.addEventListener("mouseover",function(e){"desktop"==s.layout&&a(s,e,"mouseover")}),s.element.addEventListener("mouseout",function(e){var t,n,i;"desktop"!=s.layout||(t=e.target.closest(".js-mega-nav__item"))&&((n=t.getElementsByClassName("js-mega-nav__control")).length<1||(i=Util.hasClass(t,s.itemExpClass))&&((e=e.relatedTarget)&&t.contains(e)||(Util.toggleClass(t,s.itemExpClass,!i),i?n[0].removeAttribute("aria-expanded"):n[0].setAttribute("aria-expanded","true"))))}))}(t),t.element.addEventListener("update-menu-layout",function(e){n(t)})}function n(e){var t=getComputedStyle(e.element,":before").getPropertyValue("content").replace(/\'|"/g,"");t!=e.layout&&(e.layout=t,Util.toggleClass(e.element,e.classDesktopLayout,"desktop"==e.layout),Util.toggleClass(e.element,e.classMobileLayout,"desktop"!=e.layout),"desktop"==e.layout&&(r(e,!1),function(e){if(0!=e.dropdown.length)for(var t=0;t<e.dropdown.length;t++)e.dropdown[t].dispatchEvent(new CustomEvent("placeDropdown"))}(e)),o(e,!1),document.documentElement.style.setProperty("--mega-nav-offset-y",e.element.getBoundingClientRect().top+"px"),d(e))}function i(e){o(e),Util.hasClass(e.menu[0],e.classNavVisible)&&s(e,e.menu[0],"menuActiveController",e.classNavVisible,e.menuActiveController,!0),r(e,!1),d(e)}function o(e,t){e.search.length<1||Util.hasClass(e.search[0],e.classSearchVisible)&&s(e,e.search[0],"searchActiveController",e.classSearchVisible,e.searchActiveController,t)}function s(e,t,n,i,s,o){var a=Util.hasClass(t,i);Util.toggleClass(t,i,!a),Util.toggleClass(s,e.classIconBtn,!a),a?s.removeAttribute("aria-expanded"):s.setAttribute("aria-expanded","true"),a?(s&&o&&s.focus(),e[n]=!1):(s&&(e[n]=s),function(e){for(var t=e.querySelectorAll('[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary'),n=!1,i=0;i<t.length;i++)if(t[i].offsetWidth||t[i].offsetHeight||t[i].getClientRects().length){n=t[i];break}return n}(t).focus())}function a(e,t,n){var i,s=t.target.closest(".js-mega-nav__control");!s||(i=s.closest(".js-mega-nav__item"))&&(t=Util.hasClass(i,e.itemExpClass),e.hover&&t&&"desktop"==e.layout&&"click"!=n||(Util.toggleClass(i,e.itemExpClass,!t),t?s.removeAttribute("aria-expanded"):s.setAttribute("aria-expanded","true"),"desktop"!=e.layout||t||r(e,i),o(e,!1),d(e)))}function r(e,t){if(0!=e.menuItems.length)for(var n=0;n<e.menuItems.length;n++)e.menuItems[n]!=t&&l(e,n)}function l(e,t){Util.removeClass(e.menuItems[t],e.itemExpClass);t=e.menuItems[t].getElementsByClassName("js-mega-nav__control");0<t.length&&t[0].removeAttribute("aria-expanded")}function d(e){0<e.element.getElementsByClassName(e.itemExpClass).length&&"desktop"==e.layout||0<e.element.getElementsByClassName(e.classSearchVisible).length||0<e.element.getElementsByClassName(e.classNavVisible).length&&"mobile"==e.layout?Util.addClass(e.element,e.expandedClass):Util.removeClass(e.element,e.expandedClass)}var t,u=document.getElementsByClassName("js-mega-nav");if(0<u.length){for(var c=[],m=0;m<u.length;m++)t=m,c.push(new e(u[t]));window.addEventListener("keyup",function(e){if(e.keyCode&&27==e.keyCode||e.key&&"escape"==e.key.toLowerCase())for(var t=0;t<c.length;t++)i(c[t]);if(e.keyCode&&9==e.keyCode||e.key&&"tab"==e.key.toLowerCase())for(t=0;t<c.length;t++)!function(e){Util.hasClass(e.search[0],e.classSearchVisible)&&!document.activeElement.closest(".js-mega-nav__search")&&s(e,e.search[0],"searchActiveController",e.classSearchVisible,e.searchActiveController,!0),Util.hasClass(e.menu[0],e.classNavVisible)&&!document.activeElement.closest(".js-mega-nav__nav")&&s(e,e.menu[0],"menuActiveController",e.classNavVisible,e.menuActiveController,!0);for(var t,n=0;n<e.menuItems.length;n++)Util.hasClass(e.menuItems[n],e.itemExpClass)&&((t=document.activeElement.closest(".js-mega-nav__item"))&&t==e.menuItems[n]||l(e,n));d(e)}(c[t])}),window.addEventListener("click",function(e){e.target.closest(".js-mega-nav")||i(c[0])});var h=!1,v=new CustomEvent("update-menu-layout");function g(){for(var e=0;e<c.length;e++)c[e].element.dispatchEvent(v)}window.addEventListener("resize",function(e){clearTimeout(h),h=setTimeout(g,200)}),window.requestAnimationFrame?window.requestAnimationFrame(g):g()}}();