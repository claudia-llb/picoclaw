# Phase 5 : Nettoyage Skills

**Durée estimée :** 1h  
**Risque :** Faible à moyen  
**Prérequis :** Phase 4 complétée

---

## 🎯 Objectif

Supprimer tous les skills non essentiels et ne garder que ceux nécessaires pour le use case minimal.

---

## 📋 Skills à GARDER

| Skill | Raison |
|-------|--------|
| `skills/coding-agent/` | Wrapper pi-coding-agent (read/write/bash/edit) |
| `skills/weather/` | Optionnel mais simple et utile |
| `skills/github/` | Optionnel si besoin Git |

**Note :** web_search (Brave) sera implémenté comme tool built-in, pas comme skill.

---

## 📋 Tâches

### 5.1 Supprimer les skills channel-related

```bash
cd /Users/dev/clawd/projects/openClaw/skills

# Déjà supprimés en Phase 3, vérifier
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
```

### 5.3 Supprimer les skills AI/LLM alternatifs

```bash
rm -rf gemini/           # Si on garde Brave uniquement pour search
rm -rf oracle/
rm -rf openai-image-gen/ # Optionnel
```

### 5.4 Supprimer les skills techniques non essentiels

```bash
rm -rf mcporter/         # MCP porter
rm -rf nano-pdf/         # PDF parsing
rm -rf himalaya/         # Email CLI
rm -rf tmux/             # Terminal multiplexer
rm -rf skill-creator/    # Meta skill
rm -rf session-logs/     # Logging skill
rm -rf summarize/        # Optionnel
rm -rf healthcheck/      # Optionnel
```

### 5.5 Supprimer les extensions non essentielles restantes

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
rm -rf memory-lancedb/    # Garder memory-core uniquement
rm -rf device-pair/
rm -rf phone-control/
```

### 5.6 Vérifier les références aux skills supprimés

```bash
# Chercher les références
grep -r "skills/" src/ --include="*.ts" | grep -v ".test.ts"
```

### 5.7 Commit

```bash
git add -A
git commit -m "refactor: clean up skills and extensions

- Remove 50+ non-essential skills
- Remove 10+ non-essential extensions
- Keep only: coding-agent, weather (optional), github (optional)
- Keep extensions: telegram, memory-core

Reduction: ~60 skills, ~10 extensions"
```

---

## 📁 Skills supprimés (~50+)

### Outils externes
- 1password, apple-notes, apple-reminders, bear-notes
- notion, obsidian, things-mac, trello
- spotify-player, songsee, sonoscli
- openhue, nano-banana-pro
- blogwatcher, blucli, eightctl, food-order
- gog, goplaces, local-places, ordercli
- peekaboo, wacli

### Media
- video-frames, gifgrep

### AI/LLM
- gemini, oracle, openai-image-gen

### Techniques
- mcporter, nano-pdf, himalaya, tmux
- skill-creator, session-logs, summarize, healthcheck

### Extensions supprimées
- open-prose, lobster, llm-task
- qwen-portal-auth, minimax-portal-auth
- google-gemini-cli-auth, google-antigravity-auth
- copilot-proxy, diagnostics-otel
- memory-lancedb, device-pair, phone-control

---

## ✅ Critères de validation

- [ ] Skills réduits à 2-5 essentiels
- [ ] Extensions réduites à 2 (telegram, memory-core)
- [ ] Aucune référence cassée vers skills supprimés
- [ ] `pnpm build` sans erreur
- [ ] Skills restants fonctionnels

---

## 📊 État après Phase 5

| Métrique | Avant | Après Phase 5 |
|----------|-------|---------------|
| Skills | 52 | 2-5 |
| Extensions | 37 | 2 |
| Channels | 17 | 1 |

---

## ⏭️ Phase suivante

→ **Phase 6 : Nettoyage Final & Validation**
