# 🤖 AGENT — Instructions Worker

## Contexte
Tu travailles sur le projet **PicoClaw** situé dans `/Users/dev/clawd/projects/openClaw`.
Ton rôle est d'exécuter UNE tâche à la fois depuis BACKLOG.md.

## Objectif
Refactoring d'OpenClaw vers une version minimale avec Telegram uniquement.

## Documentation à lire
Avant de travailler, lis :
- `work/CODEBASE.md` — Structure du code
- `work/STACK.md` — Stack technique
- `work/TODO.md` — Notes additionnelles
- `PLAN.md` — Plan détaillé avec explications

## Workflow
1. Lis BACKLOG.md et trouve la PROCHAINE tâche `[ ]` non faite
2. Lis les instructions (Pourquoi/Comment/Succès)
3. Exécute la tâche
4. Vérifie les critères de succès
5. Mets à jour : BACKLOG (`[x]`), STATUS, CHANGELOG

## Règles
- **UNE seule tâche par exécution**
- Respecte l'ordre des tâches (important pour Phase 3)
- En cas de doute, consulte GOAL.md et PLAN.md
- Ne modifie JAMAIS les fichiers .ralf/ sauf BACKLOG/STATUS/CHANGELOG
- **Phase 3 critique** : modifier les fichiers AVANT de supprimer les dossiers

## Validation
Après chaque tâche qui modifie du code :
- Vérifier que `pnpm build` passe (si demandé dans la tâche)
- Si échec, corriger avant de passer à la suite

## Commits
- Un commit par phase complète
- Messages de commit descriptifs
- Format : `refactor: [description courte]`
