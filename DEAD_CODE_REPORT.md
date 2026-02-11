# 🧹 Rapport de Code Mort - PicoClaw/OpenClaw

**Date:** 2025-02-11  
**Scope:** `src/agents/`, `src/gateway/`, `src/commands/`, + fichiers connexes

---

## 📊 Résumé

Le projet contient du **code mort significatif** lié à des channels de communication supprimés. Le registre des channels (`src/channels/registry.ts`) ne contient plus que **Telegram**, mais le code contient encore des références à :

- Discord
- Slack
- Signal
- WhatsApp
- iMessage / BlueBubbles
- Matrix
- MS Teams
- Google Chat
- IRC

---

## 🔴 Fichiers à Supprimer Complètement

### 1. `src/commands/signal-install.ts` (182 lignes)

**Justification:** Script d'installation de Signal CLI. Jamais importé nulle part. Channel Signal supprimé.

```bash
rm src/commands/signal-install.ts
```

---

## 🟠 Exports/Fonctions à Supprimer

### 2. `src/config/zod-schema.providers-core.ts` (~600 lignes de code mort)

Les schemas Zod suivants ne sont jamais utilisés (seul `TelegramConfigSchema` est importé via `zod-schema.providers.ts`) :

| Schema                         | Lignes  | Channel     |
| ------------------------------ | ------- | ----------- |
| `DiscordDmSchema`              | 209-228 | Discord     |
| `DiscordGuildChannelSchema`    | 229-243 | Discord     |
| `DiscordGuildSchema`           | 244-255 | Discord     |
| `DiscordAccountSchema`         | 256-332 | Discord     |
| `DiscordConfigSchema`          | 333-335 | Discord     |
| `GoogleChatDmSchema`           | 337-354 | Google Chat |
| `GoogleChatGroupSchema`        | 355-364 | Google Chat |
| `GoogleChatAccountSchema`      | 365-403 | Google Chat |
| `GoogleChatConfigSchema`       | 404-407 | Google Chat |
| `SlackDmSchema`                | 409-429 | Slack       |
| `SlackChannelSchema`           | 430-443 | Slack       |
| `SlackThreadSchema`            | 444-458 | Slack       |
| `SlackAccountSchema`           | 459-518 | Slack       |
| `SlackConfigSchema`            | 519-557 | Slack       |
| `SignalAccountSchemaBase`      | 559-602 | Signal      |
| `SignalAccountSchema`          | 603-612 | Signal      |
| `SignalConfigSchema`           | 613-623 | Signal      |
| `IrcGroupSchema`               | 625-636 | IRC         |
| `IrcNickServSchema`            | 637-647 | IRC         |
| `IrcAccountSchemaBase`         | 648-683 | IRC         |
| `IrcAccountSchema`             | 684-700 | IRC         |
| `IrcConfigSchema`              | 701-718 | IRC         |
| `IMessageAccountSchemaBase`    | 720-762 | iMessage    |
| `IMessageAccountSchema`        | 763-773 | iMessage    |
| `IMessageConfigSchema`         | 774-812 | iMessage    |
| `BlueBubblesAccountSchemaBase` | 814-842 | BlueBubbles |
| `BlueBubblesAccountSchema`     | 843-852 | BlueBubbles |
| `BlueBubblesConfigSchema`      | 853-865 | BlueBubbles |
| `MSTeamsChannelSchema`         | 867-875 | MS Teams    |
| `MSTeamsTeamSchema`            | 876-884 | MS Teams    |
| `MSTeamsConfigSchema`          | 886-934 | MS Teams    |

**Action:** Supprimer ces ~600 lignes de schemas inutilisés.

---

### 3. `src/channels/plugins/group-mentions.ts` - Stubs inutilisés

Fonctions stub pour channels supprimés, jamais appelées :

```typescript
// À SUPPRIMER - lines 97-151
export function resolveWhatsAppGroupRequireMention(_params: GroupMentionParams): boolean;
export function resolveIMessageGroupRequireMention(_params: GroupMentionParams): boolean;
export function resolveDiscordGroupRequireMention(_params: GroupMentionParams): boolean;
export function resolveGoogleChatGroupRequireMention(_params: GroupMentionParams): boolean;
export function resolveSlackGroupRequireMention(_params: GroupMentionParams): boolean;
export function resolveBlueBubblesGroupRequireMention(_params: GroupMentionParams): boolean;
export function resolveGoogleChatGroupToolPolicy(_params: GroupMentionParams);
export function resolveWhatsAppGroupToolPolicy(_params: GroupMentionParams);
export function resolveIMessageGroupToolPolicy(_params: GroupMentionParams);
export function resolveDiscordGroupToolPolicy(_params: GroupMentionParams);
export function resolveSlackGroupToolPolicy(_params: GroupMentionParams);
```

---

### 4. `src/channels/ack-reactions.ts` - Fonctions WhatsApp

```typescript
// À SUPPRIMER
export type WhatsAppAckReactionMode = "always" | "mentions" | "never";
export function shouldAckReactionForWhatsApp(params: {...}): boolean
```

**Justification:** Spécifique à WhatsApp, jamais utilisé ailleurs.

---

### 5. `src/config/merge-config.ts` - Fonction WhatsApp

```typescript
// À SUPPRIMER - import + function (lines 2, 26-35)
import type { WhatsAppConfig } from "./types.js";

export function mergeWhatsAppConfig(
  cfg: OpenClawConfig,
  patch: Partial<WhatsAppConfig>,
  options?: MergeSectionOptions<WhatsAppConfig>,
): OpenClawConfig;
```

**Justification:** Type `WhatsAppConfig` n'existe même plus, fonction jamais appelée.

---

### 6. `src/agents/tool-policy.ts` - Référence whatsapp_login

```typescript
// Line 61 - À SUPPRIMER de la liste
const OWNER_ONLY_TOOL_NAMES = new Set<string>(["whatsapp_login"]);
```

**Note:** Set vide après suppression.

---

### 7. `src/agents/pi-tools.policy.ts` - Référence whatsapp_login

```typescript
// Line 89 - À SUPPRIMER
"whatsapp_login",
```

---

### 8. `src/agents/tools/sessions-send-helpers.ts` - Logique Discord/Slack

```typescript
// Line 58 - À SUPPRIMER (ou simplifier)
if (normalizedChannel === "discord" || normalizedChannel === "slack") {
  return `channel:${id}`;
}
```

**Justification:** Discord et Slack ne sont plus des channels supportés.

---

## 🟡 Métadonnées de Config à Nettoyer

### 9. `src/config/schema.hints.ts` (~70 occurrences)

Références aux channels supprimés dans les hints de config :

- `channels.discord.*` (lignes 292, 318-330, 654, 664-665, 713-727)
- `channels.slack.*`
- `channels.signal.*`
- `channels.whatsapp.*` (lignes 289, 312-314, 643, 656, 702-705)
- `channels.imessage.*` (lignes 296, 316, 343, 660-661, 709-710)
- `channels.msteams.*` (lignes 298, 662)

### 10. `src/config/schema.field-metadata.ts` (~70 occurrences)

Mêmes références que schema.hints.ts.

### 11. `src/config/zod-schema.core.ts`

```typescript
// Line 295 - MSTeamsReplyStyleSchema inutilisé
export const MSTeamsReplyStyleSchema = z.enum(["thread", "top-level"]);

// Lines 316-320 - queue modes pour channels supprimés
imessage: QueueModeSchema.optional(),
msteams: QueueModeSchema.optional(),
```

### 12. `src/config/zod-schema.hooks.ts`

```typescript
// Lines 30-31 - literals pour channels supprimés
z.literal("imessage"),
z.literal("msteams"),
```

### 13. `src/config/types.hooks.ts`

```typescript
// Lines 34-35
| "imessage"
| "msteams";
```

### 14. `src/config/types.queue.ts`

```typescript
// Lines 19-20
imessage?: QueueMode;
msteams?: QueueMode;
```

---

## 🟡 Types/Interfaces à Nettoyer

### 15. `src/channels/plugins/types.core.ts` - ChannelSetupInput

Champs pour channels supprimés :

```typescript
signalNumber?: string;        // Signal
cliPath?: string;             // Signal
dbPath?: string;              // Signal/iMessage
service?: "imessage" | "sms" | "auto";  // iMessage
homeserver?: string;          // Matrix
userId?: string;              // Matrix
accessToken?: string;         // Matrix
password?: string;            // Matrix
deviceName?: string;          // Matrix
initialSyncLimit?: number;    // Matrix
ship?: string;                // Urbit
appToken?: string;            // Slack
audienceType?: string;        // MS Teams?
audience?: string;            // MS Teams?
```

### 16. `src/commands/channels/add-mutators.ts`

Mêmes paramètres obsolètes dans `applyChannelAccountConfig`.

### 17. `src/channels/plugins/onboarding-types.ts`

```typescript
// Line 9 - inutilisé
allowSignalInstall?: boolean;

// Line 14 - inutilisé
whatsappAccountId?: string;
```

---

## 🔵 Fichiers de Migrations Legacy (à conserver avec prudence)

Ces fichiers contiennent des migrations historiques qui référencent les channels supprimés. **Ne pas supprimer** mais pourraient être archivés :

- `src/config/legacy.migrations.part-1.ts` - Migrations WhatsApp/iMessage
- `src/config/legacy.rules.ts` - Règles de migration legacy

---

## 📈 Impact Estimé

| Catégorie              | Lignes estimées |
| ---------------------- | --------------- |
| Schemas Zod inutilisés | ~600            |
| Stubs/fonctions mortes | ~100            |
| Métadonnées config     | ~150            |
| Types/interfaces       | ~50             |
| **Total**              | **~900 lignes** |

---

## ✅ Checklist de Nettoyage

1. [ ] Supprimer `src/commands/signal-install.ts`
2. [ ] Nettoyer schemas Zod dans `zod-schema.providers-core.ts`
3. [ ] Supprimer stubs dans `group-mentions.ts`
4. [ ] Supprimer `shouldAckReactionForWhatsApp` et `WhatsAppAckReactionMode`
5. [ ] Supprimer `mergeWhatsAppConfig`
6. [ ] Nettoyer `whatsapp_login` des tool policies
7. [ ] Nettoyer logique Discord/Slack dans `sessions-send-helpers.ts`
8. [ ] Nettoyer schema.hints.ts et schema.field-metadata.ts
9. [ ] Nettoyer types dans zod-schema.core.ts, types.queue.ts, types.hooks.ts
10. [ ] Nettoyer ChannelSetupInput et add-mutators.ts
11. [ ] Nettoyer onboarding-types.ts

---

## ⚠️ Notes

- Le lien Discord communauté dans `system-prompt.ts` est **intentionnel** (lien externe).
- Les fichiers `test-helpers.mocks.ts` contiennent des stubs pour tests - **ne pas toucher**.
- Les migrations legacy doivent rester pour la compatibilité des configs existantes.
