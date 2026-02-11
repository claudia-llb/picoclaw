---
summary: "Messaging platforms PicoClaw can connect to"
read_when:
  - You want to choose a chat channel for PicoClaw
  - You need a quick overview of supported messaging platforms
title: "Chat Channels"
---

# Chat Channels

PicoClaw connects to Telegram out of the box. Additional channels can be added via plugins.

## Supported channels

- [Telegram](/channels/telegram) — Bot API via grammY; supports groups, inline buttons, reactions.

## Plugins

Additional channels are available as plugins:

- [WebChat](/web/webchat) — Gateway WebChat UI over WebSocket.

## Notes

- Fastest setup is **Telegram** (simple bot token).
- Group behavior: see [Groups](/channels/groups).
- DM pairing and allowlists are enforced for safety; see [Security](/gateway/security).
- Telegram internals: [grammY notes](/channels/grammy).
- Troubleshooting: [Channel troubleshooting](/channels/troubleshooting).
- Model providers are documented separately; see [Model Providers](/providers/models).
