/* Weakest Link — AI rally prompt builder.
   Turns the learner's own draft into a ready-to-paste prompt for any AI chat.
   Markup:
     <form class="rally" id="rally-l1" data-rally>
       <label for="x">…</label> <input id="x" data-field="topic" placeholder="Example: …">
       <label for="y">…</label> <textarea id="y" data-field="draft" placeholder="Example: …"></textarea>
       <script type="text/plain" data-rally-template>…{{topic}}…{{draft}}…</script>
       <div class="rally-out-head"><span class="field-label">Your prompt</span><span class="tag" data-rally-example>Example</span></div>
       <textarea class="rally-out" data-rally-out readonly></textarea>
       <div class="rally-actions"><button type="button" class="btn" data-rally-copy>Copy prompt</button>
         <p class="rally-status" data-rally-status role="status"></p></div>
     </form>
   Empty fields fall back to their placeholder text, and the Example tag shows until
   every field holds the learner's own words. Drafts are kept in this browser only. */
(function () {
  "use strict";

  function save(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* storage blocked: ignore */ }
  }
  function load(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function stripExample(text) {
    return (text || "").replace(/^\s*example:\s*/i, "");
  }

  function mount(form) {
    var tplNode = form.querySelector("[data-rally-template]");
    var out = form.querySelector("[data-rally-out]");
    if (!tplNode || !out) return;
    var template = tplNode.textContent.replace(/^\s*\n/, "").replace(/\s+$/, "") + "\n";
    var fields = Array.prototype.slice.call(form.querySelectorAll("[data-field]"));
    var copyBtn = form.querySelector("[data-rally-copy]");
    var status = form.querySelector("[data-rally-status]");
    var exampleTag = form.querySelector("[data-rally-example]");
    var keyBase = "weakest-link:" + (form.id || "rally") + ":";

    fields.forEach(function (f) {
      var saved = load(keyBase + f.getAttribute("data-field"));
      if (saved) f.value = saved;
      f.addEventListener("input", function () {
        save(keyBase + f.getAttribute("data-field"), f.value);
        render();
      });
    });

    function render() {
      var usingExample = false;
      var values = {};
      fields.forEach(function (f) {
        var own = f.value.trim();
        if (!own) usingExample = true;
        values[f.getAttribute("data-field")] = own || stripExample(f.getAttribute("placeholder"));
      });
      out.value = template.replace(/\{\{(\w+)\}\}/g, function (m, k) {
        return values[k] != null ? values[k] : m;
      });
      if (exampleTag) exampleTag.hidden = !usingExample;
      form.setAttribute("data-example", usingExample ? "yes" : "no");
      if (status) status.textContent = "";
    }

    form.addEventListener("submit", function (e) { e.preventDefault(); });

    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var example = form.getAttribute("data-example") === "yes";
        var okText = example
          ? "Copied the example. For a real rally, write your own topic and conclusion first."
          : "Copied. Paste it into your AI chat and answer its first question.";
        function fallback() {
          out.focus();
          out.select();
          if (status) status.textContent = "Copy was blocked here. The prompt is selected: press Ctrl+C (or ⌘C).";
        }
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(out.value).then(function () {
              if (status) status.textContent = okText;
            }, fallback);
          } else {
            fallback();
          }
        } catch (e) {
          fallback();
        }
      });
    }

    render();
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-rally]"), mount);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
