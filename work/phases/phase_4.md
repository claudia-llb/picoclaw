# Phase 4 : Suppression Voice/TTS

**Durée estimée :** 30 min  
**Risque :** Faible  
**Prérequis :** Phase 3 complétée

---

## 🎯 Objectif

Supprimer toutes les fonctionnalités vocales et de synthèse vocale (TTS).

---

## 📋 Tâches

### 4.1 Supprimer les dossiers source

```bash
cd /Users/dev/clawd/projects/openClaw

# TTS core
rm -rf src/tts/
```

### 4.2 Supprimer les extensions voice

```bash
rm -rf extensions/voice-call/
rm -rf extensions/talk-voice/
```

### 4.3 Supprimer les skills voice/TTS

```bash
rm -rf skills/sag/              # ElevenLabs
rm -rf skills/openai-whisper/   # Whisper local
rm -rf skills/openai-whisper-api/  # Whisper API
rm -rf skills/sherpa-onnx-tts/  # Sherpa TTS
```

### 4.4 Nettoyer package.json

**Dépendance à supprimer :**
```json
{
  "dependencies": {
    "node-edge-tts": "^1.2.10"
  }
}
```

### 4.5 Vérifier les imports TTS dans le code

```bash
# Chercher les imports TTS
grep -r "from.*tts\|import.*tts" src/ --include="*.ts" | grep -v ".test.ts"

# Chercher les références voice
grep -r "voice\|Voice\|VOICE" src/ --include="*.ts" | grep -v ".test.ts" | head -20
```

### 4.6 Nettoyer les références dans les configs

Vérifier et nettoyer si nécessaire :
- `src/config/` - Sections TTS/voice
- `src/agents/tools/` - Tool tts si existant

### 4.7 Commit

```bash
git add -A
git commit -m "refactor: remove voice and TTS features

- Remove src/tts/
- Remove extensions/voice-call, talk-voice
- Remove skills: sag, openai-whisper, sherpa-onnx-tts
- Remove node-edge-tts dependency

Reduction: ~500 KB code, 1 npm dependency"
```

---

## 📁 Éléments supprimés

| Élément | Type | Taille estimée |
|---------|------|----------------|
| `src/tts/` | Dossier | ~100 KB |
| `extensions/voice-call/` | Dossier | ~150 KB |
| `extensions/talk-voice/` | Dossier | ~50 KB |
| `skills/sag/` | Dossier | ~30 KB |
| `skills/openai-whisper/` | Dossier | ~40 KB |
| `skills/openai-whisper-api/` | Dossier | ~30 KB |
| `skills/sherpa-onnx-tts/` | Dossier | ~40 KB |
| `node-edge-tts` | npm dep | ~2 MB installed |

---

## ✅ Critères de validation

- [ ] `src/tts/` supprimé
- [ ] Extensions voice supprimées
- [ ] Skills TTS supprimés
- [ ] `node-edge-tts` retiré de package.json
- [ ] `pnpm install` sans erreur
- [ ] `pnpm build` sans erreur
- [ ] Aucune référence TTS cassée

---

## ⏭️ Phase suivante

→ **Phase 5 : Nettoyage Skills**
