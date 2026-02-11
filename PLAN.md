# PLAN.md — OpenClaw Minimal

**Projet :** OpenClaw Minimal  
**Date :** 2026-02-11  
**Auteur :** Luca + Claudia

---

## 🎯 Vision

Transformer OpenClaw (multi-channel AI gateway) en version **minimaliste** optimisée pour un usage personnel avec :

- **Telegram** comme unique channel
- **Gateway** pour l'orchestration
- **Agent** avec pi-coding-agent (read/write/bash/edit)
- **Memory** style Clawdbot (SOUL/IDENTITY/MEMORY.md)
- **web_search** via Brave API
- **Browser** Playwright (optionnel)
- **UI/TUI** conservés

---

## 📊 Objectifs chiffrés

| Métrique | Avant | Cible | Réduction |
|----------|-------|-------|-----------|
| Code source | ~477K LOC | ~200K LOC | -58% |
| Dépendances npm | ~62 | ~35 | -44% |
| Extensions | 37 | 2 | -95% |
| Skills | 52 | 2-5 | -95% |
| Channels | 17 | 1 | -94% |

---

## 📁 Documentation détaillée

- **Architecture :** `work/CODEBASE.md`
- **Stack technique :** `work/STACK.md`
- **Liste des suppressions :** `work/TODO.md`
- **Plan centralisé :** `work/TODO_PLAN.md`
- **Phases détaillées :** `work/phases/phase_*.md`

---

## 🔄 Phase 1 — Préparation

> Détails : `work/phases/phase_1.md`  
> **Durée :** 1-2h | **Risque :** Faible

### Tâches

- [ ] 1.1 — Exécuter `git checkout -b feature/minimal`
- [ ] 1.2 — Exécuter `find src -name "*.ts" | xargs wc -l | tail -1` et noter le résultat
- [ ] 1.3 — Exécuter `find extensions -name "*.ts" | xargs wc -l | tail -1` et noter le résultat
- [ ] 1.4 — Exécuter `find skills -type d -maxdepth 1 | wc -l` et noter le résultat
- [ ] 1.5 — Exécuter `du -sh src/ extensions/ skills/ apps/ ui/` et noter les résultats
- [ ] 1.6 — Créer `work/METRICS_BEFORE.md` avec toutes les métriques collectées
- [ ] 1.7 — Exécuter `git add -A && git commit -m "chore: snapshot before minimal refactoring"`
- [ ] 1.8 — Exécuter `git push origin feature/minimal`

**Critères de succès :**
- Branche `feature/minimal` créée et pushée
- `work/METRICS_BEFORE.md` existe avec les métriques

---

## 🔄 Phase 2 — Suppression Apps Natives

> Détails : `work/phases/phase_2.md`  
> **Durée :** 30 min | **Risque :** Très faible

### Tâches

- [ ] 2.1 — Exécuter `rm -rf apps/ios/`
- [ ] 2.2 — Exécuter `rm -rf apps/android/`
- [ ] 2.3 — Exécuter `rm -rf apps/macos/`
- [ ] 2.4 — Exécuter `rm -rf apps/shared/`
- [ ] 2.5 — Exécuter `rm -rf Swabble/`
- [ ] 2.6 — Exécuter `rm -f .swiftformat`
- [ ] 2.7 — Exécuter `rm -f .swiftlint.yml`
- [ ] 2.8 — Éditer `package.json` : supprimer tous les scripts commençant par `android:`
- [ ] 2.9 — Éditer `package.json` : supprimer tous les scripts commençant par `ios:`
- [ ] 2.10 — Éditer `package.json` : supprimer tous les scripts commençant par `mac:`
- [ ] 2.11 — Éditer `package.json` : supprimer les scripts `format:swift` et `lint:swift`
- [ ] 2.12 — Vérifier `pnpm-workspace.yaml` et retirer référence à `apps/*` si présente
- [ ] 2.13 — Exécuter `pnpm install`
- [ ] 2.14 — Exécuter `pnpm build` et vérifier qu'il n'y a pas d'erreur
- [ ] 2.15 — Exécuter `git add -A && git commit -m "refactor: remove native apps (iOS/Android/macOS)"`

**Critères de succès :**
- Dossier `apps/` vide ou supprimé
- `Swabble/` supprimé
- `pnpm build` passe sans erreur

---

## 🔄 Phase 3 — Suppression Channels

> Détails : `work/phases/phase_3.md`  
> **Durée :** 2-3h | **Risque :** Élevé ⚠️

### 3A — Extensions channels isolées (pas de couplage)

- [ ] 3.1 — Exécuter `rm -rf extensions/irc/`
- [ ] 3.2 — Exécuter `rm -rf extensions/matrix/`
- [ ] 3.3 — Exécuter `rm -rf extensions/nostr/`
- [ ] 3.4 — Exécuter `rm -rf extensions/tlon/`
- [ ] 3.5 — Exécuter `rm -rf extensions/nextcloud-talk/`
- [ ] 3.6 — Exécuter `rm -rf extensions/mattermost/`
- [ ] 3.7 — Exécuter `rm -rf extensions/msteams/`
- [ ] 3.8 — Exécuter `rm -rf extensions/twitch/`
- [ ] 3.9 — Exécuter `rm -rf extensions/googlechat/`
- [ ] 3.10 — Exécuter `rm -rf extensions/zalo/`
- [ ] 3.11 — Exécuter `rm -rf extensions/zalouser/`
- [ ] 3.12 — Exécuter `pnpm build` et vérifier pas d'erreur

### 3B — Extensions channels avec handlers HTTP

- [ ] 3.13 — Exécuter `rm -rf extensions/discord/`
- [ ] 3.14 — Exécuter `rm -rf extensions/slack/`
- [ ] 3.15 — Exécuter `rm -rf extensions/line/`
- [ ] 3.16 — Exécuter `rm -rf extensions/feishu/`
- [ ] 3.17 — Exécuter `pnpm build` et noter les erreurs d'import

### 3C — Extensions channels complexes

- [ ] 3.18 — Exécuter `rm -rf extensions/whatsapp/`
- [ ] 3.19 — Exécuter `rm -rf extensions/signal/`
- [ ] 3.20 — Exécuter `rm -rf extensions/imessage/`
- [ ] 3.21 — Exécuter `rm -rf extensions/bluebubbles/`

### 3D — Sources channels dans src/

- [ ] 3.22 — Exécuter `rm -rf src/discord/`
- [ ] 3.23 — Exécuter `rm -rf src/slack/`
- [ ] 3.24 — Exécuter `rm -rf src/signal/`
- [ ] 3.25 — Exécuter `rm -rf src/line/`
- [ ] 3.26 — Exécuter `rm -rf src/imessage/`
- [ ] 3.27 — Exécuter `rm -rf src/whatsapp/`

### 3E — Modification Gateway (CRITIQUE)

- [ ] 3.28 — Ouvrir `src/gateway/server-http.ts` et supprimer l'import `handleSlackHttpRequest`
- [ ] 3.29 — Dans `src/gateway/server-http.ts`, supprimer le handler/route Slack
- [ ] 3.30 — Ouvrir `src/channels/dock.ts` et retirer les références aux channels supprimés
- [ ] 3.31 — Ouvrir `src/channels/registry.ts` et simplifier pour Telegram uniquement
- [ ] 3.32 — Exécuter `pnpm build` et lister toutes les erreurs

### 3F — Plugins et skills channels

- [ ] 3.33 — Exécuter `rm -f src/channels/plugins/bluebubbles-actions.ts`
- [ ] 3.34 — Exécuter `rm -f src/channels/plugins/slack.actions.ts`
- [ ] 3.35 — Exécuter `rm -f src/channels/plugins/slack.actions.test.ts`
- [ ] 3.36 — Exécuter `rm -f src/channels/plugins/whatsapp-heartbeat.ts`
- [ ] 3.37 — Chercher et supprimer autres fichiers channel-specific dans `src/channels/plugins/`
- [ ] 3.38 — Exécuter `rm -rf skills/bluebubbles/`
- [ ] 3.39 — Exécuter `rm -rf skills/imsg/`
- [ ] 3.40 — Exécuter `rm -rf skills/slack/`
- [ ] 3.41 — Exécuter `rm -rf skills/discord/`

### 3G — Dépendances npm channels

- [ ] 3.42 — Éditer `package.json` : supprimer `@whiskeysockets/baileys`
- [ ] 3.43 — Éditer `package.json` : supprimer `discord-api-types`
- [ ] 3.44 — Éditer `package.json` : supprimer `@buape/carbon`
- [ ] 3.45 — Éditer `package.json` : supprimer `@slack/bolt`
- [ ] 3.46 — Éditer `package.json` : supprimer `@slack/web-api`
- [ ] 3.47 — Éditer `package.json` : supprimer `signal-utils`
- [ ] 3.48 — Éditer `package.json` : supprimer `@line/bot-sdk`
- [ ] 3.49 — Éditer `package.json` : supprimer `@larksuiteoapi/node-sdk`

### 3H — Correction et validation

- [ ] 3.50 — Exécuter `grep -r "from.*discord\|from.*slack\|from.*whatsapp\|from.*signal\|from.*line\|from.*imessage" src/ --include="*.ts"` et corriger chaque import trouvé
- [ ] 3.51 — Exécuter `pnpm install`
- [ ] 3.52 — Exécuter `pnpm build` et corriger toute erreur restante
- [ ] 3.53 — Exécuter `git add -A && git commit -m "refactor: remove all channels except Telegram"`

**Critères de succès :**
- 17 channels supprimés
- Telegram fonctionne toujours
- `pnpm build` passe sans erreur

---

## 🔄 Phase 4 — Suppression Voice/TTS

> Détails : `work/phases/phase_4.md`  
> **Durée :** 30 min | **Risque :** Faible

### Tâches

- [ ] 4.1 — Exécuter `rm -rf src/tts/`
- [ ] 4.2 — Exécuter `rm -rf extensions/voice-call/`
- [ ] 4.3 — Exécuter `rm -rf extensions/talk-voice/`
- [ ] 4.4 — Exécuter `rm -rf skills/sag/`
- [ ] 4.5 — Exécuter `rm -rf skills/openai-whisper/`
- [ ] 4.6 — Exécuter `rm -rf skills/openai-whisper-api/`
- [ ] 4.7 — Exécuter `rm -rf skills/sherpa-onnx-tts/`
- [ ] 4.8 — Éditer `package.json` : supprimer `node-edge-tts`
- [ ] 4.9 — Exécuter `grep -r "from.*tts\|import.*tts" src/ --include="*.ts"` et corriger si nécessaire
- [ ] 4.10 — Exécuter `pnpm install`
- [ ] 4.11 — Exécuter `pnpm build` et vérifier pas d'erreur
- [ ] 4.12 — Exécuter `git add -A && git commit -m "refactor: remove voice and TTS"`

**Critères de succès :**
- Voice/TTS complètement supprimé
- `pnpm build` passe sans erreur

---

## 🔄 Phase 5 — Nettoyage Skills & Extensions

> Détails : `work/phases/phase_5.md`  
> **Durée :** 1h | **Risque :** Faible-Moyen

### 5A — Skills outils externes

- [ ] 5.1 — Exécuter `rm -rf skills/1password/`
- [ ] 5.2 — Exécuter `rm -rf skills/apple-notes/`
- [ ] 5.3 — Exécuter `rm -rf skills/apple-reminders/`
- [ ] 5.4 — Exécuter `rm -rf skills/bear-notes/`
- [ ] 5.5 — Exécuter `rm -rf skills/notion/`
- [ ] 5.6 — Exécuter `rm -rf skills/obsidian/`
- [ ] 5.7 — Exécuter `rm -rf skills/things-mac/`
- [ ] 5.8 — Exécuter `rm -rf skills/trello/`
- [ ] 5.9 — Exécuter `rm -rf skills/spotify-player/`
- [ ] 5.10 — Exécuter `rm -rf skills/songsee/`
- [ ] 5.11 — Exécuter `rm -rf skills/sonoscli/`
- [ ] 5.12 — Exécuter `rm -rf skills/openhue/`
- [ ] 5.13 — Exécuter `rm -rf skills/nano-banana-pro/`

### 5B — Skills divers

- [ ] 5.14 — Exécuter `rm -rf skills/blogwatcher/`
- [ ] 5.15 — Exécuter `rm -rf skills/blucli/`
- [ ] 5.16 — Exécuter `rm -rf skills/eightctl/`
- [ ] 5.17 — Exécuter `rm -rf skills/food-order/`
- [ ] 5.18 — Exécuter `rm -rf skills/gog/`
- [ ] 5.19 — Exécuter `rm -rf skills/goplaces/`
- [ ] 5.20 — Exécuter `rm -rf skills/local-places/`
- [ ] 5.21 — Exécuter `rm -rf skills/ordercli/`
- [ ] 5.22 — Exécuter `rm -rf skills/peekaboo/`
- [ ] 5.23 — Exécuter `rm -rf skills/wacli/`
- [ ] 5.24 — Exécuter `rm -rf skills/video-frames/`
- [ ] 5.25 — Exécuter `rm -rf skills/gifgrep/`

### 5C — Skills AI/techniques

- [ ] 5.26 — Exécuter `rm -rf skills/gemini/`
- [ ] 5.27 — Exécuter `rm -rf skills/oracle/`
- [ ] 5.28 — Exécuter `rm -rf skills/openai-image-gen/`
- [ ] 5.29 — Exécuter `rm -rf skills/mcporter/`
- [ ] 5.30 — Exécuter `rm -rf skills/nano-pdf/`
- [ ] 5.31 — Exécuter `rm -rf skills/himalaya/`
- [ ] 5.32 — Exécuter `rm -rf skills/tmux/`
- [ ] 5.33 — Exécuter `rm -rf skills/skill-creator/`
- [ ] 5.34 — Exécuter `rm -rf skills/session-logs/`
- [ ] 5.35 — Exécuter `rm -rf skills/summarize/`
- [ ] 5.36 — Exécuter `rm -rf skills/healthcheck/`
- [ ] 5.37 — Exécuter `rm -rf skills/camsnap/`
- [ ] 5.38 — Exécuter `rm -rf skills/canvas/`

### 5D — Extensions restantes

- [ ] 5.39 — Exécuter `rm -rf extensions/open-prose/`
- [ ] 5.40 — Exécuter `rm -rf extensions/lobster/`
- [ ] 5.41 — Exécuter `rm -rf extensions/llm-task/`
- [ ] 5.42 — Exécuter `rm -rf extensions/qwen-portal-auth/`
- [ ] 5.43 — Exécuter `rm -rf extensions/minimax-portal-auth/`
- [ ] 5.44 — Exécuter `rm -rf extensions/google-gemini-cli-auth/`
- [ ] 5.45 — Exécuter `rm -rf extensions/google-antigravity-auth/`
- [ ] 5.46 — Exécuter `rm -rf extensions/copilot-proxy/`
- [ ] 5.47 — Exécuter `rm -rf extensions/diagnostics-otel/`
- [ ] 5.48 — Exécuter `rm -rf extensions/memory-lancedb/`
- [ ] 5.49 — Exécuter `rm -rf extensions/device-pair/`
- [ ] 5.50 — Exécuter `rm -rf extensions/phone-control/`

### 5E — Validation

- [ ] 5.51 — Exécuter `grep -r "skills/" src/ --include="*.ts"` et vérifier aucune référence cassée
- [ ] 5.52 — Exécuter `pnpm build` et corriger si nécessaire
- [ ] 5.53 — Exécuter `git add -A && git commit -m "refactor: clean up skills and extensions"`

**Critères de succès :**
- Skills réduits à 2-5
- Extensions réduites à 2
- `pnpm build` passe

---

## 🔄 Phase 6 — Nettoyage Final & Validation

> Détails : `work/phases/phase_6.md`  
> **Durée :** 1-2h | **Risque :** Moyen

### 6A — Dépendances npm restantes

- [ ] 6.1 — Éditer `package.json` : supprimer `jszip` si non utilisé
- [ ] 6.2 — Éditer `package.json` : supprimer `pdfjs-dist` si non utilisé
- [ ] 6.3 — Éditer `package.json` : supprimer `@homebridge/ciao` si non utilisé
- [ ] 6.4 — Éditer `package.json` : supprimer `@napi-rs/canvas` des optionalDependencies
- [ ] 6.5 — Éditer `package.json` : supprimer `node-llama-cpp` des optionalDependencies

### 6B — Nettoyage configs

- [ ] 6.6 — Vérifier `pnpm-workspace.yaml` et retirer workspaces obsolètes
- [ ] 6.7 — Vérifier `tsconfig.json` et retirer paths obsolètes
- [ ] 6.8 — Vérifier `tsconfig.test.json` et retirer configs obsolètes

### 6C — Réinstallation propre

- [ ] 6.9 — Exécuter `rm -rf node_modules/`
- [ ] 6.10 — Exécuter `rm -f pnpm-lock.yaml`
- [ ] 6.11 — Exécuter `pnpm install`
- [ ] 6.12 — Exécuter `pnpm build`

### 6D — Tests automatisés

- [ ] 6.13 — Exécuter `pnpm test:unit` (ou équivalent) et noter les résultats
- [ ] 6.14 — Exécuter tests gateway : `pnpm test -- --grep "gateway"`
- [ ] 6.15 — Exécuter tests telegram : `pnpm test -- --grep "telegram"`
- [ ] 6.16 — Exécuter tests agents : `pnpm test -- --grep "agent"`

### 6E — Tests fonctionnels manuels

- [ ] 6.17 — Démarrer le gateway avec `pnpm dev` ou `node dist/entry.js gateway start`
- [ ] 6.18 — Vérifier que le gateway démarre sans erreur
- [ ] 6.19 — Configurer un bot Telegram de test si nécessaire
- [ ] 6.20 — Envoyer un message au bot Telegram et vérifier la réponse
- [ ] 6.21 — Tester le tool `read` : demander à l'agent de lire un fichier
- [ ] 6.22 — Tester le tool `write` : demander à l'agent de créer un fichier
- [ ] 6.23 — Tester le tool `bash` : demander à l'agent d'exécuter une commande
- [ ] 6.24 — Tester le tool `edit` : demander à l'agent de modifier un fichier
- [ ] 6.25 — Vérifier que SOUL.md est chargé correctement
- [ ] 6.26 — Vérifier que IDENTITY.md est chargé correctement
- [ ] 6.27 — Tester `memory_search` si disponible
- [ ] 6.28 — Accéder à l'UI web et vérifier qu'elle fonctionne
- [ ] 6.29 — Lancer le TUI et vérifier qu'il fonctionne

### 6F — Documentation finale

- [ ] 6.30 — Exécuter `find src -name "*.ts" | xargs wc -l | tail -1` et noter
- [ ] 6.31 — Exécuter `find extensions -name "*.ts" | xargs wc -l | tail -1` et noter
- [ ] 6.32 — Exécuter `find skills -type d -maxdepth 1 | wc -l` et noter
- [ ] 6.33 — Exécuter `du -sh src/ extensions/ skills/` et noter
- [ ] 6.34 — Créer `work/METRICS_AFTER.md` avec toutes les métriques et comparaison avec BEFORE
- [ ] 6.35 — Mettre à jour `README.md` si nécessaire pour refléter la version minimale

### 6G — Commit final

- [ ] 6.36 — Exécuter `git add -A && git commit -m "refactor: finalize minimal version"`
- [ ] 6.37 — Exécuter `git push origin feature/minimal`

**Critères de succès :**
- Toutes dépendances inutiles retirées
- Build et tests OK
- Fonctionnalités core validées
- Métriques documentées
- Branche pushée

---

## 🏁 Définition de "Done"

Le projet est terminé quand :
- [ ] Toutes les phases complétées (115 tâches)
- [ ] Build sans erreur
- [ ] Tests core passent
- [ ] Telegram fonctionne
- [ ] Agent répond avec tools (read/write/bash/edit)
- [ ] Memory fonctionne (SOUL/IDENTITY)
- [ ] UI fonctionne
- [ ] TUI fonctionne
- [ ] Réduction ~60% documentée
- [ ] Branche pushée
