# OpenClaw - Refactoring TODO (Version Minimaliste)

**Date :** 2025-02-11  
**Objectif :** Créer une version MINIMALISTE avec uniquement :
- Telegram (seul channel)
- Gateway (orchestration)
- Agent avec tools : read/write/bash/edit, web_search (Brave), browser (Playwright optionnel)
- Memory (SOUL/IDENTITY/MEMORY.md style Clawdbot)
- Support des libs pi-* de Mario Zechner

---

## 📊 RÉSUMÉ ESTIMÉ

### Réduction code source
- **Channels à supprimer** : ~2.4 MB (WhatsApp, Discord, Slack, Signal, Line, iMessage + extensions)
- **Features UI/Apps** : ~11.5 MB (UI web, TUI, Canvas, Apps iOS/Android/macOS)
- **Skills inutiles** : ~60+ skills (estimation ~3-5 MB)
- **Total estimé** : **~40-50% du code source**

### Réduction dépendances
- **npm dependencies** : ~25-30 dépendances à retirer
- **Estimation** : **~35-40% des dépendances**

---

## 🗑️ CHANNELS À SUPPRIMER

### Channels principaux (src/)
- [ ] **WhatsApp** (`src/whatsapp/`) — 8 KB
- [ ] **Discord** (`src/discord/`) — 576 KB
- [ ] **Slack** (`src/slack/`) — 440 KB
- [ ] **Signal** (`src/signal/`) — 168 KB
- [ ] **Line** (`src/line/`) — 300 KB
- [ ] **iMessage** (`src/imessage/`) — 120 KB

### Extensions channels
- [ ] `extensions/whatsapp/`
- [ ] `extensions/discord/`
- [ ] `extensions/slack/`
- [ ] `extensions/signal/`
- [ ] `extensions/line/`
- [ ] `extensions/imessage/`
- [ ] `extensions/irc/`
- [ ] `extensions/googlechat/`
- [ ] `extensions/mattermost/`
- [ ] `extensions/msteams/`
- [ ] `extensions/twitch/`
- [ ] `extensions/matrix/`
- [ ] `extensions/nostr/`
- [ ] `extensions/zalo/`
- [ ] `extensions/zalouser/`
- [ ] `extensions/tlon/`
- [ ] `extensions/nextcloud-talk/`
- [ ] `extensions/bluebubbles/`

### Fichiers channel-related
- [ ] `src/channels/plugins/bluebubbles-actions.ts`
- [ ] `src/channels/plugins/slack.actions.ts`
- [ ] `src/channels/plugins/slack.actions.test.ts`
- [ ] `src/channels/plugins/whatsapp-heartbeat.ts`
- [ ] `skills/bluebubbles/`
- [ ] `skills/imsg/`
- [ ] `skills/slack/`
- [ ] `skills/discord/`

**Total channels :** ~17 channels à supprimer

---

## 🎨 FEATURES À SUPPRIMER

### UI & Control Interfaces
- [ ] **Web UI** (`ui/`) — 1.5 MB — Interface web de contrôle complète
- [ ] **TUI** (`src/tui/`) — 240 KB — Terminal UI
- [ ] **Canvas Host** (`src/canvas-host/`) — 52 KB
- [ ] Dépendance `@mariozechner/pi-tui`

### Applications natives
- [ ] **iOS App** (`apps/ios/`)
- [ ] **Android App** (`apps/android/`)
- [ ] **macOS App** (`apps/macos/`)
- [ ] **Shared App Code** (`apps/shared/`)
- [ ] Scripts iOS/Android dans `package.json`

### Voice & TTS
- [ ] **TTS** (`src/tts/`)
- [ ] Skill `skills/sag/` (ElevenLabs)
- [ ] Skill `skills/openai-whisper/`
- [ ] Skill `skills/openai-whisper-api/`
- [ ] Skill `skills/sherpa-onnx-tts/`
- [ ] Extension `extensions/talk-voice/`
- [ ] Extension `extensions/voice-call/`
- [ ] Dépendance `node-edge-tts`

### Canvas & A2UI
- [ ] Canvas bundling (`scripts/bundle-a2ui.sh`)
- [ ] Canvas copy scripts (`scripts/canvas-a2ui-copy.ts`)
- [ ] Skill `skills/canvas/`
- [ ] Dépendance `@napi-rs/canvas` (peer)

### Pairing & Nodes
- [ ] `src/pairing/` (si non utilisé par Telegram)
- [ ] `src/node-host/`
- [ ] Extension `extensions/device-pair/`
- [ ] Extension `extensions/phone-control/`
- [ ] Skill `skills/camsnap/`

### Web Features
- [ ] `src/web/` (si pas utilisé pour Gateway minimal)
- [ ] `src/auto-reply/`
- [ ] Channels web stuff

### macOS-specific
- [ ] `src/macos/` (sauf si nécessaire pour Telegram)

---

## 🛠️ SKILLS/TOOLS À SUPPRIMER

### Channels-related (déjà listés)
- [x] Voir section CHANNELS

### Outils externes (non-core)
- [ ] `skills/1password/`
- [ ] `skills/apple-notes/`
- [ ] `skills/apple-reminders/`
- [ ] `skills/bear-notes/`
- [ ] `skills/blogwatcher/`
- [ ] `skills/blucli/`
- [ ] `skills/eightctl/`
- [ ] `skills/food-order/`
- [ ] `skills/gemini/` (si on garde Brave uniquement)
- [ ] `skills/gifgrep/`
- [ ] `skills/github/`
- [ ] `skills/gog/`
- [ ] `skills/goplaces/`
- [ ] `skills/healthcheck/` (si non critique)
- [ ] `skills/himalaya/` (email)
- [ ] `skills/local-places/`
- [ ] `skills/mcporter/`
- [ ] `skills/nano-banana-pro/`
- [ ] `skills/nano-pdf/` (si non utilisé)
- [ ] `skills/notion/`
- [ ] `skills/obsidian/`
- [ ] `skills/openai-image-gen/` (si pas nécessaire)
- [ ] `skills/openhue/`
- [ ] `skills/oracle/`
- [ ] `skills/ordercli/`
- [ ] `skills/peekaboo/`
- [ ] `skills/session-logs/` (optionnel)
- [ ] `skills/skill-creator/`
- [ ] `skills/songsee/`
- [ ] `skills/sonoscli/`
- [ ] `skills/spotify-player/`
- [ ] `skills/summarize/` (optionnel)
- [ ] `skills/things-mac/`
- [ ] `skills/tmux/`
- [ ] `skills/trello/`
- [ ] `skills/video-frames/`
- [ ] `skills/wacli/`
- [ ] `skills/weather/`

### Extensions optionnelles
- [ ] `extensions/open-prose/`
- [ ] `extensions/lobster/`
- [ ] `extensions/llm-task/`
- [ ] `extensions/qwen-portal-auth/`
- [ ] `extensions/minimax-portal-auth/`
- [ ] `extensions/google-gemini-cli-auth/`
- [ ] `extensions/google-antigravity-auth/`
- [ ] `extensions/copilot-proxy/`
- [ ] `extensions/diagnostics-otel/`
- [ ] `extensions/memory-lancedb/` (si on garde memory-core uniquement)

### Skills GitHub workflow (si non utilisé)
- [ ] `.agents/skills/prepare-pr/`
- [ ] `.agents/skills/review-pr/`
- [ ] `.agents/skills/merge-pr/`
- [ ] Extensions Feishu : `extensions/feishu/skills/*`

**Total skills :** ~60+ skills à supprimer

---

## 📦 DÉPENDANCES NPM À RETIRER

### Channels
```json
"@whiskeysockets/baileys": "7.0.0-rc.9",          // WhatsApp
"discord-api-types": "^0.38.38",                   // Discord
"@buape/carbon": "0.14.0",                         // Discord
"@slack/bolt": "^4.6.0",                          // Slack
"@slack/web-api": "^7.13.0",                      // Slack
"signal-utils": "^0.21.1",                        // Signal
"@line/bot-sdk": "^10.6.0",                       // Line
"@larksuiteoapi/node-sdk": "^1.58.0",             // Feishu/Lark
```

### Voice/TTS
```json
"node-edge-tts": "^1.2.10",                       // TTS
```

### UI/TUI
```json
"@mariozechner/pi-tui": "0.52.9",                 // TUI
"@lit-labs/signals": "^0.2.0",                    // UI (Lit)
"@lit/context": "^1.1.6",                         // UI (Lit)
"lit": "^3.3.2",                                  // UI (Lit) - devDep
```

### Canvas
```json
"@napi-rs/canvas": "^0.1.89",                     // Canvas - peerDep
```

### Autres libs non critiques
```json
"@homebridge/ciao": "^1.3.5",                     // mDNS (pairing?)
"@lydell/node-pty": "1.2.0-beta.3",               // PTY (terminal)
"jszip": "^3.10.1",                               // ZIP (si non utilisé)
"osc-progress": "^0.3.0",                         // Progress bars
"pdfjs-dist": "^5.4.624",                         // PDF parsing
"tar": "7.5.7",                                   // TAR (si non utilisé)
"long": "^5.3.2",                                 // Utility
```

### Dev dependencies optionnelles
```json
"@grammyjs/types": "^3.24.0",                     // Telegram types
"rolldown": "1.0.0-rc.3",                         // Bundler
```

### Peer dependencies à retirer
```json
"node-llama-cpp": "3.15.1",                       // Local LLM
```

**Total :** ~25-30 dépendances à retirer

---

## 📁 FICHIERS/DOSSIERS À SUPPRIMER

### Structure principale
```
/apps/                          # Toutes les apps natives (9.8 MB)
  ├── ios/
  ├── android/
  ├── macos/
  └── shared/

/ui/                            # Web UI complète (1.5 MB)

/Swabble/                       # Swift lib (si liée aux apps natives)

/src/
  ├── whatsapp/                 # 8 KB
  ├── discord/                  # 576 KB
  ├── slack/                    # 440 KB
  ├── signal/                   # 168 KB
  ├── line/                     # 300 KB
  ├── imessage/                 # 120 KB
  ├── tui/                      # 240 KB
  ├── canvas-host/              # 52 KB
  ├── tts/
  ├── pairing/                  # Si non utilisé
  ├── node-host/
  ├── macos/                    # Si non nécessaire
  └── auto-reply/

/extensions/
  ├── whatsapp/
  ├── discord/
  ├── slack/
  ├── signal/
  ├── line/
  ├── imessage/
  ├── irc/
  ├── googlechat/
  ├── mattermost/
  ├── msteams/
  ├── twitch/
  ├── matrix/
  ├── nostr/
  ├── zalo/
  ├── zalouser/
  ├── tlon/
  ├── nextcloud-talk/
  ├── bluebubbles/
  ├── device-pair/
  ├── phone-control/
  ├── talk-voice/
  ├── voice-call/
  ├── open-prose/
  ├── lobster/
  ├── llm-task/
  ├── qwen-portal-auth/
  ├── minimax-portal-auth/
  ├── google-gemini-cli-auth/
  ├── google-antigravity-auth/
  ├── copilot-proxy/
  ├── diagnostics-otel/
  └── memory-lancedb/          # Si on garde memory-core

/skills/                        # ~60+ skills listés ci-dessus

/docs/platforms/                # Docs des channels (optionnel)
```

### Scripts à supprimer/simplifier
```
package.json scripts:
  - android:*
  - ios:*
  - mac:*
  - canvas:a2ui:*
  - tui:*
  - ui:*
  - format:swift
  - lint:swift
```

### Fichiers de config
```
/git-hooks/                     # Si non critique
/.swiftformat                   # Swift (apps natives)
/.swiftlint.yml                 # Swift (apps natives)
/apps/ios/.swiftlint.yml
/tsconfig.plugin-sdk.dts.json  # Si SDK non utilisé
```

### Tests & docs optionnels
```
/test/                         # Tests non essentiels
/docs/platforms/               # Docs channels
/docs/ja-JP/                   # i18n (optionnel)
/docs/zh-CN/                   # i18n (optionnel)
```

---

## 🎯 À CONSERVER (Minimal)

### Core nécessaire
```
/src/
  ├── gateway/              ✅ Orchestration
  ├── agents/               ✅ Agent principal
  ├── memory/               ✅ SOUL/IDENTITY/MEMORY
  ├── telegram/             ✅ Seul channel
  ├── browser/              ✅ Playwright
  ├── config/               ✅ Configuration
  ├── commands/             ✅ CLI
  ├── providers/            ✅ LLM providers
  ├── infra/                ✅ Infrastructure
  └── security/             ✅ Sécurité

/extensions/
  ├── telegram/             ✅ Telegram extension
  └── memory-core/          ✅ Memory de base

/skills/
  ├── coding-agent/         ✅ Claude Code (pi-coding-agent)
  ├── clawhub/              ✅ Hub API (optionnel mais utile)
  └── model-usage/          ✅ Stats usage (optionnel)
```

### Dépendances core
```json
"@mariozechner/pi-agent-core": "0.52.9",      ✅
"@mariozechner/pi-ai": "0.52.9",              ✅
"@mariozechner/pi-coding-agent": "0.52.9",    ✅
"grammy": "^1.40.0",                          ✅ Telegram
"@grammyjs/runner": "^2.0.3",                 ✅ Telegram
"playwright-core": "1.58.2",                  ✅ Browser
"sharp": "^0.34.5",                           ✅ Images
"undici": "^7.21.0",                          ✅ HTTP
"zod": "^4.3.6",                              ✅ Validation
"tslog": "^4.10.2",                           ✅ Logging
```

---

## 📋 ORDRE D'EXÉCUTION RECOMMANDÉ

1. **Channels** — Supprimer tous les channels sauf Telegram
2. **Apps natives** — Supprimer iOS/Android/macOS
3. **UI/TUI** — Supprimer interfaces graphiques
4. **Voice/TTS** — Supprimer tout voice
5. **Skills** — Supprimer skills inutiles (garder read/write/bash/edit)
6. **Extensions** — Nettoyer extensions
7. **Dependencies** — Nettoyer package.json
8. **Scripts** — Simplifier package.json scripts
9. **Docs** — Nettoyer docs optionnels
10. **Tests** — Adapter tests au nouveau scope

---

## 🔍 VÉRIFICATIONS POST-REFACTORING

- [ ] Gateway démarre correctement
- [ ] Telegram se connecte
- [ ] Agent fonctionne avec tools de base (read/write/bash/edit)
- [ ] web_search (Brave) opérationnel
- [ ] browser (Playwright) opérationnel
- [ ] Memory (SOUL/IDENTITY/MEMORY.md) fonctionnel
- [ ] pi-* libs intégrées correctement
- [ ] `pnpm install` sans erreurs
- [ ] `pnpm build` sans erreurs
- [ ] Tests core passent

---

## 📊 MÉTRIQUES FINALES (À MESURER)

### Avant refactoring
- Code source : ~477K lignes TypeScript
- Dependencies : ~60 deps
- Taille totale : ~50-60 MB (src + apps + ui)

### Après refactoring (estimé)
- Code source : ~200-250K lignes (-47-52%)
- Dependencies : ~35-40 deps (-33-42%)
- Taille totale : ~20-30 MB (-40-60%)

---

**Next steps :** Créer des issues/PRs pour chaque section, ou procéder par étapes manuellement.
