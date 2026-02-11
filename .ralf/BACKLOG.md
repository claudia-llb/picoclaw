# 📋 BACKLOG — PicoClaw

> **Convention :** `[ ]` = À faire, `[x]` = Terminé, `[~]` = En cours

---

## Phase 1 — Préparation

### [x] 1.1 — Créer la branche de travail

**Pourquoi :** Isoler les modifications du main, permettre rollback facile.

**Comment :**

1. `git checkout -b phase-1-prep`
2. Vérifier qu'on est sur la bonne branche

**Critères de succès :**

- [ ] Branche `phase-1-prep` créée et active

---

### [x] 1.2 — Mesurer les métriques initiales

**Pourquoi :** Avoir une baseline pour mesurer l'impact du refactoring.

**Comment :**

1. Compter les lignes de code src/, extensions/, skills/
2. Compter les fichiers et dossiers
3. Mesurer taille des dossiers
4. Compter les dépendances npm

**Critères de succès :**

- [ ] Toutes les métriques collectées

---

### [x] 1.3 — Documenter dans METRICS_BEFORE.md

**Pourquoi :** Garder une trace des métriques initiales.

**Comment :**

1. Créer `work/METRICS_BEFORE.md`
2. Y écrire toutes les métriques collectées
3. Formater proprement avec tableaux

**Critères de succès :**

- [ ] `work/METRICS_BEFORE.md` créé et rempli

---

### [x] 1.4 — Commit snapshot Phase 1

**Pourquoi :** Point de sauvegarde avant modifications.

**Comment :**

1. `git add -A`
2. `git commit -m "chore: snapshot before minimal refactoring"`
3. `git push origin phase-1-prep`

**Critères de succès :**

- [ ] Commit pushé sur origin

---

## Phase 2 — Suppression Apps Natives

### [ ] 2.1 — Supprimer les dossiers apps

**Pourquoi :** Ces apps iOS/Android/macOS ne sont pas utilisées.

**Comment :**

1. `rm -rf apps/ios/ apps/android/ apps/macos/ apps/shared/`
2. `rm -rf Swabble/`

**Critères de succès :**

- [ ] Dossiers apps/\* supprimés
- [ ] Dossier Swabble supprimé

---

### [ ] 2.2 — Supprimer les fichiers config Swift

**Pourquoi :** Plus de code Swift = plus besoin de config Swift.

**Comment :**

1. `rm -f .swiftformat .swiftlint.yml`

**Critères de succès :**

- [ ] Fichiers Swift config supprimés

---

### [ ] 2.3 — Nettoyer package.json scripts

**Pourquoi :** Supprimer les scripts iOS/Android/macOS inutiles.

**Comment :**

1. Éditer package.json
2. Supprimer les scripts android:_, ios:_, mac:\*, format:swift, lint:swift

**Critères de succès :**

- [ ] Scripts mobiles supprimés de package.json

---

### [ ] 2.4 — Vérifier la compilation Phase 2

**Pourquoi :** S'assurer que les suppressions n'ont rien cassé.

**Comment :**

1. `pnpm install`
2. `pnpm build`

**Critères de succès :**

- [ ] `pnpm build` passe sans erreur

---

### [ ] 2.5 — Commit Phase 2

**Pourquoi :** Sauvegarder le travail de cette phase.

**Comment :**

1. `git add -A`
2. `git commit -m "refactor: remove native apps (iOS/Android/macOS)"`

**Critères de succès :**

- [ ] Commit créé

---

## Phase 3 — Modifications Code CRITIQUES + Suppression Channels

### [ ] 3.1 — Modifier src/plugins/runtime/index.ts

**Pourquoi :** Hub central avec imports de tous les channels. Doit être nettoyé AVANT suppression des dossiers.

**Comment :**

1. Ouvrir le fichier
2. Supprimer tous les imports des channels (Discord, Slack, Signal, Line, iMessage, WhatsApp, Web)
3. Supprimer les imports TTS
4. Garder uniquement les imports Telegram
5. Supprimer les références dans l'objet PluginRuntime

**Critères de succès :**

- [ ] Tous les imports channels supprimés sauf Telegram
- [ ] Objet PluginRuntime nettoyé

---

### [ ] 3.2 — Modifier src/channels/dock.ts

**Pourquoi :** Contient les références à tous les channels dans DOCKS.

**Comment :**

1. Supprimer les imports des channels (Discord, iMessage, Signal, Slack, WhatsApp)
2. Modifier l'objet DOCKS pour ne garder que Telegram

**Critères de succès :**

- [ ] Imports channels supprimés
- [ ] DOCKS réduit à Telegram seul

---

### [ ] 3.3 — Modifier src/channels/registry.ts

**Pourquoi :** Définit l'ordre et la config des channels.

**Comment :**

1. Modifier CHAT_CHANNEL_ORDER = ["telegram"]
2. Modifier DEFAULT_CHAT_CHANNEL = "telegram"
3. Supprimer entrées CHAT_CHANNEL_META sauf Telegram

**Critères de succès :**

- [ ] Registry réduit à Telegram seul

---

### [ ] 3.4 — Modifier src/infra/outbound/deliver.ts

**Pourquoi :** Types et imports pour l'envoi de messages multi-channel.

**Comment :**

1. Supprimer imports type des channels (Discord, iMessage, Slack, WhatsApp)
2. Supprimer imports Signal
3. Modifier type OutboundSendDeps pour ne garder que sendTelegram

**Critères de succès :**

- [ ] Imports channels supprimés
- [ ] Type OutboundSendDeps simplifié

---

### [ ] 3.5 — Modifier src/infra/outbound/outbound-session.ts

**Pourquoi :** Imports et parsing des targets multi-channel.

**Comment :**

1. Supprimer imports Discord, Slack, iMessage, Signal, WhatsApp
2. Garder import Telegram

**Critères de succès :**

- [ ] Imports channels supprimés

---

### [ ] 3.6 — Modifier src/config/types.channels.ts

**Pourquoi :** Types de config pour tous les channels.

**Comment :**

1. Supprimer imports types (Discord, GoogleChat, iMessage, IRC, MSTeams, Signal, Slack, WhatsApp)
2. Modifier type ChannelsConfig pour ne garder que Telegram

**Critères de succès :**

- [ ] Imports types channels supprimés
- [ ] Type ChannelsConfig simplifié

---

### [ ] 3.7 — Modifier src/config/types.ts

**Pourquoi :** Exports des types de tous les channels.

**Comment :**

1. Supprimer les exports des types channels (discord, googlechat, imessage, irc, msteams, signal, slack, whatsapp)

**Critères de succès :**

- [ ] Exports types channels supprimés

---

### [ ] 3.8 — Modifier src/gateway/server-http.ts

**Pourquoi :** Handler HTTP Slack à supprimer.

**Comment :**

1. Supprimer import handleSlackHttpRequest
2. Supprimer le if block du handler Slack

**Critères de succès :**

- [ ] Handler Slack supprimé

---

### [ ] 3.9 — Modifier src/cli/deps.ts

**Pourquoi :** Import Slack à supprimer.

**Comment :**

1. Supprimer import sendMessageSlack

**Critères de succès :**

- [ ] Import Slack supprimé

---

### [ ] 3.10 — Modifier src/plugin-sdk/index.ts

**Pourquoi :** Exports Slack pour SDK plugins.

**Comment :**

1. Supprimer exports Slack (accounts, onboarding, normalize, threading)

**Critères de succès :**

- [ ] Exports Slack supprimés

---

### [ ] 3.11 — Supprimer les agent tools channels

**Pourquoi :** Tools spécifiques aux channels supprimés.

**Comment :**

1. Supprimer src/agents/tools/discord-actions\*.ts (tous les fichiers)
2. Supprimer src/agents/tools/slack-actions.ts
3. Supprimer src/agents/tools/whatsapp-actions.ts

**Critères de succès :**

- [ ] Fichiers agent tools channels supprimés

---

### [ ] 3.12 — Nettoyer src/channels/plugins/

**Pourquoi :** Plugins spécifiques aux channels.

**Comment :**

1. Supprimer fichiers actions/ sauf telegram
2. Supprimer fichiers normalize/ sauf telegram
3. Supprimer fichiers onboarding/ sauf telegram
4. Supprimer fichiers outbound/ sauf telegram
5. Supprimer agent-tools/whatsapp-login.ts
6. Supprimer bluebubbles-actions.ts, slack.actions.ts, whatsapp-heartbeat.ts
7. Supprimer status-issues/ sauf ce qui reste nécessaire

**Critères de succès :**

- [ ] Plugins channels nettoyés

---

### [ ] 3.13 — Modifier src/auto-reply/reply/commands-allowlist.ts

**Pourquoi :** Imports et switch cases pour les channels.

**Comment :**

1. Supprimer imports Discord, iMessage, Signal, Slack
2. Supprimer les switch cases correspondants

**Critères de succès :**

- [ ] Imports et cases channels supprimés

---

### [ ] 3.14 — Supprimer src/auto-reply/reply/line-directives.ts

**Pourquoi :** Fichier spécifique à Line.

**Comment :**

1. `rm src/auto-reply/reply/line-directives.ts`

**Critères de succès :**

- [ ] Fichier supprimé

---

### [ ] 3.15 — Modifier src/auto-reply/reply/normalize-reply.ts

**Pourquoi :** Références à Line directives.

**Comment :**

1. Supprimer imports line-directives
2. Supprimer le code utilisant Line directives

**Critères de succès :**

- [ ] Références Line supprimées

---

### [ ] 3.16 — Modifier src/channels/plugins/group-mentions.ts

**Pourquoi :** Fonctions spécifiques à chaque channel.

**Comment :**

1. Supprimer toutes les fonctions resolve*Group* sauf Telegram

**Critères de succès :**

- [ ] Fonctions channels supprimées

---

### [ ] 3.17 — Modifier src/config/zod-schema.providers.ts

**Pourquoi :** Imports schema WhatsApp.

**Comment :**

1. Supprimer import WhatsAppConfigSchema
2. Supprimer export de zod-schema.providers-whatsapp

**Critères de succès :**

- [ ] Références WhatsApp supprimées

---

### [ ] 3.18 — Déplacer loadWebMedia

**Pourquoi :** Ce fichier est utilisé par Telegram ! Doit être déplacé AVANT suppression de src/web/.

**Comment :**

1. `mkdir -p src/media`
2. `mv src/web/media.ts src/media/web-fetch.ts`
3. Mettre à jour les imports dans tous les fichiers qui l'utilisent

**Critères de succès :**

- [ ] Fichier déplacé
- [ ] Tous les imports mis à jour

---

### [ ] 3.19 — Supprimer les dossiers channels src/

**Pourquoi :** Code des channels non utilisés.

**Comment :**

1. `rm -rf src/discord/ src/slack/ src/signal/ src/line/ src/imessage/ src/whatsapp/ src/web/`

**Critères de succès :**

- [ ] Dossiers channels supprimés

---

### [ ] 3.20 — Supprimer les fichiers config types

**Pourquoi :** Types de config des channels supprimés.

**Comment :**

1. `rm -f src/config/types.discord.ts src/config/types.googlechat.ts src/config/types.imessage.ts src/config/types.irc.ts src/config/types.msteams.ts src/config/types.signal.ts src/config/types.slack.ts src/config/types.whatsapp.ts src/config/zod-schema.providers-whatsapp.ts src/config/schema.irc.ts`

**Critères de succès :**

- [ ] Fichiers config types supprimés

---

### [ ] 3.21 — Supprimer les extensions channels

**Pourquoi :** Extensions des channels non utilisés.

**Comment :**

1. `rm -rf extensions/whatsapp/ extensions/discord/ extensions/slack/ extensions/signal/ extensions/imessage/ extensions/line/ extensions/irc/ extensions/googlechat/ extensions/mattermost/ extensions/msteams/ extensions/twitch/ extensions/matrix/ extensions/nostr/ extensions/zalo/ extensions/zalouser/ extensions/tlon/ extensions/nextcloud-talk/ extensions/bluebubbles/ extensions/feishu/`

**Critères de succès :**

- [ ] Extensions channels supprimées

---

### [ ] 3.22 — Supprimer les dépendances npm channels

**Pourquoi :** Packages des channels non utilisés.

**Comment :**

1. Éditer package.json
2. Supprimer @whiskeysockets/baileys, discord-api-types, @buape/carbon, @slack/bolt, @slack/web-api, signal-utils, @line/bot-sdk, @larksuiteoapi/node-sdk

**Critères de succès :**

- [ ] Dépendances channels supprimées de package.json

---

### [ ] 3.23 — Vérifier compilation et Commit Phase 3

**Pourquoi :** Valider que tout compile après les modifications critiques.

**Comment :**

1. `pnpm install`
2. `pnpm build`
3. `git add -A`
4. `git commit -m "refactor: remove all channels except Telegram"`

**Critères de succès :**

- [ ] `pnpm build` passe sans erreur
- [ ] Commit créé

---

## Phase 4 — Suppression Voice/TTS

### [ ] 4.1 — Modifier les fichiers TTS

**Pourquoi :** Supprimer les références TTS dans le code.

**Comment :**

1. Modifier src/plugins/runtime/index.ts : supprimer import textToSpeechTelephony
2. Modifier src/plugins/runtime/types.ts : supprimer type TextToSpeechTelephony
3. Supprimer src/agents/tools/tts-tool.ts
4. Modifier src/agents/openclaw-tools.ts : supprimer createTtsTool
5. Modifier src/agents/cli-runner/helpers.ts : supprimer buildTtsSystemPromptHint
6. Modifier src/agents/pi-embedded-runner/compact.ts : supprimer buildTtsSystemPromptHint
7. Modifier src/agents/pi-embedded-runner/run/attempt.ts : supprimer buildTtsSystemPromptHint
8. Modifier src/auto-reply/status.ts : supprimer imports TTS
9. Modifier src/config/types.ts : supprimer export types.tts
10. Modifier src/config/types.messages.ts : supprimer import TtsConfig

**Critères de succès :**

- [ ] Toutes les références TTS supprimées

---

### [ ] 4.2 — Supprimer les dossiers TTS

**Pourquoi :** Code TTS non utilisé.

**Comment :**

1. `rm -rf src/tts/`

**Critères de succès :**

- [ ] Dossier src/tts/ supprimé

---

### [ ] 4.3 — Supprimer les extensions voice

**Pourquoi :** Extensions voice non utilisées.

**Comment :**

1. `rm -rf extensions/voice-call/ extensions/talk-voice/`

**Critères de succès :**

- [ ] Extensions voice supprimées

---

### [ ] 4.4 — Supprimer les skills voice/TTS

**Pourquoi :** Skills voice non utilisés.

**Comment :**

1. `rm -rf skills/sag/ skills/openai-whisper/ skills/openai-whisper-api/ skills/sherpa-onnx-tts/`

**Critères de succès :**

- [ ] Skills voice/TTS supprimés

---

### [ ] 4.5 — Nettoyer package.json TTS

**Pourquoi :** Dépendance TTS non utilisée.

**Comment :**

1. Supprimer node-edge-tts de package.json

**Critères de succès :**

- [ ] Dépendance TTS supprimée

---

### [ ] 4.6 — Vérifier compilation et Commit Phase 4

**Pourquoi :** Valider les suppressions TTS.

**Comment :**

1. `pnpm install`
2. `pnpm build`
3. `git add -A`
4. `git commit -m "refactor: remove voice and TTS features"`

**Critères de succès :**

- [ ] `pnpm build` passe sans erreur
- [ ] Commit créé

---

## Phase 5 — Nettoyage Skills & Extensions

### [ ] 5.1 — Supprimer les skills channel-related

**Pourquoi :** Skills pour channels supprimés.

**Comment :**

1. `rm -rf skills/bluebubbles/ skills/imsg/ skills/slack/ skills/discord/`

**Critères de succès :**

- [ ] Skills channels supprimés

---

### [ ] 5.2 — Supprimer les skills outils externes

**Pourquoi :** Skills pour outils non essentiels.

**Comment :**

1. Supprimer skills de gestion notes/tâches (1password, apple-notes, apple-reminders, bear-notes, notion, obsidian, things-mac, trello)
2. Supprimer skills musique/media (spotify-player, songsee, sonoscli, video-frames, gifgrep)
3. Supprimer skills domotique (openhue, nano-banana-pro)
4. Supprimer skills divers (blogwatcher, blucli, eightctl, food-order, gog, goplaces, local-places, ordercli, peekaboo, wacli)
5. Supprimer skills AI alternatifs (gemini, oracle, openai-image-gen)
6. Supprimer skills techniques non essentiels (mcporter, nano-pdf, himalaya, tmux, skill-creator, session-logs, summarize, healthcheck, canvas, camsnap, clawhub, model-usage, voice-call)

**Critères de succès :**

- [ ] Skills non essentiels supprimés

---

### [ ] 5.3 — Supprimer les extensions restantes

**Pourquoi :** Extensions non essentielles.

**Comment :**

1. `rm -rf extensions/open-prose/ extensions/lobster/ extensions/llm-task/ extensions/qwen-portal-auth/ extensions/minimax-portal-auth/ extensions/google-gemini-cli-auth/ extensions/google-antigravity-auth/ extensions/copilot-proxy/ extensions/diagnostics-otel/ extensions/memory-lancedb/ extensions/device-pair/ extensions/phone-control/`

**Critères de succès :**

- [ ] Extensions non essentielles supprimées

---

### [ ] 5.4 — Vérifier compilation et Commit Phase 5

**Pourquoi :** Valider le nettoyage skills/extensions.

**Comment :**

1. `pnpm build`
2. `git add -A`
3. `git commit -m "refactor: clean up skills and extensions"`

**Critères de succès :**

- [ ] `pnpm build` passe sans erreur
- [ ] Commit créé

---

## Phase 6 — Nettoyage Final & Validation

### [ ] 6.1 — Nettoyer package.json restant

**Pourquoi :** Supprimer dépendances optionnelles non utilisées.

**Comment :**

1. Vérifier et supprimer si non utilisées : jszip, pdfjs-dist, @homebridge/ciao, @napi-rs/canvas, node-llama-cpp

**Critères de succès :**

- [ ] Dépendances optionnelles nettoyées

---

### [ ] 6.2 — Nettoyer les docs optionnels

**Pourquoi :** Docs des features supprimées.

**Comment :**

1. `rm -rf docs/platforms/ docs/ja-JP/ docs/zh-CN/`

**Critères de succès :**

- [ ] Docs optionnels supprimés

---

### [ ] 6.3 — Réinstaller les dépendances

**Pourquoi :** Nettoyer node_modules après toutes les suppressions.

**Comment :**

1. `rm -rf node_modules/`
2. `rm -f pnpm-lock.yaml`
3. `pnpm install`

**Critères de succès :**

- [ ] Dépendances réinstallées proprement

---

### [ ] 6.4 — Build complet

**Pourquoi :** Validation finale de la compilation.

**Comment :**

1. `pnpm build`

**Critères de succès :**

- [ ] Build passe sans erreur

---

### [ ] 6.5 — Tests de validation

**Pourquoi :** S'assurer que le core fonctionne.

**Comment :**

1. `pnpm test:unit`
2. `pnpm test -- --grep "gateway"`
3. `pnpm test -- --grep "telegram"`
4. `pnpm test -- --grep "agent"`

**Critères de succès :**

- [ ] Tests unitaires passent
- [ ] Tests gateway passent
- [ ] Tests telegram passent
- [ ] Tests agent passent

---

### [ ] 6.6 — Test fonctionnel manuel

**Pourquoi :** Valider en conditions réelles.

**Comment :**

1. Démarrer gateway
2. Tester Telegram (envoyer message, vérifier réponse)
3. Tester tools (read, write, bash, edit)
4. Tester Memory (SOUL.md, IDENTITY.md)
5. Tester TUI

**Critères de succès :**

- [ ] Gateway démarre
- [ ] Telegram fonctionne
- [ ] Tools fonctionnent
- [ ] Memory fonctionne
- [ ] TUI fonctionne

---

### [ ] 6.7 — Mesurer les métriques finales

**Pourquoi :** Quantifier l'impact du refactoring.

**Comment :**

1. Créer work/METRICS_AFTER.md
2. Mesurer LOC, fichiers, taille, dépendances
3. Comparer avec METRICS_BEFORE.md

**Critères de succès :**

- [ ] METRICS_AFTER.md créé
- [ ] Comparaison documentée

---

### [ ] 6.8 — Commit final et merge

**Pourquoi :** Finaliser le refactoring.

**Comment :**

1. `git add -A`
2. `git commit -m "refactor: finalize minimal version"`
3. Merger les branches dans main
4. `git tag v0.1.0-minimal`
5. Push tag

**Critères de succès :**

- [ ] Commit final créé
- [ ] Branches mergées
- [ ] Tag créé et pushé

---

## 📊 Résumé

| Phase     | Tâches |
| --------- | ------ |
| Phase 1   | 4      |
| Phase 2   | 5      |
| Phase 3   | 23     |
| Phase 4   | 6      |
| Phase 5   | 4      |
| Phase 6   | 8      |
| **Total** | **50** |
