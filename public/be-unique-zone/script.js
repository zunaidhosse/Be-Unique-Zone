/* =========================================================
   BE UNIQUE ZONE (BUZ) — Catalog logic
   Settings: config.js    Products: products.js
   You should not need to edit this file.
   ========================================================= */
(function () {
  "use strict";

  var C = typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};
  var LIST = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function waNumber() { return String(C.whatsappNumber || "").replace(/\D/g, ""); }
  function waLink(text) { return "https://wa.me/" + waNumber() + "?text=" + encodeURIComponent(text); }
  function orderLink(p) { return waLink(String(C.orderMessage).split("{id}").join(p.id)); }

  /* ---------- Brand settings ---------- */
  function applyConfig() {
    $$("[data-brand-name]").forEach(function (el) { el.textContent = C.brandName; });
    $$("[data-brand-name-upper]").forEach(function (el) { el.textContent = String(C.brandName).toUpperCase(); });
    $$("[data-brand-short]").forEach(function (el) { el.textContent = C.brandShortName; });
    $$("[data-tagline]").forEach(function (el) { el.textContent = C.tagline; });
    $$("[data-wa-general]").forEach(function (el) { el.href = waLink(C.contactMessage); });
    $$("[data-wa-display]").forEach(function (el) { el.textContent = "+" + waNumber(); });
    var y = $("#year"); if (y) y.textContent = new Date().getFullYear();

    var list = $("#socialLinks");
    var names = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube" };
    var any = false;
    Object.keys(names).forEach(function (k) {
      var url = C.social && C.social[k];
      if (!url) return;
      any = true;
      var li = document.createElement("li"), a = document.createElement("a");
      a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = names[k];
      li.appendChild(a); list.appendChild(li);
    });
    if (!any) list.hidden = true;
  }

  /* ---------- Header: solid background on scroll, mobile menu, current section ---------- */
  function initHeader() {
    var header = $(".site-header"), nav = $("#nav"), toggle = $("#menuToggle");
    function onScroll() { header.classList.toggle("is-solid", window.scrollY > 40); }
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    function setMenu(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });

    if ("IntersectionObserver" in window) {
      var links = {};
      $$("a", nav).forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && links[en.target.id]) {
            $$("a", nav).forEach(function (a) { a.classList.remove("is-current"); });
            links[en.target.id].classList.add("is-current");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  /* ---------- Products come from products.js ---------- */
  var products = LIST.map(function (item, i) {
    return { id: item.id, num: parseInt(item.id.replace(/\D/g, ""), 10) || i + 1, src: item.image, isNew: !!item.new, featured: !!item.featured, el: null };
  });

  /* ---------- Rendering ---------- */
  var grid = $("#grid");
  function buildCard(p, index) {
    var card = document.createElement("article");
    card.className = "card";
    card.dataset.id = p.id;

    var media = document.createElement("button");
    media.type = "button";
    media.className = "card-media is-loading";
    media.setAttribute("aria-label", "View " + p.id + " full screen");
    var img = document.createElement("img");
    img.alt = p.id + " jewelry by Be Unique Zone";
    img.width = 800; img.height = 800;
    img.decoding = "async";
    img.loading = index < 4 ? "eager" : "lazy";
    img.addEventListener("load", function () { img.classList.add("is-loaded"); media.classList.remove("is-loading"); });
    img.addEventListener("error", function () { media.classList.remove("is-loading"); media.classList.add("is-broken"); });
    img.src = p.src;
    media.appendChild(img);
    if (p.isNew || p.featured) {
      var b = document.createElement("span");
      b.className = "badge"; b.textContent = p.isNew ? "New" : "Featured";
      media.appendChild(b);
    }
    media.addEventListener("click", function () { openLightbox(p); });

    var body = document.createElement("div");
    body.className = "card-body";
    var pid = document.createElement("span"); pid.className = "pid"; pid.textContent = p.id;
    var more = document.createElement("button");
    more.type = "button"; more.className = "view-details"; more.textContent = "View Details";
    more.setAttribute("aria-label", "View details of " + p.id);
    more.addEventListener("click", function () { openLightbox(p); });
    var btn = document.createElement("a");
    btn.className = "btn btn-gold";
    btn.href = orderLink(p);
    btn.target = "_blank"; btn.rel = "noopener noreferrer";
    btn.setAttribute("aria-label", "Order " + p.id + " on WhatsApp");
    btn.innerHTML = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg><span>Order on WhatsApp</span>';
    body.appendChild(pid); body.appendChild(more); body.appendChild(btn);

    card.appendChild(media); card.appendChild(body);
    p.el = card;
    return card;
  }

  function renderAll() {
    var frag = document.createDocumentFragment();
    products.forEach(function (p, i) { frag.appendChild(buildCard(p, i)); });
    grid.innerHTML = "";
    grid.appendChild(frag);
    grid.setAttribute("aria-busy", "false");
    $("#totalCount").textContent = products.length + " EXCLUSIVE DESIGNS";
  }

  /* ---------- Filters + search ---------- */
  var state = { filter: "all", query: "" };
  var visible = [];

  function matches(p) {
    if (state.filter === "new" && !p.isNew) return false;
    if (state.filter === "featured" && !p.featured) return false;
    if (state.query) {
      var id = p.id.toLowerCase();
      var q = state.query, compact = q.replace(/[\s-]/g, "");
      if (id.indexOf(q) === -1 && id.replace(/-/g, "").indexOf(compact) === -1 && String(p.num) !== q.replace(/^0+/, "")) return false;
    }
    return true;
  }

  function applyFilters() {
    visible = [];
    products.forEach(function (p) {
      var show = matches(p);
      p.el.hidden = !show;
      if (show) visible.push(p);
    });
    var total = products.length;
    var count = $("#resultCount"), empty = $("#empty");
    count.textContent = visible.length === total ? "Showing all " + total + " products" : "Showing " + visible.length + " of " + total + " products";
    empty.hidden = visible.length > 0;
    if (!visible.length) {
      var t = $("#emptyTitle"), d = $("#emptyText");
      if (state.query) { t.textContent = "No product found."; d.textContent = "Check the Product ID and try again, for example BUZ-012."; }
      else if (state.filter === "new") { t.textContent = "No new products marked yet."; d.textContent = "Add new: true to a product in products.js to show it here."; }
      else { t.textContent = "No featured products marked yet."; d.textContent = "Add featured: true to a product in products.js to show it here."; }
    }
  }

  function initFilters() {
    var chips = $$(".chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { var on = c === chip; c.classList.toggle("is-active", on); c.setAttribute("aria-selected", String(on)); });
        state.filter = chip.dataset.filter;
        applyFilters();
      });
    });
    var input = $("#search"), clear = $("#searchClear"), timer;
    input.addEventListener("input", function () {
      clear.hidden = !input.value;
      clearTimeout(timer);
      timer = setTimeout(function () { state.query = input.value.trim().toLowerCase(); applyFilters(); }, 120);
    });
    clear.addEventListener("click", function () {
      input.value = ""; clear.hidden = true; state.query = ""; applyFilters(); input.focus();
    });
    $("#resetFilters").addEventListener("click", function () {
      input.value = ""; clear.hidden = true; state.query = "";
      chips[0].click();
    });
  }

  /* ---------- Lightbox with zoom, pan, pinch and swipe ---------- */
  var lb = $("#lightbox"), stage = $("#lbStage"), lbImg = $("#lbImg");
  var cur = null, lastFocus = null;
  var z = { s: 1, x: 0, y: 0 };
  var MAX_SCALE = 5;
  var pointers = {}, gesture = null;

  function applyTransform(animate) {
    lbImg.classList.toggle("is-animating", !!animate);
    lbImg.style.transform = "translate(" + z.x + "px," + z.y + "px) scale(" + z.s + ")";
    stage.classList.toggle("is-zoomed", z.s > 1.01);
  }
  function clampPan() {
    var w = lbImg.clientWidth * z.s, h = lbImg.clientHeight * z.s;
    var mx = Math.max(0, (w - stage.clientWidth) / 2), my = Math.max(0, (h - stage.clientHeight) / 2);
    z.x = Math.min(mx, Math.max(-mx, z.x));
    z.y = Math.min(my, Math.max(-my, z.y));
  }
  function setScale(ns, cx, cy, animate) {
    ns = Math.min(MAX_SCALE, Math.max(1, ns));
    var r = stage.getBoundingClientRect();
    var px = (cx == null ? r.left + r.width / 2 : cx) - (r.left + r.width / 2);
    var py = (cy == null ? r.top + r.height / 2 : cy) - (r.top + r.height / 2);
    var ratio = ns / z.s;
    z.x = px - (px - z.x) * ratio;
    z.y = py - (py - z.y) * ratio;
    z.s = ns;
    if (ns === 1) { z.x = 0; z.y = 0; }
    clampPan();
    applyTransform(animate);
  }
  function resetZoom() { z.s = 1; z.x = 0; z.y = 0; applyTransform(false); }

  function openLightbox(p) {
    lastFocus = document.activeElement;
    cur = p;
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    showInLightbox(p);
    $("#lbClose").focus();
  }
  function showInLightbox(p) {
    cur = p;
    resetZoom();
    lbImg.src = p.src;
    lbImg.alt = p.id + " jewelry by Be Unique Zone";
    $("#lbId").textContent = p.id;
    $("#lbOrder").href = orderLink(p);
    var multi = visible.length > 1;
    $("#lbPrev").hidden = !multi; $("#lbNext").hidden = !multi;
  }
  function closeLightbox() {
    lb.hidden = true;
    document.body.classList.remove("no-scroll");
    lbImg.removeAttribute("src");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function stepLightbox(dir) {
    if (visible.length < 2) return;
    var i = visible.indexOf(cur);
    if (i === -1) i = 0;
    showInLightbox(visible[(i + dir + visible.length) % visible.length]);
  }

  function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  function initLightbox() {
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", function () { stepLightbox(-1); });
    $("#lbNext").addEventListener("click", function () { stepLightbox(1); });
    $("#lbZoomIn").addEventListener("click", function () { setScale(z.s * 1.6, null, null, true); });
    $("#lbZoomOut").addEventListener("click", function () { setScale(z.s / 1.6, null, null, true); });

    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "ArrowRight") stepLightbox(1);
      else if (e.key === "+" || e.key === "=") setScale(z.s * 1.4, null, null, true);
      else if (e.key === "-") setScale(z.s / 1.4, null, null, true);
      else if (e.key === "Tab") { // keep focus inside the viewer
        var f = $$("button:not([hidden]), a[href]", lb);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      setScale(z.s * (e.deltaY < 0 ? 1.18 : 1 / 1.18), e.clientX, e.clientY, false);
    }, { passive: false });

    var lastTap = 0, tapStart = null;
    stage.addEventListener("pointerdown", function (e) {
      stage.setPointerCapture(e.pointerId);
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pointers);
      if (ids.length === 1) {
        gesture = { type: "pan", sx: e.clientX, sy: e.clientY, ox: z.x, oy: z.y, moved: false, t: Date.now() };
        stage.classList.add("is-dragging");
      } else if (ids.length === 2) {
        gesture = { type: "pinch", d: dist(pointers[ids[0]], pointers[ids[1]]), s: z.s };
      }
    });
    stage.addEventListener("pointermove", function (e) {
      if (!pointers[e.pointerId] || !gesture) return;
      pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pointers);
      if (gesture.type === "pinch" && ids.length >= 2) {
        var a = pointers[ids[0]], b = pointers[ids[1]];
        setScale(gesture.s * dist(a, b) / gesture.d, (a.x + b.x) / 2, (a.y + b.y) / 2, false);
      } else if (gesture.type === "pan") {
        var dx = e.clientX - gesture.sx, dy = e.clientY - gesture.sy;
        if (Math.abs(dx) + Math.abs(dy) > 6) gesture.moved = true;
        if (z.s > 1.01) { z.x = gesture.ox + dx; z.y = gesture.oy + dy; clampPan(); applyTransform(false); }
      }
    });
    function endPointer(e) {
      if (!pointers[e.pointerId]) return;
      delete pointers[e.pointerId];
      stage.classList.remove("is-dragging");
      if (gesture && gesture.type === "pan" && !Object.keys(pointers).length) {
        var dx = e.clientX - gesture.sx, dy = e.clientY - gesture.sy;
        if (z.s <= 1.01 && Math.abs(dx) > 60 && Math.abs(dy) < 70) {
          stepLightbox(dx < 0 ? 1 : -1);
        } else if (!gesture.moved && e.type === "pointerup") {
          var now = Date.now();
          if (now - lastTap < 320) { // double tap / double click
            if (z.s > 1.01) setScale(1, null, null, true); else setScale(2.6, e.clientX, e.clientY, true);
            lastTap = 0;
          } else { lastTap = now; }
        }
      }
      gesture = Object.keys(pointers).length ? { type: "pan", sx: e.clientX, sy: e.clientY, ox: z.x, oy: z.y, moved: true, t: Date.now() } : null;
    }
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);
    window.addEventListener("resize", function () { if (!lb.hidden) { clampPan(); applyTransform(false); } });
  }

  /* ---------- Welcome Music (10% Volume, Autoplay & Cartoon Toggle) ---------- */
  function initWelcomeAudio() {
    var toggle = $("#musicToggle");
    var badge = $("#musicBadge");
    if (!toggle) return;

    var audio = new Audio("assets/welcome-music.mp3");
    audio.loop = true;
    audio.volume = 0.10; // Exactly 10% volume
    var isPlaying = false;

    function setVisualState(playing) {
      isPlaying = playing;
      toggle.classList.toggle("is-playing", playing);
      if (badge) badge.textContent = playing ? "১০%" : "OFF";
      toggle.setAttribute("title", playing ? "মিউজিক বন্ধ করতে ক্লিক করুন (১০% সাউন্ড)" : "ওয়েলকাম মিউজিক চালু করুন");
      toggle.setAttribute("aria-label", playing ? "Turn off welcome music" : "Turn on welcome music");
    }

    function playAudio() {
      audio.volume = 0.10;
      audio.play().then(function () {
        setVisualState(true);
      }).catch(function () {
        setVisualState(false);
      });
    }

    // Try autoplay on page enter
    playAudio();

    // Browser interaction fallback
    var hasInteracted = false;
    function onFirstGesture() {
      if (!hasInteracted) {
        hasInteracted = true;
        playAudio();
      }
    }
    window.addEventListener("click", onFirstGesture, { once: true });
    window.addEventListener("touchstart", onFirstGesture, { once: true });
    window.addEventListener("scroll", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });

    // Toggle button handler
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (isPlaying) {
        audio.pause();
        setVisualState(false);
      } else {
        playAudio();
      }
    });
  }

  /* ---------- Start ---------- */
  function init() {
    applyConfig();
    initHeader();
    initWelcomeAudio();
    initFilters();
    initLightbox();
    if (!products.length) {
      $("#resultCount").textContent = "";
      $("#emptyTitle").textContent = "The collection is being prepared.";
      $("#emptyText").textContent = "Add products to products.js.";
      $("#resetFilters").hidden = true;
      $("#empty").hidden = false;
      return;
    }
    renderAll();
    applyFilters();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
