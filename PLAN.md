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

## 📚 MUST READ

Toujours lire avant de travailler :
- `work/CODEBASE.md`
- `work/STACK.md`
- `work/TODO.md`
- `work/METRICS_BEFORE.md`

---

## 🔧 Décisions techniques

| Décision | Choix | Raison |
|----------|-------|--------|
| **TUI** | ✅ Garder | Interface terminal utile pour debug |
| **UI** | ✅ Garder | Interface web conservée |
| **Branches** | Une par phase | Isolation, rollback facile, convention: `phase-N-description` |
| **Channel** | Telegram seul | Objectif minimal |
| **pi-*** | Garder toutes | Core agent framework |

---

## 📊 Vue d'ensemble

### Objectif final
- **1 seul channel** : Telegram
- **Core tools** : read/write/bash/edit, web_search (Brave), browser (Playwright)
- **Memory** : SOUL/IDENTITY/MEMORY.md
- **Libs pi-*** : pi-agent-core, pi-ai, pi-coding-agent, pi-tui

### Métriques cibles
| Métrique | Avant | Après | Réduction |
|----------|-------|-------|-----------|
| Channels | 17 | 1 | -94% |
| Extensions | 35 | 2 | -95% |
| Skills | 52 | 3-5 | -90% |
| Code LOC | 569K | ~150K | -70% |
| Deps npm | 72 | ~35 | -50% |

---

## 🔴 PHASE 1 : Préparation

**Branche :** `phase-1-prep`  
**Durée :** 1-2h | **Risque :** Faible

### Tâches

#### 1.1 Créer la branche de travail
```bash
cd /Users/dev/clawd/projects/openClaw
git checkout -b phase-1-prep
```

#### 1.2 Mesurer les métriques initiales
```bash
# Lignes de code
find src -name "*.ts" | xargs wc -l | tail -1
find extensions -name "*.ts" | xargs wc -l | tail -1
find skills -name "*.ts" -o -name "*.md" | xargs wc -l | tail -1

# Nombre de fichiers
find src -name "*.ts" | wc -l
find extensions -mindepth 1 -maxdepth 1 -type d | wc -l
find skills -mindepth 1 -maxdepth 1 -type d | wc -l

# Taille des dossiers
du -sh src/ extensions/ skills/ apps/ ui/

# Dépendances npm
node -e "const p=require('./package.json'); console.log(Object.keys(p.dependencies||{}).length + Object.keys(p.devDependencies||{}).length)"
```

#### 1.3 Documenter dans METRICS_BEFORE.md
Créer `work/METRICS_BEFORE.md` avec les métriques collectées.

#### 1.4 Identifier les tests critiques

**Tests à conserver (core) :**
- `src/gateway/*.test.ts` (sauf channels-specific)
- `src/agents/*.test.ts`
- `src/telegram/*.test.ts`
- `src/memory/*.test.ts`
- `src/config/*.test.ts`

**Tests à supprimer (avec les features) :**
- `src/discord/*.test.ts`
- `src/slack/*.test.ts`
- `src/whatsapp/*.test.ts`
- `extensions/*/*.test.ts` (sauf telegram, memory-core)

#### 1.5 Commit snapshot
```bash
git add -A
git commit -m "chore: snapshot before minimal refactoring"
git push origin phase-1-prep
```

### Critères de validation
- [ ] Branche `phase-1-prep` créée
- [ ] Métriques initiales documentées dans `work/METRICS_BEFORE.md`
- [ ] Commit initial pushé
- [ ] Tests critiques identifiés

---

## 🟢 PHASE 2 : Suppression Apps Natives

**Branche :** `phase-2-apps`  
**Durée :** 30 min | **Risque :** Très faible

### Tâches

#### 2.1 Supprimer les dossiers apps
```bash
cd /Users/dev/clawd/projects/openClaw

rm -rf apps/ios/
rm -rf apps/android/
rm -rf apps/macos/
rm -rf apps/shared/
rm -rf Swabble/
```

#### 2.2 Supprimer les fichiers de config Swift
```bash
rm -f .swiftformat
rm -f .swiftlint.yml
```

#### 2.3 Nettoyer package.json scripts

**Scripts à supprimer :**
```json
{
  "android:build", "android:dev", "android:dev:test", "android:install",
  "ios:build", "ios:build:debug", "ios:build:sim", "ios:dev", "ios:install", "ios:install:sim",
  "mac:build", "mac:dev", "mac:install",
  "format:swift", "lint:swift"
}
```

#### 2.4 Vérifier la compilation
```bash
pnpm install
pnpm build
```

#### 2.5 Commit
```bash
git add -A
git commit -m "refactor: remove native apps (iOS/Android/macOS)

- Remove apps/ios, apps/android, apps/macos, apps/shared
- Remove Swabble Swift library
- Remove Swift config files
- Clean package.json scripts

Reduction: ~9.8 MB"
```

### Éléments supprimés
| Élément | Taille |
|---------|--------|
| `apps/ios/` | ~3 MB |
| `apps/android/` | ~3 MB |
| `apps/macos/` | ~2 MB |
| `apps/shared/` | ~1.5 MB |
| `Swabble/` | ~300 KB |
| **Total** | **~9.8 MB** |

### Critères de validation
- [ ] Dossier `apps/` supprimé
- [ ] Dossier `Swabble/` supprimé
- [ ] Fichiers Swift config supprimés
- [ ] Scripts iOS/Android/macOS retirés de package.json
- [ ] `pnpm build` passe sans erreur

---

## 🔴 PHASE 3 : Modifications Code CRITIQUES + Suppression Channels

**Branche :** `phase-3-channels`  
**Durée :** 2-3h | **Risque :** ⚠️ Élevé

> ⚠️ Ces fichiers ont des imports multi-channels. Ils doivent être modifiés AVANT de supprimer les dossiers channels.

### 3.1 `src/plugins/runtime/index.ts` (HUB CENTRAL)

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

### 3.2 `src/channels/dock.ts`

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

### 3.3 `src/channels/registry.ts`

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

### 3.4 `src/infra/outbound/deliver.ts`

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

### 3.5 `src/infra/outbound/outbound-session.ts`

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

### 3.6 `src/config/types.channels.ts`

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

### 3.7 `src/config/types.ts`

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

### 3.8 `src/gateway/server-http.ts`

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

### 3.9 `src/cli/deps.ts`

**SUPPRIMER import :**
```typescript
import { sendMessageSlack } from "../slack/send.js";
```

---

### 3.10 `src/plugin-sdk/index.ts`

**SUPPRIMER exports Slack :**
```typescript
export { ... } from "../slack/accounts.js";
export { slackOnboardingAdapter } from "../channels/plugins/onboarding/slack.js";
export { ... } from "../channels/plugins/normalize/slack.js";
export { buildSlackThreadingToolContext } from "../slack/threading-tool-context.js";
```

---

### 3.11 `src/agents/tools/` - Agent Tools

**SUPPRIMER fichiers entiers :**
- `src/agents/tools/discord-actions.ts`
- `src/agents/tools/discord-actions-guild.ts`
- `src/agents/tools/discord-actions-messaging.ts`
- `src/agents/tools/discord-actions-moderation.ts`
- `src/agents/tools/discord-actions-presence.ts`
- `src/agents/tools/slack-actions.ts`
- `src/agents/tools/whatsapp-actions.ts`

---

### 3.12 `src/channels/plugins/`

**SUPPRIMER fichiers :**
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

### 3.13 `src/auto-reply/reply/commands-allowlist.ts`

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

### 3.14 `src/auto-reply/reply/line-directives.ts`

**SUPPRIMER le fichier entier** (spécifique à Line)

---

### 3.15 `src/auto-reply/reply/normalize-reply.ts`

**SUPPRIMER ces imports :**
```typescript
import { hasLineDirectives, parseLineDirectives } from "./line-directives.js";
```

**MODIFIER le code :** Supprimer les références à Line directives.

---

### 3.16 `src/channels/plugins/group-mentions.ts`

**SUPPRIMER toutes les fonctions** sauf celles pour Telegram :
- `resolveDiscordGroup*`
- `resolveSlackGroup*`
- `resolveWhatsAppGroup*`
- `resolveIMessageGroup*`
- `resolveGoogleChatGroup*`
- `resolveSignalGroup*`

---

### 3.17 `src/config/zod-schema.providers.ts`

**SUPPRIMER :**
```typescript
import { WhatsAppConfigSchema } from "./zod-schema.providers-whatsapp.js";
export * from "./zod-schema.providers-whatsapp.js";
```

---

### 3.18 Pré-requis : Déplacer `loadWebMedia`

> ⚠️ Ce fichier est utilisé par Telegram ! (`src/telegram/send.ts`, `src/telegram/bot/delivery.ts`)

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

---

### 3.19 Supprimer les dossiers channels `src/`

```bash
rm -rf src/discord/
rm -rf src/slack/
rm -rf src/signal/
rm -rf src/line/
rm -rf src/imessage/
rm -rf src/whatsapp/
rm -rf src/web/        # Safe après déplacement media.ts
```

---

### 3.20 Supprimer les fichiers config types

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

### 3.21 Supprimer les extensions channels

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
```

---

### 3.22 Supprimer les dépendances npm channels

**Retirer de package.json :**
```json
"@whiskeysockets/baileys": "...",
"discord-api-types": "...",
"@buape/carbon": "...",
"@slack/bolt": "...",
"@slack/web-api": "...",
"signal-utils": "...",
"@line/bot-sdk": "...",
"@larksuiteoapi/node-sdk": "..."
```

---

### 3.23 Commit Phase 3

```bash
git add -A
git commit -m "refactor: remove all channels except Telegram

- Modify 17 core files to remove channel imports
- Move loadWebMedia to src/media/
- Remove src/ channel directories (discord, slack, signal, line, imessage, whatsapp, web)
- Remove config type files
- Remove channel extensions
- Remove npm dependencies

Channels: 17 → 1 (-94%)"
```

### Critères de validation Phase 3
- [ ] Tous les fichiers core modifiés
- [ ] loadWebMedia déplacé et imports mis à jour
- [ ] Dossiers channels supprimés
- [ ] Extensions channels supprimées
- [ ] Dépendances npm retirées
- [ ] `pnpm install` sans erreur
- [ ] `pnpm build` sans erreur

---

## 🟡 PHASE 4 : Suppression Voice/TTS

**Branche :** `phase-4-voice`  
**Durée :** 30 min | **Risque :** Faible

### 4.1 Modifier les fichiers TTS

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
**SUPPRIMER le fichier entier**

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

### 4.2 Supprimer les dossiers TTS

```bash
rm -rf src/tts/
```

---

### 4.3 Supprimer les extensions voice

```bash
rm -rf extensions/voice-call/
rm -rf extensions/talk-voice/
```

---

### 4.4 Supprimer les skills voice/TTS

```bash
rm -rf skills/sag/              # ElevenLabs
rm -rf skills/openai-whisper/   # Whisper local
rm -rf skills/openai-whisper-api/  # Whisper API
rm -rf skills/sherpa-onnx-tts/  # Sherpa TTS
```

---

### 4.5 Nettoyer package.json

**Dépendance à supprimer :**
```json
"node-edge-tts": "^1.2.10"
```

---

### 4.6 Commit Phase 4

```bash
git add -A
git commit -m "refactor: remove voice and TTS features

- Remove src/tts/
- Remove extensions/voice-call, talk-voice
- Remove skills: sag, openai-whisper, sherpa-onnx-tts
- Remove node-edge-tts dependency
- Clean TTS imports in 8 files

Reduction: ~500 KB code, 1 npm dependency"
```

### Critères de validation Phase 4
- [ ] `src/tts/` supprimé
- [ ] Extensions voice supprimées
- [ ] Skills TTS supprimés
- [ ] `node-edge-tts` retiré de package.json
- [ ] `pnpm build` sans erreur

---

## 🟢 PHASE 5 : Nettoyage Skills & Extensions

**Branche :** `phase-5-skills`  
**Durée :** 1h | **Risque :** Faible

### Skills à GARDER

| Skill | Raison |
|-------|--------|
| `coding-agent` | Wrapper pi-coding-agent |
| `weather` | Simple et utile |
| `github` | Optionnel, intégration Git |

### 5.1 Supprimer les skills channel-related

```bash
cd /Users/dev/clawd/projects/openClaw/skills

rm -rf bluebubbles/
rm -rf imsg/
rm -rf slack/
rm -rf discord/
```

### 5.2 Supprimer les skills outils externes

```bash
# Gestion de notes/tâches
rm -rf 1password/
rm -rf apple-notes/
rm -rf apple-reminders/
rm -rf bear-notes/
rm -rf notion/
rm -rf obsidian/
rm -rf things-mac/
rm -rf trello/

# Musique/Media
rm -rf spotify-player/
rm -rf songsee/
rm -rf sonoscli/
rm -rf video-frames/
rm -rf gifgrep/

# Domotique
rm -rf openhue/
rm -rf nano-banana-pro/

# Divers
rm -rf blogwatcher/
rm -rf blucli/
rm -rf eightctl/
rm -rf food-order/
rm -rf gog/
rm -rf goplaces/
rm -rf local-places/
rm -rf ordercli/
rm -rf peekaboo/
rm -rf wacli/

# AI/LLM alternatifs
rm -rf gemini/
rm -rf oracle/
rm -rf openai-image-gen/

# Techniques non essentiels
rm -rf mcporter/
rm -rf nano-pdf/
rm -rf himalaya/
rm -rf tmux/
rm -rf skill-creator/
rm -rf session-logs/
rm -rf summarize/
rm -rf healthcheck/
rm -rf canvas/
rm -rf camsnap/
rm -rf clawhub/
rm -rf model-usage/
rm -rf voice-call/
```

### 5.3 Supprimer les extensions restantes

```bash
cd /Users/dev/clawd/projects/openClaw/extensions

rm -rf open-prose/
rm -rf lobster/
rm -rf llm-task/
rm -rf qwen-portal-auth/
rm -rf minimax-portal-auth/
rm -rf google-gemini-cli-auth/
rm -rf google-antigravity-auth/
rm -rf copilot-proxy/
rm -rf diagnostics-otel/
rm -rf memory-lancedb/
rm -rf device-pair/
rm -rf phone-control/
```

### 5.4 Commit Phase 5

```bash
git add -A
git commit -m "refactor: clean up skills and extensions

- Remove 50+ non-essential skills
- Remove 12 non-essential extensions
- Keep only: coding-agent, weather, github
- Keep extensions: telegram, memory-core

Skills: 52 → 3 (-94%)
Extensions: 35 → 2 (-94%)"
```

### Critères de validation Phase 5
- [ ] Skills réduits à 3 essentiels
- [ ] Extensions réduites à 2 (telegram, memory-core)
- [ ] `pnpm build` sans erreur

---

## 🔵 PHASE 6 : Nettoyage Final & Validation

**Branche :** `phase-6-final`  
**Durée :** 1-2h | **Risque :** Moyen

### 6.1 Nettoyer package.json - Dépendances restantes

**Vérifier et supprimer si non utilisées :**
```json
"jszip": "...",           // Si pas de ZIP handling
"pdfjs-dist": "...",      // Si pas de PDF
"@homebridge/ciao": "...", // mDNS (pairing)
"@napi-rs/canvas": "...", // Canvas (optionnel)
"node-llama-cpp": "..."   // Local LLM (optionnel)
```

### 6.2 Nettoyer les docs optionnels

```bash
rm -rf docs/platforms/    # Docs des channels supprimés
rm -rf docs/ja-JP/        # i18n optionnel
rm -rf docs/zh-CN/        # i18n optionnel
```

### 6.3 Réinstaller les dépendances

```bash
rm -rf node_modules/
rm -f pnpm-lock.yaml
pnpm install
```

### 6.4 Build complet

```bash
pnpm build
```

### 6.5 Tests de validation

```bash
# Tests unitaires core
pnpm test:unit

# Tests gateway
pnpm test -- --grep "gateway"

# Tests telegram
pnpm test -- --grep "telegram"

# Tests agents
pnpm test -- --grep "agent"
```

### 6.6 Test fonctionnel manuel

1. **Démarrer le gateway :**
   ```bash
   node dist/entry.js gateway start
   ```

2. **Vérifier Telegram :**
   - Envoyer un message au bot
   - Vérifier la réponse

3. **Vérifier les tools :**
   - read, write, bash, edit
   - web_search (si implémenté)
   - browser (si activé)

4. **Vérifier Memory :**
   - SOUL.md chargé
   - IDENTITY.md chargé

5. **Vérifier TUI :**
   ```bash
   node dist/entry.js tui
   ```

### 6.7 Mesurer les métriques finales

```bash
# Créer work/METRICS_AFTER.md
find src -name "*.ts" | xargs wc -l | tail -1
find extensions -name "*.ts" | xargs wc -l | tail -1
find skills -type d -maxdepth 1 | wc -l
du -sh src/ extensions/ skills/
```

### 6.8 Commit final

```bash
git add -A
git commit -m "refactor: finalize minimal version

- Clean npm dependencies
- Remove optional docs
- Validate build and tests
- Document final metrics

Final reduction:
- Code: ~70%
- Dependencies: ~50%
- Extensions: 95%
- Skills: 94%"
```

### 6.9 Merge dans main

```bash
git checkout main
git merge phase-6-final
git push origin main
git tag v0.1.0-minimal
git push origin v0.1.0-minimal
```

### Critères de validation finale

**Build & Tests**
- [ ] `pnpm install` sans erreur ni warning
- [ ] `pnpm build` sans erreur
- [ ] Tests unitaires passent
- [ ] Tests gateway passent
- [ ] Tests telegram passent

**Fonctionnel**
- [ ] Gateway démarre
- [ ] Telegram se connecte
- [ ] Agent répond aux messages
- [ ] Tools fonctionnent (read/write/bash/edit)
- [ ] Memory fonctionne (SOUL/IDENTITY)
- [ ] TUI fonctionne

**Documentation**
- [ ] `work/METRICS_BEFORE.md` existe
- [ ] `work/METRICS_AFTER.md` créé

---

## 📊 Récapitulatif des phases

| Phase | Branche | Durée | Risque |
|-------|---------|-------|--------|
| 1. Préparation | `phase-1-prep` | 1-2h | Faible |
| 2. Apps natives | `phase-2-apps` | 30 min | Très faible |
| 3. Channels | `phase-3-channels` | 2-3h | **Élevé** |
| 4. Voice/TTS | `phase-4-voice` | 30 min | Faible |
| 5. Skills | `phase-5-skills` | 1h | Faible |
| 6. Final | `phase-6-final` | 1-2h | Moyen |
| **Total** | | **6-9h** | |

---

## ⚠️ Points de vigilance

1. **Ordre critique** : Phase 3 (modifications code) DOIT être terminée avant suppression des dossiers
2. **Commits atomiques** : Un commit par phase
3. **Tests après chaque phase** : `pnpm build` minimum
4. **Backup** : Le repo GitHub est notre backup
5. **loadWebMedia** : Déplacer AVANT de supprimer src/web/

---

*Document maître - Mis à jour le 2026-02-11*
