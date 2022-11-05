/*!!
 * Matomo - free/libre analytics platform
 *
 * JavaScript tracking client
 *
 * @link https://piwik.org
 * @source https://github.com/matomo-org/matomo/blob/master/js/piwik.js
 * @license https://piwik.org/free-software/bsd/ BSD-3 Clause (also in js/LICENSE.txt)
 * @license magnet:?xt=urn:btih:c80d50af7d3db9be66a4d0a86db0286e4fd33292&dn=bsd-3-clause.txt BSD-3-Clause
 */
;
if (typeof _paq !== "object") {
	_paq = []
}
if (typeof window.Matomo !== "object") {
	window.Matomo = window.Piwik = (function() {
		var r, b = {},
			z = {},
			J = document,
			g = navigator,
			ab = screen,
			W = window,
			h = W.performance || W.mozPerformance || W.msPerformance || W.webkitPerformance,
			t = W.encodeURIComponent,
			V = W.decodeURIComponent,
			k = unescape,
			L = [],
			H, u, al = [],
			y = 0,
			af = 0,
			X = 0,
			m = false;

		function p(at) {
			try {
				return V(at)
			} catch (au) {
				return unescape(at)
			}
		}

		function M(au) {
			var at = typeof au;
			return at !== "undefined"
		}

		function C(at) {
			return typeof at === "function"
		}

		function Z(at) {
			return typeof at === "object"
		}

		function x(at) {
			return typeof at === "string" || at instanceof String
		}

		function ak(at) {
			return typeof at === "number" || at instanceof Number
		}

		function ac(at) {
			return M(at) && (ak(at) || (x(at) && at.length))
		}

		function D(au) {
			if (!au) {
				return true
			}
			var at;
			for (at in au) {
				if (Object.prototype.hasOwnProperty.call(au, at)) {
					return false
				}
			}
			return true
		}

		function ao(at) {
			var au = typeof console;
			if (au !== "undefined" && console && console.error) {
				console.error(at)
			}
		}

		function aj() {
			var ay, ax, aA, au, at;
			for (ay = 0; ay < arguments.length; ay += 1) {
				at = null;
				if (arguments[ay] && arguments[ay].slice) {
					at = arguments[ay].slice()
				}
				au = arguments[ay];
				aA = au.shift();
				var az, av;
				var aw = x(aA) && aA.indexOf("::") > 0;
				if (aw) {
					az = aA.split("::");
					av = az[0];
					aA = az[1];
					if ("object" === typeof u[av] && "function" === typeof u[av][aA]) {
						u[av][aA].apply(u[av], au)
					} else {
						if (at) {
							al.push(at)
						}
					}
				} else {
					for (ax = 0; ax < L.length; ax++) {
						if (x(aA)) {
							av = L[ax];
							var aB = aA.indexOf(".") > 0;
							if (aB) {
								az = aA.split(".");
								if (av && "object" === typeof av[az[0]]) {
									av = av[az[0]];
									aA = az[1]
								} else {
									if (at) {
										al.push(at);
										break
									}
								}
							}
							if (av[aA]) {
								av[aA].apply(av, au)
							} else {
								var aC = "The method '" + aA + '\' was not found in "_paq" variable.  Please have a look at the Matomo tracker documentation: https://developer.matomo.org/api-reference/tracking-javascript';
								ao(aC);
								if (!aB) {
									throw new TypeError(aC)
								}
							}
							if (aA === "addTracker") {
								break
							}
							if (aA === "setTrackerUrl" || aA === "setSiteId") {
								break
							}
						} else {
							aA.apply(L[ax], au)
						}
					}
				}
			}
		}

		function ar(aw, av, au, at) {
			if (aw.addEventListener) {
				aw.addEventListener(av, au, at);
				return true
			}
			if (aw.attachEvent) {
				return aw.attachEvent("on" + av, au)
			}
			aw["on" + av] = au
		}

		function n(at) {
			if (J.readyState === "complete") {
				at()
			} else {
				if (W.addEventListener) {
					W.addEventListener("load", at, false)
				} else {
					if (W.attachEvent) {
						W.attachEvent("onload", at)
					}
				}
			}
		}

		function q(aw) {
			var at = false;
			if (J.attachEvent) {
				at = J.readyState === "complete"
			} else {
				at = J.readyState !== "loading"
			}
			if (at) {
				aw();
				return
			}
			var av;
			if (J.addEventListener) {
				ar(J, "DOMContentLoaded", function au() {
					J.removeEventListener("DOMContentLoaded", au, false);
					if (!at) {
						at = true;
						aw()
					}
				})
			} else {
				if (J.attachEvent) {
					J.attachEvent("onreadystatechange", function au() {
						if (J.readyState === "complete") {
							J.detachEvent("onreadystatechange", au);
							if (!at) {
								at = true;
								aw()
							}
						}
					});
					if (J.documentElement.doScroll && W === W.top) {
						(function au() {
							if (!at) {
								try {
									J.documentElement.doScroll("left")
								} catch (ax) {
									setTimeout(au, 0);
									return
								}
								at = true;
								aw()
							}
						}())
					}
				}
			}
			ar(W, "load", function() {
				if (!at) {
					at = true;
					aw()
				}
			}, false)
		}

		function ag(au, az, aA) {
			if (!au) {
				return ""
			}
			var at = "",
				aw, av, ax, ay;
			for (aw in b) {
				if (Object.prototype.hasOwnProperty.call(b, aw)) {
					ay = b[aw] && "function" === typeof b[aw][au];
					if (ay) {
						av = b[aw][au];
						ax = av(az || {}, aA);
						if (ax) {
							at += ax
						}
					}
				}
			}
			return at
		}

		function am(au) {
			var at;
			m = true;
			ag("unload");
			at = new Date();
			var av = at.getTimeAlias();
			if ((r - av) > 3000) {
				r = av + 3000
			}
			if (r) {
				do {
					at = new Date()
				} while (at.getTimeAlias() < r)
			}
		}

		function o(av, au) {
			var at = J.createElement("script");
			at.type = "text/javascript";
			at.src = av;
			if (at.readyState) {
				at.onreadystatechange = function() {
					var aw = this.readyState;
					if (aw === "loaded" || aw === "complete") {
						at.onreadystatechange = null;
						au()
					}
				}
			} else {
				at.onload = au
			}
			J.getElementsByTagName("head")[0].appendChild(at)
		}

		function N() {
			var at = "";
			try {
				at = W.top.document.referrer
			} catch (av) {
				if (W.parent) {
					try {
						at = W.parent.document.referrer
					} catch (au) {
						at = ""
					}
				}
			}
			if (at === "") {
				at = J.referrer
			}
			return at
		}

		function s(at) {
			var av = new RegExp("^([a-z]+):"),
				au = av.exec(at);
			return au ? au[1] : null
		}

		function d(at) {
			var av = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)"),
				au = av.exec(at);
			return au ? au[1] : at
		}

		function G(at) {
			return (/^[0-9][0-9]*(\.[0-9]+)?$/)
				.test(at)
		}

		function Q(av, aw) {
			var at = {},
				au;
			for (au in av) {
				if (av.hasOwnProperty(au) && aw(av[au])) {
					at[au] = av[au]
				}
			}
			return at
		}

		function B(av) {
			var at = {},
				au;
			for (au in av) {
				if (av.hasOwnProperty(au)) {
					if (G(av[au])) {
						at[au] = Math.round(av[au])
					} else {
						throw new Error('Parameter "' + au + '" provided value "' + av[au] + '" is not valid. Please provide a numeric value.')
					}
				}
			}
			return at
		}

		function l(au) {
			var av = "",
				at;
			for (at in au) {
				if (au.hasOwnProperty(at)) {
					av += "&" + t(at) + "=" + t(au[at])
				}
			}
			return av
		}

		function an(au, at) {
			au = String(au);
			return au.lastIndexOf(at, 0) === 0
		}

		function U(au, at) {
			au = String(au);
			return au.indexOf(at, au.length - at.length) !== -1
		}

		function A(au, at) {
			au = String(au);
			return au.indexOf(at) !== -1
		}

		function f(au, at) {
			au = String(au);
			return au.substr(0, au.length - at)
		}

		function I(aw, av, ay) {
			aw = String(aw);
			if (!ay) {
				ay = ""
			}
			var at = aw.indexOf("#");
			var az = aw.length;
			if (at === -1) {
				at = az
			}
			var ax = aw.substr(0, at);
			var au = aw.substr(at, az - at);
			if (ax.indexOf("?") === -1) {
				ax += "?"
			} else {
				if (!U(ax, "?")) {
					ax += "&"
				}
			}
			return ax + t(av) + "=" + t(ay) + au
		}

		function j(au, av) {
			au = String(au);
			if (au.indexOf("?" + av + "=") === -1 && au.indexOf("&" + av + "=") === -1) {
				return au
			}
			var aw = au.indexOf("?");
			if (aw === -1) {
				return au
			}
			var at = au.substr(aw + 1);
			var aA = au.substr(0, aw);
			if (at) {
				var aB = "";
				var aD = at.indexOf("#");
				if (aD !== -1) {
					aB = at.substr(aD + 1);
					at = at.substr(0, aD)
				}
				var ax;
				var az = at.split("&");
				var ay = az.length - 1;
				for (ay; ay >= 0; ay--) {
					ax = az[ay].split("=")[0];
					if (ax === av) {
						az.splice(ay, 1)
					}
				}
				var aC = az.join("&");
				if (aC) {
					aA = aA + "?" + aC
				}
				if (aB) {
					aA += "#" + aB
				}
			}
			return aA
		}

		function e(av, au) {
			var at = "[\\?&#]" + au + "=([^&#]*)";
			var ax = new RegExp(at);
			var aw = ax.exec(av);
			return aw ? p(aw[1]) : ""
		}

		function a(at) {
			if (at && String(at) === at) {
				return at.replace(/^\s+|\s+$/g, "")
			}
			return at
		}

		function F(at) {
			return unescape(t(at))
		}

		function aq(aI) {
			var av = function(aO, aN) {
					return (aO << aN) | (aO >>> (32 - aN))
				},
				aJ = function(aQ) {
					var aO = "",
						aP, aN;
					for (aP = 7; aP >= 0; aP--) {
						aN = (aQ >>> (aP * 4)) & 15;
						aO += aN.toString(16)
					}
					return aO
				},
				ay, aL, aK, au = [],
				aC = 1732584193,
				aA = 4023233417,
				az = 2562383102,
				ax = 271733878,
				aw = 3285377520,
				aH, aG, aF, aE, aD, aM, at, aB = [];
			aI = F(aI);
			at = aI.length;
			for (aL = 0; aL < at - 3; aL += 4) {
				aK = aI.charCodeAt(aL) << 24 | aI.charCodeAt(aL + 1) << 16 | aI.charCodeAt(aL + 2) << 8 | aI.charCodeAt(aL + 3);
				aB.push(aK)
			}
			switch (at & 3) {
				case 0:
					aL = 2147483648;
					break;
				case 1:
					aL = aI.charCodeAt(at - 1) << 24 | 8388608;
					break;
				case 2:
					aL = aI.charCodeAt(at - 2) << 24 | aI.charCodeAt(at - 1) << 16 | 32768;
					break;
				case 3:
					aL = aI.charCodeAt(at - 3) << 24 | aI.charCodeAt(at - 2) << 16 | aI.charCodeAt(at - 1) << 8 | 128;
					break
			}
			aB.push(aL);
			while ((aB.length & 15) !== 14) {
				aB.push(0)
			}
			aB.push(at >>> 29);
			aB.push((at << 3) & 4294967295);
			for (ay = 0; ay < aB.length; ay += 16) {
				for (aL = 0; aL < 16; aL++) {
					au[aL] = aB[ay + aL]
				}
				for (aL = 16; aL <= 79; aL++) {
					au[aL] = av(au[aL - 3] ^ au[aL - 8] ^ au[aL - 14] ^ au[aL - 16], 1)
				}
				aH = aC;
				aG = aA;
				aF = az;
				aE = ax;
				aD = aw;
				for (aL = 0; aL <= 19; aL++) {
					aM = (av(aH, 5) + ((aG & aF) | (~aG & aE)) + aD + au[aL] + 1518500249) & 4294967295;
					aD = aE;
					aE = aF;
					aF = av(aG, 30);
					aG = aH;
					aH = aM
				}
				for (aL = 20; aL <= 39; aL++) {
					aM = (av(aH, 5) + (aG ^ aF ^ aE) + aD + au[aL] + 1859775393) & 4294967295;
					aD = aE;
					aE = aF;
					aF = av(aG, 30);
					aG = aH;
					aH = aM
				}
				for (aL = 40; aL <= 59; aL++) {
					aM = (av(aH, 5) + ((aG & aF) | (aG & aE) | (aF & aE)) + aD + au[aL] + 2400959708) & 4294967295;
					aD = aE;
					aE = aF;
					aF = av(aG, 30);
					aG = aH;
					aH = aM
				}
				for (aL = 60; aL <= 79; aL++) {
					aM = (av(aH, 5) + (aG ^ aF ^ aE) + aD + au[aL] + 3395469782) & 4294967295;
					aD = aE;
					aE = aF;
					aF = av(aG, 30);
					aG = aH;
					aH = aM
				}
				aC = (aC + aH) & 4294967295;
				aA = (aA + aG) & 4294967295;
				az = (az + aF) & 4294967295;
				ax = (ax + aE) & 4294967295;
				aw = (aw + aD) & 4294967295
			}
			aM = aJ(aC) + aJ(aA) + aJ(az) + aJ(ax) + aJ(aw);
			return aM.toLowerCase()
		}

		function ae(av, at, au) {
			if (!av) {
				av = ""
			}
			if (!at) {
				at = ""
			}
			if (av === "translate.googleusercontent.com") {
				if (au === "") {
					au = at
				}
				at = e(at, "u");
				av = d(at)
			} else {
				if (av === "cc.bingj.com" || av === "webcache.googleusercontent.com" || av.slice(0, 5) === "74.6.") {
					at = J.links[0].href;
					av = d(at)
				}
			}
			return [av, at, au]
		}

		function O(au) {
			var at = au.length;
			if (au.charAt(--at) === ".") {
				au = au.slice(0, at)
			}
			if (au.slice(0, 2) === "*.") {
				au = au.slice(1)
			}
			if (au.indexOf("/") !== -1) {
				au = au.substr(0, au.indexOf("/"))
			}
			return au
		}

		function ap(au) {
			au = au && au.text ? au.text : au;
			if (!x(au)) {
				var at = J.getElementsByTagName("title");
				if (at && M(at[0])) {
					au = at[0].text
				}
			}
			return au
		}

		function S(at) {
			if (!at) {
				return []
			}
			if (!M(at.children) && M(at.childNodes)) {
				return at.children
			}
			if (M(at.children)) {
				return at.children
			}
			return []
		}

		function Y(au, at) {
			if (!au || !at) {
				return false
			}
			if (au.contains) {
				return au.contains(at)
			}
			if (au === at) {
				return true
			}
			if (au.compareDocumentPosition) {
				return !!(au.compareDocumentPosition(at) & 16)
			}
			return false
		}

		function P(av, aw) {
			if (av && av.indexOf) {
				return av.indexOf(aw)
			}
			if (!M(av) || av === null) {
				return -1
			}
			if (!av.length) {
				return -1
			}
			var at = av.length;
			if (at === 0) {
				return -1
			}
			var au = 0;
			while (au < at) {
				if (av[au] === aw) {
					return au
				}
				au++
			}
			return -1
		}

		function i(av) {
			if (!av) {
				return false
			}

			function at(ax, ay) {
				if (W.getComputedStyle) {
					return J.defaultView.getComputedStyle(ax, null)[ay]
				}
				if (ax.currentStyle) {
					return ax.currentStyle[ay]
				}
			}

			function aw(ax) {
				ax = ax.parentNode;
				while (ax) {
					if (ax === J) {
						return true
					}
					ax = ax.parentNode
				}
				return false
			}

			function au(az, aF, ax, aC, aA, aD, aB) {
				var ay = az.parentNode,
					aE = 1;
				if (!aw(az)) {
					return false
				}
				if (9 === ay.nodeType) {
					return true
				}
				if ("0" === at(az, "opacity") || "none" === at(az, "display") || "hidden" === at(az, "visibility")) {
					return false
				}
				if (!M(aF) || !M(ax) || !M(aC) || !M(aA) || !M(aD) || !M(aB)) {
					aF = az.offsetTop;
					aA = az.offsetLeft;
					aC = aF + az.offsetHeight;
					ax = aA + az.offsetWidth;
					aD = az.offsetWidth;
					aB = az.offsetHeight
				}
				if (av === az && (0 === aB || 0 === aD) && "hidden" === at(az, "overflow")) {
					return false
				}
				if (ay) {
					if (("hidden" === at(ay, "overflow") || "scroll" === at(ay, "overflow"))) {
						if (aA + aE > ay.offsetWidth + ay.scrollLeft || aA + aD - aE < ay.scrollLeft || aF + aE > ay.offsetHeight + ay.scrollTop || aF + aB - aE < ay.scrollTop) {
							return false
						}
					}
					if (az.offsetParent === ay) {
						aA += ay.offsetLeft;
						aF += ay.offsetTop
					}
					return au(ay, aF, ax, aC, aA, aD, aB)
				}
				return true
			}
			return au(av)
		}
		var ai = {
			htmlCollectionToArray: function(av) {
				var at = [],
					au;
				if (!av || !av.length) {
					return at
				}
				for (au = 0; au < av.length; au++) {
					at.push(av[au])
				}
				return at
			},
			find: function(at) {
				if (!document.querySelectorAll || !at) {
					return []
				}
				var au = document.querySelectorAll(at);
				return this.htmlCollectionToArray(au)
			},
			findMultiple: function(av) {
				if (!av || !av.length) {
					return []
				}
				var au, aw;
				var at = [];
				for (au = 0; au < av.length; au++) {
					aw = this.find(av[au]);
					at = at.concat(aw)
				}
				at = this.makeNodesUnique(at);
				return at
			},
			findNodesByTagName: function(au, at) {
				if (!au || !at || !au.getElementsByTagName) {
					return []
				}
				var av = au.getElementsByTagName(at);
				return this.htmlCollectionToArray(av)
			},
			makeNodesUnique: function(at) {
				var ay = [].concat(at);
				at.sort(function(aA, az) {
					if (aA === az) {
						return 0
					}
					var aC = P(ay, aA);
					var aB = P(ay, az);
					if (aC === aB) {
						return 0
					}
					return aC > aB ? -1 : 1
				});
				if (at.length <= 1) {
					return at
				}
				var au = 0;
				var aw = 0;
				var ax = [];
				var av;
				av = at[au++];
				while (av) {
					if (av === at[au]) {
						aw = ax.push(au)
					}
					av = at[au++] || null
				}
				while (aw--) {
					at.splice(ax[aw], 1)
				}
				return at
			},
			getAttributeValueFromNode: function(ax, av) {
				if (!this.hasNodeAttribute(ax, av)) {
					return
				}
				if (ax && ax.getAttribute) {
					return ax.getAttribute(av)
				}
				if (!ax || !ax.attributes) {
					return
				}
				var aw = (typeof ax.attributes[av]);
				if ("undefined" === aw) {
					return
				}
				if (ax.attributes[av].value) {
					return ax.attributes[av].value
				}
				if (ax.attributes[av].nodeValue) {
					return ax.attributes[av].nodeValue
				}
				var au;
				var at = ax.attributes;
				if (!at) {
					return
				}
				for (au = 0; au < at.length; au++) {
					if (at[au].nodeName === av) {
						return at[au].nodeValue
					}
				}
				return null
			},
			hasNodeAttributeWithValue: function(au, at) {
				var av = this.getAttributeValueFromNode(au, at);
				return !!av
			},
			hasNodeAttribute: function(av, at) {
				if (av && av.hasAttribute) {
					return av.hasAttribute(at)
				}
				if (av && av.attributes) {
					var au = (typeof av.attributes[at]);
					return "undefined" !== au
				}
				return false
			},
			hasNodeCssClass: function(av, at) {
				if (av && at && av.className) {
					var au = typeof av.className === "string" ? av.className.split(" ") : [];
					if (-1 !== P(au, at)) {
						return true
					}
				}
				return false
			},
			findNodesHavingAttribute: function(ax, av, at) {
				if (!at) {
					at = []
				}
				if (!ax || !av) {
					return at
				}
				var aw = S(ax);
				if (!aw || !aw.length) {
					return at
				}
				var au, ay;
				for (au = 0; au < aw.length; au++) {
					ay = aw[au];
					if (this.hasNodeAttribute(ay, av)) {
						at.push(ay)
					}
					at = this.findNodesHavingAttribute(ay, av, at)
				}
				return at
			},
			findFirstNodeHavingAttribute: function(av, au) {
				if (!av || !au) {
					return
				}
				if (this.hasNodeAttribute(av, au)) {
					return av
				}
				var at = this.findNodesHavingAttribute(av, au);
				if (at && at.length) {
					return at[0]
				}
			},
			findFirstNodeHavingAttributeWithValue: function(aw, av) {
				if (!aw || !av) {
					return
				}
				if (this.hasNodeAttributeWithValue(aw, av)) {
					return aw
				}
				var at = this.findNodesHavingAttribute(aw, av);
				if (!at || !at.length) {
					return
				}
				var au;
				for (au = 0; au < at.length; au++) {
					if (this.getAttributeValueFromNode(at[au], av)) {
						return at[au]
					}
				}
			},
			findNodesHavingCssClass: function(ax, aw, at) {
				if (!at) {
					at = []
				}
				if (!ax || !aw) {
					return at
				}
				if (ax.getElementsByClassName) {
					var ay = ax.getElementsByClassName(aw);
					return this.htmlCollectionToArray(ay)
				}
				var av = S(ax);
				if (!av || !av.length) {
					return []
				}
				var au, az;
				for (au = 0; au < av.length; au++) {
					az = av[au];
					if (this.hasNodeCssClass(az, aw)) {
						at.push(az)
					}
					at = this.findNodesHavingCssClass(az, aw, at)
				}
				return at
			},
			findFirstNodeHavingClass: function(av, au) {
				if (!av || !au) {
					return
				}
				if (this.hasNodeCssClass(av, au)) {
					return av
				}
				var at = this.findNodesHavingCssClass(av, au);
				if (at && at.length) {
					return at[0]
				}
			},
			isLinkElement: function(au) {
				if (!au) {
					return false
				}
				var at = String(au.nodeName)
					.toLowerCase();
				var aw = ["a", "area"];
				var av = P(aw, at);
				return av !== -1
			},
			setAnyAttribute: function(au, at, av) {
				if (!au || !at) {
					return
				}
				if (au.setAttribute) {
					au.setAttribute(at, av)
				} else {
					au[at] = av
				}
			}
		};
		var w = {
			CONTENT_ATTR: "data-track-content",
			CONTENT_CLASS: "matomoTrackContent",
			LEGACY_CONTENT_CLASS: "piwikTrackContent",
			CONTENT_NAME_ATTR: "data-content-name",
			CONTENT_PIECE_ATTR: "data-content-piece",
			CONTENT_PIECE_CLASS: "matomoContentPiece",
			LEGACY_CONTENT_PIECE_CLASS: "piwikContentPiece",
			CONTENT_TARGET_ATTR: "data-content-target",
			CONTENT_TARGET_CLASS: "matomoContentTarget",
			LEGACY_CONTENT_TARGET_CLASS: "piwikContentTarget",
			CONTENT_IGNOREINTERACTION_ATTR: "data-content-ignoreinteraction",
			CONTENT_IGNOREINTERACTION_CLASS: "matomoContentIgnoreInteraction",
			LEGACY_CONTENT_IGNOREINTERACTION_CLASS: "piwikContentIgnoreInteraction",
			location: undefined,
			findContentNodes: function() {
				var au = "." + this.CONTENT_CLASS;
				var av = "." + this.LEGACY_CONTENT_CLASS;
				var at = "[" + this.CONTENT_ATTR + "]";
				var aw = ai.findMultiple([au, av, at]);
				return aw
			},
			findContentNodesWithinNode: function(aw) {
				if (!aw) {
					return []
				}
				var au = ai.findNodesHavingCssClass(aw, this.CONTENT_CLASS);
				au = ai.findNodesHavingCssClass(aw, this.LEGACY_CONTENT_CLASS, au);
				var at = ai.findNodesHavingAttribute(aw, this.CONTENT_ATTR);
				if (at && at.length) {
					var av;
					for (av = 0; av < at.length; av++) {
						au.push(at[av])
					}
				}
				if (ai.hasNodeAttribute(aw, this.CONTENT_ATTR)) {
					au.push(aw)
				} else {
					if (ai.hasNodeCssClass(aw, this.CONTENT_CLASS)) {
						au.push(aw)
					} else {
						if (ai.hasNodeCssClass(aw, this.LEGACY_CONTENT_CLASS)) {
							au.push(aw)
						}
					}
				}
				au = ai.makeNodesUnique(au);
				return au
			},
			findParentContentNode: function(au) {
				if (!au) {
					return
				}
				var av = au;
				var at = 0;
				while (av && av !== J && av.parentNode) {
					if (ai.hasNodeAttribute(av, this.CONTENT_ATTR)) {
						return av
					}
					if (ai.hasNodeCssClass(av, this.CONTENT_CLASS)) {
						return av
					}
					if (ai.hasNodeCssClass(av, this.LEGACY_CONTENT_CLASS)) {
						return av
					}
					av = av.parentNode;
					if (at > 1000) {
						break
					}
					at++
				}
			},
			findPieceNode: function(au) {
				var at;
				at = ai.findFirstNodeHavingAttribute(au, this.CONTENT_PIECE_ATTR);
				if (!at) {
					at = ai.findFirstNodeHavingClass(au, this.CONTENT_PIECE_CLASS)
				}
				if (!at) {
					at = ai.findFirstNodeHavingClass(au, this.LEGACY_CONTENT_PIECE_CLASS)
				}
				if (at) {
					return at
				}
				return au
			},
			findTargetNodeNoDefault: function(at) {
				if (!at) {
					return
				}
				var au = ai.findFirstNodeHavingAttributeWithValue(at, this.CONTENT_TARGET_ATTR);
				if (au) {
					return au
				}
				au = ai.findFirstNodeHavingAttribute(at, this.CONTENT_TARGET_ATTR);
				if (au) {
					return au
				}
				au = ai.findFirstNodeHavingClass(at, this.CONTENT_TARGET_CLASS);
				if (au) {
					return au
				}
				au = ai.findFirstNodeHavingClass(at, this.LEGACY_CONTENT_TARGET_CLASS);
				if (au) {
					return au
				}
			},
			findTargetNode: function(at) {
				var au = this.findTargetNodeNoDefault(at);
				if (au) {
					return au
				}
				return at
			},
			findContentName: function(au) {
				if (!au) {
					return
				}
				var ax = ai.findFirstNodeHavingAttributeWithValue(au, this.CONTENT_NAME_ATTR);
				if (ax) {
					return ai.getAttributeValueFromNode(ax, this.CONTENT_NAME_ATTR)
				}
				var at = this.findContentPiece(au);
				if (at) {
					return this.removeDomainIfIsInLink(at)
				}
				if (ai.hasNodeAttributeWithValue(au, "title")) {
					return ai.getAttributeValueFromNode(au, "title")
				}
				var av = this.findPieceNode(au);
				if (ai.hasNodeAttributeWithValue(av, "title")) {
					return ai.getAttributeValueFromNode(av, "title")
				}
				var aw = this.findTargetNode(au);
				if (ai.hasNodeAttributeWithValue(aw, "title")) {
					return ai.getAttributeValueFromNode(aw, "title")
				}
			},
			findContentPiece: function(au) {
				if (!au) {
					return
				}
				var aw = ai.findFirstNodeHavingAttributeWithValue(au, this.CONTENT_PIECE_ATTR);
				if (aw) {
					return ai.getAttributeValueFromNode(aw, this.CONTENT_PIECE_ATTR)
				}
				var at = this.findPieceNode(au);
				var av = this.findMediaUrlInNode(at);
				if (av) {
					return this.toAbsoluteUrl(av)
				}
			},
			findContentTarget: function(av) {
				if (!av) {
					return
				}
				var aw = this.findTargetNode(av);
				if (ai.hasNodeAttributeWithValue(aw, this.CONTENT_TARGET_ATTR)) {
					return ai.getAttributeValueFromNode(aw, this.CONTENT_TARGET_ATTR)
				}
				var au;
				if (ai.hasNodeAttributeWithValue(aw, "href")) {
					au = ai.getAttributeValueFromNode(aw, "href");
					return this.toAbsoluteUrl(au)
				}
				var at = this.findPieceNode(av);
				if (ai.hasNodeAttributeWithValue(at, "href")) {
					au = ai.getAttributeValueFromNode(at, "href");
					return this.toAbsoluteUrl(au)
				}
			},
			isSameDomain: function(at) {
				if (!at || !at.indexOf) {
					return false
				}
				if (0 === at.indexOf(this.getLocation()
					.origin)) {
					return true
				}
				var au = at.indexOf(this.getLocation()
					.host);
				if (8 >= au && 0 <= au) {
					return true
				}
				return false
			},
			removeDomainIfIsInLink: function(av) {
				var au = "^https?://[^/]+";
				var at = "^.*//[^/]+";
				if (av && av.search && -1 !== av.search(new RegExp(au)) && this.isSameDomain(av)) {
					av = av.replace(new RegExp(at), "");
					if (!av) {
						av = "/"
					}
				}
				return av
			},
			findMediaUrlInNode: function(ax) {
				if (!ax) {
					return
				}
				var av = ["img", "embed", "video", "audio"];
				var at = ax.nodeName.toLowerCase();
				if (-1 !== P(av, at) && ai.findFirstNodeHavingAttributeWithValue(ax, "src")) {
					var aw = ai.findFirstNodeHavingAttributeWithValue(ax, "src");
					return ai.getAttributeValueFromNode(aw, "src")
				}
				if (at === "object" && ai.hasNodeAttributeWithValue(ax, "data")) {
					return ai.getAttributeValueFromNode(ax, "data")
				}
				if (at === "object") {
					var ay = ai.findNodesByTagName(ax, "param");
					if (ay && ay.length) {
						var au;
						for (au = 0; au < ay.length; au++) {
							if ("movie" === ai.getAttributeValueFromNode(ay[au], "name") && ai.hasNodeAttributeWithValue(ay[au], "value")) {
								return ai.getAttributeValueFromNode(ay[au], "value")
							}
						}
					}
					var az = ai.findNodesByTagName(ax, "embed");
					if (az && az.length) {
						return this.findMediaUrlInNode(az[0])
					}
				}
			},
			trim: function(at) {
				return a(at)
			},
			isOrWasNodeInViewport: function(ay) {
				if (!ay || !ay.getBoundingClientRect || ay.nodeType !== 1) {
					return true
				}
				var ax = ay.getBoundingClientRect();
				var aw = J.documentElement || {};
				var av = ax.top < 0;
				if (av && ay.offsetTop) {
					av = (ay.offsetTop + ax.height) > 0
				}
				var au = aw.clientWidth;
				if (W.innerWidth && au > W.innerWidth) {
					au = W.innerWidth
				}
				var at = aw.clientHeight;
				if (W.innerHeight && at > W.innerHeight) {
					at = W.innerHeight
				}
				return ((ax.bottom > 0 || av) && ax.right > 0 && ax.left < au && ((ax.top < at) || av))
			},
			isNodeVisible: function(au) {
				var at = i(au);
				var av = this.isOrWasNodeInViewport(au);
				return at && av
			},
			buildInteractionRequestParams: function(at, au, av, aw) {
				var ax = "";
				if (at) {
					ax += "c_i=" + t(at)
				}
				if (au) {
					if (ax) {
						ax += "&"
					}
					ax += "c_n=" + t(au)
				}
				if (av) {
					if (ax) {
						ax += "&"
					}
					ax += "c_p=" + t(av)
				}
				if (aw) {
					if (ax) {
						ax += "&"
					}
					ax += "c_t=" + t(aw)
				}
				if (ax) {
					ax += "&ca=1"
				}
				return ax
			},
			buildImpressionRequestParams: function(at, au, av) {
				var aw = "c_n=" + t(at) + "&c_p=" + t(au);
				if (av) {
					aw += "&c_t=" + t(av)
				}
				if (aw) {
					aw += "&ca=1"
				}
				return aw
			},
			buildContentBlock: function(av) {
				if (!av) {
					return
				}
				var at = this.findContentName(av);
				var au = this.findContentPiece(av);
				var aw = this.findContentTarget(av);
				at = this.trim(at);
				au = this.trim(au);
				aw = this.trim(aw);
				return {
					name: at || "Unknown",
					piece: au || "Unknown",
					target: aw || ""
				}
			},
			collectContent: function(aw) {
				if (!aw || !aw.length) {
					return []
				}
				var av = [];
				var at, au;
				for (at = 0; at < aw.length; at++) {
					au = this.buildContentBlock(aw[at]);
					if (M(au)) {
						av.push(au)
					}
				}
				return av
			},
			setLocation: function(at) {
				this.location = at
			},
			getLocation: function() {
				var at = this.location || W.location;
				if (!at.origin) {
					at.origin = at.protocol + "//" + at.hostname + (at.port ? ":" + at.port : "")
				}
				return at
			},
			toAbsoluteUrl: function(au) {
				if ((!au || String(au) !== au) && au !== "") {
					return au
				}
				if ("" === au) {
					return this.getLocation()
						.href
				}
				if (au.search(/^\/\//) !== -1) {
					return this.getLocation()
						.protocol + au
				}
				if (au.search(/:\/\//) !== -1) {
					return au
				}
				if (0 === au.indexOf("#")) {
					return this.getLocation()
						.origin + this.getLocation()
						.pathname + au
				}
				if (0 === au.indexOf("?")) {
					return this.getLocation()
						.origin + this.getLocation()
						.pathname + au
				}
				if (0 === au.search("^[a-zA-Z]{2,11}:")) {
					return au
				}
				if (au.search(/^\//) !== -1) {
					return this.getLocation()
						.origin + au
				}
				var at = "(.*/)";
				var av = this.getLocation()
					.origin + this.getLocation()
					.pathname.match(new RegExp(at))[0];
				return av + au
			},
			isUrlToCurrentDomain: function(au) {
				var av = this.toAbsoluteUrl(au);
				if (!av) {
					return false
				}
				var at = this.getLocation()
					.origin;
				if (at === av) {
					return true
				}
				if (0 === String(av)
					.indexOf(at)) {
					if (":" === String(av)
						.substr(at.length, 1)) {
						return false
					}
					return true
				}
				return false
			},
			setHrefAttribute: function(au, at) {
				if (!au || !at) {
					return
				}
				ai.setAnyAttribute(au, "href", at)
			},
			shouldIgnoreInteraction: function(at) {
				if (ai.hasNodeAttribute(at, this.CONTENT_IGNOREINTERACTION_ATTR)) {
					return true
				}
				if (ai.hasNodeCssClass(at, this.CONTENT_IGNOREINTERACTION_CLASS)) {
					return true
				}
				if (ai.hasNodeCssClass(at, this.LEGACY_CONTENT_IGNOREINTERACTION_CLASS)) {
					return true
				}
				return false
			}
		};

		function aa(au, ax) {
			if (ax) {
				return ax
			}
			au = w.toAbsoluteUrl(au);
			if (A(au, "?")) {
				var aw = au.indexOf("?");
				au = au.slice(0, aw)
			}
			if (U(au, "matomo.php")) {
				au = f(au, "matomo.php".length)
			} else {
				if (U(au, "piwik.php")) {
					au = f(au, "piwik.php".length)
				} else {
					if (U(au, ".php")) {
						var at = au.lastIndexOf("/");
						var av = 1;
						au = au.slice(0, at + av)
					}
				}
			}
			if (U(au, "/js/")) {
				au = f(au, "js/".length)
			}
			return au
		}

		function R(az) {
			var aB = "Matomo_Overlay";
			var au = new RegExp("index\\.php\\?module=Overlay&action=startOverlaySession&idSite=([0-9]+)&period=([^&]+)&date=([^&]+)(&segment=[^&]*)?");
			var av = au.exec(J.referrer);
			if (av) {
				var ax = av[1];
				if (ax !== String(az)) {
					return false
				}
				var ay = av[2],
					at = av[3],
					aw = av[4];
				if (!aw) {
					aw = ""
				} else {
					if (aw.indexOf("&segment=") === 0) {
						aw = aw.substr("&segment=".length)
					}
				}
				W.name = aB + "###" + ay + "###" + at + "###" + aw
			}
			var aA = W.name.split("###");
			return aA.length === 4 && aA[0] === aB
		}

		function ad(au, az, av) {
			var ay = W.name.split("###"),
				ax = ay[1],
				at = ay[2],
				aw = ay[3],
				aA = aa(au, az);
			o(aA + "plugins/Overlay/client/client.js?v=1", function() {
				Matomo_Overlay_Client.initialize(aA, av, ax, at, aw)
			})
		}

		function v() {
			var av;
			try {
				av = W.frameElement
			} catch (au) {
				return true
			}
			if (M(av)) {
				return (av && String(av.nodeName)
					.toLowerCase() === "iframe") ? true : false
			}
			try {
				return W.self !== W.top
			} catch (at) {
				return true
			}
		}

		function T(cj, cf) {
			var bP = this,
				bj = "mtm_consent",
				cL = "mtm_cookie_consent",
				cU = "mtm_consent_removed",
				ca = ae(J.domain, W.location.href, N()),
				c2 = O(ca[0]),
				bT = p(ca[1]),
				bu = p(ca[2]),
				c0 = false,
				cn = "GET",
				dk = cn,
				aM = "application/x-www-form-urlencoded; charset=UTF-8",
				cE = aM,
				aI = cj || "",
				bO = "",
				c9 = "",
				ct = "",
				cc = cf || "",
				bF = "",
				bU = "",
				ba, bp = "",
				dg = ["7z", "aac", "apk", "arc", "arj", "asf", "asx", "avi", "azw3", "bin", "csv", "deb", "dmg", "doc", "docx", "epub", "exe", "flv", "gif", "gz", "gzip", "hqx", "ibooks", "jar", "jpg", "jpeg", "js", "mobi", "mp2", "mp3", "mp4", "mpg", "mpeg", "mov", "movie", "msi", "msp", "odb", "odf", "odg", "ods", "odt", "ogg", "ogv", "pdf", "phps", "png", "ppt", "pptx", "qt", "qtm", "ra", "ram", "rar", "rpm", "rtf", "sea", "sit", "tar", "tbz", "tbz2", "bz", "bz2", "tgz", "torrent", "txt", "wav", "wma", "wmv", "wpd", "xls", "xlsx", "xml", "z", "zip"],
				aC = [c2],
				bG = [],
				co = [],
				bR = [],
				be = [],
				bQ = 500,
				c5 = true,
				cR, bb, bX, bV, at, cw = ["pk_campaign", "mtm_campaign", "piwik_campaign", "matomo_campaign", "utm_campaign", "utm_source", "utm_medium"],
				bN = ["pk_kwd", "mtm_kwd", "piwik_kwd", "matomo_kwd", "utm_term"],
				bq = "_pk_",
				az = "pk_vid",
				a5 = 180,
				c7, bw, bY = false,
				aN = "Lax",
				bs = false,
				cY, bk, bC, cS = 33955200000,
				cu = 1800000,
				df = 15768000000,
				a8 = true,
				bL = false,
				bn = false,
				bW = false,
				aV = false,
				ch, b2 = {},
				cs = {},
				bt = {},
				bA = 200,
				cA = {},
				da = {},
				dh = {},
				cg = [],
				ck = false,
				cJ = false,
				au = false,
				di = false,
				cV = false,
				aS = false,
				bi = v(),
				cF = null,
				c8 = null,
				aW, bI, cd = aq,
				bv, aQ, bH = false,
				cx = 0,
				bB = ["id", "ses", "cvar", "ref"],
				cI = false,
				bJ = null,
				cT = [],
				cz = [],
				aB = X++,
				aA = false,
				c6 = true;
			if (/^https?:\/\/([a-z0-9\.\-]+\.)?paypal\.com(\/|$)/.test(bu)) {
				bu = ""
			}
			try {
				bp = J.title
			} catch (cG) {
				bp = ""
			}

			function aH(dw) {
				if (bs) {
					return 0
				}
				var du = new RegExp("(^|;)[ ]*" + dw + "=([^;]*)"),
					dv = du.exec(J.cookie);
				return dv ? V(dv[2]) : 0
			}
			bJ = !aH(cU);

			function dp(dy, dz, dC, dB, dw, dx, dA) {
				if (bs && dy !== cU) {
					return
				}
				var dv;
				if (dC) {
					dv = new Date();
					dv.setTime(dv.getTime() + dC)
				}
				if (!dA) {
					dA = "Lax"
				}
				J.cookie = dy + "=" + t(dz) + (dC ? ";expires=" + dv.toGMTString() : "") + ";path=" + (dB || "/") + (dw ? ";domain=" + dw : "") + (dx ? ";secure" : "") + ";SameSite=" + dA;
				if ((!dC || dC >= 0) && aH(dy) !== String(dz)) {
					var du = "There was an error setting cookie `" + dy + "`. Please check domain and path.";
					ao(du)
				}
			}

			function b8(du) {
				var dw, dv;
				du = j(du, az);
				for (dv = 0; dv < co.length; dv++) {
					du = j(du, co[dv])
				}
				if (bV) {
					dw = new RegExp("#.*");
					return du.replace(dw, "")
				}
				return du
			}

			function b1(dw, du) {
				var dx = s(du),
					dv;
				if (dx) {
					return du
				}
				if (du.slice(0, 1) === "/") {
					return s(dw) + "://" + d(dw) + du
				}
				dw = b8(dw);
				dv = dw.indexOf("?");
				if (dv >= 0) {
					dw = dw.slice(0, dv)
				}
				dv = dw.lastIndexOf("/");
				if (dv !== dw.length - 1) {
					dw = dw.slice(0, dv + 1)
				}
				return dw + du
			}

			function cP(dw, du) {
				var dv;
				dw = String(dw)
					.toLowerCase();
				du = String(du)
					.toLowerCase();
				if (dw === du) {
					return true
				}
				if (du.slice(0, 1) === ".") {
					if (dw === du.slice(1)) {
						return true
					}
					dv = dw.length - du.length;
					if ((dv > 0) && (dw.slice(dv) === du)) {
						return true
					}
				}
				return false
			}

			function cr(du) {
				var dv = document.createElement("a");
				if (du.indexOf("//") !== 0 && du.indexOf("http") !== 0) {
					if (du.indexOf("*") === 0) {
						du = du.substr(1)
					}
					if (du.indexOf(".") === 0) {
						du = du.substr(1)
					}
					du = "http://" + du
				}
				dv.href = w.toAbsoluteUrl(du);
				if (dv.pathname) {
					return dv.pathname
				}
				return ""
			}

			function a9(dv, du) {
				if (!an(du, "/")) {
					du = "/" + du
				}
				if (!an(dv, "/")) {
					dv = "/" + dv
				}
				var dw = (du === "/" || du === "/*");
				if (dw) {
					return true
				}
				if (dv === du) {
					return true
				}
				du = String(du)
					.toLowerCase();
				dv = String(dv)
					.toLowerCase();
				if (U(du, "*")) {
					du = du.slice(0, -1);
					dw = (!du || du === "/");
					if (dw) {
						return true
					}
					if (dv === du) {
						return true
					}
					return dv.indexOf(du) === 0
				}
				if (!U(dv, "/")) {
					dv += "/"
				}
				if (!U(du, "/")) {
					du += "/"
				}
				return dv.indexOf(du) === 0
			}

			function aw(dy, dA) {
				var dv, du, dw, dx, dz;
				for (dv = 0; dv < aC.length; dv++) {
					dx = O(aC[dv]);
					dz = cr(aC[dv]);
					if (cP(dy, dx) && a9(dA, dz)) {
						return true
					}
				}
				return false
			}

			function a1(dx) {
				var dv, du, dw;
				for (dv = 0; dv < aC.length; dv++) {
					du = O(aC[dv].toLowerCase());
					if (dx === du) {
						return true
					}
					if (du.slice(0, 1) === ".") {
						if (dx === du.slice(1)) {
							return true
						}
						dw = dx.length - du.length;
						if ((dw > 0) && (dx.slice(dw) === du)) {
							return true
						}
					}
				}
				return false
			}

			function cv(du, dw) {
				du = du.replace("send_image=0", "send_image=1");
				var dv = new Image(1, 1);
				dv.onload = function() {
					H = 0;
					if (typeof dw === "function") {
						dw({
							request: du,
							trackerUrl: aI,
							success: true
						})
					}
				};
				dv.onerror = function() {
					if (typeof dw === "function") {
						dw({
							request: du,
							trackerUrl: aI,
							success: false
						})
					}
				};
				dv.src = aI + (aI.indexOf("?") < 0 ? "?" : "&") + du
			}

			function cM(du) {
				if (dk === "POST") {
					return true
				}
				return du && (du.length > 2000 || du.indexOf('{"requests"') === 0)
			}

			function aP() {
				return "object" === typeof g && "function" === typeof g.sendBeacon && "function" === typeof Blob
			}

			function bc(dy, dB, dA) {
				var dw = aP();
				if (!dw) {
					return false
				}
				var dx = {
					type: "application/x-www-form-urlencoded; charset=UTF-8"
				};
				var dC = false;
				var dv = aI;
				try {
					var du = new Blob([dy], dx);
					if (dA && !cM(dy)) {
						du = new Blob([], dx);
						dv = dv + (dv.indexOf("?") < 0 ? "?" : "&") + dy
					}
					dC = g.sendBeacon(dv, du)
				} catch (dz) {
					return false
				}
				if (dC && typeof dB === "function") {
					dB({
						request: dy,
						trackerUrl: aI,
						success: true,
						isSendBeacon: true
					})
				}
				return dC
			}

			function de(dv, dw, du) {
				if (!M(du) || null === du) {
					du = true
				}
				if (m && bc(dv, dw, du)) {
					return
				}
				setTimeout(function() {
					if (m && bc(dv, dw, du)) {
						return
					}
					var dz;
					try {
						var dy = W.XMLHttpRequest ? new W.XMLHttpRequest() : W.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : null;
						dy.open("POST", aI, true);
						dy.onreadystatechange = function() {
							if (this.readyState === 4 && !(this.status >= 200 && this.status < 300)) {
								var dA = m && bc(dv, dw, du);
								if (!dA && du) {
									cv(dv, dw)
								} else {
									if (typeof dw === "function") {
										dw({
											request: dv,
											trackerUrl: aI,
											success: false,
											xhr: this
										})
									}
								}
							} else {
								if (this.readyState === 4 && (typeof dw === "function")) {
									dw({
										request: dv,
										trackerUrl: aI,
										success: true,
										xhr: this
									})
								}
							}
						};
						dy.setRequestHeader("Content-Type", cE);
						dy.withCredentials = true;
						dy.send(dv)
					} catch (dx) {
						dz = m && bc(dv, dw, du);
						if (!dz && du) {
							cv(dv, dw)
						} else {
							if (typeof dw === "function") {
								dw({
									request: dv,
									trackerUrl: aI,
									success: false
								})
							}
						}
					}
				}, 50)
			}

			function cl(dv) {
				var du = new Date();
				var dw = du.getTime() + dv;
				if (!r || dw > r) {
					r = dw
				}
			}

			function bg() {
				bi = true;
				cF = new Date()
					.getTime()
			}

			function dn() {
				var du = new Date()
					.getTime();
				return !cF || (du - cF) > bb
			}

			function aD() {
				if (dn()) {
					bX()
				}
			}

			function a0() {
				if (J.visibilityState === "hidden" && dn()) {
					bX()
				} else {
					if (J.visibilityState === "visible") {
						cF = new Date()
							.getTime()
					}
				}
			}

			function dr() {
				if (aS || !bb) {
					return
				}
				aS = true;
				ar(W, "focus", bg);
				ar(W, "blur", aD);
				ar(W, "visibilitychange", a0);
				af++;
				u.addPlugin("HeartBeat" + af, {
					unload: function() {
						if (aS && dn()) {
							bX()
						}
					}
				})
			}

			function cK(dy) {
				var dv = new Date();
				var du = dv.getTime();
				c8 = du;
				if (cJ && du < cJ) {
					var dw = cJ - du;
					setTimeout(dy, dw);
					cl(dw + 50);
					cJ += 50;
					return
				}
				if (cJ === false) {
					var dx = 800;
					cJ = du + dx
				}
				dy()
			}

			function aT() {
				if (aH(cU)) {
					bJ = false
				} else {
					if (aH(bj)) {
						bJ = true
					}
				}
			}

			function bM(dv, du, dw) {
				aT();
				if (!bJ) {
					cT.push(dv);
					return
				}
				aA = true;
				if (!cY && dv) {
					if (cI && bJ) {
						dv += "&consent=1"
					}
					cK(function() {
						if (c5 && bc(dv, dw, true)) {
							cl(100);
							return
						}
						if (cM(dv)) {
							de(dv, dw)
						} else {
							cv(dv, dw)
						}
						cl(du)
					})
				}
				if (!aS) {
					dr()
				}
			}

			function cq(du) {
				if (cY) {
					return false
				}
				return (du && du.length)
			}

			function dd(du, dy) {
				if (!dy || dy >= du.length) {
					return [du]
				}
				var dv = 0;
				var dw = du.length;
				var dx = [];
				for (dv; dv < dw; dv += dy) {
					dx.push(du.slice(dv, dv + dy))
				}
				return dx
			}

			function dq(dv, du) {
				if (!cq(dv)) {
					return
				}
				if (!bJ) {
					cT.push(dv);
					return
				}
				aA = true;
				cK(function() {
					var dy = dd(dv, 50);
					var dw = 0,
						dx;
					for (dw; dw < dy.length; dw++) {
						dx = '{"requests":["?' + dy[dw].join('","?') + '"],"send_image":0}';
						if (c5 && bc(dx, null, false)) {
							cl(100)
						} else {
							de(dx, null, false)
						}
					}
					cl(du)
				})
			}

			function aY(du) {
				return bq + du + "." + cc + "." + bv
			}

			function b5(dw, dv, du) {
				dp(dw, "", -129600000, dv, du)
			}

			function cb() {
				if (bs) {
					return "0"
				}
				if (!M(W.showModalDialog) && M(g.cookieEnabled)) {
					return g.cookieEnabled ? "1" : "0"
				}
				var du = bq + "testcookie";
				dp(du, "1", undefined, bw, c7, bY, aN);
				var dv = aH(du) === "1" ? "1" : "0";
				b5(du);
				return dv
			}

			function bo() {
				bv = cd((c7 || c2) + (bw || "/"))
					.slice(0, 4)
			}

			function cQ() {
				if (!c6) {
					return {}
				}
				if (M(dh.res)) {
					return dh
				}
				var dv, dx, dy = {
					pdf: "application/pdf",
					qt: "video/quicktime",
					realp: "audio/x-pn-realaudio-plugin",
					wma: "application/x-mplayer2",
					fla: "application/x-shockwave-flash",
					java: "application/x-java-vm",
					ag: "application/x-silverlight"
				};
				if (!((new RegExp("MSIE"))
					.test(g.userAgent))) {
					if (g.mimeTypes && g.mimeTypes.length) {
						for (dv in dy) {
							if (Object.prototype.hasOwnProperty.call(dy, dv)) {
								dx = g.mimeTypes[dy[dv]];
								dh[dv] = (dx && dx.enabledPlugin) ? "1" : "0"
							}
						}
					}
					if (!((new RegExp("Edge[ /](\\d+[\\.\\d]+)"))
						.test(g.userAgent)) && typeof navigator.javaEnabled !== "unknown" && M(g.javaEnabled) && g.javaEnabled()) {
						dh.java = "1"
					}
					if (!M(W.showModalDialog) && M(g.cookieEnabled)) {
						dh.cookie = g.cookieEnabled ? "1" : "0"
					} else {
						dh.cookie = cb()
					}
				}
				var dw = parseInt(ab.width, 10);
				var du = parseInt(ab.height, 10);
				dh.res = parseInt(dw, 10) + "x" + parseInt(du, 10);
				return dh
			}

			function b3() {
				var dv = aY("cvar"),
					du = aH(dv);
				if (du && du.length) {
					du = W.JSON.parse(du);
					if (Z(du)) {
						return du
					}
				}
				return {}
			}

			function cN() {
				if (aV === false) {
					aV = b3()
				}
			}

			function cZ() {
				var du = cQ();
				return cd((g.userAgent || "") + (g.platform || "") + W.JSON.stringify(du) + (new Date())
						.getTime() + Math.random())
					.slice(0, 16)
			}

			function aF() {
				var du = cQ();
				return cd((g.userAgent || "") + (g.platform || "") + W.JSON.stringify(du))
					.slice(0, 6)
			}

			function bl() {
				return Math.floor((new Date())
					.getTime() / 1000)
			}

			function aO() {
				var dv = bl();
				var dw = aF();
				var du = String(dv) + dw;
				return du
			}

			function dc(dw) {
				dw = String(dw);
				var dz = aF();
				var dx = dz.length;
				var dy = dw.substr(-1 * dx, dx);
				var dv = parseInt(dw.substr(0, dw.length - dx), 10);
				if (dv && dy && dy === dz) {
					var du = bl();
					if (a5 <= 0) {
						return true
					}
					if (du >= dv && du <= (dv + a5)) {
						return true
					}
				}
				return false
			}

			function ds(du) {
				if (!cV) {
					return ""
				}
				var dy = e(du, az);
				if (!dy) {
					return ""
				}
				dy = String(dy);
				var dw = new RegExp("^[a-zA-Z0-9]+$");
				if (dy.length === 32 && dw.test(dy)) {
					var dv = dy.substr(16, 32);
					if (dc(dv)) {
						var dx = dy.substr(0, 16);
						return dx
					}
				}
				return ""
			}

			function cW() {
				if (!bU) {
					bU = ds(bT)
				}
				var dw = new Date(),
					du = Math.round(dw.getTime() / 1000),
					dv = aY("id"),
					dz = aH(dv),
					dy, dx;
				if (dz) {
					dy = dz.split(".");
					dy.unshift("0");
					if (bU.length) {
						dy[1] = bU
					}
					return dy
				}
				if (bU.length) {
					dx = bU
				} else {
					if ("0" === cb()) {
						dx = ""
					} else {
						dx = cZ()
					}
				}
				dy = ["1", dx, du];
				return dy
			}

			function a4() {
				var dx = cW(),
					dv = dx[0],
					dw = dx[1],
					du = dx[2];
				return {
					newVisitor: dv,
					uuid: dw,
					createTs: du
				}
			}

			function aL() {
				var dx = new Date(),
					dv = dx.getTime(),
					dy = a4()
					.createTs;
				var du = parseInt(dy, 10);
				var dw = (du * 1000) + cS - dv;
				return dw
			}

			function aR(du) {
				if (!cc) {
					return
				}
				var dw = new Date(),
					dv = Math.round(dw.getTime() / 1000);
				if (!M(du)) {
					du = a4()
				}
				var dx = du.uuid + "." + du.createTs + ".";
				dp(aY("id"), dx, aL(), bw, c7, bY, aN)
			}

			function bS() {
				var du = aH(aY("ref"));
				if (du.length) {
					try {
						du = W.JSON.parse(du);
						if (Z(du)) {
							return du
						}
					} catch (dv) {}
				}
				return ["", "", 0, ""]
			}

			function bD(dw) {
				var dv = bq + "testcookie_domain";
				var du = "testvalue";
				dp(dv, du, 10000, null, dw, bY, aN);
				if (aH(dv) === du) {
					b5(dv, null, dw);
					return true
				}
				return false
			}

			function aJ() {
				var dv = bs;
				bs = false;
				var du, dw;
				for (du = 0; du < bB.length; du++) {
					dw = aY(bB[du]);
					if (dw !== cU && dw !== bj && 0 !== aH(dw)) {
						b5(dw, bw, c7)
					}
				}
				bs = dv
			}

			function b9(du) {
				cc = du
			}

			function dt(dy) {
				if (!dy || !Z(dy)) {
					return
				}
				var dx = [];
				var dw;
				for (dw in dy) {
					if (Object.prototype.hasOwnProperty.call(dy, dw)) {
						dx.push(dw)
					}
				}
				var dz = {};
				dx.sort();
				var du = dx.length;
				var dv;
				for (dv = 0; dv < du; dv++) {
					dz[dx[dv]] = dy[dx[dv]]
				}
				return dz
			}

			function ci() {
				dp(aY("ses"), "1", cu, bw, c7, bY, aN)
			}

			function bm() {
				var dx = "";
				var dv = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
				var dw = dv.length;
				var du;
				for (du = 0; du < 6; du++) {
					dx += dv.charAt(Math.floor(Math.random() * dw))
				}
				return dx
			}

			function aE(dv) {
				if (ct !== "") {
					dv += ct;
					bn = true;
					return dv
				}
				if (!h) {
					return dv
				}
				var dw = (typeof h.timing === "object") && h.timing ? h.timing : undefined;
				if (!dw) {
					dw = (typeof h.getEntriesByType === "function") && h.getEntriesByType("navigation") ? h.getEntriesByType("navigation")[0] : undefined
				}
				if (!dw) {
					return dv
				}
				var du = "";
				if (dw.connectEnd && dw.fetchStart) {
					if (dw.connectEnd < dw.fetchStart) {
						return dv
					}
					du += "&pf_net=" + Math.round(dw.connectEnd - dw.fetchStart)
				}
				if (dw.responseStart && dw.requestStart) {
					if (dw.responseStart < dw.requestStart) {
						return dv
					}
					du += "&pf_srv=" + Math.round(dw.responseStart - dw.requestStart)
				}
				if (dw.responseStart && dw.responseEnd) {
					if (dw.responseEnd < dw.responseStart) {
						return dv
					}
					du += "&pf_tfr=" + Math.round(dw.responseEnd - dw.responseStart)
				}
				if (M(dw.domLoading)) {
					if (dw.domInteractive && dw.domLoading) {
						if (dw.domInteractive < dw.domLoading) {
							return dv
						}
						du += "&pf_dm1=" + Math.round(dw.domInteractive - dw.domLoading)
					}
				} else {
					if (dw.domInteractive && dw.responseEnd) {
						if (dw.domInteractive < dw.responseEnd) {
							return dv
						}
						du += "&pf_dm1=" + Math.round(dw.domInteractive - dw.responseEnd)
					}
				}
				if (dw.domComplete && dw.domInteractive) {
					if (dw.domComplete < dw.domInteractive) {
						return dv
					}
					du += "&pf_dm2=" + Math.round(dw.domComplete - dw.domInteractive)
				}
				if (dw.loadEventEnd && dw.loadEventStart) {
					if (dw.loadEventEnd < dw.loadEventStart) {
						return dv
					}
					du += "&pf_onl=" + Math.round(dw.loadEventEnd - dw.loadEventStart)
				}
				return dv + du
			}

			function dj() {
				var dE, dx = new Date(),
					dy = Math.round(dx.getTime() / 1000),
					dJ, dw, dz = 1024,
					dG, dA, dv = aY("ses"),
					dD = aY("ref"),
					dC = aH(dv),
					du = bS(),
					dI = ba || bT,
					dF, dB, dH = {};
				dF = du[0];
				dB = du[1];
				dJ = du[2];
				dw = du[3];
				if (!dC) {
					if (!bC || !dF.length) {
						for (dE in cw) {
							if (Object.prototype.hasOwnProperty.call(cw, dE)) {
								dF = e(dI, cw[dE]);
								if (dF.length) {
									break
								}
							}
						}
						for (dE in bN) {
							if (Object.prototype.hasOwnProperty.call(bN, dE)) {
								dB = e(dI, bN[dE]);
								if (dB.length) {
									break
								}
							}
						}
					}
					dG = d(bu);
					dA = dw.length ? d(dw) : "";
					if (dG.length && !a1(dG) && (!bC || !dA.length || a1(dA))) {
						dw = bu
					}
					if (dw.length || dF.length) {
						dJ = dy;
						du = [dF, dB, dJ, b8(dw.slice(0, dz))];
						dp(dD, W.JSON.stringify(du), df, bw, c7, bY, aN)
					}
				}
				if (dF.length) {
					dH._rcn = t(dF)
				}
				if (dB.length) {
					dH._rck = t(dB)
				}
				dH._refts = dJ;
				if (String(dw)
					.length) {
					dH._ref = t(b8(dw.slice(0, dz)))
				}
				return dH
			}

			function cy(dv, dG, dH) {
				var dF, du = new Date(),
					dE = aV,
					dA = aY("cvar"),
					dI = ba || bT;
				if (bs) {
					aJ()
				}
				if (cY) {
					return ""
				}
				var dB = a4();
				var dy = J.characterSet || J.charset;
				if (!dy || dy.toLowerCase() === "utf-8") {
					dy = null
				}
				dv += "&idsite=" + cc + "&rec=1&r=" + String(Math.random())
					.slice(2, 8) + "&h=" + du.getHours() + "&m=" + du.getMinutes() + "&s=" + du.getSeconds() + "&url=" + t(b8(dI)) + (bu.length ? "&urlref=" + t(b8(bu)) : "") + (ac(bF) ? "&uid=" + t(bF) : "") + "&_id=" + dB.uuid + "&_idn=" + dB.newVisitor + (dy ? "&cs=" + t(dy) : "") + "&send_image=0";
				var dD = dj();
				for (dF in dD) {
					if (Object.prototype.hasOwnProperty.call(dD, dF)) {
						dv += "&" + dF + "=" + dD[dF]
					}
				}
				var dK = cQ();
				for (dF in dK) {
					if (Object.prototype.hasOwnProperty.call(dK, dF)) {
						dv += "&" + dF + "=" + dK[dF]
					}
				}
				var dL = [];
				if (dG) {
					for (dF in dG) {
						if (Object.prototype.hasOwnProperty.call(dG, dF) && /^dimension\d+$/.test(dF)) {
							var dw = dF.replace("dimension", "");
							dL.push(parseInt(dw, 10));
							dL.push(String(dw));
							dv += "&" + dF + "=" + t(dG[dF]);
							delete dG[dF]
						}
					}
				}
				if (dG && D(dG)) {
					dG = null
				}
				for (dF in cA) {
					if (Object.prototype.hasOwnProperty.call(cA, dF)) {
						dv += "&" + dF + "=" + t(cA[dF])
					}
				}
				for (dF in bt) {
					if (Object.prototype.hasOwnProperty.call(bt, dF)) {
						var dz = (-1 === P(dL, dF));
						if (dz) {
							dv += "&dimension" + dF + "=" + t(bt[dF])
						}
					}
				}
				if (dG) {
					dv += "&data=" + t(W.JSON.stringify(dG))
				} else {
					if (at) {
						dv += "&data=" + t(W.JSON.stringify(at))
					}
				}

				function dx(dM, dN) {
					var dO = W.JSON.stringify(dM);
					if (dO.length > 2) {
						return "&" + dN + "=" + t(dO)
					}
					return ""
				}
				var dJ = dt(b2);
				var dC = dt(cs);
				dv += dx(dJ, "cvar");
				dv += dx(dC, "e_cvar");
				if (aV) {
					dv += dx(aV, "_cvar");
					for (dF in dE) {
						if (Object.prototype.hasOwnProperty.call(dE, dF)) {
							if (aV[dF][0] === "" || aV[dF][1] === "") {
								delete aV[dF]
							}
						}
					}
					if (bW) {
						dp(dA, W.JSON.stringify(aV), cu, bw, c7, bY, aN)
					}
				}
				if (a8 && bL && !bn) {
					dv = aE(dv);
					bn = true
				}
				if (aQ) {
					dv += "&pv_id=" + aQ
				}
				aR(dB);
				ci();
				dv += ag(dH, {
					tracker: bP,
					request: dv
				});
				if (c9.length) {
					dv += "&" + c9
				}
				if (C(ch)) {
					dv = ch(dv)
				}
				return dv
			}
			bX = function bd() {
				var du = new Date();
				du = du.getTime();
				if (!c8) {
					return false
				}
				if (c8 + bb <= du) {
					bP.ping();
					return true
				}
				return false
			};

			function bx(dx, dw, dB, dy, du, dE) {
				var dA = "idgoal=0",
					dv = new Date(),
					dC = [],
					dD, dz = String(dx)
					.length;
				if (dz) {
					dA += "&ec_id=" + t(dx)
				}
				dA += "&revenue=" + dw;
				if (String(dB)
					.length) {
					dA += "&ec_st=" + dB
				}
				if (String(dy)
					.length) {
					dA += "&ec_tx=" + dy
				}
				if (String(du)
					.length) {
					dA += "&ec_sh=" + du
				}
				if (String(dE)
					.length) {
					dA += "&ec_dt=" + dE
				}
				if (da) {
					for (dD in da) {
						if (Object.prototype.hasOwnProperty.call(da, dD)) {
							if (!M(da[dD][1])) {
								da[dD][1] = ""
							}
							if (!M(da[dD][2])) {
								da[dD][2] = ""
							}
							if (!M(da[dD][3]) || String(da[dD][3])
								.length === 0) {
								da[dD][3] = 0
							}
							if (!M(da[dD][4]) || String(da[dD][4])
								.length === 0) {
								da[dD][4] = 1
							}
							dC.push(da[dD])
						}
					}
					dA += "&ec_items=" + t(W.JSON.stringify(dC))
				}
				dA = cy(dA, at, "ecommerce");
				bM(dA, bQ);
				if (dz) {
					da = {}
				}
			}

			function b4(du, dy, dx, dw, dv, dz) {
				if (String(du)
					.length && M(dy)) {
					bx(du, dy, dx, dw, dv, dz)
				}
			}

			function bz(du) {
				if (M(du)) {
					bx("", du, "", "", "", "")
				}
			}

			function b6(dv, dx, dw) {
				if (!bH) {
					aQ = bm()
				}
				var du = cy("action_name=" + t(ap(dv || bp)), dx, "log");
				if (a8 && !bn) {
					du = aE(du)
				}
				bM(du, bQ, dw)
			}

			function a6(dw, dv) {
				var dx, du = "(^| )(piwik[_-]" + dv + "|matomo[_-]" + dv;
				if (dw) {
					for (dx = 0; dx < dw.length; dx++) {
						du += "|" + dw[dx]
					}
				}
				du += ")( |$)";
				return new RegExp(du)
			}

			function aZ(du) {
				return (aI && du && 0 === String(du)
					.indexOf(aI))
			}

			function cC(dy, du, dz, dv) {
				if (aZ(du)) {
					return 0
				}
				var dx = a6(bR, "download"),
					dw = a6(be, "link"),
					dA = new RegExp("\\.(" + dg.join("|") + ")([?&#]|$)", "i");
				if (dw.test(dy)) {
					return "link"
				}
				if (dv || dx.test(dy) || dA.test(du)) {
					return "download"
				}
				if (dz) {
					return 0
				}
				return "link"
			}

			function ay(dv) {
				var du;
				du = dv.parentNode;
				while (du !== null && M(du)) {
					if (ai.isLinkElement(dv)) {
						break
					}
					dv = du;
					du = dv.parentNode
				}
				return dv
			}

			function dm(dz) {
				dz = ay(dz);
				if (!ai.hasNodeAttribute(dz, "href")) {
					return
				}
				if (!M(dz.href)) {
					return
				}
				var dy = ai.getAttributeValueFromNode(dz, "href");
				var dv = dz.pathname || cr(dz.href);
				var dA = dz.hostname || d(dz.href);
				var dB = dA.toLowerCase();
				var dw = dz.href.replace(dA, dB);
				var dx = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto|tel):", "i");
				if (!dx.test(dw)) {
					var du = cC(dz.className, dw, aw(dB, dv), ai.hasNodeAttribute(dz, "download"));
					if (du) {
						return {
							type: du,
							href: dw
						}
					}
				}
			}

			function aU(du, dv, dw, dx) {
				var dy = w.buildInteractionRequestParams(du, dv, dw, dx);
				if (!dy) {
					return
				}
				return cy(dy, null, "contentInteraction")
			}

			function bh(du, dv) {
				if (!du || !dv) {
					return false
				}
				var dw = w.findTargetNode(du);
				if (w.shouldIgnoreInteraction(dw)) {
					return false
				}
				dw = w.findTargetNodeNoDefault(du);
				if (dw && !Y(dw, dv)) {
					return false
				}
				return true
			}

			function cB(dw, dv, dy) {
				if (!dw) {
					return
				}
				var du = w.findParentContentNode(dw);
				if (!du) {
					return
				}
				if (!bh(du, dw)) {
					return
				}
				var dx = w.buildContentBlock(du);
				if (!dx) {
					return
				}
				if (!dx.target && dy) {
					dx.target = dy
				}
				return w.buildInteractionRequestParams(dv, dx.name, dx.piece, dx.target)
			}

			function a2(dv) {
				if (!cg || !cg.length) {
					return false
				}
				var du, dw;
				for (du = 0; du < cg.length; du++) {
					dw = cg[du];
					if (dw && dw.name === dv.name && dw.piece === dv.piece && dw.target === dv.target) {
						return true
					}
				}
				return false
			}

			function a3(du) {
				return function(dy) {
					if (!du) {
						return
					}
					var dw = w.findParentContentNode(du);
					var dv;
					if (dy) {
						dv = dy.target || dy.srcElement
					}
					if (!dv) {
						dv = du
					}
					if (!bh(dw, dv)) {
						return
					}
					if (!dw) {
						return false
					}
					var dz = w.findTargetNode(dw);
					if (!dz || w.shouldIgnoreInteraction(dz)) {
						return false
					}
					var dx = dm(dz);
					if (di && dx && dx.type) {
						return dx.type
					}
					return bP.trackContentInteractionNode(dv, "click")
				}
			}

			function b7(dw) {
				if (!dw || !dw.length) {
					return
				}
				var du, dv;
				for (du = 0; du < dw.length; du++) {
					dv = w.findTargetNode(dw[du]);
					if (dv && !dv.contentInteractionTrackingSetupDone) {
						dv.contentInteractionTrackingSetupDone = true;
						ar(dv, "click", a3(dv))
					}
				}
			}

			function bE(dw, dx) {
				if (!dw || !dw.length) {
					return []
				}
				var du, dv;
				for (du = 0; du < dw.length; du++) {
					if (a2(dw[du])) {
						dw.splice(du, 1);
						du--
					} else {
						cg.push(dw[du])
					}
				}
				if (!dw || !dw.length) {
					return []
				}
				b7(dx);
				var dy = [];
				for (du = 0; du < dw.length; du++) {
					dv = cy(w.buildImpressionRequestParams(dw[du].name, dw[du].piece, dw[du].target), undefined, "contentImpressions");
					if (dv) {
						dy.push(dv)
					}
				}
				return dy
			}

			function cH(dv) {
				var du = w.collectContent(dv);
				return bE(du, dv)
			}

			function bf(dv) {
				if (!dv || !dv.length) {
					return []
				}
				var du;
				for (du = 0; du < dv.length; du++) {
					if (!w.isNodeVisible(dv[du])) {
						dv.splice(du, 1);
						du--
					}
				}
				if (!dv || !dv.length) {
					return []
				}
				return cH(dv)
			}

			function aK(dw, du, dv) {
				var dx = w.buildImpressionRequestParams(dw, du, dv);
				return cy(dx, null, "contentImpression")
			}

			function dl(dx, dv) {
				if (!dx) {
					return
				}
				var du = w.findParentContentNode(dx);
				var dw = w.buildContentBlock(du);
				if (!dw) {
					return
				}
				if (!dv) {
					dv = "Unknown"
				}
				return aU(dv, dw.name, dw.piece, dw.target)
			}

			function cX(dv, dx, du, dw) {
				return "e_c=" + t(dv) + "&e_a=" + t(dx) + (M(du) ? "&e_n=" + t(du) : "") + (M(dw) ? "&e_v=" + t(dw) : "") + "&ca=1"
			}

			function ax(dw, dy, du, dx, dA, dz) {
				if (!ac(dw) || !ac(dy)) {
					ao("Error while logging event: Parameters `category` and `action` must not be empty or filled with whitespaces");
					return false
				}
				var dv = cy(cX(dw, dy, du, dx), dA, "event");
				bM(dv, bQ, dz)
			}

			function ce(du, dx, dv, dy) {
				var dw = cy("search=" + t(du) + (dx ? "&search_cat=" + t(dx) : "") + (M(dv) ? "&search_count=" + dv : ""), dy, "sitesearch");
				bM(dw, bQ)
			}

			function c1(du, dy, dx, dw) {
				var dv = cy("idgoal=" + du + (dy ? "&revenue=" + dy : ""), dx, "goal");
				bM(dv, bQ, dw)
			}

			function db(dx, du, dB, dA, dw) {
				var dz = du + "=" + t(b8(dx));
				var dv = cB(dw, "click", dx);
				if (dv) {
					dz += "&" + dv
				}
				var dy = cy(dz, dB, "link");
				bM(dy, bQ, dA)
			}

			function b0(dv, du) {
				if (dv !== "") {
					return dv + du.charAt(0)
						.toUpperCase() + du.slice(1)
				}
				return du
			}

			function cm(dz) {
				var dy, du, dx = ["", "webkit", "ms", "moz"],
					dw;
				if (!bk) {
					for (du = 0; du < dx.length; du++) {
						dw = dx[du];
						if (Object.prototype.hasOwnProperty.call(J, b0(dw, "hidden"))) {
							if (J[b0(dw, "visibilityState")] === "prerender") {
								dy = true
							}
							break
						}
					}
				}
				if (dy) {
					ar(J, dw + "visibilitychange", function dv() {
						J.removeEventListener(dw + "visibilitychange", dv, false);
						dz()
					});
					return
				}
				dz()
			}

			function by() {
				var dv = bP.getVisitorId();
				var du = aO();
				return dv + du
			}

			function cp(du) {
				if (!du) {
					return
				}
				if (!ai.hasNodeAttribute(du, "href")) {
					return
				}
				var dv = ai.getAttributeValueFromNode(du, "href");
				if (!dv || aZ(dv)) {
					return
				}
				if (!bP.getVisitorId()) {
					return
				}
				dv = j(dv, az);
				var dw = by();
				dv = I(dv, az, dw);
				ai.setAnyAttribute(du, "href", dv)
			}

			function br(dx) {
				var dy = ai.getAttributeValueFromNode(dx, "href");
				if (!dy) {
					return false
				}
				dy = String(dy);
				var dv = dy.indexOf("//") === 0 || dy.indexOf("http://") === 0 || dy.indexOf("https://") === 0;
				if (!dv) {
					return false
				}
				var du = dx.pathname || cr(dx.href);
				var dw = (dx.hostname || d(dx.href))
					.toLowerCase();
				if (aw(dw, du)) {
					if (!cP(c2, O(dw))) {
						return true
					}
					return false
				}
				return false
			}

			function cO(du) {
				var dv = dm(du);
				if (dv && dv.type) {
					dv.href = p(dv.href);
					db(dv.href, dv.type, undefined, null, du);
					return
				}
				if (cV) {
					du = ay(du);
					if (br(du)) {
						cp(du)
					}
				}
			}

			function cD() {
				return J.all && !J.addEventListener
			}

			function c3(du) {
				var dw = du.which;
				var dv = (typeof du.button);
				if (!dw && dv !== "undefined") {
					if (cD()) {
						if (du.button & 1) {
							dw = 1
						} else {
							if (du.button & 2) {
								dw = 3
							} else {
								if (du.button & 4) {
									dw = 2
								}
							}
						}
					} else {
						if (du.button === 0 || du.button === "0") {
							dw = 1
						} else {
							if (du.button & 1) {
								dw = 2
							} else {
								if (du.button & 2) {
									dw = 3
								}
							}
						}
					}
				}
				return dw
			}

			function bZ(du) {
				switch (c3(du)) {
					case 1:
						return "left";
					case 2:
						return "middle";
					case 3:
						return "right"
				}
			}

			function a7(du) {
				return du.target || du.srcElement
			}

			function c4(du) {
				return du === "A" || du === "AREA"
			}

			function aG(du) {
				function dv(dx) {
					var dy = a7(dx);
					var dz = dy.nodeName;
					var dw = a6(bG, "ignore");
					while (!c4(dz) && dy && dy.parentNode) {
						dy = dy.parentNode;
						dz = dy.nodeName
					}
					if (dy && c4(dz) && !dw.test(dy.className)) {
						return dy
					}
				}
				return function(dy) {
					dy = dy || W.event;
					var dz = dv(dy);
					if (!dz) {
						return
					}
					var dx = bZ(dy);
					if (dy.type === "click") {
						var dw = false;
						if (du && dx === "middle") {
							dw = true
						}
						if (dz && !dw) {
							cO(dz)
						}
					} else {
						if (dy.type === "mousedown") {
							if (dx === "middle" && dz) {
								aW = dx;
								bI = dz
							} else {
								aW = bI = null
							}
						} else {
							if (dy.type === "mouseup") {
								if (dx === aW && dz === bI) {
									cO(dz)
								}
								aW = bI = null
							} else {
								if (dy.type === "contextmenu") {
									cO(dz)
								}
							}
						}
					}
				}
			}

			function av(dx, dw, du) {
				var dv = typeof dw;
				if (dv === "undefined") {
					dw = true
				}
				ar(dx, "click", aG(dw), du);
				if (dw) {
					ar(dx, "mouseup", aG(dw), du);
					ar(dx, "mousedown", aG(dw), du);
					ar(dx, "contextmenu", aG(dw), du)
				}
			}

			function aX(dv, dy, dz) {
				if (ck) {
					return true
				}
				ck = true;
				var dA = false;
				var dx, dw;

				function du() {
					dA = true
				}
				n(function() {
					function dB(dD) {
						setTimeout(function() {
							if (!ck) {
								return
							}
							dA = false;
							dz.trackVisibleContentImpressions();
							dB(dD)
						}, dD)
					}

					function dC(dD) {
						setTimeout(function() {
							if (!ck) {
								return
							}
							if (dA) {
								dA = false;
								dz.trackVisibleContentImpressions()
							}
							dC(dD)
						}, dD)
					}
					if (dv) {
						dx = ["scroll", "resize"];
						for (dw = 0; dw < dx.length; dw++) {
							if (J.addEventListener) {
								J.addEventListener(dx[dw], du, false)
							} else {
								W.attachEvent("on" + dx[dw], du)
							}
						}
						dC(100)
					}
					if (dy && dy > 0) {
						dy = parseInt(dy, 10);
						dB(dy)
					}
				})
			}
			var bK = {
				enabled: true,
				requests: [],
				timeout: null,
				interval: 2500,
				sendRequests: function() {
					var du = this.requests;
					this.requests = [];
					if (du.length === 1) {
						bM(du[0], bQ)
					} else {
						dq(du, bQ)
					}
				},
				canQueue: function() {
					return !m && this.enabled
				},
				pushMultiple: function(dv) {
					if (!this.canQueue()) {
						dq(dv, bQ);
						return
					}
					var du;
					for (du = 0; du < dv.length; du++) {
						this.push(dv[du])
					}
				},
				push: function(du) {
					if (!du) {
						return
					}
					if (!this.canQueue()) {
						bM(du, bQ);
						return
					}
					bK.requests.push(du);
					if (this.timeout) {
						clearTimeout(this.timeout);
						this.timeout = null
					}
					this.timeout = setTimeout(function() {
						bK.timeout = null;
						bK.sendRequests()
					}, bK.interval);
					var dv = "RequestQueue" + aB;
					if (!Object.prototype.hasOwnProperty.call(b, dv)) {
						b[dv] = {
							unload: function() {
								if (bK.timeout) {
									clearTimeout(bK.timeout)
								}
								bK.sendRequests()
							}
						}
					}
				}
			};
			bo();
			this.hasConsent = function() {
				return bJ
			};
			this.getVisitorInfo = function() {
				if (!aH(aY("id"))) {
					aR()
				}
				return cW()
			};
			this.getVisitorId = function() {
				return this.getVisitorInfo()[1]
			};
			this.getAttributionInfo = function() {
				return bS()
			};
			this.getAttributionCampaignName = function() {
				return bS()[0]
			};
			this.getAttributionCampaignKeyword = function() {
				return bS()[1]
			};
			this.getAttributionReferrerTimestamp = function() {
				return bS()[2]
			};
			this.getAttributionReferrerUrl = function() {
				return bS()[3]
			};
			this.setTrackerUrl = function(du) {
				aI = du
			};
			this.getTrackerUrl = function() {
				return aI
			};
			this.getMatomoUrl = function() {
				return aa(this.getTrackerUrl(), bO)
			};
			this.getPiwikUrl = function() {
				return this.getMatomoUrl()
			};
			this.addTracker = function(dw, dv) {
				if (!M(dw) || null === dw) {
					dw = this.getTrackerUrl()
				}
				var du = new T(dw, dv);
				L.push(du);
				u.trigger("TrackerAdded", [this]);
				return du
			};
			this.getSiteId = function() {
				return cc
			};
			this.setSiteId = function(du) {
				b9(du)
			};
			this.resetUserId = function() {
				bF = ""
			};
			this.setUserId = function(du) {
				if (ac(du)) {
					bF = du
				}
			};
			this.setVisitorId = function(dv) {
				var du = /[0-9A-Fa-f]{16}/g;
				if (x(dv) && du.test(dv)) {
					bU = dv
				} else {
					ao("Invalid visitorId set" + dv)
				}
			};
			this.getUserId = function() {
				return bF
			};
			this.setCustomData = function(du, dv) {
				if (Z(du)) {
					at = du
				} else {
					if (!at) {
						at = {}
					}
					at[du] = dv
				}
			};
			this.getCustomData = function() {
				return at
			};
			this.setCustomRequestProcessing = function(du) {
				ch = du
			};
			this.appendToTrackingUrl = function(du) {
				c9 = du
			};
			this.getRequest = function(du) {
				return cy(du)
			};
			this.addPlugin = function(du, dv) {
				b[du] = dv
			};
			this.setCustomDimension = function(du, dv) {
				du = parseInt(du, 10);
				if (du > 0) {
					if (!M(dv)) {
						dv = ""
					}
					if (!x(dv)) {
						dv = String(dv)
					}
					bt[du] = dv
				}
			};
			this.getCustomDimension = function(du) {
				du = parseInt(du, 10);
				if (du > 0 && Object.prototype.hasOwnProperty.call(bt, du)) {
					return bt[du]
				}
			};
			this.deleteCustomDimension = function(du) {
				du = parseInt(du, 10);
				if (du > 0) {
					delete bt[du]
				}
			};
			this.setCustomVariable = function(dv, du, dy, dw) {
				var dx;
				if (!M(dw)) {
					dw = "visit"
				}
				if (!M(du)) {
					return
				}
				if (!M(dy)) {
					dy = ""
				}
				if (dv > 0) {
					du = !x(du) ? String(du) : du;
					dy = !x(dy) ? String(dy) : dy;
					dx = [du.slice(0, bA), dy.slice(0, bA)];
					if (dw === "visit" || dw === 2) {
						cN();
						aV[dv] = dx
					} else {
						if (dw === "page" || dw === 3) {
							b2[dv] = dx
						} else {
							if (dw === "event") {
								cs[dv] = dx
							}
						}
					}
				}
			};
			this.getCustomVariable = function(dv, dw) {
				var du;
				if (!M(dw)) {
					dw = "visit"
				}
				if (dw === "page" || dw === 3) {
					du = b2[dv]
				} else {
					if (dw === "event") {
						du = cs[dv]
					} else {
						if (dw === "visit" || dw === 2) {
							cN();
							du = aV[dv]
						}
					}
				}
				if (!M(du) || (du && du[0] === "")) {
					return false
				}
				return du
			};
			this.deleteCustomVariable = function(du, dv) {
				if (this.getCustomVariable(du, dv)) {
					this.setCustomVariable(du, "", "", dv)
				}
			};
			this.deleteCustomVariables = function(du) {
				if (du === "page" || du === 3) {
					b2 = {}
				} else {
					if (du === "event") {
						cs = {}
					} else {
						if (du === "visit" || du === 2) {
							aV = {}
						}
					}
				}
			};
			this.storeCustomVariablesInCookie = function() {
				bW = true
			};
			this.setLinkTrackingTimer = function(du) {
				bQ = du
			};
			this.getLinkTrackingTimer = function() {
				return bQ
			};
			this.setDownloadExtensions = function(du) {
				if (x(du)) {
					du = du.split("|")
				}
				dg = du
			};
			this.addDownloadExtensions = function(dv) {
				var du;
				if (x(dv)) {
					dv = dv.split("|")
				}
				for (du = 0; du < dv.length; du++) {
					dg.push(dv[du])
				}
			};
			this.removeDownloadExtensions = function(dw) {
				var dv, du = [];
				if (x(dw)) {
					dw = dw.split("|")
				}
				for (dv = 0; dv < dg.length; dv++) {
					if (P(dw, dg[dv]) === -1) {
						du.push(dg[dv])
					}
				}
				dg = du
			};
			this.setDomains = function(du) {
				aC = x(du) ? [du] : du;
				var dy = false,
					dw = 0,
					dv;
				for (dw; dw < aC.length; dw++) {
					dv = String(aC[dw]);
					if (cP(c2, O(dv))) {
						dy = true;
						break
					}
					var dx = cr(dv);
					if (dx && dx !== "/" && dx !== "/*") {
						dy = true;
						break
					}
				}
				if (!dy) {
					aC.push(c2)
				}
			};
			this.enableCrossDomainLinking = function() {
				cV = true
			};
			this.disableCrossDomainLinking = function() {
				cV = false
			};
			this.isCrossDomainLinkingEnabled = function() {
				return cV
			};
			this.setCrossDomainLinkingTimeout = function(du) {
				a5 = du
			};
			this.getCrossDomainLinkingUrlParameter = function() {
				return t(az) + "=" + t(by())
			};
			this.setIgnoreClasses = function(du) {
				bG = x(du) ? [du] : du
			};
			this.setRequestMethod = function(du) {
				if (du) {
					dk = String(du)
						.toUpperCase()
				} else {
					dk = cn
				}
				if (dk === "GET") {
					this.disableAlwaysUseSendBeacon()
				}
			};
			this.setRequestContentType = function(du) {
				cE = du || aM
			};
			this.setGenerationTimeMs = function(du) {
				ao("setGenerationTimeMs is no longer supported since Matomo 4. The call will be ignored. The replacement is setPagePerformanceTiming.")
			};
			this.setPagePerformanceTiming = function(dy, dA, dz, dv, dB, dw) {
				var dx = {
					pf_net: dy,
					pf_srv: dA,
					pf_tfr: dz,
					pf_dm1: dv,
					pf_dm2: dB,
					pf_onl: dw
				};
				try {
					dx = Q(dx, M);
					dx = B(dx);
					ct = l(dx);
					if (ct === "") {
						ao("setPagePerformanceTiming() called without parameters. This function needs to be called with at least one performance parameter.");
						return
					}
					bn = false;
					bL = true
				} catch (du) {
					ao("setPagePerformanceTiming: " + du.toString())
				}
			};
			this.setReferrerUrl = function(du) {
				bu = du
			};
			this.setCustomUrl = function(du) {
				ba = b1(bT, du)
			};
			this.getCurrentUrl = function() {
				return ba || bT
			};
			this.setDocumentTitle = function(du) {
				bp = du
			};
			this.setPageViewId = function(du) {
				aQ = du;
				bH = true
			};
			this.setAPIUrl = function(du) {
				bO = du
			};
			this.setDownloadClasses = function(du) {
				bR = x(du) ? [du] : du
			};
			this.setLinkClasses = function(du) {
				be = x(du) ? [du] : du
			};
			this.setCampaignNameKey = function(du) {
				cw = x(du) ? [du] : du
			};
			this.setCampaignKeywordKey = function(du) {
				bN = x(du) ? [du] : du
			};
			this.discardHashTag = function(du) {
				bV = du
			};
			this.setCookieNamePrefix = function(du) {
				bq = du;
				if (aV) {
					aV = b3()
				}
			};
			this.setCookieDomain = function(du) {
				var dv = O(du);
				if (!bs && !bD(dv)) {
					ao("Can't write cookie on domain " + du)
				} else {
					c7 = dv;
					bo()
				}
			};
			this.setExcludedQueryParams = function(du) {
				co = x(du) ? [du] : du
			};
			this.getCookieDomain = function() {
				return c7
			};
			this.hasCookies = function() {
				return "1" === cb()
			};
			this.setSessionCookie = function(dw, dv, du) {
				if (!dw) {
					throw new Error("Missing cookie name")
				}
				if (!M(du)) {
					du = cu
				}
				bB.push(dw);
				dp(aY(dw), dv, du, bw, c7, bY, aN)
			};
			this.getCookie = function(dv) {
				var du = aH(aY(dv));
				if (du === 0) {
					return null
				}
				return du
			};
			this.setCookiePath = function(du) {
				bw = du;
				bo()
			};
			this.getCookiePath = function(du) {
				return bw
			};
			this.setVisitorCookieTimeout = function(du) {
				cS = du * 1000
			};
			this.setSessionCookieTimeout = function(du) {
				cu = du * 1000
			};
			this.getSessionCookieTimeout = function() {
				return cu
			};
			this.setReferralCookieTimeout = function(du) {
				df = du * 1000
			};
			this.setConversionAttributionFirstReferrer = function(du) {
				bC = du
			};
			this.setSecureCookie = function(du) {
				if (du && location.protocol !== "https:") {
					ao("Error in setSecureCookie: You cannot use `Secure` on http.");
					return
				}
				bY = du
			};
			this.setCookieSameSite = function(du) {
				du = String(du);
				du = du.charAt(0)
					.toUpperCase() + du.toLowerCase()
					.slice(1);
				if (du !== "None" && du !== "Lax" && du !== "Strict") {
					ao("Ignored value for sameSite. Please use either Lax, None, or Strict.");
					return
				}
				if (du === "None") {
					if (location.protocol === "https:") {
						this.setSecureCookie(true)
					} else {
						ao("sameSite=None cannot be used on http, reverted to sameSite=Lax.");
						du = "Lax"
					}
				}
				aN = du
			};
			this.disableCookies = function() {
				bs = true;
				if (cc) {
					aJ()
				}
			};
			this.areCookiesEnabled = function() {
				return !bs
			};
			this.setCookieConsentGiven = function() {
				if (bs && !cY) {
					bs = false;
					c6 = true;
					if (cc && aA) {
						aR();
						var du = cy("ping=1", null, "ping");
						bM(du, bQ)
					}
				}
			};
			this.requireCookieConsent = function() {
				if (this.getRememberedCookieConsent()) {
					return false
				}
				this.disableCookies();
				return true
			};
			this.getRememberedCookieConsent = function() {
				return aH(cL)
			};
			this.forgetCookieConsentGiven = function() {
				b5(cL, bw, c7);
				this.disableCookies()
			};
			this.rememberCookieConsentGiven = function(dv) {
				if (dv) {
					dv = dv * 60 * 60 * 1000
				} else {
					dv = 30 * 365 * 24 * 60 * 60 * 1000
				}
				this.setCookieConsentGiven();
				var du = new Date()
					.getTime();
				dp(cL, du, dv, bw, c7, bY, aN)
			};
			this.deleteCookies = function() {
				aJ()
			};
			this.setDoNotTrack = function(dv) {
				var du = g.doNotTrack || g.msDoNotTrack;
				cY = dv && (du === "yes" || du === "1");
				if (cY) {
					this.disableCookies()
				}
			};
			this.alwaysUseSendBeacon = function() {
				c5 = true
			};
			this.disableAlwaysUseSendBeacon = function() {
				c5 = false
			};
			this.addListener = function(dv, du) {
				av(dv, du, false)
			};
			this.enableLinkTracking = function(dv) {
				if (di) {
					return
				}
				di = true;
				var du = this;
				q(function() {
					au = true;
					var dw = J.body;
					av(dw, dv, true)
				})
			};
			this.enableJSErrorTracking = function() {
				if (c0) {
					return
				}
				c0 = true;
				var du = W.onerror;
				W.onerror = function(dz, dx, dw, dy, dv) {
					cm(function() {
						var dA = "JavaScript Errors";
						var dB = dx + ":" + dw;
						if (dy) {
							dB += ":" + dy
						}
						if (P(cz, dA + dB + dz) === -1) {
							cz.push(dA + dB + dz);
							ax(dA, dB, dz)
						}
					});
					if (du) {
						return du(dz, dx, dw, dy, dv)
					}
					return false
				}
			};
			this.disablePerformanceTracking = function() {
				a8 = false
			};
			this.enableHeartBeatTimer = function(du) {
				du = Math.max(du || 15, 5);
				bb = du * 1000;
				if (c8 !== null) {
					dr()
				}
			};
			this.disableHeartBeatTimer = function() {
				if (bb || aS) {
					if (W.removeEventListener) {
						W.removeEventListener("focus", bg);
						W.removeEventListener("blur", aD);
						W.removeEventListener("visibilitychange", a0)
					} else {
						if (W.detachEvent) {
							W.detachEvent("onfocus", bg);
							W.detachEvent("onblur", aD);
							W.detachEvent("visibilitychange", a0)
						}
					}
				}
				bb = null;
				aS = false
			};
			this.killFrame = function() {
				if (W.location !== W.top.location) {
					W.top.location = W.location
				}
			};
			this.redirectFile = function(du) {
				if (W.location.protocol === "file:") {
					W.location = du
				}
			};
			this.setCountPreRendered = function(du) {
				bk = du
			};
			this.trackGoal = function(du, dx, dw, dv) {
				cm(function() {
					c1(du, dx, dw, dv)
				})
			};
			this.trackLink = function(dv, du, dx, dw) {
				cm(function() {
					db(dv, du, dx, dw)
				})
			};
			this.getNumTrackedPageViews = function() {
				return cx
			};
			this.trackPageView = function(du, dw, dv) {
				cg = [];
				cT = [];
				cz = [];
				if (R(cc)) {
					cm(function() {
						ad(aI, bO, cc)
					})
				} else {
					cm(function() {
						cx++;
						b6(du, dw, dv)
					})
				}
			};
			this.disableBrowserFeatureDetection = function() {
				c6 = false
			};
			this.enableBrowserFeatureDetection = function() {
				c6 = true
			};
			this.trackAllContentImpressions = function() {
				if (R(cc)) {
					return
				}
				cm(function() {
					q(function() {
						var du = w.findContentNodes();
						var dv = cH(du);
						bK.pushMultiple(dv)
					})
				})
			};
			this.trackVisibleContentImpressions = function(du, dv) {
				if (R(cc)) {
					return
				}
				if (!M(du)) {
					du = true
				}
				if (!M(dv)) {
					dv = 750
				}
				aX(du, dv, this);
				cm(function() {
					n(function() {
						var dw = w.findContentNodes();
						var dx = bf(dw);
						bK.pushMultiple(dx)
					})
				})
			};
			this.trackContentImpression = function(dw, du, dv) {
				if (R(cc)) {
					return
				}
				dw = a(dw);
				du = a(du);
				dv = a(dv);
				if (!dw) {
					return
				}
				du = du || "Unknown";
				cm(function() {
					var dx = aK(dw, du, dv);
					bK.push(dx)
				})
			};
			this.trackContentImpressionsWithinNode = function(du) {
				if (R(cc) || !du) {
					return
				}
				cm(function() {
					if (ck) {
						n(function() {
							var dv = w.findContentNodesWithinNode(du);
							var dw = bf(dv);
							bK.pushMultiple(dw)
						})
					} else {
						q(function() {
							var dv = w.findContentNodesWithinNode(du);
							var dw = cH(dv);
							bK.pushMultiple(dw)
						})
					}
				})
			};
			this.trackContentInteraction = function(dw, dx, du, dv) {
				if (R(cc)) {
					return
				}
				dw = a(dw);
				dx = a(dx);
				du = a(du);
				dv = a(dv);
				if (!dw || !dx) {
					return
				}
				du = du || "Unknown";
				cm(function() {
					var dy = aU(dw, dx, du, dv);
					if (dy) {
						bK.push(dy)
					}
				})
			};
			this.trackContentInteractionNode = function(dw, dv) {
				if (R(cc) || !dw) {
					return
				}
				var du = null;
				cm(function() {
					du = dl(dw, dv);
					if (du) {
						bK.push(du)
					}
				});
				return du
			};
			this.logAllContentBlocksOnPage = function() {
				var dw = w.findContentNodes();
				var du = w.collectContent(dw);
				var dv = typeof console;
				if (dv !== "undefined" && console && console.log) {
					console.log(du)
				}
			};
			this.trackEvent = function(dv, dx, du, dw, dz, dy) {
				cm(function() {
					ax(dv, dx, du, dw, dz, dy)
				})
			};
			this.trackSiteSearch = function(du, dw, dv, dx) {
				cg = [];
				cm(function() {
					ce(du, dw, dv, dx)
				})
			};
			this.setEcommerceView = function(dy, du, dw, dv) {
				cA = {};
				if (ac(dw)) {
					dw = String(dw)
				}
				if (!M(dw) || dw === null || dw === false || !dw.length) {
					dw = ""
				} else {
					if (dw instanceof Array) {
						dw = W.JSON.stringify(dw)
					}
				}
				var dx = "_pkc";
				cA[dx] = dw;
				if (M(dv) && dv !== null && dv !== false && String(dv)
					.length) {
					dx = "_pkp";
					cA[dx] = dv
				}
				if (!ac(dy) && !ac(du)) {
					return
				}
				if (ac(dy)) {
					dx = "_pks";
					cA[dx] = dy
				}
				if (!ac(du)) {
					du = ""
				}
				dx = "_pkn";
				cA[dx] = du
			};
			this.getEcommerceItems = function() {
				return JSON.parse(JSON.stringify(da))
			};
			this.addEcommerceItem = function(dy, du, dw, dv, dx) {
				if (ac(dy)) {
					da[dy] = [String(dy), du, dw, dv, dx]
				}
			};
			this.removeEcommerceItem = function(du) {
				if (ac(du)) {
					du = String(du);
					delete da[du]
				}
			};
			this.clearEcommerceCart = function() {
				da = {}
			};
			this.trackEcommerceOrder = function(du, dy, dx, dw, dv, dz) {
				b4(du, dy, dx, dw, dv, dz)
			};
			this.trackEcommerceCartUpdate = function(du) {
				bz(du)
			};
			this.trackRequest = function(dv, dx, dw, du) {
				cm(function() {
					var dy = cy(dv, dx, du);
					bM(dy, bQ, dw)
				})
			};
			this.ping = function() {
				this.trackRequest("ping=1", null, null, "ping")
			};
			this.disableQueueRequest = function() {
				bK.enabled = false
			};
			this.setRequestQueueInterval = function(du) {
				if (du < 1000) {
					throw new Error("Request queue interval needs to be at least 1000ms")
				}
				bK.interval = du
			};
			this.queueRequest = function(du) {
				cm(function() {
					var dv = cy(du);
					bK.push(dv)
				})
			};
			this.isConsentRequired = function() {
				return cI
			};
			this.getRememberedConsent = function() {
				var du = aH(bj);
				if (aH(cU)) {
					if (du) {
						b5(bj, bw, c7)
					}
					return null
				}
				if (!du || du === 0) {
					return null
				}
				return du
			};
			this.hasRememberedConsent = function() {
				return !!this.getRememberedConsent()
			};
			this.requireConsent = function() {
				cI = true;
				bJ = this.hasRememberedConsent();
				if (!bJ) {
					bs = true
				}
				y++;
				b["CoreConsent" + y] = {
					unload: function() {
						if (!bJ) {
							aJ()
						}
					}
				}
			};
			this.setConsentGiven = function(dv) {
				bJ = true;
				c6 = true;
				b5(cU, bw, c7);
				var dw, du;
				for (dw = 0; dw < cT.length; dw++) {
					du = typeof cT[dw];
					if (du === "string") {
						bM(cT[dw], bQ)
					} else {
						if (du === "object") {
							dq(cT[dw], bQ)
						}
					}
				}
				cT = [];
				if (!M(dv) || dv) {
					this.setCookieConsentGiven()
				}
			};
			this.rememberConsentGiven = function(dw) {
				if (dw) {
					dw = dw * 60 * 60 * 1000
				} else {
					dw = 30 * 365 * 24 * 60 * 60 * 1000
				}
				var du = true;
				this.setConsentGiven(du);
				var dv = new Date()
					.getTime();
				dp(bj, dv, dw, bw, c7, bY, aN)
			};
			this.forgetConsentGiven = function() {
				var du = 30 * 365 * 24 * 60 * 60 * 1000;
				b5(bj, bw, c7);
				dp(cU, new Date()
					.getTime(), du, bw, c7, bY, aN);
				this.forgetCookieConsentGiven();
				this.requireConsent()
			};
			this.isUserOptedOut = function() {
				return !bJ
			};
			this.optUserOut = this.forgetConsentGiven;
			this.forgetUserOptOut = function() {
				this.setConsentGiven(false)
			};
			n(function() {
				setTimeout(function() {
					bL = true
				}, 0)
			});
			u.trigger("TrackerSetup", [this]);
			u.addPlugin("TrackerVisitorIdCookie" + aB, {
				unload: function() {
					if (!aA) {
						aR();
						dj()
					}
				}
			})
		}

		function K() {
			return {
				push: aj
			}
		}

		function c(ay, ax) {
			var az = {};
			var av, aw;
			for (av = 0; av < ax.length; av++) {
				var at = ax[av];
				az[at] = 1;
				for (aw = 0; aw < ay.length; aw++) {
					if (ay[aw] && ay[aw][0]) {
						var au = ay[aw][0];
						if (at === au) {
							aj(ay[aw]);
							delete ay[aw];
							if (az[au] > 1 && au !== "addTracker" && au !== "enableLinkTracking") {
								ao("The method " + au + ' is registered more than once in "_paq" variable. Only the last call has an effect. Please have a look at the multiple Matomo trackers documentation: https://developer.matomo.org/guides/tracking-javascript-guide#multiple-piwik-trackers')
							}
							az[au]++
						}
					}
				}
			}
			return ay
		}
		var E = ["addTracker", "forgetCookieConsentGiven", "requireCookieConsent", "disableBrowserFeatureDetection", "disableCookies", "setTrackerUrl", "setAPIUrl", "enableCrossDomainLinking", "setCrossDomainLinkingTimeout", "setSessionCookieTimeout", "setVisitorCookieTimeout", "setCookieNamePrefix", "setCookieSameSite", "setSecureCookie", "setCookiePath", "setCookieDomain", "setDomains", "setUserId", "setVisitorId", "setSiteId", "alwaysUseSendBeacon", "disableAlwaysUseSendBeacon", "enableLinkTracking", "setCookieConsentGiven", "requireConsent", "setConsentGiven", "disablePerformanceTracking", "setPagePerformanceTiming", "setExcludedQueryParams"];

		function ah(av, au) {
			var at = new T(av, au);
			L.push(at);
			_paq = c(_paq, E);
			for (H = 0; H < _paq.length; H++) {
				if (_paq[H]) {
					aj(_paq[H])
				}
			}
			_paq = new K();
			u.trigger("TrackerAdded", [at]);
			return at
		}
		ar(W, "beforeunload", am, false);
		ar(W, "visibilitychange", function() {
			if (m) {
				return
			}
			if (J.visibilityState === "hidden") {
				ag("unload")
			}
		}, false);
		ar(W, "online", function() {
			if (M(g.serviceWorker)) {
				g.serviceWorker.ready.then(function(at) {
					if (at && at.sync) {
						return at.sync.register("matomoSync")
					}
				}, function() {})
			}
		}, false);
		ar(W, "message", function(ay) {
			if (!ay || !ay.origin) {
				return
			}
			var aA, aw, au;
			var aB = d(ay.origin);
			var ax = u.getAsyncTrackers();
			for (aw = 0; aw < ax.length; aw++) {
				au = d(ax[aw].getMatomoUrl());
				if (au === aB) {
					aA = ax[aw];
					break
				}
			}
			if (!aA) {
				return
			}
			var av = null;
			try {
				av = JSON.parse(ay.data)
			} catch (az) {
				return
			}
			if (!av) {
				return
			}

			function at(aE) {
				var aG = J.getElementsByTagName("iframe");
				for (aw = 0; aw < aG.length; aw++) {
					var aF = aG[aw];
					var aC = d(aF.src);
					if (aF.contentWindow && M(aF.contentWindow.postMessage) && aC === aB) {
						var aD = JSON.stringify(aE);
						aF.contentWindow.postMessage(aD, "*")
					}
				}
			}
			if (M(av.maq_initial_value)) {
				at({
					maq_opted_in: av.maq_initial_value && aA.hasConsent(),
					maq_url: aA.getMatomoUrl(),
					maq_optout_by_default: aA.isConsentRequired()
				})
			} else {
				if (M(av.maq_opted_in)) {
					ax = u.getAsyncTrackers();
					for (aw = 0; aw < ax.length; aw++) {
						aA = ax[aw];
						if (av.maq_opted_in) {
							aA.rememberConsentGiven()
						} else {
							aA.forgetConsentGiven()
						}
					}
					at({
						maq_confirm_opted_in: aA.hasConsent(),
						maq_url: aA.getMatomoUrl(),
						maq_optout_by_default: aA.isConsentRequired()
					})
				}
			}
		}, false);
		Date.prototype.getTimeAlias = Date.prototype.getTime;
		u = {
			initialized: false,
			JSON: W.JSON,
			DOM: {
				addEventListener: function(aw, av, au, at) {
					var ax = typeof at;
					if (ax === "undefined") {
						at = false
					}
					ar(aw, av, au, at)
				},
				onLoad: n,
				onReady: q,
				isNodeVisible: i,
				isOrWasNodeVisible: w.isNodeVisible
			},
			on: function(au, at) {
				if (!z[au]) {
					z[au] = []
				}
				z[au].push(at)
			},
			off: function(av, au) {
				if (!z[av]) {
					return
				}
				var at = 0;
				for (at; at < z[av].length; at++) {
					if (z[av][at] === au) {
						z[av].splice(at, 1)
					}
				}
			},
			trigger: function(av, aw, au) {
				if (!z[av]) {
					return
				}
				var at = 0;
				for (at; at < z[av].length; at++) {
					z[av][at].apply(au || W, aw)
				}
			},
			addPlugin: function(at, au) {
				b[at] = au
			},
			getTracker: function(au, at) {
				if (!M(at)) {
					at = this.getAsyncTracker()
						.getSiteId()
				}
				if (!M(au)) {
					au = this.getAsyncTracker()
						.getTrackerUrl()
				}
				return new T(au, at)
			},
			getAsyncTrackers: function() {
				return L
			},
			addTracker: function(av, au) {
				var at;
				if (!L.length) {
					at = ah(av, au)
				} else {
					at = L[0].addTracker(av, au)
				}
				return at
			},
			getAsyncTracker: function(ax, aw) {
				var av;
				if (L && L.length && L[0]) {
					av = L[0]
				} else {
					return ah(ax, aw)
				}
				if (!aw && !ax) {
					return av
				}
				if ((!M(aw) || null === aw) && av) {
					aw = av.getSiteId()
				}
				if ((!M(ax) || null === ax) && av) {
					ax = av.getTrackerUrl()
				}
				var au, at = 0;
				for (at; at < L.length; at++) {
					au = L[at];
					if (au && String(au.getSiteId()) === String(aw) && au.getTrackerUrl() === ax) {
						return au
					}
				}
			},
			retryMissedPluginCalls: function() {
				var au = al;
				al = [];
				var at = 0;
				for (at; at < au.length; at++) {
					aj(au[at])
				}
			}
		};
		if (typeof define === "function" && define.amd) {
			define("piwik", [], function() {
				return u
			});
			define("matomo", [], function() {
				return u
			})
		}
		return u
	}())
}
/*!!! pluginTrackerHook */
(function() {
	function b() {
		if ("object" !== typeof _paq) {
			return false
		}
		var c = typeof _paq.length;
		if ("undefined" === c) {
			return false
		}
		return !!_paq.length
	}
	if (window && "object" === typeof window.matomoPluginAsyncInit && window.matomoPluginAsyncInit.length) {
		var a = 0;
		for (a; a < window.matomoPluginAsyncInit.length; a++) {
			if (typeof window.matomoPluginAsyncInit[a] === "function") {
				window.matomoPluginAsyncInit[a]()
			}
		}
	}
	if (window && window.piwikAsyncInit) {
		window.piwikAsyncInit()
	}
	if (window && window.matomoAsyncInit) {
		window.matomoAsyncInit()
	}
	if (!window.Matomo.getAsyncTrackers()
		.length) {
		if (b()) {
			window.Matomo.addTracker()
		} else {
			_paq = {
				push: function(c) {
					var d = typeof console;
					if (d !== "undefined" && console && console.error) {
						console.error("_paq.push() was used but Matomo tracker was not initialized before the matomo.js file was loaded. Make sure to configure the tracker via _paq.push before loading matomo.js. Alternatively, you can create a tracker via Matomo.addTracker() manually and then use _paq.push but it may not fully work as tracker methods may not be executed in the correct order.", c)
					}
				}
			}
		}
	}
	window.Matomo.trigger("MatomoInitialized", []);
	window.Matomo.initialized = true
}());
(function() {
	var a = (typeof window.AnalyticsTracker);
	if (a === "undefined") {
		window.AnalyticsTracker = window.Matomo
	}
}());
if (typeof window.piwik_log !== "function") {
	window.piwik_log = function(c, e, g, f) {
		function b(h) {
			try {
				if (window["piwik_" + h]) {
					return window["piwik_" + h]
				}
			} catch (i) {}
			return
		}
		var d, a = window.Matomo.getTracker(g, e);
		a.setDocumentTitle(c);
		a.setCustomData(f);
		d = b("tracker_pause");
		if (d) {
			a.setLinkTrackingTimer(d)
		}
		d = b("download_extensions");
		if (d) {
			a.setDownloadExtensions(d)
		}
		d = b("hosts_alias");
		if (d) {
			a.setDomains(d)
		}
		d = b("ignore_classes");
		if (d) {
			a.setIgnoreClasses(d)
		}
		a.trackPageView();
		if (b("install_tracker")) {
			piwik_track = function(i, j, k, h) {
				a.setSiteId(j);
				a.setTrackerUrl(k);
				a.trackLink(i, h)
			};
			a.enableLinkTracking()
		}
	}
}
/*!! @license-end */
;