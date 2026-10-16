/* Weakest Link — quiz component.
   Markup:
     <div class="quiz" data-quiz data-options="Question|Ground|Reasoning|So-what">
       <div class="q" data-answer="2">            (1-based index into the options)
         <p class="q-text">Case text…</p>
         <p class="q-why" hidden>Why this is the answer…</p>
       </div>
       …
     </div>
   A .q may set its own data-options to override the quiz-wide list.
   The first click on a case is final: it locks the case, marks the right answer,
   and shows the explanation. The footer keeps the score and offers a restart. */
(function () {
  "use strict";

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function mount(quiz) {
    var shared = (quiz.getAttribute("data-options") || "").split("|").filter(Boolean);
    var cases = Array.prototype.slice.call(quiz.querySelectorAll(".q"));
    var total = cases.length;
    var answered = 0;
    var right = 0;

    var foot = el("div", "quiz-foot");
    var score = el("span", "quiz-score");
    score.setAttribute("aria-live", "polite");
    var restart = el("button", "btn quiet", "Start again");
    restart.type = "button";
    foot.appendChild(score);
    foot.appendChild(restart);
    quiz.appendChild(foot);

    function update() {
      if (answered === 0) {
        score.textContent = total + " cases. Your first answer to each one counts.";
      } else if (answered < total) {
        score.textContent = right + " right out of " + answered + " answered · " + (total - answered) + " to go";
      } else {
        score.textContent = "Done: " + right + " of " + total + " right. Tell your teacher which ones you missed.";
      }
    }

    cases.forEach(function (q, i) {
      var options = (q.getAttribute("data-options") || "").split("|").filter(Boolean);
      if (!options.length) options = shared;
      var answer = parseInt(q.getAttribute("data-answer"), 10);
      var why = q.querySelector(".q-why");
      var label = el("p", "q-num", "Case " + (i + 1) + " of " + total);
      q.insertBefore(label, q.firstChild);
      q.setAttribute("role", "group");
      q.setAttribute("aria-label", "Case " + (i + 1));

      var row = el("div", "q-options");
      var buttons = options.map(function (text, k) {
        var b = el("button", "opt", text);
        b.type = "button";
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () { choose(k + 1, b); });
        row.appendChild(b);
        return b;
      });
      if (why) {
        q.insertBefore(row, why);
        why.setAttribute("aria-live", "polite");
      } else {
        q.appendChild(row);
      }
      var verdict = el("span", "q-verdict");
      if (why) why.insertBefore(verdict, why.firstChild);

      function choose(k, b) {
        if (q.classList.contains("is-done")) return;
        q.classList.add("is-done");
        var ok = k === answer;
        answered += 1;
        if (ok) right += 1;
        buttons.forEach(function (x, idx) {
          x.setAttribute("aria-disabled", "true");
          if (idx + 1 === answer) x.classList.add("is-right");
        });
        b.setAttribute("aria-pressed", "true");
        if (!ok) b.classList.add("is-wrong");
        verdict.textContent = ok ? "Right." : "Not quite. Answer: " + options[answer - 1] + ".";
        verdict.className = "q-verdict " + (ok ? "is-right" : "is-wrong");
        if (why) why.hidden = false;
        update();
      }

      q._reset = function () {
        q.classList.remove("is-done");
        buttons.forEach(function (x) {
          x.classList.remove("is-right", "is-wrong");
          x.setAttribute("aria-pressed", "false");
          x.removeAttribute("aria-disabled");
        });
        verdict.textContent = "";
        if (why) why.hidden = true;
      };
    });

    restart.addEventListener("click", function () {
      cases.forEach(function (q) { q._reset(); });
      answered = 0;
      right = 0;
      update();
      if (cases[0]) cases[0].scrollIntoView({ block: "start" });
    });

    update();
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-quiz]"), mount);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
