# 📋 BACKLOG — PicoClaw

> **Convention :** `[ ]` = À faire, `[x]` = Terminé, `[~]` = En cours

---

## Phase 1 — Préparation ✅

[x] 1.1-1.4 — Terminé

## Phase 2 — Suppression apps/ ✅

[x] 2.1-2.5 — Terminé

## Phase 3 — Suppression channels ✅

[x] 3.1-3.23 — Terminé

## Phase 4 — Suppression TTS/Voice ✅

[x] 4.1-4.6 — Terminé

## Phase 5 — Réduction skills/extensions ✅

[x] 5.1-5.8 — Terminé

## Phase 6 — Nettoyage final ✅

[x] 6.1-6.7 — Terminé
[x] 6.8 — Dead code cleanup (essaim agents)

---

## Phase 7 — Dead Code Hunt (Essaim) 🆕

**Méthodologie :** Lancer N agents en parallèle avec des angles différents, consolider leurs rapports, exécuter le nettoyage.

### [ ] 7.1 — Lancer l'essaim d'analyse

**Pourquoi :** Trouver le code mort restant de manière exhaustive

**Comment :**
Spawner 4+ agents Opus avec ces missions :

```
Agent 1 - "imports-hunter"
→ Chercher tous les imports vers des modules/fichiers supprimés
→ Chercher les imports jamais utilisés (dead imports)

Agent 2 - "exports-hunter"
→ Chercher les fonctions/types exportés mais jamais importés
→ Chercher les fichiers qui n'ont aucun import entrant

Agent 3 - "config-hunter"
→ Chercher les références à channels supprimés dans configs
→ Chercher les options CLI mortes
→ Chercher les schemas/types orphelins

Agent 4 - "test-hunter"
→ Chercher les tests qui échouent ou testent du code mort
→ Chercher les mocks pour des modules supprimés
→ Vérifier la couverture des tests restants

Agent 5 - "docs-hunter"
→ Chercher les références obsolètes dans docs/
→ Chercher les liens morts dans docs.json
→ Vérifier les exemples de code
```

**Critères de succès :**

- `[ ]` Chaque agent produit un rapport Markdown
- `[ ]` Les rapports sont consolidés en une liste d'actions

---

### [ ] 7.2 — Consolider les rapports

**Pourquoi :** Avoir une liste unique et priorisée d'actions

**Comment :**

1. Lire les rapports des agents
2. Dédupliquer les findings
3. Prioriser : 🔴 Critique (build cassé) > 🟠 Important (code mort) > 🟡 Cosmétique
4. Créer un fichier `CLEANUP_LIST.md`

**Critères de succès :**

- `[ ]` CLEANUP_LIST.md créé avec actions priorisées
- `[ ]` Estimation des lignes à supprimer

---

### [ ] 7.3 — Exécuter le nettoyage

**Pourquoi :** Supprimer tout le code mort identifié

**Comment :**

1. Commencer par les 🔴 Critique
2. Build après chaque batch
3. Commit incrémental
4. Mesurer les métriques LOC

**Critères de succès :**

- `[ ]` Build OK après chaque batch
- `[ ]` Tous les items de CLEANUP_LIST.md traités
- `[ ]` LOC mesurées et documentées

---

### [ ] 7.4 — Valider et documenter

**Pourquoi :** S'assurer que le projet est toujours fonctionnel

**Comment :**

1. Run tests critiques
2. Test fonctionnel CLI
3. Mettre à jour STATUS.md avec métriques finales
4. Commit et push

**Critères de succès :**

- `[ ]` Tests passent
- `[ ]` CLI fonctionnel
- `[ ]` STATUS.md à jour
