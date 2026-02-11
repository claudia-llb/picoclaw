# Phase 2 : Suppression Apps Natives

**Durée estimée :** 30 min  
**Risque :** Très faible  
**Prérequis :** Phase 1 complétée

---

## 🎯 Objectif

Supprimer les applications natives iOS, Android et macOS. Ce code est complètement isolé du core et n'a aucun couplage avec le reste du projet.

---

## 📋 Tâches

### 2.1 Supprimer les dossiers apps

```bash
cd /Users/dev/clawd/projects/openClaw

# Supprimer les apps natives
rm -rf apps/ios/
rm -rf apps/android/
rm -rf apps/macos/
rm -rf apps/shared/

# Supprimer la lib Swift
rm -rf Swabble/
```

### 2.2 Supprimer les fichiers de config Swift

```bash
rm -f .swiftformat
rm -f .swiftlint.yml
```

### 2.3 Nettoyer package.json scripts

**Scripts à supprimer :**
```json
{
  "scripts": {
    "android:build": "...",
    "android:dev": "...",
    "android:dev:test": "...",
    "android:install": "...",
    "ios:build": "...",
    "ios:build:debug": "...",
    "ios:build:sim": "...",
    "ios:dev": "...",
    "ios:install": "...",
    "ios:install:sim": "...",
    "mac:build": "...",
    "mac:dev": "...",
    "mac:install": "...",
    "format:swift": "...",
    "lint:swift": "..."
  }
}
```

**Commande sed pour nettoyer :**
```bash
# Éditer manuellement package.json ou utiliser jq
# Retirer toutes les lignes contenant "android:", "ios:", "mac:", "swift"
```

### 2.4 Vérifier la compilation

```bash
pnpm install
pnpm build
```

### 2.5 Commit

```bash
git add -A
git commit -m "refactor: remove native apps (iOS/Android/macOS)

- Remove apps/ios, apps/android, apps/macos, apps/shared
- Remove Swabble Swift library
- Remove Swift config files
- Clean package.json scripts

Reduction: ~9.8 MB"
```

---

## 📁 Éléments supprimés

| Élément | Type | Taille estimée |
|---------|------|----------------|
| `apps/ios/` | Dossier | ~3 MB |
| `apps/android/` | Dossier | ~3 MB |
| `apps/macos/` | Dossier | ~2 MB |
| `apps/shared/` | Dossier | ~1.5 MB |
| `Swabble/` | Dossier | ~300 KB |
| `.swiftformat` | Fichier | <1 KB |
| `.swiftlint.yml` | Fichier | <1 KB |
| Scripts package.json | Lignes | ~15 lignes |

**Total : ~9.8 MB**

---

## ✅ Critères de validation

- [ ] Dossier `apps/` supprimé ou vide
- [ ] Dossier `Swabble/` supprimé
- [ ] Fichiers Swift config supprimés
- [ ] Scripts iOS/Android/macOS retirés de package.json
- [ ] `pnpm build` passe sans erreur
- [ ] Commit créé

---

## ⚠️ Points d'attention

- **Aucun couplage** : Ces dossiers sont complètement isolés
- **Safe delete** : Aucun import depuis src/ vers apps/
- **Packages workspace** : Vérifier `pnpm-workspace.yaml` si apps/ y est référencé

---

## ⏭️ Phase suivante

→ **Phase 3 : Suppression Channels**
