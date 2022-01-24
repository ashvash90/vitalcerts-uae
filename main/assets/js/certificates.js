// File#: _1_accordion
// Usage: codyhouse.co/license
(function () {
  var Accordion = function (element) {
    this.element = element;
    this.items = Util.getChildrenByClassName(
      this.element,
      "js-accordion__item"
    );
    this.version = this.element.getAttribute("data-version")
      ? "-" + this.element.getAttribute("data-version")
      : "";
    this.showClass = "accordion" + this.version + "__item--is-open";
    this.animateHeight = this.element.getAttribute("data-animation") == "on";
    this.multiItems = !(this.element.getAttribute("data-multi-items") == "off");
    // deep linking options
    this.deepLinkOn = this.element.getAttribute("data-deep-link") == "on";
    // init accordion
    this.initAccordion();
  };

  Accordion.prototype.initAccordion = function () {
    //set initial aria attributes
    for (var i = 0; i < this.items.length; i++) {
      var button = this.items[i].getElementsByTagName("button")[0],
        content = this.items[i].getElementsByClassName(
          "js-accordion__panel"
        )[0],
        isOpen = Util.hasClass(this.items[i], this.showClass)
          ? "true"
          : "false";
      Util.setAttributes(button, {
        "aria-expanded": isOpen,
        "aria-controls": "accordion-content-" + i,
        id: "accordion-header-" + i,
      });
      Util.addClass(button, "js-accordion__trigger");
      Util.setAttributes(content, {
        "aria-labelledby": "accordion-header-" + i,
        id: "accordion-content-" + i,
      });
    }

    //listen for Accordion events
    this.initAccordionEvents();

    // check deep linking option
    this.initDeepLink();
  };

  Accordion.prototype.initAccordionEvents = function () {
    var self = this;

    this.element.addEventListener("click", function (event) {
      var trigger = event.target.closest(".js-accordion__trigger");
      //check index to make sure the click didn't happen inside a children accordion
      if (
        trigger &&
        Util.getIndexInArray(self.items, trigger.parentElement) >= 0
      )
        self.triggerAccordion(trigger);
    });
  };

  Accordion.prototype.triggerAccordion = function (trigger) {
    var bool = trigger.getAttribute("aria-expanded") === "true";

    this.animateAccordion(trigger, bool, false);

    if (!bool && this.deepLinkOn) {
      history.replaceState(
        null,
        "",
        "#" + trigger.getAttribute("aria-controls")
      );
    }
  };

  Accordion.prototype.animateAccordion = function (trigger, bool, deepLink) {
    var self = this;
    var item = trigger.closest(".js-accordion__item"),
      content = item.getElementsByClassName("js-accordion__panel")[0],
      ariaValue = bool ? "false" : "true";

    if (!bool) Util.addClass(item, this.showClass);
    trigger.setAttribute("aria-expanded", ariaValue);
    self.resetContentVisibility(item, content, bool);

    if ((!this.multiItems && !bool) || deepLink) this.closeSiblings(item);
  };

  Accordion.prototype.resetContentVisibility = function (item, content, bool) {
    Util.toggleClass(item, this.showClass, !bool);
    content.removeAttribute("style");
    if (bool && !this.multiItems) {
      // accordion item has been closed -> check if there's one open to move inside viewport
      this.moveContent();
    }
  };

  Accordion.prototype.closeSiblings = function (item) {
    //if only one accordion can be open -> search if there's another one open
    var index = Util.getIndexInArray(this.items, item);
    for (var i = 0; i < this.items.length; i++) {
      if (Util.hasClass(this.items[i], this.showClass) && i != index) {
        this.animateAccordion(
          this.items[i].getElementsByClassName("js-accordion__trigger")[0],
          true,
          false
        );
        return false;
      }
    }
  };

  Accordion.prototype.moveContent = function () {
    // make sure title of the accordion just opened is inside the viewport
    var openAccordion = this.element.getElementsByClassName(this.showClass);
    if (openAccordion.length == 0) return;
    var boundingRect = openAccordion[0].getBoundingClientRect();
    if (boundingRect.top < 0 || boundingRect.top > window.innerHeight) {
      var windowScrollTop =
        window.scrollY || document.documentElement.scrollTop;
      window.scrollTo(0, boundingRect.top + windowScrollTop);
    }
  };

  Accordion.prototype.initDeepLink = function () {
    if (!this.deepLinkOn) return;
    var hash = window.location.hash.substr(1);
    if (!hash || hash == "") return;
    var trigger = this.element.querySelector(
      '.js-accordion__trigger[aria-controls="' + hash + '"]'
    );
    if (trigger && trigger.getAttribute("aria-expanded") !== "true") {
      this.animateAccordion(trigger, false, true);
      setTimeout(function () {
        trigger.scrollIntoView(true);
      });
    }
  };

  window.Accordion = Accordion;

  //initialize the Accordion objects
  var accordions = document.getElementsByClassName("js-accordion");
  if (accordions.length > 0) {
    for (var i = 0; i < accordions.length; i++) {
      (function (i) {
        new Accordion(accordions[i]);
      })(i);
    }
  }
})();

// File#: _1_tabs
// Usage: codyhouse.co/license
(function () {
  var Tab = function (element) {
    this.element = element;
    this.tabList = this.element.getElementsByClassName("js-tabs__controls")[0];
    this.listItems = this.tabList.getElementsByTagName("li");
    this.triggers = this.tabList.getElementsByTagName("a");
    this.panelsList = this.element.getElementsByClassName("js-tabs__panels")[0];
    this.panels = Util.getChildrenByClassName(
      this.panelsList,
      "js-tabs__panel"
    );
    this.hideClass = "is-hidden";
    this.customShowClass = this.element.getAttribute("data-show-panel-class")
      ? this.element.getAttribute("data-show-panel-class")
      : false;
    this.layout = this.element.getAttribute("data-tabs-layout")
      ? this.element.getAttribute("data-tabs-layout")
      : "horizontal";
    // deep linking options
    this.deepLinkOn = this.element.getAttribute("data-deep-link") == "on";
    // init tabs
    this.initTab();
  };

  Tab.prototype.initTab = function () {
    //set initial aria attributes
    this.tabList.setAttribute("role", "tablist");
    for (var i = 0; i < this.triggers.length; i++) {
      var bool = i == 0,
        panelId = this.panels[i].getAttribute("id");
      this.listItems[i].setAttribute("role", "presentation");
      Util.setAttributes(this.triggers[i], {
        role: "tab",
        "aria-selected": bool,
        "aria-controls": panelId,
        id: "tab-" + panelId,
      });
      Util.addClass(this.triggers[i], "js-tabs__trigger");
      Util.setAttributes(this.panels[i], {
        role: "tabpanel",
        "aria-labelledby": "tab-" + panelId,
      });
      Util.toggleClass(this.panels[i], this.hideClass, !bool);

      if (!bool) this.triggers[i].setAttribute("tabindex", "-1");
    }

    //listen for Tab events
    this.initTabEvents();

    // check deep linking option
    this.initDeepLink();
  };

  Tab.prototype.initTabEvents = function () {
    var self = this;
    //click on a new tab -> select content
    this.tabList.addEventListener("click", function (event) {
      if (event.target.closest(".js-tabs__trigger"))
        self.triggerTab(event.target.closest(".js-tabs__trigger"), event);
    });
    //arrow keys to navigate through tabs
    this.tabList.addEventListener("keydown", function (event) {
      if (!event.target.closest(".js-tabs__trigger")) return;
      if (tabNavigateNext(event, self.layout)) {
        event.preventDefault();
        self.selectNewTab("next");
      } else if (tabNavigatePrev(event, self.layout)) {
        event.preventDefault();
        self.selectNewTab("prev");
      }
    });
  };

  Tab.prototype.selectNewTab = function (direction) {
    var selectedTab = this.tabList.querySelector('[aria-selected="true"]'),
      index = Util.getIndexInArray(this.triggers, selectedTab);
    index = direction == "next" ? index + 1 : index - 1;
    //make sure index is in the correct interval
    //-> from last element go to first using the right arrow, from first element go to last using the left arrow
    if (index < 0) index = this.listItems.length - 1;
    if (index >= this.listItems.length) index = 0;
    this.triggerTab(this.triggers[index]);
    this.triggers[index].focus();
  };

  Tab.prototype.triggerTab = function (tabTrigger, event) {
    var self = this;
    event && event.preventDefault();
    var index = Util.getIndexInArray(this.triggers, tabTrigger);
    //no need to do anything if tab was already selected
    if (this.triggers[index].getAttribute("aria-selected") == "true") return;

    for (var i = 0; i < this.triggers.length; i++) {
      var bool = i == index;
      Util.toggleClass(this.panels[i], this.hideClass, !bool);
      if (this.customShowClass)
        Util.toggleClass(this.panels[i], this.customShowClass, bool);
      this.triggers[i].setAttribute("aria-selected", bool);
      bool
        ? this.triggers[i].setAttribute("tabindex", "0")
        : this.triggers[i].setAttribute("tabindex", "-1");
    }

    // update url if deepLink is on
    if (this.deepLinkOn) {
      history.replaceState(
        null,
        "",
        "#" + tabTrigger.getAttribute("aria-controls")
      );
    }
  };

  Tab.prototype.initDeepLink = function () {
    if (!this.deepLinkOn) return;
    var hash = window.location.hash.substr(1);
    var self = this;
    if (!hash || hash == "") return;
    for (var i = 0; i < this.panels.length; i++) {
      if (this.panels[i].getAttribute("id") == hash) {
        this.triggerTab(this.triggers[i], false);
        setTimeout(function () {
          self.panels[i].scrollIntoView(true);
        });
        break;
      }
    }
  };

  function tabNavigateNext(event, layout) {
    if (
      layout == "horizontal" &&
      ((event.keyCode && event.keyCode == 39) ||
        (event.key && event.key == "ArrowRight"))
    ) {
      return true;
    } else if (
      layout == "vertical" &&
      ((event.keyCode && event.keyCode == 40) ||
        (event.key && event.key == "ArrowDown"))
    ) {
      return true;
    } else {
      return false;
    }
  }

  function tabNavigatePrev(event, layout) {
    if (
      layout == "horizontal" &&
      ((event.keyCode && event.keyCode == 37) ||
        (event.key && event.key == "ArrowLeft"))
    ) {
      return true;
    } else if (
      layout == "vertical" &&
      ((event.keyCode && event.keyCode == 38) ||
        (event.key && event.key == "ArrowUp"))
    ) {
      return true;
    } else {
      return false;
    }
  }

  //initialize the Tab objects
  var tabs = document.getElementsByClassName("js-tabs");
  if (tabs.length > 0) {
    for (var i = 0; i < tabs.length; i++) {
      (function (i) {
        new Tab(tabs[i]);
      })(i);
    }
  }
})();
