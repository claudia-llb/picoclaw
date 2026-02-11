# 🎯 PicoClaw - Plan de Refactoring Détaillé

**Version :** 1.0  
**Date :** 2026-02-11  
**Objectif :** Version minimaliste avec Telegram uniquement

---

## 📋 RÉSUMÉ - Fichiers à MODIFIER (pas juste supprimer)

| # | Fichier | Type de modif | Complexité |
|---|---------|---------------|------------|
| 1 | `src/plugins/runtime/index.ts` | Supprimer ~80 lignes imports + refs | 🔴 Haute |
| 2 | `src/channels/dock.ts` | Supprimer imports + DOCKS entries | 🔴 Haute |
| 3 | `src/channels/registry.ts` | Réduire CHAT_CHANNEL_ORDER | 🟡 Moyenne |
| 4 | `src/infra/outbound/deliver.ts` | Supprimer types + imports | 🟡 Moyenne |
| 5 | `src/infra/outbound/outbound-session.ts` | Supprimer imports channels | 🟡 Moyenne |
| 6 | `src/config/types.channels.ts` | Supprimer imports types | 🟢 Simple |
| 7 | `src/config/types.ts` | Supprimer exports | 🟢 Simple |
| 8 | `src/gateway/server-http.ts` | Supprimer Slack handler (2 lignes) | 🟢 Simple |
| 9 | `src/cli/deps.ts` | Supprimer import Slack | 🟢 Simple |
| 10 | `src/plugin-sdk/index.ts` | Supprimer exports Slack | 🟢 Simple |
| 11 | `src/auto-reply/reply/commands-allowlist.ts` | Supprimer imports channels | 🟡 Moyenne |
| 12 | `src/auto-reply/reply/normalize-reply.ts` | Supprimer Line refs | 🟢 Simple |
| 13 | `src/channels/plugins/group-mentions.ts` | Supprimer fonctions channels | 🟡 Moyenne |
| 14 | `src/agents/openclaw-tools.ts` | Supprimer TTS tool | 🟢 Simple |
| 15 | `src/plugins/runtime/types.ts` | Supprimer type TTS | 🟢 Simple |
| 16 | `src/config/types.messages.ts` | Supprimer import TTS | 🟢 Simple |
| 17 | Autres fichiers TTS (5 fichiers) | Supprimer imports TTS | 🟢 Simple |

**Total : ~20 fichiers à modifier manuellement**

---

## 📊 Vue d'ensemble

### Objectif final
- **1 seul channel** : Telegram
- **Core tools** : read/write/bash/edit, web_search (Brave), browser (Playwright)
- **Memory** : SOUL/IDENTITY/MEMORY.md
- **Libs pi-*** : pi-agent-core, pi-ai, pi-coding-agent

### Métriques cibles
| Métrique | Avant | Après | Réduction |
|----------|-------|-------|-----------|
| Channels | 17 | 1 | -94% |
| Extensions | 37 | 2 | -95% |
| Code LOC | ~477K | ~200K | -58% |

---

## 🔴 PHASE 1 : Modifications Code CRITIQUES

> ⚠️ Ces fichiers ont des imports multi-channels. Ils doivent être modifiés AVANT de supprimer les dossiers channels.

### 1.1 `src/plugins/runtime/index.ts` (HUB CENTRAL)

**Localisation :** Lignes 1-150 (imports)

**SUPPRIMER ces imports :**
```typescript
// Ligne 5-6 : Actions channels
import { handleSlackAction } from "../../agents/tools/slack-actions.js";
import { handleWhatsAppAction } from "../../agents/tools/whatsapp-actions.js";

// Ligne 42-45 : Message actions
import { discordMessageActions } from "../../channels/plugins/actions/discord.js";
import { signalMessageActions } from "../../channels/plugins/actions/signal.js";
import { createWhatsAppLoginTool } from "../../channels/plugins/agent-tools/whatsapp-login.js";

// Ligne 55-62 : Discord
import { auditDiscordChannelPermissions } from "../../discord/audit.js";
import { listDiscordDirectoryGroupsLive, listDiscordDirectoryPeersLive } from "../../discord/directory-live.js";
import { monitorDiscordProvider } from "../../discord/monitor.js";
import { probeDiscord } from "../../discord/probe.js";
import { resolveDiscordChannelAllowlist } from "../../discord/resolve-channels.js";
import { resolveDiscordUserAllowlist } from "../../discord/resolve-users.js";
import { sendMessageDiscord, sendPollDiscord } from "../../discord/send.js";

// Ligne 65-68 : iMessage
import { monitorIMessageProvider } from "../../imessage/monitor.js";
import { probeIMessage } from "../../imessage/probe.js";
import { sendMessageIMessage } from "../../imessage/send.js";

// Ligne 73-87 : Line
import { listLineAccountIds, normalizeAccountId as normalizeLineAccountId, ... } from "../../line/accounts.js";
import { monitorLineProvider } from "../../line/monitor.js";
import { probeLineBot } from "../../line/probe.js";
import { createQuickReplyItems, pushMessageLine, ... } from "../../line/send.js";
import { buildTemplateMessageFromPayload } from "../../line/template-messages.js";

// Ligne 100-107 : Signal
import { monitorSignalProvider } from "../../signal/index.js";
import { probeSignal } from "../../signal/probe.js";
import { sendMessageSignal } from "../../signal/send.js";

// Ligne 108-115 : Slack
import { listSlackDirectoryGroupsLive, listSlackDirectoryPeersLive } from "../../slack/directory-live.js";
import { monitorSlackProvider } from "../../slack/index.js";
import { probeSlack } from "../../slack/probe.js";
import { resolveSlackChannelAllowlist } from "../../slack/resolve-channels.js";
import { resolveSlackUserAllowlist } from "../../slack/resolve-users.js";
import { sendMessageSlack } from "../../slack/send.js";

// Ligne 125-135 : TTS
import { textToSpeechTelephony } from "../../tts/tts.js";

// Ligne 136-145 : Web/WhatsApp
import { getActiveWebListener } from "../../web/active-listener.js";
import { getWebAuthAgeMs, logoutWeb, logWebSelfId, readWebSelfId, webAuthExists } from "../../web/auth-store.js";
import { startWebLoginWithQr, waitForWebLogin } from "../../web/login-qr.js";
import { loginWeb } from "../../web/login.js";
import { loadWebMedia } from "../../web/media.js";
import { sendMessageWhatsApp, sendPollWhatsApp } from "../../web/outbound.js";
```

**GARDER :**
```typescript
// Telegram imports
import { telegramMessageActions } from "../../channels/plugins/actions/telegram.js";
import { auditTelegramGroupMembership, collectTelegramUnmentionedGroupIds } from "../../telegram/audit.js";
import { monitorTelegramProvider } from "../../telegram/monitor.js";
import { probeTelegram } from "../../telegram/probe.js";
import { sendMessageTelegram } from "../../telegram/send.js";
import { resolveTelegramToken } from "../../telegram/token.js";
```

**Dans le corps du fichier :** Supprimer toutes les références aux fonctions supprimées dans l'objet `PluginRuntime`.

---

### 1.2 `src/channels/dock.ts`

**SUPPRIMER ces imports (lignes 15-27) :**
```typescript
import { resolveDiscordAccount } from "../discord/accounts.js";
import { resolveIMessageAccount } from "../imessage/accounts.js";
import { resolveSignalAccount } from "../signal/accounts.js";
import { resolveSlackAccount, resolveSlackReplyToMode } from "../slack/accounts.js";
import { buildSlackThreadingToolContext } from "../slack/threading-tool-context.js";
import { resolveWhatsAppAccount } from "../web/accounts.js";
import { normalizeWhatsAppTarget } from "../whatsapp/normalize.js";
import {
  resolveDiscordGroupRequireMention,
  resolveDiscordGroupToolPolicy,
  resolveGoogleChatGroupRequireMention,
  resolveGoogleChatGroupToolPolicy,
  resolveIMessageGroupRequireMention,
  resolveIMessageGroupToolPolicy,
  resolveSlackGroupRequireMention,
  resolveSlackGroupToolPolicy,
  resolveWhatsAppGroupRequireMention,
  resolveWhatsAppGroupToolPolicy,
} from "./plugins/group-mentions.js";
```

**MODIFIER l'objet `DOCKS` :** Ne garder que l'entrée `telegram`.

---

### 1.3 `src/channels/registry.ts`

**MODIFIER `CHAT_CHANNEL_ORDER` (ligne 7-15) :**
```typescript
// AVANT
export const CHAT_CHANNEL_ORDER = [
  "telegram", "whatsapp", "discord", "irc", "googlechat", 
  "slack", "signal", "imessage",
] as const;

// APRÈS
export const CHAT_CHANNEL_ORDER = ["telegram"] as const;
```

**MODIFIER `DEFAULT_CHAT_CHANNEL` (ligne 21) :**
```typescript
export const DEFAULT_CHAT_CHANNEL: ChatChannelId = "telegram";
```

**SUPPRIMER dans `CHAT_CHANNEL_META` :** Toutes les entrées sauf `telegram`.

---

### 1.4 `src/infra/outbound/deliver.ts`

**SUPPRIMER ces imports type (lignes 4-8) :**
```typescript
import type { sendMessageDiscord } from "../../discord/send.js";
import type { sendMessageIMessage } from "../../imessage/send.js";
import type { sendMessageSlack } from "../../slack/send.js";
import type { sendMessageWhatsApp } from "../../web/outbound.js";
```

**SUPPRIMER imports Signal (ligne 24) :**
```typescript
import { markdownToSignalTextChunks, type SignalTextStyleRange } from "../../signal/format.js";
import { sendMessageSignal } from "../../signal/send.js";
```

**MODIFIER type `OutboundSendDeps` (lignes 43-56) :**
```typescript
// AVANT
export type OutboundSendDeps = {
  sendWhatsApp?: typeof sendMessageWhatsApp;
  sendTelegram?: typeof sendMessageTelegram;
  sendDiscord?: typeof sendMessageDiscord;
  sendSlack?: typeof sendMessageSlack;
  sendSignal?: typeof sendMessageSignal;
  sendIMessage?: typeof sendMessageIMessage;
  sendMatrix?: SendMatrixMessage;
  sendMSTeams?: ...;
};

// APRÈS
export type OutboundSendDeps = {
  sendTelegram?: typeof sendMessageTelegram;
};
```

---

### 1.5 `src/infra/outbound/outbound-session.ts`

**SUPPRIMER ces imports :**
```typescript
import { parseDiscordTarget } from "../../discord/targets.js";
import { resolveSlackAccount } from "../../slack/accounts.js";
import { createSlackWebClient } from "../../slack/client.js";
import { normalizeAllowListLower } from "../../slack/monitor/allow-list.js";
import { parseSlackTarget } from "../../slack/targets.js";
import { parseIMessageTarget, normalizeIMessageHandle } from "../../imessage/targets.js";
import { ... } from "../../signal/identity.js";
import { isWhatsAppGroupJid, normalizeWhatsAppTarget } from "../../whatsapp/normalize.js";
```

**GARDER :**
```typescript
import { resolveTelegramTargetChatType } from "../../telegram/inline-buttons.js";
```

---

### 1.6 `src/config/types.channels.ts`

**SUPPRIMER ces imports (lignes 2-10) :**
```typescript
import type { DiscordConfig } from "./types.discord.js";
import type { GoogleChatConfig } from "./types.googlechat.js";
import type { IMessageConfig } from "./types.imessage.js";
import type { IrcConfig } from "./types.irc.js";
import type { MSTeamsConfig } from "./types.msteams.js";
import type { SignalConfig } from "./types.signal.js";
import type { SlackConfig } from "./types.slack.js";
import type { WhatsAppConfig } from "./types.whatsapp.js";
```

**MODIFIER type `ChannelsConfig` :**
```typescript
// AVANT
export type ChannelsConfig = {
  defaults?: ChannelDefaultsConfig;
  whatsapp?: WhatsAppConfig;
  telegram?: TelegramConfig;
  discord?: DiscordConfig;
  // ... tous les autres
};

// APRÈS
export type ChannelsConfig = {
  defaults?: ChannelDefaultsConfig;
  telegram?: TelegramConfig;
  [key: string]: any; // Pour extensions futures
};
```

---

### 1.7 `src/config/types.ts`

**SUPPRIMER ces exports :**
```typescript
export * from "./types.discord.js";
export * from "./types.googlechat.js";
export * from "./types.imessage.js";
export * from "./types.irc.js";
export * from "./types.msteams.js";
export * from "./types.signal.js";
export * from "./types.slack.js";
export * from "./types.whatsapp.js";
```

---

### 1.8 `src/gateway/server-http.ts`

**SUPPRIMER import Slack (ligne 21) :**
```typescript
import { handleSlackHttpRequest } from "../slack/http/index.js";
```

**SUPPRIMER handler Slack (ligne 347) :**
```typescript
if (await handleSlackHttpRequest(req, res)) {
  return;
}
```

---

### 1.9 `src/cli/deps.ts`

**SUPPRIMER import :**
```typescript
import { sendMessageSlack } from "../slack/send.js";
```

---

### 1.10 `src/plugin-sdk/index.ts`

**SUPPRIMER exports Slack :**
```typescript
export { ... } from "../slack/accounts.js";
export { slackOnboardingAdapter } from "../channels/plugins/onboarding/slack.js";
export { ... } from "../channels/plugins/normalize/slack.js";
export { buildSlackThreadingToolContext } from "../slack/threading-tool-context.js";
```

---

### 1.11 `src/agents/tools/` - Agent Tools

**SUPPRIMER fichiers entiers :**
- `src/agents/tools/discord-actions.ts`
- `src/agents/tools/discord-actions-guild.ts`
- `src/agents/tools/discord-actions-messaging.ts`
- `src/agents/tools/discord-actions-moderation.ts`
- `src/agents/tools/discord-actions-presence.ts`
- `src/agents/tools/slack-actions.ts`
- `src/agents/tools/whatsapp-actions.ts`

---

### 1.12 `src/channels/plugins/`

**SUPPRIMER dossiers :**
- `actions/discord.ts` + test
- `actions/signal.ts` + test
- `normalize/discord.ts`
- `normalize/signal.ts`
- `normalize/slack.ts`
- `normalize/whatsapp.ts`
- `normalize/imessage.ts` + test
- `onboarding/discord.ts`
- `onboarding/signal.ts`
- `onboarding/slack.ts`
- `onboarding/whatsapp.ts`
- `onboarding/imessage.ts`
- `outbound/discord.ts`
- `outbound/signal.ts`
- `outbound/slack.ts`
- `outbound/whatsapp.ts`
- `outbound/imessage.ts`
- `agent-tools/whatsapp-login.ts`
- `bluebubbles-actions.ts`
- `slack.actions.ts` + test
- `whatsapp-heartbeat.ts`
- `status-issues/bluebubbles.ts`
- `status-issues/discord.ts`
- `status-issues/whatsapp.ts`

**MODIFIER `outbound/load.ts` :** Vérifier qu'il ne référence plus les channels supprimés.

---

### 1.13 `src/auto-reply/reply/commands-allowlist.ts`

**SUPPRIMER ces imports :**
```typescript
import { resolveDiscordAccount } from "../../discord/accounts.js";
import { resolveDiscordUserAllowlist } from "../../discord/resolve-users.js";
import { resolveIMessageAccount } from "../../imessage/accounts.js";
import { resolveSignalAccount } from "../../signal/accounts.js";
import { resolveSlackAccount } from "../../slack/accounts.js";
import { resolveSlackUserAllowlist } from "../../slack/resolve-users.js";
```

**MODIFIER le corps :** Supprimer les switch cases pour ces channels.

---

### 1.14 `src/auto-reply/reply/line-directives.ts`

**SUPPRIMER le fichier entier** (spécifique à Line)

---

### 1.15 `src/auto-reply/reply/normalize-reply.ts`

**SUPPRIMER ces imports :**
```typescript
import { hasLineDirectives, parseLineDirectives } from "./line-directives.js";
```

**MODIFIER le code :** Supprimer les références à Line directives.

---

### 1.16 TTS - Fichiers à modifier

#### `src/plugins/runtime/index.ts`
```typescript
// SUPPRIMER
import { textToSpeechTelephony } from "../../tts/tts.js";
```

#### `src/plugins/runtime/types.ts`
```typescript
// SUPPRIMER
type TextToSpeechTelephony = typeof import("../../tts/tts.js").textToSpeechTelephony;
// Et la référence dans l'interface
textToSpeechTelephony: TextToSpeechTelephony;
```

#### `src/agents/tools/tts-tool.ts`
**SUPPRIMER le fichier entier** ou le remplacer par un stub.

#### `src/agents/openclaw-tools.ts`
```typescript
// SUPPRIMER
import { createTtsTool } from "./tools/tts-tool.js";
// Et supprimer l'enregistrement du tool
```

#### `src/agents/cli-runner/helpers.ts`
```typescript
// SUPPRIMER
import { buildTtsSystemPromptHint } from "../../tts/tts.js";
// Remplacer par un string vide ou supprimer l'usage
```

#### `src/agents/pi-embedded-runner/compact.ts`
```typescript
// SUPPRIMER
import { buildTtsSystemPromptHint } from "../../tts/tts.js";
```

#### `src/agents/pi-embedded-runner/run/attempt.ts`
```typescript
// SUPPRIMER
import { buildTtsSystemPromptHint } from "../../../tts/tts.js";
```

#### `src/auto-reply/status.ts`
```typescript
// SUPPRIMER les imports TTS et adapter le code
```

#### `src/config/types.ts`
```typescript
// SUPPRIMER
export * from "./types.tts.js";
```

#### `src/config/types.messages.ts`
```typescript
// SUPPRIMER
import type { TtsConfig } from "./types.tts.js";
```

---

### 1.17 `src/config/zod-schema.providers.ts`

**SUPPRIMER :**
```typescript
import { WhatsAppConfigSchema } from "./zod-schema.providers-whatsapp.js";
export * from "./zod-schema.providers-whatsapp.js";
```

---

### 1.14 `src/channels/plugins/group-mentions.ts`

**SUPPRIMER toutes les fonctions** sauf celles pour Telegram :
- `resolveDiscordGroup*`
- `resolveSlackGroup*`
- `resolveWhatsAppGroup*`
- `resolveIMessageGroup*`
- `resolveGoogleChatGroup*`
- `resolveSignalGroup*`

---

---

## ⚠️ CLARIFICATIONS NÉCESSAIRES

Avant de continuer, décisions à prendre :

### 1. UI et TUI ?
- **Option A** : Supprimer UI (`ui/`) et TUI (`src/tui/`) → Version vraiment minimale
- **Option B** : Garder UI et TUI → Version avec interfaces

### 2. `src/web/media.ts`
Ce fichier est utilisé par Telegram ! (`src/telegram/send.ts`, `src/telegram/bot/delivery.ts`)
- **Solution** : Déplacer `loadWebMedia` dans `src/media/` avant suppression de `src/web/`

### 3. Skills à garder ?
- `coding-agent` → OUI (pi-coding-agent)
- `weather` → ?
- `github` → ?
- `web_search` → Built-in (Brave)

---

## 🟡 PHASE 2 : Suppression Dossiers Channels

> ⚠️ Exécuter APRÈS Phase 1

### 2.0 Pré-requis : Déplacer `loadWebMedia`

```bash
# Déplacer web/media.ts vers media/web-fetch.ts
mv src/web/media.ts src/media/web-fetch.ts
```

**Puis mettre à jour les imports dans :**
- `src/telegram/send.ts`
- `src/telegram/bot/delivery.ts`
- `src/agents/tools/image-tool.ts`
- `src/agents/pi-embedded-runner/run/images.ts`
- `src/infra/outbound/message-action-runner.ts`
- `src/plugin-sdk/index.ts`

### 2.1 Dossiers `src/`
```bash
rm -rf src/discord/
rm -rf src/slack/
rm -rf src/signal/
rm -rf src/line/
rm -rf src/imessage/
rm -rf src/whatsapp/
rm -rf src/web/        # Maintenant safe après déplacement media.ts
rm -rf src/tts/
```

### 2.2 Fichiers config types
```bash
rm -f src/config/types.discord.ts
rm -f src/config/types.googlechat.ts
rm -f src/config/types.imessage.ts
rm -f src/config/types.irc.ts
rm -f src/config/types.msteams.ts
rm -f src/config/types.signal.ts
rm -f src/config/types.slack.ts
rm -f src/config/types.whatsapp.ts
rm -f src/config/zod-schema.providers-whatsapp.ts
rm -f src/config/schema.irc.ts
```

---

## 🟢 PHASE 3 : Suppression Extensions

```bash
rm -rf extensions/whatsapp/
rm -rf extensions/discord/
rm -rf extensions/slack/
rm -rf extensions/signal/
rm -rf extensions/imessage/
rm -rf extensions/line/
rm -rf extensions/irc/
rm -rf extensions/googlechat/
rm -rf extensions/mattermost/
rm -rf extensions/msteams/
rm -rf extensions/twitch/
rm -rf extensions/matrix/
rm -rf extensions/nostr/
rm -rf extensions/zalo/
rm -rf extensions/zalouser/
rm -rf extensions/tlon/
rm -rf extensions/nextcloud-talk/
rm -rf extensions/bluebubbles/
rm -rf extensions/feishu/
rm -rf extensions/voice-call/
rm -rf extensions/talk-voice/
rm -rf extensions/device-pair/
rm -rf extensions/phone-control/
rm -rf extensions/open-prose/
rm -rf extensions/qwen-portal-auth/
rm -rf extensions/minimax-portal-auth/
rm -rf extensions/google-gemini-cli-auth/
rm -rf extensions/google-antigravity-auth/
rm -rf extensions/copilot-proxy/
rm -rf extensions/diagnostics-otel/
rm -rf extensions/memory-lancedb/
```

---

## 🔵 PHASE 4 : Suppression Apps Natives

```bash
rm -rf apps/
rm -rf Swabble/
```

---

## ⚪ PHASE 5 : Suppression Skills

**Garder uniquement :**
- `skills/coding-agent/`
- `skills/weather/`
- `skills/github/`

**Supprimer tout le reste (~50 skills)**

---

## 🟣 PHASE 6 : Nettoyage package.json

### Dépendances à SUPPRIMER

```json
{
  "@whiskeysockets/baileys": "...",
  "discord-api-types": "...",
  "@buape/carbon": "...",
  "@slack/bolt": "...",
  "@slack/web-api": "...",
  "signal-utils": "...",
  "@line/bot-sdk": "...",
  "@larksuiteoapi/node-sdk": "...",
  "node-edge-tts": "...",
  "@napi-rs/canvas": "...",
  "@homebridge/ciao": "...",
  "pdfjs-dist": "..."
}
```

### Scripts à SUPPRIMER
```json
{
  "scripts": {
    "android:*": "...",
    "ios:*": "...",
    "mac:*": "...",
    "canvas:a2ui:*": "...",
    "format:swift": "...",
    "lint:swift": "..."
  }
}
```

---

## ✅ PHASE 7 : Validation

### 7.1 Build test
```bash
pnpm install
pnpm build
```

### 7.2 Tests critiques
```bash
pnpm test src/gateway/
pnpm test src/telegram/
pnpm test src/agents/
```

### 7.3 Smoke test
```bash
pnpm openclaw gateway --verbose
# Dans un autre terminal:
pnpm openclaw agent --message "Hello"
```

---

## 📋 Ordre d'exécution

1. **Phase 1** - Modifications code (2-3h) - MANUEL, fichier par fichier
2. **Phase 2** - Suppression src/ channels (10 min)
3. **Phase 3** - Suppression extensions (5 min)
4. **Phase 4** - Suppression apps (2 min)
5. **Phase 5** - Suppression skills (10 min)
6. **Phase 6** - Nettoyage package.json (30 min)
7. **Phase 7** - Validation (1h)

**Durée totale estimée : 4-6 heures**

---

## ⚠️ Points de vigilance

1. **Ordre critique** : Phase 1 DOIT être terminée avant Phase 2
2. **Commits atomiques** : Un commit par phase
3. **Tests après chaque phase** : `pnpm build` minimum
4. **Backup** : Le repo GitHub est notre backup

---

*Document créé le 2026-02-11*
