# 📋 OpenClaw Minimal - Plan de Refactoring

**Date :** 2026-02-11  
**Auteur :** Claudia  
**Version cible :** OpenClaw Minimal

---

## 🎯 Objectif

Transformer OpenClaw en version **minimaliste** avec uniquement :

| Composant | Description |
|-----------|-------------|
| **Telegram** | Seul channel de communication |
| **Gateway** | Orchestration centrale |
| **Agent** | pi-coding-agent (read/write/bash/edit) |
| **Memory** | SOUL/IDENTITY/MEMORY.md style Clawdbot |
| **web_search** | Brave API (minimal) |
| **Browser** | Playwright (optionnel, activable) |
| **UI** | Interface web (conservée) |
| **TUI** | Interface terminal (conservée) |
| **pi-*** | Librairies Mario Zechner |

---

## 📊 Résumé des réductions

| Métrique | Avant | Après | Réduction |
|----------|-------|-------|-----------|
| Code source | ~477K LOC | ~200K LOC | **-58%** |
| Dépendances npm | ~62 | ~35 | **-44%** |
| Extensions | 37 | 2 | **-95%** |
| Skills | 52 | 2-5 | **-95%** |
| Channels | 17 | 1 | **-94%** |
| Taille estimée | ~50 MB | ~20 MB | **-60%** |

---

## 📁 Phases du projet

| Phase | Nom | Durée | Risque | Documentation |
|-------|-----|-------|--------|---------------|
| 1 | Préparation | 1-2h | Faible | [phase_1.md](./phases/phase_1.md) |
| 2 | Suppression Apps Natives | 30 min | Très faible | [phase_2.md](./phases/phase_2.md) |
| 3 | Suppression Channels | 2-3h | **Élevé** ⚠️ | [phase_3.md](./phases/phase_3.md) |
| 4 | Suppression Voice/TTS | 30 min | Faible | [phase_4.md](./phases/phase_4.md) |
| 5 | Nettoyage Skills | 1h | Faible-Moyen | [phase_5.md](./phases/phase_5.md) |
| 6 | Nettoyage Final & Validation | 1-2h | Moyen | [phase_6.md](./phases/phase_6.md) |

**Durée totale estimée : 6-9 heures**

---

## 🔄 Workflow d'exécution

```
┌─────────────────────────────────────────────────────────────┐
│                    Phase 1 : Préparation                    │
│  • Créer branche feature/minimal                            │
│  • Documenter métriques initiales                           │
│  • Snapshot commit                                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Phase 2 : Apps Natives (SAFE)                  │
│  • Supprimer apps/ios, android, macos                       │
│  • Supprimer Swabble/                                       │
│  • Nettoyer scripts package.json                            │
│  • Commit & Test build                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Phase 3 : Channels (CRITIQUE) ⚠️               │
│  • Supprimer 17 channels (garder Telegram)                  │
│  • Modifier gateway/server-http.ts                          │
│  • Nettoyer channels/dock.ts                                │
│  • Supprimer dépendances npm                                │
│  • Commit & Test build                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                Phase 4 : Voice/TTS (SAFE)                   │
│  • Supprimer src/tts/                                       │
│  • Supprimer extensions voice                               │
│  • Supprimer skills TTS                                     │
│  • Commit & Test build                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Phase 5 : Skills (BULK)                     │
│  • Supprimer ~50 skills non essentiels                      │
│  • Supprimer extensions restantes                           │
│  • Garder : coding-agent, weather?, github?                 │
│  • Commit & Test build                                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Phase 6 : Validation Finale                    │
│  • Nettoyer package.json                                    │
│  • Réinstaller dépendances                                  │
│  • Tests complets                                           │
│  • Validation fonctionnelle                                 │
│  • Documenter métriques finales                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Éléments à SUPPRIMER

### Applications natives (~9.8 MB)
- `apps/ios/`
- `apps/android/`
- `apps/macos/`
- `apps/shared/`
- `Swabble/`

### Channels (17 total)
- WhatsApp, Discord, Slack, Signal, Line, iMessage
- IRC, Matrix, Nostr, Google Chat, Mattermost, MS Teams
- Twitch, Feishu, Tlon, Nextcloud Talk, BlueBubbles

### Voice/TTS
- `src/tts/`
- `extensions/voice-call/`
- `extensions/talk-voice/`
- Skills TTS (sag, whisper, sherpa)

### Skills (~50+)
- Tous sauf : coding-agent, weather?, github?

### Extensions (~35)
- Toutes sauf : telegram, memory-core

### Dépendances npm (~25-30)
- Voir [phase_3.md](./phases/phase_3.md) et [phase_6.md](./phases/phase_6.md)

---

## ✅ Éléments à GARDER

### Core
```
src/
├── gateway/         ✅ Orchestration
├── agents/          ✅ Agent core
├── telegram/        ✅ Seul channel
├── memory/          ✅ Memory system
├── browser/         ✅ Playwright
├── config/          ✅ Configuration
├── commands/        ✅ CLI
├── cli/             ✅ CLI core
├── providers/       ✅ LLM providers
├── infra/           ✅ Infrastructure
├── security/        ✅ Sécurité
├── sessions/        ✅ Sessions
├── plugins/         ✅ Plugin system
├── tui/             ✅ Terminal UI
└── web/             ✅ Web components
```

### UI
```
ui/                  ✅ Interface web complète
```

### Extensions
```
extensions/
├── telegram/        ✅ Channel Telegram
└── memory-core/     ✅ Memory de base
```

### Skills
```
skills/
├── coding-agent/    ✅ pi-coding-agent
├── weather/         ✅ Optionnel
└── github/          ✅ Optionnel
```

### Dépendances core
```json
"@mariozechner/pi-agent-core": "0.52.9"    ✅
"@mariozechner/pi-ai": "0.52.9"            ✅
"@mariozechner/pi-coding-agent": "0.52.9"  ✅
"@mariozechner/pi-tui": "0.52.9"           ✅
"grammy": "^1.40.0"                         ✅
"playwright-core": "1.58.2"                 ✅
"sharp": "^0.34.5"                          ✅
"undici": "^7.21.0"                         ✅
"zod": "^4.3.6"                             ✅
```

---

## ⚠️ Points d'attention

### Phase 3 - Couplages critiques

| Fichier | Action |
|---------|--------|
| `src/gateway/server-http.ts` | Retirer import Slack |
| `src/channels/dock.ts` | Simplifier registry |
| `src/channels/registry.ts` | Nettoyer plugins |
| Tests e2e | Adapter/supprimer |

### Ordre de suppression recommandé

1. **Apps natives** → 0 couplage
2. **Extensions isolées** → Faible couplage
3. **Modifier gateway** → Avant suppression channels
4. **Channels src/** → Après modification gateway
5. **Voice/TTS** → Isolé
6. **Skills** → Références à vérifier
7. **Dépendances npm** → À la fin

---

## 📄 Documents de référence

| Document | Description |
|----------|-------------|
| [CODEBASE.md](./CODEBASE.md) | Architecture & modules |
| [STACK.md](./STACK.md) | Stack technique & dépendances |
| [TODO.md](./TODO.md) | Liste détaillée des suppressions |
| [phases/phase_1.md](./phases/phase_1.md) | Préparation |
| [phases/phase_2.md](./phases/phase_2.md) | Apps natives |
| [phases/phase_3.md](./phases/phase_3.md) | Channels |
| [phases/phase_4.md](./phases/phase_4.md) | Voice/TTS |
| [phases/phase_5.md](./phases/phase_5.md) | Skills |
| [phases/phase_6.md](./phases/phase_6.md) | Validation |

---

## 🚀 Prochaine action

**Démarrer Phase 1 :**
```bash
cd /Users/dev/clawd/projects/openClaw
git checkout -b feature/minimal
```

---

*Document généré le 2026-02-11 par Claudia*
