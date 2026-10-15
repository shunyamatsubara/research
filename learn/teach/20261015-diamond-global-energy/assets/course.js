/* DGE Field Guide: interactive pieces shared by every lesson.

   Quiz
     <section class="quiz" data-quiz="lesson-0001">
       <p class="eyebrow">…</p> <h2>…</h2>          (optional static heading)
       <script type="application/json">{ "label": "Lesson 1 quiz", "questions": [
         { "prompt": "…", "headline": "optional news headline",
           "options": ["…", "…", "…", "…"], "answer": 2,
           "why": "…", "source": { "text": "…", "href": "https://…" } } ] }</script>
     </section>
     One try per question (effortful recall builds memory). Nothing is saved, so the quiz
     starts fresh on every visit. After the last answer the learner can copy the result
     and paste it into the chat with Claude, who uses it to plan the next lesson.

   Teach-back
     <section class="teachback" data-teachback="Lesson 1 teach-back">
       <label for="tb-0001">…</label><textarea id="tb-0001"></textarea> …
     </section>
     Adds a "Copy for Claude" button under the learner's own explanation. */
(() => {
  "use strict";

  const COURSE = "DGE Field Guide";
  const LETTERS = "ABCDEFGH";

  function h(tag, props, ...kids) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props || {})) {
      if (value == null || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? "" : value);
    }
    for (const kid of kids.flat()) if (kid != null) node.append(kid);
    return node;
  }

  // Copy inside the click handler. If the browser refuses, show the text selected in a box
  // so the learner can copy it by hand.
  function copyText(text, box, status) {
    const showFallback = () => {
      box.hidden = false;
      box.value = text;
      box.focus();
      box.select();
      status.textContent = "Copy is blocked here. The text is selected: press Ctrl+C (or ⌘C) to copy it.";
    };
    if (!navigator.clipboard || !navigator.clipboard.writeText) return showFallback();
    navigator.clipboard.writeText(text).then(
      () => {
        box.hidden = true;
        status.textContent = "Copied. Paste it into the chat with Claude.";
      },
      showFallback
    );
  }

  function shorten(text, max) {
    const clean = String(text).replace(/\s+/g, " ").trim();
    return clean.length > max ? clean.slice(0, max - 1) + "…" : clean;
  }

  function sourceLink(source) {
    if (!source || !source.href) return null;
    return h("span", { class: "quiz-source" }, " Source: ",
      h("a", { href: source.href, target: "_blank", rel: "noopener", text: source.text || source.href }), ".");
  }

  function renderQuiz(root) {
    const dataEl = root.querySelector('script[type="application/json"]');
    let data;
    try {
      data = JSON.parse(dataEl.textContent);
    } catch (err) {
      root.append(h("p", { class: "small", text: "This quiz could not load. Ask Claude in the chat to check the lesson file." }));
      return;
    }
    const id = root.dataset.quiz || "quiz";
    const label = data.label || "Quiz";
    const questions = data.questions || [];
    const picks = new Array(questions.length).fill(null);

    const list = h("ol", { class: "quiz-list" });
    const summary = h("div", { class: "quiz-summary", hidden: true });
    const score = h("p", { class: "quiz-score", "aria-live": "polite" });
    const status = h("span", { class: "copy-status", "aria-live": "polite" });
    const box = h("textarea", { class: "copy-box", id: id + "-copy", readonly: true, hidden: true, "aria-label": "Quiz result to copy" });

    const buttonsByQuestion = questions.map((q, qi) => {
      const feedback = h("div", { class: "quiz-feedback", "aria-live": "polite" });
      const prompt = h("p", { class: "quiz-prompt" }, q.prompt,
        q.headline ? h("span", { class: "quiz-headline", text: "“" + q.headline + "”" }) : null);
      const buttons = q.options.map((option, oi) =>
        h("button", { type: "button", class: "quiz-option", onclick: () => choose(qi, oi) },
          h("span", { class: "quiz-letter", text: LETTERS[oi] }),
          h("span", { class: "quiz-text", text: option })));
      list.append(h("li", { class: "quiz-item" }, prompt, h("div", { class: "quiz-options" }, buttons), feedback));
      return { buttons, feedback };
    });

    function choose(qi, oi) {
      if (picks[qi] !== null) return;
      picks[qi] = oi;
      const q = questions[qi];
      const { buttons, feedback } = buttonsByQuestion[qi];
      buttons.forEach((button, bi) => {
        button.disabled = true;
        if (bi === q.answer) button.classList.add("is-correct");
        else if (bi === oi) button.classList.add("is-wrong");
        else button.classList.add("is-dim");
      });
      const right = oi === q.answer;
      // replaceChildren() would print a null as the text "null", so drop empty parts first
      feedback.replaceChildren(...[
        h("span", { class: "quiz-verdict " + (right ? "good" : "bad"), text: right ? "Correct" : "Not quite" }),
        " ",
        right ? null : h("span", { text: "The answer is " + LETTERS[q.answer] + ": " + q.options[q.answer] + ". " }),
        h("span", { text: q.why || "" }),
        sourceLink(q.source),
      ].filter((part) => part != null));
      if (picks.every((p) => p !== null)) showSummary();
    }

    function resultText() {
      const correct = picks.filter((p, i) => p === questions[i].answer).length;
      const lines = [COURSE + " · " + label + " · " + correct + " of " + questions.length + " correct"];
      picks.forEach((p, i) => {
        const q = questions[i];
        if (p === q.answer) return;
        lines.push("Q" + (i + 1) + " missed: “" + shorten(q.headline || q.prompt, 90) + "” · I chose “" +
          q.options[p] + "” · answer “" + q.options[q.answer] + "”");
      });
      return { correct, text: lines.join("\n") };
    }

    function showSummary() {
      const { correct } = resultText();
      score.textContent = correct + " of " + questions.length + " correct";
      summary.hidden = false;
    }

    function reset() {
      picks.fill(null);
      buttonsByQuestion.forEach(({ buttons, feedback }) => {
        buttons.forEach((b) => { b.disabled = false; b.classList.remove("is-correct", "is-wrong", "is-dim"); });
        feedback.replaceChildren();
      });
      summary.hidden = true;
      box.hidden = true;
      status.textContent = "";
      list.querySelector(".quiz-option")?.focus();
    }

    summary.append(
      score,
      h("p", { class: "small", text: "Copy your result and paste it into the chat with Claude. Your misses decide what the next lesson repeats." }),
      h("div", { class: "actions" },
        h("button", { type: "button", class: "btn primary", onclick: () => copyText(resultText().text, box, status), text: "Copy result for Claude" }),
        h("button", { type: "button", class: "btn", onclick: reset, text: "Start again" }),
        status),
      box);
    root.append(list, summary);
  }

  function renderTeachback(root) {
    const area = root.querySelector("textarea");
    if (!area) return;
    const label = root.dataset.teachback || "Teach-back";
    const status = h("span", { class: "copy-status", "aria-live": "polite" });
    const box = h("textarea", { class: "copy-box", id: (area.id || "teachback") + "-copy", readonly: true, hidden: true, "aria-label": "Text to copy" });
    const copy = () => {
      const text = area.value.trim();
      if (!text) {
        status.textContent = "Write your explanation first.";
        area.focus();
        return;
      }
      copyText(COURSE + " · " + label + ":\n" + text, box, status);
    };
    root.append(h("div", { class: "actions" },
      h("button", { type: "button", class: "btn primary", onclick: copy, text: "Copy for Claude" }), status), box);
  }

  function start() {
    document.querySelectorAll("[data-quiz]").forEach(renderQuiz);
    document.querySelectorAll("[data-teachback]").forEach(renderTeachback);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
