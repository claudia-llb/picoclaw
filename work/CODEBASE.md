# CODEBASE.md - OpenClaw Architecture Map

**Project:** OpenClaw - Personal AI Assistant with Multi-Channel Gateway  
**Version:** 2026.2.10  
**Type:** Multi-channel AI gateway with extensible messaging integrations  
**License:** MIT  
**Total TypeScript Files:** 2,665

---

## 📋 Table of Contents

1. [Vue d'ensemble de l'architecture](#vue-densemble-de-larchitecture)
2. [Entry Points](#entry-points)
3. [Modules principaux](#modules-principaux)
4. [Graphe de dépendances](#graphe-de-dépendances)
5. [Patterns architecturaux](#patterns-architecturaux)
6. [Extensions & Plugins](#extensions--plugins)
7. [Skills System](#skills-system)
8. [Configuration & State](#configuration--state)

---

## Vue d'ensemble de l'architecture

OpenClaw est une plateforme d'assistant AI personnel qui peut communiquer via plusieurs canaux (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, etc.). Le système est organisé autour d'un **Gateway** central qui orchestre les communications entre les canaux, les agents AI, et les outils/skills.

### Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                    OpenClaw CLI (entry.ts)                  │
│                  Commander Program (cli/)                    │
└────────────────────┬────────────────────────────────────────┘
                     │
     ┌───────────────┼───────────────┐
     │               │               │
     ▼               ▼               ▼
┌─────────┐   ┌──────────┐   ┌──────────┐
│  Agent  │   │ Gateway  │   │   TUI    │
│ Command │   │  Server  │   │ Terminal │
└────┬────┘   └─────┬────┘   └──────────┘
     │              │
     │         ┌────┴─────┐
     │         │          │
     ▼         ▼          ▼
┌─────────────────────────────────┐
│       Agents Engine             │
│  - Tools (browser, canvas, etc) │
│  - Skills (extensible)          │
│  - Auth Profiles                │
│  - Provider Integration         │
└───────────┬─────────────────────┘
            │
     ┌──────┴──────┐
     │             │
     ▼             ▼
┌─────────┐   ┌──────────┐
│Channels │   │Providers │
│Plugins  │   │(AI APIs) │
└─────────┘   └──────────┘
```

### Flux de Données

1. **Inbound:** Message → Channel Plugin → Gateway → Session Manager → Agent
2. **Outbound:** Agent → Tools/Skills → Provider API → Response → Channel → User

---

## Entry Points

### 1. **openclaw.mjs** (Main CLI Entry)
- **Path:** `/openclaw.mjs`
- **Rôle:** Point d'entrée global du binaire `openclaw`
- **Imports:** `src/entry.ts`

### 2. **src/entry.ts** (CLI Bootstrap)
- **Rôle:** Initialisation du programme CLI
- **Responsabilités:**
  - Chargement `.env` (via `loadDotEnv()`)
  - Normalisation environnement (`normalizeEnv()`)
  - Installation gestionnaires d'erreurs globaux
  - Suppression warnings expérimentaux Node.js
  - Build et exécution du programme Commander
- **Key Functions:**
  - `ensureExperimentalWarningSuppressed()` - Respawn process sans warnings
  - `normalizeWindowsArgv()` - Normalisation argv sur Windows
  - Parse profile CLI args (`parseCliProfileArgs`)

### 3. **src/index.ts** (Public API)
- **Rôle:** Exports publics du package
- **Exports clés:**
  - `buildProgram()` - Construction du CLI Commander
  - Utilitaires de config/sessions
  - Helpers pour channels web
  - Process execution utilities

### 4. **src/cli/program/build-program.ts**
- **Rôle:** Construction du Commander program
- **Steps:**
  1. Créer contexte du programme
  2. Configurer l'aide (help)
  3. Enregistrer hooks pre-action
  4. Enregistrer toutes les commandes

---

## Modules principaux

### 🤖 **agents/** - Agent AI Core

**Rôle:** Cœur de l'intelligence - gestion des agents AI, authentification, profils, outils

**Fichiers clés:**
- `agent-scope.ts` - Définition du scope d'exécution des agents
- `agent-paths.ts` - Chemins de fichiers pour agents
- `anthropic-payload-log.ts` - Logging des payloads Anthropic
- `auth-health.ts` - Vérification de santé des authentifications
- `apply-patch.ts` - Application de patches/updates au runtime

**Sous-modules:**
- **auth-profiles/** - Gestion des profils d'authentification OAuth/API
- **cli-runner/** - Exécution d'agents via CLI
- **pi-embedded-helpers/** - Helpers pour agents embarqués
- **pi-extensions/** - Extensions pour agents
- **sandbox/** - Environnement isolé d'exécution
- **schema/** - Schémas de validation
- **skills/** - Système de skills extensibles
- **tools/** - Outils disponibles pour agents (browser, canvas, etc)

**Dépendances:**
- `config/` - Configuration agents
- `providers/` - Intégration fournisseurs AI
- `sessions/` - Gestion des sessions de conversation

---

### 🌐 **gateway/** - Gateway Server

**Rôle:** Serveur HTTP central qui orchestre les communications entre channels, agents, et devices

**Fichiers clés:**
- `boot.ts` - Démarrage du gateway (exécute BOOT.md au démarrage)
- `auth.ts` - Authentification du gateway
- `assistant-identity.ts` - Identité de l'assistant

**Sous-modules:**
- **protocol/** - Protocole de communication gateway
- **server/** - Implémentation serveur HTTP/WebSocket
- **server-methods/** - Méthodes RPC du serveur

**Fonctionnalités:**
- WebSocket server pour communication temps réel
- Protocol RPC pour commandes
- Gestion des devices pairés (nodes)
- Distribution des messages vers channels

**Dépendances:**
- `channels/` - Plugins de channels
- `sessions/` - Sessions utilisateur
- `pairing/` - Pairing de devices

---

### 💬 **channels/** - Channel Plugins System

**Rôle:** Abstraction des canaux de communication (Telegram, Discord, WhatsApp, etc.)

**Fichiers clés:**
- `channel-config.ts` - Configuration des channels
- `ack-reactions.ts` - Gestion des réactions (acknowledgments)
- `allowlist-match.ts` - Whitelist/allowlist matching
- `command-gating.ts` - Contrôle d'accès aux commandes
- `conversation-label.ts` - Labels de conversations

**Sous-modules:**
- **allowlists/** - Listes blanches de users/groups
- **plugins/** - Plugins pour chaque canal (telegram, discord, slack, etc.)
- **web/** - Channel web (WebChat UI)

**Channels supportés:**
- WhatsApp (via Baileys)
- Telegram (via Grammy)
- Discord (via discord-api-types)
- Slack (via @slack/bolt)
- Signal
- iMessage (macOS/iOS)
- Google Chat
- Microsoft Teams
- Matrix
- IRC
- Line
- Twitch
- Mattermost
- Nextcloud Talk
- Nostr
- Tlon
- Zalo

**Dépendances:**
- `config/types.channels.ts` - Types de configuration
- `gateway/` - Distribution des messages

---

### 🔧 **cli/** - Command Line Interface

**Rôle:** Interface en ligne de commande (Commander.js)

**Fichiers clés:**
- `program.ts` - Export du programme
- `deps.ts` - Dépendances pour commandes
- `prompt.ts` - Prompts interactifs
- `wait.ts` - Utilities d'attente
- `argv.ts` - Parsing arguments
- `banner.ts` - Bannière ASCII art

**Sous-modules:**
- **browser-cli-actions-input/** - Input pour actions browser
- **cron-cli/** - Gestion des cron jobs
- **daemon-cli/** - Commandes daemon (start/stop/status)
- **gateway-cli/** - Commandes gateway
- **node-cli/** - Commandes pour nodes (devices pairés)
- **nodes-cli/** - Gestion des nodes
- **program/** - Construction du Commander program

**Dépendances:**
- `commands/` - Implémentations des commandes
- `config/` - Configuration

---

### 📦 **commands/** - CLI Commands Implementation

**Rôle:** Implémentations des commandes CLI

**Modules:**
- **agent/** - Commande `openclaw agent` (chat direct avec l'agent)
- **channels/** - Commandes channels (list, status, etc.)
- **gateway-status/** - Status du gateway
- **models/** - Gestion des modèles AI
- **onboard-non-interactive/** - Onboarding non-interactif
- **onboarding/** - Wizard d'onboarding interactif
- **status-all/** - Status global du système

**Fichiers clés:**
- `agent.ts` - Commande principale d'interaction avec l'agent
- `agent-via-gateway.ts` - Agent via gateway (mode déporté)
- `agent.delivery.ts` - Delivery de réponses vers channels

**Dépendances:**
- `agents/` - Moteur d'agents
- `gateway/` - Communication gateway
- `sessions/` - Gestion sessions

---

### 🔌 **providers/** - AI Provider Integrations

**Rôle:** Intégration des fournisseurs d'AI (Anthropic, OpenAI, Google, etc.)

**Fichiers clés:**
- `github-copilot-auth.ts` - Auth GitHub Copilot
- `github-copilot-token.ts` - Gestion tokens Copilot
- `google-shared.ts` - Code partagé Google
- `qwen-portal-oauth.ts` - OAuth Qwen

**Providers supportés:**
- **Anthropic** (Claude)
- **OpenAI** (GPT)
- **Google** (Gemini)
- **GitHub Copilot**
- **Qwen**
- **Minimax**
- **Bedrock (AWS)**

**Dépendances:**
- `agents/auth-profiles/` - Profils d'authentification
- `config/` - Configuration providers

---

### 📝 **sessions/** - Session Management

**Rôle:** Gestion des sessions de conversation (historique, context, state)

**Fichiers clés:**
- `session-key-utils.ts` - Utilitaires clés de session
- `session-label.ts` - Labels de sessions
- `send-policy.ts` - Politiques d'envoi de messages
- `level-overrides.ts` - Override du thinking level
- `model-overrides.ts` - Override des modèles
- `transcript-events.ts` - Événements de transcript

**Sous-modules (dans config/sessions/):**
- `store.ts` - Stockage des sessions
- `transcript.ts` - Gestion des transcripts
- `group.ts` - Sessions de groupe
- `main-session.ts` - Session principale
- `paths.ts` - Chemins de fichiers sessions
- `reset.ts` - Reset de sessions

**Dépendances:**
- `config/` - Configuration
- `agents/` - Agents utilisant les sessions

---

### 🛠️ **infra/** - Infrastructure Utilities

**Rôle:** Utilitaires d'infrastructure (réseau, système, sécurité)

**Fichiers clés (sélection):**
- `ports.ts` - Gestion des ports
- `device-pairing.ts` - Pairing de devices
- `bonjour-discovery.ts` - Découverte Bonjour
- `ssh-tunnel.ts` - Tunnels SSH
- `clipboard.ts` - Gestion du clipboard
- `errors.ts` - Gestion des erreurs
- `runtime-guard.ts` - Vérification runtime Node.js
- `archive.ts` - Gestion d'archives
- `update-check.ts` - Vérification de mises à jour
- `tailscale.ts` - Intégration Tailscale
- `device-identity.ts` - Identité du device

**Sous-modules:**
- **net/** - Utilitaires réseau (fetch, SSRF protection)
- **format-time/** - Formatage de temps
- **outbound/** - Communications sortantes
- **tls/** - Gestion TLS/certificats

**Dépendances:**
- Utilisé par tous les modules

---

### 🌐 **browser/** - Browser Automation

**Rôle:** Automatisation browser (Playwright-core)

**Fichiers clés:**
- `bridge-server.ts` - Serveur bridge pour contrôle browser
- `cdp.ts` - Chrome DevTools Protocol
- `cdp.helpers.ts` - Helpers CDP

**Sous-modules:**
- **routes/** - Routes du serveur bridge

**Dépendances:**
- `playwright-core` - Automation browser
- Utilisé par `agents/tools/` pour automation web

---

### 🎨 **canvas-host/** - Canvas UI Host

**Rôle:** Hébergement d'une UI Canvas interactive (A2UI)

**Fichiers clés:**
- `server.ts` - Serveur canvas
- `a2ui.ts` - Intégration A2UI (Action-to-UI)

**Sous-modules:**
- **a2ui/** - Specification A2UI

**Dépendances:**
- `vendor/a2ui/` - Vendor A2UI renderers

---

### 🪝 **hooks/** - Extensibility Hooks

**Rôle:** Système de hooks pour étendre les fonctionnalités

**Fichiers clés:**
- `config.ts` - Configuration des hooks
- `frontmatter.ts` - Parsing frontmatter
- `bundled-dir.ts` - Hooks bundled

**Sous-modules:**
- **bundled/** - Hooks pré-packagés

---

### 🔄 **cron/** - Scheduled Tasks

**Rôle:** Gestion des tâches planifiées (cron jobs)

**Fichiers clés:**
- `delivery.ts` - Delivery de résultats cron
- `cron-protocol-conformance.ts` - Conformité protocole

**Sous-modules:**
- **isolated-agent/** - Agent isolé pour cron
- **service/** - Service cron

**Dépendances:**
- `croner` package
- `agents/` - Exécution d'agents via cron

---

### 💾 **config/** - Configuration System

**Rôle:** Configuration globale, sessions, channels, providers

**Fichiers clés:**
- `config.ts` - Configuration principale
- `agent-dirs.ts` - Répertoires agents
- `agent-limits.ts` - Limites agents
- `channel-capabilities.ts` - Capacités des channels
- `zod-schema.providers.ts` - Schémas Zod pour providers

**Sous-modules:**
- **sessions/** - Configuration sessions (voir section sessions/)

**Dépendances:**
- `zod` - Validation de schémas
- Utilisé par tous les modules

---

### 🧪 **test-helpers/** & **test-utils/** - Testing Utilities

**Rôle:** Utilitaires pour tests (fixtures, mocks, helpers)

**Dépendances:**
- `vitest` - Framework de test

---

### 🖥️ **terminal/** - Terminal UI

**Rôle:** Interface terminal (TUI)

**Fichiers clés:**
- Intégration `@mariozechner/pi-tui`

---

### 📱 **telegram/**, **discord/**, **slack/**, **whatsapp/**, **signal/**, **imessage/**, **line/** - Channel-Specific Code

**Rôle:** Code spécifique à chaque canal de communication

**Structure commune:**
- `accounts.ts` - Gestion des comptes
- `client.ts` - Client du canal
- `monitor/` - Monitoring des messages (inbound)
- `send.ts` - Envoi de messages (outbound)
- `api.ts` - API du canal

---

### 📚 **docs/** - Documentation

**Rôle:** Documentation du projet (markdown)

**Fichiers clés:**
- `slash-commands-doc.ts` - Documentation slash commands

---

### 🧩 **plugins/** - Plugin System

**Rôle:** Système de plugins extensibles

**Sous-modules:**
- **runtime/** - Runtime des plugins

---

### 🔐 **security/** - Security

**Rôle:** Sécurité (SSRF protection, exec safety, etc.)

---

### 🔗 **pairing/** - Device Pairing

**Rôle:** Pairing de devices (nodes)

**Fichiers clés:**
- `pairing-store.ts` - Store des pairings
- `pairing-messages.ts` - Messages de pairing
- `pairing-labels.ts` - Labels de pairing

---

### 🎤 **tts/** - Text-to-Speech

**Rôle:** Synthèse vocale

---

### 🖼️ **media/** - Media Handling

**Rôle:** Gestion des médias (images, vidéos, audio)

---

### 📊 **media-understanding/** - Media Understanding

**Rôle:** Analyse de médias (vision, OCR, etc.)

**Sous-modules:**
- **providers/** - Providers de vision (Anthropic, OpenAI, etc.)

---

### 💬 **markdown/** - Markdown Processing

**Rôle:** Traitement du markdown

---

### 🔧 **utils/** - General Utilities

**Rôle:** Utilitaires généraux

---

### 📜 **logging/** - Logging System

**Rôle:** Système de logging structuré

**Fichiers clés:**
- `subsystem.ts` - Logging par subsystem

---

### 🌐 **web/** - Web Server

**Rôle:** Serveur web (WebChat, API)

**Sous-modules:**
- **auto-reply/** - Auto-reply web
- **inbound/** - Messages inbound web

---

### 🪄 **wizard/** - Setup Wizard

**Rôle:** Wizard d'onboarding interactif

---

### 🎨 **tui/** - Terminal UI Components

**Rôle:** Composants TUI (Terminal User Interface)

**Sous-modules:**
- **components/** - Composants TUI
- **theme/** - Thème TUI

---

### 🍎 **macos/** - macOS Integration

**Rôle:** Intégration spécifique macOS

**Fichiers clés:**
- `gateway-daemon.ts` - Daemon launchd

---

### 🚪 **auto-reply/** - Auto-Reply System

**Rôle:** Système de réponses automatiques

**Fichiers clés:**
- `reply.ts` - Logique de réponse
- `templating.ts` - Templates de réponse
- `chunk.ts` - Chunking de messages
- `command-auth.ts` - Auth pour commandes
- `command-detection.ts` - Détection de commandes

---

### 🧠 **memory/** - Memory System

**Rôle:** Système de mémoire (context persistence)

---

### 🔗 **link-understanding/** - Link Understanding

**Rôle:** Analyse de liens (metadata, preview)

---

### 📡 **routing/** - Message Routing

**Rôle:** Routage des messages entre channels/sessions

---

### 🔌 **acp/** - Agent Client Protocol

**Rôle:** Protocole client agent (ACP)

**Fichiers clés:**
- `client.ts` - Client ACP
- `commands.ts` - Commandes ACP
- `event-mapper.ts` - Mapping d'événements

---

### 🖥️ **node-host/** - Node Hosting

**Rôle:** Hébergement de nodes (devices distants)

---

### 🔧 **daemon/** - Daemon Management

**Rôle:** Gestion du daemon (systemd/launchd)

**Fichiers clés:**
- `launchd-plist.ts` - Génération plist launchd
- `diagnostics.ts` - Diagnostics daemon
- `inspect.ts` - Inspection daemon

---

### 🔧 **process/** - Process Management

**Rôle:** Gestion de processus (exec, spawn, etc.)

**Fichiers clés:**
- `exec.ts` - Exécution de commandes

---

### 🔧 **compat/** - Compatibility Layer

**Rôle:** Compatibilité (legacy names, etc.)

---

### 📝 **scripts/** - Build Scripts

**Rôle:** Scripts de build et dev

---

### 📦 **types/** - TypeScript Types

**Rôle:** Définitions de types globales

---

### 🌐 **shared/** - Shared Utilities

**Rôle:** Utilitaires partagés

**Sous-modules:**
- **text/** - Utilitaires texte

---

## Graphe de dépendances

### Dépendances de haut niveau

```
┌──────────────────────────────────────────────────────────────┐
│                     entry.ts (Entry Point)                   │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────────────────────┐
│                  cli/program (Commander)                      │
└───────────┬───────────────────────────────────────────────────┘
            │
    ┌───────┴────────┐
    │                │
    ▼                ▼
┌─────────┐    ┌──────────┐
│commands/│    │  config/ │
└────┬────┘    └─────┬────┘
     │               │
     ▼               ▼
┌─────────────────────────────────┐
│          agents/                │
│  ┌─────────────────────────┐   │
│  │ - auth-profiles         │   │
│  │ - tools                 │   │
│  │ - skills                │   │
│  │ - sandbox               │   │
│  └─────────────────────────┘   │
└───────┬─────────────────────────┘
        │
    ┌───┴─────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────┐
│channels/│ │providers/│
└─────────┘ └──────────┘
```

### Dépendances détaillées par module

#### agents/
- **Dépend de:**
  - `config/` - Configuration
  - `providers/` - Providers AI
  - `sessions/` - Gestion sessions
  - `infra/` - Utilitaires infra
  - `security/` - Sécurité
  - `browser/` - Automation browser (tools)
  - `canvas-host/` - Canvas UI (tools)
  - `hooks/` - Hooks système

#### gateway/
- **Dépend de:**
  - `channels/` - Plugins channels
  - `sessions/` - Sessions
  - `pairing/` - Device pairing
  - `config/` - Configuration
  - `infra/` - Utilitaires infra
  - `agents/` - Exécution agents

#### channels/
- **Dépend de:**
  - `config/types.channels.ts` - Types
  - `sessions/` - Sessions
  - `infra/` - Utilitaires

#### cli/
- **Dépend de:**
  - `commands/` - Implémentations commandes
  - `config/` - Configuration
  - `infra/` - Utilitaires

#### commands/
- **Dépend de:**
  - `agents/` - Agents
  - `gateway/` - Gateway
  - `sessions/` - Sessions
  - `channels/` - Channels
  - `config/` - Configuration

#### providers/
- **Dépend de:**
  - `agents/auth-profiles/` - Auth
  - `config/` - Configuration

#### sessions/
- **Dépend de:**
  - `config/` - Configuration
  - `infra/` - Utilitaires

#### browser/
- **Dépend de:**
  - `playwright-core` - External
  - `infra/` - Utilitaires

#### canvas-host/
- **Dépend de:**
  - `vendor/a2ui/` - A2UI
  - `infra/` - Utilitaires

#### cron/
- **Dépend de:**
  - `agents/` - Agents
  - `sessions/` - Sessions
  - `croner` - External

#### hooks/
- **Dépend de:**
  - `config/` - Configuration

#### pairing/
- **Dépend de:**
  - `infra/` - Utilitaires

#### infra/
- **Dépend de:**
  - Modules système Node.js
  - Packages externes

---

## Entry Points et Flux de données

### Entry Point 1: CLI Direct (`openclaw agent`)

```
User Command:
  openclaw agent --message "Hello"
           │
           ▼
    entry.ts (bootstrap)
           │
           ▼
    cli/program.ts (Commander)
           │
           ▼
    commands/agent.ts
           │
           ▼
    agents/ (agent execution)
           │
           ├─→ providers/ (AI API call)
           │
           ├─→ tools/ (browser, canvas, etc)
           │
           └─→ skills/ (extensible skills)
           │
           ▼
    Response to stdout
```

### Entry Point 2: Gateway Mode (`openclaw gateway`)

```
User Message:
  WhatsApp/Telegram/Discord → Message
           │
           ▼
    Channel Plugin (channels/plugins/)
           │
           ▼
    Gateway Server (gateway/server/)
           │
           ▼
    Session Manager (sessions/)
           │
           ▼
    Agent Execution (agents/)
           │
           ├─→ providers/ (AI API)
           │
           ├─→ tools/ (browser, etc)
           │
           └─→ skills/ (custom)
           │
           ▼
    Response → Gateway → Channel → User
```

### Entry Point 3: Cron Jobs (`openclaw cron`)

```
Scheduled Time:
  Cron trigger
           │
           ▼
    cron/service/
           │
           ▼
    cron/isolated-agent/
           │
           ▼
    agents/ (isolated execution)
           │
           ▼
    Optional delivery to channel
```

### Entry Point 4: TUI (`openclaw tui`)

```
User Launch:
  openclaw tui
           │
           ▼
    terminal/ (TUI components)
           │
           ▼
    Interactive Terminal UI
           │
           ├─→ commands/ (execute commands)
           │
           └─→ gateway/ (status/monitoring)
```

---

## Patterns architecturaux

### 1. **Plugin Architecture**

OpenClaw utilise un système de plugins pour les channels:

**Pattern:**
```typescript
// channels/plugins/<channel>/index.ts
export const channelPlugin = {
  name: 'telegram',
  init: async (config) => { /* setup */ },
  start: async () => { /* start monitoring */ },
  stop: async () => { /* cleanup */ },
  send: async (message) => { /* send message */ }
}
```

**Avantages:**
- Extensibilité facile
- Isolation des channels
- Configuration déclarative

### 2. **Session Management Pattern**

Les sessions sont gérées via un store centralisé:

**Pattern:**
```typescript
// config/sessions/store.ts
- loadSessionStore() - Chargement du store
- saveSessionStore() - Sauvegarde du store
- resolveSessionKey() - Résolution de la clé de session
```

**Caractéristiques:**
- Persistance sur disque (JSON)
- Clés de session dérivées (user+channel)
- Transcripts historiques
- Pruning automatique

### 3. **Provider Abstraction**

Les providers AI sont abstraits via une interface commune:

**Pattern:**
```typescript
// providers/<provider>.ts
- auth() - Authentification
- createPayload() - Création du payload API
- parseResponse() - Parsing de la réponse
```

**Providers:**
- Anthropic, OpenAI, Google, Copilot, etc.
- Auth profiles avec failover
- Token rotation

### 4. **Command Pattern (CLI)**

Le CLI utilise Commander.js avec un pattern de commandes:

**Pattern:**
```typescript
// commands/<command>.ts
export function <command>Command(opts, runtime, deps) {
  // Implémentation
}

// cli/program/command-registry.ts
program
  .command('agent')
  .action((opts) => agentCommand(opts, runtime, deps))
```

### 5. **Dependency Injection**

Les dépendances sont injectées via un contexte:

**Pattern:**
```typescript
// cli/deps.ts
export function createDefaultDeps() {
  return {
    config: loadConfig(),
    logger: createLogger(),
    // ...
  }
}

// Utilisé dans commandes
function command(opts, runtime, deps) {
  const { config, logger } = deps
}
```

### 6. **Event-Driven Architecture (Gateway)**

Le gateway utilise des événements pour orchestrer:

**Pattern:**
```typescript
// gateway/server/
- WebSocket server écoute événements
- Event handlers traitent messages
- Dispatch vers channels/agents
```

### 7. **Isolated Execution (Sandbox)**

Les agents peuvent s'exécuter en isolation:

**Pattern:**
```typescript
// agents/sandbox/
- Spawn process isolé
- Communication via IPC
- Limitation ressources
```

### 8. **Hook System (Extensibility)**

Système de hooks pour étendre les fonctionnalités:

**Pattern:**
```typescript
// hooks/config.ts
- Hooks définis en frontmatter YAML
- Exécution à des points clés (pre-message, post-message, etc.)
- Extensible via fichiers .md avec frontmatter
```

### 9. **Monorepo Structure**

Le projet utilise pnpm workspaces:

**Structure:**
```
openclaw/
├── packages/
│   ├── clawdbot/    (fork OpenClaw)
│   └── moltbot/     (fork OpenClaw)
├── extensions/      (channel plugins)
├── skills/          (agent skills)
├── apps/            (native apps: macOS, iOS, Android)
└── ui/              (web UI)
```

### 10. **Configuration as Code**

Configuration déclarative en YAML/JSON + schémas Zod:

**Pattern:**
```typescript
// config/zod-schema.providers.ts
export const providerSchema = z.object({
  name: z.string(),
  auth: z.object({ /* ... */ }),
  models: z.array(/* ... */)
})

// Validation automatique
const config = providerSchema.parse(rawConfig)
```

---

## Extensions & Plugins

### Extensions (dans `/extensions/`)

Les extensions sont des packages npm séparés qui ajoutent des canaux de communication:

**Liste des extensions:**

| Extension | Description |
|-----------|-------------|
| `bluebubbles` | BlueBubbles integration (iMessage relay) |
| `copilot-proxy` | GitHub Copilot proxy |
| `device-pair` | Device pairing utilities |
| `diagnostics-otel` | OpenTelemetry diagnostics |
| `discord` | Discord channel plugin |
| `feishu` | Feishu (Lark) integration |
| `google-antigravity-auth` | Google auth helper |
| `google-gemini-cli-auth` | Gemini CLI auth |
| `googlechat` | Google Chat plugin |
| `imessage` | iMessage integration (macOS) |
| `irc` | IRC channel plugin |
| `line` | LINE messaging plugin |
| `llm-task` | LLM task utilities |
| `lobster` | Lobster integration |
| `matrix` | Matrix protocol plugin |
| `mattermost` | Mattermost plugin |
| `memory-core` | Memory system core |
| `memory-lancedb` | LanceDB memory backend |
| `minimax-portal-auth` | Minimax auth |
| `msteams` | Microsoft Teams plugin |
| `nextcloud-talk` | Nextcloud Talk plugin |
| `nostr` | Nostr protocol plugin |
| `open-prose` | Prose utilities |
| `phone-control` | Phone control utilities |
| `qwen-portal-auth` | Qwen auth |
| `signal` | Signal plugin |
| `slack` | Slack plugin |
| `talk-voice` | Voice talk utilities |
| `telegram` | Telegram plugin |
| `tlon` | Tlon (Urbit) plugin |
| `twitch` | Twitch chat plugin |
| `voice-call` | Voice call utilities |
| `whatsapp` | WhatsApp plugin (Baileys) |
| `zalo` | Zalo plugin |
| `zalouser` | Zalo user plugin |

**Structure d'une extension:**
```
extensions/<extension>/
├── package.json
├── src/
│   ├── index.ts        (entry point)
│   ├── client.ts       (client logic)
│   ├── monitor.ts      (message monitoring)
│   └── send.ts         (message sending)
└── README.md
```

---

## Skills System

### Skills (dans `/skills/`)

Les skills sont des outils extensibles que l'agent peut utiliser:

**Liste des skills:**

| Skill | Description |
|-------|-------------|
| `1password` | 1Password integration |
| `apple-notes` | Apple Notes integration |
| `apple-reminders` | Apple Reminders integration |
| `bear-notes` | Bear Notes integration |
| `blogwatcher` | Blog watching/RSS |
| `blucli` | BlueBubbles CLI |
| `bluebubbles` | BlueBubbles skill |
| `camsnap` | Camera snapshot |
| `canvas` | Canvas UI skill |
| `clawhub` | ClawHub integration |
| `coding-agent` | Coding agent (dev assistant) |
| `discord` | Discord skill |
| `eightctl` | Control utilities |
| `food-order` | Food ordering |
| `gemini` | Google Gemini skill |
| `gifgrep` | GIF search |
| `github` | GitHub integration |
| `gog` | GOG.com integration |
| `goplaces` | Google Places |
| `healthcheck` | Healthcheck utilities |
| `himalaya` | Email (Himalaya) |
| `imsg` | iMessage skill |
| `local-places` | Local places search |
| `mcporter` | Minecraft porter |
| `model-usage` | Model usage tracking |
| `nano-banana-pro` | Banana Pro utilities |
| `nano-pdf` | PDF utilities |
| `notion` | Notion integration |
| `obsidian` | Obsidian integration |
| `openai-image-gen` | OpenAI image generation |
| `openai-whisper` | Whisper transcription |
| `openai-whisper-api` | Whisper API |
| `openhue` | Philips Hue control |
| `oracle` | Oracle utilities |
| `ordercli` | Order CLI |
| `peekaboo` | Screen capture |
| `sag` | SAG utilities |
| `session-logs` | Session logs |
| `sherpa-onnx-tts` | Sherpa ONNX TTS |
| `skill-creator` | Skill creation helper |
| `slack` | Slack skill |
| `songsee` | Song recognition |
| `sonoscli` | Sonos control |
| `spotify-player` | Spotify control |
| `summarize` | Summarization |
| `things-mac` | Things (macOS) integration |
| `tmux` | Tmux control |
| `trello` | Trello integration |
| `video-frames` | Video frame extraction |
| `voice-call` | Voice call utilities |
| `wacli` | WhatsApp CLI |
| `weather` | Weather info |

**Structure d'un skill:**
```
skills/<skill>/
├── SKILL.md            (description & usage)
├── package.json        (optional, if dependencies)
├── src/                (optional, if TypeScript)
└── <skill>             (executable script)
```

**Pattern:**
- Skills are CLI tools callable by the agent
- Define inputs/outputs in SKILL.md
- Agent can call them via tool use

---

## Configuration & State

### Configuration Files

**Localisations:**
- **User config:** `~/.config/openclaw/config.yaml`
- **State dir:** `~/.config/openclaw/state/`
- **Sessions:** `~/.config/openclaw/state/sessions/`
- **Workspace:** `~/openclaw/` (default)

**Fichiers clés:**

| Fichier | Description |
|---------|-------------|
| `config.yaml` | Configuration principale |
| `state/pairing.json` | Devices pairés |
| `state/device-auth.json` | Auth devices |
| `state/sessions/<key>.json` | Sessions de conversation |
| `state/auth-profiles.json` | Profils d'authentification |
| `state/cron-jobs.json` | Cron jobs |

### Configuration Schema (config.yaml)

**Structure:**
```yaml
# Providers (AI)
providers:
  - name: anthropic
    auth:
      type: oauth
      profile: default
    models:
      - claude-opus-4
      - claude-sonnet-4

# Channels
channels:
  telegram:
    enabled: true
    phone: +1234567890
  discord:
    enabled: true
    token: xxx

# Agent
agent:
  name: "My Assistant"
  workspace: ~/openclaw/
  thinking_level: low  # low | medium | high

# Gateway
gateway:
  port: 18789
  host: 0.0.0.0
  tls: false

# Pairing
pairing:
  enabled: true
  qr_display: auto

# Skills
skills:
  enabled:
    - github
    - weather
    - canvas
```

### State Management

**Session State:**
```json
{
  "key": "user:123:telegram",
  "created": 1234567890,
  "updated": 1234567890,
  "messages": [
    {
      "role": "user",
      "content": "Hello",
      "timestamp": 1234567890
    },
    {
      "role": "assistant",
      "content": "Hi!",
      "timestamp": 1234567891
    }
  ],
  "metadata": {
    "channel": "telegram",
    "user_id": "123"
  }
}
```

**Pairing State:**
```json
{
  "nodes": [
    {
      "id": "node-123",
      "name": "iPhone",
      "type": "ios",
      "paired_at": 1234567890,
      "capabilities": ["camera", "location", "notify"]
    }
  ]
}
```

---

## Résumé des Fichiers Clés par Module

### Top 50 des fichiers les plus importants

| Fichier | Module | Rôle |
|---------|--------|------|
| `src/entry.ts` | Entry | Bootstrap CLI |
| `src/index.ts` | Entry | Public API |
| `src/cli/program/build-program.ts` | CLI | Construction Commander |
| `src/commands/agent.ts` | Commands | Commande agent principale |
| `src/gateway/boot.ts` | Gateway | Boot du gateway |
| `src/gateway/server/` | Gateway | Serveur HTTP/WS |
| `src/agents/agent-scope.ts` | Agents | Scope d'exécution |
| `src/agents/auth-profiles/` | Agents | Auth OAuth/API |
| `src/channels/channel-config.ts` | Channels | Config channels |
| `src/channels/plugins/` | Channels | Plugins de canaux |
| `src/providers/` | Providers | Intégration AI |
| `src/sessions/session-key-utils.ts` | Sessions | Clés de session |
| `src/config/config.ts` | Config | Configuration principale |
| `src/config/sessions/store.ts` | Sessions | Store sessions |
| `src/infra/ports.ts` | Infra | Gestion ports |
| `src/infra/device-pairing.ts` | Infra | Pairing devices |
| `src/browser/cdp.ts` | Browser | Chrome DevTools Protocol |
| `src/canvas-host/server.ts` | Canvas | Serveur canvas |
| `src/cron/service/` | Cron | Service cron |
| `src/hooks/config.ts` | Hooks | Configuration hooks |
| `src/pairing/pairing-store.ts` | Pairing | Store pairing |
| `src/auto-reply/reply.ts` | Auto-reply | Logique auto-reply |
| `src/logging/subsystem.ts` | Logging | Logging structuré |
| `src/utils.ts` | Utils | Utilitaires généraux |
| `src/runtime.ts` | Runtime | Runtime environment |

---

## Architecture Résumée (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│                         OPENCLAW                                │
│                    Personal AI Assistant                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   ┏━━━━▼━━━━┓          ┏━━━━▼━━━━┓          ┏━━━━▼━━━━┓
   ┃   CLI   ┃          ┃ Gateway ┃          ┃   TUI   ┃
   ┃ (entry) ┃          ┃ Server  ┃          ┃Terminal ┃
   ┗━━━━┬━━━━┛          ┗━━━━┬━━━━┛          ┗━━━━━━━━━┛
        │                    │
        └────────┬───────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┏━━━━▼━━━━┓      ┏━━━━▼━━━━┓
   ┃Commands ┃      ┃ Config  ┃
   ┃ (agent, ┃      ┃ (yaml,  ┃
   ┃ gateway)┃      ┃ sessions┃
   ┗━━━━┬━━━━┛      ┗━━━━┬━━━━┛
        │                │
        └────────┬───────┘
                 │
        ┌────────▼────────┐
        │                 │
   ┏━━━━▼━━━━━━━━━━━━━━━━━┓
   ┃   AGENTS ENGINE      ┃
   ┃ ┌──────────────────┐ ┃
   ┃ │ Auth Profiles    │ ┃
   ┃ │ (OAuth/API keys) │ ┃
   ┃ └──────────────────┘ ┃
   ┃ ┌──────────────────┐ ┃
   ┃ │ Tools            │ ┃
   ┃ │ (browser,canvas) │ ┃
   ┃ └──────────────────┘ ┃
   ┃ ┌──────────────────┐ ┃
   ┃ │ Skills           │ ┃
   ┃ │ (extensible CLI) │ ┃
   ┃ └──────────────────┘ ┃
   ┗━━━━┬━━━━━━━━━━━━━━━━━┛
        │
   ┌────┴────┐
   │         │
┏━━▼━━┓  ┏━━▼━━━━━━┓
┃Chan-┃  ┃Providers┃
┃nels ┃  ┃(AI APIs)┃
┃     ┃  ┃         ┃
┃Tele ┃  ┃Anthropic┃
┃Disc ┃  ┃OpenAI   ┃
┃Slack┃  ┃Google   ┃
┃WhatsApp┃  ┃Copilot ┃
┗━━━━━┛  ┗━━━━━━━━━┛
```

---

## Conclusion

OpenClaw est une plateforme sophistiquée avec une architecture modulaire et extensible. Les points clés:

1. **Architecture en couches:** Entry → CLI → Commands → Agents → Providers/Channels
2. **Extensibilité:** Plugins (channels), Skills (tools), Hooks (customization)
3. **Multi-canal:** Support de 20+ canaux de communication
4. **Multi-provider:** Support de 6+ providers AI avec failover
5. **State management:** Sessions persistées, transcripts, pairing
6. **Security:** SSRF protection, exec safety, sandboxing
7. **Developer-friendly:** TypeScript, Zod schemas, test coverage
8. **Monorepo:** pnpm workspaces, extensions isolées, apps natives

**Total LOC:** ~2,665 fichiers TypeScript  
**Test Coverage:** Extensive (vitest)  
**Documentation:** Complète (docs/ + inline)

---

**Generated by:** Claudia AI Subagent  
**Date:** 2025-02-11  
**Project Path:** `/Users/dev/clawd/projects/openClaw/`
