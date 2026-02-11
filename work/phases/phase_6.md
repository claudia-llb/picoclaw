# Phase 6 : Nettoyage Final & Validation

**Durée estimée :** 1-2h  
**Risque :** Moyen  
**Prérequis :** Phases 1-5 complétées

---

## 🎯 Objectif

Finaliser le nettoyage : supprimer les dépendances npm inutilisées, nettoyer les scripts, valider le build et les tests.

---

## 📋 Tâches

### 6.1 Nettoyer package.json - Dépendances

**Dépendances à supprimer (vérifier avant) :**

```json
{
  "dependencies": {
    // Channels (déjà fait en Phase 3)
    "@whiskeysockets/baileys": "...",
    "discord-api-types": "...",
    "@buape/carbon": "...",
    "@slack/bolt": "...",
    "@slack/web-api": "...",
    "signal-utils": "...",
    "@line/bot-sdk": "...",
    "@larksuiteoapi/node-sdk": "...",
    
    // Voice (déjà fait en Phase 4)
    "node-edge-tts": "...",
    
    // Potentiellement inutiles
    "jszip": "...",           // Si pas de ZIP handling
    "pdfjs-dist": "...",      // Si pas de PDF
    "@homebridge/ciao": "..." // mDNS (pairing)
  },
  "optionalDependencies": {
    "@napi-rs/canvas": "...", // Canvas (supprimé avec skills)
    "node-llama-cpp": "..."   // Local LLM
  }
}
```

### 6.2 Nettoyer package.json - Scripts

**Scripts à garder :**
```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "test": "...",
    "lint": "...",
    "format": "...",
    "typecheck": "...",
    "ui:dev": "...",      // Gardé
    "ui:build": "...",    // Gardé
    "tui:dev": "..."      // Gardé
  }
}
```

**Scripts à supprimer :**
- `android:*`, `ios:*`, `mac:*` (Phase 2)
- `format:swift`, `lint:swift` (Phase 2)
- `canvas:*` (si canvas supprimé)
- Scripts spécifiques aux features supprimées

### 6.3 Nettoyer pnpm-workspace.yaml

Vérifier que les workspaces supprimés sont retirés :
```yaml
packages:
  - "packages/*"
  # Retirer si présent :
  # - "apps/*"
```

### 6.4 Vérifier tsconfig

S'assurer que les paths supprimés ne sont plus référencés dans :
- `tsconfig.json`
- `tsconfig.test.json`

### 6.5 Nettoyer les docs optionnels

```bash
# Docs des channels supprimés
rm -rf docs/platforms/
# ou garder si utile pour référence

# i18n optionnel
rm -rf docs/ja-JP/
rm -rf docs/zh-CN/
```

### 6.6 Réinstaller les dépendances

```bash
# Nettoyer node_modules
rm -rf node_modules/
rm -f pnpm-lock.yaml

# Réinstaller
pnpm install
```

### 6.7 Build complet

```bash
pnpm build
```

### 6.8 Tests de validation

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

### 6.9 Test fonctionnel manuel

1. **Démarrer le gateway :**
   ```bash
   pnpm dev
   # ou
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
   - memory_search fonctionne

### 6.10 Mesurer les métriques finales

```bash
# Créer work/METRICS_AFTER.md
find src -name "*.ts" | xargs wc -l | tail -1
find extensions -name "*.ts" | xargs wc -l | tail -1
find skills -type d -maxdepth 1 | wc -l
du -sh src/ extensions/ skills/
cat package.json | grep -c '":'
```

### 6.11 Commit final

```bash
git add -A
git commit -m "refactor: finalize minimal version

- Clean npm dependencies
- Clean scripts
- Validate build and tests
- Document metrics

Final reduction:
- Code: ~60%
- Dependencies: ~45%
- Extensions: 95%
- Skills: 95%"

git push origin feature/minimal
```

---

## ✅ Critères de validation finale

### Build & Tests
- [ ] `pnpm install` sans erreur ni warning
- [ ] `pnpm build` sans erreur
- [ ] Tests unitaires passent
- [ ] Tests gateway passent
- [ ] Tests telegram passent

### Fonctionnel
- [ ] Gateway démarre
- [ ] Telegram se connecte
- [ ] Agent répond aux messages
- [ ] Tools fonctionnent (read/write/bash/edit)
- [ ] Memory fonctionne (SOUL/IDENTITY)
- [ ] UI accessible (si gardée)
- [ ] TUI fonctionne (si gardée)

### Documentation
- [ ] `work/METRICS_BEFORE.md` existe
- [ ] `work/METRICS_AFTER.md` créé
- [ ] README mis à jour si nécessaire

---

## 📊 Métriques finales attendues

| Métrique | Avant | Après | Réduction |
|----------|-------|-------|-----------|
| LOC TypeScript | ~477K | ~200K | **-58%** |
| Fichiers .ts | ~2665 | ~1000 | **-62%** |
| npm dependencies | ~62 | ~35 | **-44%** |
| Extensions | 37 | 2 | **-95%** |
| Skills | 52 | 2-5 | **-95%** |
| Taille src/ | ~15 MB | ~6 MB | **-60%** |
| Channels | 17 | 1 | **-94%** |

---

## 🎉 Fin du refactoring

Après cette phase, vous aurez une version **OpenClaw Minimal** avec :

✅ **Telegram** comme seul channel  
✅ **Gateway** fonctionnel  
✅ **Agent** avec pi-coding-agent (read/write/bash/edit)  
✅ **Memory** style Clawdbot (SOUL/IDENTITY)  
✅ **UI/TUI** conservés  
✅ **Browser** Playwright (optionnel)  
✅ **Libs pi-*** de Mario Zechner intégrées
