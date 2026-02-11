# 🧹 CLEANUP_LIST — PicoClaw Phase 7

> Généré le 2026-02-11 par essaim d'agents (3/5 terminés)

---

## 🔴 PRIORITÉ HAUTE — Build/Navigation cassés

### 1. docs/docs.json — Redirects morts (~10 entrées)

```
Lignes à supprimer :
- 119-120: /providers/discord → /channels/discord
- 131-132: /providers/imessage → /channels/imessage
- 151-152: /providers/signal → /channels/signal
- 155-156: /providers/slack → /channels/slack
- 171-172: /providers/whatsapp → /channels/whatsapp
- 303-304: /discord → /channels/discord
- 375-376: /imessage → /channels/imessage
- 587-588: /signal → /channels/signal
- 599-600: /slack → /channels/slack
- 695-696: /whatsapp → /channels/whatsapp
```

### 2. docs/docs.json — Navigation channels morts (~15 entrées)

```
Supprimer de la navigation (lignes ~862-872, ~984, ~1012) :
- channels/discord
- channels/slack
- channels/signal
- channels/imessage
- channels/whatsapp
- channels/msteams
- channels/line
- channels/matrix
- channels/zalo
- channels/zalouser
- channels/googlechat
- channels/mattermost
- channels/feishu
- channels/irc
- channels/bluebubbles
```

### 3. Imports cassés (3 fichiers)

| Fichier                     | Import cassé           | Action                   |
| --------------------------- | ---------------------- | ------------------------ |
| `src/channels/web/index.ts` | `../../channel-web.js` | Supprimer fichier entier |
| `src/macos/relay-smoke.ts`  | `../web/qr-image.js`   | Supprimer ou fixer       |
| `src/infra/bonjour.ts`      | `@homebridge/ciao`     | Déjà stubé ✅            |

---

## 🟠 PRIORITÉ MOYENNE — Code mort volumineux

### 4. src/config/schema.hints.ts (~80 entrées)

```
Supprimer toutes les entrées pour :
- channels.whatsapp.* (~8 entrées)
- channels.discord.* (~26 entrées)
- channels.slack.* (~18 entrées)
- channels.mattermost.* (~11 entrées)
- channels.signal.* (~6 entrées)
- channels.imessage.* (~6 entrées)
- channels.bluebubbles.* (~4 entrées)
- channels.msteams.* (~2 entrées)
```

### 5. src/config/schema.field-metadata.ts (~80 entrées)

```
Même liste que schema.hints.ts
```

### 6. Types/fonctions orphelins

| Fichier                         | Élément                             | Action    |
| ------------------------------- | ----------------------------------- | --------- |
| `src/config/types.js`           | `WhatsAppConfig` type               | Supprimer |
| `src/cli/outbound-send-deps.ts` | `sendWhatsApp`, `sendDiscord`, etc. | Supprimer |
| Quelque part                    | `mergeWhatsAppConfig()`             | Supprimer |

---

## 🟡 PRIORITÉ BASSE — Docs/exemples

### 7. docs/channels/index.md — Liens morts

```
Lignes 16-26 : Supprimer liens vers :
- /channels/whatsapp
- /channels/discord
- /channels/slack
- /channels/signal
- /channels/imessage
```

### 8. docs/channels/pairing.md — Liens morts

```
Lignes 98-103 : Mêmes liens à supprimer
```

### 9. Autres fichiers docs avec références obsolètes

- docs/start/docs-directory.md
- docs/tools/slash-commands.md
- docs/tools/reactions.md
- docs/install/fly.md
- docs/install/docker.md

---

## 📊 RÉSUMÉ

| Priorité   | Items | Est. lignes |
| ---------- | ----- | ----------- |
| 🔴 Haute   | 3     | ~200        |
| 🟠 Moyenne | 3     | ~300        |
| 🟡 Basse   | 3     | ~100        |
| **TOTAL**  | 9     | **~600**    |

---

## ⏭️ PROCHAINES ÉTAPES

1. [ ] Nettoyer docs/docs.json (redirects + nav)
2. [ ] Supprimer src/channels/web/
3. [ ] Nettoyer schema.hints.ts
4. [ ] Nettoyer schema.field-metadata.ts
5. [ ] Nettoyer types orphelins
6. [ ] Mettre à jour docs channels
7. [ ] Build + test
8. [ ] Commit
