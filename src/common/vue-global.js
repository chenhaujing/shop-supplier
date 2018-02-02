(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueGlobal = factory());
}(this, (function() { 'use strict';

  function VueGlobal(Vue) {

    var globalData = new Vue();
    window.Vue = Vue;

    globalData = {
        // host: "http://supplier-test.storify.cc"
        baseUrl: process.env.BASE_URL,
    }

    Object.defineProperty(Vue.prototype, '$globalData', {
      get: function() {
        return globalData;
      }
    });
  }

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueGlobal);
  }

  return VueGlobal;

})));
