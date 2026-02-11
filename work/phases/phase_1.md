# Phase 1 : Préparation

**Durée estimée :** 1-2h  
**Risque :** Faible  
**Prérequis :** Aucun

---

## 🎯 Objectif

Préparer le projet pour le refactoring : créer une branche dédiée, documenter l'état initial, et identifier les tests critiques.

---

## 📋 Tâches

### 1.1 Créer la branche de travail
```bash
cd /Users/dev/clawd/projects/openClaw
git checkout -b feature/minimal
```

### 1.2 Mesurer les métriques initiales

**Lignes de code :**
```bash
find src -name "*.ts" | xargs wc -l | tail -1
find extensions -name "*.ts" | xargs wc -l | tail -1
find skills -name "*.ts" -o -name "*.md" | xargs wc -l | tail -1
```

**Nombre de fichiers :**
```bash
find src -name "*.ts" | wc -l
find extensions -type d -maxdepth 1 | wc -l
find skills -type d -maxdepth 1 | wc -l
```

**Taille des dossiers :**
```bash
du -sh src/ extensions/ skills/ apps/ ui/
```

**Dépendances :**
```bash
cat package.json | grep -c '":'  # Approximation
```

### 1.3 Documenter l'état initial

Créer `work/METRICS_BEFORE.md` avec :
- LOC total
- Nombre de fichiers TypeScript
- Nombre d'extensions
- Nombre de skills
- Taille totale du projet
- Nombre de dépendances npm

### 1.4 Identifier les tests critiques

Tests à conserver (core) :
- `src/gateway/*.test.ts` (sauf channels-specific)
- `src/agents/*.test.ts`
- `src/telegram/*.test.ts`
- `src/memory/*.test.ts`
- `src/config/*.test.ts`

Tests à supprimer (avec les features) :
- `src/discord/*.test.ts`
- `src/slack/*.test.ts`
- `src/whatsapp/*.test.ts`
- `extensions/*/*.test.ts` (sauf telegram, memory-core)

### 1.5 Backup de sécurité
```bash
git add -A
git commit -m "chore: snapshot before minimal refactoring"
git push origin feature/minimal
```

---

## ✅ Critères de validation

- [ ] Branche `feature/minimal` créée
- [ ] Métriques initiales documentées dans `work/METRICS_BEFORE.md`
- [ ] Commit initial pushé
- [ ] Tests critiques identifiés

---

## 📁 Fichiers produits

| Fichier | Description |
|---------|-------------|
| `work/METRICS_BEFORE.md` | Métriques avant refactoring |

---

## ⏭️ Phase suivante

→ **Phase 2 : Suppression Apps Natives**
