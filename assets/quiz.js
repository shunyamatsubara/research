/* quiz.js — shared quiz widgets for lessons.

   1) Multiple choice
      <div class="mcq" data-correct="2">
        <p class="q">Question text</p>
        <ol class="opts">
          <li><button type="button" class="opt" data-why="Why this is wrong">Option</button></li>
          ...
        </ol>
        <template class="explain">Shown after the right answer.</template>
      </div>
      data-correct is the 0-based index of the right option.

   2) Sorter: assign each job to a bin
      <div class="sorter" data-bins="hw:Hyperion,safe:Halos,ai:Alpamayo" data-title="...">
        <div class="item" data-answer="hw" data-why="Explanation">Job text</div>
        ...
      </div>
      Items are shuffled on load. The score counts first-try answers only.
*/
(function () {
  "use strict";

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function nudge(btn) {
    btn.classList.remove("just");
    void btn.offsetWidth;
    btn.classList.add("just");
  }

  function feedback(box, ok, html) {
    box.innerHTML = "";
    var tag = el("span", "tag " + (ok ? "ok" : "no"), ok ? "Correct." : "Not quite.");
    box.appendChild(tag);
    var body = el("span");
    body.innerHTML = html || "";
    box.appendChild(body);
  }

  function initMcq(root) {
    var correct = parseInt(root.getAttribute("data-correct"), 10);
    var opts = Array.prototype.slice.call(root.querySelectorAll(".opt"));
    var explain = root.querySelector("template.explain");
    var fb = el("div", "fb");
    fb.setAttribute("aria-live", "polite");
    root.appendChild(fb);

    opts.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        if (i === correct) {
          btn.classList.add("right");
          opts.forEach(function (b) { b.disabled = true; });
          feedback(fb, true, explain ? explain.innerHTML : "");
        } else {
          btn.classList.add("wrong");
          btn.disabled = true;
          nudge(btn);
          feedback(fb, false, (btn.getAttribute("data-why") || "") + " Try again.");
        }
      });
    });
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function initSorter(root) {
    var bins = (root.getAttribute("data-bins") || "").split(",").map(function (s) {
      var p = s.split(":");
      return { key: p[0].trim(), label: (p[1] || p[0]).trim() };
    });
    var items = Array.prototype.slice.call(root.querySelectorAll(".item"));
    var list = el("div", "items");

    var head = el("div", "head");
    head.appendChild(el("span", "title", root.getAttribute("data-title") || "Sort each job"));
    var score = el("span", "score");
    score.setAttribute("aria-live", "polite");
    head.appendChild(score);
    root.insertBefore(head, root.firstChild);

    var state = { done: 0, firstTry: 0, total: items.length };
    function renderScore() {
      score.textContent = state.done < state.total
        ? state.done + " of " + state.total + " placed"
        : "Done: " + state.firstTry + " of " + state.total + " right on the first try";
    }

    shuffle(items).forEach(function (item) {
      var answer = item.getAttribute("data-answer");
      var why = item.getAttribute("data-why") || "";
      var text = item.innerHTML;
      item.innerHTML = "";
      item.appendChild(el("div", "job")).innerHTML = text;

      var row = el("div", "bins");
      var fb = el("div", "fb");
      fb.setAttribute("aria-live", "polite");
      var tries = 0;
      var buttons = bins.map(function (b) {
        var btn = el("button", "bin-btn", b.label);
        btn.type = "button";
        btn.addEventListener("click", function () {
          tries++;
          if (b.key === answer) {
            btn.classList.add("right");
            buttons.forEach(function (x) { x.disabled = true; });
            feedback(fb, true, why);
            state.done++;
            if (tries === 1) state.firstTry++;
            renderScore();
          } else {
            btn.classList.add("wrong");
            btn.disabled = true;
            nudge(btn);
            var hint = item.getAttribute("data-hint-" + b.key) || "Think about which layer owns this job.";
            feedback(fb, false, hint);
          }
        });
        row.appendChild(btn);
        return btn;
      });
      item.appendChild(row);
      item.appendChild(fb);
      list.appendChild(item);
    });

    root.appendChild(list);
    renderScore();
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".mcq"), initMcq);
    Array.prototype.forEach.call(document.querySelectorAll(".sorter"), initSorter);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
