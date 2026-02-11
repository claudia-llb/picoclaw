# Phase 3 : Suppression Channels

**Durée estimée :** 2-3h  
**Risque :** Élevé ⚠️  
**Prérequis :** Phase 2 complétée

---

## 🎯 Objectif

Supprimer tous les channels sauf **Telegram**. C'est la phase la plus critique car il y a des couplages dans le gateway et le système de channels.

---

## 📋 Tâches

### 3.1 Supprimer les extensions channels (isolées)

**Ordre : du moins couplé au plus couplé**

#### Étape 1 : Extensions sans dépendances externes
```bash
cd /Users/dev/clawd/projects/openClaw

rm -rf extensions/irc/
rm -rf extensions/matrix/
rm -rf extensions/nostr/
rm -rf extensions/tlon/
rm -rf extensions/nextcloud-talk/
rm -rf extensions/mattermost/
rm -rf extensions/msteams/
rm -rf extensions/twitch/
rm -rf extensions/googlechat/
rm -rf extensions/zalo/
rm -rf extensions/zalouser/
```

#### Étape 2 : Extensions avec handlers HTTP
```bash
rm -rf extensions/slack/
rm -rf extensions/discord/
rm -rf extensions/line/
rm -rf extensions/feishu/
```

#### Étape 3 : Extensions avec state complexe
```bash
rm -rf extensions/whatsapp/
rm -rf extensions/signal/
rm -rf extensions/imessage/
rm -rf extensions/bluebubbles/
```

### 3.2 Supprimer les dossiers src/ channels

```bash
rm -rf src/discord/
rm -rf src/slack/
rm -rf src/signal/
rm -rf src/line/
rm -rf src/imessage/
rm -rf src/whatsapp/
```

### 3.3 Nettoyer les plugins channels

```bash
# Garder uniquement les plugins Telegram
cd src/channels/plugins/

# Supprimer les plugins spécifiques aux autres channels
rm -f bluebubbles-actions.ts
rm -f slack.actions.ts
rm -f slack.actions.test.ts
rm -f whatsapp-heartbeat.ts
# ... autres fichiers channel-specific
```

### 3.4 Modifier les fichiers Gateway ⚠️ CRITIQUE

#### `src/gateway/server-http.ts`
```typescript
// SUPPRIMER cette ligne :
import { handleSlackHttpRequest } from "../slack/http/index.js";

// SUPPRIMER le handler Slack dans le router
```

#### `src/gateway/server-channels.ts`
```typescript
// Simplifier pour ne garder que Telegram
// Retirer les références aux autres channels
```

#### `src/channels/dock.ts`
```typescript
// Nettoyer le registry des channels
// Ne garder que l'enregistrement Telegram
```

#### `src/channels/registry.ts`
```typescript
// Simplifier l'enregistrement des plugins
```

### 3.5 Supprimer les skills channel-related

```bash
rm -rf skills/bluebubbles/
rm -rf skills/imsg/
rm -rf skills/slack/
rm -rf skills/discord/
```

### 3.6 Nettoyer package.json dépendances

**Dépendances à supprimer :**
```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "7.0.0-rc.9",
    "discord-api-types": "^0.38.38",
    "@buape/carbon": "0.14.0",
    "@slack/bolt": "^4.6.0",
    "@slack/web-api": "^7.13.0",
    "signal-utils": "^0.21.1",
    "@line/bot-sdk": "^10.6.0",
    "@larksuiteoapi/node-sdk": "^1.58.0"
  }
}
```

### 3.7 Vérifier et corriger les imports cassés

```bash
# Trouver les imports cassés
pnpm build 2>&1 | grep -i "cannot find\|not found\|error"

# Corriger chaque import manuellement
```

### 3.8 Commit intermédiaire après chaque étape

```bash
git add -A
git commit -m "refactor: remove [channel] support"
```

---

## 📁 Éléments supprimés

### Extensions (17 total)
| Extension | Taille estimée |
|-----------|----------------|
| `extensions/whatsapp/` | 50 KB |
| `extensions/discord/` | 80 KB |
| `extensions/slack/` | 60 KB |
| `extensions/signal/` | 40 KB |
| `extensions/line/` | 45 KB |
| `extensions/imessage/` | 35 KB |
| `extensions/irc/` | 30 KB |
| `extensions/matrix/` | 40 KB |
| `extensions/nostr/` | 50 KB |
| `extensions/googlechat/` | 35 KB |
| `extensions/mattermost/` | 35 KB |
| `extensions/msteams/` | 40 KB |
| `extensions/twitch/` | 45 KB |
| `extensions/feishu/` | 55 KB |
| `extensions/tlon/` | 30 KB |
| `extensions/nextcloud-talk/` | 30 KB |
| `extensions/bluebubbles/` | 40 KB |

### Sources src/
| Dossier | Taille |
|---------|--------|
| `src/discord/` | 576 KB |
| `src/slack/` | 440 KB |
| `src/signal/` | 168 KB |
| `src/line/` | 300 KB |
| `src/imessage/` | 120 KB |
| `src/whatsapp/` | 8 KB |

### Dépendances npm (8)
| Package | Usage |
|---------|-------|
| `@whiskeysockets/baileys` | WhatsApp |
| `discord-api-types` | Discord |
| `@buape/carbon` | Discord |
| `@slack/bolt` | Slack |
| `@slack/web-api` | Slack |
| `signal-utils` | Signal |
| `@line/bot-sdk` | LINE |
| `@larksuiteoapi/node-sdk` | Feishu/Lark |

---

## ⚠️ Points d'attention critiques

### Couplages identifiés

1. **`src/gateway/server-http.ts`**
   - Import direct de Slack HTTP handler
   - Doit être modifié AVANT suppression de src/slack/

2. **`src/channels/dock.ts`**
   - Registry de tous les channels
   - Référence potentiellement tous les channels

3. **Tests e2e**
   - `src/gateway/server.agent.gateway-server-agent-b.e2e.test.ts`
   - Import du plugin WhatsApp pour tests
   - Supprimer ou modifier ces tests

### Ordre de suppression recommandé

```
1. Extensions isolées (pas de couplage)
   ↓
2. Modifier gateway/server-http.ts (retirer Slack)
   ↓
3. Supprimer src/slack/, src/discord/, etc.
   ↓
4. Nettoyer channels/dock.ts et registry.ts
   ↓
5. Supprimer extensions restantes
   ↓
6. Nettoyer package.json
   ↓
7. pnpm install && pnpm build
```

---

## ✅ Critères de validation

- [ ] Toutes les extensions supprimées sauf `telegram/` et `memory-core/`
- [ ] Tous les dossiers src/ channels supprimés sauf Telegram
- [ ] `src/gateway/server-http.ts` modifié (Slack retiré)
- [ ] `src/channels/dock.ts` simplifié
- [ ] Dépendances npm retirées de package.json
- [ ] `pnpm install` sans erreur
- [ ] `pnpm build` sans erreur
- [ ] Telegram fonctionne toujours

---

## 🧪 Tests de validation

```bash
# Vérifier que Telegram est toujours fonctionnel
pnpm test -- --grep "telegram"

# Vérifier le gateway
pnpm test -- --grep "gateway"

# Build complet
pnpm build
```

---

## ⏭️ Phase suivante

→ **Phase 4 : Suppression Voice/TTS**
