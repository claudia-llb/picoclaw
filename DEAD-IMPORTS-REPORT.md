# 🔍 Rapport des Imports Morts - openClaw

**Date:** 2025-07-14  
**Analysé par:** Import Hunter Subagent

---

## 📊 Résumé

| Catégorie                             | Nombre |
| ------------------------------------- | ------ |
| Modules/fichiers manquants            | 3      |
| Types/fonctions inexistants           | 6      |
| Code mort (fonctions jamais appelées) | 2      |
| Variables locales inutilisées         | ~15    |

---

## 🔴 CRITIQUE - Modules/Fichiers Manquants

Ces imports pointent vers des fichiers qui **n'existent plus**.

| Fichier                     | Ligne | Import                 | Raison                                                                          |
| --------------------------- | ----- | ---------------------- | ------------------------------------------------------------------------------- |
| `src/channels/web/index.ts` | 13    | `../../channel-web.js` | **Fichier manquant** - Le fichier `src/channel-web.ts` n'existe pas             |
| `src/macos/relay-smoke.ts`  | 32    | `../web/qr-image.js`   | **Fichier manquant** - Le dossier `src/web/` n'existe pas                       |
| `src/infra/bonjour.ts`      | 91-94 | `@homebridge/ciao`     | **Package optionnel non installé** - Génère des erreurs TS mais géré au runtime |

### Détails

#### `src/channels/web/index.ts`

```typescript
// Ligne 13
export {
  createWaSocket,
  loginWeb,
  logWebSelfId,
  monitorWebChannel,
  monitorWebInbox,
  pickWebChannel,
  sendMessageWhatsApp,
  WA_WEB_AUTH_DIR,
  waitForWaConnection,
  webAuthExists,
} from "../../channel-web.js"; // ❌ N'EXISTE PAS
```

#### `src/macos/relay-smoke.ts`

```typescript
// Ligne 32
const { renderQrPngBase64 } = await import("../web/qr-image.js"); // ❌ N'EXISTE PAS
```

---

## 🟠 Types/Fonctions Inexistants

Ces imports référencent des exports qui ont été supprimés.

| Fichier                            | Ligne   | Import                             | Raison                                                             |
| ---------------------------------- | ------- | ---------------------------------- | ------------------------------------------------------------------ |
| `src/config/merge-config.ts`       | 2       | `WhatsAppConfig`                   | **Type supprimé** - N'existe plus dans `./types.js`                |
| `src/cli/outbound-send-deps.ts`    | 4       | `OutboundSendDeps["sendWhatsApp"]` | **Propriété supprimée** - N'existe plus dans `OutboundSendDeps`    |
| `src/cli/outbound-send-deps.ts`    | 6       | `OutboundSendDeps["sendDiscord"]`  | **Propriété supprimée**                                            |
| `src/cli/outbound-send-deps.ts`    | 7       | `OutboundSendDeps["sendSlack"]`    | **Propriété supprimée**                                            |
| `src/cli/outbound-send-deps.ts`    | 8       | `OutboundSendDeps["sendSignal"]`   | **Propriété supprimée**                                            |
| `src/cli/outbound-send-deps.ts`    | 9       | `OutboundSendDeps["sendIMessage"]` | **Propriété supprimée**                                            |
| `src/commands/onboard-channels.ts` | 298-299 | `options.whatsappAccountId`        | **Propriété supprimée** - N'existe pas dans `SetupChannelsOptions` |

### Détails

#### `src/config/merge-config.ts`

```typescript
// Ligne 2
import type { WhatsAppConfig } from "./types.js"; // ❌ WhatsAppConfig n'existe plus
```

#### `src/cli/outbound-send-deps.ts`

```typescript
// Lignes 4-9 - Toutes ces propriétés sont absentes de OutboundSendDeps
export type CliDeps = {
  sendMessageWhatsApp: NonNullable<OutboundSendDeps["sendWhatsApp"]>; // ❌
  sendMessageDiscord: NonNullable<OutboundSendDeps["sendDiscord"]>; // ❌
  sendMessageSlack: NonNullable<OutboundSendDeps["sendSlack"]>; // ❌
  sendMessageSignal: NonNullable<OutboundSendDeps["sendSignal"]>; // ❌
  sendMessageIMessage: NonNullable<OutboundSendDeps["sendIMessage"]>; // ❌
};
```

> **Note:** `OutboundSendDeps` dans `src/infra/outbound/deliver.ts` ne contient plus que `sendTelegram`.

#### `src/commands/onboard-channels.ts`

```typescript
// Lignes 298-299
if (options?.whatsappAccountId?.trim()) {
  // ❌ Propriété inexistante
  accountOverrides.whatsapp = options.whatsappAccountId.trim(); // ❌
}
```

---

## 🟡 Code Mort - Fonctions Jamais Utilisées

Ces fonctions/exports ne sont appelés **nulle part** dans le codebase.

| Fichier                      | Ligne  | Fonction/Export         | Raison                                                   |
| ---------------------------- | ------ | ----------------------- | -------------------------------------------------------- |
| `src/config/merge-config.ts` | 26     | `mergeWhatsAppConfig()` | **Jamais appelée** - Aucune utilisation trouvée          |
| `src/channels/web/index.ts`  | entier | Tous les exports        | **Module mort** - Réexporte depuis un fichier inexistant |

---

## 🔵 Variables Locales Inutilisées

Moins critique mais nettoyable. Détectées avec `tsc --noUnusedLocals`.

| Fichier                       | Ligne   | Variable                                        |
| ----------------------------- | ------- | ----------------------------------------------- |
| `src/commands/models/scan.ts` | 308     | `_updated`                                      |
| `src/memory/manager.ts`       | 1511    | `resetIndex`                                    |
| `src/memory/qmd-manager.ts`   | 67      | `cfg`                                           |
| `src/routing/session-key.ts`  | 2       | `ParsedAgentSessionKey` (import pour re-export) |
| `ui/src/ui/app.ts`            | 117     | `eventLogBuffer`                                |
| `ui/src/ui/app.ts`            | 118     | `toolStreamSyncTimer`                           |
| `ui/src/ui/app.ts`            | 328     | `chatScrollFrame`                               |
| `ui/src/ui/app.ts`            | 329     | `chatScrollTimeout`                             |
| `ui/src/ui/app.ts`            | 330     | `chatHasAutoScrolled`                           |
| `ui/src/ui/app.ts`            | 331     | `chatUserNearBottom`                            |
| `ui/src/ui/app.ts`            | 333     | `nodesPollInterval`                             |
| `ui/src/ui/app.ts`            | 334     | `logsPollInterval`                              |
| `ui/src/ui/app.ts`            | 335     | `debugPollInterval`                             |
| `ui/src/ui/app.ts`            | 336     | `logsScrollFrame`                               |
| `ui/src/ui/app.ts`            | 337-341 | Plusieurs autres...                             |

---

## 🛠️ Recommandations de Correction

### Priorité 1 - Fix immédiat (bloque la compilation)

1. **Supprimer `src/channels/web/index.ts`** - Module entièrement mort
2. **Nettoyer `src/cli/outbound-send-deps.ts`** - Supprimer les références aux channels supprimés ou le fichier entier
3. **Nettoyer `src/config/merge-config.ts`** - Supprimer l'import `WhatsAppConfig` et la fonction `mergeWhatsAppConfig`
4. **Nettoyer `src/commands/onboard-channels.ts`** - Supprimer les lignes 298-299 (whatsappAccountId)
5. **Commenter/supprimer `src/macos/relay-smoke.ts`** - L'import dynamique de `qr-image.js` est cassé

### Priorité 2 - Nettoyage

1. Supprimer les variables locales inutilisées dans `ui/src/ui/app.ts`
2. Nettoyer les autres variables inutilisées

---

## 📋 Commande de Vérification

Pour vérifier les erreurs restantes après correction :

```bash
cd /Users/dev/clawd/projects/openClaw
npx tsc --noEmit 2>&1 | grep "error TS"
```

Pour vérifier les variables inutilisées :

```bash
npx tsc --noEmit --noUnusedLocals 2>&1 | grep "TS6133"
```

---

_Rapport généré automatiquement par l'Import Hunter 🎯_
