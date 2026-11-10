# NGL-RALPH

**NGL-RALPH** is a provider-independent project intelligence, execution, verification, prioritization, and continuity server built around the Ralph operating protocol.

It is a standalone product. No_Gas_Labs repositories are integrations and proving grounds, not runtime dependencies. The first implementation is deliberately read-only.

## Current status

Version 0.1.0 foundation:
- MCP server over stdio using the official TypeScript SDK v2 server package.
- `ralph.server_info` — reports capabilities and the current safety boundary.
- `ralph.assess_evidence` — distinguishes sourced direct/corroborated evidence from inference and assertion.
- `ralph.prioritize` — deterministic decision-support ranking from explicit inputs.
- Unit tests for evidence handling and prioritization.

Not implemented yet: repository adapters, workspace inspection, durable checkpoints, execution/dispatch, multi-agent coordination, HTTP transport, and hosted CI. Tool presence is not proof of those capabilities.

## Requirements

- Node.js 24 or newer
- npm

## Run

```sh
npm install
npm test
npm start
```

The server communicates over MCP stdio. Configure it in an MCP host using the absolute path to this repository's `src/server.js` and the `node` executable.

## Operating principles

1. Rehydrate relevant project context before acting.
2. Inspect primary evidence; distinguish facts, assumptions, and unknowns.
3. Define measurable success and preserve a baseline.
4. Rank work by impact, urgency, risk reduction, and effort.
5. Challenge assumptions and act in bounded increments.
6. Independently verify outcomes; report what was and was not tested.
7. Preserve durable records and handoff state.
8. Repeat while useful work remains.

## Authority boundary

The initial server is read-only and performs local deterministic calculations only. It does not execute shell commands, modify repositories, merge pull requests, release, deploy, spend money, publish externally, or alter credentials/permissions. Future write-capable adapters must use explicit per-action authorization and auditable approvals.

## Architecture direction

- **Core:** provider-neutral project/evidence/priority/checkpoint models.
- **MCP surface:** tools, resources, and reusable prompts.
- **Adapters:** GitHub first; additional providers remain optional.
- **Policy:** evidence provenance, scoped permissions, approval gates, audit records.
- **Continuity:** portable checkpoints and reproducible handoffs.

## License

No license has been selected yet. All rights reserved by default until the project owner chooses and adds an explicit license. Do not assume this repository is open source merely because it is hosted on GitHub.
