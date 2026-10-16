/* Ontology course — shared practice widgets.
   Learn.mountQuiz(el, {id, questions:[{q, options:[...], answer, why}]})
   Learn.mountSorter(el, {id, bins:[{key,label}], items:[{text, bin, why}]})
   Learn.mountRecall(el, {id, prompt, model, checks:[...]})
   Learn.markDone(lessonId) / Learn.isDone(lessonId)
   Results are kept only in this browser (localStorage) and the page works without it. */
(function () {
  "use strict";

  var PREFIX = "onto-course:";
  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem(PREFIX + k); return v == null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch (e) { /* storage blocked */ }
    }
  };

  function el(tag, attrs) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k.slice(0, 2) === "on") n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null) continue;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return n;
  }

  function verdict(ok, text) {
    return el("p", { class: "why reveal" },
      el("span", { class: "verdict " + (ok ? "ok" : "no"), text: ok ? "Correct" : "Not quite" }),
      el("span", { html: text }));
  }

  /* ---------- multiple-choice quiz with instant feedback ---------- */
  function mountQuiz(root, cfg) {
    var key = "quiz:" + cfg.id;
    var first = store.get(key, {});           // index -> was first try correct
    var scoreLine = el("div", { class: "score" });

    function render() {
      root.innerHTML = "";
      cfg.questions.forEach(function (item, qi) {
        var box = el("div", { class: "quiz-q" }, el("p", { html: (qi + 1) + ". " + item.q }));
        var opts = el("div", { class: "opts", role: "group" });
        var buttons = item.options.map(function (o, oi) {
          var b = el("button", { class: "opt", type: "button", id: cfg.id + "-q" + qi + "-o" + oi, html: o });
          b.addEventListener("click", function () {
            var ok = oi === item.answer;
            buttons.forEach(function (x, xi) {
              x.disabled = true;
              if (xi === item.answer) x.classList.add("right");
            });
            if (!ok) b.classList.add("wrong");
            box.appendChild(verdict(ok, item.why));
            if (!(qi in first)) { first[qi] = ok; store.set(key, first); }
            updateScore();
          });
          opts.appendChild(b);
          return b;
        });
        box.appendChild(opts);
        root.appendChild(box);
      });
      root.appendChild(scoreLine);
      updateScore();
    }

    function updateScore() {
      var n = cfg.questions.length;
      var answered = Object.keys(first).length;
      var right = Object.keys(first).filter(function (k) { return first[k]; }).length;
      scoreLine.innerHTML = "";
      scoreLine.appendChild(el("span", { text: answered < n
        ? "First-try score so far: " + right + " of " + answered
        : "First-try score: " + right + " of " + n }));
      if (answered === n) {
        scoreLine.appendChild(el("button", { class: "btn ghost", type: "button", text: "Clear and try again",
          onclick: function () { first = {}; store.set(key, first); render(); } }));
      }
    }
    render();
  }

  /* ---------- sort each item into one of several bins ---------- */
  function mountSorter(root, cfg) {
    var key = "sort:" + cfg.id;
    var first = store.get(key, {});
    var scoreLine = el("div", { class: "score" });

    function render() {
      root.innerHTML = "";
      cfg.items.forEach(function (item, ii) {
        var box = el("div", { class: "sort-item" }, el("blockquote", { html: "“" + item.text + "”" }));
        var bins = el("div", { class: "bins", role: "group" });
        var buttons = cfg.bins.map(function (bin) {
          var b = el("button", { class: "bin", type: "button", id: cfg.id + "-i" + ii + "-" + bin.key, html: bin.label });
          b.addEventListener("click", function () {
            var ok = bin.key === item.bin;
            buttons.forEach(function (x) {
              x.disabled = true;
              if (x.dataset.key === item.bin) x.classList.add("right");
            });
            if (!ok) b.classList.add("wrong");
            box.appendChild(verdict(ok, item.why));
            if (!(ii in first)) { first[ii] = ok; store.set(key, first); }
            updateScore();
          });
          b.dataset.key = bin.key;
          bins.appendChild(b);
          return b;
        });
        box.appendChild(bins);
        root.appendChild(box);
      });
      root.appendChild(scoreLine);
      updateScore();
    }

    function updateScore() {
      var n = cfg.items.length;
      var answered = Object.keys(first).length;
      var right = Object.keys(first).filter(function (k) { return first[k]; }).length;
      scoreLine.innerHTML = "";
      scoreLine.appendChild(el("span", { text: answered < n
        ? "First-try score so far: " + right + " of " + answered
        : "First-try score: " + right + " of " + n }));
      if (answered === n) {
        scoreLine.appendChild(el("button", { class: "btn ghost", type: "button", text: "Clear and try again",
          onclick: function () { first = {}; store.set(key, first); render(); } }));
      }
    }
    render();
  }

  /* ---------- free recall: write first, then compare with a model answer ---------- */
  function mountRecall(root, cfg) {
    var key = "recall:" + cfg.id;
    var saved = store.get(key, { text: "", checks: [] });
    root.classList.add("recall");
    root.innerHTML = "";
    root.appendChild(el("p", { html: cfg.prompt }));
    var ta = el("textarea", { id: cfg.id + "-answer", "aria-label": "Your answer", placeholder: "Write your answer from memory before you look back up the page." });
    ta.value = saved.text || "";
    ta.addEventListener("input", function () { saved.text = ta.value; store.set(key, saved); });
    root.appendChild(ta);

    var model = el("div", { class: "model reveal", hidden: "" },
      el("p", { class: "eyebrow", text: "A model answer" }),
      el("p", { html: cfg.model }));
    var checks = el("ul", { class: "checks" });
    (cfg.checks || []).forEach(function (c, ci) {
      var cb = el("input", { type: "checkbox", id: cfg.id + "-check" + ci });
      cb.checked = !!saved.checks[ci];
      cb.addEventListener("change", function () { saved.checks[ci] = cb.checked; store.set(key, saved); });
      checks.appendChild(el("li", null, el("label", { for: cfg.id + "-check" + ci }, cb, el("span", { html: c }))));
    });
    if (cfg.checks && cfg.checks.length) {
      model.appendChild(el("p", { class: "small", text: "Tick what your answer already said:" }));
      model.appendChild(checks);
    }

    var status = el("span", { class: "small", "aria-live": "polite" });
    var showBtn = el("button", { class: "btn", type: "button", text: "Show the model answer" });
    showBtn.addEventListener("click", function () { model.hidden = false; showBtn.disabled = true; });
    var copyBtn = el("button", { class: "btn ghost", type: "button", text: "Copy my answer" });
    copyBtn.addEventListener("click", function () {
      var done = function () { status.textContent = "Copied. Paste it into the chat for feedback."; };
      var fallback = function () { ta.focus(); ta.select(); status.textContent = "Selected. Copy it, then paste it into the chat."; };
      try {
        navigator.clipboard.writeText(ta.value).then(done, fallback);
      } catch (e) { fallback(); }
    });
    root.appendChild(el("div", { class: "row" }, showBtn, copyBtn, status));
    root.appendChild(model);
  }

  /* ---------- lesson completion, shown on the course home ---------- */
  function markDone(id) { var d = store.get("done", {}); d[id] = true; store.set("done", d); }
  function isDone(id) { return !!store.get("done", {})[id]; }

  window.Learn = { store: store, el: el, mountQuiz: mountQuiz, mountSorter: mountSorter, mountRecall: mountRecall, markDone: markDone, isDone: isDone };
})();
