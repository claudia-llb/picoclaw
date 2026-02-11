# OpenClaw - Stack Technique Complète

**Version analysée :** 2026.2.10  
**Date d'analyse :** 11 février 2025

---

## 📋 Vue d'ensemble

OpenClaw est une **gateway AI multi-canal** avec intégrations de messagerie extensibles. C'est une plateforme qui permet de connecter des agents IA à différents canaux de communication (Telegram, Discord, Slack, WhatsApp, Signal, etc.).

**Type :** Multi-channel AI gateway  
**License :** MIT  
**Architecture :** TypeScript/ESM (Node.js)

---

## 🎯 Dépendances Core (Essentielles)

### Framework & Runtime

| Package | Version | Rôle |
|---------|---------|------|
| `typescript` | ^5.9.3 | Langage principal |
| `@typescript/native-preview` | 7.0.0-dev.20260209.1 | Preview TypeScript natif |
| `tsx` | ^4.21.0 | Exécuteur TypeScript |
| `jiti` | ^2.6.1 | Runtime TypeScript JIT |
| `undici` | ^7.21.0 | HTTP client moderne (Node.js) |
| `zod` | ^4.3.6 | Validation de schémas TypeScript-first |
| `@sinclair/typebox` | 0.34.48 | Validation JSON Schema |
| `ajv` | ^8.17.1 | Validateur JSON Schema |

### Logging & CLI

| Package | Version | Rôle |
|---------|---------|------|
| `tslog` | ^4.10.2 | Logger TypeScript structuré |
| `commander` | ^14.0.3 | Parser CLI |
| `chalk` | ^5.6.2 | Couleurs terminal |
| `cli-highlight` | ^2.1.11 | Coloration syntaxique CLI |
| `@clack/prompts` | ^1.0.0 | Prompts interactifs CLI |
| `osc-progress` | ^0.3.0 | Barres de progression |

### Filesystem & Data

| Package | Version | Rôle |
|---------|---------|------|
| `dotenv` | ^17.2.4 | Variables d'environnement |
| `chokidar` | ^5.0.0 | File system watcher |
| `yaml` | ^2.8.2 | Parser YAML |
| `json5` | ^2.2.3 | Parser JSON5 (JSON avec commentaires) |
| `proper-lockfile` | ^4.1.2 | Lock files système |
| `tar` | 7.5.7 | Archives TAR |
| `jszip` | ^3.10.1 | Archives ZIP |

---

## 🤖 Dépendances pi-* (Mario Zechner Agent Framework)

**Auteur :** Mario Zechner (@badlogic)  
**Rôle :** Framework d'agents IA modulaire développé spécifiquement pour OpenClaw

### Détail des packages pi-*

| Package | Version | Rôle détaillé |
|---------|---------|--------------|
| `@mariozechner/pi-agent-core` | 0.52.9 | **Core** - Moteur d'agents, orchestration, lifecycle, memory, hooks |
| `@mariozechner/pi-ai` | 0.52.9 | **AI Providers** - Abstraction unifiée pour LLMs (Anthropic, OpenAI, etc.) |
| `@mariozechner/pi-coding-agent` | 0.52.9 | **Coding Agent** - Agent spécialisé pour génération et exécution de code |
| `@mariozechner/pi-tui` | 0.52.9 | **Terminal UI** - Interface utilisateur terminal (TUI) pour les agents |

**Tous en version 0.52.9 → Version synchronisée pour compatibilité**

### Rôle stratégique du framework pi-*

- **Agent lifecycle management** - Gestion du cycle de vie des agents (spawn, kill, orchestration)
- **Multi-model support** - Abstraction unifiée pour communiquer avec différents LLMs
- **Memory systems** - Gestion de la mémoire court/long terme des agents
- **Tool calling** - Système d'appel de fonctions pour les agents
- **Session management** - Gestion des sessions multi-agents
- **TUI** - Interface terminal riche pour debug et monitoring
- **Coding capabilities** - Capacité des agents à écrire et exécuter du code

---

## 📡 Channels (Intégrations Messagerie)

### Telegram
| Package | Version | Rôle |
|---------|---------|------|
| `grammy` | ^1.40.0 | Framework Telegram Bot moderne |
| `@grammyjs/runner` | ^2.0.3 | Runner long-polling/webhook |
| `@grammyjs/transformer-throttler` | ^1.2.1 | Rate limiting |
| `@grammyjs/types` | ^3.24.0 | Types TypeScript (dev) |

### Discord
| Package | Version | Rôle |
|---------|---------|------|
| `@buape/carbon` | 0.14.0 | Framework Discord bot |
| `discord-api-types` | ^0.38.38 | Types Discord API |

### Slack
| Package | Version | Rôle |
|---------|---------|------|
| `@slack/bolt` | ^4.6.0 | Framework Slack app |
| `@slack/web-api` | ^7.13.0 | API client Slack |

### WhatsApp
| Package | Version | Rôle |
|---------|---------|------|
| `@whiskeysockets/baileys` | 7.0.0-rc.9 | Client WhatsApp multi-device (reverse-engineered) |
| `qrcode-terminal` | ^0.12.0 | QR code auth WhatsApp |

### Signal
| Package | Version | Rôle |
|---------|---------|------|
| `signal-utils` | ^0.21.1 | Utilitaires Signal protocol |

### LINE
| Package | Version | Rôle |
|---------|---------|------|
| `@line/bot-sdk` | ^10.6.0 | SDK officiel LINE bot |

### Lark (Feishu)
| Package | Version | Rôle |
|---------|---------|------|
| `@larksuiteoapi/node-sdk` | ^1.58.0 | SDK officiel Lark/Feishu |

---

## 🤖 AI Providers

### AWS Bedrock
| Package | Version | Rôle |
|---------|---------|------|
| `@aws-sdk/client-bedrock` | ^3.986.0 | Client AWS Bedrock (Claude, Llama, etc.) |

### Protocol ACP
| Package | Version | Rôle |
|---------|---------|------|
| `@agentclientprotocol/sdk` | 0.14.1 | Agent Client Protocol SDK |

### Local LLMs (Peer Dependencies)
| Package | Version | Rôle |
|---------|---------|------|
| `node-llama-cpp` | 3.15.1 | Inference locale Llama.cpp (optionnel) |
| `ollama` | ^0.6.3 | Client Ollama (dev) |

---

## 🛠️ Tools & Capabilities

### Browser Automation
| Package | Version | Rôle |
|---------|---------|------|
| `playwright-core` | 1.58.2 | Automation navigateur (headless) |

### Document Processing
| Package | Version | Rôle |
|---------|---------|------|
| `@mozilla/readability` | ^0.6.0 | Extraction contenu web (reader mode) |
| `linkedom` | ^0.18.12 | DOM léger (parsing HTML) |
| `pdfjs-dist` | ^5.4.624 | Parser PDF (Mozilla PDF.js) |
| `markdown-it` | ^14.1.0 | Parser/renderer Markdown |

### Media Processing
| Package | Version | Rôle |
|---------|---------|------|
| `sharp` | ^0.34.5 | ⚠️ **Binaire natif** - Manipulation d'images (resize, convert) |
| `file-type` | ^21.3.0 | Détection type MIME |
| `@napi-rs/canvas` | ^0.1.89 | ⚠️ **Binaire natif** - Canvas (peer dep, optionnel) |

### TTS (Text-to-Speech)
| Package | Version | Rôle |
|---------|---------|------|
| `node-edge-tts` | ^1.2.10 | TTS via Edge API (Microsoft) |

### Database
| Package | Version | Rôle |
|---------|---------|------|
| `sqlite-vec` | 0.1.7-alpha.2 | ⚠️ **Binaire natif** - SQLite avec vector search |
| `long` | ^5.3.2 | Support int64 pour bases de données |

### Terminal & Process
| Package | Version | Rôle |
|---------|---------|------|
| `@lydell/node-pty` | 1.2.0-beta.3 | ⚠️ **Binaire natif** - Pseudo-terminal (PTY) |
| `ws` | ^8.19.0 | WebSocket client/server |

### Scheduling
| Package | Version | Rôle |
|---------|---------|------|
| `croner` | ^10.0.1 | Cron jobs (alternative à node-cron) |

### Network
| Package | Version | Rôle |
|---------|---------|------|
| `@homebridge/ciao` | ^1.3.5 | mDNS/Bonjour (découverte réseau local) |
| `express` | ^5.2.1 | Serveur HTTP/REST |

---

## 🧪 DevDependencies (Développement)

### Build Tools
| Package | Version | Rôle |
|---------|---------|------|
| `tsdown` | ^0.20.3 | Bundler TypeScript (alternative esbuild) |
| `rolldown` | 1.0.0-rc.3 | Bundler Rust (alternative Rollup) |
| `oxfmt` | 0.28.0 | Formatter Rust (alternative Prettier) |
| `oxlint` | ^1.43.0 | Linter Rust (alternative ESLint) |
| `oxlint-tsgolint` | ^0.11.5 | Plugin TSGo lint pour oxlint |

### Testing
| Package | Version | Rôle |
|---------|---------|------|
| `vitest` | ^4.0.18 | Test runner (alternative Jest) |
| `@vitest/coverage-v8` | ^4.0.18 | Coverage V8 |

### UI Components (Canvas/TUI)
| Package | Version | Rôle |
|---------|---------|------|
| `lit` | ^3.3.2 | Web components framework |
| `@lit/context` | ^1.1.6 | Context API pour Lit |
| `@lit-labs/signals` | ^0.2.0 | Signals reactivity |

### Types
| Package | Version | Rôle |
|---------|---------|------|
| `@types/node` | ^25.2.2 | Types Node.js |
| `@types/express` | ^5.0.6 | Types Express |
| `@types/markdown-it` | ^14.1.2 | Types markdown-it |
| `@types/proper-lockfile` | ^4.1.4 | Types proper-lockfile |
| `@types/qrcode-terminal` | ^0.12.2 | Types qrcode-terminal |
| `@types/ws` | ^8.18.1 | Types WebSocket |

---

## ⚠️ Dépendances Lourdes (Binaires Natifs)

Ces dépendances nécessitent une compilation lors de l'installation et sont **platform-dependent** (macOS, Linux, Windows).

| Package | Type | Taille estimée | Impact |
|---------|------|----------------|--------|
| `sharp` | Image processing | ~10 MB | ⚠️ **Critique** - Compilation C++ (libvips) |
| `@lydell/node-pty` | Terminal emulation | ~2 MB | ⚠️ Compilation C++ (pseudo-terminal) |
| `sqlite-vec` | Database | ~5 MB | ⚠️ Compilation C (SQLite + vector ext) |
| `@napi-rs/canvas` | Canvas rendering | ~8 MB | ⚠️ Optionnel (peer dep) - Compilation Rust |
| `node-llama-cpp` | LLM inference | ~50-500 MB | ⚠️ Optionnel (peer dep) - Très lourd |
| `@whiskeysockets/baileys` | WhatsApp | ~3 MB | ⚠️ Dépendances natives transitives |
| `playwright-core` | Browser automation | ~200 MB | ⚠️ Télécharge binaires Chromium |

### Configuration pnpm pour binaires

```json
"onlyBuiltDependencies": [
  "@lydell/node-pty",
  "@matrix-org/matrix-sdk-crypto-nodejs",
  "@napi-rs/canvas",
  "@whiskeysockets/baileys",
  "authenticate-pam",
  "esbuild",
  "node-llama-cpp",
  "protobufjs",
  "sharp"
]
```

**Note :** `onlyBuiltDependencies` restreint la compilation aux packages listés pour optimiser l'installation.

---

## 🔧 Runtime Requirements

### Node.js
```json
"engines": {
  "node": ">=22.12.0"
}
```

**⚠️ Node.js 22.12+ requis** - Utilise des features ESM avancées et APIs récentes.

### Package Manager
```json
"packageManager": "pnpm@10.23.0"
```

**pnpm 10.23.0** - Strict, gestion optimisée des peer deps.

**Configuration pnpm :**
- `minimumReleaseAge: 2880` (48h) - Évite les versions trop récentes
- Overrides pour sécurité : `fast-xml-parser`, `qs`, `tar`, `tough-cookie`

### Système d'exploitation
| OS | Support | Notes |
|----|---------|-------|
| **macOS** | ✅ Complet | Apps natives (apps/macos, apps/ios) |
| **Linux** | ✅ Complet | Binaires natifs compilables |
| **Windows** | ⚠️ Partiel | Compilation binaires natifs complexe |

### Dépendances système (OS-level)

Pour compiler les binaires natifs :

**macOS :**
```bash
xcode-select --install  # Build tools
brew install python3    # Pour node-gyp
```

**Linux (Debian/Ubuntu) :**
```bash
apt-get install -y build-essential python3 libvips-dev libsqlite3-dev
```

**Toutes plateformes :**
- Python 3.x (node-gyp)
- C/C++ compiler (gcc/clang)
- Git

---

## 📦 Architecture du Projet

### Structure des dossiers (src/)

| Dossier | Rôle |
|---------|------|
| `agents/` | Système d'agents AI |
| `channels/` | Intégrations messagerie (Telegram, Discord, Slack, etc.) |
| `providers/` | Providers AI (Anthropic, OpenAI, Bedrock, etc.) |
| `gateway/` | Gateway protocol & API |
| `cli/` | CLI interface |
| `tui/` | Terminal UI |
| `browser/` | Browser automation (Playwright) |
| `memory/` | Système de mémoire agents |
| `plugins/` | Système de plugins extensibles |
| `infra/` | Infrastructure (DB, config, etc.) |
| `daemon/` | Daemon mode |
| `cron/` | Scheduled tasks |
| `hooks/` | Lifecycle hooks |
| `security/` | Security layer |
| `terminal/` | Terminal emulation (PTY) |
| `tts/` | Text-to-speech |
| `media/` | Media processing |
| `utils/` | Utilitaires communs |

### Apps natives

| App | Path | Plateforme |
|-----|------|-----------|
| macOS app | `apps/macos/` | macOS (Swift) |
| iOS app | `apps/ios/` | iOS (Swift) |
| Android app | `apps/android/` | Android (Kotlin/Gradle) |

### Format du projet

- **Type :** ESM (`"type": "module"`)
- **Main entry :** `dist/index.js`
- **CLI entry :** `openclaw.mjs`
- **Plugin SDK :** `dist/plugin-sdk/index.js`

---

## 🔐 Security Overrides

Le projet force des versions spécifiques pour des raisons de sécurité :

```json
"overrides": {
  "fast-xml-parser": "5.3.4",    // CVE fixes
  "form-data": "2.5.4",           // Compatibility
  "qs": "6.14.1",                 // CVE fixes
  "@sinclair/typebox": "0.34.48", // Version lock
  "tar": "7.5.7",                 // CVE fixes
  "tough-cookie": "4.1.3"         // CVE fixes
}
```

---

## 🚀 Scripts principaux

### Développement
- `pnpm dev` - Lance le dev server
- `pnpm gateway:dev` - Gateway mode (skip channels)
- `pnpm tui:dev` - TUI dev mode
- `pnpm ui:dev` - UI dev server

### Build
- `pnpm build` - Build complet (TypeScript → dist/)
- `pnpm ui:build` - Build UI
- `pnpm canvas:a2ui:bundle` - Bundle canvas A2UI

### Testing
- `pnpm test` - Tests unitaires
- `pnpm test:e2e` - Tests e2e
- `pnpm test:live` - Tests avec APIs réelles
- `pnpm test:docker:all` - Suite Docker complète

### Qualité de code
- `pnpm check` - Format + lint + types
- `pnpm format` - Format avec oxfmt (Rust)
- `pnpm lint` - Lint avec oxlint (Rust)
- `pnpm lint:fix` - Auto-fix

### Apps natives
- `pnpm mac:package` - Package macOS app
- `pnpm ios:run` - Build & run iOS
- `pnpm android:run` - Build & run Android

---

## 📊 Statistiques

### Dépendances totales
- **Production :** 62 packages
- **Développement :** 21 packages
- **Peer (optionnelles) :** 2 packages

### Catégories
| Catégorie | Nombre |
|-----------|--------|
| Channels | 11 packages (Telegram, Discord, Slack, WhatsApp, Signal, LINE, Lark) |
| AI/Agents | 5 packages (pi-* framework + ACP + Bedrock) |
| Tools | 15 packages (browser, docs, media, TTS, DB) |
| Core/Infra | 20 packages (runtime, logging, CLI, filesystem) |
| Dev tools | 21 packages (build, test, lint, types) |

### Binaires natifs
- **7 packages** avec compilation native
- **Taille totale estimée :** ~300 MB (avec Playwright)
- **Taille sans Playwright :** ~100 MB

---

## 🎯 Points clés

### Forces
✅ **Architecture modulaire** - Channels, providers, plugins extensibles  
✅ **Multi-plateforme** - Web, CLI, TUI, macOS, iOS, Android  
✅ **Framework pi-* mature** - Agent orchestration avancée  
✅ **Type-safe** - TypeScript strict + Zod + Typebox  
✅ **Modern tooling** - Rust toolchain (oxlint, oxfmt, rolldown)  
✅ **Testing robuste** - Unit, e2e, live, Docker tests  

### Défis
⚠️ **Binaires natifs** - Compilation complexe (7 packages)  
⚠️ **Node.js 22.12+** - Version très récente  
⚠️ **Taille totale** - ~300 MB avec tous les binaires  
⚠️ **WhatsApp reverse-engineered** - Peut casser (baileys)  
⚠️ **pi-* en 0.x** - API non stable  

### Recommandations

1. **Docker fortement recommandé** pour éviter les problèmes de compilation native
2. **Utiliser pnpm** (pas npm/yarn) - Configuration stricte
3. **Tests Docker** avant déploiement - `pnpm test:docker:all`
4. **Monitoring des CVEs** - Overrides de sécurité réguliers
5. **Fallback sans peer deps** - Canvas et Llama.cpp optionnels

---

**Dernière mise à jour :** 11 février 2025  
**Analyste :** Claudia (Subagent)
