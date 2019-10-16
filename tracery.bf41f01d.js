// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"vendor/tracery.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
(function () {
  function i(e, t) {
    for (var n in t) {
      t.hasOwnProperty(n) && (e[n] = t[n]);
    }

    return e;
  }

  var e, t, n;
  (function (r) {
    function v(e, t) {
      return h.call(e, t);
    }

    function m(e, t) {
      var n,
          r,
          i,
          s,
          o,
          u,
          a,
          f,
          c,
          h,
          p,
          v = t && t.split("/"),
          m = l.map,
          g = m && m["*"] || {};
      if (e && e.charAt(0) === ".") if (t) {
        e = e.split("/"), o = e.length - 1, l.nodeIdCompat && d.test(e[o]) && (e[o] = e[o].replace(d, "")), e = v.slice(0, v.length - 1).concat(e);

        for (c = 0; c < e.length; c += 1) {
          p = e[c];
          if (p === ".") e.splice(c, 1), c -= 1;else if (p === "..") {
            if (c === 1 && (e[2] === ".." || e[0] === "..")) break;
            c > 0 && (e.splice(c - 1, 2), c -= 2);
          }
        }

        e = e.join("/");
      } else e.indexOf("./") === 0 && (e = e.substring(2));

      if ((v || g) && m) {
        n = e.split("/");

        for (c = n.length; c > 0; c -= 1) {
          r = n.slice(0, c).join("/");
          if (v) for (h = v.length; h > 0; h -= 1) {
            i = m[v.slice(0, h).join("/")];

            if (i) {
              i = i[r];

              if (i) {
                s = i, u = c;
                break;
              }
            }
          }
          if (s) break;
          !a && g && g[r] && (a = g[r], f = c);
        }

        !s && a && (s = a, u = f), s && (n.splice(0, u, s), e = n.join("/"));
      }

      return e;
    }

    function g(e, t) {
      return function () {
        var n = p.call(arguments, 0);
        return typeof n[0] != "string" && n.length === 1 && n.push(null), _s.apply(r, n.concat([e, t]));
      };
    }

    function y(e) {
      return function (t) {
        return m(t, e);
      };
    }

    function b(e) {
      return function (t) {
        a[e] = t;
      };
    }

    function w(e) {
      if (v(f, e)) {
        var t = f[e];
        delete f[e], c[e] = !0, i.apply(r, t);
      }

      if (!v(a, e) && !v(c, e)) throw new Error("No " + e);
      return a[e];
    }

    function E(e) {
      var t,
          n = e ? e.indexOf("!") : -1;
      return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e];
    }

    function S(e) {
      return function () {
        return l && l.config && l.config[e] || {};
      };
    }

    var i,
        _s,
        o,
        u,
        a = {},
        f = {},
        l = {},
        c = {},
        h = Object.prototype.hasOwnProperty,
        p = [].slice,
        d = /\.js$/;

    o = function o(e, t) {
      var n,
          r = E(e),
          i = r[0];
      return e = r[1], i && (i = m(i, t), n = w(i)), i ? n && n.normalize ? e = n.normalize(e, y(t)) : e = m(e, t) : (e = m(e, t), r = E(e), i = r[0], e = r[1], i && (n = w(i))), {
        f: i ? i + "!" + e : e,
        n: e,
        pr: i,
        p: n
      };
    }, u = {
      require: function require(e) {
        return g(e);
      },
      exports: function exports(e) {
        var t = a[e];
        return typeof t != "undefined" ? t : a[e] = {};
      },
      module: function module(e) {
        return {
          id: e,
          uri: "",
          exports: a[e],
          config: S(e)
        };
      }
    }, i = function i(e, t, n, _i) {
      var s,
          l,
          h,
          p,
          d,
          m = [],
          y = _typeof(n),
          E;

      _i = _i || e;

      if (y === "undefined" || y === "function") {
        t = !t.length && n.length ? ["require", "exports", "module"] : t;

        for (d = 0; d < t.length; d += 1) {
          p = o(t[d], _i), l = p.f;
          if (l === "require") m[d] = u.require(e);else if (l === "exports") m[d] = u.exports(e), E = !0;else if (l === "module") s = m[d] = u.module(e);else if (v(a, l) || v(f, l) || v(c, l)) m[d] = w(l);else {
            if (!p.p) throw new Error(e + " missing " + l);
            p.p.load(p.n, g(_i, !0), b(l), {}), m[d] = a[l];
          }
        }

        h = n ? n.apply(a[e], m) : undefined;
        if (e) if (s && s.exports !== r && s.exports !== a[e]) a[e] = s.exports;else if (h !== r || !E) a[e] = h;
      } else e && (a[e] = n);
    }, e = t = _s = function s(e, t, n, a, f) {
      if (typeof e == "string") return u[e] ? u[e](t) : w(o(e, t).f);

      if (!e.splice) {
        l = e, l.deps && _s(l.deps, l.callback);
        if (!t) return;
        t.splice ? (e = t, t = n, n = null) : e = r;
      }

      return t = t || function () {}, typeof n == "function" && (n = a, a = f), a ? i(r, e, t, n) : setTimeout(function () {
        i(r, e, t, n);
      }, 4), _s;
    }, _s.config = function (e) {
      return _s(e);
    }, e._defined = a, n = function n(e, t, _n) {
      if (typeof e != "string") throw new Error("See almond README: incorrect module build, no module name");
      t.splice || (_n = t, t = []), !v(a, e) && !v(f, e) && (f[e] = [e, t, _n]);
    }, n.amd = {
      jQuery: !0
    };
  })(), n("almond", function () {}), n("utilities", [], function () {
    function e(e) {
      return '"' + e + '"';
    }

    function t(e) {
      return e;
    }

    function n(n) {
      function l(e) {
        if (o !== e) {
          var t = n.substring(o, e);
          if (!u) tracery.addError("multiple possible expansion symbols in tag!" + n);else {
            u = !1;
            var r = t.split(".");
            a = r[0], f = r.slice(1, r.length);
          }
        }

        o = e;
      }

      var r = [],
          i = [],
          s = 0,
          o = 0,
          u = !0,
          a,
          f;

      for (var c = 0; c < n.length; c++) {
        var h = n.charAt(c);

        switch (h) {
          case "[":
            s === 0 && l(c), s++;
            break;

          case "]":
            s--;

            if (s === 0) {
              var p = n.substring(o + 1, c);
              u ? r.push(t(p)) : i.push(t(p)), o = c + 1;
            }

            break;

          default:
            s === 0;
        }
      }

      l(c);

      if (s > 0) {
        var d = "Too many '[' in rule " + e(rule);
        tracery.addError(d);
        return;
      }

      if (s < 0) {
        var d = "Too many ']' in rule " + e(rule);
        tracery.addError(d);
        return;
      }

      return {
        preActions: r,
        postActions: i,
        symbol: a,
        mods: f,
        raw: n
      };
    }

    function r(t) {
      function u(e) {
        var i = t.substring(s, e);
        i.length > 0 && (o ? r.push(n(i)) : r.push(i)), o = !o, s = e + 1;
      }

      var r = [];

      if (typeof t == "string" || t instanceof String) {
        if (t.length === 0) return [];
        var i = 0,
            s = 0,
            o = !1;

        for (var a = 0; a < t.length; a++) {
          var f = t.charAt(a);

          switch (f) {
            case "[":
              i++;
              break;

            case "]":
              i--;
              break;

            case "#":
              i === 0 && u(a);
              break;

            default:
          }
        }

        if (i > 0) {
          var l = "Too many '[' in rule " + e(t);
          tracery.addError(l), console.warn(l);
          return;
        }

        if (i < 0) {
          var l = "Too many ']' in rule " + e(t);
          tracery.addError(l), console.warn(l);
          return;
        }

        if (o) {
          var l = "Odd number of '#' in rule " + e(t);
          tracery.addError(l), console.warn(l);
          return;
        }

        return u(t.length), r;
      }

      tracery.addError("Cannot parse non-string rule " + t);
      return;
    }

    function i(t) {
      console.log("Test: " + e(t));
      var n = r(t);
      n ? console.log("SUCCESS:", n) : console.log("FAILED:", n);
    }

    function s(t) {
      console.log("Test: " + e(t));
      var r = n(t);
      r ? console.log("SUCCESS:", r) : console.log("FAILED:", r);
    }

    function o(e) {
      var t = "";

      for (var n = 0; n < e * 3; n++) {
        t += " ";
      }

      return t;
    }

    return {
      parseTag: n,
      parseRule: r,
      testParse: i,
      testParseTag: s,
      spacer: o
    };
  }), n("modifiers", [], function () {
    function t(t) {
      return t.charAt(t.length - 1) === "y" ? e(t.charAt(t.length - 2)) : !1;
    }

    var e = function e(_e) {
      _e = _e.toLowerCase();

      switch (_e) {
        case "a":
          return !1;

        case "e":
          return !1;

        case "i":
          return !1;

        case "o":
          return !1;

        case "u":
          return !1;
      }

      return !0;
    },
        n = {
      capitalizeAll: function capitalizeAll(e) {
        return e.replace(/(?:^|\s)\S/g, function (e) {
          return e.toUpperCase();
        });
      },
      capitalize: function capitalize(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      },
      inQuotes: function inQuotes(e) {
        return '"' + e + '"';
      },
      comma: function comma(e) {
        var t = e.charAt(e.length - 1);
        return t === "," ? e : t === "." ? e : t === "?" ? e : t === "!" ? e : e + ",";
      },
      beeSpeak: function beeSpeak(e) {
        return e = e.replace(/s/, "zzz"), e;
      },
      a: function a(t) {
        return e(t.charAt()) ? "a " + t : "an " + t;
      },
      s: function s(t) {
        var n = t.charAt(t.length - 1);

        switch (n) {
          case "y":
            return e(t.charAt(t.length - 2)) ? t.slice(0, t.length - 1) + "ies" : t + "s";

          case "x":
            return t.slice(0, t.length - 1) + "en";

          case "z":
            return t.slice(0, t.length - 1) + "es";

          case "h":
            return t.slice(0, t.length - 1) + "es";

          default:
            return t + "s";
        }
      },
      ed: function ed(t) {
        var n = t.indexOf(" "),
            t = t,
            r = "";
        n > 0 && (r = t.substring(n, t.length), t = t.substring(0, n));
        var i = t.charAt(t.length - 1);

        switch (i) {
          case "y":
            return e(t.charAt(t.length - 2)) ? t.slice(0, t.length - 1) + "ied" + r : t + "ed" + r;

          case "e":
            return t + "d" + r;

          default:
            return t + "ed" + r;
        }
      }
    };

    return n;
  }), n("action", [], function () {
    var e = function e(_e2, t) {
      this.node = _e2, this.grammar = _e2.grammar, this.raw = t;
    };

    return e.prototype.activate = function () {
      var t = this.node;
      t.actions.push(this), this.amended = this.grammar.flatten(this.raw);
      var n = tracery.parseTag(this.amended),
          r = n.preActions;
      r && r.length > 0 && (this.subactions = r.map(function (n) {
        return new e(t, n);
      }));

      if (n.symbol) {
        var i = n.symbol.split(":");
        if (i.length !== 2) throw "Unknown action: " + n.symbol;
        this.push = {
          symbol: i[0],
          rules: i[1].split(",")
        }, t.grammar.pushRules(this.push.symbol, this.push.rules);
      }

      if (this.subactions) for (var s = 0; s < this.subactions.length; s++) {
        this.subactions[s].activate();
      }
    }, e.prototype.deactivate = function () {
      if (this.subactions) for (var e = 0; e < this.subactions.length; e++) {
        this.subactions[e].deactivate();
      }
      this.push && this.node.grammar.popRules(this.push.symbol, this.push.rules);
    }, e;
  }), function () {
    var e = !1,
        t = /xyz/.test(function () {
      xyz;
    }) ? /\b_super\b/ : /.*/;
    this.Class = function () {}, Class.extend = function (n) {
      function o() {
        !e && this.init && this.init.apply(this, arguments);
      }

      var r = this.prototype;
      e = !0;
      var i = new this();
      e = !1;

      for (var s in n) {
        i[s] = typeof n[s] == "function" && typeof r[s] == "function" && t.test(n[s]) ? function (e, t) {
          return function () {
            var n = this._super;
            this._super = r[e];
            var i = t.apply(this, arguments);
            return this._super = n, i;
          };
        }(s, n[s]) : n[s];
      }

      return o.prototype = i, o.prototype.constructor = o, o.extend = arguments.callee, o;
    };
  }(), n("inheritance", function () {}), n("node", ["./action", "./inheritance"], function (e, t) {
    var n = 0,
        i = Class.extend({
      init: function init() {
        this.depth = 0, this.id = n, n++, this.childText = "[[UNEXPANDED]]";
      },
      setParent: function setParent(e) {
        e && (this.depth = e.depth + 1, this.parent = e, this.grammar = e.grammar);
      },
      expand: function expand() {
        return "???";
      },
      expandChildren: function expandChildren() {
        if (this.children) {
          this.childText = "";

          for (var e = 0; e < this.children.length; e++) {
            this.children[e].expand(), this.childText += this.children[e].finalText;
          }

          this.finalText = this.childText;
        }
      },
      createChildrenFromSections: function createChildrenFromSections(e) {
        var t = this;
        this.children = e.map(function (e) {
          return typeof e == "string" || e instanceof String ? new u(t, e) : new o(t, e);
        });
      }
    }),
        s = i.extend({
      init: function init(e, t) {
        this._super(), this.grammar = e, this.parsedRule = tracery.parseRule(t);
      },
      expand: function expand() {
        var e = this;
        this.createChildrenFromSections(this.parsedRule), this.expandChildren();
      }
    }),
        o = i.extend({
      init: function init(e, t) {
        this._super();

        if (t === null || _typeof(t) != "object") {
          if (!(typeof t == "string" || t instanceof String)) throw console.log("Unknown tagNode input: ", t), "Can't make tagNode from strange tag!";
          console.warn("Can't make tagNode from unparsed string!"), t = tracery.parseTag(t);
        }

        this.setParent(e), $.extend(this, t);
      },
      expand: function expand() {
        tracery.outputExpansionTrace && console.log(r.sections), this.rule = this.grammar.getRule(this.symbol), this.rule.error && (this.error = this.rule.error, tracery.addError(this.error)), this.actions = [], this.createChildrenFromSections(this.rule.getParsed());

        for (var t = 0; t < this.preActions.length; t++) {
          var n = new e(this, this.preActions[t]);
          n.activate();
        }

        this.rule.sections || console.log(this.rule), this.expandChildren();

        for (var t = 0; t < this.actions.length; t++) {
          this.actions[t].deactivate();
        }

        this.finalText = this.childText;

        for (var t = 0; t < this.mods.length; t++) {
          this.finalText = this.grammar.applyMod(this.mods[t], this.finalText);
        }
      },
      toLabel: function toLabel() {
        return this.symbol;
      },
      toString: function toString() {
        return "TagNode '" + this.symbol + "' mods:" + this.mods + ", preactions:" + this.preActions + ", postactions" + this.postActions;
      }
    }),
        u = i.extend({
      isLeaf: !0,
      init: function init(e, t) {
        this._super(), this.setParent(e), this.text = t, this.finalText = t;
      },
      expand: function expand() {},
      toLabel: function toLabel() {
        return this.text;
      }
    });
    return s;
  }), n("rule/rule", [], function () {
    var e = function e(_e3) {
      this.raw = _e3, this.sections = tracery.parseRule(_e3);
    };

    return e.prototype.getParsed = function () {
      return this.sections || (this.sections = tracery.parseRule(raw)), this.sections;
    }, e.prototype.toString = function () {
      return this.raw;
    }, e.prototype.toJSONString = function () {
      return this.raw;
    }, e;
  }), n("rule/ruleset", ["./rule"], function (e) {
    var t = Object.freeze({
      RED: 0,
      GREEN: 1,
      BLUE: 2
    }),
        n = function n(e) {
      if (e.constructor === Array) e = e.slice(0, e.length);else if (e.prototype !== n) {
        if (!(typeof e == "string" || e instanceof String)) throw console.log(e), "creating ruleset with unknown object type!";
        var t = Array.prototype.slice.call(arguments);
        e = t;
      }
      this.rules = e, this.parseAll(), this.uses = [], this.startUses = [], this.totalUses = 0;

      for (var r = 0; r < this.rules.length; r++) {
        this.uses[r] = 0, this.startUses[r] = this.uses[r], this.totalUses += this.uses[r];
      }
    };

    return n.prototype.parseAll = function (t) {
      for (var n = 0; n < this.rules.length; n++) {
        this.rules[n].prototype !== e && (this.rules[n] = new e(this.rules[n]));
      }
    }, n.prototype.mapRules = function (e) {
      return this.rules.map(function (t, n) {
        return e(t, n);
      });
    }, n.prototype.applyToRules = function (e) {
      for (var t = 0; t < this.rules.length; t++) {
        e(this.rules[t], t);
      }
    }, n.prototype.get = function () {
      var e = this.getIndex();
      return this.rules[e];
    }, n.prototype.getRandomIndex = function () {
      return Math.floor(this.uses.length * Math.random());
    }, n.prototype.getIndex = function () {
      var e = this.getRandomIndex(),
          t = this.totalUses / this.uses.length,
          n = 0;

      while (this.uses[e] > t && n < 20) {
        e = this.getRandomIndex(), n++;
      }

      return e;
    }, n.prototype.decayUses = function (e) {
      this.totalUses = 0;

      for (var t = 0; t < this.uses; t++) {
        this.uses[index] *= 1 - e, this.totalUses += this.uses[index];
      }
    }, n.prototype.testRandom = function () {
      console.log("Test random");
      var e = [];

      for (var t = 0; t < this.uses.length; t++) {
        e[t] = 0;
      }

      var n = 10 * this.uses.length;

      for (var t = 0; t < n; t++) {
        var r = this.getIndex();
        this.uses[r] += 1, e[r]++, this.decayUses(.1);
      }

      for (var t = 0; t < this.uses.length; t++) {
        console.log(t + ":	" + e[t] + " 	" + this.uses[t]);
      }
    }, n.prototype.getSaveRules = function () {
      var e = this.rules.map(function (e) {
        return e.toJSONString();
      });
      return e;
    }, n;
  }), n("symbol", ["./rule/ruleset"], function (e) {
    function t(e, t) {
      this.grammar = e, this.key = t, this.currentRules = undefined, this.ruleSets = [];
    }

    return t.prototype.loadFrom = function (e) {
      e = this.wrapRules(e), this.baseRules = e, this.ruleSets.push(e), this.currentRules = this.ruleSets[this.ruleSets.length - 1];
    }, t.prototype.mapRules = function (e) {
      return this.currentRules.mapRules(e);
    }, t.prototype.applyToRules = function (e) {
      this.currentRules.applyToRules(e);
    }, t.prototype.wrapRules = function (t) {
      if (t.prototype !== e) {
        if (Array.isArray(t)) return new e(t);
        if (typeof t == "string" || t instanceof String) return new e(t);
        throw "Unknown rules type: " + t;
      }

      return t;
    }, t.prototype.pushRules = function (e) {
      e = this.wrapRules(e), this.ruleSets.push(e), this.currentRules = this.ruleSets[this.ruleSets.length - 1];
    }, t.prototype.popRules = function () {
      var e = this.ruleSets.pop();
      this.ruleSets.length === 0, this.currentRules = this.ruleSets[this.ruleSets.length - 1];
    }, t.prototype.setRules = function (e) {
      e = this.wrapRules(e), this.ruleSets = [e], this.currentRules = e;
    }, t.prototype.addRule = function (e) {
      this.currentRules.addRule(seed);
    }, t.prototype.select = function () {
      this.isSelected = !0;
    }, t.prototype.deselect = function () {
      this.isSelected = !1;
    }, t.prototype.getRule = function (e) {
      return this.currentRules.get(e);
    }, t.prototype.toString = function () {
      return this.key + ": " + this.currentRules + "(overlaying " + (this.ruleSets.length - 1) + ")";
    }, t.prototype.toJSON = function () {
      var e = this.baseRules.rules.map(function (e) {
        return '"' + e.raw + '"';
      });
      return '"' + this.key + '"' + ": [" + e + "]";
    }, t;
  }), n("grammar", ["./modifiers", "./node", "./symbol", "./rule/rule"], function (e, t, n, r) {
    function i() {
      this.clear();
    }

    return i.prototype.clear = function () {
      this.symbols = {}, this.modifiers = {};

      for (var t in e) {
        e.hasOwnProperty(t) && (this.modifiers[t] = e[t]);
      }
    }, i.prototype.loadFrom = function (e) {
      var t;
      this.clear(), e.symbols !== undefined ? t = e.symbols : t = e;
      var r = Object.keys(t);
      this.symbolNames = [];

      for (var i = 0; i < r.length; i++) {
        var s = r[i];
        this.symbolNames.push(s), this.symbols[s] = new n(this, s), this.symbols[s].loadFrom(t[s]);
      }
    }, i.prototype.toText = function () {
      return this.toJSON();
    }, i.prototype.toJSON = function () {
      var e = "{\n",
          t = Object.keys(this.symbols);
      this.symbolNames = [];
      var n = 0;

      for (var r = 0; r < t.length; r++) {
        var i = t[r],
            s = this.symbols[i];
        s && s.baseRules && (n > 0 && (e += ","), n++, e += "	" + this.symbols[i].toJSON(), e += "\n");
      }

      return e += "\n}", e;
    }, i.prototype.select = function () {
      this.isSelected = !0;
    }, i.prototype.deselect = function () {
      this.isSelected = !1;
    }, i.prototype.mapSymbols = function (e) {
      var t = this.symbols;
      return this.symbolNames.map(function (n) {
        return e(t[n], n);
      });
    }, i.prototype.applyToSymbols = function (e) {
      for (var t = 0; t < this.symbolNames.length; t++) {
        var n = this.symbolNames[t];
        e(this.symbols[n], n);
      }
    }, i.prototype.addOrGetSymbol = function (e) {
      return this.symbols[e] === undefined && (this.symbols[e] = new n(e)), this.symbols[e];
    }, i.prototype.pushRules = function (e, t) {
      var n = this.addOrGetSymbol(e);
      n.pushRules(t);
    }, i.prototype.popRules = function (e, t) {
      var n = this.addOrGetSymbol(e),
          r = n.popRules();
      n.ruleSets.length === 0 && (this.symbols[e] = undefined);
    }, i.prototype.applyMod = function (e, t) {
      if (!this.modifiers[e]) throw console.log(this.modifiers), "Unknown mod: " + e;
      return this.modifiers[e](t);
    }, i.prototype.getRule = function (e, t) {
      var n = this.symbols[e];

      if (n === undefined) {
        var i = new r("{{" + e + "}}");
        return i.error = "Missing symbol " + e, i;
      }

      var s = n.getRule();

      if (s === undefined) {
        var i = new r("[" + e + "]");
        return console.log(i.sections), i.error = "Symbol " + e + " has no rule", i;
      }

      return s;
    }, i.prototype.expand = function (e) {
      var n = new t(this, e);
      return n.expand(), n;
    }, i.prototype.flatten = function (e) {
      var n = new t(this, e);
      return n.expand(), n.childText;
    }, i.prototype.analyze = function () {
      this.symbolNames = [];

      for (var e in this.symbols) {
        this.symbols.hasOwnProperty(e) && this.symbolNames.push(e);
      }

      for (var t = 0; t < this.symbolNames.length; t++) {
        var n = this.symbolNames[t],
            r = this.symbols[n];

        for (var i = 0; i < r.baseRules.length; i++) {
          var s = r.baseRules[i];
          s.parsed = tracery.parse(s.raw);
        }
      }
    }, i.prototype.selectSymbol = function (e) {
      console.log(this);
      var t = this.get(e);
    }, i;
  }), n("traceryCore", ["./utilities", "./grammar", "./node"], function (e, t, n) {
    var r = {};
    return console.log("in main tracery"), $.extend(r, e), r.createGrammar = function (e) {
      var n = new t();
      return n.loadFrom(e), n;
    }, r.addError = function (e) {
      console.warn(e);
    }, r.test = function () {
      console.log("=========================================="), console.log("test tracery"), r.testParse("#[#setPronouns#][#setOccupation#][hero:#name#]story#");
    }, r;
  }), t.config({}), t(["./traceryCore"], function (e) {
    tracery = e, console.log(tracery), console.log("Tracery complete");
  }), n("main", function () {});
})();
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55406" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","vendor/tracery.js"], null)
//# sourceMappingURL=/tracery.bf41f01d.js.map