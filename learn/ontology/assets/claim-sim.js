/* Ontology course — claim decision simulator.
   Shows the three parts of a decision system side by side:
   1. input (unstructured note) -> reading step (simulated LLM)
   2. typed facts, checked against a small ontology (is-a hierarchy)
   3. a decision table that turns facts into a decision, with a trace.
   ClaimSim.mount(el, {
     id, note,                                   // note is HTML
     ontology: {parent: {Child: "Parent", ...}},
     fields: [{key, label, kind: "class"|"bool"|"number", options?, min?, max?}],
     readings: [{weight, facts, says}],          // plausible outputs of the reading step
     columns: ["..."], rules: [{id, cells: [...], when: function (facts, onto) {...}, decision}],
     explain: function (facts, onto, rule) -> HTML string
   })
   Needs assets/learn.js (Learn.el) loaded first. */
(function () {
  "use strict";
  var el = window.Learn.el;

  function makeOntology(parent) {
    function chain(c) {
      var out = [c], seen = {};
      while (parent[c] && !seen[c]) { seen[c] = true; c = parent[c]; out.push(c); }
      return out;
    }
    return {
      parent: parent,
      chain: chain,
      isA: function (c, ancestor) { return chain(c).indexOf(ancestor) !== -1; }
    };
  }

  function mount(root, cfg) {
    var onto = makeOntology(cfg.ontology.parent);
    var facts = {};
    cfg.fields.forEach(function (f) { facts[f.key] = f.kind === "bool" ? false : f.kind === "number" ? 0 : f.options[0]; });
    var source = "not run yet";
    var runs = [];
    var bag = [];
    var lastReading = -1;

    function draw() {
      if (!bag.length) {
        cfg.readings.forEach(function (r, i) { for (var w = 0; w < (r.weight || 1); w++) bag.push(i); });
        for (var i = bag.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = bag[i]; bag[i] = bag[j]; bag[j] = t; }
      }
      var k = bag.findIndex(function (x) { return x !== lastReading; });
      if (k < 0) k = 0;
      lastReading = bag.splice(k, 1)[0];
      return lastReading;
    }

    function decide() {
      var hits = cfg.rules.filter(function (r) { return r.when(facts, onto); });
      return { rule: hits[0] || null, count: hits.length };
    }

    /* ---------- layout ---------- */
    root.classList.add("sim", "wide");
    root.innerHTML = "";
    var grid = el("div", { class: "sim-grid" });
    root.appendChild(grid);

    // 1. input + reading step
    var readBtn = el("button", { class: "btn", type: "button", id: cfg.id + "-read", text: "Run the reader" });
    var says = el("p", { class: "small sim-says", "aria-live": "polite", text: "Press the button to let the reader turn the note into facts." });
    grid.appendChild(el("section", { class: "sim-card" },
      el("p", { class: "eyebrow" }, el("span", { class: "k-read", text: "1 · Read" })),
      el("div", { class: "sim-note", html: cfg.note }),
      el("div", { class: "row" }, readBtn),
      says,
      el("p", { class: "small", text: "Simulated reader: each press picks one of " + cfg.readings.length + " plausible readings of this note, at random." })));

    // 2. typed facts
    var factBox = el("div", { class: "sim-facts" });
    var srcLine = el("p", { class: "small" });
    grid.appendChild(el("section", { class: "sim-card" },
      el("p", { class: "eyebrow" }, el("span", { class: "k-onto", text: "2 · Typed facts" })),
      factBox, srcLine));

    // 3. decision
    var table = el("table", { class: "dt" });
    var stamp = el("p", { class: "stamp", "aria-live": "polite" });
    var trace = el("p", { class: "small sim-trace" });
    grid.appendChild(el("section", { class: "sim-card" },
      el("p", { class: "eyebrow" }, el("span", { class: "k-decide", text: "3 · Decide" })),
      el("div", { class: "scroll-x" }, table), stamp, trace));

    // log
    var log = el("tbody");
    var verdictLine = el("p", { class: "small sim-verdict" });
    root.appendChild(el("div", { class: "sim-log" },
      el("p", { class: "eyebrow", text: "Run log" }),
      el("div", { class: "scroll-x" }, el("table", null,
        el("thead", null, el("tr", null, el("th", { text: "Run" }), el("th", { text: "Facts came from" }), el("th", { text: "Facts" }), el("th", { text: "Row" }), el("th", { text: "Decision" }))),
        log)),
      verdictLine));

    /* ---------- fact controls ---------- */
    var controls = {};
    cfg.fields.forEach(function (f) {
      var id = cfg.id + "-f-" + f.key;
      var input;
      if (f.kind === "class") {
        input = el("select", { id: id });
        f.options.forEach(function (o) { input.appendChild(el("option", { value: o, text: o })); });
      } else if (f.kind === "bool") {
        input = el("select", { id: id });
        input.appendChild(el("option", { value: "false", text: "no" }));
        input.appendChild(el("option", { value: "true", text: "yes" }));
      } else {
        input = el("input", { id: id, type: "number", min: String(f.min || 0), max: String(f.max || 99), step: "1", inputmode: "numeric" });
      }
      input.addEventListener("change", function () {
        facts[f.key] = f.kind === "bool" ? input.value === "true" : f.kind === "number" ? Math.max(0, parseInt(input.value || "0", 10)) : input.value;
        source = "you";
        update(true);
      });
      var chain = f.kind === "class" ? el("p", { class: "sim-chain mono" }) : null;
      controls[f.key] = { input: input, chain: chain, field: f };
      factBox.appendChild(el("div", { class: "sim-field" }, el("label", { for: id, text: f.label }), input, chain));
    });

    // decision table head + rows
    var thead = el("tr", null, el("th", { text: "Row" }));
    cfg.columns.forEach(function (c) { thead.appendChild(el("th", { text: c })); });
    thead.appendChild(el("th", { text: "Decision" }));
    table.appendChild(el("thead", null, thead));
    var tbody = el("tbody");
    var rowEls = {};
    cfg.rules.forEach(function (r) {
      var tr = el("tr", null, el("td", { class: "mono", text: r.id }));
      r.cells.forEach(function (c) { tr.appendChild(el("td", { html: c })); });
      tr.appendChild(el("td", { text: r.decision }));
      rowEls[r.id] = tr;
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    function factSummary() {
      return cfg.fields.map(function (f) {
        var v = facts[f.key];
        return (f.short || f.key) + "=" + (f.kind === "bool" ? (v ? "yes" : "no") : v);
      }).join(", ");
    }

    function update(logIt) {
      cfg.fields.forEach(function (f) {
        var c = controls[f.key];
        c.input.value = String(facts[f.key]);
        if (c.chain) c.chain.textContent = onto.chain(facts[f.key]).join("  is-a →  ");
      });
      srcLine.textContent = source === "not run yet" ? "These are blank defaults. Run the reader, or change a fact yourself." :
        "Set by " + (source === "you" ? "you (by hand)" : source) + ". Change any fact to see the decision update.";
      var d = decide();
      Object.keys(rowEls).forEach(function (k) { rowEls[k].classList.toggle("hit", d.rule && d.rule.id === k); });
      if (d.rule) {
        stamp.textContent = d.rule.decision;
        trace.innerHTML = cfg.explain ? cfg.explain(facts, onto, d.rule) : "Row " + d.rule.id + " matched.";
      } else {
        stamp.textContent = "No row matched";
        trace.textContent = "The table has a gap: no rule covers these facts.";
      }
      if (logIt) {
        runs.push({ src: source, facts: factSummary(), row: d.rule ? d.rule.id : "–", decision: d.rule ? d.rule.decision : "none" });
        var r = runs[runs.length - 1];
        log.insertBefore(el("tr", { class: "reveal" }, el("td", { text: String(runs.length) }), el("td", { text: r.src }),
          el("td", { class: "mono", text: r.facts }), el("td", { class: "mono", text: r.row }), el("td", { text: r.decision })), log.firstChild);
        summarize();
      }
    }

    function summarize() {
      var byFacts = {}, consistent = true, decisions = {}, readerDecisions = {};
      runs.forEach(function (r) {
        if (byFacts[r.facts] && byFacts[r.facts] !== r.decision) consistent = false;
        byFacts[r.facts] = r.decision;
        decisions[r.decision] = true;
        if (r.src !== "you") readerDecisions[r.decision] = true;
      });
      var nReader = Object.keys(readerDecisions).length;
      verdictLine.innerHTML =
        "<strong>Same facts → same decision:</strong> " + (consistent ? "yes, in every run so far." : "no.") +
        " &nbsp; <strong>Same note → same decision:</strong> " +
        (nReader <= 1 ? "so far, yes. Keep running the reader." : "no. The reader alone produced " + nReader + " different decisions for one note.");
    }

    readBtn.addEventListener("click", function () {
      var i = draw();
      var r = cfg.readings[i];
      Object.keys(r.facts).forEach(function (k) { facts[k] = r.facts[k]; });
      source = "the reader (run " + (runs.filter(function (x) { return x.src !== "you"; }).length + 1) + ")";
      says.innerHTML = r.says;
      update(true);
    });

    update(false);
  }

  window.ClaimSim = { mount: mount, makeOntology: makeOntology };
})();
