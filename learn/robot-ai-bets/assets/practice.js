/* Practice widgets shared by all lessons.
 *
 * Multiple-choice quiz (immediate feedback):
 *   <div class="quiz" data-id="l1-q1" data-answer="2">   <!-- 1-based -->
 *     <p class="q">Question</p>
 *     <ol class="choices"><li>A</li><li>B</li><li>C</li></ol>
 *     <div class="explain" hidden>Why the answer is right.</div>
 *   </div>
 *   <p class="score" data-quiz-score></p>                 <!-- optional -->
 *
 * Free recall (write first, then compare with a model answer and rate):
 *   <div class="recall" data-id="l1-r1">
 *     <p class="prompt">Explain X from memory.</p>
 *     <div class="model-answer" hidden>Model answer.</div>
 *   </div>
 *
 * Answers and ratings are kept in localStorage when it is available, so a
 * later review lesson can show what was missed. The page works without it.
 */
(function () {
  var PREFIX = "robot-ai-bets:";

  function load(key) {
    try { return JSON.parse(localStorage.getItem(PREFIX + key)); } catch (e) { return null; }
  }
  function save(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  // ---------- Quiz ----------
  var quizzes = Array.prototype.slice.call(document.querySelectorAll(".quiz"));
  var firstTry = {};

  function updateScore() {
    var el = document.querySelector("[data-quiz-score]");
    if (!el) return;
    var ids = Object.keys(firstTry);
    var right = ids.filter(function (k) { return firstTry[k]; }).length;
    if (ids.length === 0) { el.textContent = ""; return; }
    el.textContent = "First-try score: " + right + " of " + ids.length +
      (ids.length < quizzes.length ? " answered so far." : ". Missed ones are worth a second look tomorrow.");
  }

  quizzes.forEach(function (quiz, qi) {
    var id = quiz.getAttribute("data-id") || ("quiz-" + qi);
    var answer = parseInt(quiz.getAttribute("data-answer"), 10);
    var items = quiz.querySelectorAll(".choices li");
    var explain = quiz.querySelector(".explain");
    var buttons = [];

    Array.prototype.forEach.call(items, function (li, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "choice";
      b.innerHTML = li.innerHTML;
      li.innerHTML = "";
      li.appendChild(b);
      buttons.push(b);
      b.addEventListener("click", function () {
        var ok = (i + 1) === answer;
        if (!(id in firstTry)) {
          firstTry[id] = ok;
          save("quiz:" + id, { ok: ok, at: new Date().toISOString() });
          updateScore();
        }
        b.classList.add(ok ? "correct" : "wrong");
        if (ok) {
          buttons.forEach(function (x) { x.disabled = true; });
        } else {
          b.disabled = true;
        }
        if (explain) {
          var v = explain.querySelector(".verdict");
          if (!v) {
            v = document.createElement("span");
            explain.insertBefore(v, explain.firstChild);
          }
          v.className = "verdict " + (ok ? "ok" : "no");
          v.textContent = ok ? "Correct." : "Not quite — try another option, or read on.";
          if (ok) explain.hidden = false;
        }
      });
    });
  });

  // ---------- Free recall ----------
  Array.prototype.forEach.call(document.querySelectorAll(".recall"), function (box, ri) {
    var id = box.getAttribute("data-id") || ("recall-" + ri);
    var model = box.querySelector(".model-answer");
    var saved = load("recall:" + id) || {};

    var ta = document.createElement("textarea");
    ta.placeholder = "Write your answer from memory first. Do not scroll up.";
    ta.value = saved.text || "";
    ta.addEventListener("input", function () {
      saved.text = ta.value;
      save("recall:" + id, saved);
    });

    var show = document.createElement("button");
    show.type = "button";
    show.className = "btn";
    show.textContent = "Compare with model answer";

    var rate = document.createElement("div");
    rate.className = "rate";
    rate.hidden = true;
    rate.appendChild(document.createTextNode("How close were you? "));
    ["Got it", "Partly", "Missed"].forEach(function (label) {
      var r = document.createElement("button");
      r.type = "button";
      r.className = "btn ghost";
      r.textContent = label;
      r.setAttribute("aria-pressed", saved.rating === label ? "true" : "false");
      r.addEventListener("click", function () {
        saved.rating = label;
        saved.at = new Date().toISOString();
        save("recall:" + id, saved);
        Array.prototype.forEach.call(rate.querySelectorAll(".btn"), function (x) {
          x.setAttribute("aria-pressed", x === r ? "true" : "false");
        });
      });
      rate.appendChild(r);
    });

    show.addEventListener("click", function () {
      if (model) model.hidden = false;
      rate.hidden = false;
      show.hidden = true;
    });

    var anchor = model || null;
    box.insertBefore(ta, anchor);
    box.insertBefore(show, anchor);
    box.appendChild(rate);
  });
})();
