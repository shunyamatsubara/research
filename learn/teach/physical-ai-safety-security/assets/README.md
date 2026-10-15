# Course components

Every lesson and reference page links these files. Reuse them; add new components here.

## `course.css`

Shared stylesheet. Colors follow ISO 7010 safety-sign meanings and are used for nothing else:
yellow `--hazard` = hazard, red `--stop` = stop or wrong, green `--safe` = safe state or right,
blue `--act` = required action and links.

Page skeleton (lessons and reference pages are full HTML documents):

```html
<div class="tape" aria-hidden="true"></div>
<div class="wrap"><div class="page">
  <nav class="topnav">…links…</nav>
  <header class="masthead">
    <p class="eyebrow"><span class="tag tag-hazard">Lesson 1</span> About 15 minutes</p>
    <h1>…</h1>
    <p class="lede">…</p>
    <div class="goal"><span class="tag tag-act">Goal</span><p>…</p></div>
  </header>
  <main class="prose">…</main>
  <footer class="foot">…</footer>
</div></div>
```

Useful classes inside `.prose`:

| Class | Use |
|---|---|
| `span.note` | Margin note. Put it at the end of a paragraph. Sits in the right margin on wide screens. |
| `.keyrule` | The one rule the lesson is about. Add `.big` to the main sentence. |
| `.bridge` | "You already know this": connects security knowledge to the new idea. |
| `.wide` | Lets a figure or table use the full page width. |
| `figure > .figure-box` | Frame for an inline SVG diagram. SVG text uses `currentColor` / tokens. |
| `.table-scroll > table` | Table that scrolls sideways on phones. |
| `.std` | A standard's ID, such as ISO 10218-1:2025. |
| `.tag .tag-hazard/.tag-stop/.tag-safe/.tag-act/.tag-plain` | Small labels. |
| `.source` | "Primary source" box at the end of a lesson. |
| `.ask` | Reminder to ask the teacher follow-up questions. |
| `.pager` | Previous / next links. |
| `dl.terms > div.term > dt + dd` | Glossary entries; `span.avoid` lists words to avoid. |

## `widgets.js`

Load with `<script src="../assets/widgets.js" defer></script>`.

### Quiz

```html
<div class="widget" data-widget="quiz" data-title="Check yourself">
  <script type="application/json">
  {"questions": [
    {"prompt": "…",
     "options": ["…", "…", "…", "…"],
     "answer": 2,
     "why": ["why A is wrong", "why B is wrong", "why C is right", "why D is wrong"]}
  ]}
  </script>
</div>
```

Rules for writing options: every option has the same number of words (and about the same
number of characters); move the correct answer to a different position in each question.

### Sorter

```html
<div class="widget" data-widget="sorter" data-title="Which layer stops it?">
  <script type="application/json">
  {"buckets": [{"id": "L1", "short": "L1", "label": "Task guardrails"}],
   "items": [{"text": "…", "answer": "L1", "why": "shown when right",
              "miss": {"L2": "shown when the learner picks L2"}}]}
  </script>
</div>
```

### Recall

```html
<div class="widget recall" id="recall-1" data-widget="recall" data-title="From memory">
  <p class="recall-prompt">…</p>
  <div class="recall-answer"><p>model answer</p></div>
</div>
```
