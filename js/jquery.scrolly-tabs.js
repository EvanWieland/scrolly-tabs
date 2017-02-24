'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], function ($) {
      return factory($, global, global.document);
    });
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === "object" && exports) {
    module.exports = factory(require('jquery'), global, global.document);
  } else {
    factory(jQuery, global, global.document);
  }
})(typeof window !== 'undefined' ? window : undefined, function ($, window, document, undefined) {

  // -- Name is used to keep jQuery plugin template portable
  var pluginName = 'scrollyTabs';

  // -- Globals (shared across all plugin instances)
  var defaultOptions = {};

  var $window = $(window);
  var $document = $(document);

  // -- Plugin constructor
  // Using p object as placeholder, together with pluginName to make jQuery plugin template portable
  var p = {};
  p[pluginName] = function () {
    function _class(el, opts) {
      _classCallCheck(this, _class);

      this.el = el;
      this.$el = $(el);
      this.opts = $.extend({}, defaultOptions, opts);

      this._defaultOptions = defaultOptions;

      this.defaultTab = $(el).find('.active');

      this.init();
    }

    _class.prototype.scrollToTab = function scrollToTab(target) {
      var $target = $(target);
      var $el = this.$el;

      var maxScrollLeft = $el.scrollLeft('#' + $el.id).prop('scrollWidth') - $el.width();
      var left = $target.offset().left;
      var width = $el.width();
      var diff = left - width + width / 2 + $target.width() / 2;
      $el.scrollLeft($el.scrollLeft() + diff);
    };

    _class.prototype.selectTab = function selectTab() {
      var $el = this.$el;
      var scope = this;
      $el.find('li').on('click', function () {
        $el.find('li').each(function () {
          $el.find('li').removeClass('active');
        });
        $(this).addClass('active');
        scope.scrollToTab(this);
      });
    };

    _class.prototype.centerDefaultTab = function centerDefaultTab() {
      this.defaultTab && this.scrollToTab(this.defaultTab);
    };

    _class.prototype.init = function init() {
      this.centerDefaultTab();
      this.selectTab();
    };

    return _class;
  }();

  // -- Prevent multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new p[pluginName](this, options));
      }
    });
  };
});

$('#scrollyTabs').scrollyTabs();
