# No_Gas_Labs — The Commons

A first playable, browser-based walk-up world prototype for No_Gas_Labs.

## Run it

Because the world uses Three.js as an ES module, serve this folder over HTTP rather than opening `index.html` as a local file.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

No build step, package installation, API key, or paid service is required. Three.js loads from jsDelivr, so an internet connection is required.

## Controls

- Desktop: WASD or arrow keys to move; click the world and move the mouse to look; press E near a character to talk; Escape or Leave closes the conversation.
- Mobile: use the on-screen joystick to move and TALK when close to a character.
- Walk within roughly 2.5 world units of a character to see the interaction prompt.

## Implemented

- Rendered 3D Commons environment.
- Controllable third-person player.
- Four approachable character representations.
- Proximity detection and conversation UI.
- Optional live-agent HTTP adapter.

## Not connected yet

The four characters are prototype identities, not verified live NGL workers. Without an endpoint configured, replies are explicitly demo responses. The prototype does not read repositories, agent schedules, private records, or credentials.

## Connecting a real agent

Before the module loads, configure:

```html
<script>window.NGL_AGENT_ENDPOINT = "https://your-authorized-agent-gateway.example/chat";</script>
```

The page sends a POST request with JSON:

```json
{"agent_id":"ralph","message":"What are you working on?","conversation_id":"ralph"}
```

The endpoint should return JSON containing `reply` (or `message`). It must enforce authentication, authorization, rate limits, and per-agent access boundaries. Do not put API keys or long-lived secrets in browser code. Use a server-side gateway and short-lived user authorization for deployment. Configure CORS for the hosted origin.

Next integration step: replace the placeholder character registry with a verified roster of actual agents and route each identity through a permissioned gateway. Do not represent a worker as online or live until its identity and connection have been verified.

## Status

This is an isolated feature branch. It has not been merged into production No_Gas_Labs repositories and is not yet deployed as a public hosted experience.
