parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Focm":[function(require,module,exports) {
var n=[];function e(){var e=SVG("drawing").size(500,500),o=new XMLHttpRequest;o.open("GET","../src/floats.svg",!0),o.send(),o.onload=function(n){console.log(o.responseText),e.svg(o.responseText);SVG.select('[fill="#F04B40"]').fill("#f0e")},n=[[256,256,120],[256,256,120],[16,16,40],[16,256,100],[256,16,40],[16,16,40],[16,256,100],[256,16,40]],s()}function o(n){arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n.slice(0,3)}function t(){o(n,inputText)}function s(){}e(),console.log("hi");
},{}]},{},["Focm"], null)
//# sourceMappingURL=/src.1930344a.js.map