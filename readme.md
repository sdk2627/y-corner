# Ycorner

## A propos

Ycorner est un site de vente entre particulier d'article de sport

## Versions utilisées

- Version utilisé avec symfony pour ce projet PHP 8.3.x
- Version de symfony 6.4.x

## Mise en place de l'environnement de travail

- Installez le gestionnaire de versions de fichiers GIT [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Installez l'environnement de développement pour PHP et MySQL
- Installez le gestionnaire de dépendances de PHP : composer [https://getcomposer.org/download/](https://getcomposer.org/download/)
- Installez l'interpréteur de commandes symfony (CLI Symfony)

### Testez votre configuration

1. Ouvrez	votre terminal
2. Tapez	la commande **git** et	assurez vous qu'il n'y a pas de message d'erreur particulier
3. Tapez	la commande **php	-v** et	assurez vous que vous avez la version 8.3 au minimum
4. Tapez	la commande **composer -v** et assurez vous qu'il n'y a pas de message d'erreur particulier

## Installation projet

### Cloner le dépôt git distant en local

Dans votre terminal, positionnez vous dans le bon répertoire est cloner le dépot git en local

### Installer les dépendances

Installer les dépendances avec composer à partir du fichier composer.lock

```
composer install
```

### Paramétrer les variables d'environnement

- Dupliquer le fichier .env et renommé le .env.local
- Dans l’arborescence du projet rendez vous dans le fichier .env.local
- les réglages qui vont y être fait seront pour une configuration en local

Dans le fichier .env.local penser à commenté la ligne concernant le postgresql et décommenté la ligne mysql au dessus

Sur la ligne MySQL rentrer les informations de la manière suivante

DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=8&charset=utf8mb4"

- db_user : entrée un identifiant pour l'accés à la base de donnée
- db_password : entrée mot de passe
- db_name : entrée le nom de la base de donnée par exemple api-bilemo

Enregistrez le fichier .env.local

### Création de la base de donnée

Placer vous dans le dossier backend

Dans votre terminal

```
php bin/console doctrine:database:create
```

Cette commande va créer la base de donnée en récupérant le nom que nous avons donnés dans le fichier .env.local

### Jouer les migrations pour créer les tables dans la base de données

Tapez la commande dans votre terminal

```
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

### Charger les données pour alimenter de données les tables

Lancer la requete http://127.0.0.1:8000/equipment en POST avec les données de backend/sample.json pour avoir un jeu de données.

### Frontend

Placer vous dans le dossier frontend.
Lancer dans la commande

```
npm install
npm run dev
```
