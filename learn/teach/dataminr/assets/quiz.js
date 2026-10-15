/* Dataminr コース 共通部品：クイズと「思い出す練習」
 *
 * クイズ:
 *   <div class="quiz" data-answer="b">
 *     <p class="quiz-q">問い</p>
 *     <div class="quiz-choices">
 *       <button type="button" class="choice" data-choice="a"><span class="key">A</span><span>選択肢</span></button>
 *       ...
 *     </div>
 *     <p class="quiz-verdict" hidden></p>
 *     <div class="quiz-explain" hidden>解説</div>
 *   </div>
 *   <span class="quiz-score"></span>  <button class="btn quiz-reset">もう一度解く</button>
 *
 * 思い出す練習:
 *   <div class="recall" data-key="0001-walls" data-label="0001 思い出す練習">
 *     <label for="recall-0001">問い</label>
 *     <textarea id="recall-0001"></textarea>
 *     <div class="row">
 *       <button class="btn recall-reveal">答えを見る</button>
 *       <button class="btn recall-copy">コピー</button>
 *       <span class="status" aria-live="polite"></span>
 *     </div>
 *     <div class="recall-answer" hidden>模範解答</div>
 *   </div>
 */
(function () {
  "use strict";

  var STORE = "dataminr-course:";

  function store(key, value) {
    try {
      if (value === undefined) return window.localStorage.getItem(STORE + key);
      window.localStorage.setItem(STORE + key, value);
    } catch (e) {
      return null;
    }
    return null;
  }

  /* ---------- quiz ---------- */
  var quizzes = Array.prototype.slice.call(document.querySelectorAll(".quiz"));
  var scoreEls = Array.prototype.slice.call(document.querySelectorAll(".quiz-score"));

  function keyOf(button) {
    var k = button.querySelector(".key");
    return k ? k.textContent.trim() : button.getAttribute("data-choice").toUpperCase();
  }

  function updateScore() {
    var done = 0, right = 0;
    quizzes.forEach(function (q) {
      if (q.classList.contains("is-done")) {
        done++;
        if (q.getAttribute("data-result") === "ok") right++;
      }
    });
    scoreEls.forEach(function (el) {
      el.textContent = quizzes.length + " 問中 " + done + " 問に回答・正解 " + right + " 問";
    });
  }

  function answer(q, button) {
    if (q.classList.contains("is-done")) return;
    var correct = q.getAttribute("data-answer");
    var buttons = Array.prototype.slice.call(q.querySelectorAll(".choice"));
    var ok = button.getAttribute("data-choice") === correct;
    var right = null;

    q.classList.add("is-done");
    q.setAttribute("data-result", ok ? "ok" : "bad");
    buttons.forEach(function (b) {
      b.setAttribute("aria-disabled", "true");
      if (b.getAttribute("data-choice") === correct) {
        b.classList.add("is-answer");
        right = b;
      }
    });
    if (!ok) button.classList.add("is-wrong");

    var verdict = q.querySelector(".quiz-verdict");
    if (verdict) {
      verdict.textContent = ok ? "正解" : "不正解。正しい答えは " + (right ? keyOf(right) : "?");
      verdict.classList.remove("ok", "bad");
      verdict.classList.add(ok ? "ok" : "bad");
      verdict.hidden = false;
    }
    var explain = q.querySelector(".quiz-explain");
    if (explain) explain.hidden = false;
    updateScore();
  }

  function reset() {
    quizzes.forEach(function (q) {
      q.classList.remove("is-done");
      q.removeAttribute("data-result");
      Array.prototype.forEach.call(q.querySelectorAll(".choice"), function (b) {
        b.classList.remove("is-answer", "is-wrong");
        b.removeAttribute("aria-disabled");
      });
      var verdict = q.querySelector(".quiz-verdict");
      if (verdict) verdict.hidden = true;
      var explain = q.querySelector(".quiz-explain");
      if (explain) explain.hidden = true;
    });
    updateScore();
    if (quizzes[0]) {
      var first = quizzes[0].querySelector(".choice");
      if (first) first.focus();
    }
  }

  quizzes.forEach(function (q) {
    Array.prototype.forEach.call(q.querySelectorAll(".choice"), function (b) {
      b.addEventListener("click", function () { answer(q, b); });
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll(".quiz-reset"), function (b) {
    b.addEventListener("click", reset);
  });
  updateScore();

  /* ---------- recall ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".recall"), function (box) {
    var key = "recall:" + (box.getAttribute("data-key") || "default");
    var label = box.getAttribute("data-label") || "思い出す練習";
    var text = box.querySelector("textarea");
    var reveal = box.querySelector(".recall-reveal");
    var copy = box.querySelector(".recall-copy");
    var status = box.querySelector(".status");
    var answerBox = box.querySelector(".recall-answer");

    if (text) {
      var saved = store(key);
      if (saved) text.value = saved;
      text.addEventListener("input", function () { store(key, text.value); });
    }

    if (reveal && answerBox) {
      reveal.addEventListener("click", function () {
        if (text && !text.value.trim() && status) {
          status.textContent = "先に自分の答えを書いてから開くと、記憶に残りやすくなります。";
        }
        answerBox.hidden = !answerBox.hidden;
        reveal.textContent = answerBox.hidden ? "答えを見る" : "答えを閉じる";
      });
    }

    if (copy && text) {
      copy.addEventListener("click", function () {
        var body = "【" + label + "】\n" + text.value.trim();
        function done(msg) { if (status) status.textContent = msg; }
        function fallback() {
          text.focus();
          text.select();
          done("自動コピーができませんでした。選択された文字をコピーしてください。");
        }
        if (!text.value.trim()) { done("まだ何も書かれていません。"); return; }
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(body).then(function () {
              done("コピーしました。チャットに貼りつけて送ってください。");
            }, fallback);
          } else {
            fallback();
          }
        } catch (e) {
          fallback();
        }
      });
    }
  });
})();
