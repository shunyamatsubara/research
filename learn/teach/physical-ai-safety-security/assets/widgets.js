/* Course widgets for the Physical AI Safety & Security lessons.
 *
 * Each widget is a <div class="widget" data-widget="..." data-title="..."> container.
 * Quiz and sorter content lives in a <script type="application/json"> child, so a lesson
 * holds only data and all behavior lives here. Text fields may contain inline HTML
 * (links, <em>, <strong>, <span class="std">). Full data formats: assets/README.md.
 *
 *   quiz    Multiple choice. A wrong pick shows why it is wrong and the learner tries again;
 *           the score counts first tries only.
 *   sorter  Each item gets one button per bucket ("which layer stops this?"); feedback
 *           appears under the item. Same scoring as quiz.
 *   recall  Free recall. The learner writes from memory, reveals the model answer
 *           (a .recall-answer child), and grades themself; the grade suggests when to retry.
 */
(function () {
  "use strict";

  var LETTERS = "ABCDEFGH";

  function h(tag, props, kids) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (key) {
      var value = props[key];
      if (key === "html") node.innerHTML = value;
      else if (key === "text") node.textContent = value;
      else if (key.slice(0, 2) === "on") node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value);
    });
    (kids || []).forEach(function (kid) { if (kid) node.appendChild(kid); });
    return node;
  }

  function readData(root) {
    var script = root.querySelector('script[type="application/json"]');
    if (!script) return null;
    try {
      return JSON.parse(script.textContent);
    } catch (err) {
      root.appendChild(h("p", { class: "widget-error", text: "This exercise could not load: " + err.message }));
      return null;
    }
  }

  function addHeader(root, scoreNode) {
    root.insertBefore(h("div", { class: "widget-head" }, [
      h("span", { class: "widget-title", text: root.getAttribute("data-title") || "" }),
      scoreNode
    ]), root.firstChild);
  }

  // Shared scoring for quiz and sorter: answered count, then first-try score at the end.
  function makeScore(total) {
    var node = h("span", { class: "score", "aria-live": "polite" });
    var state = { answered: 0, firstTry: 0 };
    function render() {
      node.textContent = state.answered < total
        ? state.answered + " of " + total + " answered"
        : "First-try score: " + state.firstTry + " / " + total;
    }
    render();
    return {
      node: node,
      record: function (tries) {
        state.answered += 1;
        if (tries === 1) state.firstTry += 1;
        render();
      }
    };
  }

  function showFeedback(target, right, html) {
    target.innerHTML = "";
    target.appendChild(h("span", { class: "tag " + (right ? "tag-safe" : "tag-stop"), text: right ? "Right" : "Not quite" }));
    target.appendChild(h("span", { html: html || "" }));
    target.hidden = false;
  }

  function addRestart(root, rebuild) {
    root.appendChild(h("div", { class: "widget-foot" }, [
      h("button", { type: "button", class: "btn btn-quiet", text: "Start over", onclick: rebuild })
    ]));
  }

  function clearGenerated(root) {
    Array.prototype.slice.call(root.children).forEach(function (child) {
      if (child.tagName !== "SCRIPT") root.removeChild(child);
    });
  }

  function initQuiz(root) {
    var data = readData(root);
    if (!data) return;
    var score = makeScore(data.questions.length);
    addHeader(root, score.node);

    data.questions.forEach(function (q, qi) {
      var tries = 0;
      var feedback = h("p", { class: "feedback", "aria-live": "polite", hidden: "" });
      var buttons = q.options.map(function (option, oi) {
        return h("button", { type: "button", class: "opt", onclick: function () { choose(oi); } }, [
          h("span", { class: "key", text: LETTERS[oi] }),
          h("span", { html: option })
        ]);
      });
      function choose(oi) {
        tries += 1;
        var right = oi === q.answer;
        var why = (q.why && q.why[oi]) || "";
        buttons[oi].setAttribute("data-state", right ? "right" : "wrong");
        buttons[oi].disabled = true;
        showFeedback(feedback, right, why + (right ? "" : " Try another option."));
        if (right) {
          buttons.forEach(function (b) { b.disabled = true; });
          score.record(tries);
        }
      }
      root.appendChild(h("div", { class: "q" }, [
        h("p", { class: "q-prompt" }, [
          h("span", { class: "q-num", text: (qi + 1) + "." }),
          h("span", { html: q.prompt })
        ]),
        h("div", { class: "options", role: "group" }, buttons),
        feedback
      ]));
    });
    addRestart(root, function () { clearGenerated(root); initQuiz(root); });
  }

  function initSorter(root) {
    var data = readData(root);
    if (!data) return;
    var score = makeScore(data.items.length);
    addHeader(root, score.node);

    root.appendChild(h("dl", { class: "legend" }, data.buckets.reduce(function (kids, b) {
      kids.push(h("dt", { text: b.short || b.id }));
      kids.push(h("dd", { html: b.label }));
      return kids;
    }, [])));

    data.items.forEach(function (item) {
      var tries = 0;
      var feedback = h("p", { class: "feedback", "aria-live": "polite", hidden: "" });
      var buttons = data.buckets.map(function (b) {
        var button = h("button", { type: "button", class: "chip-btn", text: b.short || b.id });
        button.addEventListener("click", function () { choose(b.id, button); });
        return button;
      });
      function choose(id, button) {
        tries += 1;
        var right = id === item.answer;
        button.setAttribute("data-state", right ? "right" : "wrong");
        button.disabled = true;
        var why = right ? item.why : ((item.miss && item.miss[id]) || "Think about which layer can still act if the AI is wrong.");
        showFeedback(feedback, right, " " + why + (right ? "" : " Try again."));
        if (right) {
          buttons.forEach(function (b) { b.disabled = true; });
          score.record(tries);
        }
      }
      root.appendChild(h("div", { class: "sort-item" }, [
        h("p", { class: "sort-text", html: item.text }),
        h("div", { class: "sort-choices", role: "group" }, buttons),
        feedback
      ]));
    });
    addRestart(root, function () { clearGenerated(root); initSorter(root); });
  }

  var GRADES = [
    ["Had it", "Good. Try this prompt again in a few days, without looking."],
    ["Partly", "Re-read the part you missed, then try again tomorrow."],
    ["Missed it", "Re-read the section above, then try again later today."]
  ];

  function initRecall(root, index) {
    var answer = root.querySelector(".recall-answer");
    if (!answer) return;
    answer.hidden = true;
    addHeader(root, h("span", { class: "score", text: "Write first, then check" }));

    var id = root.id ? root.id + "-text" : "recall-" + index + "-text";
    var box = h("textarea", { id: id, rows: "5", placeholder: "Write your answer from memory first. Then compare." });
    var reveal = h("button", { type: "button", class: "btn", text: "Show model answer" });
    var tip = h("p", { class: "grade-tip", "aria-live": "polite" });
    var grade = h("div", { class: "grade", hidden: "" }, [h("span", { class: "grade-label", text: "How close were you?" })]
      .concat(GRADES.map(function (g) {
        var button = h("button", { type: "button", class: "chip-btn", text: g[0] });
        button.addEventListener("click", function () {
          grade.querySelectorAll(".chip-btn").forEach(function (b) { b.removeAttribute("data-state"); });
          button.setAttribute("data-state", "right");
          tip.textContent = g[1];
        });
        return button;
      }))
      .concat([tip]));

    reveal.addEventListener("click", function () {
      answer.hidden = false;
      grade.hidden = false;
      reveal.hidden = true;
    });

    root.insertBefore(h("label", { for: id, class: "visually-hidden", text: "Your answer" }), answer);
    root.insertBefore(box, answer);
    root.insertBefore(reveal, answer);
    root.appendChild(grade);
  }

  function boot() {
    document.querySelectorAll('[data-widget="quiz"]').forEach(initQuiz);
    document.querySelectorAll('[data-widget="sorter"]').forEach(initSorter);
    document.querySelectorAll('[data-widget="recall"]').forEach(initRecall);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
