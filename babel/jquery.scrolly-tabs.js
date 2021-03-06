(function(global, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function($) {
      return factory($, global, global.document);
    });
  } else if (typeof exports === "object" && exports) {
    module.exports = factory(require('jquery'), global, global.document);
  } else {
    factory(jQuery, global, global.document);
  }

})(typeof window !== 'undefined' ? window : this, function($, window, document, undefined) {

  // -- Name is used to keep jQuery plugin template portable
  const pluginName = 'scrollyTabs';

  // -- Globals (shared across all plugin instances)
  const defaultOptions = {};

  const $window = $(window);
  const $document = $(document);

  // -- Plugin constructor
  // Using p object as placeholder, together with pluginName to make jQuery plugin template portable
  const p = {};
  p[pluginName] = class {
    constructor(el, opts) {
      this.el = el;
      this.$el = $(el);
      this.opts = $.extend({}, defaultOptions, opts);

      this._defaultOptions = defaultOptions;

      this.defaultTab = $(el).find('.active');

      this.init();
    }

    scrollToTab(target) {
      const $target = $(target);
      const $el = this.$el;

      let maxScrollLeft = $el.scrollLeft(`#${$el.id}`).prop('scrollWidth') - $el.width();
      let left = $target.offset().left;
      let width = $el.width();
      let diff = left - width + (width / 2) + ($target.width() /2);
      $el.scrollLeft($el.scrollLeft() + diff);
    }

    selectTab() {
      const $el = this.$el;
      let scope = this;
      $el.find('li').on('click', function() {
        $el.find('li').each(function() {
          $el.find('li').removeClass('active');
        });
        $(this).addClass('active');
        scope.scrollToTab(this);
      });
    }

    centerDefaultTab() {
      this.defaultTab && this.scrollToTab(this.defaultTab);
    }

    init() {
      this.centerDefaultTab();
      this.selectTab();
    }

  }

  // -- Prevent multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new p[pluginName](this, options));
      }
    });
  };

});

$('#scrollyTabs').scrollyTabs();
