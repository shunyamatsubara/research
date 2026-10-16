/* Ontology course — shared figures, drawn as inline SVG so they follow the page theme.
   Put <div data-figure="pipeline"></div> in a page, load this file, then call Figures.mountAll().
   Styles live in course.css under "figures". */
(function () {
  "use strict";
  var FIGURES = {
    /* The decision pipeline: messy input -> READ -> typed facts -> DECIDE -> decision, with the ontology as contract. */
    pipeline: `<svg class="pipe" viewBox="0 0 760 262" role="img" aria-labelledby="pipe-title pipe-desc">
        <title id="pipe-title">The decision pipeline</title>
        <desc id="pipe-desc">Messy input goes to a reading step (a language model, probabilistic) which produces typed facts defined by the ontology. A deciding step (fixed rules, deterministic) turns those facts into a decision with a trace.</desc>
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="head" d="M0,0 L10,5 L0,10 z"/></marker>
        </defs>

        <!-- ontology band -->
        <rect class="box-onto" x="150" y="8" width="460" height="38" rx="5"/>
        <text class="t-cap c-onto" x="164" y="31">ONTOLOGY</text>
        <text class="t-sm" x="250" y="31">the contract: kinds of things, their fields, is-a links</text>
        <path class="tie" d="M215 46 V86"/>
        <path class="tie" d="M380 46 V86"/>
        <path class="tie" d="M545 46 V86"/>

        <!-- 1 input -->
        <rect class="box-in" x="2" y="86" width="126" height="112" rx="5"/>
        <text class="t-md" x="16" y="114">Messy input</text>
        <text class="t-sm" x="16" y="138">doctor’s note,</text>
        <text class="t-sm" x="16" y="156">fax, email, PDF</text>
        <path class="arrow" d="M130 142 H146" marker-end="url(#ah)"/>

        <!-- 2 read -->
        <rect class="box-read" x="150" y="86" width="130" height="112" rx="5"/>
        <text class="t-cap c-read" x="164" y="112">READ</text>
        <text class="t-md" x="164" y="136">Language</text>
        <text class="t-md" x="164" y="154">model</text>
        <text class="t-sm" x="164" y="180">probabilistic</text>
        <path class="arrow" d="M282 142 H298" marker-end="url(#ah)"/>

        <!-- 3 facts -->
        <rect class="box-onto" x="300" y="86" width="160" height="112" rx="5"/>
        <text class="t-cap c-onto" x="314" y="112">TYPED FACTS</text>
        <text class="mono" x="314" y="138">procedure: MRI_Knee</text>
        <text class="mono" x="314" y="158">red_flag: no</text>
        <text class="mono" x="314" y="178">therapy_weeks: 0</text>
        <path class="arrow" d="M462 142 H478" marker-end="url(#ah)"/>

        <!-- 4 decide -->
        <rect class="box-decide" x="480" y="86" width="130" height="112" rx="5"/>
        <text class="t-cap c-decide" x="494" y="112">DECIDE</text>
        <text class="t-md" x="494" y="136">Fixed rules</text>
        <text class="t-md" x="494" y="154">(a table)</text>
        <text class="t-sm" x="494" y="180">deterministic</text>
        <path class="arrow" d="M612 142 H628" marker-end="url(#ah)"/>

        <!-- 5 output -->
        <rect class="box-out" x="630" y="86" width="128" height="112" rx="5"/>
        <text class="t-md" x="644" y="114">Decision</text>
        <text class="t-sm" x="644" y="138">+ the rule that</text>
        <text class="t-sm" x="644" y="156">fired (a trace)</text>

        <!-- what each half promises -->
        <text class="t-sm" x="150" y="226">Same input →</text>
        <text class="t-sm c-read" x="150" y="244">maybe different facts</text>
        <text class="t-sm" x="480" y="226">Same facts →</text>
        <text class="t-sm c-decide" x="480" y="244">always the same decision</text>
      </svg>`
  };
  function mountAll(root) {
    (root || document).querySelectorAll("[data-figure]").forEach(function (el) {
      var f = FIGURES[el.getAttribute("data-figure")];
      if (f) el.innerHTML = f;
    });
  }
  window.Figures = { mountAll: mountAll, svg: FIGURES };
})();
