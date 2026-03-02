# Plateforme de Streaming Vidéo - React.js

Une application web moderne de streaming vidéo permettant de découvrir, visionner et gérer des films, séries et documentaires. 

## 🚀 Fonctionnalités

- **Authentification complète** : Inscription, connexion et déconnexion avec persistance (localStorage).
- **Catalogue Dynamique** : Grille de contenus avec recherche en temps réel et filtres multicritères (type, catégorie).
- **Détails Riche** : Informations complètes, lecture du trailer via YouTube embed.
- **Gestion de Ma Liste** : Ajouter ou retirer des contenus de votre liste personnalisée.
- **Profil Utilisateur** : Statistiques de visionnage et historique complet.
- **Design Moderne** : Interface réactive avec esthétique "Glassmorphism", transitions fluides (Framer Motion) et responsive design.

## 🛠️ Technologies Utilisées

- **React.js** (Composants fonctionnels, Hooks)
- **React Router** (Lazy loading, Protected Routes)
- **Framer Motion** (Animations)
- **React Icons** (Iconographie)
- **CSS Vanilla** (Variables CSS, Flexbox/Grid)
- **Mock Data** (Données locales simulées)

## 📦 Installation et Lancement

1. **Cloner le projet** :
   ```bash
   git clone [URL_DU_REPO]
   cd Streaming
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer l'application** :
   ```bash
   npm run dev
   ```

## 📝 Structure du Projet

```text
src/
├── components/   # Composants réutilisables (Navbar, VideoCard, etc.)
├── context/      # Gestion d'état global (Auth, Watchlist)
├── data/         # Mock data (Videos, Categories)
├── hooks/        # Custom hooks (useLocalStorage, useAuth)
├── pages/        # Pages de l'application (Home, Login, Profile...)
└── assets/       # Styles et images
```
