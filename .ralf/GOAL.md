# 🎯 GOAL — PicoClaw

## Vision
Créer une version minimaliste d'OpenClaw avec **Telegram uniquement** comme channel de communication. Réduire drastiquement la surface de code tout en conservant les fonctionnalités core.

## Problème
OpenClaw supporte 17 channels, 35 extensions, 52 skills — complexité massive pour un usage personnel où seul Telegram est utilisé.

## Solution
Refactoring chirurgical :
1. Supprimer les apps natives (iOS/Android/macOS)
2. Supprimer tous les channels sauf Telegram
3. Supprimer Voice/TTS
4. Réduire skills à l'essentiel (3)
5. Nettoyer extensions non essentielles

## Métriques cibles
| Métrique | Avant | Après | Réduction |
|----------|-------|-------|-----------|
| Channels | 17 | 1 | -94% |
| Extensions | 35 | 2 | -95% |
| Skills | 52 | 3-5 | -90% |
| Code LOC | 569K | ~150K | -70% |
| Deps npm | 72 | ~35 | -50% |

## Non-objectifs
- Pas de nouvelles features
- Pas de refactoring architectural (juste suppression)
- Pas de changement d'API interne

## Critères de succès global
- [ ] `pnpm build` passe sans erreur
- [ ] Tests unitaires core passent
- [ ] Gateway démarre et répond via Telegram
- [ ] Tools core fonctionnent (read/write/bash/edit)
- [ ] Memory fonctionne (SOUL/IDENTITY)
