/* Robot Startup Moats: shared practice widgets for every lesson.
 *
 * Markup contract (plain HTML, no build step; works from a local file or the published course):
 *   <main data-lesson="0001">                     lesson id, used for the score line and saved history
 *   .quiz[data-id]                                one question; its buttons are .choice, the right one
 *                                                 has data-correct="true"; an optional .why is shown after
 *   .sorter[data-id][data-categories="A|B|C"]     holds .sort-item[data-answer="B"] blocks, each with
 *                                                 a .claim and an optional .why; category buttons are injected
 *   .recall[data-id]                              a textarea, a .reveal button and a hidden .model answer;
 *                                                 self-rating buttons are injected after the model answer
 *   .score[data-for="0001"]                       shows first-try results and the date of the last attempt
 *
 * Only the first answer counts (retrieval practice). Reload the page to try again.
 * Results are kept in localStorage when the browser allows it, for this viewer only.
 */
(function () {
  "use strict";

  var STORE_KEY = "robot-moats:v1";

  function load() {
    try {
      return JSON.parse(window.localStorage.getItem(STORE_KEY) || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  function save(state) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
      /* Storage is blocked (private window, preview): the page still works. */
    }
  }

  function lessonOf(el) {
    var root = el.closest("[data-lesson]");
    return root ? root.getAttribute("data-lesson") : "lesson";
  }

  var tally = {};
  var previous = load();

  function ensure(lesson) {
    if (!tally[lesson]) tally[lesson] = { total: 0, answered: 0, correct: 0 };
    return tally[lesson];
  }

  function shortDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function renderScores() {
    var els = document.querySelectorAll(".score[data-for]");
    Array.prototype.forEach.call(els, function (el) {
      var lesson = el.getAttribute("data-for");
      var t = tally[lesson];
      if (!t) return;
      var text;
      if (t.answered === 0) {
        var last = previous["lesson:" + lesson];
        text = "0 of " + t.total + " answered.";
        if (last && last.at) {
          text += " Last attempt (" + shortDate(last.at) + "): " + last.correct + " of " + last.answered + " right on the first try.";
        }
      } else {
        text = t.correct + " of " + t.answered + " right on the first try. " + (t.total - t.answered) + " left.";
      }
      el.textContent = text;
    });
  }

  function recordAnswer(lesson, id, ok) {
    var t = ensure(lesson);
    t.answered += 1;
    if (ok) t.correct += 1;
    var state = load();
    state[id] = { ok: ok, at: new Date().toISOString() };
    state["lesson:" + lesson] = { correct: t.correct, answered: t.answered, total: t.total, at: new Date().toISOString() };
    save(state);
    renderScores();
  }

  function makeFeedback() {
    var p = document.createElement("p");
    p.className = "feedback";
    p.setAttribute("aria-live", "polite");
    p.hidden = true;
    return p;
  }

  function showFeedback(p, ok, message) {
    p.textContent = "";
    p.className = "feedback " + (ok ? "good" : "bad");
    var tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = ok ? "Right" : "Not quite";
    p.appendChild(tag);
    p.appendChild(document.createTextNode(message));
    p.hidden = false;
  }

  /* ---------- Multiple choice ---------- */

  function initQuiz(q) {
    var lesson = lessonOf(q);
    var id = q.getAttribute("data-id") || "quiz";
    var choices = Array.prototype.slice.call(q.querySelectorAll(".choice"));
    if (!choices.length) return;
    var why = q.querySelector(".why");
    var fb = makeFeedback();
    if (why) {
      why.hidden = true;
      q.insertBefore(fb, why);
    } else {
      q.appendChild(fb);
    }
    ensure(lesson).total += 1;
    var done = false;

    choices.forEach(function (btn) {
      btn.type = "button";
      btn.addEventListener("click", function () {
        if (done) return;
        done = true;
        var ok = btn.getAttribute("data-correct") === "true";
        choices.forEach(function (b) {
          b.disabled = true;
          if (b.getAttribute("data-correct") === "true") b.classList.add("is-correct");
        });
        if (!ok) btn.classList.add("is-wrong");
        btn.setAttribute("aria-pressed", "true");
        showFeedback(fb, ok, ok ? "" : "The right answer is marked in green.");
        if (why) why.hidden = false;
        recordAnswer(lesson, id, ok);
      });
    });
  }

  /* ---------- Sort each item into a category ---------- */

  function initSorter(s) {
    var lesson = lessonOf(s);
    var id = s.getAttribute("data-id") || "sorter";
    var cats = (s.getAttribute("data-categories") || "")
      .split("|")
      .map(function (c) { return c.trim(); })
      .filter(Boolean);
    var items = s.querySelectorAll(".sort-item");

    Array.prototype.forEach.call(items, function (item, index) {
      var answer = item.getAttribute("data-answer");
      var why = item.querySelector(".why");
      var group = document.createElement("div");
      group.className = "cat-buttons";
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", "Choose where this claim belongs");
      var fb = makeFeedback();
      var done = false;
      ensure(lesson).total += 1;

      cats.forEach(function (c) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "cat";
        b.textContent = c;
        b.addEventListener("click", function () {
          if (done) return;
          done = true;
          var ok = c === answer;
          Array.prototype.forEach.call(group.querySelectorAll("button"), function (x) {
            x.disabled = true;
            if (x.textContent === answer) x.classList.add("is-correct");
          });
          if (!ok) b.classList.add("is-wrong");
          showFeedback(fb, ok, ok ? answer + "." : "It belongs in " + answer + ".");
          if (why) why.hidden = false;
          recordAnswer(lesson, id + ":" + index, ok);
        });
        group.appendChild(b);
      });

      if (why) {
        why.hidden = true;
        item.insertBefore(group, why);
        item.insertBefore(fb, why);
      } else {
        item.appendChild(group);
        item.appendChild(fb);
      }
    });
  }

  /* ---------- Free recall, then compare with a model answer ---------- */

  function initRecall(r) {
    var id = r.getAttribute("data-id") || "recall";
    var reveal = r.querySelector(".reveal");
    var model = r.querySelector(".model");
    if (!reveal || !model) return;
    model.hidden = true;

    var rate = document.createElement("div");
    rate.className = "self-rate";
    rate.hidden = true;
    var label = document.createElement("span");
    label.textContent = "How close were you?";
    rate.appendChild(label);

    var note = document.createElement("p");
    note.className = "feedback";
    note.setAttribute("aria-live", "polite");

    [
      ["Got it", "Good. Try it again in 3 days, without looking."],
      ["Partly", "Normal for a first try. Re-read the section, then try again tomorrow."],
      ["Missed it", "Re-read the section now, then try again tomorrow."]
    ].forEach(function (pair) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "cat";
      b.textContent = pair[0];
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(rate.querySelectorAll("button"), function (x) {
          x.setAttribute("aria-pressed", x === b ? "true" : "false");
        });
        note.textContent = pair[1];
        var state = load();
        state[id] = { rating: pair[0], at: new Date().toISOString() };
        save(state);
      });
      rate.appendChild(b);
    });
    rate.appendChild(note);
    model.parentNode.insertBefore(rate, model.nextSibling);

    reveal.type = "button";
    reveal.addEventListener("click", function () {
      model.hidden = false;
      rate.hidden = false;
      reveal.disabled = true;
    });
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll(".quiz"), initQuiz);
    Array.prototype.forEach.call(document.querySelectorAll(".sorter"), initSorter);
    Array.prototype.forEach.call(document.querySelectorAll(".recall"), initRecall);
    renderScores();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
