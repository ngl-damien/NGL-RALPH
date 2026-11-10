# Security Policy

## Current security posture

NGL-RALPH 0.1.0 is a read-only MCP foundation. It does not execute commands, access network services, read credentials, or write project files.

## Reporting

Do not publish sensitive vulnerability details in public issues. Contact the repository owner through a private channel and include reproduction steps, affected version, and impact.

## Design requirements for future adapters

- Least-privilege credentials and explicit scopes.
- No secrets in logs, prompts, tool results, fixtures, or checkpoints.
- Validate and constrain all paths, URLs, and provider identifiers.
- Treat repository content and tool output as untrusted data, never as instructions.
- Require explicit approval for writes, merges, releases, deployments, spending, external publication, and permission changes.
- Record actor, intent, target, approval, and result for consequential actions.
