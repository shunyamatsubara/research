# Claude Code Routines — key sourced facts (condensed from research agent D, 2026-10-15)

Status: research preview — "Behavior, limits, and the API surface may change." https://code.claude.com/docs/en/routines

## What it is
- "A routine is a saved Claude Code configuration: a prompt, one or more repositories, and a set of connectors, packaged once and run automatically." https://code.claude.com/docs/en/routines
- "Routines run autonomously as full Claude Code cloud sessions" https://code.claude.com/docs/en/routines#create-a-routine

## Triggers
- Scheduled / API (HTTP POST /fire with bearer token) / GitHub (PR, release events). https://code.claude.com/docs/en/routines#configure-triggers
- "The minimum interval is one hour; expressions that run more frequently are rejected." https://code.claude.com/docs/en/routines#add-a-schedule-trigger
- "If you schedule a run exactly on the hour, such as 9:00, it can start several minutes late." (same page)
- API fire: "each routine accepts up to 30 fires per hour" https://platform.claude.com/docs/en/api/claude-code/routines-fire#rate-limits
- "The request returns once the session is created. It does not stream session output or wait for the session to complete." (same API page)
- "Each successful request creates a new session. There is no idempotency key." (same API page, #idempotency)
- GitHub: "Events beyond the limit are dropped until the window resets." https://code.claude.com/docs/en/routines#add-a-github-trigger

## State
- "Each run creates a new session alongside your other sessions" https://code.claude.com/docs/en/routines#create-from-the-web
- "Each repository you add is cloned on every run." https://code.claude.com/docs/en/routines#repositories-and-branch-permissions
- "Claude Code doesn't reuse sessions across events" https://code.claude.com/docs/en/routines#add-a-github-trigger
- "Auto memory is machine-local." https://code.claude.com/docs/en/memory
- Persistence in practice = git pushes to claude/ branches, environment config, setup-script cache.

## Limits
- Scheduled runs: 100 per hour per account; Run now + API fires + one-off reruns: 30 per hour per routine; API fires: 100 per hour per account. "None of these hourly limits has overage." https://code.claude.com/docs/en/routines#usage-and-limits
- "Routines draw down subscription usage the same way interactive sessions do." (same)
- Max run duration / concurrency: not stated in docs.

## Output / delivery
- Output = session transcript, claude/ branches & PRs, connector writes (e.g. Slack summary example). https://code.claude.com/docs/en/routines#example-use-cases
- Run status "does not mean the task in your prompt succeeded." https://code.claude.com/docs/en/routines#view-and-interact-with-runs
- Push/email notifications for routine runs: not stated in docs.

## Web tools
- Claude Code WebSearch "returns result titles and URLs." / "It doesn't fetch the result pages." / "The search backend is not configurable." https://code.claude.com/docs/en/tools-reference#websearch-tool-behavior
- WebFetch "reads up to 100,000 characters of a page's content per call" / "caches each response for 15 minutes by default" / "This makes WebFetch lossy by design." https://code.claude.com/docs/en/tools-reference#webfetch-tool-behavior
- Claude API web search tool: "direct access to real-time web content"; "$10 per 1,000 searches"; freshness/index latency not stated. https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool

## Readings for the comparison (analysis)
- Sub-hour starts only via API fire (≤30/hour/routine) or GitHub events; each start is a whole new agent session with a fresh clone.
- No documented push alerting; delivery depends on connectors the prompt uses.
