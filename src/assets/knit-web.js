/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = window, Re = Bt.ShadowRoot && (Bt.ShadyCSS === void 0 || Bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pe = Symbol(), Qe = /* @__PURE__ */ new WeakMap();
class Tr {
  constructor(e, r, o) {
    if (this._$cssResult$ = !0, o !== Pe)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (Re && e === void 0) {
      const o = r !== void 0 && r.length === 1;
      o && (e = Qe.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && Qe.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
}
const Rr = (t) => new Tr(typeof t == "string" ? t : t + "", void 0, Pe), Ot = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((o, a, i) => o + ((n) => {
    if (n._$cssResult$ === !0)
      return n.cssText;
    if (typeof n == "number")
      return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + t[i + 1], t[0]);
  return new Tr(r, t, Pe);
}, Co = (t, e) => {
  Re ? t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet) : e.forEach((r) => {
    const o = document.createElement("style"), a = Bt.litNonce;
    a !== void 0 && o.setAttribute("nonce", a), o.textContent = r.cssText, t.appendChild(o);
  });
}, tr = Re ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const o of e.cssRules)
    r += o.cssText;
  return Rr(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ge;
const Vt = window, er = Vt.trustedTypes, Eo = er ? er.emptyScript : "", rr = Vt.reactiveElementPolyfillSupport, ke = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Eo : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, Pr = (t, e) => e !== t && (e == e || t == t), fe = { attribute: !0, type: String, converter: ke, reflect: !1, hasChanged: Pr };
class at extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(e) {
    var r;
    this.finalize(), ((r = this.h) !== null && r !== void 0 ? r : this.h = []).push(e);
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return this.elementProperties.forEach((r, o) => {
      const a = this._$Ep(o, r);
      a !== void 0 && (this._$Ev.set(a, o), e.push(a));
    }), e;
  }
  static createProperty(e, r = fe) {
    if (r.state && (r.attribute = !1), this.finalize(), this.elementProperties.set(e, r), !r.noAccessor && !this.prototype.hasOwnProperty(e)) {
      const o = typeof e == "symbol" ? Symbol() : "__" + e, a = this.getPropertyDescriptor(e, o, r);
      a !== void 0 && Object.defineProperty(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, r, o) {
    return { get() {
      return this[r];
    }, set(a) {
      const i = this[e];
      this[r] = a, this.requestUpdate(e, i, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) || fe;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const e = Object.getPrototypeOf(this);
    if (e.finalize(), e.h !== void 0 && (this.h = [...e.h]), this.elementProperties = new Map(e.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const r = this.properties, o = [...Object.getOwnPropertyNames(r), ...Object.getOwnPropertySymbols(r)];
      for (const a of o)
        this.createProperty(a, r[a]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const a of o)
        r.unshift(tr(a));
    } else
      e !== void 0 && r.push(tr(e));
    return r;
  }
  static _$Ep(e, r) {
    const o = r.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  u() {
    var e;
    this._$E_ = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (e = this.constructor.h) === null || e === void 0 || e.forEach((r) => r(this));
  }
  addController(e) {
    var r, o;
    ((r = this._$ES) !== null && r !== void 0 ? r : this._$ES = []).push(e), this.renderRoot !== void 0 && this.isConnected && ((o = e.hostConnected) === null || o === void 0 || o.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$ES) === null || r === void 0 || r.splice(this._$ES.indexOf(e) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((e, r) => {
      this.hasOwnProperty(r) && (this._$Ei.set(r, this[r]), delete this[r]);
    });
  }
  createRenderRoot() {
    var e;
    const r = (e = this.shadowRoot) !== null && e !== void 0 ? e : this.attachShadow(this.constructor.shadowRootOptions);
    return Co(r, this.constructor.elementStyles), r;
  }
  connectedCallback() {
    var e;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var o;
      return (o = r.hostConnected) === null || o === void 0 ? void 0 : o.call(r);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((r) => {
      var o;
      return (o = r.hostDisconnected) === null || o === void 0 ? void 0 : o.call(r);
    });
  }
  attributeChangedCallback(e, r, o) {
    this._$AK(e, o);
  }
  _$EO(e, r, o = fe) {
    var a;
    const i = this.constructor._$Ep(e, o);
    if (i !== void 0 && o.reflect === !0) {
      const n = (((a = o.converter) === null || a === void 0 ? void 0 : a.toAttribute) !== void 0 ? o.converter : ke).toAttribute(r, o.type);
      this._$El = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$El = null;
    }
  }
  _$AK(e, r) {
    var o;
    const a = this.constructor, i = a._$Ev.get(e);
    if (i !== void 0 && this._$El !== i) {
      const n = a.getPropertyOptions(i), s = typeof n.converter == "function" ? { fromAttribute: n.converter } : ((o = n.converter) === null || o === void 0 ? void 0 : o.fromAttribute) !== void 0 ? n.converter : ke;
      this._$El = i, this[i] = s.fromAttribute(r, n.type), this._$El = null;
    }
  }
  requestUpdate(e, r, o) {
    let a = !0;
    e !== void 0 && (((o = o || this.constructor.getPropertyOptions(e)).hasChanged || Pr)(this[e], r) ? (this._$AL.has(e) || this._$AL.set(e, r), o.reflect === !0 && this._$El !== e && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(e, o))) : a = !1), !this.isUpdatePending && a && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var e;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((a, i) => this[i] = a), this._$Ei = void 0);
    let r = !1;
    const o = this._$AL;
    try {
      r = this.shouldUpdate(o), r ? (this.willUpdate(o), (e = this._$ES) === null || e === void 0 || e.forEach((a) => {
        var i;
        return (i = a.hostUpdate) === null || i === void 0 ? void 0 : i.call(a);
      }), this.update(o)) : this._$Ek();
    } catch (a) {
      throw r = !1, this._$Ek(), a;
    }
    r && this._$AE(o);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$ES) === null || r === void 0 || r.forEach((o) => {
      var a;
      return (a = o.hostUpdated) === null || a === void 0 ? void 0 : a.call(o);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$EC !== void 0 && (this._$EC.forEach((r, o) => this._$EO(o, this[o], r)), this._$EC = void 0), this._$Ek();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
}
at.finalized = !0, at.elementProperties = /* @__PURE__ */ new Map(), at.elementStyles = [], at.shadowRootOptions = { mode: "open" }, rr == null || rr({ ReactiveElement: at }), ((ge = Vt.reactiveElementVersions) !== null && ge !== void 0 ? ge : Vt.reactiveElementVersions = []).push("1.5.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ue;
const qt = window, lt = qt.trustedTypes, or = lt ? lt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, q = `lit$${(Math.random() + "").slice(9)}$`, Lr = "?" + q, So = `<${Lr}>`, dt = document, yt = (t = "") => dt.createComment(t), kt = (t) => t === null || typeof t != "object" && typeof t != "function", Ur = Array.isArray, $o = (t) => Ur(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ht = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ar = /-->/g, ir = />/g, Y = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nr = /'/g, sr = /"/g, jr = /^(?:script|style|textarea|title)$/i, _o = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), f = _o(1), Q = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), lr = /* @__PURE__ */ new WeakMap(), it = dt.createTreeWalker(dt, 129, null, !1), Ao = (t, e) => {
  const r = t.length - 1, o = [];
  let a, i = e === 2 ? "<svg>" : "", n = ht;
  for (let d = 0; d < r; d++) {
    const l = t[d];
    let m, c, u = -1, h = 0;
    for (; h < l.length && (n.lastIndex = h, c = n.exec(l), c !== null); )
      h = n.lastIndex, n === ht ? c[1] === "!--" ? n = ar : c[1] !== void 0 ? n = ir : c[2] !== void 0 ? (jr.test(c[2]) && (a = RegExp("</" + c[2], "g")), n = Y) : c[3] !== void 0 && (n = Y) : n === Y ? c[0] === ">" ? (n = a != null ? a : ht, u = -1) : c[1] === void 0 ? u = -2 : (u = n.lastIndex - c[2].length, m = c[1], n = c[3] === void 0 ? Y : c[3] === '"' ? sr : nr) : n === sr || n === nr ? n = Y : n === ar || n === ir ? n = ht : (n = Y, a = void 0);
    const b = n === Y && t[d + 1].startsWith("/>") ? " " : "";
    i += n === ht ? l + So : u >= 0 ? (o.push(m), l.slice(0, u) + "$lit$" + l.slice(u) + q + b) : l + q + (u === -2 ? (o.push(void 0), d) : b);
  }
  const s = i + (t[r] || "<?>") + (e === 2 ? "</svg>" : "");
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [or !== void 0 ? or.createHTML(s) : s, o];
};
class Ct {
  constructor({ strings: e, _$litType$: r }, o) {
    let a;
    this.parts = [];
    let i = 0, n = 0;
    const s = e.length - 1, d = this.parts, [l, m] = Ao(e, r);
    if (this.el = Ct.createElement(l, o), it.currentNode = this.el.content, r === 2) {
      const c = this.el.content, u = c.firstChild;
      u.remove(), c.append(...u.childNodes);
    }
    for (; (a = it.nextNode()) !== null && d.length < s; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) {
          const c = [];
          for (const u of a.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith(q)) {
              const h = m[n++];
              if (c.push(u), h !== void 0) {
                const b = a.getAttribute(h.toLowerCase() + "$lit$").split(q), v = /([.?@])?(.*)/.exec(h);
                d.push({ type: 1, index: i, name: v[2], strings: b, ctor: v[1] === "." ? Do : v[1] === "?" ? To : v[1] === "@" ? Ro : ee });
              } else
                d.push({ type: 6, index: i });
            }
          for (const u of c)
            a.removeAttribute(u);
        }
        if (jr.test(a.tagName)) {
          const c = a.textContent.split(q), u = c.length - 1;
          if (u > 0) {
            a.textContent = lt ? lt.emptyScript : "";
            for (let h = 0; h < u; h++)
              a.append(c[h], yt()), it.nextNode(), d.push({ type: 2, index: ++i });
            a.append(c[u], yt());
          }
        }
      } else if (a.nodeType === 8)
        if (a.data === Lr)
          d.push({ type: 2, index: i });
        else {
          let c = -1;
          for (; (c = a.data.indexOf(q, c + 1)) !== -1; )
            d.push({ type: 7, index: i }), c += q.length - 1;
        }
      i++;
    }
  }
  static createElement(e, r) {
    const o = dt.createElement("template");
    return o.innerHTML = e, o;
  }
}
function pt(t, e, r = t, o) {
  var a, i, n, s;
  if (e === Q)
    return e;
  let d = o !== void 0 ? (a = r._$Co) === null || a === void 0 ? void 0 : a[o] : r._$Cl;
  const l = kt(e) ? void 0 : e._$litDirective$;
  return (d == null ? void 0 : d.constructor) !== l && ((i = d == null ? void 0 : d._$AO) === null || i === void 0 || i.call(d, !1), l === void 0 ? d = void 0 : (d = new l(t), d._$AT(t, r, o)), o !== void 0 ? ((n = (s = r)._$Co) !== null && n !== void 0 ? n : s._$Co = [])[o] = d : r._$Cl = d), d !== void 0 && (e = pt(t, d._$AS(t, e.values), d, o)), e;
}
class zo {
  constructor(e, r) {
    this.u = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(e) {
    var r;
    const { el: { content: o }, parts: a } = this._$AD, i = ((r = e == null ? void 0 : e.creationScope) !== null && r !== void 0 ? r : dt).importNode(o, !0);
    it.currentNode = i;
    let n = it.nextNode(), s = 0, d = 0, l = a[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let m;
        l.type === 2 ? m = new Tt(n, n.nextSibling, this, e) : l.type === 1 ? m = new l.ctor(n, l.name, l.strings, this, e) : l.type === 6 && (m = new Po(n, this, e)), this.u.push(m), l = a[++d];
      }
      s !== (l == null ? void 0 : l.index) && (n = it.nextNode(), s++);
    }
    return i;
  }
  p(e) {
    let r = 0;
    for (const o of this.u)
      o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, r), r += o.strings.length - 2) : o._$AI(e[r])), r++;
  }
}
class Tt {
  constructor(e, r, o, a) {
    var i;
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = o, this.options = a, this._$Cm = (i = a == null ? void 0 : a.isConnected) === null || i === void 0 || i;
  }
  get _$AU() {
    var e, r;
    return (r = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && r !== void 0 ? r : this._$Cm;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && e.nodeType === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = pt(this, e, r), kt(e) ? e === S || e == null || e === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : e !== this._$AH && e !== Q && this.g(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : $o(e) ? this.k(e) : this.g(e);
  }
  O(e, r = this._$AB) {
    return this._$AA.parentNode.insertBefore(e, r);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  g(e) {
    this._$AH !== S && kt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(dt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: o, _$litType$: a } = e, i = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = Ct.createElement(a.h, this.options)), a);
    if (((r = this._$AH) === null || r === void 0 ? void 0 : r._$AD) === i)
      this._$AH.p(o);
    else {
      const n = new zo(i, this), s = n.v(this.options);
      n.p(o), this.T(s), this._$AH = n;
    }
  }
  _$AC(e) {
    let r = lr.get(e.strings);
    return r === void 0 && lr.set(e.strings, r = new Ct(e)), r;
  }
  k(e) {
    Ur(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let o, a = 0;
    for (const i of e)
      a === r.length ? r.push(o = new Tt(this.O(yt()), this.O(yt()), this, this.options)) : o = r[a], o._$AI(i), a++;
    a < r.length && (this._$AR(o && o._$AB.nextSibling, a), r.length = a);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var o;
    for ((o = this._$AP) === null || o === void 0 || o.call(this, !1, !0, r); e && e !== this._$AB; ) {
      const a = e.nextSibling;
      e.remove(), e = a;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cm = e, (r = this._$AP) === null || r === void 0 || r.call(this, e));
  }
}
class ee {
  constructor(e, r, o, a, i) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = e, this.name = r, this._$AM = a, this.options = i, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = S;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, r = this, o, a) {
    const i = this.strings;
    let n = !1;
    if (i === void 0)
      e = pt(this, e, r, 0), n = !kt(e) || e !== this._$AH && e !== Q, n && (this._$AH = e);
    else {
      const s = e;
      let d, l;
      for (e = i[0], d = 0; d < i.length - 1; d++)
        l = pt(this, s[o + d], r, d), l === Q && (l = this._$AH[d]), n || (n = !kt(l) || l !== this._$AH[d]), l === S ? e = S : e !== S && (e += (l != null ? l : "") + i[d + 1]), this._$AH[d] = l;
    }
    n && !a && this.j(e);
  }
  j(e) {
    e === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e != null ? e : "");
  }
}
class Do extends ee {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === S ? void 0 : e;
  }
}
const Oo = lt ? lt.emptyScript : "";
class To extends ee {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== S ? this.element.setAttribute(this.name, Oo) : this.element.removeAttribute(this.name);
  }
}
class Ro extends ee {
  constructor(e, r, o, a, i) {
    super(e, r, o, a, i), this.type = 5;
  }
  _$AI(e, r = this) {
    var o;
    if ((e = (o = pt(this, e, r, 0)) !== null && o !== void 0 ? o : S) === Q)
      return;
    const a = this._$AH, i = e === S && a !== S || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, n = e !== S && (a === S || i);
    i && this.element.removeEventListener(this.name, this, a), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r, o;
    typeof this._$AH == "function" ? this._$AH.call((o = (r = this.options) === null || r === void 0 ? void 0 : r.host) !== null && o !== void 0 ? o : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Po {
  constructor(e, r, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    pt(this, e);
  }
}
const dr = qt.litHtmlPolyfillSupport;
dr == null || dr(Ct, Tt), ((ue = qt.litHtmlVersions) !== null && ue !== void 0 ? ue : qt.litHtmlVersions = []).push("2.5.0");
const Lo = (t, e, r) => {
  var o, a;
  const i = (o = r == null ? void 0 : r.renderBefore) !== null && o !== void 0 ? o : e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = (a = r == null ? void 0 : r.renderBefore) !== null && a !== void 0 ? a : null;
    i._$litPart$ = n = new Tt(e.insertBefore(yt(), s), s, void 0, r != null ? r : {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var he, ve;
class C extends at {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e, r;
    const o = super.createRenderRoot();
    return (e = (r = this.renderOptions).renderBefore) !== null && e !== void 0 || (r.renderBefore = o.firstChild), o;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Lo(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) === null || e === void 0 || e.setConnected(!1);
  }
  render() {
    return Q;
  }
}
C.finalized = !0, C._$litElement$ = !0, (he = globalThis.litElementHydrateSupport) === null || he === void 0 || he.call(globalThis, { LitElement: C });
const pr = globalThis.litElementPolyfillSupport;
pr == null || pr({ LitElement: C });
((ve = globalThis.litElementVersions) !== null && ve !== void 0 ? ve : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _ = (t) => (e) => typeof e == "function" ? ((r, o) => (customElements.define(r, o), o))(t, e) : ((r, o) => {
  const { kind: a, elements: i } = o;
  return { kind: a, elements: i, finisher(n) {
    customElements.define(r, n);
  } };
})(t, e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Uo = (t, e) => e.kind === "method" && e.descriptor && !("value" in e.descriptor) ? { ...e, finisher(r) {
  r.createProperty(e.key, t);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e.key, initializer() {
  typeof e.initializer == "function" && (this[e.key] = e.initializer.call(this));
}, finisher(r) {
  r.createProperty(e.key, t);
} };
function g(t) {
  return (e, r) => r !== void 0 ? ((o, a, i) => {
    a.constructor.createProperty(i, o);
  })(t, e, r) : Uo(t, e);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var xe;
((xe = window.HTMLSlotElement) === null || xe === void 0 ? void 0 : xe.prototype.assignedElements) != null;
const jo = `@font-face{font-family:Lato;font-style:normal;font-weight:100;src:url(https://fonts.gstatic.com/s/lato/v23/S6u8w4BMUTPHh30AUi-qJCY.woff2) format("woff2");unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:100;src:url(https://fonts.gstatic.com/s/lato/v23/S6u8w4BMUTPHh30AXC-q.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Lato;font-style:normal;font-weight:300;src:url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwaPGR_p.woff2) format("woff2");unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:300;src:url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwiPGQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjxAwXjeu.woff2) format("woff2");unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwaPGR_p.woff2) format("woff2");unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:700;src:url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh50XSwaPGR_p.woff2) format("woff2");unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Lato;font-style:normal;font-weight:900;src:url(https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh50XSwiPGQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
`, Fo = `@charset "UTF-8";/*!
* Bootstrap  v5.2.3 (https://getbootstrap.com/)
* Copyright 2011-2022 The Bootstrap Authors
* Copyright 2011-2022 Twitter, Inc.
* Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
*/:root{--bs-blue: #0d6efd;--bs-indigo: #6610f2;--bs-purple: #6f42c1;--bs-pink: #d63384;--bs-red: #dc3545;--bs-orange: #fd7e14;--bs-yellow: #ffc107;--bs-green: #198754;--bs-teal: #20c997;--bs-cyan: #0dcaf0;--bs-black: #000;--bs-white: #fff;--bs-gray: #6c757d;--bs-gray-dark: #343a40;--bs-gray-100: #f8f9fa;--bs-gray-200: #e9ecef;--bs-gray-300: #dee2e6;--bs-gray-400: #ced4da;--bs-gray-500: #adb5bd;--bs-gray-600: #6c757d;--bs-gray-700: #495057;--bs-gray-800: #343a40;--bs-gray-900: #212529;--bs-primary: #0d6efd;--bs-secondary: #6c757d;--bs-success: #198754;--bs-info: #0dcaf0;--bs-warning: #ffc107;--bs-danger: #dc3545;--bs-light: #f8f9fa;--bs-dark: #212529;--bs-primary-rgb: 13, 110, 253;--bs-secondary-rgb: 108, 117, 125;--bs-success-rgb: 25, 135, 84;--bs-info-rgb: 13, 202, 240;--bs-warning-rgb: 255, 193, 7;--bs-danger-rgb: 220, 53, 69;--bs-light-rgb: 248, 249, 250;--bs-dark-rgb: 33, 37, 41;--bs-white-rgb: 255, 255, 255;--bs-black-rgb: 0, 0, 0;--bs-body-color-rgb: 33, 37, 41;--bs-body-bg-rgb: 255, 255, 255;--bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--bs-gradient: linear-gradient( 180deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, 0) );--bs-body-font-family: var(--bs-font-sans-serif);--bs-body-font-size: 1rem;--bs-body-font-weight: 400;--bs-body-line-height: 1.5;--bs-body-color: #212529;--bs-body-bg: #fff;--bs-border-width: 1px;--bs-border-style: solid;--bs-border-color: #dee2e6;--bs-border-color-translucent: rgba(0, 0, 0, .175);--bs-border-radius: .375rem;--bs-border-radius-sm: .25rem;--bs-border-radius-lg: .5rem;--bs-border-radius-xl: 1rem;--bs-border-radius-2xl: 2rem;--bs-border-radius-pill: 50rem;--bs-link-color: #0d6efd;--bs-link-hover-color: #0a58ca;--bs-code-color: #d63384;--bs-highlight-bg: #fff3cd}*,:after,:before{box-sizing:border-box}@media (prefers-reduced-motion: no-preference){:root{scroll-behavior:smooth}}:root{margin:0;font-family:var(--bs-body-font-family);font-size:var(--bs-body-font-size);font-weight:var(--bs-body-font-weight);line-height:var(--bs-body-line-height)!important;color:var(--bs-body-color);text-align:var(--bs-body-text-align);background-color:var(--bs-body-bg);-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}hr{margin:1rem 0;color:inherit;border:0;border-top:1px solid;opacity:.25}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem;font-weight:500;line-height:1.2}.h1,h1{font-size:calc(1.375rem + 1.5vw)}@media (min-width: 1200px){.h1,h1{font-size:2.5rem}}.h2,h2{font-size:calc(1.325rem + .9vw)}@media (min-width: 1200px){.h2,h2{font-size:2rem}}.h3,h3{font-size:calc(1.3rem + .6vw)}@media (min-width: 1200px){.h3,h3{font-size:1.75rem}}.h4,h4{font-size:calc(1.275rem + .3vw)}@media (min-width: 1200px){.h4,h4{font-size:1.5rem}}.h5,h5{font-size:1.25rem}.h6,h6{font-size:1rem}p{margin-top:0;margin-bottom:1rem}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted;cursor:help;-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}address{margin-bottom:1rem;font-style:normal;line-height:inherit}ol,ul{padding-left:2rem}dl,ol,ul{margin-top:0;margin-bottom:1rem}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:.5rem;margin-left:0}blockquote{margin:0 0 1rem}b,strong{font-weight:bolder}.small,small{font-size:.875em}.mark,mark{padding:.1875em;background-color:var(--bs-highlight-bg)}sub,sup{position:relative;font-size:.75em;line-height:0;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}a{color:var(--bs-link-color);text-decoration:underline}a:hover{color:var(--bs-link-hover-color)}a:not([href]):not([class]),a:not([href]):not([class]):hover{color:inherit;text-decoration:none}code,kbd,pre,samp{font-family:var(--bs-font-monospace);font-size:1em}pre{display:block;margin-top:0;margin-bottom:1rem;overflow:auto;font-size:.875em}pre code{font-size:inherit;color:inherit;word-break:normal}code{font-size:.875em;color:var(--bs-code-color);word-wrap:break-word}a>code{color:inherit}kbd{padding:.1875rem .375rem;font-size:.875em;color:var(--bs-body-bg);background-color:var(--bs-body-color);border-radius:.25rem}kbd kbd{padding:0;font-size:1em}figure{margin:0 0 1rem}img,svg{vertical-align:middle}table{caption-side:bottom;border-collapse:collapse}caption{padding-top:.5rem;padding-bottom:.5rem;color:#6c757d;text-align:left}th{text-align:inherit;text-align:-webkit-match-parent}tbody,td,tfoot,th,thead,tr{border-color:inherit;border-style:solid;border-width:0}label{display:inline-block}button{border-radius:0}button:focus:not(:focus-visible){outline:0}button,input,optgroup,select,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,select{text-transform:none}[role=button]{cursor:pointer}select{word-wrap:normal}select:disabled{opacity:1}[list]:not([type="date"]):not([type="datetime-local"]):not([type="month"]):not([type="week"]):not([type="time"])::-webkit-calendar-picker-indicator{display:none!important}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled){cursor:pointer}::-moz-focus-inner{padding:0;border-style:none}textarea{resize:vertical}fieldset{min-width:0;padding:0;margin:0;border:0}legend{float:left;width:100%;padding:0;margin-bottom:.5rem;font-size:calc(1.275rem + .3vw);line-height:inherit}@media (min-width: 1200px){legend{font-size:1.5rem}}legend+*{clear:left}::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-fields-wrapper,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-text,::-webkit-datetime-edit-year-field{padding:0}::-webkit-inner-spin-button{height:auto}[type=search]{outline-offset:-2px;-webkit-appearance:textfield}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-color-swatch-wrapper{padding:0}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}::file-selector-button{font:inherit;-webkit-appearance:button}output{display:inline-block}iframe{border:0}summary{display:list-item;cursor:pointer}progress{vertical-align:baseline}[hidden]{display:none!important}.lead{font-size:1.25rem;font-weight:300}.display-1{font-size:calc(1.625rem + 4.5vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-1{font-size:5rem}}.display-2{font-size:calc(1.575rem + 3.9vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-2{font-size:4.5rem}}.display-3{font-size:calc(1.525rem + 3.3vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-3{font-size:4rem}}.display-4{font-size:calc(1.475rem + 2.7vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-4{font-size:3.5rem}}.display-5{font-size:calc(1.425rem + 2.1vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-5{font-size:3rem}}.display-6{font-size:calc(1.375rem + 1.5vw);font-weight:300;line-height:1.2}@media (min-width: 1200px){.display-6{font-size:2.5rem}}.list-unstyled,.list-inline{padding-left:0;list-style:none}.list-inline-item{display:inline-block}.list-inline-item:not(:last-child){margin-right:.5rem}.initialism{font-size:.875em;text-transform:uppercase}.blockquote{margin-bottom:1rem;font-size:1.25rem}.blockquote>:last-child{margin-bottom:0}.blockquote-footer{margin-top:-1rem;margin-bottom:1rem;font-size:.875em;color:#6c757d}.blockquote-footer:before{content:"\\2014  "}.img-fluid{max-width:100%;height:auto}.img-thumbnail{padding:.25rem;background-color:#fff;border:1px solid var(--bs-border-color);border-radius:.375rem;max-width:100%;height:auto}.figure{display:inline-block}.figure-img{margin-bottom:.5rem;line-height:1}.figure-caption{font-size:.875em;color:#6c757d}.container,.container-fluid,.container-lg,.container-md,.container-sm,.container-xl,.container-xxl{--bs-gutter-x: 1.5rem;--bs-gutter-y: 0;width:100%;padding-right:calc(var(--bs-gutter-x) * .5);padding-left:calc(var(--bs-gutter-x) * .5);margin-right:auto;margin-left:auto}@media (min-width: 576px){.container,.container-sm{max-width:540px}}@media (min-width: 768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width: 992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width: 1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}@media (min-width: 1400px){.container,.container-lg,.container-md,.container-sm,.container-xl,.container-xxl{max-width:1320px}}.row{--bs-gutter-x: 1.5rem;--bs-gutter-y: 0;display:flex;flex-wrap:wrap;margin-top:calc(-1 * var(--bs-gutter-y));margin-right:calc(-.5 * var(--bs-gutter-x));margin-left:calc(-.5 * var(--bs-gutter-x))}.row>*{flex-shrink:0;width:100%;max-width:100%;padding-right:calc(var(--bs-gutter-x) * .5);padding-left:calc(var(--bs-gutter-x) * .5);margin-top:var(--bs-gutter-y)}.col{flex:1 0 0%}.row-cols-auto>*{flex:0 0 auto;width:auto}.row-cols-1>*{flex:0 0 auto;width:100%}.row-cols-2>*{flex:0 0 auto;width:50%}.row-cols-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-4>*{flex:0 0 auto;width:25%}.row-cols-5>*{flex:0 0 auto;width:20%}.row-cols-6>*{flex:0 0 auto;width:16.6666666667%}.col-auto{flex:0 0 auto;width:auto}.col-1{flex:0 0 auto;width:8.33333333%}.col-2{flex:0 0 auto;width:16.66666667%}.col-3{flex:0 0 auto;width:25%}.col-4{flex:0 0 auto;width:33.33333333%}.col-5{flex:0 0 auto;width:41.66666667%}.col-6{flex:0 0 auto;width:50%}.col-7{flex:0 0 auto;width:58.33333333%}.col-8{flex:0 0 auto;width:66.66666667%}.col-9{flex:0 0 auto;width:75%}.col-10{flex:0 0 auto;width:83.33333333%}.col-11{flex:0 0 auto;width:91.66666667%}.col-12{flex:0 0 auto;width:100%}.offset-1{margin-left:8.33333333%}.offset-2{margin-left:16.66666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.33333333%}.offset-5{margin-left:41.66666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.33333333%}.offset-8{margin-left:66.66666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.33333333%}.offset-11{margin-left:91.66666667%}.g-0,.gx-0{--bs-gutter-x: 0}.g-0,.gy-0{--bs-gutter-y: 0}.g-1,.gx-1{--bs-gutter-x: .25rem}.g-1,.gy-1{--bs-gutter-y: .25rem}.g-2,.gx-2{--bs-gutter-x: .5rem}.g-2,.gy-2{--bs-gutter-y: .5rem}.g-3,.gx-3{--bs-gutter-x: 1rem}.g-3,.gy-3{--bs-gutter-y: 1rem}.g-4,.gx-4{--bs-gutter-x: 1.5rem}.g-4,.gy-4{--bs-gutter-y: 1.5rem}.g-5,.gx-5{--bs-gutter-x: 3rem}.g-5,.gy-5{--bs-gutter-y: 3rem}@media (min-width: 576px){.col-sm{flex:1 0 0%}.row-cols-sm-auto>*{flex:0 0 auto;width:auto}.row-cols-sm-1>*{flex:0 0 auto;width:100%}.row-cols-sm-2>*{flex:0 0 auto;width:50%}.row-cols-sm-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-sm-4>*{flex:0 0 auto;width:25%}.row-cols-sm-5>*{flex:0 0 auto;width:20%}.row-cols-sm-6>*{flex:0 0 auto;width:16.6666666667%}.col-sm-auto{flex:0 0 auto;width:auto}.col-sm-1{flex:0 0 auto;width:8.33333333%}.col-sm-2{flex:0 0 auto;width:16.66666667%}.col-sm-3{flex:0 0 auto;width:25%}.col-sm-4{flex:0 0 auto;width:33.33333333%}.col-sm-5{flex:0 0 auto;width:41.66666667%}.col-sm-6{flex:0 0 auto;width:50%}.col-sm-7{flex:0 0 auto;width:58.33333333%}.col-sm-8{flex:0 0 auto;width:66.66666667%}.col-sm-9{flex:0 0 auto;width:75%}.col-sm-10{flex:0 0 auto;width:83.33333333%}.col-sm-11{flex:0 0 auto;width:91.66666667%}.col-sm-12{flex:0 0 auto;width:100%}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.33333333%}.offset-sm-2{margin-left:16.66666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.33333333%}.offset-sm-5{margin-left:41.66666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.33333333%}.offset-sm-8{margin-left:66.66666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.33333333%}.offset-sm-11{margin-left:91.66666667%}.g-sm-0,.gx-sm-0{--bs-gutter-x: 0}.g-sm-0,.gy-sm-0{--bs-gutter-y: 0}.g-sm-1,.gx-sm-1{--bs-gutter-x: .25rem}.g-sm-1,.gy-sm-1{--bs-gutter-y: .25rem}.g-sm-2,.gx-sm-2{--bs-gutter-x: .5rem}.g-sm-2,.gy-sm-2{--bs-gutter-y: .5rem}.g-sm-3,.gx-sm-3{--bs-gutter-x: 1rem}.g-sm-3,.gy-sm-3{--bs-gutter-y: 1rem}.g-sm-4,.gx-sm-4{--bs-gutter-x: 1.5rem}.g-sm-4,.gy-sm-4{--bs-gutter-y: 1.5rem}.g-sm-5,.gx-sm-5{--bs-gutter-x: 3rem}.g-sm-5,.gy-sm-5{--bs-gutter-y: 3rem}}@media (min-width: 768px){.col-md{flex:1 0 0%}.row-cols-md-auto>*{flex:0 0 auto;width:auto}.row-cols-md-1>*{flex:0 0 auto;width:100%}.row-cols-md-2>*{flex:0 0 auto;width:50%}.row-cols-md-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-md-4>*{flex:0 0 auto;width:25%}.row-cols-md-5>*{flex:0 0 auto;width:20%}.row-cols-md-6>*{flex:0 0 auto;width:16.6666666667%}.col-md-auto{flex:0 0 auto;width:auto}.col-md-1{flex:0 0 auto;width:8.33333333%}.col-md-2{flex:0 0 auto;width:16.66666667%}.col-md-3{flex:0 0 auto;width:25%}.col-md-4{flex:0 0 auto;width:33.33333333%}.col-md-5{flex:0 0 auto;width:41.66666667%}.col-md-6{flex:0 0 auto;width:50%}.col-md-7{flex:0 0 auto;width:58.33333333%}.col-md-8{flex:0 0 auto;width:66.66666667%}.col-md-9{flex:0 0 auto;width:75%}.col-md-10{flex:0 0 auto;width:83.33333333%}.col-md-11{flex:0 0 auto;width:91.66666667%}.col-md-12{flex:0 0 auto;width:100%}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.33333333%}.offset-md-2{margin-left:16.66666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.33333333%}.offset-md-5{margin-left:41.66666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.33333333%}.offset-md-8{margin-left:66.66666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.33333333%}.offset-md-11{margin-left:91.66666667%}.g-md-0,.gx-md-0{--bs-gutter-x: 0}.g-md-0,.gy-md-0{--bs-gutter-y: 0}.g-md-1,.gx-md-1{--bs-gutter-x: .25rem}.g-md-1,.gy-md-1{--bs-gutter-y: .25rem}.g-md-2,.gx-md-2{--bs-gutter-x: .5rem}.g-md-2,.gy-md-2{--bs-gutter-y: .5rem}.g-md-3,.gx-md-3{--bs-gutter-x: 1rem}.g-md-3,.gy-md-3{--bs-gutter-y: 1rem}.g-md-4,.gx-md-4{--bs-gutter-x: 1.5rem}.g-md-4,.gy-md-4{--bs-gutter-y: 1.5rem}.g-md-5,.gx-md-5{--bs-gutter-x: 3rem}.g-md-5,.gy-md-5{--bs-gutter-y: 3rem}}@media (min-width: 992px){.col-lg{flex:1 0 0%}.row-cols-lg-auto>*{flex:0 0 auto;width:auto}.row-cols-lg-1>*{flex:0 0 auto;width:100%}.row-cols-lg-2>*{flex:0 0 auto;width:50%}.row-cols-lg-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-lg-4>*{flex:0 0 auto;width:25%}.row-cols-lg-5>*{flex:0 0 auto;width:20%}.row-cols-lg-6>*{flex:0 0 auto;width:16.6666666667%}.col-lg-auto{flex:0 0 auto;width:auto}.col-lg-1{flex:0 0 auto;width:8.33333333%}.col-lg-2{flex:0 0 auto;width:16.66666667%}.col-lg-3{flex:0 0 auto;width:25%}.col-lg-4{flex:0 0 auto;width:33.33333333%}.col-lg-5{flex:0 0 auto;width:41.66666667%}.col-lg-6{flex:0 0 auto;width:50%}.col-lg-7{flex:0 0 auto;width:58.33333333%}.col-lg-8{flex:0 0 auto;width:66.66666667%}.col-lg-9{flex:0 0 auto;width:75%}.col-lg-10{flex:0 0 auto;width:83.33333333%}.col-lg-11{flex:0 0 auto;width:91.66666667%}.col-lg-12{flex:0 0 auto;width:100%}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.33333333%}.offset-lg-2{margin-left:16.66666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.33333333%}.offset-lg-5{margin-left:41.66666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.33333333%}.offset-lg-8{margin-left:66.66666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.33333333%}.offset-lg-11{margin-left:91.66666667%}.g-lg-0,.gx-lg-0{--bs-gutter-x: 0}.g-lg-0,.gy-lg-0{--bs-gutter-y: 0}.g-lg-1,.gx-lg-1{--bs-gutter-x: .25rem}.g-lg-1,.gy-lg-1{--bs-gutter-y: .25rem}.g-lg-2,.gx-lg-2{--bs-gutter-x: .5rem}.g-lg-2,.gy-lg-2{--bs-gutter-y: .5rem}.g-lg-3,.gx-lg-3{--bs-gutter-x: 1rem}.g-lg-3,.gy-lg-3{--bs-gutter-y: 1rem}.g-lg-4,.gx-lg-4{--bs-gutter-x: 1.5rem}.g-lg-4,.gy-lg-4{--bs-gutter-y: 1.5rem}.g-lg-5,.gx-lg-5{--bs-gutter-x: 3rem}.g-lg-5,.gy-lg-5{--bs-gutter-y: 3rem}}@media (min-width: 1200px){.col-xl{flex:1 0 0%}.row-cols-xl-auto>*{flex:0 0 auto;width:auto}.row-cols-xl-1>*{flex:0 0 auto;width:100%}.row-cols-xl-2>*{flex:0 0 auto;width:50%}.row-cols-xl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xl-4>*{flex:0 0 auto;width:25%}.row-cols-xl-5>*{flex:0 0 auto;width:20%}.row-cols-xl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xl-auto{flex:0 0 auto;width:auto}.col-xl-1{flex:0 0 auto;width:8.33333333%}.col-xl-2{flex:0 0 auto;width:16.66666667%}.col-xl-3{flex:0 0 auto;width:25%}.col-xl-4{flex:0 0 auto;width:33.33333333%}.col-xl-5{flex:0 0 auto;width:41.66666667%}.col-xl-6{flex:0 0 auto;width:50%}.col-xl-7{flex:0 0 auto;width:58.33333333%}.col-xl-8{flex:0 0 auto;width:66.66666667%}.col-xl-9{flex:0 0 auto;width:75%}.col-xl-10{flex:0 0 auto;width:83.33333333%}.col-xl-11{flex:0 0 auto;width:91.66666667%}.col-xl-12{flex:0 0 auto;width:100%}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.33333333%}.offset-xl-2{margin-left:16.66666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.33333333%}.offset-xl-5{margin-left:41.66666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.33333333%}.offset-xl-8{margin-left:66.66666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.33333333%}.offset-xl-11{margin-left:91.66666667%}.g-xl-0,.gx-xl-0{--bs-gutter-x: 0}.g-xl-0,.gy-xl-0{--bs-gutter-y: 0}.g-xl-1,.gx-xl-1{--bs-gutter-x: .25rem}.g-xl-1,.gy-xl-1{--bs-gutter-y: .25rem}.g-xl-2,.gx-xl-2{--bs-gutter-x: .5rem}.g-xl-2,.gy-xl-2{--bs-gutter-y: .5rem}.g-xl-3,.gx-xl-3{--bs-gutter-x: 1rem}.g-xl-3,.gy-xl-3{--bs-gutter-y: 1rem}.g-xl-4,.gx-xl-4{--bs-gutter-x: 1.5rem}.g-xl-4,.gy-xl-4{--bs-gutter-y: 1.5rem}.g-xl-5,.gx-xl-5{--bs-gutter-x: 3rem}.g-xl-5,.gy-xl-5{--bs-gutter-y: 3rem}}@media (min-width: 1400px){.col-xxl{flex:1 0 0%}.row-cols-xxl-auto>*{flex:0 0 auto;width:auto}.row-cols-xxl-1>*{flex:0 0 auto;width:100%}.row-cols-xxl-2>*{flex:0 0 auto;width:50%}.row-cols-xxl-3>*{flex:0 0 auto;width:33.3333333333%}.row-cols-xxl-4>*{flex:0 0 auto;width:25%}.row-cols-xxl-5>*{flex:0 0 auto;width:20%}.row-cols-xxl-6>*{flex:0 0 auto;width:16.6666666667%}.col-xxl-auto{flex:0 0 auto;width:auto}.col-xxl-1{flex:0 0 auto;width:8.33333333%}.col-xxl-2{flex:0 0 auto;width:16.66666667%}.col-xxl-3{flex:0 0 auto;width:25%}.col-xxl-4{flex:0 0 auto;width:33.33333333%}.col-xxl-5{flex:0 0 auto;width:41.66666667%}.col-xxl-6{flex:0 0 auto;width:50%}.col-xxl-7{flex:0 0 auto;width:58.33333333%}.col-xxl-8{flex:0 0 auto;width:66.66666667%}.col-xxl-9{flex:0 0 auto;width:75%}.col-xxl-10{flex:0 0 auto;width:83.33333333%}.col-xxl-11{flex:0 0 auto;width:91.66666667%}.col-xxl-12{flex:0 0 auto;width:100%}.offset-xxl-0{margin-left:0}.offset-xxl-1{margin-left:8.33333333%}.offset-xxl-2{margin-left:16.66666667%}.offset-xxl-3{margin-left:25%}.offset-xxl-4{margin-left:33.33333333%}.offset-xxl-5{margin-left:41.66666667%}.offset-xxl-6{margin-left:50%}.offset-xxl-7{margin-left:58.33333333%}.offset-xxl-8{margin-left:66.66666667%}.offset-xxl-9{margin-left:75%}.offset-xxl-10{margin-left:83.33333333%}.offset-xxl-11{margin-left:91.66666667%}.g-xxl-0,.gx-xxl-0{--bs-gutter-x: 0}.g-xxl-0,.gy-xxl-0{--bs-gutter-y: 0}.g-xxl-1,.gx-xxl-1{--bs-gutter-x: .25rem}.g-xxl-1,.gy-xxl-1{--bs-gutter-y: .25rem}.g-xxl-2,.gx-xxl-2{--bs-gutter-x: .5rem}.g-xxl-2,.gy-xxl-2{--bs-gutter-y: .5rem}.g-xxl-3,.gx-xxl-3{--bs-gutter-x: 1rem}.g-xxl-3,.gy-xxl-3{--bs-gutter-y: 1rem}.g-xxl-4,.gx-xxl-4{--bs-gutter-x: 1.5rem}.g-xxl-4,.gy-xxl-4{--bs-gutter-y: 1.5rem}.g-xxl-5,.gx-xxl-5{--bs-gutter-x: 3rem}.g-xxl-5,.gy-xxl-5{--bs-gutter-y: 3rem}}.table{--bs-table-color: var(--bs-body-color);--bs-table-bg: transparent;--bs-table-border-color: var(--bs-border-color);--bs-table-accent-bg: transparent;--bs-table-striped-color: var(--bs-body-color);--bs-table-striped-bg: rgba(0, 0, 0, .05);--bs-table-active-color: var(--bs-body-color);--bs-table-active-bg: rgba(0, 0, 0, .1);--bs-table-hover-color: var(--bs-body-color);--bs-table-hover-bg: rgba(0, 0, 0, .075);width:100%;margin-bottom:1rem;color:var(--bs-table-color);vertical-align:top;border-color:var(--bs-table-border-color)}.table>:not(caption)>*>*{padding:.5rem;background-color:var(--bs-table-bg);border-bottom-width:1px;box-shadow:inset 0 0 0 9999px var(--bs-table-accent-bg)}.table>tbody{vertical-align:inherit}.table>thead{vertical-align:bottom}.table-group-divider{border-top:2px solid currentcolor}.caption-top{caption-side:top}.table-sm>:not(caption)>*>*{padding:.25rem}.table-bordered>:not(caption)>*{border-width:1px 0}.table-bordered>:not(caption)>*>*{border-width:0 1px}.table-borderless>:not(caption)>*>*{border-bottom-width:0}.table-borderless>:not(:first-child){border-top-width:0}.table-striped>tbody>tr:nth-of-type(odd)>*{--bs-table-accent-bg: var(--bs-table-striped-bg);color:var(--bs-table-striped-color)}.table-striped-columns>:not(caption)>tr>:nth-child(2n){--bs-table-accent-bg: var(--bs-table-striped-bg);color:var(--bs-table-striped-color)}.table-active{--bs-table-accent-bg: var(--bs-table-active-bg);color:var(--bs-table-active-color)}.table-hover>tbody>tr:hover>*{--bs-table-accent-bg: var(--bs-table-hover-bg);color:var(--bs-table-hover-color)}.table-primary{--bs-table-color: #000;--bs-table-bg: #cfe2ff;--bs-table-border-color: #bacbe6;--bs-table-striped-bg: #c5d7f2;--bs-table-striped-color: #000;--bs-table-active-bg: #bacbe6;--bs-table-active-color: #000;--bs-table-hover-bg: #bfd1ec;--bs-table-hover-color: #000;color:var(--bs-table-color);border-color:var(--bs-table-border-color)}.table-secondary{--bs-table-color: #000;--bs-table-bg: #e2e3e5;--bs-table-border-color: #cbccce;--bs-table-striped-bg: #d7d8da;--bs-table-striped-color: #000;--bs-table-active-bg: #cbccce;--bs-table-active-color: #000;--bs-table-hover-bg: #d1d2d4;--bs-table-hover-color: #000;color:var(--bs-table-color);border-color:var(--bs-table-border-color)}.table-success{--bs-table-color: #000;--bs-table-bg: #d1e7dd;--bs-table-border-color: #bcd0c7;--bs-table-striped-bg: #c7dbd2;--bs-table-striped-color: #000;--bs-table-active-bg: #bcd0c7;--bs-table-active-color: #000;--bs-table-hover-bg: #c1d6cc;--bs-table-hover-color: #000;color:var(--bs-table-color);border-color:var(--bs-table-border-color)}.table-info{--bs-table-color: #000;--bs-table-bg: #cff4fc;--bs-table-border-color: #badce3;--bs-table-striped-bg: #c5e8ef;--bs-table-striped-color: #000;--bs-table-active-bg: #badce3;--bs-table-active-color: #000;--bs-table-hover-bg: #bfe2e9;--bs-table-hover-color: #000;color:var(--bs-table-color);border-color:var(--bs-table-border-color)}.table-warning{--bs-table-color: #000;--bs-table-bg: #fff3cd;--bs-table-border-color: #e6dbb9;--bs-table-striped-bg: #f2e7c3;--bs-table-striped-color: #000;--bs-table-active-bg: #e6dbb9;--bs-table-active-color: #000;--bs-table-hover-bg: #ece1be;--bs-table-hover-color: #000;color:var(--bs-table-color);border-color:var(--bs-table-border-color)}.table-danger{--bs-table-color: #000;--bs-table-bg: #f8d7da;--bs-table-border-color: #dfc2c4;--bs-table-striped-bg: #eccccf;--bs-table-striped-color: #000;--bs-table-active-bg: #dfc2c4;--bs-table-active-color: #000;--bs-table-hover-bg: #e5c7ca;--bs-table-hover-color: #000;color:var(--bs-table-color);border-color:var(--bs-table-border-color)}.table-light{--bs-table-color: #000;--bs-table-bg: #f8f9fa;--bs-table-border-color: #dfe0e1;--bs-table-striped-bg: #ecedee;--bs-table-striped-color: #000;--bs-table-active-bg: #dfe0e1;--bs-table-active-color: #000;--bs-table-hover-bg: #e5e6e7;--bs-table-hover-color: #000;color:var(--bs-table-color);border-color:var(--bs-table-border-color)}.table-dark{--bs-table-color: #fff;--bs-table-bg: #212529;--bs-table-border-color: #373b3e;--bs-table-striped-bg: #2c3034;--bs-table-striped-color: #fff;--bs-table-active-bg: #373b3e;--bs-table-active-color: #fff;--bs-table-hover-bg: #323539;--bs-table-hover-color: #fff;color:var(--bs-table-color);border-color:var(--bs-table-border-color)}.table-responsive{overflow-x:auto;-webkit-overflow-scrolling:touch}@media (max-width: 575.98px){.table-responsive-sm{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media (max-width: 767.98px){.table-responsive-md{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media (max-width: 991.98px){.table-responsive-lg{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media (max-width: 1199.98px){.table-responsive-xl{overflow-x:auto;-webkit-overflow-scrolling:touch}}@media (max-width: 1399.98px){.table-responsive-xxl{overflow-x:auto;-webkit-overflow-scrolling:touch}}.form-label{margin-bottom:.5rem}.col-form-label{padding-top:calc(.375rem + 1px);padding-bottom:calc(.375rem + 1px);margin-bottom:0;font-size:inherit;line-height:1.5}.col-form-label-lg{padding-top:calc(.5rem + 1px);padding-bottom:calc(.5rem + 1px);font-size:1.25rem}.col-form-label-sm{padding-top:calc(.25rem + 1px);padding-bottom:calc(.25rem + 1px);font-size:.875rem}.form-text{margin-top:.25rem;font-size:.875em;color:#6c757d}.form-control{display:block;width:100%;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:.375rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.form-control{transition:none}}.form-control[type=file]{overflow:hidden}.form-control[type=file]:not(:disabled):not([readonly]){cursor:pointer}.form-control:focus{color:#212529;background-color:#fff;border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.form-control::-webkit-date-and-time-value{height:1.5em}.form-control::-moz-placeholder{color:#6c757d;opacity:1}.form-control::placeholder{color:#6c757d;opacity:1}.form-control:disabled{background-color:#e9ecef;opacity:1}.form-control::-webkit-file-upload-button{padding:.375rem .75rem;margin:-.375rem -.75rem;-webkit-margin-end:.75rem;margin-inline-end:.75rem;color:#212529;background-color:#e9ecef;pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:1px;border-radius:0;-webkit-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.form-control::file-selector-button{padding:.375rem .75rem;margin:-.375rem -.75rem;-webkit-margin-end:.75rem;margin-inline-end:.75rem;color:#212529;background-color:#e9ecef;pointer-events:none;border-color:inherit;border-style:solid;border-width:0;border-inline-end-width:1px;border-radius:0;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.form-control::-webkit-file-upload-button{-webkit-transition:none;transition:none}.form-control::file-selector-button{transition:none}}.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button{background-color:#dde0e3}.form-control:hover:not(:disabled):not([readonly])::file-selector-button{background-color:#dde0e3}.form-control-plaintext{display:block;width:100%;padding:.375rem 0;margin-bottom:0;line-height:1.5;color:#212529;background-color:transparent;border:solid transparent;border-width:1px 0}.form-control-plaintext:focus{outline:0}.form-control-plaintext.form-control-lg,.form-control-plaintext.form-control-sm{padding-right:0;padding-left:0}.form-control-sm{min-height:calc(1.5em + .5rem + 2px);padding:.25rem .5rem;font-size:.875rem;border-radius:.25rem}.form-control-sm::-webkit-file-upload-button{padding:.25rem .5rem;margin:-.25rem -.5rem;-webkit-margin-end:.5rem;margin-inline-end:.5rem}.form-control-sm::file-selector-button{padding:.25rem .5rem;margin:-.25rem -.5rem;-webkit-margin-end:.5rem;margin-inline-end:.5rem}.form-control-lg{min-height:calc(1.5em + 1rem + 2px);padding:.5rem 1rem;font-size:1.25rem;border-radius:.5rem}.form-control-lg::-webkit-file-upload-button{padding:.5rem 1rem;margin:-.5rem -1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}.form-control-lg::file-selector-button{padding:.5rem 1rem;margin:-.5rem -1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}textarea.form-control{min-height:calc(1.5em + .75rem + 2px)}textarea.form-control-sm{min-height:calc(1.5em + .5rem + 2px)}textarea.form-control-lg{min-height:calc(1.5em + 1rem + 2px)}.form-control-color{width:3rem;height:calc(1.5em + .75rem + 2px);padding:.375rem}.form-control-color:not(:disabled):not([readonly]){cursor:pointer}.form-control-color::-moz-color-swatch{border:0!important;border-radius:.375rem}.form-control-color::-webkit-color-swatch{border-radius:.375rem}.form-control-color.form-control-sm{height:calc(1.5em + .5rem + 2px)}.form-control-color.form-control-lg{height:calc(1.5em + 1rem + 2px)}.form-select{display:block;width:100%;padding:.375rem 2.25rem .375rem .75rem;-moz-padding-start:calc(.75rem - 3px);font-size:1rem;font-weight:400;line-height:1.5;color:#212529;background-color:#fff;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right .75rem center;background-size:16px 12px;border:1px solid #ced4da;border-radius:.375rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-appearance:none;-moz-appearance:none;appearance:none}@media (prefers-reduced-motion: reduce){.form-select{transition:none}}.form-select:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.form-select[multiple],.form-select[size]:not([size="1"]){padding-right:.75rem;background-image:none}.form-select:disabled{background-color:#e9ecef}.form-select:-moz-focusring{color:transparent;text-shadow:0 0 0 #212529}.form-select-sm{padding-top:.25rem;padding-bottom:.25rem;padding-left:.5rem;font-size:.875rem;border-radius:.25rem}.form-select-lg{padding-top:.5rem;padding-bottom:.5rem;padding-left:1rem;font-size:1.25rem;border-radius:.5rem}.form-check{display:block;min-height:1.5rem;padding-left:1.5em;margin-bottom:.125rem}.form-check .form-check-input{float:left;margin-left:-1.5em}.form-check-reverse{padding-right:1.5em;padding-left:0;text-align:right}.form-check-reverse .form-check-input{float:right;margin-right:-1.5em;margin-left:0}.form-check-input{width:1em;height:1em;margin-top:.25em;vertical-align:top;background-color:#fff;background-repeat:no-repeat;background-position:center;background-size:contain;border:1px solid rgba(0,0,0,.25);-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-print-color-adjust:exact;color-adjust:exact;print-color-adjust:exact}.form-check-input[type=checkbox]{border-radius:.25em}.form-check-input[type=radio]{border-radius:50%}.form-check-input:active{filter:brightness(90%)}.form-check-input:focus{border-color:#86b7fe;outline:0;box-shadow:0 0 0 .25rem #0d6efd40}.form-check-input:checked{background-color:#0d6efd;border-color:#0d6efd}.form-check-input:checked[type=checkbox]{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e")}.form-check-input:checked[type=radio]{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e")}.form-check-input[type=checkbox]:indeterminate{background-color:#0d6efd;border-color:#0d6efd;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e")}.form-check-input:disabled{pointer-events:none;filter:none;opacity:.5}.form-check-input:disabled~.form-check-label,.form-check-input[disabled]~.form-check-label{cursor:default;opacity:.5}.form-switch{padding-left:2.5em}.form-switch .form-check-input{width:2em;margin-left:-2.5em;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");background-position:left center;border-radius:2em;transition:background-position .15s ease-in-out}@media (prefers-reduced-motion: reduce){.form-switch .form-check-input{transition:none}}.form-switch .form-check-input:focus{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e")}.form-switch .form-check-input:checked{background-position:right center;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e")}.form-switch.form-check-reverse{padding-right:2.5em;padding-left:0}.form-switch.form-check-reverse .form-check-input{margin-right:-2.5em;margin-left:0}.form-check-inline{display:inline-block;margin-right:1rem}.btn-check{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.btn-check:disabled+.btn,.btn-check[disabled]+.btn{pointer-events:none;filter:none;opacity:.65}.form-range{width:100%;height:1.5rem;padding:0;background-color:transparent;-webkit-appearance:none;-moz-appearance:none;appearance:none}.form-range:focus{outline:0}.form-range:focus::-webkit-slider-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .25rem #0d6efd40}.form-range:focus::-moz-range-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .25rem #0d6efd40}.form-range::-moz-focus-outer{border:0}.form-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-.25rem;background-color:#0d6efd;border:0;border-radius:1rem;-webkit-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-appearance:none;appearance:none}@media (prefers-reduced-motion: reduce){.form-range::-webkit-slider-thumb{-webkit-transition:none;transition:none}}.form-range::-webkit-slider-thumb:active{background-color:#b6d4fe}.form-range::-webkit-slider-runnable-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#dee2e6;border-color:transparent;border-radius:1rem}.form-range::-moz-range-thumb{width:1rem;height:1rem;background-color:#0d6efd;border:0;border-radius:1rem;-moz-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;-moz-appearance:none;appearance:none}@media (prefers-reduced-motion: reduce){.form-range::-moz-range-thumb{-moz-transition:none;transition:none}}.form-range::-moz-range-thumb:active{background-color:#b6d4fe}.form-range::-moz-range-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#dee2e6;border-color:transparent;border-radius:1rem}.form-range:disabled{pointer-events:none}.form-range:disabled::-webkit-slider-thumb{background-color:#adb5bd}.form-range:disabled::-moz-range-thumb{background-color:#adb5bd}.form-floating{position:relative}.form-floating>.form-control,.form-floating>.form-control-plaintext,.form-floating>.form-select{height:calc(3.5rem + 2px);line-height:1.25}.form-floating>label{position:absolute;top:0;left:0;width:100%;height:100%;padding:1rem .75rem;overflow:hidden;text-align:start;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;border:1px solid transparent;transform-origin:0 0;transition:opacity .1s ease-in-out,transform .1s ease-in-out}@media (prefers-reduced-motion: reduce){.form-floating>label{transition:none}}.form-floating>.form-control,.form-floating>.form-control-plaintext{padding:1rem .75rem}.form-floating>.form-control-plaintext::-moz-placeholder,.form-floating>.form-control::-moz-placeholder{color:transparent}.form-floating>.form-control-plaintext::placeholder,.form-floating>.form-control::placeholder{color:transparent}.form-floating>.form-control-plaintext:not(:-moz-placeholder-shown),.form-floating>.form-control:not(:-moz-placeholder-shown){padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control-plaintext:focus,.form-floating>.form-control-plaintext:not(:placeholder-shown),.form-floating>.form-control:focus,.form-floating>.form-control:not(:placeholder-shown){padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control-plaintext:-webkit-autofill,.form-floating>.form-control:-webkit-autofill{padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-select{padding-top:1.625rem;padding-bottom:.625rem}.form-floating>.form-control:not(:-moz-placeholder-shown)~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translate(.15rem)}.form-floating>.form-control-plaintext~label,.form-floating>.form-control:focus~label,.form-floating>.form-control:not(:placeholder-shown)~label,.form-floating>.form-select~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translate(.15rem)}.form-floating>.form-control:-webkit-autofill~label{opacity:.65;transform:scale(.85) translateY(-.5rem) translate(.15rem)}.form-floating>.form-control-plaintext~label{border-width:1px 0}.input-group{position:relative;display:flex;flex-wrap:wrap;align-items:stretch;width:100%}.input-group>.form-control,.input-group>.form-floating,.input-group>.form-select{position:relative;flex:1 1 auto;width:1%;min-width:0}.input-group>.form-control:focus,.input-group>.form-floating:focus-within,.input-group>.form-select:focus{z-index:5}.input-group .btn{position:relative;z-index:2}.input-group .btn:focus{z-index:5}.input-group-text{display:flex;align-items:center;padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:center;white-space:nowrap;background-color:#e9ecef;border:1px solid #ced4da;border-radius:.375rem}.input-group-lg>.btn,.input-group-lg>.form-control,.input-group-lg>.form-select,.input-group-lg>.input-group-text{padding:.5rem 1rem;font-size:1.25rem;border-radius:.5rem}.input-group-sm>.btn,.input-group-sm>.form-control,.input-group-sm>.form-select,.input-group-sm>.input-group-text{padding:.25rem .5rem;font-size:.875rem;border-radius:.25rem}.input-group-lg>.form-select,.input-group-sm>.form-select{padding-right:3rem}.input-group:not(.has-validation)>.dropdown-toggle:nth-last-child(n + 3),.input-group:not(.has-validation)>.form-floating:not(:last-child)>.form-control,.input-group:not(.has-validation)>.form-floating:not(:last-child)>.form-select,.input-group:not(.has-validation)>:not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating){border-top-right-radius:0;border-bottom-right-radius:0}.input-group.has-validation>.dropdown-toggle:nth-last-child(n + 4),.input-group.has-validation>.form-floating:nth-last-child(n + 3)>.form-control,.input-group.has-validation>.form-floating:nth-last-child(n + 3)>.form-select,.input-group.has-validation>:nth-last-child(n + 3):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating){border-top-right-radius:0;border-bottom-right-radius:0}.input-group>:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback){margin-left:-1px;border-top-left-radius:0;border-bottom-left-radius:0}.input-group>.form-floating:not(:first-child)>.form-control,.input-group>.form-floating:not(:first-child)>.form-select{border-top-left-radius:0;border-bottom-left-radius:0}.valid-feedback{display:none;width:100%;margin-top:.25rem;font-size:.875em;color:#198754}.valid-tooltip{position:absolute;top:100%;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;color:#fff;background-color:#198754e6;border-radius:.375rem}.is-valid~.valid-feedback,.is-valid~.valid-tooltip,.was-validated :valid~.valid-feedback,.was-validated :valid~.valid-tooltip{display:block}.form-control.is-valid,.was-validated .form-control:valid{border-color:#198754;padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.form-control.is-valid:focus,.was-validated .form-control:valid:focus{border-color:#198754;box-shadow:0 0 0 .25rem #19875440}.was-validated textarea.form-control:valid,textarea.form-control.is-valid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.form-select.is-valid,.was-validated .form-select:valid{border-color:#198754}.form-select.is-valid:not([multiple]):not([size]),.form-select.is-valid:not([multiple])[size="1"],.was-validated .form-select:valid:not([multiple]):not([size]),.was-validated .form-select:valid:not([multiple])[size="1"]{padding-right:4.125rem;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"),url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");background-position:right .75rem center,center right 2.25rem;background-size:16px 12px,calc(.75em + .375rem) calc(.75em + .375rem)}.form-select.is-valid:focus,.was-validated .form-select:valid:focus{border-color:#198754;box-shadow:0 0 0 .25rem #19875440}.form-control-color.is-valid,.was-validated .form-control-color:valid{width:calc(3.75rem + 1.5em)}.form-check-input.is-valid,.was-validated .form-check-input:valid{border-color:#198754}.form-check-input.is-valid:checked,.was-validated .form-check-input:valid:checked{background-color:#198754}.form-check-input.is-valid:focus,.was-validated .form-check-input:valid:focus{box-shadow:0 0 0 .25rem #19875440}.form-check-input.is-valid~.form-check-label,.was-validated .form-check-input:valid~.form-check-label{color:#198754}.form-check-inline .form-check-input~.valid-feedback{margin-left:.5em}.input-group>.form-control:not(:focus).is-valid,.input-group>.form-floating:not(:focus-within).is-valid,.input-group>.form-select:not(:focus).is-valid,.was-validated .input-group>.form-control:not(:focus):valid,.was-validated .input-group>.form-floating:not(:focus-within):valid,.was-validated .input-group>.form-select:not(:focus):valid{z-index:3}.invalid-feedback{display:none;width:100%;margin-top:.25rem;font-size:.875em;color:#dc3545}.invalid-tooltip{position:absolute;top:100%;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;color:#fff;background-color:#dc3545e6;border-radius:.375rem}.is-invalid~.invalid-feedback,.is-invalid~.invalid-tooltip,.was-validated :invalid~.invalid-feedback,.was-validated :invalid~.invalid-tooltip{display:block}.form-control.is-invalid,.was-validated .form-control:invalid{border-color:#dc3545;padding-right:calc(1.5em + .75rem);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.form-control.is-invalid:focus,.was-validated .form-control:invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .25rem #dc354540}.was-validated textarea.form-control:invalid,textarea.form-control.is-invalid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.form-select.is-invalid,.was-validated .form-select:invalid{border-color:#dc3545}.form-select.is-invalid:not([multiple]):not([size]),.form-select.is-invalid:not([multiple])[size="1"],.was-validated .form-select:invalid:not([multiple]):not([size]),.was-validated .form-select:invalid:not([multiple])[size="1"]{padding-right:4.125rem;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e"),url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");background-position:right .75rem center,center right 2.25rem;background-size:16px 12px,calc(.75em + .375rem) calc(.75em + .375rem)}.form-select.is-invalid:focus,.was-validated .form-select:invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .25rem #dc354540}.form-control-color.is-invalid,.was-validated .form-control-color:invalid{width:calc(3.75rem + 1.5em)}.form-check-input.is-invalid,.was-validated .form-check-input:invalid{border-color:#dc3545}.form-check-input.is-invalid:checked,.was-validated .form-check-input:invalid:checked{background-color:#dc3545}.form-check-input.is-invalid:focus,.was-validated .form-check-input:invalid:focus{box-shadow:0 0 0 .25rem #dc354540}.form-check-input.is-invalid~.form-check-label,.was-validated .form-check-input:invalid~.form-check-label{color:#dc3545}.form-check-inline .form-check-input~.invalid-feedback{margin-left:.5em}.input-group>.form-control:not(:focus).is-invalid,.input-group>.form-floating:not(:focus-within).is-invalid,.input-group>.form-select:not(:focus).is-invalid,.was-validated .input-group>.form-control:not(:focus):invalid,.was-validated .input-group>.form-floating:not(:focus-within):invalid,.was-validated .input-group>.form-select:not(:focus):invalid{z-index:4}.btn{--bs-btn-padding-x: .75rem;--bs-btn-padding-y: .375rem;--bs-btn-font-family: ;--bs-btn-font-size: 1rem;--bs-btn-font-weight: 400;--bs-btn-line-height: 1.5;--bs-btn-color: #212529;--bs-btn-bg: transparent;--bs-btn-border-width: 1px;--bs-btn-border-color: transparent;--bs-btn-border-radius: .375rem;--bs-btn-hover-border-color: transparent;--bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);--bs-btn-disabled-opacity: .65;--bs-btn-focus-box-shadow: 0 0 0 .25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);display:inline-block;padding:var(--bs-btn-padding-y) var(--bs-btn-padding-x);font-family:var(--bs-btn-font-family);font-size:var(--bs-btn-font-size);font-weight:var(--bs-btn-font-weight);line-height:var(--bs-btn-line-height);color:var(--bs-btn-color);text-align:center;text-decoration:none;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;border:var(--bs-btn-border-width) solid var(--bs-btn-border-color);border-radius:var(--bs-btn-border-radius);background-color:var(--bs-btn-bg);transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.btn{transition:none}}.btn:hover{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color)}.btn-check+.btn:hover{color:var(--bs-btn-color);background-color:var(--bs-btn-bg);border-color:var(--bs-btn-border-color)}.btn:focus-visible{color:var(--bs-btn-hover-color);background-color:var(--bs-btn-hover-bg);border-color:var(--bs-btn-hover-border-color);outline:0;box-shadow:var(--bs-btn-focus-box-shadow)}.btn-check:focus-visible+.btn{border-color:var(--bs-btn-hover-border-color);outline:0;box-shadow:var(--bs-btn-focus-box-shadow)}.btn-check:checked+.btn,.btn.active,.btn.show,.btn:first-child:active,:not(.btn-check)+.btn:active{color:var(--bs-btn-active-color);background-color:var(--bs-btn-active-bg);border-color:var(--bs-btn-active-border-color)}.btn-check:checked+.btn:focus-visible,.btn.active:focus-visible,.btn.show:focus-visible,.btn:first-child:active:focus-visible,:not(.btn-check)+.btn:active:focus-visible{box-shadow:var(--bs-btn-focus-box-shadow)}.btn.disabled,.btn:disabled,fieldset:disabled .btn{color:var(--bs-btn-disabled-color);pointer-events:none;background-color:var(--bs-btn-disabled-bg);border-color:var(--bs-btn-disabled-border-color);opacity:var(--bs-btn-disabled-opacity)}.btn-primary{--bs-btn-color: #fff;--bs-btn-bg: #0d6efd;--bs-btn-border-color: #0d6efd;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #0b5ed7;--bs-btn-hover-border-color: #0a58ca;--bs-btn-focus-shadow-rgb: 49, 132, 253;--bs-btn-active-color: #fff;--bs-btn-active-bg: #0a58ca;--bs-btn-active-border-color: #0a53be;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #0d6efd;--bs-btn-disabled-border-color: #0d6efd}.btn-secondary{--bs-btn-color: #fff;--bs-btn-bg: #6c757d;--bs-btn-border-color: #6c757d;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #5c636a;--bs-btn-hover-border-color: #565e64;--bs-btn-focus-shadow-rgb: 130, 138, 145;--bs-btn-active-color: #fff;--bs-btn-active-bg: #565e64;--bs-btn-active-border-color: #51585e;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #6c757d;--bs-btn-disabled-border-color: #6c757d}.btn-success{--bs-btn-color: #fff;--bs-btn-bg: #198754;--bs-btn-border-color: #198754;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #157347;--bs-btn-hover-border-color: #146c43;--bs-btn-focus-shadow-rgb: 60, 153, 110;--bs-btn-active-color: #fff;--bs-btn-active-bg: #146c43;--bs-btn-active-border-color: #13653f;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #198754;--bs-btn-disabled-border-color: #198754}.btn-info{--bs-btn-color: #000;--bs-btn-bg: #0dcaf0;--bs-btn-border-color: #0dcaf0;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #31d2f2;--bs-btn-hover-border-color: #25cff2;--bs-btn-focus-shadow-rgb: 11, 172, 204;--bs-btn-active-color: #000;--bs-btn-active-bg: #3dd5f3;--bs-btn-active-border-color: #25cff2;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #000;--bs-btn-disabled-bg: #0dcaf0;--bs-btn-disabled-border-color: #0dcaf0}.btn-warning{--bs-btn-color: #000;--bs-btn-bg: #ffc107;--bs-btn-border-color: #ffc107;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #ffca2c;--bs-btn-hover-border-color: #ffc720;--bs-btn-focus-shadow-rgb: 217, 164, 6;--bs-btn-active-color: #000;--bs-btn-active-bg: #ffcd39;--bs-btn-active-border-color: #ffc720;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #000;--bs-btn-disabled-bg: #ffc107;--bs-btn-disabled-border-color: #ffc107}.btn-danger{--bs-btn-color: #fff;--bs-btn-bg: #dc3545;--bs-btn-border-color: #dc3545;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #bb2d3b;--bs-btn-hover-border-color: #b02a37;--bs-btn-focus-shadow-rgb: 225, 83, 97;--bs-btn-active-color: #fff;--bs-btn-active-bg: #b02a37;--bs-btn-active-border-color: #a52834;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #dc3545;--bs-btn-disabled-border-color: #dc3545}.btn-light{--bs-btn-color: #000;--bs-btn-bg: #f8f9fa;--bs-btn-border-color: #f8f9fa;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #d3d4d5;--bs-btn-hover-border-color: #c6c7c8;--bs-btn-focus-shadow-rgb: 211, 212, 213;--bs-btn-active-color: #000;--bs-btn-active-bg: #c6c7c8;--bs-btn-active-border-color: #babbbc;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #000;--bs-btn-disabled-bg: #f8f9fa;--bs-btn-disabled-border-color: #f8f9fa}.btn-dark{--bs-btn-color: #fff;--bs-btn-bg: #212529;--bs-btn-border-color: #212529;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #424649;--bs-btn-hover-border-color: #373b3e;--bs-btn-focus-shadow-rgb: 66, 70, 73;--bs-btn-active-color: #fff;--bs-btn-active-bg: #4d5154;--bs-btn-active-border-color: #373b3e;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #fff;--bs-btn-disabled-bg: #212529;--bs-btn-disabled-border-color: #212529}.btn-outline-primary{--bs-btn-color: #0d6efd;--bs-btn-border-color: #0d6efd;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #0d6efd;--bs-btn-hover-border-color: #0d6efd;--bs-btn-focus-shadow-rgb: 13, 110, 253;--bs-btn-active-color: #fff;--bs-btn-active-bg: #0d6efd;--bs-btn-active-border-color: #0d6efd;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #0d6efd;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #0d6efd;--bs-gradient: none}.btn-outline-secondary{--bs-btn-color: #6c757d;--bs-btn-border-color: #6c757d;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #6c757d;--bs-btn-hover-border-color: #6c757d;--bs-btn-focus-shadow-rgb: 108, 117, 125;--bs-btn-active-color: #fff;--bs-btn-active-bg: #6c757d;--bs-btn-active-border-color: #6c757d;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #6c757d;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #6c757d;--bs-gradient: none}.btn-outline-success{--bs-btn-color: #198754;--bs-btn-border-color: #198754;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #198754;--bs-btn-hover-border-color: #198754;--bs-btn-focus-shadow-rgb: 25, 135, 84;--bs-btn-active-color: #fff;--bs-btn-active-bg: #198754;--bs-btn-active-border-color: #198754;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #198754;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #198754;--bs-gradient: none}.btn-outline-info{--bs-btn-color: #0dcaf0;--bs-btn-border-color: #0dcaf0;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #0dcaf0;--bs-btn-hover-border-color: #0dcaf0;--bs-btn-focus-shadow-rgb: 13, 202, 240;--bs-btn-active-color: #000;--bs-btn-active-bg: #0dcaf0;--bs-btn-active-border-color: #0dcaf0;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #0dcaf0;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #0dcaf0;--bs-gradient: none}.btn-outline-warning{--bs-btn-color: #ffc107;--bs-btn-border-color: #ffc107;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #ffc107;--bs-btn-hover-border-color: #ffc107;--bs-btn-focus-shadow-rgb: 255, 193, 7;--bs-btn-active-color: #000;--bs-btn-active-bg: #ffc107;--bs-btn-active-border-color: #ffc107;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #ffc107;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #ffc107;--bs-gradient: none}.btn-outline-danger{--bs-btn-color: #dc3545;--bs-btn-border-color: #dc3545;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #dc3545;--bs-btn-hover-border-color: #dc3545;--bs-btn-focus-shadow-rgb: 220, 53, 69;--bs-btn-active-color: #fff;--bs-btn-active-bg: #dc3545;--bs-btn-active-border-color: #dc3545;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #dc3545;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #dc3545;--bs-gradient: none}.btn-outline-light{--bs-btn-color: #f8f9fa;--bs-btn-border-color: #f8f9fa;--bs-btn-hover-color: #000;--bs-btn-hover-bg: #f8f9fa;--bs-btn-hover-border-color: #f8f9fa;--bs-btn-focus-shadow-rgb: 248, 249, 250;--bs-btn-active-color: #000;--bs-btn-active-bg: #f8f9fa;--bs-btn-active-border-color: #f8f9fa;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #f8f9fa;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #f8f9fa;--bs-gradient: none}.btn-outline-dark{--bs-btn-color: #212529;--bs-btn-border-color: #212529;--bs-btn-hover-color: #fff;--bs-btn-hover-bg: #212529;--bs-btn-hover-border-color: #212529;--bs-btn-focus-shadow-rgb: 33, 37, 41;--bs-btn-active-color: #fff;--bs-btn-active-bg: #212529;--bs-btn-active-border-color: #212529;--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);--bs-btn-disabled-color: #212529;--bs-btn-disabled-bg: transparent;--bs-btn-disabled-border-color: #212529;--bs-gradient: none}.btn-link{--bs-btn-font-weight: 400;--bs-btn-color: var(--bs-link-color);--bs-btn-bg: transparent;--bs-btn-border-color: transparent;--bs-btn-hover-color: var(--bs-link-hover-color);--bs-btn-hover-border-color: transparent;--bs-btn-active-color: var(--bs-link-hover-color);--bs-btn-active-border-color: transparent;--bs-btn-disabled-color: #6c757d;--bs-btn-disabled-border-color: transparent;--bs-btn-box-shadow: none;--bs-btn-focus-shadow-rgb: 49, 132, 253;text-decoration:underline}.btn-link:focus-visible{color:var(--bs-btn-color)}.btn-link:hover{color:var(--bs-btn-hover-color)}.btn-group-lg>.btn,.btn-lg{--bs-btn-padding-y: .5rem;--bs-btn-padding-x: 1rem;--bs-btn-font-size: 1.25rem;--bs-btn-border-radius: .5rem}.btn-group-sm>.btn,.btn-sm{--bs-btn-padding-y: .25rem;--bs-btn-padding-x: .5rem;--bs-btn-font-size: .875rem;--bs-btn-border-radius: .25rem}.fade{transition:opacity .15s linear}@media (prefers-reduced-motion: reduce){.fade{transition:none}}.fade:not(.show){opacity:0}.collapse:not(.show){display:none}.collapsing{height:0;overflow:hidden;transition:height .35s ease}@media (prefers-reduced-motion: reduce){.collapsing{transition:none}}.collapsing.collapse-horizontal{width:0;height:auto;transition:width .35s ease}@media (prefers-reduced-motion: reduce){.collapsing.collapse-horizontal{transition:none}}.dropdown,.dropdown-center,.dropend,.dropstart,.dropup,.dropup-center{position:relative}.dropdown-toggle{white-space:nowrap}.dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}.dropdown-toggle:empty:after{margin-left:0}.dropdown-menu{--bs-dropdown-zindex: 1000;--bs-dropdown-min-width: 10rem;--bs-dropdown-padding-x: 0;--bs-dropdown-padding-y: .5rem;--bs-dropdown-spacer: .125rem;--bs-dropdown-font-size: 1rem;--bs-dropdown-color: #212529;--bs-dropdown-bg: #fff;--bs-dropdown-border-color: var(--bs-border-color-translucent);--bs-dropdown-border-radius: .375rem;--bs-dropdown-border-width: 1px;--bs-dropdown-inner-border-radius:calc(.375rem - 1px);--bs-dropdown-divider-bg: var(--bs-border-color-translucent);--bs-dropdown-divider-margin-y: .5rem;--bs-dropdown-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);--bs-dropdown-link-color: #212529;--bs-dropdown-link-hover-color: #1e2125;--bs-dropdown-link-hover-bg: #e9ecef;--bs-dropdown-link-active-color: #fff;--bs-dropdown-link-active-bg: #0d6efd;--bs-dropdown-link-disabled-color: #adb5bd;--bs-dropdown-item-padding-x: 1rem;--bs-dropdown-item-padding-y: .25rem;--bs-dropdown-header-color: #6c757d;--bs-dropdown-header-padding-x: 1rem;--bs-dropdown-header-padding-y: .5rem;position:absolute;z-index:var(--bs-dropdown-zindex);display:none;min-width:var(--bs-dropdown-min-width);padding:var(--bs-dropdown-padding-y) var(--bs-dropdown-padding-x);margin:0;font-size:var(--bs-dropdown-font-size);color:var(--bs-dropdown-color);text-align:left;list-style:none;background-color:var(--bs-dropdown-bg);background-clip:padding-box;border:var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);border-radius:var(--bs-dropdown-border-radius)}.dropdown-menu[data-bs-popper]{top:100%;left:0;margin-top:var(--bs-dropdown-spacer)}.dropdown-menu-start{--bs-position: start}.dropdown-menu-start[data-bs-popper]{right:auto;left:0}.dropdown-menu-end{--bs-position: end}.dropdown-menu-end[data-bs-popper]{right:0;left:auto}@media (min-width: 576px){.dropdown-menu-sm-start{--bs-position: start}.dropdown-menu-sm-start[data-bs-popper]{right:auto;left:0}.dropdown-menu-sm-end{--bs-position: end}.dropdown-menu-sm-end[data-bs-popper]{right:0;left:auto}}@media (min-width: 768px){.dropdown-menu-md-start{--bs-position: start}.dropdown-menu-md-start[data-bs-popper]{right:auto;left:0}.dropdown-menu-md-end{--bs-position: end}.dropdown-menu-md-end[data-bs-popper]{right:0;left:auto}}@media (min-width: 992px){.dropdown-menu-lg-start{--bs-position: start}.dropdown-menu-lg-start[data-bs-popper]{right:auto;left:0}.dropdown-menu-lg-end{--bs-position: end}.dropdown-menu-lg-end[data-bs-popper]{right:0;left:auto}}@media (min-width: 1200px){.dropdown-menu-xl-start{--bs-position: start}.dropdown-menu-xl-start[data-bs-popper]{right:auto;left:0}.dropdown-menu-xl-end{--bs-position: end}.dropdown-menu-xl-end[data-bs-popper]{right:0;left:auto}}@media (min-width: 1400px){.dropdown-menu-xxl-start{--bs-position: start}.dropdown-menu-xxl-start[data-bs-popper]{right:auto;left:0}.dropdown-menu-xxl-end{--bs-position: end}.dropdown-menu-xxl-end[data-bs-popper]{right:0;left:auto}}.dropup .dropdown-menu[data-bs-popper]{top:auto;bottom:100%;margin-top:0;margin-bottom:var(--bs-dropdown-spacer)}.dropup .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:0;border-right:.3em solid transparent;border-bottom:.3em solid;border-left:.3em solid transparent}.dropup .dropdown-toggle:empty:after{margin-left:0}.dropend .dropdown-menu[data-bs-popper]{top:0;right:auto;left:100%;margin-top:0;margin-left:var(--bs-dropdown-spacer)}.dropend .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:0;border-bottom:.3em solid transparent;border-left:.3em solid}.dropend .dropdown-toggle:empty:after{margin-left:0}.dropend .dropdown-toggle:after{vertical-align:0}.dropstart .dropdown-menu[data-bs-popper]{top:0;right:100%;left:auto;margin-top:0;margin-right:var(--bs-dropdown-spacer)}.dropstart .dropdown-toggle:after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:""}.dropstart .dropdown-toggle:after{display:none}.dropstart .dropdown-toggle:before{display:inline-block;margin-right:.255em;vertical-align:.255em;content:"";border-top:.3em solid transparent;border-right:.3em solid;border-bottom:.3em solid transparent}.dropstart .dropdown-toggle:empty:after{margin-left:0}.dropstart .dropdown-toggle:before{vertical-align:0}.dropdown-divider{height:0;margin:var(--bs-dropdown-divider-margin-y) 0;overflow:hidden;border-top:1px solid var(--bs-dropdown-divider-bg);opacity:1}.dropdown-item{display:block;width:100%;padding:var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);clear:both;font-weight:400;color:var(--bs-dropdown-link-color);text-align:inherit;text-decoration:none;white-space:nowrap;background-color:transparent;border:0}.dropdown-item:focus,.dropdown-item:hover{color:var(--bs-dropdown-link-hover-color);background-color:var(--bs-dropdown-link-hover-bg)}.dropdown-item.active,.dropdown-item:active{color:var(--bs-dropdown-link-active-color);text-decoration:none;background-color:var(--bs-dropdown-link-active-bg)}.dropdown-item.disabled,.dropdown-item:disabled{color:var(--bs-dropdown-link-disabled-color);pointer-events:none;background-color:transparent}.dropdown-menu.show{display:block}.dropdown-header{display:block;padding:var(--bs-dropdown-header-padding-y) var(--bs-dropdown-header-padding-x);margin-bottom:0;font-size:.875rem;color:var(--bs-dropdown-header-color);white-space:nowrap}.dropdown-item-text{display:block;padding:var(--bs-dropdown-item-padding-y) var(--bs-dropdown-item-padding-x);color:var(--bs-dropdown-link-color)}.dropdown-menu-dark{--bs-dropdown-color: #dee2e6;--bs-dropdown-bg: #343a40;--bs-dropdown-border-color: var(--bs-border-color-translucent);--bs-dropdown-box-shadow: ;--bs-dropdown-link-color: #dee2e6;--bs-dropdown-link-hover-color: #fff;--bs-dropdown-divider-bg: var(--bs-border-color-translucent);--bs-dropdown-link-hover-bg: rgba(255, 255, 255, .15);--bs-dropdown-link-active-color: #fff;--bs-dropdown-link-active-bg: #0d6efd;--bs-dropdown-link-disabled-color: #adb5bd;--bs-dropdown-header-color: #adb5bd}.btn-group,.btn-group-vertical{position:relative;display:inline-flex;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;flex:1 1 auto}.btn-group-vertical>.btn-check:checked+.btn,.btn-group-vertical>.btn-check:focus+.btn,.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group-vertical>.btn:hover,.btn-group>.btn-check:checked+.btn,.btn-group>.btn-check:focus+.btn,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus,.btn-group>.btn:hover{z-index:1}.btn-toolbar{display:flex;flex-wrap:wrap;justify-content:flex-start}.btn-toolbar .input-group{width:auto}.btn-group{border-radius:.375rem}.btn-group>.btn-group:not(:first-child),.btn-group>:not(.btn-check:first-child)+.btn{margin-left:-1px}.btn-group>.btn-group:not(:last-child)>.btn,.btn-group>.btn.dropdown-toggle-split:first-child,.btn-group>.btn:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn-group:not(:first-child)>.btn,.btn-group>.btn:nth-child(n + 3),.btn-group>:not(.btn-check)+.btn{border-top-left-radius:0;border-bottom-left-radius:0}.dropdown-toggle-split{padding-right:.5625rem;padding-left:.5625rem}.dropdown-toggle-split:after,.dropend .dropdown-toggle-split:after,.dropup .dropdown-toggle-split:after{margin-left:0}.dropstart .dropdown-toggle-split:before{margin-right:0}.btn-group-sm>.btn+.dropdown-toggle-split,.btn-sm+.dropdown-toggle-split{padding-right:.375rem;padding-left:.375rem}.btn-group-lg>.btn+.dropdown-toggle-split,.btn-lg+.dropdown-toggle-split{padding-right:.75rem;padding-left:.75rem}.btn-group-vertical{flex-direction:column;align-items:flex-start;justify-content:center}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group{width:100%}.btn-group-vertical>.btn-group:not(:first-child),.btn-group-vertical>.btn:not(:first-child){margin-top:-1px}.btn-group-vertical>.btn-group:not(:last-child)>.btn,.btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:not(:first-child)>.btn,.btn-group-vertical>.btn~.btn{border-top-left-radius:0;border-top-right-radius:0}.nav{--bs-nav-link-padding-x: 1rem;--bs-nav-link-padding-y: .5rem;--bs-nav-link-font-weight: ;--bs-nav-link-color: var(--bs-link-color);--bs-nav-link-hover-color: var(--bs-link-hover-color);--bs-nav-link-disabled-color: #6c757d;display:flex;flex-wrap:wrap;padding-left:0;margin-bottom:0;list-style:none}.nav-link{display:block;padding:var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);font-size:var(--bs-nav-link-font-size);font-weight:var(--bs-nav-link-font-weight);color:var(--bs-nav-link-color);text-decoration:none;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out}@media (prefers-reduced-motion: reduce){.nav-link{transition:none}}.nav-link:focus,.nav-link:hover{color:var(--bs-nav-link-hover-color)}.nav-link.disabled{color:var(--bs-nav-link-disabled-color);pointer-events:none;cursor:default}.nav-tabs{--bs-nav-tabs-border-width: 1px;--bs-nav-tabs-border-color: #dee2e6;--bs-nav-tabs-border-radius: .375rem;--bs-nav-tabs-link-hover-border-color: #e9ecef #e9ecef #dee2e6;--bs-nav-tabs-link-active-color: #495057;--bs-nav-tabs-link-active-bg: #fff;--bs-nav-tabs-link-active-border-color: #dee2e6 #dee2e6 #fff;border-bottom:var(--bs-nav-tabs-border-width) solid var(--bs-nav-tabs-border-color)}.nav-tabs .nav-link{margin-bottom:calc(-1 * var(--bs-nav-tabs-border-width));background:0 0;border:var(--bs-nav-tabs-border-width) solid transparent;border-top-left-radius:var(--bs-nav-tabs-border-radius);border-top-right-radius:var(--bs-nav-tabs-border-radius)}.nav-tabs .nav-link:focus,.nav-tabs .nav-link:hover{isolation:isolate;border-color:var(--bs-nav-tabs-link-hover-border-color)}.nav-tabs .nav-link.disabled,.nav-tabs .nav-link:disabled{color:var(--bs-nav-link-disabled-color);background-color:transparent;border-color:transparent}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:var(--bs-nav-tabs-link-active-color);background-color:var(--bs-nav-tabs-link-active-bg);border-color:var(--bs-nav-tabs-link-active-border-color)}.nav-tabs .dropdown-menu{margin-top:calc(-1 * var(--bs-nav-tabs-border-width));border-top-left-radius:0;border-top-right-radius:0}.nav-pills{--bs-nav-pills-border-radius: .375rem;--bs-nav-pills-link-active-color: #fff;--bs-nav-pills-link-active-bg: #0d6efd}.nav-pills .nav-link{background:0 0;border:0;border-radius:var(--bs-nav-pills-border-radius)}.nav-pills .nav-link:disabled{color:var(--bs-nav-link-disabled-color);background-color:transparent;border-color:transparent}.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:var(--bs-nav-pills-link-active-color);background-color:var(--bs-nav-pills-link-active-bg)}.nav-fill .nav-item,.nav-fill>.nav-link{flex:1 1 auto;text-align:center}.nav-justified .nav-item,.nav-justified>.nav-link{flex-basis:0;flex-grow:1;text-align:center}.nav-fill .nav-item .nav-link,.nav-justified .nav-item .nav-link{width:100%}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.navbar{--bs-navbar-padding-x: 0;--bs-navbar-padding-y: .5rem;--bs-navbar-color: rgba(0, 0, 0, .55);--bs-navbar-hover-color: rgba(0, 0, 0, .7);--bs-navbar-disabled-color: rgba(0, 0, 0, .3);--bs-navbar-active-color: rgba(0, 0, 0, .9);--bs-navbar-brand-padding-y: .3125rem;--bs-navbar-brand-margin-end: 1rem;--bs-navbar-brand-font-size: 1.25rem;--bs-navbar-brand-color: rgba(0, 0, 0, .9);--bs-navbar-brand-hover-color: rgba(0, 0, 0, .9);--bs-navbar-nav-link-padding-x: .5rem;--bs-navbar-toggler-padding-y: .25rem;--bs-navbar-toggler-padding-x: .75rem;--bs-navbar-toggler-font-size: 1.25rem;--bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");--bs-navbar-toggler-border-color: rgba(0, 0, 0, .1);--bs-navbar-toggler-border-radius: .375rem;--bs-navbar-toggler-focus-width: .25rem;--bs-navbar-toggler-transition: box-shadow .15s ease-in-out;position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:var(--bs-navbar-padding-y) var(--bs-navbar-padding-x)}.navbar>.container,.navbar>.container-fluid,.navbar>.container-lg,.navbar>.container-md,.navbar>.container-sm,.navbar>.container-xl,.navbar>.container-xxl{display:flex;flex-wrap:inherit;align-items:center;justify-content:space-between}.navbar-brand{padding-top:var(--bs-navbar-brand-padding-y);padding-bottom:var(--bs-navbar-brand-padding-y);margin-right:var(--bs-navbar-brand-margin-end);font-size:var(--bs-navbar-brand-font-size);color:var(--bs-navbar-brand-color);text-decoration:none;white-space:nowrap}.navbar-brand:focus,.navbar-brand:hover{color:var(--bs-navbar-brand-hover-color)}.navbar-nav{--bs-nav-link-padding-x: 0;--bs-nav-link-padding-y: .5rem;--bs-nav-link-font-weight: ;--bs-nav-link-color: var(--bs-navbar-color);--bs-nav-link-hover-color: var(--bs-navbar-hover-color);--bs-nav-link-disabled-color: var(--bs-navbar-disabled-color);display:flex;flex-direction:column;padding-left:0;margin-bottom:0;list-style:none}.navbar-nav .nav-link.active,.navbar-nav .show>.nav-link{color:var(--bs-navbar-active-color)}.navbar-nav .dropdown-menu{position:static}.navbar-text{padding-top:.5rem;padding-bottom:.5rem;color:var(--bs-navbar-color)}.navbar-text a,.navbar-text a:focus,.navbar-text a:hover{color:var(--bs-navbar-active-color)}.navbar-collapse{flex-basis:100%;flex-grow:1;align-items:center}.navbar-toggler{padding:var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);font-size:var(--bs-navbar-toggler-font-size);line-height:1;color:var(--bs-navbar-color);background-color:transparent;border:var(--bs-border-width) solid var(--bs-navbar-toggler-border-color);border-radius:var(--bs-navbar-toggler-border-radius);transition:var(--bs-navbar-toggler-transition)}@media (prefers-reduced-motion: reduce){.navbar-toggler{transition:none}}.navbar-toggler:hover{text-decoration:none}.navbar-toggler:focus{text-decoration:none;outline:0;box-shadow:0 0 0 var(--bs-navbar-toggler-focus-width)}.navbar-toggler-icon{display:inline-block;width:1.5em;height:1.5em;vertical-align:middle;background-image:var(--bs-navbar-toggler-icon-bg);background-repeat:no-repeat;background-position:center;background-size:100%}.navbar-nav-scroll{max-height:var(--bs-scroll-height, 75vh);overflow-y:auto}@media (min-width: 576px){.navbar-expand-sm{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-sm .navbar-nav{flex-direction:row}.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-sm .navbar-nav .nav-link{padding-right:var(--bs-navbar-nav-link-padding-x);padding-left:var(--bs-navbar-nav-link-padding-x)}.navbar-expand-sm .navbar-nav-scroll{overflow:visible}.navbar-expand-sm .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-sm .navbar-toggler{display:none}.navbar-expand-sm .offcanvas{position:static;z-index:auto;flex-grow:1;width:auto!important;height:auto!important;visibility:visible!important;background-color:transparent!important;border:0!important;transform:none!important;transition:none}.navbar-expand-sm .offcanvas .offcanvas-header{display:none}.navbar-expand-sm .offcanvas .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible}}@media (min-width: 768px){.navbar-expand-md{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-md .navbar-nav{flex-direction:row}.navbar-expand-md .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-md .navbar-nav .nav-link{padding-right:var(--bs-navbar-nav-link-padding-x);padding-left:var(--bs-navbar-nav-link-padding-x)}.navbar-expand-md .navbar-nav-scroll{overflow:visible}.navbar-expand-md .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-md .navbar-toggler{display:none}.navbar-expand-md .offcanvas{position:static;z-index:auto;flex-grow:1;width:auto!important;height:auto!important;visibility:visible!important;background-color:transparent!important;border:0!important;transform:none!important;transition:none}.navbar-expand-md .offcanvas .offcanvas-header{display:none}.navbar-expand-md .offcanvas .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible}}@media (min-width: 992px){.navbar-expand-lg{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-lg .navbar-nav{flex-direction:row}.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-lg .navbar-nav .nav-link{padding-right:var(--bs-navbar-nav-link-padding-x);padding-left:var(--bs-navbar-nav-link-padding-x)}.navbar-expand-lg .navbar-nav-scroll{overflow:visible}.navbar-expand-lg .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-lg .navbar-toggler{display:none}.navbar-expand-lg .offcanvas{position:static;z-index:auto;flex-grow:1;width:auto!important;height:auto!important;visibility:visible!important;background-color:transparent!important;border:0!important;transform:none!important;transition:none}.navbar-expand-lg .offcanvas .offcanvas-header{display:none}.navbar-expand-lg .offcanvas .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible}}@media (min-width: 1200px){.navbar-expand-xl{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-xl .navbar-nav{flex-direction:row}.navbar-expand-xl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xl .navbar-nav .nav-link{padding-right:var(--bs-navbar-nav-link-padding-x);padding-left:var(--bs-navbar-nav-link-padding-x)}.navbar-expand-xl .navbar-nav-scroll{overflow:visible}.navbar-expand-xl .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-xl .navbar-toggler{display:none}.navbar-expand-xl .offcanvas{position:static;z-index:auto;flex-grow:1;width:auto!important;height:auto!important;visibility:visible!important;background-color:transparent!important;border:0!important;transform:none!important;transition:none}.navbar-expand-xl .offcanvas .offcanvas-header{display:none}.navbar-expand-xl .offcanvas .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible}}@media (min-width: 1400px){.navbar-expand-xxl{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand-xxl .navbar-nav{flex-direction:row}.navbar-expand-xxl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xxl .navbar-nav .nav-link{padding-right:var(--bs-navbar-nav-link-padding-x);padding-left:var(--bs-navbar-nav-link-padding-x)}.navbar-expand-xxl .navbar-nav-scroll{overflow:visible}.navbar-expand-xxl .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand-xxl .navbar-toggler{display:none}.navbar-expand-xxl .offcanvas{position:static;z-index:auto;flex-grow:1;width:auto!important;height:auto!important;visibility:visible!important;background-color:transparent!important;border:0!important;transform:none!important;transition:none}.navbar-expand-xxl .offcanvas .offcanvas-header{display:none}.navbar-expand-xxl .offcanvas .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible}}.navbar-expand{flex-wrap:nowrap;justify-content:flex-start}.navbar-expand .navbar-nav{flex-direction:row}.navbar-expand .navbar-nav .dropdown-menu{position:absolute}.navbar-expand .navbar-nav .nav-link{padding-right:var(--bs-navbar-nav-link-padding-x);padding-left:var(--bs-navbar-nav-link-padding-x)}.navbar-expand .navbar-nav-scroll{overflow:visible}.navbar-expand .navbar-collapse{display:flex!important;flex-basis:auto}.navbar-expand .navbar-toggler{display:none}.navbar-expand .offcanvas{position:static;z-index:auto;flex-grow:1;width:auto!important;height:auto!important;visibility:visible!important;background-color:transparent!important;border:0!important;transform:none!important;transition:none}.navbar-expand .offcanvas .offcanvas-header{display:none}.navbar-expand .offcanvas .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible}.navbar-dark{--bs-navbar-color: rgba(255, 255, 255, .55);--bs-navbar-hover-color: rgba(255, 255, 255, .75);--bs-navbar-disabled-color: rgba(255, 255, 255, .25);--bs-navbar-active-color: #fff;--bs-navbar-brand-color: #fff;--bs-navbar-brand-hover-color: #fff;--bs-navbar-toggler-border-color: rgba(255, 255, 255, .1);--bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")}.card{--bs-card-spacer-y: 1rem;--bs-card-spacer-x: 1rem;--bs-card-title-spacer-y: .5rem;--bs-card-border-width: 1px;--bs-card-border-color: var(--bs-border-color-translucent);--bs-card-border-radius: .375rem;--bs-card-box-shadow: ;--bs-card-inner-border-radius:calc(.375rem - 1px);--bs-card-cap-padding-y: .5rem;--bs-card-cap-padding-x: 1rem;--bs-card-cap-bg: rgba(0, 0, 0, .03);--bs-card-cap-color: ;--bs-card-height: ;--bs-card-color: ;--bs-card-bg: #fff;--bs-card-img-overlay-padding: 1rem;--bs-card-group-margin: .75rem;position:relative;display:flex;flex-direction:column;min-width:0;height:var(--bs-card-height);word-wrap:break-word;background-color:var(--bs-card-bg);background-clip:border-box;border:var(--bs-card-border-width) solid var(--bs-card-border-color);border-radius:var(--bs-card-border-radius)}.card>hr{margin-right:0;margin-left:0}.card>.list-group{border-top:inherit;border-bottom:inherit}.card>.list-group:first-child{border-top-width:0;border-top-left-radius:var(--bs-card-inner-border-radius);border-top-right-radius:var(--bs-card-inner-border-radius)}.card>.list-group:last-child{border-bottom-width:0;border-bottom-right-radius:var(--bs-card-inner-border-radius);border-bottom-left-radius:var(--bs-card-inner-border-radius)}.card>.card-header+.list-group,.card>.list-group+.card-footer{border-top:0}.card-body{flex:1 1 auto;padding:var(--bs-card-spacer-y) var(--bs-card-spacer-x);color:var(--bs-card-color)}.card-title{margin-bottom:var(--bs-card-title-spacer-y)}.card-subtitle{margin-top:calc(-.5 * var(--bs-card-title-spacer-y));margin-bottom:0}.card-text:last-child{margin-bottom:0}.card-link+.card-link{margin-left:var(--bs-card-spacer-x)}.card-header{padding:var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);margin-bottom:0;color:var(--bs-card-cap-color);background-color:var(--bs-card-cap-bg);border-bottom:var(--bs-card-border-width) solid var(--bs-card-border-color)}.card-header:first-child{border-radius:var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius) 0 0}.card-footer{padding:var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);color:var(--bs-card-cap-color);background-color:var(--bs-card-cap-bg);border-top:var(--bs-card-border-width) solid var(--bs-card-border-color)}.card-footer:last-child{border-radius:0 0 var(--bs-card-inner-border-radius) var(--bs-card-inner-border-radius)}.card-header-tabs{margin-right:calc(-.5 * var(--bs-card-cap-padding-x));margin-bottom:calc(-1 * var(--bs-card-cap-padding-y));margin-left:calc(-.5 * var(--bs-card-cap-padding-x));border-bottom:0}.card-header-tabs .nav-link.active{background-color:var(--bs-card-bg);border-bottom-color:var(--bs-card-bg)}.card-header-pills{margin-right:calc(-.5 * var(--bs-card-cap-padding-x));margin-left:calc(-.5 * var(--bs-card-cap-padding-x))}.card-img-overlay{position:absolute;top:0;right:0;bottom:0;left:0;padding:var(--bs-card-img-overlay-padding);border-radius:var(--bs-card-inner-border-radius)}.card-img,.card-img-bottom,.card-img-top{width:100%}.card-img,.card-img-top{border-top-left-radius:var(--bs-card-inner-border-radius);border-top-right-radius:var(--bs-card-inner-border-radius)}.card-img,.card-img-bottom{border-bottom-right-radius:var(--bs-card-inner-border-radius);border-bottom-left-radius:var(--bs-card-inner-border-radius)}.card-group>.card{margin-bottom:var(--bs-card-group-margin)}@media (min-width: 576px){.card-group{display:flex;flex-flow:row wrap}.card-group>.card{flex:1 0 0%;margin-bottom:0}.card-group>.card+.card{margin-left:0;border-left:0}.card-group>.card:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.card-group>.card:not(:last-child) .card-header,.card-group>.card:not(:last-child) .card-img-top{border-top-right-radius:0}.card-group>.card:not(:last-child) .card-footer,.card-group>.card:not(:last-child) .card-img-bottom{border-bottom-right-radius:0}.card-group>.card:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.card-group>.card:not(:first-child) .card-header,.card-group>.card:not(:first-child) .card-img-top{border-top-left-radius:0}.card-group>.card:not(:first-child) .card-footer,.card-group>.card:not(:first-child) .card-img-bottom{border-bottom-left-radius:0}}.accordion{--bs-accordion-color: #212529;--bs-accordion-bg: #fff;--bs-accordion-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out, border-radius .15s ease;--bs-accordion-border-color: var(--bs-border-color);--bs-accordion-border-width: 1px;--bs-accordion-border-radius: .375rem;--bs-accordion-inner-border-radius:calc(.375rem - 1px);--bs-accordion-btn-padding-x: 1.25rem;--bs-accordion-btn-padding-y: 1rem;--bs-accordion-btn-color: #212529;--bs-accordion-btn-bg: var(--bs-accordion-bg);--bs-accordion-btn-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");--bs-accordion-btn-icon-width: 1.25rem;--bs-accordion-btn-icon-transform: rotate(-180deg);--bs-accordion-btn-icon-transition: transform .2s ease-in-out;--bs-accordion-btn-active-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");--bs-accordion-btn-focus-border-color: #86b7fe;--bs-accordion-btn-focus-box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);--bs-accordion-body-padding-x: 1.25rem;--bs-accordion-body-padding-y: 1rem;--bs-accordion-active-color: #0c63e4;--bs-accordion-active-bg: #e7f1ff}.accordion-button{position:relative;display:flex;align-items:center;width:100%;padding:var(--bs-accordion-btn-padding-y) var(--bs-accordion-btn-padding-x);font-size:1rem;color:var(--bs-accordion-btn-color);text-align:left;background-color:var(--bs-accordion-btn-bg);border:0;border-radius:0;overflow-anchor:none;transition:var(--bs-accordion-transition)}@media (prefers-reduced-motion: reduce){.accordion-button{transition:none}}.accordion-button:not(.collapsed){color:var(--bs-accordion-active-color);background-color:var(--bs-accordion-active-bg);box-shadow:inset 0 calc(-1 * var(--bs-accordion-border-width)) 0 var(--bs-accordion-border-color)}.accordion-button:not(.collapsed):after{background-image:var(--bs-accordion-btn-active-icon);transform:var(--bs-accordion-btn-icon-transform)}.accordion-button:after{flex-shrink:0;width:var(--bs-accordion-btn-icon-width);height:var(--bs-accordion-btn-icon-width);margin-left:auto;content:"";background-image:var(--bs-accordion-btn-icon);background-repeat:no-repeat;background-size:var(--bs-accordion-btn-icon-width);transition:var(--bs-accordion-btn-icon-transition)}@media (prefers-reduced-motion: reduce){.accordion-button:after{transition:none}}.accordion-button:hover{z-index:2}.accordion-button:focus{z-index:3;border-color:var(--bs-accordion-btn-focus-border-color);outline:0;box-shadow:var(--bs-accordion-btn-focus-box-shadow)}.accordion-header{margin-bottom:0}.accordion-item{color:var(--bs-accordion-color);background-color:var(--bs-accordion-bg);border:var(--bs-accordion-border-width) solid var(--bs-accordion-border-color)}.accordion-item:first-of-type{border-top-left-radius:var(--bs-accordion-border-radius);border-top-right-radius:var(--bs-accordion-border-radius)}.accordion-item:first-of-type .accordion-button{border-top-left-radius:var(--bs-accordion-inner-border-radius);border-top-right-radius:var(--bs-accordion-inner-border-radius)}.accordion-item:not(:first-of-type){border-top:0}.accordion-item:last-of-type{border-bottom-right-radius:var(--bs-accordion-border-radius);border-bottom-left-radius:var(--bs-accordion-border-radius)}.accordion-item:last-of-type .accordion-button.collapsed{border-bottom-right-radius:var(--bs-accordion-inner-border-radius);border-bottom-left-radius:var(--bs-accordion-inner-border-radius)}.accordion-item:last-of-type .accordion-collapse{border-bottom-right-radius:var(--bs-accordion-border-radius);border-bottom-left-radius:var(--bs-accordion-border-radius)}.accordion-body{padding:var(--bs-accordion-body-padding-y) var(--bs-accordion-body-padding-x)}.accordion-flush .accordion-collapse{border-width:0}.accordion-flush .accordion-item{border-right:0;border-left:0;border-radius:0}.accordion-flush .accordion-item:first-child{border-top:0}.accordion-flush .accordion-item:last-child{border-bottom:0}.accordion-flush .accordion-item .accordion-button,.accordion-flush .accordion-item .accordion-button.collapsed{border-radius:0}.breadcrumb{--bs-breadcrumb-padding-x: 0;--bs-breadcrumb-padding-y: 0;--bs-breadcrumb-margin-bottom: 1rem;--bs-breadcrumb-bg: ;--bs-breadcrumb-border-radius: ;--bs-breadcrumb-divider-color: #6c757d;--bs-breadcrumb-item-padding-x: .5rem;--bs-breadcrumb-item-active-color: #6c757d;display:flex;flex-wrap:wrap;padding:var(--bs-breadcrumb-padding-y) var(--bs-breadcrumb-padding-x);margin-bottom:var(--bs-breadcrumb-margin-bottom);font-size:var(--bs-breadcrumb-font-size);list-style:none;background-color:var(--bs-breadcrumb-bg);border-radius:var(--bs-breadcrumb-border-radius)}.breadcrumb-item+.breadcrumb-item{padding-left:var(--bs-breadcrumb-item-padding-x)}.breadcrumb-item+.breadcrumb-item:before{float:left;padding-right:var(--bs-breadcrumb-item-padding-x);color:var(--bs-breadcrumb-divider-color);content:var(--bs-breadcrumb-divider, "/")}.breadcrumb-item.active{color:var(--bs-breadcrumb-item-active-color)}.pagination{--bs-pagination-padding-x: .75rem;--bs-pagination-padding-y: .375rem;--bs-pagination-font-size: 1rem;--bs-pagination-color: var(--bs-link-color);--bs-pagination-bg: #fff;--bs-pagination-border-width: 1px;--bs-pagination-border-color: #dee2e6;--bs-pagination-border-radius: .375rem;--bs-pagination-hover-color: var(--bs-link-hover-color);--bs-pagination-hover-bg: #e9ecef;--bs-pagination-hover-border-color: #dee2e6;--bs-pagination-focus-color: var(--bs-link-hover-color);--bs-pagination-focus-bg: #e9ecef;--bs-pagination-focus-box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);--bs-pagination-active-color: #fff;--bs-pagination-active-bg: #0d6efd;--bs-pagination-active-border-color: #0d6efd;--bs-pagination-disabled-color: #6c757d;--bs-pagination-disabled-bg: #fff;--bs-pagination-disabled-border-color: #dee2e6;display:flex;padding-left:0;list-style:none}.page-link{position:relative;display:block;padding:var(--bs-pagination-padding-y) var(--bs-pagination-padding-x);font-size:var(--bs-pagination-font-size);color:var(--bs-pagination-color);text-decoration:none;background-color:var(--bs-pagination-bg);border:var(--bs-pagination-border-width) solid var(--bs-pagination-border-color);transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion: reduce){.page-link{transition:none}}.page-link:hover{z-index:2;color:var(--bs-pagination-hover-color);background-color:var(--bs-pagination-hover-bg);border-color:var(--bs-pagination-hover-border-color)}.page-link:focus{z-index:3;color:var(--bs-pagination-focus-color);background-color:var(--bs-pagination-focus-bg);outline:0;box-shadow:var(--bs-pagination-focus-box-shadow)}.active>.page-link,.page-link.active{z-index:3;color:var(--bs-pagination-active-color);background-color:var(--bs-pagination-active-bg);border-color:var(--bs-pagination-active-border-color)}.disabled>.page-link,.page-link.disabled{color:var(--bs-pagination-disabled-color);pointer-events:none;background-color:var(--bs-pagination-disabled-bg);border-color:var(--bs-pagination-disabled-border-color)}.page-item:not(:first-child) .page-link{margin-left:-1px}.page-item:first-child .page-link{border-top-left-radius:var(--bs-pagination-border-radius);border-bottom-left-radius:var(--bs-pagination-border-radius)}.page-item:last-child .page-link{border-top-right-radius:var(--bs-pagination-border-radius);border-bottom-right-radius:var(--bs-pagination-border-radius)}.pagination-lg{--bs-pagination-padding-x: 1.5rem;--bs-pagination-padding-y: .75rem;--bs-pagination-font-size: 1.25rem;--bs-pagination-border-radius: .5rem}.pagination-sm{--bs-pagination-padding-x: .5rem;--bs-pagination-padding-y: .25rem;--bs-pagination-font-size: .875rem;--bs-pagination-border-radius: .25rem}.badge{--bs-badge-padding-x: .65em;--bs-badge-padding-y: .35em;--bs-badge-font-size: .75em;--bs-badge-font-weight: 700;--bs-badge-color: #fff;--bs-badge-border-radius: .375rem;display:inline-block;padding:var(--bs-badge-padding-y) var(--bs-badge-padding-x);font-size:var(--bs-badge-font-size);font-weight:var(--bs-badge-font-weight);line-height:1;color:var(--bs-badge-color);text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:var(--bs-badge-border-radius)}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.alert{--bs-alert-bg: transparent;--bs-alert-padding-x: 1rem;--bs-alert-padding-y: 1rem;--bs-alert-margin-bottom: 1rem;--bs-alert-color: inherit;--bs-alert-border-color: transparent;--bs-alert-border: 1px solid var(--bs-alert-border-color);--bs-alert-border-radius: .375rem;position:relative;padding:var(--bs-alert-padding-y) var(--bs-alert-padding-x);margin-bottom:var(--bs-alert-margin-bottom);color:var(--bs-alert-color);background-color:var(--bs-alert-bg);border:var(--bs-alert-border);border-radius:var(--bs-alert-border-radius)}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible{padding-right:3rem}.alert-dismissible .btn-close{position:absolute;top:0;right:0;z-index:2;padding:1.25rem 1rem}.alert-primary{--bs-alert-color: #084298;--bs-alert-bg: #cfe2ff;--bs-alert-border-color: #b6d4fe}.alert-primary .alert-link{color:#06357a}.alert-secondary{--bs-alert-color: #41464b;--bs-alert-bg: #e2e3e5;--bs-alert-border-color: #d3d6d8}.alert-secondary .alert-link{color:#34383c}.alert-success{--bs-alert-color: #0f5132;--bs-alert-bg: #d1e7dd;--bs-alert-border-color: #badbcc}.alert-success .alert-link{color:#0c4128}.alert-info{--bs-alert-color: #055160;--bs-alert-bg: #cff4fc;--bs-alert-border-color: #b6effb}.alert-info .alert-link{color:#04414d}.alert-warning{--bs-alert-color: #664d03;--bs-alert-bg: #fff3cd;--bs-alert-border-color: #ffecb5}.alert-warning .alert-link{color:#523e02}.alert-danger{--bs-alert-color: #842029;--bs-alert-bg: #f8d7da;--bs-alert-border-color: #f5c2c7}.alert-danger .alert-link{color:#6a1a21}.alert-light{--bs-alert-color: #636464;--bs-alert-bg: #fefefe;--bs-alert-border-color: #fdfdfe}.alert-light .alert-link{color:#4f5050}.alert-dark{--bs-alert-color: #141619;--bs-alert-bg: #d3d3d4;--bs-alert-border-color: #bcbebf}.alert-dark .alert-link{color:#101214}@keyframes progress-bar-stripes{0%{background-position-x:1rem}}.progress{--bs-progress-height: 1rem;--bs-progress-font-size: .75rem;--bs-progress-bg: #e9ecef;--bs-progress-border-radius: .375rem;--bs-progress-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .075);--bs-progress-bar-color: #fff;--bs-progress-bar-bg: #0d6efd;--bs-progress-bar-transition: width .6s ease;display:flex;height:var(--bs-progress-height);overflow:hidden;font-size:var(--bs-progress-font-size);background-color:var(--bs-progress-bg);border-radius:var(--bs-progress-border-radius)}.progress-bar{display:flex;flex-direction:column;justify-content:center;overflow:hidden;color:var(--bs-progress-bar-color);text-align:center;white-space:nowrap;background-color:var(--bs-progress-bar-bg);transition:var(--bs-progress-bar-transition)}@media (prefers-reduced-motion: reduce){.progress-bar{transition:none}}.progress-bar-striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:var(--bs-progress-height) var(--bs-progress-height)}.progress-bar-animated{animation:1s linear infinite progress-bar-stripes}@media (prefers-reduced-motion: reduce){.progress-bar-animated{animation:none}}.list-group{--bs-list-group-color: #212529;--bs-list-group-bg: #fff;--bs-list-group-border-color: rgba(0, 0, 0, .125);--bs-list-group-border-width: 1px;--bs-list-group-border-radius: .375rem;--bs-list-group-item-padding-x: 1rem;--bs-list-group-item-padding-y: .5rem;--bs-list-group-action-color: #495057;--bs-list-group-action-hover-color: #495057;--bs-list-group-action-hover-bg: #f8f9fa;--bs-list-group-action-active-color: #212529;--bs-list-group-action-active-bg: #e9ecef;--bs-list-group-disabled-color: #6c757d;--bs-list-group-disabled-bg: #fff;--bs-list-group-active-color: #fff;--bs-list-group-active-bg: #0d6efd;--bs-list-group-active-border-color: #0d6efd;display:flex;flex-direction:column;padding-left:0;margin-bottom:0;border-radius:var(--bs-list-group-border-radius)}.list-group-numbered{list-style-type:none;counter-reset:section}.list-group-numbered>.list-group-item:before{content:counters(section,".") ". ";counter-increment:section}.list-group-item-action{width:100%;color:var(--bs-list-group-action-color);text-align:inherit}.list-group-item-action:focus,.list-group-item-action:hover{z-index:1;color:var(--bs-list-group-action-hover-color);text-decoration:none;background-color:var(--bs-list-group-action-hover-bg)}.list-group-item-action:active{color:var(--bs-list-group-action-active-color);background-color:var(--bs-list-group-action-active-bg)}.list-group-item{position:relative;display:block;padding:var(--bs-list-group-item-padding-y) var(--bs-list-group-item-padding-x);color:var(--bs-list-group-color);text-decoration:none;background-color:var(--bs-list-group-bg);border:var(--bs-list-group-border-width) solid var(--bs-list-group-border-color)}.list-group-item:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.list-group-item:last-child{border-bottom-right-radius:inherit;border-bottom-left-radius:inherit}.list-group-item.disabled,.list-group-item:disabled{color:var(--bs-list-group-disabled-color);pointer-events:none;background-color:var(--bs-list-group-disabled-bg)}.list-group-item.active{z-index:2;color:var(--bs-list-group-active-color);background-color:var(--bs-list-group-active-bg);border-color:var(--bs-list-group-active-border-color)}.list-group-item+.list-group-item{border-top-width:0}.list-group-item+.list-group-item.active{margin-top:calc(-1 * var(--bs-list-group-border-width));border-top-width:var(--bs-list-group-border-width)}.list-group-horizontal{flex-direction:row}.list-group-horizontal>.list-group-item:first-child:not(:last-child){border-bottom-left-radius:var(--bs-list-group-border-radius);border-top-right-radius:0}.list-group-horizontal>.list-group-item:last-child:not(:first-child){border-top-right-radius:var(--bs-list-group-border-radius);border-bottom-left-radius:0}.list-group-horizontal>.list-group-item.active{margin-top:0}.list-group-horizontal>.list-group-item+.list-group-item{border-top-width:var(--bs-list-group-border-width);border-left-width:0}.list-group-horizontal>.list-group-item+.list-group-item.active{margin-left:calc(-1 * var(--bs-list-group-border-width));border-left-width:var(--bs-list-group-border-width)}@media (min-width: 576px){.list-group-horizontal-sm{flex-direction:row}.list-group-horizontal-sm>.list-group-item:first-child:not(:last-child){border-bottom-left-radius:var(--bs-list-group-border-radius);border-top-right-radius:0}.list-group-horizontal-sm>.list-group-item:last-child:not(:first-child){border-top-right-radius:var(--bs-list-group-border-radius);border-bottom-left-radius:0}.list-group-horizontal-sm>.list-group-item.active{margin-top:0}.list-group-horizontal-sm>.list-group-item+.list-group-item{border-top-width:var(--bs-list-group-border-width);border-left-width:0}.list-group-horizontal-sm>.list-group-item+.list-group-item.active{margin-left:calc(-1 * var(--bs-list-group-border-width));border-left-width:var(--bs-list-group-border-width)}}@media (min-width: 768px){.list-group-horizontal-md{flex-direction:row}.list-group-horizontal-md>.list-group-item:first-child:not(:last-child){border-bottom-left-radius:var(--bs-list-group-border-radius);border-top-right-radius:0}.list-group-horizontal-md>.list-group-item:last-child:not(:first-child){border-top-right-radius:var(--bs-list-group-border-radius);border-bottom-left-radius:0}.list-group-horizontal-md>.list-group-item.active{margin-top:0}.list-group-horizontal-md>.list-group-item+.list-group-item{border-top-width:var(--bs-list-group-border-width);border-left-width:0}.list-group-horizontal-md>.list-group-item+.list-group-item.active{margin-left:calc(-1 * var(--bs-list-group-border-width));border-left-width:var(--bs-list-group-border-width)}}@media (min-width: 992px){.list-group-horizontal-lg{flex-direction:row}.list-group-horizontal-lg>.list-group-item:first-child:not(:last-child){border-bottom-left-radius:var(--bs-list-group-border-radius);border-top-right-radius:0}.list-group-horizontal-lg>.list-group-item:last-child:not(:first-child){border-top-right-radius:var(--bs-list-group-border-radius);border-bottom-left-radius:0}.list-group-horizontal-lg>.list-group-item.active{margin-top:0}.list-group-horizontal-lg>.list-group-item+.list-group-item{border-top-width:var(--bs-list-group-border-width);border-left-width:0}.list-group-horizontal-lg>.list-group-item+.list-group-item.active{margin-left:calc(-1 * var(--bs-list-group-border-width));border-left-width:var(--bs-list-group-border-width)}}@media (min-width: 1200px){.list-group-horizontal-xl{flex-direction:row}.list-group-horizontal-xl>.list-group-item:first-child:not(:last-child){border-bottom-left-radius:var(--bs-list-group-border-radius);border-top-right-radius:0}.list-group-horizontal-xl>.list-group-item:last-child:not(:first-child){border-top-right-radius:var(--bs-list-group-border-radius);border-bottom-left-radius:0}.list-group-horizontal-xl>.list-group-item.active{margin-top:0}.list-group-horizontal-xl>.list-group-item+.list-group-item{border-top-width:var(--bs-list-group-border-width);border-left-width:0}.list-group-horizontal-xl>.list-group-item+.list-group-item.active{margin-left:calc(-1 * var(--bs-list-group-border-width));border-left-width:var(--bs-list-group-border-width)}}@media (min-width: 1400px){.list-group-horizontal-xxl{flex-direction:row}.list-group-horizontal-xxl>.list-group-item:first-child:not(:last-child){border-bottom-left-radius:var(--bs-list-group-border-radius);border-top-right-radius:0}.list-group-horizontal-xxl>.list-group-item:last-child:not(:first-child){border-top-right-radius:var(--bs-list-group-border-radius);border-bottom-left-radius:0}.list-group-horizontal-xxl>.list-group-item.active{margin-top:0}.list-group-horizontal-xxl>.list-group-item+.list-group-item{border-top-width:var(--bs-list-group-border-width);border-left-width:0}.list-group-horizontal-xxl>.list-group-item+.list-group-item.active{margin-left:calc(-1 * var(--bs-list-group-border-width));border-left-width:var(--bs-list-group-border-width)}}.list-group-flush{border-radius:0}.list-group-flush>.list-group-item{border-width:0 0 var(--bs-list-group-border-width)}.list-group-flush>.list-group-item:last-child{border-bottom-width:0}.list-group-item-primary{color:#084298;background-color:#cfe2ff}.list-group-item-primary.list-group-item-action:focus,.list-group-item-primary.list-group-item-action:hover{color:#084298;background-color:#bacbe6}.list-group-item-primary.list-group-item-action.active{color:#fff;background-color:#084298;border-color:#084298}.list-group-item-secondary{color:#41464b;background-color:#e2e3e5}.list-group-item-secondary.list-group-item-action:focus,.list-group-item-secondary.list-group-item-action:hover{color:#41464b;background-color:#cbccce}.list-group-item-secondary.list-group-item-action.active{color:#fff;background-color:#41464b;border-color:#41464b}.list-group-item-success{color:#0f5132;background-color:#d1e7dd}.list-group-item-success.list-group-item-action:focus,.list-group-item-success.list-group-item-action:hover{color:#0f5132;background-color:#bcd0c7}.list-group-item-success.list-group-item-action.active{color:#fff;background-color:#0f5132;border-color:#0f5132}.list-group-item-info{color:#055160;background-color:#cff4fc}.list-group-item-info.list-group-item-action:focus,.list-group-item-info.list-group-item-action:hover{color:#055160;background-color:#badce3}.list-group-item-info.list-group-item-action.active{color:#fff;background-color:#055160;border-color:#055160}.list-group-item-warning{color:#664d03;background-color:#fff3cd}.list-group-item-warning.list-group-item-action:focus,.list-group-item-warning.list-group-item-action:hover{color:#664d03;background-color:#e6dbb9}.list-group-item-warning.list-group-item-action.active{color:#fff;background-color:#664d03;border-color:#664d03}.list-group-item-danger{color:#842029;background-color:#f8d7da}.list-group-item-danger.list-group-item-action:focus,.list-group-item-danger.list-group-item-action:hover{color:#842029;background-color:#dfc2c4}.list-group-item-danger.list-group-item-action.active{color:#fff;background-color:#842029;border-color:#842029}.list-group-item-light{color:#636464;background-color:#fefefe}.list-group-item-light.list-group-item-action:focus,.list-group-item-light.list-group-item-action:hover{color:#636464;background-color:#e5e5e5}.list-group-item-light.list-group-item-action.active{color:#fff;background-color:#636464;border-color:#636464}.list-group-item-dark{color:#141619;background-color:#d3d3d4}.list-group-item-dark.list-group-item-action:focus,.list-group-item-dark.list-group-item-action:hover{color:#141619;background-color:#bebebf}.list-group-item-dark.list-group-item-action.active{color:#fff;background-color:#141619;border-color:#141619}.btn-close{box-sizing:content-box;width:1em;height:1em;padding:.25em;color:#000;background:transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;border:0;border-radius:.375rem;opacity:.5}.btn-close:hover{color:#000;text-decoration:none;opacity:.75}.btn-close:focus{outline:0;box-shadow:0 0 0 .25rem #0d6efd40;opacity:1}.btn-close.disabled,.btn-close:disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:.25}.btn-close-white{filter:invert(1) grayscale(100%) brightness(200%)}.toast{--bs-toast-zindex: 1090;--bs-toast-padding-x: .75rem;--bs-toast-padding-y: .5rem;--bs-toast-spacing: 1.5rem;--bs-toast-max-width: 350px;--bs-toast-font-size: .875rem;--bs-toast-color: ;--bs-toast-bg: rgba(255, 255, 255, .85);--bs-toast-border-width: 1px;--bs-toast-border-color: var(--bs-border-color-translucent);--bs-toast-border-radius: .375rem;--bs-toast-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);--bs-toast-header-color: #6c757d;--bs-toast-header-bg: rgba(255, 255, 255, .85);--bs-toast-header-border-color: rgba(0, 0, 0, .05);width:var(--bs-toast-max-width);max-width:100%;font-size:var(--bs-toast-font-size);color:var(--bs-toast-color);pointer-events:auto;background-color:var(--bs-toast-bg);background-clip:padding-box;border:var(--bs-toast-border-width) solid var(--bs-toast-border-color);box-shadow:var(--bs-toast-box-shadow);border-radius:var(--bs-toast-border-radius)}.toast.showing{opacity:0}.toast:not(.show){display:none}.toast-container{--bs-toast-zindex: 1090;position:absolute;z-index:var(--bs-toast-zindex);width:-webkit-max-content;width:-moz-max-content;width:max-content;max-width:100%;pointer-events:none}.toast-container>:not(:last-child){margin-bottom:var(--bs-toast-spacing)}.toast-header{display:flex;align-items:center;padding:var(--bs-toast-padding-y) var(--bs-toast-padding-x);color:var(--bs-toast-header-color);background-color:var(--bs-toast-header-bg);background-clip:padding-box;border-bottom:var(--bs-toast-border-width) solid var(--bs-toast-header-border-color);border-top-left-radius:calc(var(--bs-toast-border-radius) - var(--bs-toast-border-width));border-top-right-radius:calc(var(--bs-toast-border-radius) - var(--bs-toast-border-width))}.toast-header .btn-close{margin-right:calc(-.5 * var(--bs-toast-padding-x));margin-left:var(--bs-toast-padding-x)}.toast-body{padding:var(--bs-toast-padding-x);word-wrap:break-word}.modal{--bs-modal-zindex: 1055;--bs-modal-width: 500px;--bs-modal-padding: 1rem;--bs-modal-margin: .5rem;--bs-modal-color: ;--bs-modal-bg: #fff;--bs-modal-border-color: var(--bs-border-color-translucent);--bs-modal-border-width: 1px;--bs-modal-border-radius: .5rem;--bs-modal-box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);--bs-modal-inner-border-radius:calc(.5rem - 1px);--bs-modal-header-padding-x: 1rem;--bs-modal-header-padding-y: 1rem;--bs-modal-header-padding: 1rem 1rem;--bs-modal-header-border-color: var(--bs-border-color);--bs-modal-header-border-width: 1px;--bs-modal-title-line-height: 1.5;--bs-modal-footer-gap: .5rem;--bs-modal-footer-bg: ;--bs-modal-footer-border-color: var(--bs-border-color);--bs-modal-footer-border-width: 1px;position:fixed;top:0;left:0;z-index:var(--bs-modal-zindex);display:none;width:100%;height:100%;overflow-x:hidden;overflow-y:auto;outline:0}.modal-dialog{position:relative;width:auto;margin:var(--bs-modal-margin);pointer-events:none}.modal.fade .modal-dialog{transition:transform .3s ease-out;transform:translateY(-50px)}@media (prefers-reduced-motion: reduce){.modal.fade .modal-dialog{transition:none}}.modal.show .modal-dialog{transform:none}.modal.modal-static .modal-dialog{transform:scale(1.02)}.modal-dialog-scrollable{height:calc(100% - var(--bs-modal-margin) * 2)}.modal-dialog-scrollable .modal-content{max-height:100%;overflow:hidden}.modal-dialog-scrollable .modal-body{overflow-y:auto}.modal-dialog-centered{display:flex;align-items:center;min-height:calc(100% - var(--bs-modal-margin) * 2)}.modal-content{position:relative;display:flex;flex-direction:column;width:100%;color:var(--bs-modal-color);pointer-events:auto;background-color:var(--bs-modal-bg);background-clip:padding-box;border:var(--bs-modal-border-width) solid var(--bs-modal-border-color);border-radius:var(--bs-modal-border-radius);outline:0}.modal-backdrop{--bs-backdrop-zindex: 1050;--bs-backdrop-bg: #000;--bs-backdrop-opacity: .5;position:fixed;top:0;left:0;z-index:var(--bs-backdrop-zindex);width:100vw;height:100vh;background-color:var(--bs-backdrop-bg)}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:var(--bs-backdrop-opacity)}.modal-header{display:flex;flex-shrink:0;align-items:center;justify-content:space-between;padding:var(--bs-modal-header-padding);border-bottom:var(--bs-modal-header-border-width) solid var(--bs-modal-header-border-color);border-top-left-radius:var(--bs-modal-inner-border-radius);border-top-right-radius:var(--bs-modal-inner-border-radius)}.modal-header .btn-close{padding:calc(var(--bs-modal-header-padding-y) * .5) calc(var(--bs-modal-header-padding-x) * .5);margin:calc(-.5 * var(--bs-modal-header-padding-y)) calc(-.5 * var(--bs-modal-header-padding-x)) calc(-.5 * var(--bs-modal-header-padding-y)) auto}.modal-title{margin-bottom:0;line-height:var(--bs-modal-title-line-height)}.modal-body{position:relative;flex:1 1 auto;padding:var(--bs-modal-padding)}.modal-footer{display:flex;flex-shrink:0;flex-wrap:wrap;align-items:center;justify-content:flex-end;padding:calc(var(--bs-modal-padding) - var(--bs-modal-footer-gap) * .5);background-color:var(--bs-modal-footer-bg);border-top:var(--bs-modal-footer-border-width) solid var(--bs-modal-footer-border-color);border-bottom-right-radius:var(--bs-modal-inner-border-radius);border-bottom-left-radius:var(--bs-modal-inner-border-radius)}.modal-footer>*{margin:calc(var(--bs-modal-footer-gap) * .5)}@media (min-width: 576px){.modal{--bs-modal-margin: 1.75rem;--bs-modal-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15)}.modal-dialog{max-width:var(--bs-modal-width);margin-right:auto;margin-left:auto}.modal-sm{--bs-modal-width: 300px}}@media (min-width: 992px){.modal-lg,.modal-xl{--bs-modal-width: 800px}}@media (min-width: 1200px){.modal-xl{--bs-modal-width: 1140px}}.modal-fullscreen{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen .modal-footer,.modal-fullscreen .modal-header{border-radius:0}.modal-fullscreen .modal-body{overflow-y:auto}@media (max-width: 575.98px){.modal-fullscreen-sm-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-sm-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-sm-down .modal-footer,.modal-fullscreen-sm-down .modal-header{border-radius:0}.modal-fullscreen-sm-down .modal-body{overflow-y:auto}}@media (max-width: 767.98px){.modal-fullscreen-md-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-md-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-md-down .modal-footer,.modal-fullscreen-md-down .modal-header{border-radius:0}.modal-fullscreen-md-down .modal-body{overflow-y:auto}}@media (max-width: 991.98px){.modal-fullscreen-lg-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-lg-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-lg-down .modal-footer,.modal-fullscreen-lg-down .modal-header{border-radius:0}.modal-fullscreen-lg-down .modal-body{overflow-y:auto}}@media (max-width: 1199.98px){.modal-fullscreen-xl-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-xl-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-xl-down .modal-footer,.modal-fullscreen-xl-down .modal-header{border-radius:0}.modal-fullscreen-xl-down .modal-body{overflow-y:auto}}@media (max-width: 1399.98px){.modal-fullscreen-xxl-down{width:100vw;max-width:none;height:100%;margin:0}.modal-fullscreen-xxl-down .modal-content{height:100%;border:0;border-radius:0}.modal-fullscreen-xxl-down .modal-footer,.modal-fullscreen-xxl-down .modal-header{border-radius:0}.modal-fullscreen-xxl-down .modal-body{overflow-y:auto}}.tooltip{--bs-tooltip-zindex: 1080;--bs-tooltip-max-width: 200px;--bs-tooltip-padding-x: .5rem;--bs-tooltip-padding-y: .25rem;--bs-tooltip-margin: ;--bs-tooltip-font-size: .875rem;--bs-tooltip-color: #fff;--bs-tooltip-bg: #000;--bs-tooltip-border-radius: .375rem;--bs-tooltip-opacity: .9;--bs-tooltip-arrow-width: .8rem;--bs-tooltip-arrow-height: .4rem;z-index:var(--bs-tooltip-zindex);display:block;padding:var(--bs-tooltip-arrow-height);margin:var(--bs-tooltip-margin);font-family:var(--bs-font-sans-serif);font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;white-space:normal;word-spacing:normal;line-break:auto;font-size:var(--bs-tooltip-font-size);word-wrap:break-word;opacity:0}.tooltip.show{opacity:var(--bs-tooltip-opacity)}.tooltip .tooltip-arrow{display:block;width:var(--bs-tooltip-arrow-width);height:var(--bs-tooltip-arrow-height)}.tooltip .tooltip-arrow:before{position:absolute;content:"";border-color:transparent;border-style:solid}.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow,.bs-tooltip-top .tooltip-arrow{bottom:0}.bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow:before,.bs-tooltip-top .tooltip-arrow:before{top:-1px;border-width:var(--bs-tooltip-arrow-height) calc(var(--bs-tooltip-arrow-width) * .5) 0;border-top-color:var(--bs-tooltip-bg)}.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow,.bs-tooltip-end .tooltip-arrow{left:0;width:var(--bs-tooltip-arrow-height);height:var(--bs-tooltip-arrow-width)}.bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow:before,.bs-tooltip-end .tooltip-arrow:before{right:-1px;border-width:calc(var(--bs-tooltip-arrow-width) * .5) var(--bs-tooltip-arrow-height) calc(var(--bs-tooltip-arrow-width) * .5) 0;border-right-color:var(--bs-tooltip-bg)}.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow,.bs-tooltip-bottom .tooltip-arrow{top:0}.bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow:before,.bs-tooltip-bottom .tooltip-arrow:before{bottom:-1px;border-width:0 calc(var(--bs-tooltip-arrow-width) * .5) var(--bs-tooltip-arrow-height);border-bottom-color:var(--bs-tooltip-bg)}.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow,.bs-tooltip-start .tooltip-arrow{right:0;width:var(--bs-tooltip-arrow-height);height:var(--bs-tooltip-arrow-width)}.bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow:before,.bs-tooltip-start .tooltip-arrow:before{left:-1px;border-width:calc(var(--bs-tooltip-arrow-width) * .5) 0 calc(var(--bs-tooltip-arrow-width) * .5) var(--bs-tooltip-arrow-height);border-left-color:var(--bs-tooltip-bg)}.tooltip-inner{max-width:var(--bs-tooltip-max-width);padding:var(--bs-tooltip-padding-y) var(--bs-tooltip-padding-x);color:var(--bs-tooltip-color);text-align:center;background-color:var(--bs-tooltip-bg);border-radius:var(--bs-tooltip-border-radius)}.popover{--bs-popover-zindex: 1070;--bs-popover-max-width: 276px;--bs-popover-font-size: .875rem;--bs-popover-bg: #fff;--bs-popover-border-width: 1px;--bs-popover-border-color: var(--bs-border-color-translucent);--bs-popover-border-radius: .5rem;--bs-popover-inner-border-radius:calc(.5rem - 1px);--bs-popover-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);--bs-popover-header-padding-x: 1rem;--bs-popover-header-padding-y: .5rem;--bs-popover-header-font-size: 1rem;--bs-popover-header-color: ;--bs-popover-header-bg: #f0f0f0;--bs-popover-body-padding-x: 1rem;--bs-popover-body-padding-y: 1rem;--bs-popover-body-color: #212529;--bs-popover-arrow-width: 1rem;--bs-popover-arrow-height: .5rem;--bs-popover-arrow-border: var(--bs-popover-border-color);z-index:var(--bs-popover-zindex);display:block;max-width:var(--bs-popover-max-width);font-family:var(--bs-font-sans-serif);font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;white-space:normal;word-spacing:normal;line-break:auto;font-size:var(--bs-popover-font-size);word-wrap:break-word;background-color:var(--bs-popover-bg);background-clip:padding-box;border:var(--bs-popover-border-width) solid var(--bs-popover-border-color);border-radius:var(--bs-popover-border-radius)}.popover .popover-arrow{display:block;width:var(--bs-popover-arrow-width);height:var(--bs-popover-arrow-height)}.popover .popover-arrow:after,.popover .popover-arrow:before{position:absolute;display:block;content:"";border-color:transparent;border-style:solid;border-width:0}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow,.bs-popover-top>.popover-arrow{bottom:calc(-1 * (var(--bs-popover-arrow-height)) - var(--bs-popover-border-width))}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:after,.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:before,.bs-popover-top>.popover-arrow:after,.bs-popover-top>.popover-arrow:before{border-width:var(--bs-popover-arrow-height) calc(var(--bs-popover-arrow-width) * .5) 0}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:before,.bs-popover-top>.popover-arrow:before{bottom:0;border-top-color:var(--bs-popover-arrow-border)}.bs-popover-auto[data-popper-placement^=top]>.popover-arrow:after,.bs-popover-top>.popover-arrow:after{bottom:var(--bs-popover-border-width);border-top-color:var(--bs-popover-bg)}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow,.bs-popover-end>.popover-arrow{left:calc(-1 * (var(--bs-popover-arrow-height)) - var(--bs-popover-border-width));width:var(--bs-popover-arrow-height);height:var(--bs-popover-arrow-width)}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:after,.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:before,.bs-popover-end>.popover-arrow:after,.bs-popover-end>.popover-arrow:before{border-width:calc(var(--bs-popover-arrow-width) * .5) var(--bs-popover-arrow-height) calc(var(--bs-popover-arrow-width) * .5) 0}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:before,.bs-popover-end>.popover-arrow:before{left:0;border-right-color:var(--bs-popover-arrow-border)}.bs-popover-auto[data-popper-placement^=right]>.popover-arrow:after,.bs-popover-end>.popover-arrow:after{left:var(--bs-popover-border-width);border-right-color:var(--bs-popover-bg)}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow,.bs-popover-bottom>.popover-arrow{top:calc(-1 * (var(--bs-popover-arrow-height)) - var(--bs-popover-border-width))}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:after,.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:before,.bs-popover-bottom>.popover-arrow:after,.bs-popover-bottom>.popover-arrow:before{border-width:0 calc(var(--bs-popover-arrow-width) * .5) var(--bs-popover-arrow-height)}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:before,.bs-popover-bottom>.popover-arrow:before{top:0;border-bottom-color:var(--bs-popover-arrow-border)}.bs-popover-auto[data-popper-placement^=bottom]>.popover-arrow:after,.bs-popover-bottom>.popover-arrow:after{top:var(--bs-popover-border-width);border-bottom-color:var(--bs-popover-bg)}.bs-popover-auto[data-popper-placement^=bottom] .popover-header:before,.bs-popover-bottom .popover-header:before{position:absolute;top:0;left:50%;display:block;width:var(--bs-popover-arrow-width);margin-left:calc(-.5 * var(--bs-popover-arrow-width));content:"";border-bottom:var(--bs-popover-border-width) solid var(--bs-popover-header-bg)}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow,.bs-popover-start>.popover-arrow{right:calc(-1 * (var(--bs-popover-arrow-height)) - var(--bs-popover-border-width));width:var(--bs-popover-arrow-height);height:var(--bs-popover-arrow-width)}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:after,.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:before,.bs-popover-start>.popover-arrow:after,.bs-popover-start>.popover-arrow:before{border-width:calc(var(--bs-popover-arrow-width) * .5) 0 calc(var(--bs-popover-arrow-width) * .5) var(--bs-popover-arrow-height)}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:before,.bs-popover-start>.popover-arrow:before{right:0;border-left-color:var(--bs-popover-arrow-border)}.bs-popover-auto[data-popper-placement^=left]>.popover-arrow:after,.bs-popover-start>.popover-arrow:after{right:var(--bs-popover-border-width);border-left-color:var(--bs-popover-bg)}.popover-header{padding:var(--bs-popover-header-padding-y) var(--bs-popover-header-padding-x);margin-bottom:0;font-size:var(--bs-popover-header-font-size);color:var(--bs-popover-header-color);background-color:var(--bs-popover-header-bg);border-bottom:var(--bs-popover-border-width) solid var(--bs-popover-border-color);border-top-left-radius:var(--bs-popover-inner-border-radius);border-top-right-radius:var(--bs-popover-inner-border-radius)}.popover-header:empty{display:none}.popover-body{padding:var(--bs-popover-body-padding-y) var(--bs-popover-body-padding-x);color:var(--bs-popover-body-color)}.carousel{position:relative}.carousel.pointer-event{touch-action:pan-y}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-inner:after{display:block;clear:both;content:""}.carousel-item{position:relative;display:none;float:left;width:100%;margin-right:-100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;transition:transform .6s ease-in-out}@media (prefers-reduced-motion: reduce){.carousel-item{transition:none}}.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:block}.active.carousel-item-end,.carousel-item-next:not(.carousel-item-start){transform:translate(100%)}.active.carousel-item-start,.carousel-item-prev:not(.carousel-item-end){transform:translate(-100%)}.carousel-fade .carousel-item{opacity:0;transition-property:opacity;transform:none}.carousel-fade .carousel-item-next.carousel-item-start,.carousel-fade .carousel-item-prev.carousel-item-end,.carousel-fade .carousel-item.active{z-index:1;opacity:1}.carousel-fade .active.carousel-item-end,.carousel-fade .active.carousel-item-start{z-index:0;opacity:0;transition:opacity 0s .6s}@media (prefers-reduced-motion: reduce){.carousel-fade .active.carousel-item-end,.carousel-fade .active.carousel-item-start{transition:none}}.carousel-control-next,.carousel-control-prev{position:absolute;top:0;bottom:0;z-index:1;display:flex;align-items:center;justify-content:center;width:15%;padding:0;color:#fff;text-align:center;background:0 0;border:0;opacity:.5;transition:opacity .15s ease}@media (prefers-reduced-motion: reduce){.carousel-control-next,.carousel-control-prev{transition:none}}.carousel-control-next:focus,.carousel-control-next:hover,.carousel-control-prev:focus,.carousel-control-prev:hover{color:#fff;text-decoration:none;outline:0;opacity:.9}.carousel-control-prev{left:0}.carousel-control-next{right:0}.carousel-control-next-icon,.carousel-control-prev-icon{display:inline-block;width:2rem;height:2rem;background-repeat:no-repeat;background-position:50%;background-size:100% 100%}.carousel-control-prev-icon{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e")}.carousel-control-next-icon{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e")}.carousel-indicators{position:absolute;right:0;bottom:0;left:0;z-index:2;display:flex;justify-content:center;padding:0;margin-right:15%;margin-bottom:1rem;margin-left:15%;list-style:none}.carousel-indicators [data-bs-target]{box-sizing:content-box;flex:0 1 auto;width:30px;height:3px;padding:0;margin-right:3px;margin-left:3px;text-indent:-999px;cursor:pointer;background-color:#fff;background-clip:padding-box;border:0;border-top:10px solid transparent;border-bottom:10px solid transparent;opacity:.5;transition:opacity .6s ease}@media (prefers-reduced-motion: reduce){.carousel-indicators [data-bs-target]{transition:none}}.carousel-indicators .active{opacity:1}.carousel-caption{position:absolute;right:15%;bottom:1.25rem;left:15%;padding-top:1.25rem;padding-bottom:1.25rem;color:#fff;text-align:center}.carousel-dark .carousel-control-next-icon,.carousel-dark .carousel-control-prev-icon{filter:invert(1) grayscale(100)}.carousel-dark .carousel-indicators [data-bs-target]{background-color:#000}.carousel-dark .carousel-caption{color:#000}.spinner-border,.spinner-grow{display:inline-block;width:var(--bs-spinner-width);height:var(--bs-spinner-height);vertical-align:var(--bs-spinner-vertical-align);border-radius:50%;animation:var(--bs-spinner-animation-speed) linear infinite var(--bs-spinner-animation-name)}@keyframes spinner-border{to{transform:rotate(360deg)}}.spinner-border{--bs-spinner-width: 2rem;--bs-spinner-height: 2rem;--bs-spinner-vertical-align: -.125em;--bs-spinner-border-width: .25em;--bs-spinner-animation-speed: .75s;--bs-spinner-animation-name: spinner-border;border:var(--bs-spinner-border-width) solid currentcolor;border-right-color:transparent}.spinner-border-sm{--bs-spinner-width: 1rem;--bs-spinner-height: 1rem;--bs-spinner-border-width: .2em}@keyframes spinner-grow{0%{transform:scale(0)}50%{opacity:1;transform:none}}.spinner-grow{--bs-spinner-width: 2rem;--bs-spinner-height: 2rem;--bs-spinner-vertical-align: -.125em;--bs-spinner-animation-speed: .75s;--bs-spinner-animation-name: spinner-grow;background-color:currentcolor;opacity:0}.spinner-grow-sm{--bs-spinner-width: 1rem;--bs-spinner-height: 1rem}@media (prefers-reduced-motion: reduce){.spinner-border,.spinner-grow{--bs-spinner-animation-speed: 1.5s}}.offcanvas,.offcanvas-lg,.offcanvas-md,.offcanvas-sm,.offcanvas-xl,.offcanvas-xxl{--bs-offcanvas-zindex: 1045;--bs-offcanvas-width: 400px;--bs-offcanvas-height: 30vh;--bs-offcanvas-padding-x: 1rem;--bs-offcanvas-padding-y: 1rem;--bs-offcanvas-color: ;--bs-offcanvas-bg: #fff;--bs-offcanvas-border-width: 1px;--bs-offcanvas-border-color: var(--bs-border-color-translucent);--bs-offcanvas-box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075)}@media (max-width: 575.98px){.offcanvas-sm{position:fixed;bottom:0;z-index:var(--bs-offcanvas-zindex);display:flex;flex-direction:column;max-width:100%;color:var(--bs-offcanvas-color);visibility:hidden;background-color:var(--bs-offcanvas-bg);background-clip:padding-box;outline:0;transition:transform .3s ease-in-out}}@media (max-width: 575.98px) and (prefers-reduced-motion: reduce){.offcanvas-sm{transition:none}}@media (max-width: 575.98px){.offcanvas-sm.offcanvas-start{top:0;left:0;width:var(--bs-offcanvas-width);border-right:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(-100%)}}@media (max-width: 575.98px){.offcanvas-sm.offcanvas-end{top:0;right:0;width:var(--bs-offcanvas-width);border-left:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(100%)}}@media (max-width: 575.98px){.offcanvas-sm.offcanvas-top{top:0;right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-bottom:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(-100%)}}@media (max-width: 575.98px){.offcanvas-sm.offcanvas-bottom{right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-top:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(100%)}}@media (max-width: 575.98px){.offcanvas-sm.show:not(.hiding),.offcanvas-sm.showing{transform:none}}@media (max-width: 575.98px){.offcanvas-sm.hiding,.offcanvas-sm.show,.offcanvas-sm.showing{visibility:visible}}@media (min-width: 576px){.offcanvas-sm{--bs-offcanvas-height: auto;--bs-offcanvas-border-width: 0;background-color:transparent!important}.offcanvas-sm .offcanvas-header{display:none}.offcanvas-sm .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible;background-color:transparent!important}}@media (max-width: 767.98px){.offcanvas-md{position:fixed;bottom:0;z-index:var(--bs-offcanvas-zindex);display:flex;flex-direction:column;max-width:100%;color:var(--bs-offcanvas-color);visibility:hidden;background-color:var(--bs-offcanvas-bg);background-clip:padding-box;outline:0;transition:transform .3s ease-in-out}}@media (max-width: 767.98px) and (prefers-reduced-motion: reduce){.offcanvas-md{transition:none}}@media (max-width: 767.98px){.offcanvas-md.offcanvas-start{top:0;left:0;width:var(--bs-offcanvas-width);border-right:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(-100%)}}@media (max-width: 767.98px){.offcanvas-md.offcanvas-end{top:0;right:0;width:var(--bs-offcanvas-width);border-left:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(100%)}}@media (max-width: 767.98px){.offcanvas-md.offcanvas-top{top:0;right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-bottom:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(-100%)}}@media (max-width: 767.98px){.offcanvas-md.offcanvas-bottom{right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-top:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(100%)}}@media (max-width: 767.98px){.offcanvas-md.show:not(.hiding),.offcanvas-md.showing{transform:none}}@media (max-width: 767.98px){.offcanvas-md.hiding,.offcanvas-md.show,.offcanvas-md.showing{visibility:visible}}@media (min-width: 768px){.offcanvas-md{--bs-offcanvas-height: auto;--bs-offcanvas-border-width: 0;background-color:transparent!important}.offcanvas-md .offcanvas-header{display:none}.offcanvas-md .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible;background-color:transparent!important}}@media (max-width: 991.98px){.offcanvas-lg{position:fixed;bottom:0;z-index:var(--bs-offcanvas-zindex);display:flex;flex-direction:column;max-width:100%;color:var(--bs-offcanvas-color);visibility:hidden;background-color:var(--bs-offcanvas-bg);background-clip:padding-box;outline:0;transition:transform .3s ease-in-out}}@media (max-width: 991.98px) and (prefers-reduced-motion: reduce){.offcanvas-lg{transition:none}}@media (max-width: 991.98px){.offcanvas-lg.offcanvas-start{top:0;left:0;width:var(--bs-offcanvas-width);border-right:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(-100%)}}@media (max-width: 991.98px){.offcanvas-lg.offcanvas-end{top:0;right:0;width:var(--bs-offcanvas-width);border-left:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(100%)}}@media (max-width: 991.98px){.offcanvas-lg.offcanvas-top{top:0;right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-bottom:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(-100%)}}@media (max-width: 991.98px){.offcanvas-lg.offcanvas-bottom{right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-top:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(100%)}}@media (max-width: 991.98px){.offcanvas-lg.show:not(.hiding),.offcanvas-lg.showing{transform:none}}@media (max-width: 991.98px){.offcanvas-lg.hiding,.offcanvas-lg.show,.offcanvas-lg.showing{visibility:visible}}@media (min-width: 992px){.offcanvas-lg{--bs-offcanvas-height: auto;--bs-offcanvas-border-width: 0;background-color:transparent!important}.offcanvas-lg .offcanvas-header{display:none}.offcanvas-lg .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible;background-color:transparent!important}}@media (max-width: 1199.98px){.offcanvas-xl{position:fixed;bottom:0;z-index:var(--bs-offcanvas-zindex);display:flex;flex-direction:column;max-width:100%;color:var(--bs-offcanvas-color);visibility:hidden;background-color:var(--bs-offcanvas-bg);background-clip:padding-box;outline:0;transition:transform .3s ease-in-out}}@media (max-width: 1199.98px) and (prefers-reduced-motion: reduce){.offcanvas-xl{transition:none}}@media (max-width: 1199.98px){.offcanvas-xl.offcanvas-start{top:0;left:0;width:var(--bs-offcanvas-width);border-right:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(-100%)}}@media (max-width: 1199.98px){.offcanvas-xl.offcanvas-end{top:0;right:0;width:var(--bs-offcanvas-width);border-left:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(100%)}}@media (max-width: 1199.98px){.offcanvas-xl.offcanvas-top{top:0;right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-bottom:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(-100%)}}@media (max-width: 1199.98px){.offcanvas-xl.offcanvas-bottom{right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-top:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(100%)}}@media (max-width: 1199.98px){.offcanvas-xl.show:not(.hiding),.offcanvas-xl.showing{transform:none}}@media (max-width: 1199.98px){.offcanvas-xl.hiding,.offcanvas-xl.show,.offcanvas-xl.showing{visibility:visible}}@media (min-width: 1200px){.offcanvas-xl{--bs-offcanvas-height: auto;--bs-offcanvas-border-width: 0;background-color:transparent!important}.offcanvas-xl .offcanvas-header{display:none}.offcanvas-xl .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible;background-color:transparent!important}}@media (max-width: 1399.98px){.offcanvas-xxl{position:fixed;bottom:0;z-index:var(--bs-offcanvas-zindex);display:flex;flex-direction:column;max-width:100%;color:var(--bs-offcanvas-color);visibility:hidden;background-color:var(--bs-offcanvas-bg);background-clip:padding-box;outline:0;transition:transform .3s ease-in-out}}@media (max-width: 1399.98px) and (prefers-reduced-motion: reduce){.offcanvas-xxl{transition:none}}@media (max-width: 1399.98px){.offcanvas-xxl.offcanvas-start{top:0;left:0;width:var(--bs-offcanvas-width);border-right:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(-100%)}}@media (max-width: 1399.98px){.offcanvas-xxl.offcanvas-end{top:0;right:0;width:var(--bs-offcanvas-width);border-left:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(100%)}}@media (max-width: 1399.98px){.offcanvas-xxl.offcanvas-top{top:0;right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-bottom:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(-100%)}}@media (max-width: 1399.98px){.offcanvas-xxl.offcanvas-bottom{right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-top:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(100%)}}@media (max-width: 1399.98px){.offcanvas-xxl.show:not(.hiding),.offcanvas-xxl.showing{transform:none}}@media (max-width: 1399.98px){.offcanvas-xxl.hiding,.offcanvas-xxl.show,.offcanvas-xxl.showing{visibility:visible}}@media (min-width: 1400px){.offcanvas-xxl{--bs-offcanvas-height: auto;--bs-offcanvas-border-width: 0;background-color:transparent!important}.offcanvas-xxl .offcanvas-header{display:none}.offcanvas-xxl .offcanvas-body{display:flex;flex-grow:0;padding:0;overflow-y:visible;background-color:transparent!important}}.offcanvas{position:fixed;bottom:0;z-index:var(--bs-offcanvas-zindex);display:flex;flex-direction:column;max-width:100%;color:var(--bs-offcanvas-color);visibility:hidden;background-color:var(--bs-offcanvas-bg);background-clip:padding-box;outline:0;transition:transform .3s ease-in-out}@media (prefers-reduced-motion: reduce){.offcanvas{transition:none}}.offcanvas.offcanvas-start{top:0;left:0;width:var(--bs-offcanvas-width);border-right:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(-100%)}.offcanvas.offcanvas-end{top:0;right:0;width:var(--bs-offcanvas-width);border-left:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translate(100%)}.offcanvas.offcanvas-top{top:0;right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-bottom:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(-100%)}.offcanvas.offcanvas-bottom{right:0;left:0;height:var(--bs-offcanvas-height);max-height:100%;border-top:var(--bs-offcanvas-border-width) solid var(--bs-offcanvas-border-color);transform:translateY(100%)}.offcanvas.show:not(.hiding),.offcanvas.showing{transform:none}.offcanvas.hiding,.offcanvas.show,.offcanvas.showing{visibility:visible}.offcanvas-backdrop{position:fixed;top:0;left:0;z-index:1040;width:100vw;height:100vh;background-color:#000}.offcanvas-backdrop.fade{opacity:0}.offcanvas-backdrop.show{opacity:.5}.offcanvas-header{display:flex;align-items:center;justify-content:space-between;padding:var(--bs-offcanvas-padding-y) var(--bs-offcanvas-padding-x)}.offcanvas-header .btn-close{padding:calc(var(--bs-offcanvas-padding-y) * .5) calc(var(--bs-offcanvas-padding-x) * .5);margin-top:calc(-.5 * var(--bs-offcanvas-padding-y));margin-right:calc(-.5 * var(--bs-offcanvas-padding-x));margin-bottom:calc(-.5 * var(--bs-offcanvas-padding-y))}.offcanvas-title{margin-bottom:0;line-height:1.5}.offcanvas-body{flex-grow:1;padding:var(--bs-offcanvas-padding-y) var(--bs-offcanvas-padding-x);overflow-y:auto}.placeholder{display:inline-block;min-height:1em;vertical-align:middle;cursor:wait;background-color:currentcolor;opacity:.5}.placeholder.btn:before{display:inline-block;content:""}.placeholder-xs{min-height:.6em}.placeholder-sm{min-height:.8em}.placeholder-lg{min-height:1.2em}.placeholder-glow .placeholder{animation:placeholder-glow 2s ease-in-out infinite}@keyframes placeholder-glow{50%{opacity:.2}}.placeholder-wave{-webkit-mask-image:linear-gradient(130deg,#000 55%,rgba(0,0,0,.8) 75%,#000 95%);mask-image:linear-gradient(130deg,#000 55%,rgba(0,0,0,.8) 75%,#000 95%);-webkit-mask-size:200% 100%;mask-size:200% 100%;animation:placeholder-wave 2s linear infinite}@keyframes placeholder-wave{to{-webkit-mask-position:-200% 0%;mask-position:-200% 0%}}.clearfix:after{display:block;clear:both;content:""}.text-bg-primary{color:#fff!important;background-color:RGBA(13,110,253,var(--bs-bg-opacity, 1))!important}.text-bg-secondary{color:#fff!important;background-color:RGBA(108,117,125,var(--bs-bg-opacity, 1))!important}.text-bg-success{color:#fff!important;background-color:RGBA(25,135,84,var(--bs-bg-opacity, 1))!important}.text-bg-info{color:#000!important;background-color:RGBA(13,202,240,var(--bs-bg-opacity, 1))!important}.text-bg-warning{color:#000!important;background-color:RGBA(255,193,7,var(--bs-bg-opacity, 1))!important}.text-bg-danger{color:#fff!important;background-color:RGBA(220,53,69,var(--bs-bg-opacity, 1))!important}.text-bg-light{color:#000!important;background-color:RGBA(248,249,250,var(--bs-bg-opacity, 1))!important}.text-bg-dark{color:#fff!important;background-color:RGBA(33,37,41,var(--bs-bg-opacity, 1))!important}.link-primary{color:#0d6efd!important}.link-primary:focus,.link-primary:hover{color:#0a58ca!important}.link-secondary{color:#6c757d!important}.link-secondary:focus,.link-secondary:hover{color:#565e64!important}.link-success{color:#198754!important}.link-success:focus,.link-success:hover{color:#146c43!important}.link-info{color:#0dcaf0!important}.link-info:focus,.link-info:hover{color:#3dd5f3!important}.link-warning{color:#ffc107!important}.link-warning:focus,.link-warning:hover{color:#ffcd39!important}.link-danger{color:#dc3545!important}.link-danger:focus,.link-danger:hover{color:#b02a37!important}.link-light{color:#f8f9fa!important}.link-light:focus,.link-light:hover{color:#f9fafb!important}.link-dark{color:#212529!important}.link-dark:focus,.link-dark:hover{color:#1a1e21!important}.ratio{position:relative;width:100%}.ratio:before{display:block;padding-top:var(--bs-aspect-ratio);content:""}.ratio>*{position:absolute;top:0;left:0;width:100%;height:100%}.ratio-1x1{--bs-aspect-ratio: 100%}.ratio-4x3{--bs-aspect-ratio: 75%}.ratio-16x9{--bs-aspect-ratio: 56.25%}.ratio-21x9{--bs-aspect-ratio: 42.8571428571%}.fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}.sticky-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}.sticky-bottom{position:-webkit-sticky;position:sticky;bottom:0;z-index:1020}@media (min-width: 576px){.sticky-sm-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}.sticky-sm-bottom{position:-webkit-sticky;position:sticky;bottom:0;z-index:1020}}@media (min-width: 768px){.sticky-md-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}.sticky-md-bottom{position:-webkit-sticky;position:sticky;bottom:0;z-index:1020}}@media (min-width: 992px){.sticky-lg-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}.sticky-lg-bottom{position:-webkit-sticky;position:sticky;bottom:0;z-index:1020}}@media (min-width: 1200px){.sticky-xl-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}.sticky-xl-bottom{position:-webkit-sticky;position:sticky;bottom:0;z-index:1020}}@media (min-width: 1400px){.sticky-xxl-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}.sticky-xxl-bottom{position:-webkit-sticky;position:sticky;bottom:0;z-index:1020}}.hstack{display:flex;flex-direction:row;align-items:center;align-self:stretch}.vstack{display:flex;flex:1 1 auto;flex-direction:column;align-self:stretch}.visually-hidden,.visually-hidden-focusable:not(:focus):not(:focus-within){position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}.stretched-link:after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;content:""}.text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.vr{display:inline-block;align-self:stretch;width:1px;min-height:1em;background-color:currentcolor;opacity:.25}.align-baseline{vertical-align:baseline!important}.align-top{vertical-align:top!important}.align-middle{vertical-align:middle!important}.align-bottom{vertical-align:bottom!important}.align-text-bottom{vertical-align:text-bottom!important}.align-text-top{vertical-align:text-top!important}.float-start{float:left!important}.float-end{float:right!important}.float-none{float:none!important}.opacity-0{opacity:0!important}.opacity-25{opacity:.25!important}.opacity-50{opacity:.5!important}.opacity-75{opacity:.75!important}.opacity-100{opacity:1!important}.overflow-auto{overflow:auto!important}.overflow-hidden{overflow:hidden!important}.overflow-visible{overflow:visible!important}.overflow-scroll{overflow:scroll!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block{display:block!important}.d-grid{display:grid!important}.d-table{display:table!important}.d-table-row{display:table-row!important}.d-table-cell{display:table-cell!important}.d-flex{display:flex!important}.d-inline-flex{display:inline-flex!important}.d-none{display:none!important}.shadow{box-shadow:0 .5rem 1rem #00000026!important}.shadow-sm{box-shadow:0 .125rem .25rem #00000013!important}.shadow-lg{box-shadow:0 1rem 3rem #0000002d!important}.shadow-none{box-shadow:none!important}.position-static{position:static!important}.position-relative{position:relative!important}.position-absolute{position:absolute!important}.position-fixed{position:fixed!important}.position-sticky{position:-webkit-sticky!important;position:sticky!important}.top-0{top:0!important}.top-50{top:50%!important}.top-100{top:100%!important}.bottom-0{bottom:0!important}.bottom-50{bottom:50%!important}.bottom-100{bottom:100%!important}.start-0{left:0!important}.start-50{left:50%!important}.start-100{left:100%!important}.end-0{right:0!important}.end-50{right:50%!important}.end-100{right:100%!important}.translate-middle{transform:translate(-50%,-50%)!important}.translate-middle-x{transform:translate(-50%)!important}.translate-middle-y{transform:translateY(-50%)!important}.border{border:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.border-0{border:0!important}.border-top{border-top:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.border-top-0{border-top:0!important}.border-end{border-right:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.border-end-0{border-right:0!important}.border-bottom{border-bottom:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.border-bottom-0{border-bottom:0!important}.border-start{border-left:var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)!important}.border-start-0{border-left:0!important}.border-primary{--bs-border-opacity: 1;border-color:rgba(var(--bs-primary-rgb),var(--bs-border-opacity))!important}.border-secondary{--bs-border-opacity: 1;border-color:rgba(var(--bs-secondary-rgb),var(--bs-border-opacity))!important}.border-success{--bs-border-opacity: 1;border-color:rgba(var(--bs-success-rgb),var(--bs-border-opacity))!important}.border-info{--bs-border-opacity: 1;border-color:rgba(var(--bs-info-rgb),var(--bs-border-opacity))!important}.border-warning{--bs-border-opacity: 1;border-color:rgba(var(--bs-warning-rgb),var(--bs-border-opacity))!important}.border-danger{--bs-border-opacity: 1;border-color:rgba(var(--bs-danger-rgb),var(--bs-border-opacity))!important}.border-light{--bs-border-opacity: 1;border-color:rgba(var(--bs-light-rgb),var(--bs-border-opacity))!important}.border-dark{--bs-border-opacity: 1;border-color:rgba(var(--bs-dark-rgb),var(--bs-border-opacity))!important}.border-white{--bs-border-opacity: 1;border-color:rgba(var(--bs-white-rgb),var(--bs-border-opacity))!important}.border-1{--bs-border-width: 1px}.border-2{--bs-border-width: 2px}.border-3{--bs-border-width: 3px}.border-4{--bs-border-width: 4px}.border-5{--bs-border-width: 5px}.border-opacity-10{--bs-border-opacity: .1}.border-opacity-25{--bs-border-opacity: .25}.border-opacity-50{--bs-border-opacity: .5}.border-opacity-75{--bs-border-opacity: .75}.border-opacity-100{--bs-border-opacity: 1}.w-25{width:25%!important}.w-50{width:50%!important}.w-75{width:75%!important}.w-100{width:100%!important}.w-auto{width:auto!important}.mw-100{max-width:100%!important}.vw-100{width:100vw!important}.min-vw-100{min-width:100vw!important}.h-25{height:25%!important}.h-50{height:50%!important}.h-75{height:75%!important}.h-100{height:100%!important}.h-auto{height:auto!important}.mh-100{max-height:100%!important}.vh-100{height:100vh!important}.min-vh-100{min-height:100vh!important}.flex-fill{flex:1 1 auto!important}.flex-row{flex-direction:row!important}.flex-column{flex-direction:column!important}.flex-row-reverse{flex-direction:row-reverse!important}.flex-column-reverse{flex-direction:column-reverse!important}.flex-grow-0{flex-grow:0!important}.flex-grow-1{flex-grow:1!important}.flex-shrink-0{flex-shrink:0!important}.flex-shrink-1{flex-shrink:1!important}.flex-wrap{flex-wrap:wrap!important}.flex-nowrap{flex-wrap:nowrap!important}.flex-wrap-reverse{flex-wrap:wrap-reverse!important}.justify-content-start{justify-content:flex-start!important}.justify-content-end{justify-content:flex-end!important}.justify-content-center{justify-content:center!important}.justify-content-between{justify-content:space-between!important}.justify-content-around{justify-content:space-around!important}.justify-content-evenly{justify-content:space-evenly!important}.align-items-start{align-items:flex-start!important}.align-items-end{align-items:flex-end!important}.align-items-center{align-items:center!important}.align-items-baseline{align-items:baseline!important}.align-items-stretch{align-items:stretch!important}.align-content-start{align-content:flex-start!important}.align-content-end{align-content:flex-end!important}.align-content-center{align-content:center!important}.align-content-between{align-content:space-between!important}.align-content-around{align-content:space-around!important}.align-content-stretch{align-content:stretch!important}.align-self-auto{align-self:auto!important}.align-self-start{align-self:flex-start!important}.align-self-end{align-self:flex-end!important}.align-self-center{align-self:center!important}.align-self-baseline{align-self:baseline!important}.align-self-stretch{align-self:stretch!important}.order-first{order:-1!important}.order-0{order:0!important}.order-1{order:1!important}.order-2{order:2!important}.order-3{order:3!important}.order-4{order:4!important}.order-5{order:5!important}.order-last{order:6!important}.m-0{margin:0!important}.m-1{margin:.25rem!important}.m-2{margin:.5rem!important}.m-3{margin:1rem!important}.m-4{margin:1.5rem!important}.m-5{margin:3rem!important}.m-auto{margin:auto!important}.mx-0{margin-right:0!important;margin-left:0!important}.mx-1{margin-right:.25rem!important;margin-left:.25rem!important}.mx-2{margin-right:.5rem!important;margin-left:.5rem!important}.mx-3{margin-right:1rem!important;margin-left:1rem!important}.mx-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.mx-5{margin-right:3rem!important;margin-left:3rem!important}.mx-auto{margin-right:auto!important;margin-left:auto!important}.my-0{margin-top:0!important;margin-bottom:0!important}.my-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.my-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.my-3{margin-top:1rem!important;margin-bottom:1rem!important}.my-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.my-5{margin-top:3rem!important;margin-bottom:3rem!important}.my-auto{margin-top:auto!important;margin-bottom:auto!important}.mt-0{margin-top:0!important}.mt-1{margin-top:.25rem!important}.mt-2{margin-top:.5rem!important}.mt-3{margin-top:1rem!important}.mt-4{margin-top:1.5rem!important}.mt-5{margin-top:3rem!important}.mt-auto{margin-top:auto!important}.me-0{margin-right:0!important}.me-1{margin-right:.25rem!important}.me-2{margin-right:.5rem!important}.me-3{margin-right:1rem!important}.me-4{margin-right:1.5rem!important}.me-5{margin-right:3rem!important}.me-auto{margin-right:auto!important}.mb-0{margin-bottom:0!important}.mb-1{margin-bottom:.25rem!important}.mb-2{margin-bottom:.5rem!important}.mb-3{margin-bottom:1rem!important}.mb-4{margin-bottom:1.5rem!important}.mb-5{margin-bottom:3rem!important}.mb-auto{margin-bottom:auto!important}.ms-0{margin-left:0!important}.ms-1{margin-left:.25rem!important}.ms-2{margin-left:.5rem!important}.ms-3{margin-left:1rem!important}.ms-4{margin-left:1.5rem!important}.ms-5{margin-left:3rem!important}.ms-auto{margin-left:auto!important}.p-0{padding:0!important}.p-1{padding:.25rem!important}.p-2{padding:.5rem!important}.p-3{padding:1rem!important}.p-4{padding:1.5rem!important}.p-5{padding:3rem!important}.px-0{padding-right:0!important;padding-left:0!important}.px-1{padding-right:.25rem!important;padding-left:.25rem!important}.px-2{padding-right:.5rem!important;padding-left:.5rem!important}.px-3{padding-right:1rem!important;padding-left:1rem!important}.px-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.px-5{padding-right:3rem!important;padding-left:3rem!important}.py-0{padding-top:0!important;padding-bottom:0!important}.py-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.py-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.py-3{padding-top:1rem!important;padding-bottom:1rem!important}.py-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.py-5{padding-top:3rem!important;padding-bottom:3rem!important}.pt-0{padding-top:0!important}.pt-1{padding-top:.25rem!important}.pt-2{padding-top:.5rem!important}.pt-3{padding-top:1rem!important}.pt-4{padding-top:1.5rem!important}.pt-5{padding-top:3rem!important}.pe-0{padding-right:0!important}.pe-1{padding-right:.25rem!important}.pe-2{padding-right:.5rem!important}.pe-3{padding-right:1rem!important}.pe-4{padding-right:1.5rem!important}.pe-5{padding-right:3rem!important}.pb-0{padding-bottom:0!important}.pb-1{padding-bottom:.25rem!important}.pb-2{padding-bottom:.5rem!important}.pb-3{padding-bottom:1rem!important}.pb-4{padding-bottom:1.5rem!important}.pb-5{padding-bottom:3rem!important}.ps-0{padding-left:0!important}.ps-1{padding-left:.25rem!important}.ps-2{padding-left:.5rem!important}.ps-3{padding-left:1rem!important}.ps-4{padding-left:1.5rem!important}.ps-5{padding-left:3rem!important}.gap-0{gap:0!important}.gap-1{gap:.25rem!important}.gap-2{gap:.5rem!important}.gap-3{gap:1rem!important}.gap-4{gap:1.5rem!important}.gap-5{gap:3rem!important}.font-monospace{font-family:var(--bs-font-monospace)!important}.fs-1{font-size:calc(1.375rem + 1.5vw)!important}.fs-2{font-size:calc(1.325rem + .9vw)!important}.fs-3{font-size:calc(1.3rem + .6vw)!important}.fs-4{font-size:calc(1.275rem + .3vw)!important}.fs-5{font-size:1.25rem!important}.fs-6{font-size:1rem!important}.fst-italic{font-style:italic!important}.fst-normal{font-style:normal!important}.fw-light{font-weight:300!important}.fw-lighter{font-weight:lighter!important}.fw-normal{font-weight:400!important}.fw-bold{font-weight:700!important}.fw-semibold{font-weight:600!important}.fw-bolder{font-weight:bolder!important}.lh-1{line-height:1!important}.lh-sm{line-height:1.25!important}.lh-base{line-height:1.5!important}.lh-lg{line-height:2!important}.text-start{text-align:left!important}.text-end{text-align:right!important}.text-center{text-align:center!important}.text-decoration-none{text-decoration:none!important}.text-decoration-underline{text-decoration:underline!important}.text-decoration-line-through{text-decoration:line-through!important}.text-lowercase{text-transform:lowercase!important}.text-uppercase{text-transform:uppercase!important}.text-capitalize{text-transform:capitalize!important}.text-wrap{white-space:normal!important}.text-nowrap{white-space:nowrap!important}.text-break{word-wrap:break-word!important;word-break:break-word!important}.text-primary{--bs-text-opacity: 1;color:rgba(var(--bs-primary-rgb),var(--bs-text-opacity))!important}.text-secondary{--bs-text-opacity: 1;color:rgba(var(--bs-secondary-rgb),var(--bs-text-opacity))!important}.text-success{--bs-text-opacity: 1;color:rgba(var(--bs-success-rgb),var(--bs-text-opacity))!important}.text-info{--bs-text-opacity: 1;color:rgba(var(--bs-info-rgb),var(--bs-text-opacity))!important}.text-warning{--bs-text-opacity: 1;color:rgba(var(--bs-warning-rgb),var(--bs-text-opacity))!important}.text-danger{--bs-text-opacity: 1;color:rgba(var(--bs-danger-rgb),var(--bs-text-opacity))!important}.text-light{--bs-text-opacity: 1;color:rgba(var(--bs-light-rgb),var(--bs-text-opacity))!important}.text-dark{--bs-text-opacity: 1;color:rgba(var(--bs-dark-rgb),var(--bs-text-opacity))!important}.text-black{--bs-text-opacity: 1;color:rgba(var(--bs-black-rgb),var(--bs-text-opacity))!important}.text-white{--bs-text-opacity: 1;color:rgba(var(--bs-white-rgb),var(--bs-text-opacity))!important}.text-body{--bs-text-opacity: 1;color:rgba(var(--bs-body-color-rgb),var(--bs-text-opacity))!important}.text-muted{--bs-text-opacity: 1;color:#6c757d!important}.text-black-50{--bs-text-opacity: 1;color:#00000080!important}.text-white-50{--bs-text-opacity: 1;color:#ffffff80!important}.text-reset{--bs-text-opacity: 1;color:inherit!important}.text-opacity-25{--bs-text-opacity: .25}.text-opacity-50{--bs-text-opacity: .5}.text-opacity-75{--bs-text-opacity: .75}.text-opacity-100{--bs-text-opacity: 1}.bg-primary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-primary-rgb),var(--bs-bg-opacity))!important}.bg-secondary{--bs-bg-opacity: 1;background-color:rgba(var(--bs-secondary-rgb),var(--bs-bg-opacity))!important}.bg-success{--bs-bg-opacity: 1;background-color:rgba(var(--bs-success-rgb),var(--bs-bg-opacity))!important}.bg-info{--bs-bg-opacity: 1;background-color:rgba(var(--bs-info-rgb),var(--bs-bg-opacity))!important}.bg-warning{--bs-bg-opacity: 1;background-color:rgba(var(--bs-warning-rgb),var(--bs-bg-opacity))!important}.bg-danger{--bs-bg-opacity: 1;background-color:rgba(var(--bs-danger-rgb),var(--bs-bg-opacity))!important}.bg-light{--bs-bg-opacity: 1;background-color:rgba(var(--bs-light-rgb),var(--bs-bg-opacity))!important}.bg-dark{--bs-bg-opacity: 1;background-color:rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important}.bg-black{--bs-bg-opacity: 1;background-color:rgba(var(--bs-black-rgb),var(--bs-bg-opacity))!important}.bg-white{--bs-bg-opacity: 1;background-color:rgba(var(--bs-white-rgb),var(--bs-bg-opacity))!important}.bg-body{--bs-bg-opacity: 1;background-color:rgba(var(--bs-body-bg-rgb),var(--bs-bg-opacity))!important}.bg-transparent{--bs-bg-opacity: 1;background-color:transparent!important}.bg-opacity-10{--bs-bg-opacity: .1}.bg-opacity-25{--bs-bg-opacity: .25}.bg-opacity-50{--bs-bg-opacity: .5}.bg-opacity-75{--bs-bg-opacity: .75}.bg-opacity-100{--bs-bg-opacity: 1}.bg-gradient{background-image:var(--bs-gradient)!important}.user-select-all{-webkit-user-select:all!important;-moz-user-select:all!important;user-select:all!important}.user-select-auto{-webkit-user-select:auto!important;-moz-user-select:auto!important;user-select:auto!important}.user-select-none{-webkit-user-select:none!important;-moz-user-select:none!important;user-select:none!important}.pe-none{pointer-events:none!important}.pe-auto{pointer-events:auto!important}.rounded{border-radius:var(--bs-border-radius)!important}.rounded-0{border-radius:0!important}.rounded-1{border-radius:var(--bs-border-radius-sm)!important}.rounded-2{border-radius:var(--bs-border-radius)!important}.rounded-3{border-radius:var(--bs-border-radius-lg)!important}.rounded-4{border-radius:var(--bs-border-radius-xl)!important}.rounded-5{border-radius:var(--bs-border-radius-2xl)!important}.rounded-circle{border-radius:50%!important}.rounded-pill{border-radius:var(--bs-border-radius-pill)!important}.rounded-top{border-top-left-radius:var(--bs-border-radius)!important;border-top-right-radius:var(--bs-border-radius)!important}.rounded-end{border-top-right-radius:var(--bs-border-radius)!important;border-bottom-right-radius:var(--bs-border-radius)!important}.rounded-bottom{border-bottom-right-radius:var(--bs-border-radius)!important;border-bottom-left-radius:var(--bs-border-radius)!important}.rounded-start{border-bottom-left-radius:var(--bs-border-radius)!important;border-top-left-radius:var(--bs-border-radius)!important}.visible{visibility:visible!important}.invisible{visibility:hidden!important}@media (min-width: 576px){.float-sm-start{float:left!important}.float-sm-end{float:right!important}.float-sm-none{float:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-grid{display:grid!important}.d-sm-table{display:table!important}.d-sm-table-row{display:table-row!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:flex!important}.d-sm-inline-flex{display:inline-flex!important}.d-sm-none{display:none!important}.flex-sm-fill{flex:1 1 auto!important}.flex-sm-row{flex-direction:row!important}.flex-sm-column{flex-direction:column!important}.flex-sm-row-reverse{flex-direction:row-reverse!important}.flex-sm-column-reverse{flex-direction:column-reverse!important}.flex-sm-grow-0{flex-grow:0!important}.flex-sm-grow-1{flex-grow:1!important}.flex-sm-shrink-0{flex-shrink:0!important}.flex-sm-shrink-1{flex-shrink:1!important}.flex-sm-wrap{flex-wrap:wrap!important}.flex-sm-nowrap{flex-wrap:nowrap!important}.flex-sm-wrap-reverse{flex-wrap:wrap-reverse!important}.justify-content-sm-start{justify-content:flex-start!important}.justify-content-sm-end{justify-content:flex-end!important}.justify-content-sm-center{justify-content:center!important}.justify-content-sm-between{justify-content:space-between!important}.justify-content-sm-around{justify-content:space-around!important}.justify-content-sm-evenly{justify-content:space-evenly!important}.align-items-sm-start{align-items:flex-start!important}.align-items-sm-end{align-items:flex-end!important}.align-items-sm-center{align-items:center!important}.align-items-sm-baseline{align-items:baseline!important}.align-items-sm-stretch{align-items:stretch!important}.align-content-sm-start{align-content:flex-start!important}.align-content-sm-end{align-content:flex-end!important}.align-content-sm-center{align-content:center!important}.align-content-sm-between{align-content:space-between!important}.align-content-sm-around{align-content:space-around!important}.align-content-sm-stretch{align-content:stretch!important}.align-self-sm-auto{align-self:auto!important}.align-self-sm-start{align-self:flex-start!important}.align-self-sm-end{align-self:flex-end!important}.align-self-sm-center{align-self:center!important}.align-self-sm-baseline{align-self:baseline!important}.align-self-sm-stretch{align-self:stretch!important}.order-sm-first{order:-1!important}.order-sm-0{order:0!important}.order-sm-1{order:1!important}.order-sm-2{order:2!important}.order-sm-3{order:3!important}.order-sm-4{order:4!important}.order-sm-5{order:5!important}.order-sm-last{order:6!important}.m-sm-0{margin:0!important}.m-sm-1{margin:.25rem!important}.m-sm-2{margin:.5rem!important}.m-sm-3{margin:1rem!important}.m-sm-4{margin:1.5rem!important}.m-sm-5{margin:3rem!important}.m-sm-auto{margin:auto!important}.mx-sm-0{margin-right:0!important;margin-left:0!important}.mx-sm-1{margin-right:.25rem!important;margin-left:.25rem!important}.mx-sm-2{margin-right:.5rem!important;margin-left:.5rem!important}.mx-sm-3{margin-right:1rem!important;margin-left:1rem!important}.mx-sm-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.mx-sm-5{margin-right:3rem!important;margin-left:3rem!important}.mx-sm-auto{margin-right:auto!important;margin-left:auto!important}.my-sm-0{margin-top:0!important;margin-bottom:0!important}.my-sm-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.my-sm-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.my-sm-3{margin-top:1rem!important;margin-bottom:1rem!important}.my-sm-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.my-sm-5{margin-top:3rem!important;margin-bottom:3rem!important}.my-sm-auto{margin-top:auto!important;margin-bottom:auto!important}.mt-sm-0{margin-top:0!important}.mt-sm-1{margin-top:.25rem!important}.mt-sm-2{margin-top:.5rem!important}.mt-sm-3{margin-top:1rem!important}.mt-sm-4{margin-top:1.5rem!important}.mt-sm-5{margin-top:3rem!important}.mt-sm-auto{margin-top:auto!important}.me-sm-0{margin-right:0!important}.me-sm-1{margin-right:.25rem!important}.me-sm-2{margin-right:.5rem!important}.me-sm-3{margin-right:1rem!important}.me-sm-4{margin-right:1.5rem!important}.me-sm-5{margin-right:3rem!important}.me-sm-auto{margin-right:auto!important}.mb-sm-0{margin-bottom:0!important}.mb-sm-1{margin-bottom:.25rem!important}.mb-sm-2{margin-bottom:.5rem!important}.mb-sm-3{margin-bottom:1rem!important}.mb-sm-4{margin-bottom:1.5rem!important}.mb-sm-5{margin-bottom:3rem!important}.mb-sm-auto{margin-bottom:auto!important}.ms-sm-0{margin-left:0!important}.ms-sm-1{margin-left:.25rem!important}.ms-sm-2{margin-left:.5rem!important}.ms-sm-3{margin-left:1rem!important}.ms-sm-4{margin-left:1.5rem!important}.ms-sm-5{margin-left:3rem!important}.ms-sm-auto{margin-left:auto!important}.p-sm-0{padding:0!important}.p-sm-1{padding:.25rem!important}.p-sm-2{padding:.5rem!important}.p-sm-3{padding:1rem!important}.p-sm-4{padding:1.5rem!important}.p-sm-5{padding:3rem!important}.px-sm-0{padding-right:0!important;padding-left:0!important}.px-sm-1{padding-right:.25rem!important;padding-left:.25rem!important}.px-sm-2{padding-right:.5rem!important;padding-left:.5rem!important}.px-sm-3{padding-right:1rem!important;padding-left:1rem!important}.px-sm-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.px-sm-5{padding-right:3rem!important;padding-left:3rem!important}.py-sm-0{padding-top:0!important;padding-bottom:0!important}.py-sm-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.py-sm-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.py-sm-3{padding-top:1rem!important;padding-bottom:1rem!important}.py-sm-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.py-sm-5{padding-top:3rem!important;padding-bottom:3rem!important}.pt-sm-0{padding-top:0!important}.pt-sm-1{padding-top:.25rem!important}.pt-sm-2{padding-top:.5rem!important}.pt-sm-3{padding-top:1rem!important}.pt-sm-4{padding-top:1.5rem!important}.pt-sm-5{padding-top:3rem!important}.pe-sm-0{padding-right:0!important}.pe-sm-1{padding-right:.25rem!important}.pe-sm-2{padding-right:.5rem!important}.pe-sm-3{padding-right:1rem!important}.pe-sm-4{padding-right:1.5rem!important}.pe-sm-5{padding-right:3rem!important}.pb-sm-0{padding-bottom:0!important}.pb-sm-1{padding-bottom:.25rem!important}.pb-sm-2{padding-bottom:.5rem!important}.pb-sm-3{padding-bottom:1rem!important}.pb-sm-4{padding-bottom:1.5rem!important}.pb-sm-5{padding-bottom:3rem!important}.ps-sm-0{padding-left:0!important}.ps-sm-1{padding-left:.25rem!important}.ps-sm-2{padding-left:.5rem!important}.ps-sm-3{padding-left:1rem!important}.ps-sm-4{padding-left:1.5rem!important}.ps-sm-5{padding-left:3rem!important}.gap-sm-0{gap:0!important}.gap-sm-1{gap:.25rem!important}.gap-sm-2{gap:.5rem!important}.gap-sm-3{gap:1rem!important}.gap-sm-4{gap:1.5rem!important}.gap-sm-5{gap:3rem!important}.text-sm-start{text-align:left!important}.text-sm-end{text-align:right!important}.text-sm-center{text-align:center!important}}@media (min-width: 768px){.float-md-start{float:left!important}.float-md-end{float:right!important}.float-md-none{float:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-grid{display:grid!important}.d-md-table{display:table!important}.d-md-table-row{display:table-row!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:flex!important}.d-md-inline-flex{display:inline-flex!important}.d-md-none{display:none!important}.flex-md-fill{flex:1 1 auto!important}.flex-md-row{flex-direction:row!important}.flex-md-column{flex-direction:column!important}.flex-md-row-reverse{flex-direction:row-reverse!important}.flex-md-column-reverse{flex-direction:column-reverse!important}.flex-md-grow-0{flex-grow:0!important}.flex-md-grow-1{flex-grow:1!important}.flex-md-shrink-0{flex-shrink:0!important}.flex-md-shrink-1{flex-shrink:1!important}.flex-md-wrap{flex-wrap:wrap!important}.flex-md-nowrap{flex-wrap:nowrap!important}.flex-md-wrap-reverse{flex-wrap:wrap-reverse!important}.justify-content-md-start{justify-content:flex-start!important}.justify-content-md-end{justify-content:flex-end!important}.justify-content-md-center{justify-content:center!important}.justify-content-md-between{justify-content:space-between!important}.justify-content-md-around{justify-content:space-around!important}.justify-content-md-evenly{justify-content:space-evenly!important}.align-items-md-start{align-items:flex-start!important}.align-items-md-end{align-items:flex-end!important}.align-items-md-center{align-items:center!important}.align-items-md-baseline{align-items:baseline!important}.align-items-md-stretch{align-items:stretch!important}.align-content-md-start{align-content:flex-start!important}.align-content-md-end{align-content:flex-end!important}.align-content-md-center{align-content:center!important}.align-content-md-between{align-content:space-between!important}.align-content-md-around{align-content:space-around!important}.align-content-md-stretch{align-content:stretch!important}.align-self-md-auto{align-self:auto!important}.align-self-md-start{align-self:flex-start!important}.align-self-md-end{align-self:flex-end!important}.align-self-md-center{align-self:center!important}.align-self-md-baseline{align-self:baseline!important}.align-self-md-stretch{align-self:stretch!important}.order-md-first{order:-1!important}.order-md-0{order:0!important}.order-md-1{order:1!important}.order-md-2{order:2!important}.order-md-3{order:3!important}.order-md-4{order:4!important}.order-md-5{order:5!important}.order-md-last{order:6!important}.m-md-0{margin:0!important}.m-md-1{margin:.25rem!important}.m-md-2{margin:.5rem!important}.m-md-3{margin:1rem!important}.m-md-4{margin:1.5rem!important}.m-md-5{margin:3rem!important}.m-md-auto{margin:auto!important}.mx-md-0{margin-right:0!important;margin-left:0!important}.mx-md-1{margin-right:.25rem!important;margin-left:.25rem!important}.mx-md-2{margin-right:.5rem!important;margin-left:.5rem!important}.mx-md-3{margin-right:1rem!important;margin-left:1rem!important}.mx-md-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.mx-md-5{margin-right:3rem!important;margin-left:3rem!important}.mx-md-auto{margin-right:auto!important;margin-left:auto!important}.my-md-0{margin-top:0!important;margin-bottom:0!important}.my-md-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.my-md-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.my-md-3{margin-top:1rem!important;margin-bottom:1rem!important}.my-md-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.my-md-5{margin-top:3rem!important;margin-bottom:3rem!important}.my-md-auto{margin-top:auto!important;margin-bottom:auto!important}.mt-md-0{margin-top:0!important}.mt-md-1{margin-top:.25rem!important}.mt-md-2{margin-top:.5rem!important}.mt-md-3{margin-top:1rem!important}.mt-md-4{margin-top:1.5rem!important}.mt-md-5{margin-top:3rem!important}.mt-md-auto{margin-top:auto!important}.me-md-0{margin-right:0!important}.me-md-1{margin-right:.25rem!important}.me-md-2{margin-right:.5rem!important}.me-md-3{margin-right:1rem!important}.me-md-4{margin-right:1.5rem!important}.me-md-5{margin-right:3rem!important}.me-md-auto{margin-right:auto!important}.mb-md-0{margin-bottom:0!important}.mb-md-1{margin-bottom:.25rem!important}.mb-md-2{margin-bottom:.5rem!important}.mb-md-3{margin-bottom:1rem!important}.mb-md-4{margin-bottom:1.5rem!important}.mb-md-5{margin-bottom:3rem!important}.mb-md-auto{margin-bottom:auto!important}.ms-md-0{margin-left:0!important}.ms-md-1{margin-left:.25rem!important}.ms-md-2{margin-left:.5rem!important}.ms-md-3{margin-left:1rem!important}.ms-md-4{margin-left:1.5rem!important}.ms-md-5{margin-left:3rem!important}.ms-md-auto{margin-left:auto!important}.p-md-0{padding:0!important}.p-md-1{padding:.25rem!important}.p-md-2{padding:.5rem!important}.p-md-3{padding:1rem!important}.p-md-4{padding:1.5rem!important}.p-md-5{padding:3rem!important}.px-md-0{padding-right:0!important;padding-left:0!important}.px-md-1{padding-right:.25rem!important;padding-left:.25rem!important}.px-md-2{padding-right:.5rem!important;padding-left:.5rem!important}.px-md-3{padding-right:1rem!important;padding-left:1rem!important}.px-md-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.px-md-5{padding-right:3rem!important;padding-left:3rem!important}.py-md-0{padding-top:0!important;padding-bottom:0!important}.py-md-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.py-md-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.py-md-3{padding-top:1rem!important;padding-bottom:1rem!important}.py-md-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.py-md-5{padding-top:3rem!important;padding-bottom:3rem!important}.pt-md-0{padding-top:0!important}.pt-md-1{padding-top:.25rem!important}.pt-md-2{padding-top:.5rem!important}.pt-md-3{padding-top:1rem!important}.pt-md-4{padding-top:1.5rem!important}.pt-md-5{padding-top:3rem!important}.pe-md-0{padding-right:0!important}.pe-md-1{padding-right:.25rem!important}.pe-md-2{padding-right:.5rem!important}.pe-md-3{padding-right:1rem!important}.pe-md-4{padding-right:1.5rem!important}.pe-md-5{padding-right:3rem!important}.pb-md-0{padding-bottom:0!important}.pb-md-1{padding-bottom:.25rem!important}.pb-md-2{padding-bottom:.5rem!important}.pb-md-3{padding-bottom:1rem!important}.pb-md-4{padding-bottom:1.5rem!important}.pb-md-5{padding-bottom:3rem!important}.ps-md-0{padding-left:0!important}.ps-md-1{padding-left:.25rem!important}.ps-md-2{padding-left:.5rem!important}.ps-md-3{padding-left:1rem!important}.ps-md-4{padding-left:1.5rem!important}.ps-md-5{padding-left:3rem!important}.gap-md-0{gap:0!important}.gap-md-1{gap:.25rem!important}.gap-md-2{gap:.5rem!important}.gap-md-3{gap:1rem!important}.gap-md-4{gap:1.5rem!important}.gap-md-5{gap:3rem!important}.text-md-start{text-align:left!important}.text-md-end{text-align:right!important}.text-md-center{text-align:center!important}}@media (min-width: 992px){.float-lg-start{float:left!important}.float-lg-end{float:right!important}.float-lg-none{float:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-grid{display:grid!important}.d-lg-table{display:table!important}.d-lg-table-row{display:table-row!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:flex!important}.d-lg-inline-flex{display:inline-flex!important}.d-lg-none{display:none!important}.flex-lg-fill{flex:1 1 auto!important}.flex-lg-row{flex-direction:row!important}.flex-lg-column{flex-direction:column!important}.flex-lg-row-reverse{flex-direction:row-reverse!important}.flex-lg-column-reverse{flex-direction:column-reverse!important}.flex-lg-grow-0{flex-grow:0!important}.flex-lg-grow-1{flex-grow:1!important}.flex-lg-shrink-0{flex-shrink:0!important}.flex-lg-shrink-1{flex-shrink:1!important}.flex-lg-wrap{flex-wrap:wrap!important}.flex-lg-nowrap{flex-wrap:nowrap!important}.flex-lg-wrap-reverse{flex-wrap:wrap-reverse!important}.justify-content-lg-start{justify-content:flex-start!important}.justify-content-lg-end{justify-content:flex-end!important}.justify-content-lg-center{justify-content:center!important}.justify-content-lg-between{justify-content:space-between!important}.justify-content-lg-around{justify-content:space-around!important}.justify-content-lg-evenly{justify-content:space-evenly!important}.align-items-lg-start{align-items:flex-start!important}.align-items-lg-end{align-items:flex-end!important}.align-items-lg-center{align-items:center!important}.align-items-lg-baseline{align-items:baseline!important}.align-items-lg-stretch{align-items:stretch!important}.align-content-lg-start{align-content:flex-start!important}.align-content-lg-end{align-content:flex-end!important}.align-content-lg-center{align-content:center!important}.align-content-lg-between{align-content:space-between!important}.align-content-lg-around{align-content:space-around!important}.align-content-lg-stretch{align-content:stretch!important}.align-self-lg-auto{align-self:auto!important}.align-self-lg-start{align-self:flex-start!important}.align-self-lg-end{align-self:flex-end!important}.align-self-lg-center{align-self:center!important}.align-self-lg-baseline{align-self:baseline!important}.align-self-lg-stretch{align-self:stretch!important}.order-lg-first{order:-1!important}.order-lg-0{order:0!important}.order-lg-1{order:1!important}.order-lg-2{order:2!important}.order-lg-3{order:3!important}.order-lg-4{order:4!important}.order-lg-5{order:5!important}.order-lg-last{order:6!important}.m-lg-0{margin:0!important}.m-lg-1{margin:.25rem!important}.m-lg-2{margin:.5rem!important}.m-lg-3{margin:1rem!important}.m-lg-4{margin:1.5rem!important}.m-lg-5{margin:3rem!important}.m-lg-auto{margin:auto!important}.mx-lg-0{margin-right:0!important;margin-left:0!important}.mx-lg-1{margin-right:.25rem!important;margin-left:.25rem!important}.mx-lg-2{margin-right:.5rem!important;margin-left:.5rem!important}.mx-lg-3{margin-right:1rem!important;margin-left:1rem!important}.mx-lg-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.mx-lg-5{margin-right:3rem!important;margin-left:3rem!important}.mx-lg-auto{margin-right:auto!important;margin-left:auto!important}.my-lg-0{margin-top:0!important;margin-bottom:0!important}.my-lg-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.my-lg-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.my-lg-3{margin-top:1rem!important;margin-bottom:1rem!important}.my-lg-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.my-lg-5{margin-top:3rem!important;margin-bottom:3rem!important}.my-lg-auto{margin-top:auto!important;margin-bottom:auto!important}.mt-lg-0{margin-top:0!important}.mt-lg-1{margin-top:.25rem!important}.mt-lg-2{margin-top:.5rem!important}.mt-lg-3{margin-top:1rem!important}.mt-lg-4{margin-top:1.5rem!important}.mt-lg-5{margin-top:3rem!important}.mt-lg-auto{margin-top:auto!important}.me-lg-0{margin-right:0!important}.me-lg-1{margin-right:.25rem!important}.me-lg-2{margin-right:.5rem!important}.me-lg-3{margin-right:1rem!important}.me-lg-4{margin-right:1.5rem!important}.me-lg-5{margin-right:3rem!important}.me-lg-auto{margin-right:auto!important}.mb-lg-0{margin-bottom:0!important}.mb-lg-1{margin-bottom:.25rem!important}.mb-lg-2{margin-bottom:.5rem!important}.mb-lg-3{margin-bottom:1rem!important}.mb-lg-4{margin-bottom:1.5rem!important}.mb-lg-5{margin-bottom:3rem!important}.mb-lg-auto{margin-bottom:auto!important}.ms-lg-0{margin-left:0!important}.ms-lg-1{margin-left:.25rem!important}.ms-lg-2{margin-left:.5rem!important}.ms-lg-3{margin-left:1rem!important}.ms-lg-4{margin-left:1.5rem!important}.ms-lg-5{margin-left:3rem!important}.ms-lg-auto{margin-left:auto!important}.p-lg-0{padding:0!important}.p-lg-1{padding:.25rem!important}.p-lg-2{padding:.5rem!important}.p-lg-3{padding:1rem!important}.p-lg-4{padding:1.5rem!important}.p-lg-5{padding:3rem!important}.px-lg-0{padding-right:0!important;padding-left:0!important}.px-lg-1{padding-right:.25rem!important;padding-left:.25rem!important}.px-lg-2{padding-right:.5rem!important;padding-left:.5rem!important}.px-lg-3{padding-right:1rem!important;padding-left:1rem!important}.px-lg-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.px-lg-5{padding-right:3rem!important;padding-left:3rem!important}.py-lg-0{padding-top:0!important;padding-bottom:0!important}.py-lg-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.py-lg-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.py-lg-3{padding-top:1rem!important;padding-bottom:1rem!important}.py-lg-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.py-lg-5{padding-top:3rem!important;padding-bottom:3rem!important}.pt-lg-0{padding-top:0!important}.pt-lg-1{padding-top:.25rem!important}.pt-lg-2{padding-top:.5rem!important}.pt-lg-3{padding-top:1rem!important}.pt-lg-4{padding-top:1.5rem!important}.pt-lg-5{padding-top:3rem!important}.pe-lg-0{padding-right:0!important}.pe-lg-1{padding-right:.25rem!important}.pe-lg-2{padding-right:.5rem!important}.pe-lg-3{padding-right:1rem!important}.pe-lg-4{padding-right:1.5rem!important}.pe-lg-5{padding-right:3rem!important}.pb-lg-0{padding-bottom:0!important}.pb-lg-1{padding-bottom:.25rem!important}.pb-lg-2{padding-bottom:.5rem!important}.pb-lg-3{padding-bottom:1rem!important}.pb-lg-4{padding-bottom:1.5rem!important}.pb-lg-5{padding-bottom:3rem!important}.ps-lg-0{padding-left:0!important}.ps-lg-1{padding-left:.25rem!important}.ps-lg-2{padding-left:.5rem!important}.ps-lg-3{padding-left:1rem!important}.ps-lg-4{padding-left:1.5rem!important}.ps-lg-5{padding-left:3rem!important}.gap-lg-0{gap:0!important}.gap-lg-1{gap:.25rem!important}.gap-lg-2{gap:.5rem!important}.gap-lg-3{gap:1rem!important}.gap-lg-4{gap:1.5rem!important}.gap-lg-5{gap:3rem!important}.text-lg-start{text-align:left!important}.text-lg-end{text-align:right!important}.text-lg-center{text-align:center!important}}@media (min-width: 1200px){.float-xl-start{float:left!important}.float-xl-end{float:right!important}.float-xl-none{float:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-grid{display:grid!important}.d-xl-table{display:table!important}.d-xl-table-row{display:table-row!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:flex!important}.d-xl-inline-flex{display:inline-flex!important}.d-xl-none{display:none!important}.flex-xl-fill{flex:1 1 auto!important}.flex-xl-row{flex-direction:row!important}.flex-xl-column{flex-direction:column!important}.flex-xl-row-reverse{flex-direction:row-reverse!important}.flex-xl-column-reverse{flex-direction:column-reverse!important}.flex-xl-grow-0{flex-grow:0!important}.flex-xl-grow-1{flex-grow:1!important}.flex-xl-shrink-0{flex-shrink:0!important}.flex-xl-shrink-1{flex-shrink:1!important}.flex-xl-wrap{flex-wrap:wrap!important}.flex-xl-nowrap{flex-wrap:nowrap!important}.flex-xl-wrap-reverse{flex-wrap:wrap-reverse!important}.justify-content-xl-start{justify-content:flex-start!important}.justify-content-xl-end{justify-content:flex-end!important}.justify-content-xl-center{justify-content:center!important}.justify-content-xl-between{justify-content:space-between!important}.justify-content-xl-around{justify-content:space-around!important}.justify-content-xl-evenly{justify-content:space-evenly!important}.align-items-xl-start{align-items:flex-start!important}.align-items-xl-end{align-items:flex-end!important}.align-items-xl-center{align-items:center!important}.align-items-xl-baseline{align-items:baseline!important}.align-items-xl-stretch{align-items:stretch!important}.align-content-xl-start{align-content:flex-start!important}.align-content-xl-end{align-content:flex-end!important}.align-content-xl-center{align-content:center!important}.align-content-xl-between{align-content:space-between!important}.align-content-xl-around{align-content:space-around!important}.align-content-xl-stretch{align-content:stretch!important}.align-self-xl-auto{align-self:auto!important}.align-self-xl-start{align-self:flex-start!important}.align-self-xl-end{align-self:flex-end!important}.align-self-xl-center{align-self:center!important}.align-self-xl-baseline{align-self:baseline!important}.align-self-xl-stretch{align-self:stretch!important}.order-xl-first{order:-1!important}.order-xl-0{order:0!important}.order-xl-1{order:1!important}.order-xl-2{order:2!important}.order-xl-3{order:3!important}.order-xl-4{order:4!important}.order-xl-5{order:5!important}.order-xl-last{order:6!important}.m-xl-0{margin:0!important}.m-xl-1{margin:.25rem!important}.m-xl-2{margin:.5rem!important}.m-xl-3{margin:1rem!important}.m-xl-4{margin:1.5rem!important}.m-xl-5{margin:3rem!important}.m-xl-auto{margin:auto!important}.mx-xl-0{margin-right:0!important;margin-left:0!important}.mx-xl-1{margin-right:.25rem!important;margin-left:.25rem!important}.mx-xl-2{margin-right:.5rem!important;margin-left:.5rem!important}.mx-xl-3{margin-right:1rem!important;margin-left:1rem!important}.mx-xl-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.mx-xl-5{margin-right:3rem!important;margin-left:3rem!important}.mx-xl-auto{margin-right:auto!important;margin-left:auto!important}.my-xl-0{margin-top:0!important;margin-bottom:0!important}.my-xl-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.my-xl-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.my-xl-3{margin-top:1rem!important;margin-bottom:1rem!important}.my-xl-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.my-xl-5{margin-top:3rem!important;margin-bottom:3rem!important}.my-xl-auto{margin-top:auto!important;margin-bottom:auto!important}.mt-xl-0{margin-top:0!important}.mt-xl-1{margin-top:.25rem!important}.mt-xl-2{margin-top:.5rem!important}.mt-xl-3{margin-top:1rem!important}.mt-xl-4{margin-top:1.5rem!important}.mt-xl-5{margin-top:3rem!important}.mt-xl-auto{margin-top:auto!important}.me-xl-0{margin-right:0!important}.me-xl-1{margin-right:.25rem!important}.me-xl-2{margin-right:.5rem!important}.me-xl-3{margin-right:1rem!important}.me-xl-4{margin-right:1.5rem!important}.me-xl-5{margin-right:3rem!important}.me-xl-auto{margin-right:auto!important}.mb-xl-0{margin-bottom:0!important}.mb-xl-1{margin-bottom:.25rem!important}.mb-xl-2{margin-bottom:.5rem!important}.mb-xl-3{margin-bottom:1rem!important}.mb-xl-4{margin-bottom:1.5rem!important}.mb-xl-5{margin-bottom:3rem!important}.mb-xl-auto{margin-bottom:auto!important}.ms-xl-0{margin-left:0!important}.ms-xl-1{margin-left:.25rem!important}.ms-xl-2{margin-left:.5rem!important}.ms-xl-3{margin-left:1rem!important}.ms-xl-4{margin-left:1.5rem!important}.ms-xl-5{margin-left:3rem!important}.ms-xl-auto{margin-left:auto!important}.p-xl-0{padding:0!important}.p-xl-1{padding:.25rem!important}.p-xl-2{padding:.5rem!important}.p-xl-3{padding:1rem!important}.p-xl-4{padding:1.5rem!important}.p-xl-5{padding:3rem!important}.px-xl-0{padding-right:0!important;padding-left:0!important}.px-xl-1{padding-right:.25rem!important;padding-left:.25rem!important}.px-xl-2{padding-right:.5rem!important;padding-left:.5rem!important}.px-xl-3{padding-right:1rem!important;padding-left:1rem!important}.px-xl-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.px-xl-5{padding-right:3rem!important;padding-left:3rem!important}.py-xl-0{padding-top:0!important;padding-bottom:0!important}.py-xl-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.py-xl-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.py-xl-3{padding-top:1rem!important;padding-bottom:1rem!important}.py-xl-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.py-xl-5{padding-top:3rem!important;padding-bottom:3rem!important}.pt-xl-0{padding-top:0!important}.pt-xl-1{padding-top:.25rem!important}.pt-xl-2{padding-top:.5rem!important}.pt-xl-3{padding-top:1rem!important}.pt-xl-4{padding-top:1.5rem!important}.pt-xl-5{padding-top:3rem!important}.pe-xl-0{padding-right:0!important}.pe-xl-1{padding-right:.25rem!important}.pe-xl-2{padding-right:.5rem!important}.pe-xl-3{padding-right:1rem!important}.pe-xl-4{padding-right:1.5rem!important}.pe-xl-5{padding-right:3rem!important}.pb-xl-0{padding-bottom:0!important}.pb-xl-1{padding-bottom:.25rem!important}.pb-xl-2{padding-bottom:.5rem!important}.pb-xl-3{padding-bottom:1rem!important}.pb-xl-4{padding-bottom:1.5rem!important}.pb-xl-5{padding-bottom:3rem!important}.ps-xl-0{padding-left:0!important}.ps-xl-1{padding-left:.25rem!important}.ps-xl-2{padding-left:.5rem!important}.ps-xl-3{padding-left:1rem!important}.ps-xl-4{padding-left:1.5rem!important}.ps-xl-5{padding-left:3rem!important}.gap-xl-0{gap:0!important}.gap-xl-1{gap:.25rem!important}.gap-xl-2{gap:.5rem!important}.gap-xl-3{gap:1rem!important}.gap-xl-4{gap:1.5rem!important}.gap-xl-5{gap:3rem!important}.text-xl-start{text-align:left!important}.text-xl-end{text-align:right!important}.text-xl-center{text-align:center!important}}@media (min-width: 1400px){.float-xxl-start{float:left!important}.float-xxl-end{float:right!important}.float-xxl-none{float:none!important}.d-xxl-inline{display:inline!important}.d-xxl-inline-block{display:inline-block!important}.d-xxl-block{display:block!important}.d-xxl-grid{display:grid!important}.d-xxl-table{display:table!important}.d-xxl-table-row{display:table-row!important}.d-xxl-table-cell{display:table-cell!important}.d-xxl-flex{display:flex!important}.d-xxl-inline-flex{display:inline-flex!important}.d-xxl-none{display:none!important}.flex-xxl-fill{flex:1 1 auto!important}.flex-xxl-row{flex-direction:row!important}.flex-xxl-column{flex-direction:column!important}.flex-xxl-row-reverse{flex-direction:row-reverse!important}.flex-xxl-column-reverse{flex-direction:column-reverse!important}.flex-xxl-grow-0{flex-grow:0!important}.flex-xxl-grow-1{flex-grow:1!important}.flex-xxl-shrink-0{flex-shrink:0!important}.flex-xxl-shrink-1{flex-shrink:1!important}.flex-xxl-wrap{flex-wrap:wrap!important}.flex-xxl-nowrap{flex-wrap:nowrap!important}.flex-xxl-wrap-reverse{flex-wrap:wrap-reverse!important}.justify-content-xxl-start{justify-content:flex-start!important}.justify-content-xxl-end{justify-content:flex-end!important}.justify-content-xxl-center{justify-content:center!important}.justify-content-xxl-between{justify-content:space-between!important}.justify-content-xxl-around{justify-content:space-around!important}.justify-content-xxl-evenly{justify-content:space-evenly!important}.align-items-xxl-start{align-items:flex-start!important}.align-items-xxl-end{align-items:flex-end!important}.align-items-xxl-center{align-items:center!important}.align-items-xxl-baseline{align-items:baseline!important}.align-items-xxl-stretch{align-items:stretch!important}.align-content-xxl-start{align-content:flex-start!important}.align-content-xxl-end{align-content:flex-end!important}.align-content-xxl-center{align-content:center!important}.align-content-xxl-between{align-content:space-between!important}.align-content-xxl-around{align-content:space-around!important}.align-content-xxl-stretch{align-content:stretch!important}.align-self-xxl-auto{align-self:auto!important}.align-self-xxl-start{align-self:flex-start!important}.align-self-xxl-end{align-self:flex-end!important}.align-self-xxl-center{align-self:center!important}.align-self-xxl-baseline{align-self:baseline!important}.align-self-xxl-stretch{align-self:stretch!important}.order-xxl-first{order:-1!important}.order-xxl-0{order:0!important}.order-xxl-1{order:1!important}.order-xxl-2{order:2!important}.order-xxl-3{order:3!important}.order-xxl-4{order:4!important}.order-xxl-5{order:5!important}.order-xxl-last{order:6!important}.m-xxl-0{margin:0!important}.m-xxl-1{margin:.25rem!important}.m-xxl-2{margin:.5rem!important}.m-xxl-3{margin:1rem!important}.m-xxl-4{margin:1.5rem!important}.m-xxl-5{margin:3rem!important}.m-xxl-auto{margin:auto!important}.mx-xxl-0{margin-right:0!important;margin-left:0!important}.mx-xxl-1{margin-right:.25rem!important;margin-left:.25rem!important}.mx-xxl-2{margin-right:.5rem!important;margin-left:.5rem!important}.mx-xxl-3{margin-right:1rem!important;margin-left:1rem!important}.mx-xxl-4{margin-right:1.5rem!important;margin-left:1.5rem!important}.mx-xxl-5{margin-right:3rem!important;margin-left:3rem!important}.mx-xxl-auto{margin-right:auto!important;margin-left:auto!important}.my-xxl-0{margin-top:0!important;margin-bottom:0!important}.my-xxl-1{margin-top:.25rem!important;margin-bottom:.25rem!important}.my-xxl-2{margin-top:.5rem!important;margin-bottom:.5rem!important}.my-xxl-3{margin-top:1rem!important;margin-bottom:1rem!important}.my-xxl-4{margin-top:1.5rem!important;margin-bottom:1.5rem!important}.my-xxl-5{margin-top:3rem!important;margin-bottom:3rem!important}.my-xxl-auto{margin-top:auto!important;margin-bottom:auto!important}.mt-xxl-0{margin-top:0!important}.mt-xxl-1{margin-top:.25rem!important}.mt-xxl-2{margin-top:.5rem!important}.mt-xxl-3{margin-top:1rem!important}.mt-xxl-4{margin-top:1.5rem!important}.mt-xxl-5{margin-top:3rem!important}.mt-xxl-auto{margin-top:auto!important}.me-xxl-0{margin-right:0!important}.me-xxl-1{margin-right:.25rem!important}.me-xxl-2{margin-right:.5rem!important}.me-xxl-3{margin-right:1rem!important}.me-xxl-4{margin-right:1.5rem!important}.me-xxl-5{margin-right:3rem!important}.me-xxl-auto{margin-right:auto!important}.mb-xxl-0{margin-bottom:0!important}.mb-xxl-1{margin-bottom:.25rem!important}.mb-xxl-2{margin-bottom:.5rem!important}.mb-xxl-3{margin-bottom:1rem!important}.mb-xxl-4{margin-bottom:1.5rem!important}.mb-xxl-5{margin-bottom:3rem!important}.mb-xxl-auto{margin-bottom:auto!important}.ms-xxl-0{margin-left:0!important}.ms-xxl-1{margin-left:.25rem!important}.ms-xxl-2{margin-left:.5rem!important}.ms-xxl-3{margin-left:1rem!important}.ms-xxl-4{margin-left:1.5rem!important}.ms-xxl-5{margin-left:3rem!important}.ms-xxl-auto{margin-left:auto!important}.p-xxl-0{padding:0!important}.p-xxl-1{padding:.25rem!important}.p-xxl-2{padding:.5rem!important}.p-xxl-3{padding:1rem!important}.p-xxl-4{padding:1.5rem!important}.p-xxl-5{padding:3rem!important}.px-xxl-0{padding-right:0!important;padding-left:0!important}.px-xxl-1{padding-right:.25rem!important;padding-left:.25rem!important}.px-xxl-2{padding-right:.5rem!important;padding-left:.5rem!important}.px-xxl-3{padding-right:1rem!important;padding-left:1rem!important}.px-xxl-4{padding-right:1.5rem!important;padding-left:1.5rem!important}.px-xxl-5{padding-right:3rem!important;padding-left:3rem!important}.py-xxl-0{padding-top:0!important;padding-bottom:0!important}.py-xxl-1{padding-top:.25rem!important;padding-bottom:.25rem!important}.py-xxl-2{padding-top:.5rem!important;padding-bottom:.5rem!important}.py-xxl-3{padding-top:1rem!important;padding-bottom:1rem!important}.py-xxl-4{padding-top:1.5rem!important;padding-bottom:1.5rem!important}.py-xxl-5{padding-top:3rem!important;padding-bottom:3rem!important}.pt-xxl-0{padding-top:0!important}.pt-xxl-1{padding-top:.25rem!important}.pt-xxl-2{padding-top:.5rem!important}.pt-xxl-3{padding-top:1rem!important}.pt-xxl-4{padding-top:1.5rem!important}.pt-xxl-5{padding-top:3rem!important}.pe-xxl-0{padding-right:0!important}.pe-xxl-1{padding-right:.25rem!important}.pe-xxl-2{padding-right:.5rem!important}.pe-xxl-3{padding-right:1rem!important}.pe-xxl-4{padding-right:1.5rem!important}.pe-xxl-5{padding-right:3rem!important}.pb-xxl-0{padding-bottom:0!important}.pb-xxl-1{padding-bottom:.25rem!important}.pb-xxl-2{padding-bottom:.5rem!important}.pb-xxl-3{padding-bottom:1rem!important}.pb-xxl-4{padding-bottom:1.5rem!important}.pb-xxl-5{padding-bottom:3rem!important}.ps-xxl-0{padding-left:0!important}.ps-xxl-1{padding-left:.25rem!important}.ps-xxl-2{padding-left:.5rem!important}.ps-xxl-3{padding-left:1rem!important}.ps-xxl-4{padding-left:1.5rem!important}.ps-xxl-5{padding-left:3rem!important}.gap-xxl-0{gap:0!important}.gap-xxl-1{gap:.25rem!important}.gap-xxl-2{gap:.5rem!important}.gap-xxl-3{gap:1rem!important}.gap-xxl-4{gap:1.5rem!important}.gap-xxl-5{gap:3rem!important}.text-xxl-start{text-align:left!important}.text-xxl-end{text-align:right!important}.text-xxl-center{text-align:center!important}}@media (min-width: 1200px){.fs-1{font-size:2.5rem!important}.fs-2{font-size:2rem!important}.fs-3{font-size:1.75rem!important}.fs-4{font-size:1.5rem!important}}@media print{.d-print-inline{display:inline!important}.d-print-inline-block{display:inline-block!important}.d-print-block{display:block!important}.d-print-grid{display:grid!important}.d-print-table{display:table!important}.d-print-table-row{display:table-row!important}.d-print-table-cell{display:table-cell!important}.d-print-flex{display:flex!important}.d-print-inline-flex{display:inline-flex!important}.d-print-none{display:none!important}}.dialog-wrapper{height:100vh;width:100vw;z-index:200;position:absolute;left:0;display:flex;align-items:center;justify-content:center;top:0;background-color:#21212175;border-color:#212121}.dialog-wrapper .popup-container{background:#FCFDFF;position:relative;overflow-y:auto;height:690px;max-height:690px;width:320px;border-radius:12px;box-shadow:#00000026 0 2px 20px,#0000001a 0 2px 5px;display:flex;flex-direction:column}.dialog-wrapper .popup-container.popup-web{width:629px!important;height:280px!important}@media (resolution: 1.25dppx){.popup-container{transform:scale(1.25)}}@media (resolution: 1dppx){.popup-container{transform:scale(1.5)}}input.form-control:focus,select.form-select:focus{border-color:var(--knit-lightgrey, rgba(32, 32, 32, .5))!important;box-shadow:unset!important}.loading-panel{height:100%}.loading-panel svg{width:60px;height:60px}.full-panel{height:100%;position:relative}.full-panel .rotate{animation:rotate 1.5s linear infinite}@keyframes rotate{to{transform:rotate(360deg)}}.full-panel p{font-size:14px;font-weight:600}.full-panel p:not(:first-of-type){font-size:10px;font-weight:400}.full-panel button{font-size:12px!important;font-weight:600;background-color:var(--knit-primary, #FF6C37)!important;color:#fff;width:198px;border-radius:4px}.full-panel .cta-wrapper{position:absolute;left:50%;transform:translate(-50%);bottom:0}.popup-header{padding-top:4px}.popup-header .chevron-left-svg{width:8px;height:14px}.popup-header .cross-svg{height:12px;width:12px;display:block}.popup-header .back-text{margin-left:6px!important;font-size:10px;font-weight:500}.tryagain-err{align-content:flex-start}.tryagain-err .err-navigation{align-items:center;font-size:12px;color:var(--knit-grey, rgba(32, 32, 32, .7))}.tryagain-err .err-navigation .chevron-left-svg,.tryagain-err .err-navigation .chevron-right-svg{height:14px;width:8px}.tryagain-err .err-header{font-size:14px;font-weight:500;color:var(--knit-black, rgb(32, 32, 32))}.tryagain-err .err-resolution{font-size:12px;color:var(--knit-grey, rgba(32, 32, 32, .7))}.tryagain-err .cross-circle-svg{height:82px;width:82px}.auth-success .check-circle-svg{height:108px;width:108px}.auth-success p{color:var(--knit-black, rgb(32, 32, 32))}.token-err .alert-circle-svg{height:108px;width:108px;color:var(--knit-failure, #FF0000)}.email-sent .email-svg{height:108px!important;width:108px!important;display:block}.popup-footer{padding:10px 34px!important}.popup-footer p{font-size:10px;color:var(--knit-lightgrey, rgba(32, 32, 32, .5))}.popup-footer p a{text-decoration:underline!important;color:inherit}.category-selection-step{padding:4px 32px 10px!important}.category-selection-title{font-size:14px!important;font-weight:500;color:var(--knit-black, rgb(32, 32, 32))}.category-selection-subtitle{font-size:12px!important;font-weight:400;color:var(--knit-grey, rgba(32, 32, 32, .7))}.category-selection-list{margin:12px 0 10px!important}.category-selection-list .category-panel-wrapper{border:1px solid var(--knit-lightgrey, rgba(32, 32, 32, .5));border-radius:2px;padding-top:3px;background:white;margin:10px 0!important}.category-selection-list .category-panel-wrapper .more-text{font-size:10px;font-weight:500;margin-left:auto;margin-top:auto;margin-bottom:12px}.category-selection-list .category-panel-wrapper .integrations-logos{padding:0 12px;align-items:flex-start}.category-selection-list .category-panel-wrapper .integrations-logos img{margin:12px;height:24px;position:relative}.category-selection-list .category-panel-wrapper .integrations-logos img:first-of-type{margin-left:0!important}.category-selection-list .category-panel-title{padding-left:10px;font-size:12px;font-weight:500}.integration-selection-step{padding:0 32px 10px!important;margin-top:6px}.integration-selection-step-header{margin-bottom:8px}.integration-selection-step-header-title{font-size:14px!important;font-weight:500;color:var(--knit-black, rgb(32, 32, 32))}.integration-selection-step-header-subtitle{font-size:12px!important;font-weight:400;color:var(--knit-grey, rgba(32, 32, 32, .7))}.integration-selection-step-search .input-group-text{background:white;border-color:var(--knit-lightgrey, rgba(32, 32, 32, .5));border-right:unset!important}.integration-selection-step-search .input-group-text .search-svg{color:var(--knit-lightgrey, rgba(32, 32, 32, .5))}.integration-selection-step-search input{border-color:var(--knit-lightgrey, rgba(32, 32, 32, .5));border-left:unset!important;font-size:10px}.integration-selection-step-search input:focus{border-color:var(--knit-lightgrey, rgba(32, 32, 32, .5));box-shadow:unset!important}.integration-selection-step .integrations-wrapper{padding-top:6px;height:160px;max-height:160px;overflow:auto}.integration-selection-step .integrations-wrapper .integration-box{height:64px;background:white;width:64px;padding-top:12px;border:.25px solid var(--knit-lightgrey, rgba(32, 32, 32, .5));border-radius:5px;margin:6px;position:relative}.integration-selection-step .integrations-wrapper .integration-box svg{position:absolute;top:2px;right:2px;height:12px;width:12px}.integration-selection-step .integrations-wrapper .integration-box .img-container{display:flex;justify-content:center}.integration-selection-step .integrations-wrapper .integration-box .img-container img{height:24px}.integration-selection-step .integrations-wrapper .integration-box .text-container{height:inherit}.integration-selection-step .integrations-wrapper .integration-box .text-container p{line-height:1;font-size:8px!important}.admin-check-step-header{padding-top:18px;padding-bottom:18px}.admin-check-step-question{padding-top:6px;padding-bottom:6px;font-size:14px;text-align:center;font-weight:600}.admin-check-step-form .form-control{font-size:10px}button.primary{font-size:12px!important;font-weight:600;background-color:var(--knit-primary, #FF6C37)!important;color:#fff;min-width:160px;border-radius:4px;border:1px solid var(--knit-primary, #FF6C37)!important}button.primary-alt{font-size:12px!important;font-weight:600;background-color:#fff!important;color:var(--knit-primary, #FF6C37)!important;min-width:160px;border-radius:4px;border:1px solid var(--knit-primary, #FF6C37)!important}.form-setup-step-header{padding:8px 0}.form-setup-step-header img{height:28px}.form-setup-step form{padding:0 32px!important}.form-setup-step form .form-input-wrapper{width:100%}.form-setup-step form .form-input-wrapper .form-input-header-label{margin:0 0 4px;font-size:12px;font-weight:500}.form-setup-step form .form-input-wrapper .form-input-header-tip{margin:0;font-size:10px;font-weight:400;color:var(--knit-lightgrey, rgba(32, 32, 32, .5));cursor:pointer}.form-setup-step form .form-input-wrapper .form-input-header-tip img{transition:rotate .5s ease}.form-setup-step form .form-input-wrapper .form-input-header-tip.tip-show img{rotate:180deg}.form-setup-step form .form-input-wrapper .form-input-header-description{margin:4px 0;max-height:0;transition:max-height .5s ease-in-out;overflow:hidden;font-size:10px;color:#38495c}.form-setup-step form .form-input-wrapper .form-input-header-description.tip-show{max-height:200px;transition:max-height .5s ease-in-out}.form-setup-step form .form-input-wrapper .form-control,.form-setup-step form .form-input-wrapper .form-select,.form-setup-step form .form-input-wrapper .input-group-text{font-size:10px;border-radius:2px}.form-setup-step form .form-input-wrapper .form-select-option{padding:8px 2px}.form-setup-step form .form-input-wrapper .form-control::placeholder{color:var(--knit-lightgrey, rgba(32, 32, 32, .5))}.form-setup-step form .submit-btn-container button{font-size:12px!important;font-weight:600;background-color:var(--knit-primary, #FF6C37)!important;color:#fff;width:160px;border-radius:4px}.knit-form-ele{padding:1rem .5rem}.knit-form-ele label,knit-form-ele input{width:100%}.knit-form-ele label{font-size:1.1rem}.knit-form-ele input{font-size:1.2rem}.integration-setup-step-header{padding:1rem 0}.integration-setup-title{font-size:2rem;padding:.5rem 0}.integration-setup-logo{display:flex;justify-content:center}.integration-setup-logo img{width:80px}.integration-setup-search{margin:2 rem}.setup-wrapper{min-height:inherit}.none-setup{position:relative}.none-setup .html-content-wrapper{max-height:150px;overflow:auto}.none-setup .html-content-wrapper p{font-size:12px}.none-setup .cta-wrapper{position:absolute;bottom:0;left:50%;transform:translate(-50%)}.w-inherit{width:inherit}.w-50{width:50%}.w-100{width:100%}.h-inherit{height:inherit}.h-50{height:50%}.h-80{height:80%}.h-20{height:20%}.h-100{height:100%}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.align-items-center{align-items:center}.align-content-space{align-content:space-between}.justify-content-center{justify-content:center}.float-right{float:right}.bg-transparent{background:transparent}.color-grey{color:gray!important}.header-btn{background:transparent;color:gray;border:unset;outline:unset;border-radius:5px;padding:.3rem .5rem}.header-btn:hover{background:lightgrey}.divider-h{border:1px solid black;width:100%;margin:.5rem 0}.base-btn{background:transparent;color:#000;border:unset}.cursor-pointer{cursor:pointer}.fixed-bottom{position:absolute;bottom:0}.min-h-inherit{min-height:inherit}.int-step{flex:1}.int-step-parent{flex-direction:column;display:flex}button{padding:9px}.scale150{transform:scale(1.5)}.scale125{transform:scale(1.25)}.info-svg{color:var(--knit-failure, #FF0000)}.loading-svg{color:var(--knit-primary, #FF6C37)}.cross-circle-svg{color:var(--knit-failure, #FF0000)}.check-circle-svg{color:var(--knit-success, #059E05)}.email-svg,.hourglass-svg{color:var(--knit-awaiting, rgb(255, 228, 126))}.cross-svg{color:var(--knit-black, rgb(32, 32, 32))}
`;
var re = { exports: {} };
re.exports = Le;
re.exports.isMobile = Le;
re.exports.default = Le;
const Bo = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, No = /CrOS/, Io = /android|ipad|playbook|silk/i;
function Le(t) {
  t || (t = {});
  let e = t.ua;
  if (!e && typeof navigator < "u" && (e = navigator.userAgent), e && e.headers && typeof e.headers["user-agent"] == "string" && (e = e.headers["user-agent"]), typeof e != "string")
    return !1;
  let r = Bo.test(e) && !No.test(e) || !!t.tablet && Io.test(e);
  return !r && t.tablet && t.featureDetect && navigator && navigator.maxTouchPoints > 1 && e.indexOf("Macintosh") !== -1 && e.indexOf("Safari") !== -1 && (r = !0), r;
}
function Fr(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: Br } = Object.prototype, { getPrototypeOf: Ue } = Object, je = ((t) => (e) => {
  const r = Br.call(e);
  return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), H = (t) => (t = t.toLowerCase(), (e) => je(e) === t), oe = (t) => (e) => typeof e === t, { isArray: bt } = Array, Et = oe("undefined");
function Mo(t) {
  return t !== null && !Et(t) && t.constructor !== null && !Et(t.constructor) && tt(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Nr = H("ArrayBuffer");
function Ho(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Nr(t.buffer), e;
}
const Vo = oe("string"), tt = oe("function"), Ir = oe("number"), Fe = (t) => t !== null && typeof t == "object", qo = (t) => t === !0 || t === !1, Nt = (t) => {
  if (je(t) !== "object")
    return !1;
  const e = Ue(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, Wo = H("Date"), Ko = H("File"), Jo = H("Blob"), Zo = H("FileList"), Go = (t) => Fe(t) && tt(t.pipe), Yo = (t) => {
  const e = "[object FormData]";
  return t && (typeof FormData == "function" && t instanceof FormData || Br.call(t) === e || tt(t.toString) && t.toString() === e);
}, Xo = H("URLSearchParams"), Qo = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Rt(t, e, { allOwnKeys: r = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let o, a;
  if (typeof t != "object" && (t = [t]), bt(t))
    for (o = 0, a = t.length; o < a; o++)
      e.call(null, t[o], o, t);
  else {
    const i = r ? Object.getOwnPropertyNames(t) : Object.keys(t), n = i.length;
    let s;
    for (o = 0; o < n; o++)
      s = i[o], e.call(null, t[s], s, t);
  }
}
function Mr(t, e) {
  e = e.toLowerCase();
  const r = Object.keys(t);
  let o = r.length, a;
  for (; o-- > 0; )
    if (a = r[o], e === a.toLowerCase())
      return a;
  return null;
}
const Hr = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), Vr = (t) => !Et(t) && t !== Hr;
function Ce() {
  const { caseless: t } = Vr(this) && this || {}, e = {}, r = (o, a) => {
    const i = t && Mr(e, a) || a;
    Nt(e[i]) && Nt(o) ? e[i] = Ce(e[i], o) : Nt(o) ? e[i] = Ce({}, o) : bt(o) ? e[i] = o.slice() : e[i] = o;
  };
  for (let o = 0, a = arguments.length; o < a; o++)
    arguments[o] && Rt(arguments[o], r);
  return e;
}
const ta = (t, e, r, { allOwnKeys: o } = {}) => (Rt(e, (a, i) => {
  r && tt(a) ? t[i] = Fr(a, r) : t[i] = a;
}, { allOwnKeys: o }), t), ea = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), ra = (t, e, r, o) => {
  t.prototype = Object.create(e.prototype, o), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), r && Object.assign(t.prototype, r);
}, oa = (t, e, r, o) => {
  let a, i, n;
  const s = {};
  if (e = e || {}, t == null)
    return e;
  do {
    for (a = Object.getOwnPropertyNames(t), i = a.length; i-- > 0; )
      n = a[i], (!o || o(n, t, e)) && !s[n] && (e[n] = t[n], s[n] = !0);
    t = r !== !1 && Ue(t);
  } while (t && (!r || r(t, e)) && t !== Object.prototype);
  return e;
}, aa = (t, e, r) => {
  t = String(t), (r === void 0 || r > t.length) && (r = t.length), r -= e.length;
  const o = t.indexOf(e, r);
  return o !== -1 && o === r;
}, ia = (t) => {
  if (!t)
    return null;
  if (bt(t))
    return t;
  let e = t.length;
  if (!Ir(e))
    return null;
  const r = new Array(e);
  for (; e-- > 0; )
    r[e] = t[e];
  return r;
}, na = ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Ue(Uint8Array)), sa = (t, e) => {
  const o = (t && t[Symbol.iterator]).call(t);
  let a;
  for (; (a = o.next()) && !a.done; ) {
    const i = a.value;
    e.call(t, i[0], i[1]);
  }
}, la = (t, e) => {
  let r;
  const o = [];
  for (; (r = t.exec(e)) !== null; )
    o.push(r);
  return o;
}, da = H("HTMLFormElement"), pa = (t) => t.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(r, o, a) {
    return o.toUpperCase() + a;
  }
), cr = (({ hasOwnProperty: t }) => (e, r) => t.call(e, r))(Object.prototype), ca = H("RegExp"), qr = (t, e) => {
  const r = Object.getOwnPropertyDescriptors(t), o = {};
  Rt(r, (a, i) => {
    e(a, i, t) !== !1 && (o[i] = a);
  }), Object.defineProperties(t, o);
}, ma = (t) => {
  qr(t, (e, r) => {
    if (tt(t) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
      return !1;
    const o = t[r];
    if (!!tt(o)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + r + "'");
      });
    }
  });
}, ba = (t, e) => {
  const r = {}, o = (a) => {
    a.forEach((i) => {
      r[i] = !0;
    });
  };
  return bt(t) ? o(t) : o(String(t).split(e)), r;
}, ga = () => {
}, fa = (t, e) => (t = +t, Number.isFinite(t) ? t : e), ua = (t) => {
  const e = new Array(10), r = (o, a) => {
    if (Fe(o)) {
      if (e.indexOf(o) >= 0)
        return;
      if (!("toJSON" in o)) {
        e[a] = o;
        const i = bt(o) ? [] : {};
        return Rt(o, (n, s) => {
          const d = r(n, a + 1);
          !Et(d) && (i[s] = d);
        }), e[a] = void 0, i;
      }
    }
    return o;
  };
  return r(t, 0);
}, p = {
  isArray: bt,
  isArrayBuffer: Nr,
  isBuffer: Mo,
  isFormData: Yo,
  isArrayBufferView: Ho,
  isString: Vo,
  isNumber: Ir,
  isBoolean: qo,
  isObject: Fe,
  isPlainObject: Nt,
  isUndefined: Et,
  isDate: Wo,
  isFile: Ko,
  isBlob: Jo,
  isRegExp: ca,
  isFunction: tt,
  isStream: Go,
  isURLSearchParams: Xo,
  isTypedArray: na,
  isFileList: Zo,
  forEach: Rt,
  merge: Ce,
  extend: ta,
  trim: Qo,
  stripBOM: ea,
  inherits: ra,
  toFlatObject: oa,
  kindOf: je,
  kindOfTest: H,
  endsWith: aa,
  toArray: ia,
  forEachEntry: sa,
  matchAll: la,
  isHTMLForm: da,
  hasOwnProperty: cr,
  hasOwnProp: cr,
  reduceDescriptors: qr,
  freezeMethods: ma,
  toObjectSet: ba,
  toCamelCase: pa,
  noop: ga,
  toFiniteNumber: fa,
  findKey: Mr,
  global: Hr,
  isContextDefined: Vr,
  toJSONObject: ua
};
function w(t, e, r, o, a) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), r && (this.config = r), o && (this.request = o), a && (this.response = a);
}
p.inherits(w, Error, {
  toJSON: function() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: p.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const Wr = w.prototype, Kr = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
].forEach((t) => {
  Kr[t] = { value: t };
});
Object.defineProperties(w, Kr);
Object.defineProperty(Wr, "isAxiosError", { value: !0 });
w.from = (t, e, r, o, a, i) => {
  const n = Object.create(Wr);
  return p.toFlatObject(t, n, function(d) {
    return d !== Error.prototype;
  }, (s) => s !== "isAxiosError"), w.call(n, t.message, e, r, o, a), n.cause = t, n.name = t.name, i && Object.assign(n, i), n;
};
var ha = typeof self == "object" ? self.FormData : window.FormData;
const va = ha;
function Ee(t) {
  return p.isPlainObject(t) || p.isArray(t);
}
function Jr(t) {
  return p.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function mr(t, e, r) {
  return t ? t.concat(e).map(function(a, i) {
    return a = Jr(a), !r && i ? "[" + a + "]" : a;
  }).join(r ? "." : "") : e;
}
function xa(t) {
  return p.isArray(t) && !t.some(Ee);
}
const wa = p.toFlatObject(p, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function ya(t) {
  return t && p.isFunction(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator];
}
function ae(t, e, r) {
  if (!p.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new (va || FormData)(), r = p.toFlatObject(r, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, y) {
    return !p.isUndefined(y[v]);
  });
  const o = r.metaTokens, a = r.visitor || m, i = r.dots, n = r.indexes, d = (r.Blob || typeof Blob < "u" && Blob) && ya(e);
  if (!p.isFunction(a))
    throw new TypeError("visitor must be a function");
  function l(b) {
    if (b === null)
      return "";
    if (p.isDate(b))
      return b.toISOString();
    if (!d && p.isBlob(b))
      throw new w("Blob is not supported. Use a Buffer instead.");
    return p.isArrayBuffer(b) || p.isTypedArray(b) ? d && typeof Blob == "function" ? new Blob([b]) : Buffer.from(b) : b;
  }
  function m(b, v, y) {
    let x = b;
    if (b && !y && typeof b == "object") {
      if (p.endsWith(v, "{}"))
        v = o ? v : v.slice(0, -2), b = JSON.stringify(b);
      else if (p.isArray(b) && xa(b) || p.isFileList(b) || p.endsWith(v, "[]") && (x = p.toArray(b)))
        return v = Jr(v), x.forEach(function(E, P) {
          !(p.isUndefined(E) || E === null) && e.append(
            n === !0 ? mr([v], P, i) : n === null ? v : v + "[]",
            l(E)
          );
        }), !1;
    }
    return Ee(b) ? !0 : (e.append(mr(y, v, i), l(b)), !1);
  }
  const c = [], u = Object.assign(wa, {
    defaultVisitor: m,
    convertValue: l,
    isVisitable: Ee
  });
  function h(b, v) {
    if (!p.isUndefined(b)) {
      if (c.indexOf(b) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      c.push(b), p.forEach(b, function(x, k) {
        (!(p.isUndefined(x) || x === null) && a.call(
          e,
          x,
          p.isString(k) ? k.trim() : k,
          v,
          u
        )) === !0 && h(x, v ? v.concat(k) : [k]);
      }), c.pop();
    }
  }
  if (!p.isObject(t))
    throw new TypeError("data must be an object");
  return h(t), e;
}
function br(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(o) {
    return e[o];
  });
}
function Be(t, e) {
  this._pairs = [], t && ae(t, this, e);
}
const Zr = Be.prototype;
Zr.append = function(e, r) {
  this._pairs.push([e, r]);
};
Zr.toString = function(e) {
  const r = e ? function(o) {
    return e.call(this, o, br);
  } : br;
  return this._pairs.map(function(a) {
    return r(a[0]) + "=" + r(a[1]);
  }, "").join("&");
};
function ka(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Gr(t, e, r) {
  if (!e)
    return t;
  const o = r && r.encode || ka, a = r && r.serialize;
  let i;
  if (a ? i = a(e, r) : i = p.isURLSearchParams(e) ? e.toString() : new Be(e, r).toString(o), i) {
    const n = t.indexOf("#");
    n !== -1 && (t = t.slice(0, n)), t += (t.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return t;
}
class Ca {
  constructor() {
    this.handlers = [];
  }
  use(e, r, o) {
    return this.handlers.push({
      fulfilled: e,
      rejected: r,
      synchronous: o ? o.synchronous : !1,
      runWhen: o ? o.runWhen : null
    }), this.handlers.length - 1;
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    p.forEach(this.handlers, function(o) {
      o !== null && e(o);
    });
  }
}
const gr = Ca, Yr = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ea = typeof URLSearchParams < "u" ? URLSearchParams : Be, Sa = FormData, $a = (() => {
  let t;
  return typeof navigator < "u" && ((t = navigator.product) === "ReactNative" || t === "NativeScript" || t === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), _a = (() => typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), B = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ea,
    FormData: Sa,
    Blob
  },
  isStandardBrowserEnv: $a,
  isStandardBrowserWebWorkerEnv: _a,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Aa(t, e) {
  return ae(t, new B.classes.URLSearchParams(), Object.assign({
    visitor: function(r, o, a, i) {
      return B.isNode && p.isBuffer(r) ? (this.append(o, r.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function za(t) {
  return p.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function Da(t) {
  const e = {}, r = Object.keys(t);
  let o;
  const a = r.length;
  let i;
  for (o = 0; o < a; o++)
    i = r[o], e[i] = t[i];
  return e;
}
function Xr(t) {
  function e(r, o, a, i) {
    let n = r[i++];
    const s = Number.isFinite(+n), d = i >= r.length;
    return n = !n && p.isArray(a) ? a.length : n, d ? (p.hasOwnProp(a, n) ? a[n] = [a[n], o] : a[n] = o, !s) : ((!a[n] || !p.isObject(a[n])) && (a[n] = []), e(r, o, a[n], i) && p.isArray(a[n]) && (a[n] = Da(a[n])), !s);
  }
  if (p.isFormData(t) && p.isFunction(t.entries)) {
    const r = {};
    return p.forEachEntry(t, (o, a) => {
      e(za(o), a, r, 0);
    }), r;
  }
  return null;
}
const Oa = {
  "Content-Type": void 0
};
function Ta(t, e, r) {
  if (p.isString(t))
    try {
      return (e || JSON.parse)(t), p.trim(t);
    } catch (o) {
      if (o.name !== "SyntaxError")
        throw o;
    }
  return (r || JSON.stringify)(t);
}
const ie = {
  transitional: Yr,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, r) {
    const o = r.getContentType() || "", a = o.indexOf("application/json") > -1, i = p.isObject(e);
    if (i && p.isHTMLForm(e) && (e = new FormData(e)), p.isFormData(e))
      return a && a ? JSON.stringify(Xr(e)) : e;
    if (p.isArrayBuffer(e) || p.isBuffer(e) || p.isStream(e) || p.isFile(e) || p.isBlob(e))
      return e;
    if (p.isArrayBufferView(e))
      return e.buffer;
    if (p.isURLSearchParams(e))
      return r.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let s;
    if (i) {
      if (o.indexOf("application/x-www-form-urlencoded") > -1)
        return Aa(e, this.formSerializer).toString();
      if ((s = p.isFileList(e)) || o.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return ae(
          s ? { "files[]": e } : e,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return i || a ? (r.setContentType("application/json", !1), Ta(e)) : e;
  }],
  transformResponse: [function(e) {
    const r = this.transitional || ie.transitional, o = r && r.forcedJSONParsing, a = this.responseType === "json";
    if (e && p.isString(e) && (o && !this.responseType || a)) {
      const n = !(r && r.silentJSONParsing) && a;
      try {
        return JSON.parse(e);
      } catch (s) {
        if (n)
          throw s.name === "SyntaxError" ? w.from(s, w.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    }
    return e;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: B.classes.FormData,
    Blob: B.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
p.forEach(["delete", "get", "head"], function(e) {
  ie.headers[e] = {};
});
p.forEach(["post", "put", "patch"], function(e) {
  ie.headers[e] = p.merge(Oa);
});
const Ne = ie, Ra = p.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Pa = (t) => {
  const e = {};
  let r, o, a;
  return t && t.split(`
`).forEach(function(n) {
    a = n.indexOf(":"), r = n.substring(0, a).trim().toLowerCase(), o = n.substring(a + 1).trim(), !(!r || e[r] && Ra[r]) && (r === "set-cookie" ? e[r] ? e[r].push(o) : e[r] = [o] : e[r] = e[r] ? e[r] + ", " + o : o);
  }), e;
}, fr = Symbol("internals");
function vt(t) {
  return t && String(t).trim().toLowerCase();
}
function It(t) {
  return t === !1 || t == null ? t : p.isArray(t) ? t.map(It) : String(t);
}
function La(t) {
  const e = /* @__PURE__ */ Object.create(null), r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; o = r.exec(t); )
    e[o[1]] = o[2];
  return e;
}
function Ua(t) {
  return /^[-_a-zA-Z]+$/.test(t.trim());
}
function ur(t, e, r, o) {
  if (p.isFunction(o))
    return o.call(this, e, r);
  if (!!p.isString(e)) {
    if (p.isString(o))
      return e.indexOf(o) !== -1;
    if (p.isRegExp(o))
      return o.test(e);
  }
}
function ja(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, r, o) => r.toUpperCase() + o);
}
function Fa(t, e) {
  const r = p.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((o) => {
    Object.defineProperty(t, o + r, {
      value: function(a, i, n) {
        return this[o].call(this, e, a, i, n);
      },
      configurable: !0
    });
  });
}
class ne {
  constructor(e) {
    e && this.set(e);
  }
  set(e, r, o) {
    const a = this;
    function i(s, d, l) {
      const m = vt(d);
      if (!m)
        throw new Error("header name must be a non-empty string");
      const c = p.findKey(a, m);
      (!c || a[c] === void 0 || l === !0 || l === void 0 && a[c] !== !1) && (a[c || d] = It(s));
    }
    const n = (s, d) => p.forEach(s, (l, m) => i(l, m, d));
    return p.isPlainObject(e) || e instanceof this.constructor ? n(e, r) : p.isString(e) && (e = e.trim()) && !Ua(e) ? n(Pa(e), r) : e != null && i(r, e, o), this;
  }
  get(e, r) {
    if (e = vt(e), e) {
      const o = p.findKey(this, e);
      if (o) {
        const a = this[o];
        if (!r)
          return a;
        if (r === !0)
          return La(a);
        if (p.isFunction(r))
          return r.call(this, a, o);
        if (p.isRegExp(r))
          return r.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, r) {
    if (e = vt(e), e) {
      const o = p.findKey(this, e);
      return !!(o && (!r || ur(this, this[o], o, r)));
    }
    return !1;
  }
  delete(e, r) {
    const o = this;
    let a = !1;
    function i(n) {
      if (n = vt(n), n) {
        const s = p.findKey(o, n);
        s && (!r || ur(o, o[s], s, r)) && (delete o[s], a = !0);
      }
    }
    return p.isArray(e) ? e.forEach(i) : i(e), a;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(e) {
    const r = this, o = {};
    return p.forEach(this, (a, i) => {
      const n = p.findKey(o, i);
      if (n) {
        r[n] = It(a), delete r[i];
        return;
      }
      const s = e ? ja(i) : String(i).trim();
      s !== i && delete r[i], r[s] = It(a), o[s] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const r = /* @__PURE__ */ Object.create(null);
    return p.forEach(this, (o, a) => {
      o != null && o !== !1 && (r[a] = e && p.isArray(o) ? o.join(", ") : o);
    }), r;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, r]) => e + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...r) {
    const o = new this(e);
    return r.forEach((a) => o.set(a)), o;
  }
  static accessor(e) {
    const o = (this[fr] = this[fr] = {
      accessors: {}
    }).accessors, a = this.prototype;
    function i(n) {
      const s = vt(n);
      o[s] || (Fa(a, n), o[s] = !0);
    }
    return p.isArray(e) ? e.forEach(i) : i(e), this;
  }
}
ne.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
p.freezeMethods(ne.prototype);
p.freezeMethods(ne);
const I = ne;
function we(t, e) {
  const r = this || Ne, o = e || r, a = I.from(o.headers);
  let i = o.data;
  return p.forEach(t, function(s) {
    i = s.call(r, i, a.normalize(), e ? e.status : void 0);
  }), a.normalize(), i;
}
function Qr(t) {
  return !!(t && t.__CANCEL__);
}
function Pt(t, e, r) {
  w.call(this, t == null ? "canceled" : t, w.ERR_CANCELED, e, r), this.name = "CanceledError";
}
p.inherits(Pt, w, {
  __CANCEL__: !0
});
const Ba = null;
function Na(t, e, r) {
  const o = r.config.validateStatus;
  !r.status || !o || o(r.status) ? t(r) : e(new w(
    "Request failed with status code " + r.status,
    [w.ERR_BAD_REQUEST, w.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4],
    r.config,
    r.request,
    r
  ));
}
const Ia = B.isStandardBrowserEnv ? function() {
  return {
    write: function(r, o, a, i, n, s) {
      const d = [];
      d.push(r + "=" + encodeURIComponent(o)), p.isNumber(a) && d.push("expires=" + new Date(a).toGMTString()), p.isString(i) && d.push("path=" + i), p.isString(n) && d.push("domain=" + n), s === !0 && d.push("secure"), document.cookie = d.join("; ");
    },
    read: function(r) {
      const o = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
      return o ? decodeURIComponent(o[3]) : null;
    },
    remove: function(r) {
      this.write(r, "", Date.now() - 864e5);
    }
  };
}() : function() {
  return {
    write: function() {
    },
    read: function() {
      return null;
    },
    remove: function() {
    }
  };
}();
function Ma(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Ha(t, e) {
  return e ? t.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function to(t, e) {
  return t && !Ma(e) ? Ha(t, e) : e;
}
const Va = B.isStandardBrowserEnv ? function() {
  const e = /(msie|trident)/i.test(navigator.userAgent), r = document.createElement("a");
  let o;
  function a(i) {
    let n = i;
    return e && (r.setAttribute("href", n), n = r.href), r.setAttribute("href", n), {
      href: r.href,
      protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
      host: r.host,
      search: r.search ? r.search.replace(/^\?/, "") : "",
      hash: r.hash ? r.hash.replace(/^#/, "") : "",
      hostname: r.hostname,
      port: r.port,
      pathname: r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname
    };
  }
  return o = a(window.location.href), function(n) {
    const s = p.isString(n) ? a(n) : n;
    return s.protocol === o.protocol && s.host === o.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function qa(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function Wa(t, e) {
  t = t || 10;
  const r = new Array(t), o = new Array(t);
  let a = 0, i = 0, n;
  return e = e !== void 0 ? e : 1e3, function(d) {
    const l = Date.now(), m = o[i];
    n || (n = l), r[a] = d, o[a] = l;
    let c = i, u = 0;
    for (; c !== a; )
      u += r[c++], c = c % t;
    if (a = (a + 1) % t, a === i && (i = (i + 1) % t), l - n < e)
      return;
    const h = m && l - m;
    return h ? Math.round(u * 1e3 / h) : void 0;
  };
}
function hr(t, e) {
  let r = 0;
  const o = Wa(50, 250);
  return (a) => {
    const i = a.loaded, n = a.lengthComputable ? a.total : void 0, s = i - r, d = o(s), l = i <= n;
    r = i;
    const m = {
      loaded: i,
      total: n,
      progress: n ? i / n : void 0,
      bytes: s,
      rate: d || void 0,
      estimated: d && n && l ? (n - i) / d : void 0,
      event: a
    };
    m[e ? "download" : "upload"] = !0, t(m);
  };
}
const Ka = typeof XMLHttpRequest < "u", Ja = Ka && function(t) {
  return new Promise(function(r, o) {
    let a = t.data;
    const i = I.from(t.headers).normalize(), n = t.responseType;
    let s;
    function d() {
      t.cancelToken && t.cancelToken.unsubscribe(s), t.signal && t.signal.removeEventListener("abort", s);
    }
    p.isFormData(a) && (B.isStandardBrowserEnv || B.isStandardBrowserWebWorkerEnv) && i.setContentType(!1);
    let l = new XMLHttpRequest();
    if (t.auth) {
      const h = t.auth.username || "", b = t.auth.password ? unescape(encodeURIComponent(t.auth.password)) : "";
      i.set("Authorization", "Basic " + btoa(h + ":" + b));
    }
    const m = to(t.baseURL, t.url);
    l.open(t.method.toUpperCase(), Gr(m, t.params, t.paramsSerializer), !0), l.timeout = t.timeout;
    function c() {
      if (!l)
        return;
      const h = I.from(
        "getAllResponseHeaders" in l && l.getAllResponseHeaders()
      ), v = {
        data: !n || n === "text" || n === "json" ? l.responseText : l.response,
        status: l.status,
        statusText: l.statusText,
        headers: h,
        config: t,
        request: l
      };
      Na(function(x) {
        r(x), d();
      }, function(x) {
        o(x), d();
      }, v), l = null;
    }
    if ("onloadend" in l ? l.onloadend = c : l.onreadystatechange = function() {
      !l || l.readyState !== 4 || l.status === 0 && !(l.responseURL && l.responseURL.indexOf("file:") === 0) || setTimeout(c);
    }, l.onabort = function() {
      !l || (o(new w("Request aborted", w.ECONNABORTED, t, l)), l = null);
    }, l.onerror = function() {
      o(new w("Network Error", w.ERR_NETWORK, t, l)), l = null;
    }, l.ontimeout = function() {
      let b = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const v = t.transitional || Yr;
      t.timeoutErrorMessage && (b = t.timeoutErrorMessage), o(new w(
        b,
        v.clarifyTimeoutError ? w.ETIMEDOUT : w.ECONNABORTED,
        t,
        l
      )), l = null;
    }, B.isStandardBrowserEnv) {
      const h = (t.withCredentials || Va(m)) && t.xsrfCookieName && Ia.read(t.xsrfCookieName);
      h && i.set(t.xsrfHeaderName, h);
    }
    a === void 0 && i.setContentType(null), "setRequestHeader" in l && p.forEach(i.toJSON(), function(b, v) {
      l.setRequestHeader(v, b);
    }), p.isUndefined(t.withCredentials) || (l.withCredentials = !!t.withCredentials), n && n !== "json" && (l.responseType = t.responseType), typeof t.onDownloadProgress == "function" && l.addEventListener("progress", hr(t.onDownloadProgress, !0)), typeof t.onUploadProgress == "function" && l.upload && l.upload.addEventListener("progress", hr(t.onUploadProgress)), (t.cancelToken || t.signal) && (s = (h) => {
      !l || (o(!h || h.type ? new Pt(null, t, l) : h), l.abort(), l = null);
    }, t.cancelToken && t.cancelToken.subscribe(s), t.signal && (t.signal.aborted ? s() : t.signal.addEventListener("abort", s)));
    const u = qa(m);
    if (u && B.protocols.indexOf(u) === -1) {
      o(new w("Unsupported protocol " + u + ":", w.ERR_BAD_REQUEST, t));
      return;
    }
    l.send(a || null);
  });
}, Mt = {
  http: Ba,
  xhr: Ja
};
p.forEach(Mt, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const Za = {
  getAdapter: (t) => {
    t = p.isArray(t) ? t : [t];
    const { length: e } = t;
    let r, o;
    for (let a = 0; a < e && (r = t[a], !(o = p.isString(r) ? Mt[r.toLowerCase()] : r)); a++)
      ;
    if (!o)
      throw o === !1 ? new w(
        `Adapter ${r} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        p.hasOwnProp(Mt, r) ? `Adapter '${r}' is not available in the build` : `Unknown adapter '${r}'`
      );
    if (!p.isFunction(o))
      throw new TypeError("adapter is not a function");
    return o;
  },
  adapters: Mt
};
function ye(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new Pt(null, t);
}
function vr(t) {
  return ye(t), t.headers = I.from(t.headers), t.data = we.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Za.getAdapter(t.adapter || Ne.adapter)(t).then(function(o) {
    return ye(t), o.data = we.call(
      t,
      t.transformResponse,
      o
    ), o.headers = I.from(o.headers), o;
  }, function(o) {
    return Qr(o) || (ye(t), o && o.response && (o.response.data = we.call(
      t,
      t.transformResponse,
      o.response
    ), o.response.headers = I.from(o.response.headers))), Promise.reject(o);
  });
}
const xr = (t) => t instanceof I ? t.toJSON() : t;
function ct(t, e) {
  e = e || {};
  const r = {};
  function o(l, m, c) {
    return p.isPlainObject(l) && p.isPlainObject(m) ? p.merge.call({ caseless: c }, l, m) : p.isPlainObject(m) ? p.merge({}, m) : p.isArray(m) ? m.slice() : m;
  }
  function a(l, m, c) {
    if (p.isUndefined(m)) {
      if (!p.isUndefined(l))
        return o(void 0, l, c);
    } else
      return o(l, m, c);
  }
  function i(l, m) {
    if (!p.isUndefined(m))
      return o(void 0, m);
  }
  function n(l, m) {
    if (p.isUndefined(m)) {
      if (!p.isUndefined(l))
        return o(void 0, l);
    } else
      return o(void 0, m);
  }
  function s(l, m, c) {
    if (c in e)
      return o(l, m);
    if (c in t)
      return o(void 0, l);
  }
  const d = {
    url: i,
    method: i,
    data: i,
    baseURL: n,
    transformRequest: n,
    transformResponse: n,
    paramsSerializer: n,
    timeout: n,
    timeoutMessage: n,
    withCredentials: n,
    adapter: n,
    responseType: n,
    xsrfCookieName: n,
    xsrfHeaderName: n,
    onUploadProgress: n,
    onDownloadProgress: n,
    decompress: n,
    maxContentLength: n,
    maxBodyLength: n,
    beforeRedirect: n,
    transport: n,
    httpAgent: n,
    httpsAgent: n,
    cancelToken: n,
    socketPath: n,
    responseEncoding: n,
    validateStatus: s,
    headers: (l, m) => a(xr(l), xr(m), !0)
  };
  return p.forEach(Object.keys(t).concat(Object.keys(e)), function(m) {
    const c = d[m] || a, u = c(t[m], e[m], m);
    p.isUndefined(u) && c !== s || (r[m] = u);
  }), r;
}
const eo = "1.2.2", Ie = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  Ie[t] = function(o) {
    return typeof o === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const wr = {};
Ie.transitional = function(e, r, o) {
  function a(i, n) {
    return "[Axios v" + eo + "] Transitional option '" + i + "'" + n + (o ? ". " + o : "");
  }
  return (i, n, s) => {
    if (e === !1)
      throw new w(
        a(n, " has been removed" + (r ? " in " + r : "")),
        w.ERR_DEPRECATED
      );
    return r && !wr[n] && (wr[n] = !0, console.warn(
      a(
        n,
        " has been deprecated since v" + r + " and will be removed in the near future"
      )
    )), e ? e(i, n, s) : !0;
  };
};
function Ga(t, e, r) {
  if (typeof t != "object")
    throw new w("options must be an object", w.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(t);
  let a = o.length;
  for (; a-- > 0; ) {
    const i = o[a], n = e[i];
    if (n) {
      const s = t[i], d = s === void 0 || n(s, i, t);
      if (d !== !0)
        throw new w("option " + i + " must be " + d, w.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0)
      throw new w("Unknown option " + i, w.ERR_BAD_OPTION);
  }
}
const Se = {
  assertOptions: Ga,
  validators: Ie
}, V = Se.validators;
class Wt {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new gr(),
      response: new gr()
    };
  }
  request(e, r) {
    typeof e == "string" ? (r = r || {}, r.url = e) : r = e || {}, r = ct(this.defaults, r);
    const { transitional: o, paramsSerializer: a, headers: i } = r;
    o !== void 0 && Se.assertOptions(o, {
      silentJSONParsing: V.transitional(V.boolean),
      forcedJSONParsing: V.transitional(V.boolean),
      clarifyTimeoutError: V.transitional(V.boolean)
    }, !1), a !== void 0 && Se.assertOptions(a, {
      encode: V.function,
      serialize: V.function
    }, !0), r.method = (r.method || this.defaults.method || "get").toLowerCase();
    let n;
    n = i && p.merge(
      i.common,
      i[r.method]
    ), n && p.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (b) => {
        delete i[b];
      }
    ), r.headers = I.concat(n, i);
    const s = [];
    let d = !0;
    this.interceptors.request.forEach(function(v) {
      typeof v.runWhen == "function" && v.runWhen(r) === !1 || (d = d && v.synchronous, s.unshift(v.fulfilled, v.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function(v) {
      l.push(v.fulfilled, v.rejected);
    });
    let m, c = 0, u;
    if (!d) {
      const b = [vr.bind(this), void 0];
      for (b.unshift.apply(b, s), b.push.apply(b, l), u = b.length, m = Promise.resolve(r); c < u; )
        m = m.then(b[c++], b[c++]);
      return m;
    }
    u = s.length;
    let h = r;
    for (c = 0; c < u; ) {
      const b = s[c++], v = s[c++];
      try {
        h = b(h);
      } catch (y) {
        v.call(this, y);
        break;
      }
    }
    try {
      m = vr.call(this, h);
    } catch (b) {
      return Promise.reject(b);
    }
    for (c = 0, u = l.length; c < u; )
      m = m.then(l[c++], l[c++]);
    return m;
  }
  getUri(e) {
    e = ct(this.defaults, e);
    const r = to(e.baseURL, e.url);
    return Gr(r, e.params, e.paramsSerializer);
  }
}
p.forEach(["delete", "get", "head", "options"], function(e) {
  Wt.prototype[e] = function(r, o) {
    return this.request(ct(o || {}, {
      method: e,
      url: r,
      data: (o || {}).data
    }));
  };
});
p.forEach(["post", "put", "patch"], function(e) {
  function r(o) {
    return function(i, n, s) {
      return this.request(ct(s || {}, {
        method: e,
        headers: o ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: n
      }));
    };
  }
  Wt.prototype[e] = r(), Wt.prototype[e + "Form"] = r(!0);
});
const Ht = Wt;
class Me {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function(i) {
      r = i;
    });
    const o = this;
    this.promise.then((a) => {
      if (!o._listeners)
        return;
      let i = o._listeners.length;
      for (; i-- > 0; )
        o._listeners[i](a);
      o._listeners = null;
    }), this.promise.then = (a) => {
      let i;
      const n = new Promise((s) => {
        o.subscribe(s), i = s;
      }).then(a);
      return n.cancel = function() {
        o.unsubscribe(i);
      }, n;
    }, e(function(i, n, s) {
      o.reason || (o.reason = new Pt(i, n, s), r(o.reason));
    });
  }
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const r = this._listeners.indexOf(e);
    r !== -1 && this._listeners.splice(r, 1);
  }
  static source() {
    let e;
    return {
      token: new Me(function(a) {
        e = a;
      }),
      cancel: e
    };
  }
}
const Ya = Me;
function Xa(t) {
  return function(r) {
    return t.apply(null, r);
  };
}
function Qa(t) {
  return p.isObject(t) && t.isAxiosError === !0;
}
const $e = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries($e).forEach(([t, e]) => {
  $e[e] = t;
});
const ti = $e;
function ro(t) {
  const e = new Ht(t), r = Fr(Ht.prototype.request, e);
  return p.extend(r, Ht.prototype, e, { allOwnKeys: !0 }), p.extend(r, e, null, { allOwnKeys: !0 }), r.create = function(a) {
    return ro(ct(t, a));
  }, r;
}
const $ = ro(Ne);
$.Axios = Ht;
$.CanceledError = Pt;
$.CancelToken = Ya;
$.isCancel = Qr;
$.VERSION = eo;
$.toFormData = ae;
$.AxiosError = w;
$.Cancel = $.CanceledError;
$.all = function(e) {
  return Promise.all(e);
};
$.spread = Xa;
$.isAxiosError = Qa;
$.mergeConfig = ct;
$.AxiosHeaders = I;
$.formToJSON = (t) => Xr(p.isHTMLForm(t) ? new FormData(t) : t);
$.HttpStatusCode = ti;
$.default = $;
const ei = $, xt = ei.create({
  baseURL: "https://4582-2409-4070-2b9a-770f-ccc5-70c3-e563-8dd3.in.ngrok.io/",
  headers: {
    "ngrok-skip-browser-warning": "true",
    Accept: "application/json",
    "Access-Control-Allow-Origin": !0
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = (t, e, r) => {
  for (const o of e)
    if (o[0] === t)
      return (0, o[1])();
  return r == null ? void 0 : r();
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* Lt(t, e) {
  if (t !== void 0) {
    let r = 0;
    for (const o of t)
      yield e(o, r++);
  }
}
const ri = {
  HRIS: " Human Resource Information System",
  ECOM: " E-commerce",
  ACC: "Accounting",
  COMMS: "Communications"
}, mt = {
  category: "",
  id: "",
  label: "",
  logo: "",
  authType: "",
  setupSteps: [],
  status: {
    state: "open"
  }
}, D = {
  CROSS_CIRCLE: `<svg width="82" height="82" class="cross-circle-svg" viewBox="0 0 82 82" fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path d="M55.8403 26.16C55.4685 25.785 55.0261 25.4875 54.5386 25.2844C54.0512 25.0813 53.5284 24.9768 53.0003 24.9768C52.4723 24.9768 51.9494 25.0813 51.462 25.2844C50.9746 25.4875 50.5322 25.785 50.1603 26.16L41.0003 35.36L31.8403 26.16C31.0871 25.4067 30.0655 24.9836 29.0003 24.9836C27.9351 24.9836 26.9135 25.4067 26.1603 26.16C25.4071 26.9132 24.9839 27.9347 24.9839 29C24.9839 30.0652 25.4071 31.0867 26.1603 31.84L35.3603 41L26.1603 50.16C25.7854 50.5318 25.4878 50.9742 25.2848 51.4616C25.0817 51.9491 24.9771 52.4719 24.9771 53C24.9771 53.528 25.0817 54.0508 25.2848 54.5383C25.4878 55.0257 25.7854 55.4681 26.1603 55.84C26.5322 56.2149 26.9746 56.5124 27.462 56.7155C27.9494 56.9186 28.4723 57.0231 29.0003 57.0231C29.5284 57.0231 30.0512 56.9186 30.5386 56.7155C31.0261 56.5124 31.4685 56.2149 31.8403 55.84L41.0003 46.6399L50.1603 55.84C50.5322 56.2149 50.9746 56.5124 51.462 56.7155C51.9494 56.9186 52.4723 57.0231 53.0003 57.0231C53.5284 57.0231 54.0512 56.9186 54.5386 56.7155C55.0261 56.5124 55.4685 56.2149 55.8403 55.84C56.2152 55.4681 56.5128 55.0257 56.7159 54.5383C56.919 54.0508 57.0235 53.528 57.0235 53C57.0235 52.4719 56.919 51.9491 56.7159 51.4616C56.5128 50.9742 56.2152 50.5318 55.8403 50.16L46.6403 41L55.8403 31.84C56.2152 31.4681 56.5128 31.0257 56.7159 30.5383C56.919 30.0508 57.0235 29.528 57.0235 29C57.0235 28.4719 56.919 27.9491 56.7159 27.4616C56.5128 26.9742 56.2152 26.5318 55.8403 26.16V26.16ZM69.2803 12.72C65.5904 8.89954 61.1767 5.85226 56.2965 3.7559C51.4163 1.65954 46.1675 0.556086 40.8564 0.509933C35.5452 0.46378 30.278 1.47585 25.3622 3.48708C20.4463 5.49832 15.9802 8.46844 12.2245 12.2242C8.46881 15.9799 5.49869 20.4459 3.48745 25.3618C1.47621 30.2776 0.464147 35.5448 0.510299 40.856C0.556452 46.1672 1.6599 51.416 3.75626 56.2961C5.85262 61.1763 8.89991 65.5901 12.7203 69.28C16.4102 73.1004 20.824 76.1477 25.7041 78.244C30.5843 80.3404 35.8331 81.4438 41.1443 81.49C46.4554 81.5361 51.7226 80.5241 56.6385 78.5128C61.5543 76.5016 66.0204 73.5315 69.7761 69.7758C73.5318 66.02 76.502 61.554 78.5132 56.6381C80.5244 51.7223 81.5365 46.4551 81.4903 41.1439C81.4442 35.8327 80.3407 30.5839 78.2444 25.7038C76.148 20.8236 73.1007 16.4098 69.2803 12.72V12.72ZM63.6403 63.6399C58.4085 68.8776 51.5225 72.1393 44.1555 72.8692C36.7885 73.5991 29.3963 71.7522 23.2384 67.643C17.0805 63.5339 12.5378 57.4168 10.3842 50.3339C8.23067 43.251 8.59954 35.6405 11.428 28.7991C14.2564 21.9577 19.3694 16.3085 25.8959 12.8142C32.4223 9.31985 39.9585 8.19647 47.2203 9.63544C54.4822 11.0744 61.0205 14.9867 65.7213 20.7058C70.4221 26.4249 72.9945 33.5969 73.0003 41C73.0146 45.2051 72.1947 49.3713 70.588 53.2575C68.9814 57.1436 66.6199 60.6725 63.6403 63.6399V63.6399Z" fill="currentColor"/>
</svg>
`,
  ALERT_CIRCLE: `<svg class="alert-circle-svg" xmlns="http://www.w3.org/2000/svg" width="108" height="108" viewBox="0 0 108 108" fill="none">
  <path d="M54 27C52.5678 27 51.1943 27.5689 50.1816 28.5816C49.1689 29.5943 48.6 30.9678 48.6 32.4V54C48.6 55.4322 49.1689 56.8057 50.1816 57.8184C51.1943 58.8311 52.5678 59.4 54 59.4C55.4322 59.4 56.8057 58.8311 57.8184 57.8184C58.8311 56.8057 59.4 55.4322 59.4 54V32.4C59.4 30.9678 58.8311 29.5943 57.8184 28.5816C56.8057 27.5689 55.4322 27 54 27ZM58.968 73.548C58.8498 73.2039 58.6864 72.877 58.482 72.576L57.834 71.766C57.0746 71.0167 56.1104 70.5091 55.0628 70.3073C54.0153 70.1055 52.9314 70.2185 51.948 70.632C51.2936 70.9055 50.6909 71.289 50.166 71.766C49.6655 72.2706 49.2696 72.869 49.0009 73.5269C48.7321 74.1848 48.5959 74.8893 48.6 75.6C48.6085 76.3056 48.7553 77.0028 49.032 77.652C49.2745 78.3221 49.6615 78.9307 50.1654 79.4346C50.6693 79.9385 51.2779 80.3255 51.948 80.568C52.5944 80.8537 53.2933 81.0012 54 81.0012C54.7067 81.0012 55.4056 80.8537 56.052 80.568C56.7221 80.3255 57.3307 79.9385 57.8346 79.4346C58.3386 78.9307 58.7255 78.3221 58.968 77.652C59.2447 77.0028 59.3915 76.3056 59.4 75.6C59.4265 75.2405 59.4265 74.8795 59.4 74.52C59.307 74.1756 59.1613 73.8478 58.968 73.548ZM54 0C43.3198 0 32.8795 3.16705 23.9992 9.10064C15.119 15.0342 8.19766 23.4679 4.11053 33.3351C0.0233974 43.2023 -1.04598 54.0599 1.03762 64.5349C3.12122 75.0098 8.26422 84.6317 15.8163 92.1838C23.3683 99.7358 32.9902 104.879 43.4651 106.962C53.9401 109.046 64.7977 107.977 74.6649 103.889C84.5321 99.8024 92.9658 92.881 98.8994 84.0008C104.833 75.1205 108 64.6802 108 54C108 46.9086 106.603 39.8867 103.89 33.3351C101.176 26.7835 97.1981 20.8306 92.1838 15.8162C87.1694 10.8019 81.2165 6.82426 74.6649 4.11051C68.1133 1.39675 61.0914 0 54 0ZM54 97.2C45.4559 97.2 37.1036 94.6664 29.9994 89.9195C22.8952 85.1726 17.3581 78.4257 14.0884 70.5319C10.8187 62.6381 9.96322 53.9521 11.6301 45.5721C13.297 37.1921 17.4114 29.4946 23.453 23.453C29.4946 17.4114 37.1921 13.297 45.5721 11.6301C53.9521 9.96319 62.6382 10.8187 70.5319 14.0884C78.4257 17.3581 85.1726 22.8952 89.9195 29.9994C94.6664 37.1036 97.2 45.4558 97.2 54C97.2 65.4573 92.6486 76.4454 84.547 84.547C76.4455 92.6486 65.4574 97.2 54 97.2Z" fill="currentColor"/>
  </svg>`,
  INFO: `<svg width="12" height="12" class="info-svg" viewBox="0 0 12 12" fill="none"
xmlns="http://www.w3.org/2000/svg">
<path d="M6 5.4C5.84087 5.4 5.68826 5.46321 5.57574 5.57574C5.46322 5.68826 5.4 5.84087 5.4 6V8.4C5.4 8.55913 5.46322 8.71174 5.57574 8.82426C5.68826 8.93678 5.84087 9 6 9C6.15913 9 6.31174 8.93678 6.42427 8.82426C6.53679 8.71174 6.6 8.55913 6.6 8.4V6C6.6 5.84087 6.53679 5.68826 6.42427 5.57574C6.31174 5.46321 6.15913 5.4 6 5.4ZM6.228 3.048C6.08192 2.98799 5.91808 2.98799 5.772 3.048C5.69835 3.07656 5.63106 3.11937 5.574 3.174C5.521 3.23232 5.47839 3.29929 5.448 3.372C5.41441 3.44321 5.39797 3.52129 5.4 3.6C5.39955 3.67896 5.41468 3.75724 5.44454 3.83034C5.4744 3.90345 5.51839 3.96994 5.574 4.026C5.63232 4.079 5.69929 4.12161 5.772 4.152C5.8629 4.18934 5.96158 4.20379 6.05937 4.19407C6.15716 4.18434 6.25106 4.15075 6.33283 4.09624C6.4146 4.04173 6.48172 3.96797 6.52831 3.88144C6.57489 3.79491 6.59951 3.69827 6.6 3.6C6.59779 3.44114 6.53564 3.28898 6.426 3.174C6.36894 3.11937 6.30165 3.07656 6.228 3.048ZM6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80026 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0892 10.3295 10.3201 10.9888 9.33342C11.6481 8.34673 12 7.18669 12 6C12 5.21207 11.8448 4.43185 11.5433 3.7039C11.2417 2.97595 10.7998 2.31451 10.2426 1.75736C9.68549 1.20021 9.02406 0.758251 8.2961 0.456723C7.56815 0.155195 6.78793 0 6 0ZM6 10.8C5.05065 10.8 4.12262 10.5185 3.33326 9.99105C2.54391 9.46362 1.92868 8.71396 1.56538 7.83688C1.20208 6.95979 1.10702 5.99467 1.29223 5.06357C1.47744 4.13246 1.9346 3.27718 2.60589 2.60589C3.27718 1.9346 4.13246 1.47744 5.06357 1.29223C5.99468 1.10702 6.9598 1.20208 7.83688 1.56538C8.71397 1.92868 9.46362 2.54391 9.99105 3.33326C10.5185 4.12262 10.8 5.05065 10.8 6C10.8 7.27304 10.2943 8.49394 9.39411 9.39411C8.49394 10.2943 7.27304 10.8 6 10.8Z" fill="currentColor"/>
</svg>
`,
  EMAIL: `<svg width="100%" height="100%" class="email-svg" viewBox="0 0 144 144" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M97.74 52.2601C98.2978 52.8225 98.9614 53.2689 99.6925 53.5735C100.424 53.8781 101.208 54.0349 102 54.0349C102.792 54.0349 103.576 53.8781 104.307 53.5735C105.039 53.2689 105.702 52.8225 106.26 52.2601L130.26 28.2601C131.39 27.1303 132.025 25.5979 132.025 24.0001C132.025 22.4023 131.39 20.87 130.26 19.7401C129.13 18.6103 127.598 17.9756 126 17.9756C124.402 17.9756 122.87 18.6103 121.74 19.7401L102 39.5401L94.26 31.7401C93.7006 31.1807 93.0364 30.7369 92.3055 30.4342C91.5746 30.1314 90.7912 29.9756 90 29.9756C88.4022 29.9756 86.8698 30.6103 85.74 31.7401C85.1806 32.2996 84.7368 32.9637 84.434 33.6946C84.1313 34.4256 83.9755 35.209 83.9755 36.0001C83.9755 37.5979 84.6102 39.1303 85.74 40.2601L97.74 52.2601ZM126 48.0001C124.409 48.0001 122.883 48.6323 121.757 49.7575C120.632 50.8827 120 52.4088 120 54.0001V108C120 109.591 119.368 111.118 118.243 112.243C117.117 113.368 115.591 114 114 114H30C28.4087 114 26.8826 113.368 25.7574 112.243C24.6321 111.118 24 109.591 24 108V50.4601L59.28 85.8001C62.6475 89.1401 67.1971 91.016 71.94 91.0201C76.8022 90.9952 81.4586 89.055 84.9 85.6201L95.22 75.3001C96.3498 74.1703 96.9845 72.6379 96.9845 71.0401C96.9845 69.4423 96.3498 67.91 95.22 66.7801C94.0902 65.6503 92.5578 65.0156 90.96 65.0156C89.3622 65.0156 87.8298 65.6503 86.7 66.7801L76.2 77.2801C75.0784 78.3795 73.5705 78.9953 72 78.9953C70.4295 78.9953 68.9216 78.3795 67.8 77.2801L32.46 42.0001H66C67.5913 42.0001 69.1174 41.368 70.2426 40.2428C71.3679 39.1176 72 37.5914 72 36.0001C72 34.4088 71.3679 32.8827 70.2426 31.7575C69.1174 30.6323 67.5913 30.0001 66 30.0001H30C25.2261 30.0001 20.6477 31.8966 17.2721 35.2722C13.8964 38.6479 12 43.2262 12 48.0001V108C12 112.774 13.8964 117.352 17.2721 120.728C20.6477 124.104 25.2261 126 30 126H114C118.774 126 123.352 124.104 126.728 120.728C130.104 117.352 132 112.774 132 108V54.0001C132 52.4088 131.368 50.8827 130.243 49.7575C129.117 48.6323 127.591 48.0001 126 48.0001Z" fill="currentColor"/>
</svg>
`,
  CHEVRON_UP: `<svg width="18" height="18" class="chevron-up-svg" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.46716 6.34495L4.22966 10.59C4.15936 10.6597 4.10357 10.7426 4.06549 10.834C4.02742 10.9254 4.00781 11.0234 4.00781 11.1225C4.00781 11.2215 4.02742 11.3195 4.06549 11.4109C4.10357 11.5023 4.15936 11.5852 4.22966 11.655C4.37018 11.7946 4.56027 11.873 4.75841 11.873C4.95655 11.873 5.14664 11.7946 5.28716 11.655L9.03716 7.94245L12.7497 11.655C12.8902 11.7946 13.0803 11.873 13.2784 11.873C13.4765 11.873 13.6666 11.7946 13.8072 11.655C13.878 11.5855 13.9344 11.5027 13.973 11.4113C14.0116 11.3198 14.0317 11.2217 14.0322 11.1225C14.0317 11.0232 14.0116 10.9251 13.973 10.8337C13.9344 10.7422 13.878 10.6594 13.8072 10.59L9.56966 6.34495C9.49943 6.26882 9.41419 6.20807 9.31932 6.16651C9.22444 6.12496 9.12199 6.1035 9.01841 6.1035C8.91483 6.1035 8.81238 6.12496 8.71751 6.16651C8.62263 6.20807 8.53739 6.26882 8.46716 6.34495V6.34495Z" fill="currentColor"/>
  </svg>
  `,
  CEHVRON_DOWN: `<svg width="18" height="18" class="chevron-down-svg" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.53284 11.655L13.7703 7.41005C13.8406 7.34033 13.8964 7.25737 13.9345 7.16598C13.9726 7.07459 13.9922 6.97656 13.9922 6.87755C13.9922 6.77854 13.9726 6.68051 13.9345 6.58911C13.8964 6.49772 13.8406 6.41477 13.7703 6.34505C13.6298 6.20536 13.4397 6.12695 13.2416 6.12695C13.0434 6.12695 12.8534 6.20536 12.7128 6.34505L8.96284 10.0575L5.25034 6.34505C5.10982 6.20536 4.91973 6.12695 4.72159 6.12695C4.52345 6.12695 4.33336 6.20536 4.19284 6.34505C4.12197 6.41451 4.0656 6.49734 4.02697 6.58875C3.98835 6.68016 3.96825 6.77832 3.96784 6.87755C3.96825 6.97678 3.98835 7.07494 4.02697 7.16635C4.0656 7.25775 4.12197 7.34059 4.19284 7.41005L8.43034 11.655C8.50057 11.7312 8.58581 11.7919 8.68068 11.8335C8.77556 11.875 8.87801 11.8965 8.98159 11.8965C9.08517 11.8965 9.18762 11.875 9.28249 11.8335C9.37737 11.7919 9.46261 11.7312 9.53284 11.655V11.655Z" fill="currentColor"/>
  </svg>
  `,
  CHEVRON_LEFT: `<svg width="8" class="chevron-left-svg" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.32159 7.42005L5.98159 13.07C6.07455 13.1638 6.18515 13.2382 6.30701 13.2889C6.42887 13.3397 6.55958 13.3658 6.69159 13.3658C6.8236 13.3658 6.95431 13.3397 7.07617 13.2889C7.19803 13.2382 7.30863 13.1638 7.40159 13.07C7.58784 12.8827 7.69238 12.6292 7.69238 12.365C7.69238 12.1009 7.58784 11.8474 7.40159 11.66L2.45159 6.66005L7.40159 1.71005C7.58784 1.52268 7.69238 1.26923 7.69238 1.00505C7.69238 0.740861 7.58784 0.48741 7.40159 0.300047C7.30898 0.205559 7.19853 0.130388 7.07666 0.0788918C6.95478 0.0273952 6.8239 0.000597 6.69159 4.76837e-05C6.55928 0.000597 6.4284 0.0273952 6.30653 0.0788918C6.18465 0.130388 6.0742 0.205559 5.98159 0.300047L0.32159 5.95005C0.220086 6.04369 0.139077 6.15734 0.0836697 6.28384C0.0282621 6.41034 -0.000342369 6.54694 -0.000342369 6.68505C-0.000342369 6.82315 0.0282621 6.95975 0.0836697 7.08625C0.139077 7.21275 0.220086 7.3264 0.32159 7.42005Z" fill="currentColor" />
  </svg>
  
  `,
  CHEVRON_RIGHT: `<svg width="9" height="14" class="chevron-right-svg" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.06318 6.31164L2.40318 0.661643C2.31021 0.567915 2.19961 0.493521 2.07775 0.442752C1.95589 0.391983 1.82519 0.365845 1.69318 0.365845C1.56116 0.365845 1.43046 0.391983 1.3086 0.442752C1.18674 0.493521 1.07614 0.567915 0.983175 0.661643C0.796924 0.849005 0.692383 1.10246 0.692383 1.36664C0.692383 1.63083 0.796924 1.88428 0.983175 2.07164L5.93318 7.07164L0.983175 12.0216C0.796924 12.209 0.692383 12.4625 0.692383 12.7266C0.692383 12.9908 0.796924 13.2443 0.983175 13.4316C1.07579 13.5261 1.18623 13.6013 1.30811 13.6528C1.42999 13.7043 1.56087 13.7311 1.69318 13.7316C1.82548 13.7311 1.95637 13.7043 2.07824 13.6528C2.20012 13.6013 2.31056 13.5261 2.40318 13.4316L8.06318 7.78164C8.16468 7.688 8.24569 7.57435 8.3011 7.44785C8.3565 7.32135 8.38511 7.18474 8.38511 7.04664C8.38511 6.90854 8.3565 6.77194 8.3011 6.64544C8.24569 6.51894 8.16468 6.40529 8.06318 6.31164V6.31164Z" fill="currentColor"/>
  </svg>
  
  
  `,
  CHECK_CIRCLE: `<svg xmlns="http://www.w3.org/2000/svg" class="check-circle-svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
  <path d="M76.32 40.74L50.58 66.54L40.68 56.64C40.1421 56.0119 39.4802 55.5018 38.7358 55.1416C37.9915 54.7815 37.1807 54.5791 36.3543 54.5472C35.528 54.5153 34.704 54.6545 33.9341 54.9562C33.1641 55.2578 32.4649 55.7154 31.8801 56.3001C31.2954 56.8848 30.8378 57.5841 30.5362 58.3541C30.2346 59.124 30.0953 59.948 30.1272 60.7743C30.1592 61.6006 30.3615 62.4114 30.7217 63.1558C31.0818 63.9002 31.5919 64.5621 32.22 65.1L46.32 79.26C46.8807 79.8161 47.5456 80.256 48.2766 80.5546C49.0076 80.8532 49.7904 81.0046 50.58 81C52.1541 80.9934 53.6625 80.3685 54.78 79.26L84.78 49.26C85.3424 48.7022 85.7888 48.0386 86.0934 47.3075C86.398 46.5763 86.5548 45.7921 86.5548 45C86.5548 44.2079 86.398 43.4237 86.0934 42.6925C85.7888 41.9614 85.3424 41.2978 84.78 40.74C83.6558 39.6225 82.1351 38.9952 80.55 38.9952C78.9649 38.9952 77.4442 39.6225 76.32 40.74ZM60 0C48.1331 0 36.5328 3.51894 26.6658 10.1118C16.7989 16.7047 9.10851 26.0754 4.56726 37.039C0.0259972 48.0026 -1.1622 60.0666 1.15291 71.7054C3.46802 83.3443 9.18247 94.0353 17.5736 102.426C25.9648 110.818 36.6557 116.532 48.2946 118.847C59.9335 121.162 71.9975 119.974 82.961 115.433C93.9246 110.892 103.295 103.201 109.888 93.3342C116.481 83.4673 120 71.8669 120 60C120 52.1207 118.448 44.3185 115.433 37.039C112.418 29.7595 107.998 23.1451 102.426 17.5736C96.8549 12.0021 90.2406 7.58251 82.961 4.56723C75.6815 1.55195 67.8793 0 60 0ZM60 108C50.5065 108 41.2262 105.185 33.3327 99.9105C25.4391 94.6362 19.2868 87.1397 15.6538 78.3688C12.0208 69.598 11.0702 59.9468 12.9223 50.6357C14.7744 41.3246 19.346 32.7718 26.0589 26.0589C32.7718 19.346 41.3246 14.7744 50.6357 12.9223C59.9468 11.0702 69.598 12.0208 78.3688 15.6538C87.1397 19.2868 94.6363 25.4391 99.9106 33.3326C105.185 41.2262 108 50.5065 108 60C108 72.7304 102.943 84.9394 93.9412 93.9411C84.9394 102.943 72.7304 108 60 108Z" fill="currentColor"/>
  </svg>`,
  LOADING: `<svg xmlns="http://www.w3.org/2000/svg" class="loading-svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <circle cx="50" cy="50" r="40" stroke-width="4" stroke="currentColor" stroke-dasharray="62.83185307179586 62.83185307179586" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" dur="1.7543859649122806s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"/>
  </circle>
  <circle cx="50" cy="50" r="35" stroke-width="4" stroke="#20202080" stroke-dasharray="54.97787143782138 54.97787143782138" stroke-dashoffset="54.97787143782138" fill="none" stroke-linecap="round">
    <animateTransform attributeName="transform" type="rotate" dur="1.7543859649122806s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"/>
  </circle>
  </svg>`,
  HOURGLASS: `<svg class="hourglass-svg" xmlns="http://www.w3.org/2000/svg" width="96" height="132" viewBox="0 0 96 132" fill="none">
  <path d="M90 120H84V109.998C83.9813 106.564 83.3734 103.16 82.2026 99.9316C82.1371 99.7555 82.0682 99.5921 81.9873 99.4244C81.0155 96.7749 79.6731 94.2765 78 92.0039L69.6006 80.8007C67.2701 77.6799 66.0075 73.891 66 69.9961V63.9372C66.0137 59.1668 67.9075 54.594 71.2705 51.2107L75.2138 47.2673C79.7955 42.6608 82.7388 36.6778 83.5917 30.237C83.595 30.1535 83.6397 30.0839 83.6397 29.9997L83.6228 29.9173C83.8315 28.6398 83.9575 27.3501 84.0001 26.0564V12H90.0001C91.5914 12 93.1175 11.3679 94.2427 10.2426C95.3679 9.11742 96.0001 7.5913 96.0001 6C96.0001 4.4087 95.3679 2.88258 94.2427 1.75736C93.1175 0.632142 91.5914 0 90.0001 0H6.00006C4.40876 0 2.88264 0.632142 1.75742 1.75736C0.632201 2.88258 6.00815e-05 4.4087 6.00815e-05 6C6.00815e-05 7.5913 0.632201 9.11742 1.75742 10.2426C2.88264 11.3679 4.40876 12 6.00006 12H12.0001V26.0564C12.0427 27.3501 12.1687 28.6398 12.3773 29.9173L12.3604 30C12.3604 30.084 12.405 30.1538 12.4084 30.2373C13.2613 36.6781 16.2045 42.661 20.7862 47.2676L24.7295 51.211C28.0925 54.5943 29.9862 59.1669 30 63.9372V69.996C29.9922 73.8905 28.7307 77.6789 26.4023 80.8007L17.9971 92.0036C16.3245 94.2774 14.9825 96.7766 14.0108 99.4267C13.931 99.593 13.8625 99.7545 13.7977 99.9288C12.6269 103.158 12.0188 106.563 12 109.998V120H6C4.4087 120 2.88258 120.632 1.75736 121.757C0.632141 122.883 0 124.409 0 126C0 127.591 0.632141 129.117 1.75736 130.243C2.88258 131.368 4.4087 132 6 132H90C91.5913 132 93.1174 131.368 94.2426 130.243C95.3679 129.117 96 127.591 96 126C96 124.409 95.3679 122.883 94.2426 121.757C93.1174 120.632 91.5913 120 90 120V120ZM24 24V12H72V24H24ZM29.2705 38.7832C28.4251 37.9339 27.6675 37.0014 27.0092 36H68.9908C68.3325 37.0014 67.5749 37.9339 66.7295 38.7832L62.7861 42.7266C58.1059 47.3793 55.1049 53.4556 54.2549 60H41.7449C40.8951 53.4554 37.8941 47.3789 33.2138 42.726L29.2705 38.7832ZM36.0029 87.996C39.4747 83.3441 41.5332 77.7908 41.9326 72H54.0674C54.4664 77.7914 56.5262 83.345 60 87.996L66.0007 96H29.9978L36.0029 87.996ZM72 120H24V109.998C24.0167 109.329 24.0712 108.662 24.1633 108H71.8367C71.9288 108.662 71.9833 109.329 72 109.998V120Z" fill="currentColor"/>
  </svg>`,
  SEARCH: `<svg class="search-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M15.2996 14.3572L12.5171 11.5972C13.5972 10.2505 14.1203 8.54117 13.9788 6.82068C13.8372 5.10018 13.0419 3.49929 11.7563 2.34718C10.4707 1.19508 8.7925 0.579331 7.06684 0.626552C5.34117 0.673772 3.69918 1.38037 2.4785 2.60106C1.25781 3.82174 0.551213 5.46373 0.503993 7.18939C0.456773 8.91506 1.07252 10.5932 2.22462 11.8788C3.37673 13.1645 4.97762 13.9598 6.69812 14.1013C8.41862 14.2428 10.128 13.7198 11.4746 12.6397L14.2346 15.3997C14.3044 15.47 14.3873 15.5258 14.4787 15.5639C14.5701 15.6019 14.6681 15.6216 14.7671 15.6216C14.8662 15.6216 14.9642 15.6019 15.0556 15.5639C15.147 15.5258 15.2299 15.47 15.2996 15.3997C15.4348 15.2599 15.5104 15.073 15.5104 14.8785C15.5104 14.684 15.4348 14.4971 15.2996 14.3572ZM7.26714 12.6397C6.22879 12.6397 5.21376 12.3318 4.3504 11.7549C3.48704 11.178 2.81413 10.3581 2.41677 9.39879C2.01941 8.43948 1.91545 7.38388 2.11802 6.36548C2.32059 5.34708 2.82061 4.41162 3.55483 3.67739C4.28906 2.94316 5.22452 2.44315 6.24292 2.24058C7.26132 2.038 8.31692 2.14197 9.27623 2.53933C10.2355 2.93669 11.0555 3.6096 11.6324 4.47296C12.2092 5.33631 12.5171 6.35135 12.5171 7.3897C12.5171 8.78209 11.964 10.1174 10.9795 11.102C9.99489 12.0866 8.65953 12.6397 7.26714 12.6397Z" fill="currentColor"/>
</svg>`,
  CROSS: `<svg width="24" class="cross-svg" height="24" viewBox="0 0 24 24" fill="none"
xmlns="http://www.w3.org/2000/svg">
<path d="M13.4099 11.9999L19.7099 5.70994C19.8982 5.52164 20.004 5.26624 20.004 4.99994C20.004 4.73364 19.8982 4.47825 19.7099 4.28994C19.5216 4.10164 19.2662 3.99585 18.9999 3.99585C18.7336 3.99585 18.4782 4.10164 18.2899 4.28994L11.9999 10.5899L5.70994 4.28994C5.52164 4.10164 5.26624 3.99585 4.99994 3.99585C4.73364 3.99585 4.47824 4.10164 4.28994 4.28994C4.10164 4.47825 3.99585 4.73364 3.99585 4.99994C3.99585 5.26624 4.10164 5.52164 4.28994 5.70994L10.5899 11.9999L4.28994 18.2899C4.19621 18.3829 4.12182 18.4935 4.07105 18.6154C4.02028 18.7372 3.99414 18.8679 3.99414 18.9999C3.99414 19.132 4.02028 19.2627 4.07105 19.3845C4.12182 19.5064 4.19621 19.617 4.28994 19.7099C4.3829 19.8037 4.4935 19.8781 4.61536 19.9288C4.73722 19.9796 4.86793 20.0057 4.99994 20.0057C5.13195 20.0057 5.26266 19.9796 5.38452 19.9288C5.50638 19.8781 5.61698 19.8037 5.70994 19.7099L11.9999 13.4099L18.2899 19.7099C18.3829 19.8037 18.4935 19.8781 18.6154 19.9288C18.7372 19.9796 18.8679 20.0057 18.9999 20.0057C19.132 20.0057 19.2627 19.9796 19.3845 19.9288C19.5064 19.8781 19.617 19.8037 19.7099 19.7099C19.8037 19.617 19.8781 19.5064 19.9288 19.3845C19.9796 19.2627 20.0057 19.132 20.0057 18.9999C20.0057 18.8679 19.9796 18.7372 19.9288 18.6154C19.8781 18.4935 19.8037 18.3829 19.7099 18.2899L13.4099 11.9999Z" fill="currentColor"/>
</svg>
`
}, oi = (t, e, r = !1) => {
  let o;
  return function(...a) {
    return o === void 0 && r && t.apply(this, a), clearTimeout(o), o = setTimeout(() => t.apply(this, a), e), o;
  };
}, oo = (t) => "https://knit-dev-public.s3.ap-south-1.amazonaws.com/ui-auth-component/app_logos/short/" + t + ".svg", Kt = (t) => "https://knit-dev-public.s3.ap-south-1.amazonaws.com/ui-auth-component/app_logos/full/" + t + ".svg", _e = (t) => "https://knit-dev-public.s3.ap-south-1.amazonaws.com/ui-auth-component/comp_logos/" + t + ".svg";
var ai = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, He = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? ii(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && ai(e, r, a), a;
};
let St = class extends C {
  constructor() {
    super(...arguments), this.categoryData = [], this.categoryKey = "";
  }
  render() {
    return f`
      <div
        class="category-panel-wrapper w-100 cursor-pointer"
        @click=${this._onCategorySelect}
      >
        <p class="category-panel-title mb-0">
          ${this.categoryKey.length ? ri[this.categoryKey] : "Category Title"}
        </p>
        <div class="integrations-logos d-flex flex-wrap mx-0">
          ${Lt(
      this.categoryData,
      (t, e) => e <= 5 ? f`
                  ${t != null && t.logo ? f`<img
                        key=${t.id}
                        height="24"
                        class="logo-img"
                        src=${oo(t.id)}
                        alt=${t.label || "Application Logo"}
                      />` : null}
                ` : null
    )}
          ${this.categoryData.length > 10 ? f`<p class="  more-text">
                + ${this.categoryData.length - 10} more
              </p>` : null}
        </div>
      </div>
    `;
  }
  _onCategorySelect() {
    const t = new CustomEvent("onCategorySelect", {
      bubbles: !0,
      detail: {
        categoryKey: this.categoryKey
      }
    });
    this.dispatchEvent(t);
  }
  createRenderRoot() {
    return this;
  }
};
St.styles = [];
He([
  g()
], St.prototype, "categoryData", 2);
He([
  g({ type: String })
], St.prototype, "categoryKey", 2);
St = He([
  _("category-panel")
], St);
var ni = Object.defineProperty, si = Object.getOwnPropertyDescriptor, Ve = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? si(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && ni(e, r, a), a;
};
let $t = class extends C {
  constructor() {
    super(...arguments), this.categoryList = {}, this.internalStep = 0;
  }
  render() {
    return f`
      <div class="category-selection-step-header">
        <p class="mb-0 category-selection-title">
          Select a category to integrate with
        </p>
      </div>
      <div class="category-selection-list">
        ${Lt(
      Object.keys(this.categoryList),
      (t) => f`
            <category-panel
              @onCategorySelect=${this._setSelectedCategory}
              .categoryData=${this.categoryList[t]}
              .categoryKey=${t}
              .key=${t}
            ></category-panel>
          `
    )}
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
  _setSelectedCategory(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("selectCategory", {
      bubbles: !0,
      detail: {
        categoryTitle: t == null ? void 0 : t.detail.categoryKey
      }
    });
    this.dispatchEvent(e);
  }
};
$t.styles = [];
Ve([
  g()
], $t.prototype, "categoryList", 2);
Ve([
  g({ type: Number })
], $t.prototype, "internalStep", 2);
$t = Ve([
  _("category-selection")
], $t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const li = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ao = (t) => (...e) => ({ _$litDirective$: t, values: e });
class di {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, r, o) {
    this._$Ct = e, this._$AM = r, this._$Ci = o;
  }
  _$AS(e, r) {
    return this.update(e, r);
  }
  update(e, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Jt extends di {
  constructor(e) {
    if (super(e), this.it = S, e.type !== li.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === S || e == null)
      return this._t = void 0, this.it = e;
    if (e === Q)
      return e;
    if (typeof e != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it)
      return this._t;
    this.it = e;
    const r = [e];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
Jt.directiveName = "unsafeHTML", Jt.resultType = 1;
const X = ao(Jt);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Ae extends Jt {
}
Ae.directiveName = "unsafeSVG", Ae.resultType = 2;
const j = ao(Ae);
var pi = Object.defineProperty, ci = Object.getOwnPropertyDescriptor, qe = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? ci(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && pi(e, r, a), a;
};
let Zt = class extends C {
  constructor() {
    super(...arguments), this.adminMode = !1, this.text = "You can close this window now.";
  }
  connectedCallback() {
    super.connectedCallback(), this.adminMode && this._tryAgain();
  }
  render() {
    return f`<div
      class="full-panel px-4 email-sent py-4 flex-wrap d-flex justify-content-center align-items-center"
    >
      ${j(D.EMAIL)}
      <p class="text-center w-100 mt-1 mb-1">Approval request sent</p>
      <p class="text-center w-100 mt-0">${this.text}</p>
      <button class="primary" @click=${this._tryAgain}>Try again</button>
    </div>`;
  }
  _tryAgain(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("tryAgain", {
      bubbles: !1
    });
    this.dispatchEvent(e);
  }
  createRenderRoot() {
    return this;
  }
};
qe([
  g()
], Zt.prototype, "adminMode", 2);
qe([
  g()
], Zt.prototype, "text", 2);
Zt = qe([
  _("email-sent")
], Zt);
function nt(t) {
  return t.split("-")[1];
}
function io(t) {
  return t === "y" ? "height" : "width";
}
function ft(t) {
  return t.split("-")[0];
}
function se(t) {
  return ["top", "bottom"].includes(ft(t)) ? "x" : "y";
}
function yr(t, e, r) {
  let {
    reference: o,
    floating: a
  } = t;
  const i = o.x + o.width / 2 - a.width / 2, n = o.y + o.height / 2 - a.height / 2, s = se(e), d = io(s), l = o[d] / 2 - a[d] / 2, m = ft(e), c = s === "x";
  let u;
  switch (m) {
    case "top":
      u = {
        x: i,
        y: o.y - a.height
      };
      break;
    case "bottom":
      u = {
        x: i,
        y: o.y + o.height
      };
      break;
    case "right":
      u = {
        x: o.x + o.width,
        y: n
      };
      break;
    case "left":
      u = {
        x: o.x - a.width,
        y: n
      };
      break;
    default:
      u = {
        x: o.x,
        y: o.y
      };
  }
  switch (nt(e)) {
    case "start":
      u[s] -= l * (r && c ? -1 : 1);
      break;
    case "end":
      u[s] += l * (r && c ? -1 : 1);
      break;
  }
  return u;
}
const mi = async (t, e, r) => {
  const {
    placement: o = "bottom",
    strategy: a = "absolute",
    middleware: i = [],
    platform: n
  } = r, s = i.filter(Boolean), d = await (n.isRTL == null ? void 0 : n.isRTL(e));
  if (process.env.NODE_ENV !== "production") {
    if (n == null && console.error(["Floating UI: `platform` property was not passed to config. If you", "want to use Floating UI on the web, install @floating-ui/dom", "instead of the /core package. Otherwise, you can create your own", "`platform`: https://floating-ui.com/docs/platform"].join(" ")), s.filter((v) => {
      let {
        name: y
      } = v;
      return y === "autoPlacement" || y === "flip";
    }).length > 1)
      throw new Error(["Floating UI: duplicate `flip` and/or `autoPlacement` middleware", "detected. This will lead to an infinite loop. Ensure only one of", "either has been passed to the `middleware` array."].join(" "));
    (!t || !e) && console.error(["Floating UI: The reference and/or floating element was not defined", "when `computePosition()` was called. Ensure that both elements have", "been created and can be measured."].join(" "));
  }
  let l = await n.getElementRects({
    reference: t,
    floating: e,
    strategy: a
  }), {
    x: m,
    y: c
  } = yr(l, o, d), u = o, h = {}, b = 0;
  for (let v = 0; v < s.length; v++) {
    const {
      name: y,
      fn: x
    } = s[v], {
      x: k,
      y: E,
      data: P,
      reset: z
    } = await x({
      x: m,
      y: c,
      initialPlacement: o,
      placement: u,
      strategy: a,
      middlewareData: h,
      rects: l,
      platform: n,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (m = k != null ? k : m, c = E != null ? E : c, h = {
      ...h,
      [y]: {
        ...h[y],
        ...P
      }
    }, process.env.NODE_ENV !== "production" && b > 50 && console.warn(["Floating UI: The middleware lifecycle appears to be running in an", "infinite loop. This is usually caused by a `reset` continually", "being returned without a break condition."].join(" ")), z && b <= 50) {
      b++, typeof z == "object" && (z.placement && (u = z.placement), z.rects && (l = z.rects === !0 ? await n.getElementRects({
        reference: t,
        floating: e,
        strategy: a
      }) : z.rects), {
        x: m,
        y: c
      } = yr(l, u, d)), v = -1;
      continue;
    }
  }
  return {
    x: m,
    y: c,
    placement: u,
    strategy: a,
    middlewareData: h
  };
};
function bi(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function gi(t) {
  return typeof t != "number" ? bi(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Gt(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function no(t, e) {
  var r;
  e === void 0 && (e = {});
  const {
    x: o,
    y: a,
    platform: i,
    rects: n,
    elements: s,
    strategy: d
  } = t, {
    boundary: l = "clippingAncestors",
    rootBoundary: m = "viewport",
    elementContext: c = "floating",
    altBoundary: u = !1,
    padding: h = 0
  } = e, b = gi(h), y = s[u ? c === "floating" ? "reference" : "floating" : c], x = Gt(await i.getClippingRect({
    element: (r = await (i.isElement == null ? void 0 : i.isElement(y))) == null || r ? y : y.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: l,
    rootBoundary: m,
    strategy: d
  })), k = c === "floating" ? {
    ...n.floating,
    x: o,
    y: a
  } : n.reference, E = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), P = await (i.isElement == null ? void 0 : i.isElement(E)) ? await (i.getScale == null ? void 0 : i.getScale(E)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, z = Gt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: k,
    offsetParent: E,
    strategy: d
  }) : k);
  return process.env.NODE_ENV, {
    top: (x.top - z.top + b.top) / P.y,
    bottom: (z.bottom - x.bottom + b.bottom) / P.y,
    left: (x.left - z.left + b.left) / P.x,
    right: (z.right - x.right + b.right) / P.x
  };
}
const fi = Math.min, ui = Math.max;
function kr(t, e, r) {
  return ui(t, fi(e, r));
}
const hi = ["top", "right", "bottom", "left"], Cr = /* @__PURE__ */ hi.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []), vi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Er(t) {
  return t.replace(/left|right|bottom|top/g, (e) => vi[e]);
}
function xi(t, e, r) {
  r === void 0 && (r = !1);
  const o = nt(t), a = se(t), i = io(a);
  let n = a === "x" ? o === (r ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[i] > e.floating[i] && (n = Er(n)), {
    main: n,
    cross: Er(n)
  };
}
const wi = {
  start: "end",
  end: "start"
};
function yi(t) {
  return t.replace(/start|end/g, (e) => wi[e]);
}
function ki(t, e, r) {
  return (t ? [...r.filter((a) => nt(a) === t), ...r.filter((a) => nt(a) !== t)] : r.filter((a) => ft(a) === a)).filter((a) => t ? nt(a) === t || (e ? yi(a) !== a : !1) : !0);
}
const Ci = function(t) {
  return t === void 0 && (t = {}), {
    name: "autoPlacement",
    options: t,
    async fn(e) {
      var r, o, a;
      const {
        rects: i,
        middlewareData: n,
        placement: s,
        platform: d,
        elements: l
      } = e, {
        alignment: m,
        allowedPlacements: c = Cr,
        autoAlignment: u = !0,
        ...h
      } = t, b = m !== void 0 || c === Cr ? ki(m || null, u, c) : c, v = await no(e, h), y = ((r = n.autoPlacement) == null ? void 0 : r.index) || 0, x = b[y];
      if (x == null)
        return {};
      const {
        main: k,
        cross: E
      } = xi(x, i, await (d.isRTL == null ? void 0 : d.isRTL(l.floating)));
      if (s !== x)
        return {
          reset: {
            placement: b[0]
          }
        };
      const P = [v[ft(x)], v[k], v[E]], z = [...((o = n.autoPlacement) == null ? void 0 : o.overflows) || [], {
        placement: x,
        overflows: P
      }], Ge = b[y + 1];
      if (Ge)
        return {
          data: {
            index: y + 1,
            overflows: z
          },
          reset: {
            placement: Ge
          }
        };
      const Ye = z.slice().sort((me, be) => me.overflows[0] - be.overflows[0]), Xe = ((a = Ye.find((me) => {
        let {
          overflows: be
        } = me;
        return be.every((ko) => ko <= 0);
      })) == null ? void 0 : a.placement) || Ye[0].placement;
      return Xe !== s ? {
        data: {
          index: y + 1,
          overflows: z
        },
        reset: {
          placement: Xe
        }
      } : {};
    }
  };
};
async function Ei(t, e) {
  const {
    placement: r,
    platform: o,
    elements: a
  } = t, i = await (o.isRTL == null ? void 0 : o.isRTL(a.floating)), n = ft(r), s = nt(r), d = se(r) === "x", l = ["left", "top"].includes(n) ? -1 : 1, m = i && d ? -1 : 1, c = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: u,
    crossAxis: h,
    alignmentAxis: b
  } = typeof c == "number" ? {
    mainAxis: c,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...c
  };
  return s && typeof b == "number" && (h = s === "end" ? b * -1 : b), d ? {
    x: h * m,
    y: u * l
  } : {
    x: u * l,
    y: h * m
  };
}
const Si = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: r,
        y: o
      } = e, a = await Ei(e, t);
      return {
        x: r + a.x,
        y: o + a.y,
        data: a
      };
    }
  };
};
function $i(t) {
  return t === "x" ? "y" : "x";
}
const _i = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: r,
        y: o,
        placement: a
      } = e, {
        mainAxis: i = !0,
        crossAxis: n = !1,
        limiter: s = {
          fn: (y) => {
            let {
              x,
              y: k
            } = y;
            return {
              x,
              y: k
            };
          }
        },
        ...d
      } = t, l = {
        x: r,
        y: o
      }, m = await no(e, d), c = se(ft(a)), u = $i(c);
      let h = l[c], b = l[u];
      if (i) {
        const y = c === "y" ? "top" : "left", x = c === "y" ? "bottom" : "right", k = h + m[y], E = h - m[x];
        h = kr(k, h, E);
      }
      if (n) {
        const y = u === "y" ? "top" : "left", x = u === "y" ? "bottom" : "right", k = b + m[y], E = b - m[x];
        b = kr(k, b, E);
      }
      const v = s.fn({
        ...e,
        [c]: h,
        [u]: b
      });
      return {
        ...v,
        data: {
          x: v.x - r,
          y: v.y - o
        }
      };
    }
  };
};
function U(t) {
  var e;
  return ((e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function N(t) {
  return U(t).getComputedStyle(t);
}
function W(t) {
  return lo(t) ? (t.nodeName || "").toLowerCase() : "";
}
let Ft;
function so() {
  if (Ft)
    return Ft;
  const t = navigator.userAgentData;
  return t && Array.isArray(t.brands) ? (Ft = t.brands.map((e) => e.brand + "/" + e.version).join(" "), Ft) : navigator.userAgent;
}
function M(t) {
  return t instanceof U(t).HTMLElement;
}
function K(t) {
  return t instanceof U(t).Element;
}
function lo(t) {
  return t instanceof U(t).Node;
}
function Sr(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = U(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function le(t) {
  const {
    overflow: e,
    overflowX: r,
    overflowY: o,
    display: a
  } = N(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + r) && !["inline", "contents"].includes(a);
}
function Ai(t) {
  return ["table", "td", "th"].includes(W(t));
}
function We(t) {
  const e = /firefox/i.test(so()), r = N(t), o = r.backdropFilter || r.WebkitBackdropFilter;
  return r.transform !== "none" || r.perspective !== "none" || (o ? o !== "none" : !1) || e && r.willChange === "filter" || e && (r.filter ? r.filter !== "none" : !1) || ["transform", "perspective"].some((a) => r.willChange.includes(a)) || ["paint", "layout", "strict", "content"].some(
    (a) => {
      const i = r.contain;
      return i != null ? i.includes(a) : !1;
    }
  );
}
function po() {
  return !/^((?!chrome|android).)*safari/i.test(so());
}
function Ke(t) {
  return ["html", "body", "#document"].includes(W(t));
}
const $r = Math.min, wt = Math.max, Yt = Math.round;
function co(t) {
  const e = N(t);
  let r = parseFloat(e.width), o = parseFloat(e.height);
  const a = t.offsetWidth, i = t.offsetHeight, n = Yt(r) !== a || Yt(o) !== i;
  return n && (r = a, o = i), {
    width: r,
    height: o,
    fallback: n
  };
}
function mo(t) {
  return K(t) ? t : t.contextElement;
}
const bo = {
  x: 1,
  y: 1
};
function st(t) {
  const e = mo(t);
  if (!M(e))
    return bo;
  const r = e.getBoundingClientRect(), {
    width: o,
    height: a,
    fallback: i
  } = co(e);
  let n = (i ? Yt(r.width) : r.width) / o, s = (i ? Yt(r.height) : r.height) / a;
  return (!n || !Number.isFinite(n)) && (n = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: n,
    y: s
  };
}
function _t(t, e, r, o) {
  var a, i;
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  const n = t.getBoundingClientRect(), s = mo(t);
  let d = bo;
  e && (o ? K(o) && (d = st(o)) : d = st(t));
  const l = s ? U(s) : window, m = !po() && r;
  let c = (n.left + (m && ((a = l.visualViewport) == null ? void 0 : a.offsetLeft) || 0)) / d.x, u = (n.top + (m && ((i = l.visualViewport) == null ? void 0 : i.offsetTop) || 0)) / d.y, h = n.width / d.x, b = n.height / d.y;
  if (s) {
    const v = U(s), y = o && K(o) ? U(o) : o;
    let x = v.frameElement;
    for (; x && o && y !== v; ) {
      const k = st(x), E = x.getBoundingClientRect(), P = getComputedStyle(x);
      E.x += (x.clientLeft + parseFloat(P.paddingLeft)) * k.x, E.y += (x.clientTop + parseFloat(P.paddingTop)) * k.y, c *= k.x, u *= k.y, h *= k.x, b *= k.y, c += E.x, u += E.y, x = U(x).frameElement;
    }
  }
  return {
    width: h,
    height: b,
    top: u,
    right: c + h,
    bottom: u + b,
    left: c,
    x: c,
    y: u
  };
}
function G(t) {
  return ((lo(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function de(t) {
  return K(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function go(t) {
  return _t(G(t)).left + de(t).scrollLeft;
}
function zi(t, e, r) {
  const o = M(e), a = G(e), i = _t(t, !0, r === "fixed", e);
  let n = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if (o || !o && r !== "fixed")
    if ((W(e) !== "body" || le(a)) && (n = de(e)), M(e)) {
      const d = _t(e, !0);
      s.x = d.x + e.clientLeft, s.y = d.y + e.clientTop;
    } else
      a && (s.x = go(a));
  return {
    x: i.left + n.scrollLeft - s.x,
    y: i.top + n.scrollTop - s.y,
    width: i.width,
    height: i.height
  };
}
function At(t) {
  if (W(t) === "html")
    return t;
  const e = t.assignedSlot || t.parentNode || (Sr(t) ? t.host : null) || G(t);
  return Sr(e) ? e.host : e;
}
function _r(t) {
  return !M(t) || N(t).position === "fixed" ? null : t.offsetParent;
}
function Di(t) {
  let e = At(t);
  for (; M(e) && !Ke(e); ) {
    if (We(e))
      return e;
    e = At(e);
  }
  return null;
}
function Ar(t) {
  const e = U(t);
  let r = _r(t);
  for (; r && Ai(r) && N(r).position === "static"; )
    r = _r(r);
  return r && (W(r) === "html" || W(r) === "body" && N(r).position === "static" && !We(r)) ? e : r || Di(t) || e;
}
function Oi(t) {
  return co(t);
}
function Ti(t) {
  let {
    rect: e,
    offsetParent: r,
    strategy: o
  } = t;
  const a = M(r), i = G(r);
  if (r === i)
    return e;
  let n = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 1,
    y: 1
  };
  const d = {
    x: 0,
    y: 0
  };
  if ((a || !a && o !== "fixed") && ((W(r) !== "body" || le(i)) && (n = de(r)), M(r))) {
    const l = _t(r);
    s = st(r), d.x = l.x + r.clientLeft, d.y = l.y + r.clientTop;
  }
  return {
    width: e.width * s.x,
    height: e.height * s.y,
    x: e.x * s.x - n.scrollLeft * s.x + d.x,
    y: e.y * s.y - n.scrollTop * s.y + d.y
  };
}
function Ri(t, e) {
  const r = U(t), o = G(t), a = r.visualViewport;
  let i = o.clientWidth, n = o.clientHeight, s = 0, d = 0;
  if (a) {
    i = a.width, n = a.height;
    const l = po();
    (l || !l && e === "fixed") && (s = a.offsetLeft, d = a.offsetTop);
  }
  return {
    width: i,
    height: n,
    x: s,
    y: d
  };
}
function Pi(t) {
  var e;
  const r = G(t), o = de(t), a = (e = t.ownerDocument) == null ? void 0 : e.body, i = wt(r.scrollWidth, r.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0), n = wt(r.scrollHeight, r.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0);
  let s = -o.scrollLeft + go(t);
  const d = -o.scrollTop;
  return N(a || r).direction === "rtl" && (s += wt(r.clientWidth, a ? a.clientWidth : 0) - i), {
    width: i,
    height: n,
    x: s,
    y: d
  };
}
function fo(t) {
  const e = At(t);
  return Ke(e) ? t.ownerDocument.body : M(e) && le(e) ? e : fo(e);
}
function uo(t, e) {
  var r;
  e === void 0 && (e = []);
  const o = fo(t), a = o === ((r = t.ownerDocument) == null ? void 0 : r.body), i = U(o);
  return a ? e.concat(i, i.visualViewport || [], le(o) ? o : []) : e.concat(o, uo(o));
}
function Li(t, e) {
  const r = _t(t, !0, e === "fixed"), o = r.top + t.clientTop, a = r.left + t.clientLeft, i = M(t) ? st(t) : {
    x: 1,
    y: 1
  }, n = t.clientWidth * i.x, s = t.clientHeight * i.y, d = a * i.x, l = o * i.y;
  return {
    top: l,
    left: d,
    right: d + n,
    bottom: l + s,
    x: d,
    y: l,
    width: n,
    height: s
  };
}
function zr(t, e, r) {
  return e === "viewport" ? Gt(Ri(t, r)) : K(e) ? Li(e, r) : Gt(Pi(G(t)));
}
function Ui(t, e) {
  const r = e.get(t);
  if (r)
    return r;
  let o = uo(t).filter((s) => K(s) && W(s) !== "body"), a = null;
  const i = N(t).position === "fixed";
  let n = i ? At(t) : t;
  for (; K(n) && !Ke(n); ) {
    const s = N(n), d = We(n);
    (i ? !d && !a : !d && s.position === "static" && !!a && ["absolute", "fixed"].includes(a.position)) ? o = o.filter((m) => m !== n) : a = s, n = At(n);
  }
  return e.set(t, o), o;
}
function ji(t) {
  let {
    element: e,
    boundary: r,
    rootBoundary: o,
    strategy: a
  } = t;
  const n = [...r === "clippingAncestors" ? Ui(e, this._c) : [].concat(r), o], s = n[0], d = n.reduce((l, m) => {
    const c = zr(e, m, a);
    return l.top = wt(c.top, l.top), l.right = $r(c.right, l.right), l.bottom = $r(c.bottom, l.bottom), l.left = wt(c.left, l.left), l;
  }, zr(e, s, a));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
const Fi = {
  getClippingRect: ji,
  convertOffsetParentRelativeRectToViewportRelativeRect: Ti,
  isElement: K,
  getDimensions: Oi,
  getOffsetParent: Ar,
  getDocumentElement: G,
  getScale: st,
  async getElementRects(t) {
    let {
      reference: e,
      floating: r,
      strategy: o
    } = t;
    const a = this.getOffsetParent || Ar, i = this.getDimensions;
    return {
      reference: zi(e, await a(r), o),
      floating: {
        x: 0,
        y: 0,
        ...await i(r)
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => N(t).direction === "rtl"
}, Bi = (t, e, r) => {
  const o = /* @__PURE__ */ new Map(), a = {
    platform: Fi,
    ...r
  }, i = {
    ...a.platform,
    _c: o
  };
  return mi(t, e, {
    ...a,
    platform: i
  });
};
var Ni = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, ho = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Ii(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && Ni(e, r, a), a;
};
const Dr = ["pointerenter", "focus"], Or = ["pointerleave", "blur", "keydown", "click"];
let Xt = class extends C {
  constructor() {
    super(...arguments), this.offset = 4, this._target = null, this.show = () => {
      this.style.cssText = "", Bi(this.target, this, {
        strategy: "fixed",
        middleware: [
          Si(0),
          _i(),
          Ci({ allowedPlacements: ["top", "bottom"] })
        ]
      }).then(({ x: t, y: e }) => {
        this.style.left = `${t}px`, this.style.top = `${e}px`;
      });
    }, this.hide = () => {
      this.style.display = "none";
    };
  }
  get target() {
    return this._target;
  }
  set target(t) {
    this.target && (Dr.forEach(
      (e) => this.target.removeEventListener(e, this.show)
    ), Or.forEach(
      (e) => this.target.removeEventListener(e, this.hide)
    )), t && (Dr.forEach((e) => t.addEventListener(e, this.show)), Or.forEach((e) => t.addEventListener(e, this.hide))), this._target = t;
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), this.hide(), (t = this.target) != null || (this.target = this.previousElementSibling);
  }
  render() {
    return f`<slot></slot>`;
  }
};
Xt.styles = Ot`
    :host {
      display: inline-block !important;
      position: fixed;
      padding: 4px;
      border: 1px solid darkgray;
      border-radius: 4px;
      background: #ccc;
      pointer-events: none;
    }
  `;
ho([
  g({ type: Number })
], Xt.prototype, "offset", 2);
Xt = ho([
  _("simple-tooltip")
], Xt);
var Mi = Object.defineProperty, Hi = Object.getOwnPropertyDescriptor, ot = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Hi(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && Mi(e, r, a), a;
};
let J = class extends C {
  constructor() {
    super(...arguments), this.appData = mt, this.checkStep = 0, this.sendingEmail = !1, this.sendError = !1, this.authSessionToken = "", this.adminEmail = "";
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return f`
      ${gt(this.checkStep, [
      [
        0,
        () => f` <div
              class="admin-check-step-header d-flex justify-content-center pt-3"
            >
              <img
                src=${Kt(this.appData.id)}
                alt=${this.appData.label}
                height="48"
              />
            </div>
            <div class="admin-check-step-content px-4">
              <p class="admin-check-step-question mb-0 py-1">
                Are you the admin for ${this.appData.label}?
              </p>
              <div
                class="admin-check-step-actions d-flex justify-content-between pt-5 mt-4 px-5 mx-5"
              >
                <button class="primary-alt" @click=${this._nextCheckStep}>
                  No
                </button>
                <button class="primary" @click=${this._skipStep}>Yes</button>
              </div>
            </div>`
      ],
      [
        1,
        () => f` <div
              class="admin-check-step-header d-flex justify-content-center pt-3"
            >
              <img
                src=${Kt(this.appData.id)}
                alt=${this.appData.label}
                height="48"
              />
            </div>
            <div class="admin-check-step-content px-4">
              <p class="admin-check-step-question mb-0 py-1">
                ${this.appData.waitingEmail ? `Authorization approval email was sent to ${this.appData.waitingEmail}. Do you wish to resend / send to another email id?` : `Since you are not the admin, you can type in the admin's email
               ID and ask for approval?`}
              </p>
              <form
                id="knit-admin-check-form"
                class="admin-check-step-form "
                @submit=${this._sendEmail}
              >
                <div class="input-group my-3 px-4">
                  <input
                    name="email"
                    type="email"
                    required
                    autocomplete="off"
                    value=${this.adminEmail}
                    @input=${this._onChange}
                    class="form-control"
                    placeholder="Enter admin's email id"
                    aria-label="Email"
                  />
                </div>
              </form>
              <div
                class="admin-check-step-actions d-flex justify-content-between align-items-center py-2 px-4"
              >
                <button class="primary-alt" @click=${this._skipStep}>
                  Continue, I'm the admin
                </button>
                <div class="d-flex justify-content-center align-items-center">
                  <button
                    class="primary"
                    type="submit"
                    .disabled=${this.sendingEmail}
                    form="knit-admin-check-form"
                  >
                    ${this.sendingEmail ? f`<div
                          class="spinner-border"
                          style="height:20px;width:20px;"
                          role="status"
                        >
                          <span class="visually-hidden">Loading...</span>
                        </div>` : "Send Authorization link to admin"}
                  </button>
                  ${j(D.INFO)}
                </div>
              </div>
            </div>`
      ],
      [
        2,
        () => f`${this.sendError ? f`<tryagain-error />` : f`<email-sent
                  @tryAgain=${this._tryAgain}
                  class="full-panel"
                  .text=${`Please check-in with ${this.appData.label} admin ( ${this.adminEmail} ) for approval. You can close this window now.`}
                />`}`
      ]
    ])}
    `;
  }
  createRenderRoot() {
    return this;
  }
  _nextCheckStep(t) {
    t == null || t.preventDefault(), this.checkStep < 2 && (this.checkStep = this.checkStep + 1);
  }
  _onChange(t) {
    t == null || t.preventDefault(), this.adminEmail = t.target.value;
  }
  _skipStep(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("nextStep", {
      bubbles: !1
    });
    this.dispatchEvent(e);
  }
  _tryAgain(t) {
    t == null || t.preventDefault(), this.checkStep = 0;
  }
  _sendEmail(t) {
    this.sendingEmail = !0, console.log("cubmit called"), t == null || t.preventDefault(), xt.post(
      "app.verifyAdmin",
      {
        appId: this.appData.id,
        emailId: this.adminEmail,
        appName: this.appData.label,
        category: this.appData.category
      },
      {
        headers: {
          Authorization: `Bearer ${this.authSessionToken}`
        }
      }
    ).then(() => {
      this._nextCheckStep();
      const e = new CustomEvent("updateAppData", {
        detail: {
          appData: { ...this.appData, waitingEmail: this.adminEmail }
        },
        bubbles: !1
      });
      this.dispatchEvent(e);
    }).catch((e) => {
      console.error(e), this.sendError = !0;
    }).finally(() => {
      this.sendingEmail = !1;
    });
  }
};
ot([
  g()
], J.prototype, "appData", 2);
ot([
  g({ type: Number })
], J.prototype, "checkStep", 2);
ot([
  g({ type: Boolean })
], J.prototype, "sendingEmail", 2);
ot([
  g({ type: Boolean })
], J.prototype, "sendError", 2);
ot([
  g({ type: String })
], J.prototype, "authSessionToken", 2);
ot([
  g({ type: String })
], J.prototype, "adminEmail", 2);
J = ot([
  _("admin-check")
], J);
var Vi = Object.defineProperty, qi = Object.getOwnPropertyDescriptor, vo = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? qi(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && Vi(e, r, a), a;
};
let ze = class extends C {
  constructor() {
    super(...arguments), this.text = "Loading...";
  }
  render() {
    return f`<div
      class="full-panel   auth-success px-4  py-4 flex-wrap d-flex justify-content-center align-items-center"
    >
      ${j(D.CHECK_CIRCLE)}
      <p class="text-center w-100 mt-4">Authorization Successful</p>
    </div>`;
  }
  createRenderRoot() {
    return this;
  }
};
vo([
  g()
], ze.prototype, "text", 2);
ze = vo([
  _("auth-success")
], ze);
var Wi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, Je = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Ki(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && Wi(e, r, a), a;
};
let Qt = class extends C {
  constructor() {
    super(...arguments), this.appData = mt, this.adminMode = !1;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return f`
      ${gt(this.appData.status.state, [
      [
        "email_sent",
        () => f` <email-sent
              .adminMode=${this.adminMode}
              @tryAgain=${this._nextStep}
              .text=${`Please check-in with ${this.appData.label} admin ( ${this.appData.status.statusDetails.email} ) for approval. You can close this window now.`}
            />`
      ],
      ["success", () => f` <auth-success />`],
      [
        "error",
        () => f`<tryagain-error
              class="full-panel"
              .errorType=${"integration"}
              .errorArr=${this.appData.status.statusDetails.errors}
              @tryAgain=${this._nextStep}
            />`
      ],
      [
        "in_validation",
        () => f`<awaiting-auth .awaitType=${"in_validation"} />`
      ]
    ])}
    `;
  }
  createRenderRoot() {
    return this;
  }
  _nextStep(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("nextStep", {
      bubbles: !1
    });
    this.dispatchEvent(e);
  }
};
Je([
  g()
], Qt.prototype, "appData", 2);
Je([
  g()
], Qt.prototype, "adminMode", 2);
Qt = Je([
  _("status-check")
], Qt);
var Ji = Object.defineProperty, Zi = Object.getOwnPropertyDescriptor, Ut = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Zi(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && Ji(e, r, a), a;
};
let et = class extends C {
  constructor() {
    super(...arguments), this.searchQuery = "", this.categoryKey = "", this.integrationsList = [], this.filteredList = [];
  }
  render() {
    return f`
      <div class="integration-selection-step-header">
        <p class="mb-0 integration-selection-step-header-title ">
          ${this.categoryKey}
        </p>

        <p class="mb-0 integration-selection-step-header-subtitle ">
          Select an application
        </p>
      </div>
      <div class="input-group integration-selection-step-search">
        <span class="input-group-text" id="search-bar"
          >${j(D.SEARCH)}</span
        >
        <input
          @input=${(t) => {
      oi(this._onQueryChange(t), 2e3);
    }}
          placeholder="Search"
          class="form-control"
          aria-label="Search"
          aria-describedby="search-bar"
        />
      </div>

      <div class="integrations-wrapper d-flex flex-wrap">
        ${Lt(
      this.filteredList,
      (t, e) => f` <div
              class="integration-box d-flex flex-column cursor-pointer"
              key=${t.id + e}
              @click=${(r) => this._onIntegrationSelect(r, t)}
            >
              ${t.status.state != "open" ? f` ${j(this._getStatusSrc(t.status.state))} ` : null}
              <div class="d-flex justify-content-center">
                <img
                  src=${oo(t.id)}
                  alt=${t.label}
                  class="mx-auto"
                />
              </div>
              <div class="text-container d-flex align-items-center">
                <p class="mb-0 text-center w-100">${t.label}</p>
              </div>
            </div>
            <div></div>`
    )}
      </div>
    `;
  }
  _onQueryChange(t) {
    var e;
    ((e = t.target.value) == null ? void 0 : e.length) > 0 ? this.filteredList = this.integrationsList.filter(
      (r) => r == null ? void 0 : r.label.toLowerCase().includes(t.target.value.toLowerCase())
    ) : this.filteredList = this.integrationsList;
  }
  _getStatusSrc(t) {
    switch (t) {
      case "success":
        return D.CHECK_CIRCLE;
      case "error":
        return D.CROSS_CIRCLE;
      case "in_validation":
        return D.HOURGLASS;
      case "email_sent":
        return D.EMAIL;
      default:
        return D.HOURGLASS;
    }
  }
  _onIntegrationSelect(t, e) {
    t == null || t.preventDefault();
    const r = new CustomEvent("onIntegrationSelect", {
      bubbles: !0,
      detail: {
        appId: e.id
      }
    });
    this.dispatchEvent(r);
  }
  createRenderRoot() {
    return this;
  }
  updated(t) {
    t.has("integrationsList") && (this.filteredList = this.integrationsList);
  }
};
et.styles = [];
Ut([
  g({ state: !0 })
], et.prototype, "searchQuery", 2);
Ut([
  g()
], et.prototype, "categoryKey", 2);
Ut([
  g()
], et.prototype, "integrationsList", 2);
Ut([
  g()
], et.prototype, "filteredList", 2);
et = Ut([
  _("integration-selection")
], et);
const Gi = Ot`
  .d-block {
    display: block;
  }
  .w-inherit {
    width: inherit;
  }
  .w-50 {
    width: 50%;
  }
  .w-100 {
    width: 100%;
  }
  .h-50 {
    height: 50%;
  }
  .h-80 {
    height: 80%;
  }
  .h-20 {
    height: 20%;
  }
  .h-100 {
    height: 100%;
  }
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .align-items-center {
    align-items: center;
  }
  .align-content-space {
    align-content: space-between;
  }
  .justify-content-center {
    justify-content: center;
  }
  .bg-transparent {
    background: transparent;
  }
  .color-grey {
    color: grey !important;
  }
  .header-btn {
    background: transparent;
    color: grey;
    border: unset;
    outline: unset;
    border-radius: 5px;
    padding: 0.3rem 0.5rem;
  }
  .header-btn:hover {
    background: lightgrey;
  }

  .divider-h {
    border: 1px solid black;
    width: 100%;
    margin: 0.5rem 0;
  }

  .base-btn {
    background: transparent;
    color: black;
    border: unset;
  }

  .cursor-pointer {
    cursor: pointer;
  }
  .fixed-bottom {
    position: absolute;
    bottom: 0;
  }
`;
var Yi = Object.defineProperty, Xi = Object.getOwnPropertyDescriptor, O = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? Xi(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && Yi(e, r, a), a;
};
let A = class extends C {
  constructor() {
    super(...arguments), this.eleId = "", this.styleWidth = 90, this.isRequired = !1, this.isProtected = !0, this.label = "", this.value = null, this.elementType = "", this.placeholder = "", this.dataType = "password", this.suffix = "", this.prefix = "", this.appLabel = "", this.tip = null, this.tipHidden = !0;
  }
  render() {
    return f` <div class="form-input-wrapper">
      <div class="form-input-header">
          <p class="form-input-header-label mb-2">Enter your ${this.appLabel} ${this.label}</p>
          ${this.tip ? f`<p
                  @click=${this._toggleTip}
                  class=${this.tipHidden ? "form-input-header-tip" : " form-input-header-tip tip-show "}
                >
                  ${this.tip.title}
                  <img class="ms-1" src=${_e("chevron")} alt="" />
                </p>` : null}
        </div>
        ${this.tip ? f`<div
                class="form-input-header-description ${this.tipHidden ? "" : "tip-show"}"
              >
                ${X(this.tip.description)}
              </div> ` : null}
        ${gt(this.elementType, [
      [
        "TEXTBOX",
        () => f`<div class="input-group mb-3">
              ${this.prefix && this.prefix.length > 0 ? f`<span class="input-group-text"
                    >${X(this.prefix)}</span
                  >` : null}
              <input
                type="text"
                name="${this.eleId}"
                value=${this.value}
                required="${this.isRequired}"
                placeholder=${this.placeholder}
                @input=${this._onChange}
                class="form-control"
                autocomplete="off"
                aria-label="Enter your ${this.appLabel} ${this.label} "
              />
              ${this.suffix && this.suffix.length > 0 ? f`<span class="input-group-text"
                    >${X(this.suffix)}</span
                  >` : null}
            </div> `
      ],
      [
        "URL_TEXTBOX",
        () => f`<div class="input-group mb-3">
              ${this.prefix && this.prefix.length > 0 ? f`<span class="input-group-text"
                    >${X(this.prefix)}</span
                  >` : null}
              <input
                type="text"
                name="${this.eleId}"
                value=${this.value}
                required="${this.isRequired}"
                placeholder=${this.placeholder}
                @input=${this._onChange}
                class="form-control"
                autocomplete="off"
                aria-label="Enter your ${this.appLabel} ${this.label} "
              />
              ${this.suffix && this.suffix.length > 0 ? f`<span class="input-group-text"
                    >${X(this.suffix)}</span
                  >` : null}
            </div> `
      ],
      [
        "SECRET_TEXTBOX",
        () => {
          var t;
          return f`<div class="input-group mb-3">
              ${this.prefix && this.prefix.length > 0 ? f`<span class="input-group-text"
                    >${X(this.prefix)}</span
                  >` : null}
              <input
                type="${this.isProtected ? "password" : "text"}"
                name="${this.eleId}"
                value=${this.value}
                required="${this.isRequired}"
                placeholder=${this.placeholder}
                @input=${this._onChange}
                class="form-control"
                autocomplete="off"
                aria-label="Enter your ${this.appLabel} ${this.label} "
              />
              ${((t = this.value) == null ? void 0 : t.length) > 0 ? f` <span
                    class="input-group-text"
                    @click=${this._toggleProtected}
                  >
                    <img
                      width="14"
                      src=${_e(
            this.isProtected ? "eye-show" : "eye-hide"
          )}
                  /></span>` : null}
            </div> `;
        }
      ],
      [
        "SELECT",
        () => f`<select
              class="form-select"
              selected=${this.value}
              required=${this.isRequired}
              name=${this.eleId}
              placeholder=${this.placeholder}
              @change=${this._onChange}
              autocomplete="off"
              aria-label="Select ${this.label}"
            >
              <option value="" disabled selected hidden>Select one</option>
              ${Lt(
          this.optionData,
          (t) => f`<option class="form-select-option" value=${t.id}>
                      ${t.label} &nbsp;
                    </option>
                    <br />`
        )}
            </select>`
      ]
    ])}
      </div>
    </div>`;
  }
  createRenderRoot() {
    return this;
  }
  _toggleProtected(t) {
    t == null || t.preventDefault(), this.isProtected = !this.isProtected;
  }
  _toggleTip(t) {
    t == null || t.preventDefault(), this.tipHidden = !this.tipHidden;
  }
  _onChange(t) {
    t.preventDefault(), console.log("onChange called");
    const e = new CustomEvent("onChange", {
      bubbles: !1,
      detail: {
        prefix: this.prefix.length > 0 ? this.prefix : null,
        formKey: t.target.name,
        formVal: t.target.value,
        elementType: this.elementType,
        suffix: this.suffix.length > 0 ? this.suffix : null
      }
    });
    this.dispatchEvent(e);
  }
};
O([
  g({ type: String })
], A.prototype, "eleId", 2);
O([
  g({ type: Number })
], A.prototype, "styleWidth", 2);
O([
  g({ type: Boolean })
], A.prototype, "isRequired", 2);
O([
  g({ type: Boolean, state: !0 })
], A.prototype, "isProtected", 2);
O([
  g({ type: String })
], A.prototype, "label", 2);
O([
  g()
], A.prototype, "value", 2);
O([
  g({ type: String })
], A.prototype, "elementType", 2);
O([
  g({ type: String })
], A.prototype, "placeholder", 2);
O([
  g({ type: String })
], A.prototype, "dataType", 2);
O([
  g({ type: String })
], A.prototype, "suffix", 2);
O([
  g({ type: String })
], A.prototype, "prefix", 2);
O([
  g({ type: String })
], A.prototype, "appLabel", 2);
O([
  g()
], A.prototype, "tip", 2);
O([
  g({ type: Boolean, state: !0 })
], A.prototype, "tipHidden", 2);
O([
  g()
], A.prototype, "optionData", 2);
A = O([
  _("form-input")
], A);
var Qi = Object.defineProperty, tn = Object.getOwnPropertyDescriptor, ut = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? tn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && Qi(e, r, a), a;
};
let Z = class extends C {
  constructor() {
    super(...arguments), this.setupDetails = [], this.formData = {}, this.submitDisabled = !1, this.appId = "", this.appData = mt;
  }
  createRenderRoot() {
    return this;
  }
  _emitSubmit(t) {
    t.preventDefault(), console.log("formData", this.formData);
    let e = {};
    Object.keys(this.formData).forEach((o) => {
      let a = this.formData[o].formVal;
      this.formData[o].prefix && (a = this.formData[o].prefix + a), this.formData[o].suffix && (a = a + this.formData[o].suffix), e[o] = a;
    });
    const r = new CustomEvent("onSubmit", {
      bubbles: !1,
      detail: {
        formObj: e
      }
    });
    this.dispatchEvent(r);
  }
  render() {
    return f`
      <div class="form-setup-step">
        <div class="form-setup-step-header w-100 text-center">
          <img src=${Kt(this.appData.id)} alt=${this.appData.label} />
        </div>
        <form @submit=${this._emitSubmit} id="knit_form">
          ${Lt(
      this.setupDetails,
      (t) => f`<form-input
                .key=${t.id}
                .eleId=${t.id}
                .appLabel=${this.appData.label}
                .label=${t.label}
                .value=${this.formData[t.id]}
                .elementType=${t.uiElementType}
                .dataType=${t.dataType}
                .placeholder=${"Enter " + t.label}
                .isRequired=${t.isRequired}
                .prefix=${t.prefix || ""}
                .suffix=${t.domainSuffix || ""}
                .styleWidth=${120}
                .tip=${t.tip}
                @onChange=${this._setformVal}
                .optionData=${t.optionData}
              />`
    )}
          <div
            class="submit-btn-container py-3 d-flex justify-content-center align-items-start"
          >
            <button .disabled=${this.submitDisabled} type="submit">
              ${this.submitDisabled ? f`<div
                    class="spinner-border"
                    style="height:24px;width:24px;"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>` : "Submit"}
            </button>
          </div>
        </form>
      </div>
    `;
  }
  _setformVal(t) {
    t.preventDefault();
    let e = {};
    e[t.detail.formKey] = {
      ...t.detail
    }, this.formData = { ...this.formData, ...e };
  }
};
Z.styles = [
  Gi,
  Ot`
      .knit-form-ele {
        padding: 1rem 0.5rem;
      }

      .knit-form-ele label,
      knit-form-ele input {
        width: 100%;
      }
      .knit-form-ele label {
        font-size: 1.1rem;
      }
      .knit-form-ele input {
        font-size: 1.2rem;
      }
    `
];
ut([
  g()
], Z.prototype, "setupDetails", 2);
ut([
  g()
], Z.prototype, "formData", 2);
ut([
  g({ type: Boolean })
], Z.prototype, "submitDisabled", 2);
ut([
  g({ type: String })
], Z.prototype, "appId", 2);
ut([
  g()
], Z.prototype, "appData", 2);
Z = ut([
  _("setup-form")
], Z);
var en = Object.defineProperty, rn = Object.getOwnPropertyDescriptor, xo = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? rn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && en(e, r, a), a;
};
let De = class extends C {
  constructor() {
    super(...arguments), this.text = "Loading...";
  }
  render() {
    return f`<div
      class="loading-panel d-flex justify-content-center align-items-center"
    >
      ${j(D.LOADING)}
    </div>`;
  }
  createRenderRoot() {
    return this;
  }
};
xo([
  g()
], De.prototype, "text", 2);
De = xo([
  _("loading-panel")
], De);
var on = Object.defineProperty, an = Object.getOwnPropertyDescriptor, Ze = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? an(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && on(e, r, a), a;
};
let te = class extends C {
  constructor() {
    super(...arguments), this.awaitType = "oauth", this.showBtn = !1;
  }
  render() {
    return f`<div
      class="full-panel px-4 py-4 flex-wrap d-flex justify-content-center align-items-center"
    >
      <img src=${_e("awaiting")} alt="awaiting" width="96" />
      ${gt(this.awaitType, [
      [
        "oauth",
        () => f` <p class="text-center w-100 my-1">
            Awaiting authorization
          </p>`
      ],
      [
        "in_validation",
        () => f`
            <p class="text-center w-100 my-1">Validating credentials</p>
            <p class="text-center w-100 mt-0">
              We are validating this integration. We’ll inform you if everything
              goes well.
            </p>
            ${this.showBtn ? f`<button class="primary" @click=${this._tryAgain}>
                  Try again
                </button>` : null}
          `
      ]
    ])}
    </div>`;
  }
  createRenderRoot() {
    return this;
  }
  _tryAgain(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("tryAgain", {
      bubbles: !1
    });
    this.dispatchEvent(e);
  }
};
Ze([
  g({ type: String })
], te.prototype, "awaitType", 2);
Ze([
  g({ type: Boolean })
], te.prototype, "showBtn", 2);
te = Ze([
  _("awaiting-auth")
], te);
var nn = Object.defineProperty, sn = Object.getOwnPropertyDescriptor, pe = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? sn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && nn(e, r, a), a;
};
let zt = class extends C {
  constructor() {
    super(...arguments), this.setupDetails = [], this.appId = "", this.appData = mt;
  }
  connectedCallback() {
    super.connectedCallback();
    let t = window.open(
      this.setupDetails[0].authUrl,
      "_blank"
    );
    var e = setInterval(() => {
      if (t != null && t.closed) {
        clearInterval(e);
        const r = new CustomEvent("stepComplete", {
          bubbles: !1
        });
        this.dispatchEvent(r);
      }
    }, 1e3);
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return f` <awaiting-auth /> `;
  }
};
pe([
  g()
], zt.prototype, "setupDetails", 2);
pe([
  g({ type: String })
], zt.prototype, "appId", 2);
pe([
  g()
], zt.prototype, "appData", 2);
zt = pe([
  _("setup-oauth")
], zt);
var ln = Object.defineProperty, dn = Object.getOwnPropertyDescriptor, ce = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? dn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && ln(e, r, a), a;
};
let Dt = class extends C {
  constructor() {
    super(...arguments), this.errorType = "unknown", this.errorArr = [], this.currentErrIdx = 0;
  }
  render() {
    return f`<div
      class=" d-flex full-panel tryagain-err py-3 justify-content-center flex-wrap h-100"
    >
      ${j(D.CROSS_CIRCLE)}
      ${this.errorArr.length == 0 ? f`<p class="w-100 text-center my-4">
            ${this.errorType == "integration" ? "Authorization unsuccessful, please try again" : "Something went wrong, please try again"}
          </p>` : f`<div
              class="text-center pt-3 w-100 d-flex justify-content-center err-navigation"
            >
              ${this.errorArr.length > 1 ? f`<div class="cursor-pointer " @click=${this._prevErr}>
                      ${j(D.CHEVRON_LEFT)}
                    </div>` : null}
              <p class="mb-0 px-3">
                Error ${this.currentErrIdx + 1} of ${this.errorArr.length}</p>
                ${this.errorArr.length > 1 ? f`<div class="cursor-pointer" @click=${this._nextErr}>
                        ${j(D.CHEVRON_RIGHT)}
                      </div> ` : null}
              </p>
            </div>

            <p class="w-100 text-center err-header mb-2">
              ${this.errorArr[this.currentErrIdx].description}
              (${this.errorArr[this.currentErrIdx].code})
            </p>
            <p class="w-100 mb-0 px-5 text-center err-resolution">
              ${this.errorArr[this.currentErrIdx].resolution}
            </p>`}

      <div class="cta-wrapper pb-3">
        <button class="primary" @click=${this._tryAgain}>Try again</button>
      </div>
    </div>`;
  }
  _tryAgain() {
    const t = new CustomEvent("tryAgain", {
      bubbles: !1
    });
    this.dispatchEvent(t);
  }
  _prevErr() {
    console.log(" prev clicked"), this.currentErrIdx > 0 && (this.currentErrIdx = this.currentErrIdx - 1);
  }
  _nextErr() {
    console.log(" next clicked"), this.currentErrIdx < this.errorArr.length - 1 && (this.currentErrIdx = this.currentErrIdx - 1);
  }
  createRenderRoot() {
    return this;
  }
};
ce([
  g()
], Dt.prototype, "errorType", 2);
ce([
  g()
], Dt.prototype, "errorArr", 2);
ce([
  g()
], Dt.prototype, "currentErrIdx", 2);
Dt = ce([
  _("tryagain-error")
], Dt);
var pn = Object.defineProperty, cn = Object.getOwnPropertyDescriptor, F = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? cn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && pn(e, r, a), a;
};
let R = class extends C {
  constructor() {
    super(...arguments), this.appData = {
      category: "HRIS",
      id: "knit",
      label: "Knit",
      logo: "",
      authType: "",
      setupSteps: [],
      status: {
        state: "open"
      }
    }, this.formStepData = [], this.oauthStepData = [], this.htmlSetupData = {}, this.activeSetupStepIndex = 0, this.authSessionToken = "", this.stepDataLoaded = !1, this.submitDisabled = !1, this.integrationFailedError = !1, this.errorType = "unknown", this.stepType = null;
  }
  render() {
    return this.integrationFailedError ? f`<tryagain-error
          class="h-100 tryagain-panel"
          .errorType=${this.errorType}
          @tryAgain=${this._resetSteps}
        ></tryagain-error>` : this.stepDataLoaded ? gt(this.stepType, [
      [
        "FORM",
        () => f`<setup-form
                  class="setup-wrapper int-step"
                  .appData=${this.appData}
                  .setupDetails=${this.formStepData}
                  .submitDisabled=${this.submitDisabled}
                  @onSubmit=${this._onFormSubmit}
                ></setup-form>`
      ],
      [
        "OAUTH",
        () => f`<setup-oauth
                  class="setup-wrapper int-step"
                  .appData=${this.appData}
                  .setupDetails=${this.oauthStepData}
                  @stepComplete=${this._onStepComplete}
                ></setup-oauth>`
      ],
      [
        "NONE",
        () => f`<div class="setup-wrapper int-step none-setup px-4  ">
                  <div class="d-flex justify-content-center">
                    <img
                      src=${Kt(this.appData.id)}
                      alt=${this.appData.label}
                      height="28"
                    />
                  </div>
                  <div class="html-content-wrapper py-2">
                    ${X(this.htmlSetupData.docUrl)}
                  </div>
                  <div
                    class="d-flex cta-wrapper justify-content-center align-items-center py-2 pb-4 w-100"
                  >
                    <button class="primary" @click=${this._onStepComplete}>
                      Done
                    </button>
                  </div>
                </div>`
      ]
    ]) : f`<loading-panel class="loading-panel" />`;
  }
  createRenderRoot() {
    return this;
  }
  updated(t) {
    t.has("activeSetupStepIndex") && this._fetchStepData();
  }
  _fetchStepData() {
    this.stepDataLoaded && (this.stepDataLoaded = !this.stepDataLoaded), xt.get("app.setupDetails", {
      headers: {
        Authorization: "Bearer " + this.authSessionToken
      },
      params: {
        appId: this.appData.id,
        stepId: this.appData.setupSteps[this.activeSetupStepIndex].stepId,
        isFinalStep: this.appData.setupSteps.length == this.activeSetupStepIndex + 1,
        isFirstStep: this.activeSetupStepIndex == 0
      }
    }).then((t) => {
      switch (this.stepType = t.data.msg.type, t.data.msg.type) {
        case "FORM":
          this.formStepData = t.data.msg[this.appData.setupSteps[this.activeSetupStepIndex].stepId];
          break;
        case "OAUTH":
          this.oauthStepData = t.data.msg[this.appData.setupSteps[this.activeSetupStepIndex].stepId];
          break;
        case "NONE":
          this.htmlSetupData = t.data.msg[this.appData.setupSteps[this.activeSetupStepIndex].stepId];
          break;
      }
    }).catch((t) => {
      var e;
      if (console.error(t), ((e = t == null ? void 0 : t.response) == null ? void 0 : e.status) == 401) {
        const r = new CustomEvent("tokenError", {
          bubbles: !1
        });
        this.dispatchEvent(r);
      } else
        this.errorType = "unknown", this.integrationFailedError = !0;
    }).finally(() => {
      this.stepDataLoaded = !0;
    });
  }
  _onFormSubmit(t) {
    this.submitDisabled = !0, xt.post(
      "app.formAuthorize",
      {
        formData: t.detail.formObj,
        stepId: this.appData.setupSteps[this.activeSetupStepIndex].stepId,
        appId: this.appData.id,
        isFinalStep: this.appData.setupSteps.length == this.activeSetupStepIndex + 1
      },
      {
        headers: {
          Authorization: "Bearer " + this.authSessionToken
        }
      }
    ).then((e) => {
      e.data.success && (console.log("submit success"), this._checkStepStatus());
    }).catch((e) => {
      var r;
      if (console.error(e), ((r = e == null ? void 0 : e.response) == null ? void 0 : r.status) == 401) {
        const o = new CustomEvent("tokenError", {
          bubbles: !0
        });
        this.dispatchEvent(o);
      } else
        this.errorType = "integration", this.integrationFailedError = !0;
    }).finally(() => {
      this.submitDisabled = !1;
    });
  }
  _onStepComplete() {
    this._checkStepStatus();
  }
  _checkStepStatus() {
    this.stepDataLoaded = !1, xt.get("app.stepStatus", {
      params: {
        appId: this.appData.id,
        stepId: this.appData.setupSteps[this.activeSetupStepIndex].stepId,
        isFinalStep: this.appData.setupSteps.length == this.activeSetupStepIndex + 1
      },
      headers: {
        Authorization: `Bearer ${this.authSessionToken}`
      }
    }).then((t) => {
      if (!t.data.msg.isComplete)
        this.errorType = "integration", this.integrationFailedError = !0;
      else if (!t.data.msg.integrationId)
        this._nextSetupStep();
      else {
        const e = new CustomEvent("integrationSuccess", {
          bubbles: !1,
          detail: {
            integrationId: t.data.msg.integrationId
          }
        });
        this.dispatchEvent(e);
      }
    }).catch((t) => {
      var e;
      if (console.error(t), ((e = t == null ? void 0 : t.response) == null ? void 0 : e.status) == 401) {
        const r = new CustomEvent("tokenError", {
          bubbles: !0
        });
        this.dispatchEvent(r);
      } else
        this.errorType = "integration", this.integrationFailedError = !0;
    });
  }
  _setActiveSetupIndex(t) {
    const e = new CustomEvent("setActiveSetupIndex", {
      bubbles: !1,
      detail: {
        index: t
      }
    });
    this.dispatchEvent(e);
  }
  _nextSetupStep() {
    this.activeSetupStepIndex < this.appData.setupSteps.length - 1 && (this.stepDataLoaded = !1, this.oauthStepData = [], this.formStepData = [], this.stepType = null, this.submitDisabled = !1, this._setActiveSetupIndex(this.activeSetupStepIndex + 1));
  }
  _resetSteps(t) {
    if (t == null || t.preventDefault(), this.integrationFailedError = !1, this.stepDataLoaded = !1, this.oauthStepData = [], this.formStepData = [], this.appData.setupSteps[0].setupType == "OAUTH") {
      const e = new CustomEvent("prevStep", {
        bubbles: !1
      });
      this.dispatchEvent(e);
    }
    this.activeSetupStepIndex == 0 ? this._fetchStepData() : this._setActiveSetupIndex(0);
  }
};
R.styles = [
  Ot`
      :host {
        min-height: inherit;
      }
    `
];
F([
  g()
], R.prototype, "appData", 2);
F([
  g()
], R.prototype, "formStepData", 2);
F([
  g()
], R.prototype, "oauthStepData", 2);
F([
  g()
], R.prototype, "htmlSetupData", 2);
F([
  g({ type: Number })
], R.prototype, "activeSetupStepIndex", 2);
F([
  g({ type: String })
], R.prototype, "authSessionToken", 2);
F([
  g({ type: Boolean, state: !0 })
], R.prototype, "stepDataLoaded", 2);
F([
  g({ type: Boolean, state: !0 })
], R.prototype, "submitDisabled", 2);
F([
  g({ type: Boolean, state: !0 })
], R.prototype, "integrationFailedError", 2);
F([
  g({ type: String, state: !0 })
], R.prototype, "errorType", 2);
F([
  g()
], R.prototype, "stepType", 2);
R = F([
  _("integration-setup")
], R);
var mn = Object.defineProperty, bn = Object.getOwnPropertyDescriptor, wo = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? bn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && mn(e, r, a), a;
};
let Oe = class extends C {
  constructor() {
    super(...arguments), this.adminMode = !1;
  }
  render() {
    return f`
      <div
        class=" d-flex py-3 full-panel token-err justify-content-center align-items-center flex-wrap h-100"
      >
       ${j(D.ALERT_CIRCLE)}

        <p class="w-100 text-center my-0">
       Invalid session token
      </p>
      <p class="err-description w-100 my-1 text-center"> Session token is either expired or invalid</p>
          <button class="primary" @click=${this._forceExit}>Close ${this.adminMode ? "" : "and retry"}</button>
        </div>
      </div>
    `;
  }
  _forceExit(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("forceExit", {
      bubbles: !1
    });
    this.dispatchEvent(e);
  }
  createRenderRoot() {
    return this;
  }
};
wo([
  g({ type: Boolean })
], Oe.prototype, "adminMode", 2);
Oe = wo([
  _("token-error")
], Oe);
var gn = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, yo = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? fn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && gn(e, r, a), a;
};
let Te = class extends C {
  constructor() {
    super(...arguments), this.showBackBtn = !1;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return f` <div class="popup-header px-2 d-flex">
      <div class="header-left w-50  text-left align-items-center d-flex">
        ${this.showBackBtn ? f`
              <div
                class="d-flex align-items-center cursor-pointer"
                @click="${this._backClick}"
              >
                ${j(D.CHEVRON_LEFT)}
                <p class="m-0 back-text">Back</p>
              </div>
            ` : f``}
      </div>
      <div class="header-right w-50 text-right">
        <div
          @click="${this._closeBtnClick}"
          class="cursor-pointer float-right "
        >
          ${j(D.CROSS)}
        </div>
      </div>
    </div>`;
  }
  _closeBtnClick(t) {
    t.preventDefault();
    const e = new CustomEvent("onCloseClick", {
      bubbles: !1
    });
    this.dispatchEvent(e);
  }
  _backClick(t) {
    t.preventDefault();
    const e = new CustomEvent("onBackClick", {
      bubbles: !1
    });
    this.dispatchEvent(e);
  }
};
yo([
  g({ type: Boolean })
], Te.prototype, "showBackBtn", 2);
Te = yo([
  _("popup-header")
], Te);
var un = Object.defineProperty, hn = Object.getOwnPropertyDescriptor, L = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? hn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && un(e, r, a), a;
};
let T = class extends C {
  constructor() {
    super(...arguments), this.step = 0, this.activeSetupStepIndex = 0, this.authSessionToken = "", this.preSelectedAppId = "", this.adminMode = !1, this.appsDataLoaded = !1, this.appsData = {}, this.appsApiError = !1, this.tokenError = !1, this.integrationSuccess = !1, this.selectedCategory = "", this.selectedApp = mt;
  }
  render() {
    var t;
    return f`
      <div class="dialog-wrapper" role="dialog">
        <div class=${this._getPopupClass()}>
          ${this.integrationSuccess ? f`<awaiting-auth
                class="full-panel"
                .awaitType=${"in_validation"}
              />` : this.appsDataLoaded ? this.tokenError ? f`
                  <token-error
                    class="full-panel"
                    .adminMode=${this.adminMode}
                    @forceExit=${this._forceExit}
                  />
                ` : f`
                  ${this.step == 4 && this.selectedApp.id.length && ((t = this.selectedApp.setupSteps[this.activeSetupStepIndex]) == null ? void 0 : t.setupType) == "OAUTH" ? null : f` <popup-header
                        .showBackBtn=${this.step != 0}
                        @onCloseClick=${this._togglePopup}
                        @onBackClick=${this._back}
                      />`}
                  ${this.appsApiError ? f`<tryagain-error
                        class="full-panel"
                        .errorType=${"unknown"}
                        @tryAgain=${this._resetAppsApiError}
                      ></tryagain-error>` : f` ${gt(this.step, [
      [
        0,
        () => f`<category-selection
                                class="category-selection-step"
                                .categoryList="${this.appsData}"
                                @nextStep=${this._nextStep}
                                @selectCategory=${this._setSelectedCategory}
                              ></category-selection>
                              <div class="popup-footer">
                                <p class="mb-0">
                                  Powered by Knit, read our
                                  <a href="https://getknit.dev" target="_blank"
                                    >End Customer Terms</a
                                  >
                                </p>
                              </div> `
      ],
      [
        1,
        () => f`<integration-selection
                              class="integration-selection-step"
                              @nextStep=${this._nextStep}
                              .integrationsList=${this.appsData[this.selectedCategory]}
                              @onIntegrationSelect=${this._setSelectedApp}
                              .categoryKey=${this.selectedCategory}
                            ></integration-selection>`
      ],
      [
        2,
        () => f`<status-check
                            class="full-panel"
                            .appData=${this.selectedApp}
                            .adminMode=${this.adminMode}
                            @nextStep=${this._nextStep}
                          />`
      ],
      [
        3,
        () => f`<admin-check class="admin-check-setup"
                        .appData=${this.selectedApp}
                        @nextStep=${this._nextStep}
                        .authSessionToken=${this.authSessionToken}
                        @updateAppData=${this._updateAppData}
                        ></admin-check-setup>`
      ],
      [
        4,
        () => f`<integration-setup
                              id="integration-setup"
                              @tokenError=${this._initiateTokenPopup}
                              @prevStep=${this._backForce}
                              @setActiveSetupIndex=${this._setActiveIndex}
                              @integrationSuccess=${this._onIntegrationSuccess}
                              .activeSetupStepIndex=${this.activeSetupStepIndex}
                              class="int-step int-step-parent"
                              .authSessionToken=${this.authSessionToken}
                              .appData=${this.selectedApp}
                            ></integration-setup>`
      ]
    ])}`}
                ` : f`<loading-panel class="loading-panel" />`}
        </div>
      </div>
    `;
  }
  createRenderRoot() {
    return this;
  }
  _onIntegrationSuccess(t) {
    t.preventDefault(), this.integrationSuccess = !0, setTimeout(() => {
      const e = new CustomEvent("integrationSuccess", {
        bubbles: !1,
        detail: {
          integrationId: t.detail.integrationId
        }
      });
      this.dispatchEvent(e);
    }, 2e3);
  }
  _setActiveIndex(t) {
    this.activeSetupStepIndex = t.detail.index;
  }
  _fetchAppsData(t) {
    this.appsDataLoaded && (this.appsDataLoaded = !this.appsDataLoaded), xt.get("app.list", {
      headers: {
        Authorization: `Bearer ${this.authSessionToken}da`
      }
    }).then((e) => {
      console.log("res categories", e.data.msg);
      let r = e.data.msg.filter(
        (a) => a.status.state != "disabled"
      ), o = {};
      if (r.forEach((a) => {
        o[a.category] ? o[a.category] = [
          ...o[a.category],
          a
        ] : o[a.category] = [a], this.appsData = o;
      }), t) {
        let a = r.find(
          (i) => i.id == this.preSelectedAppId
        );
        console.log(
          "selece",
          this.preSelectedAppId,
          "val",
          a
        ), this.selectedCategory = a.category, this.selectedApp = a, this._nextStep(), this._nextStep();
      }
    }).catch((e) => {
      var r;
      console.error(e), ((r = e == null ? void 0 : e.response) == null ? void 0 : r.status) == 401 ? this.tokenError = !0 : this.appsApiError = !0;
    }).finally(() => {
      this.appsDataLoaded = !0;
    });
  }
  _getPopupClass() {
    let t = "popup-container";
    return re.exports() || (t = t + " popup-web"), t;
  }
  _resetAppsApiError(t) {
    t == null || t.preventDefault(), this.appsApiError = !1, this._fetchAppsData(!1);
  }
  connectedCallback() {
    super.connectedCallback(), this._fetchAppsData(this.adminMode);
  }
  _togglePopup(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("togglePopup", {
      bubbles: !0
    });
    this.dispatchEvent(e);
  }
  _initiateTokenPopup(t) {
    t == null || t.preventDefault(), this.tokenError = !0;
  }
  _setSelectedCategory(t) {
    t == null || t.preventDefault(), this.selectedCategory = t == null ? void 0 : t.detail.categoryTitle, this._nextStep();
  }
  _setSelectedApp(t) {
    t == null || t.preventDefault(), this.selectedApp = this.appsData[this.selectedCategory].find(
      (e) => e.id == (t == null ? void 0 : t.detail.appId)
    ), console.log("selectedAPp changed", this.selectedApp), this._nextStep();
  }
  _nextStep(t) {
    var e;
    t == null || t.preventDefault(), this.step == 1 && ((e = this.selectedApp) == null ? void 0 : e.status.state) == "open" ? this.step = this.step + 2 : this.step = this.step + 1;
  }
  _prevStep(t) {
    t == null || t.preventDefault(), this.step == 4 ? this.step = this.step - 3 : this.step == 3 ? this.step = this.step - 2 : this.step = this.step - 1;
  }
  _updateAppData(t) {
    t == null || t.preventDefault();
    let e = this.appsData[t.detail.appData.category].findIndex(
      (o) => o.id == t.detail.appData.id
    ), r = JSON.parse(JSON.stringify(this.appsData));
    r[t.detail.appData.category][e] = t.detail.appData, this.selectedApp = t.detail.appData, this.appsData = r;
  }
  _refreshAccess(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("refreshAccess", {
      bubbles: !0
    });
    this.dispatchEvent(e);
  }
  _forceExit(t) {
    this._togglePopup(t), this.adminMode || this._refreshAccess(t);
  }
  _back(t) {
    t == null || t.preventDefault(), this.step > 0 && this._prevStep();
  }
  _backForce(t) {
    t == null || t.preventDefault(), this.step > 0 && this._prevStep(), this.selectedApp = mt;
  }
};
T.styles = [];
L([
  g({ type: Number, state: !0 })
], T.prototype, "step", 2);
L([
  g({ type: Number, state: !0 })
], T.prototype, "activeSetupStepIndex", 2);
L([
  g({ type: String })
], T.prototype, "authSessionToken", 2);
L([
  g({ type: String })
], T.prototype, "preSelectedAppId", 2);
L([
  g({ type: Boolean })
], T.prototype, "adminMode", 2);
L([
  g({ type: Boolean, state: !0 })
], T.prototype, "appsDataLoaded", 2);
L([
  g({ state: !0 })
], T.prototype, "appsData", 2);
L([
  g({ type: Boolean, state: !0 })
], T.prototype, "appsApiError", 2);
L([
  g({ type: Boolean, state: !0 })
], T.prototype, "tokenError", 2);
L([
  g({ type: Boolean, state: !0 })
], T.prototype, "integrationSuccess", 2);
L([
  g({ type: String })
], T.prototype, "selectedCategory", 2);
L([
  g()
], T.prototype, "selectedApp", 2);
T = L([
  _("knit-popup")
], T);
var vn = Object.defineProperty, xn = Object.getOwnPropertyDescriptor, jt = (t, e, r, o) => {
  for (var a = o > 1 ? void 0 : o ? xn(e, r) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (a = (o ? n(e, r, a) : n(a)) || a);
  return o && a && vn(e, r, a), a;
};
let rt = class extends C {
  constructor() {
    super(...arguments), this.authSessionToken = "", this.adminMode = !1, this.popupEnabled = !1, this.selectedApp = "";
  }
  render() {
    let t = document.createElement("style");
    return t.innerHTML = jo, document.head.appendChild(t), f`
      <div class="component-wrapper">
        ${this.popupEnabled ? f`
              <knit-popup
                .authSessionToken=${this.authSessionToken}
                .adminMode=${this.adminMode}
                .preSelectedAppId=${this.selectedApp}
                @togglePopup=${this._togglePopup}
                @refreshAccess=${this._refreshAccess}
                @integrationSuccess=${this._onIntegrationSuccess}
              ></knit-popup>
            ` : ""}
        ${f`<slot name="initiator" @click=${this._onInitiatorClick}></slot>`}
      </div>
    `;
  }
  _onInitiatorClick(t) {
    console.log(this.authSessionToken, this.popupEnabled), t == null || t.preventDefault, this.authSessionToken.length > 0 && !this.popupEnabled && (this.popupEnabled = !0);
  }
  _togglePopup(t) {
    t == null || t.preventDefault(), this.popupEnabled = !this.popupEnabled;
  }
  _refreshAccess(t) {
    t == null || t.preventDefault();
    const e = new CustomEvent("onNewSession", {
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  _onIntegrationSuccess(t) {
    t.preventDefault(), console.log("success event emitted in knit auth"), this.popupEnabled = !1;
    const e = new CustomEvent("onSuccess", {
      bubbles: !0,
      composed: !0,
      detail: {
        token: t.detail.integrationId
      }
    });
    this.dispatchEvent(e), this._refreshAccess();
  }
  updated(t) {
    t.has("authSessionToken") && (console.log("auth token changed", this.authSessionToken), this.adminMode && (console.log("adminMode is true"), this._onInitiatorClick()));
  }
};
rt.styles = [
  Rr(Fo),
  Ot`
      slot[name="initiator"]::slotted(*) {
        background: blue;
        color: green;
      }
      :host {
        line-height: 1.5 !important;
        font-family: "Lato";
      }
    `
];
jt([
  g({ type: String, attribute: !0 })
], rt.prototype, "authSessionToken", 2);
jt([
  g({ type: Boolean, attribute: !0 })
], rt.prototype, "adminMode", 2);
jt([
  g({ type: Boolean, state: !0 })
], rt.prototype, "popupEnabled", 2);
jt([
  g({ type: String, attribute: !0 })
], rt.prototype, "selectedApp", 2);
rt = jt([
  _("knit-auth")
], rt);
export {
  rt as default
};
