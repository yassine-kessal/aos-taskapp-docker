
## AOS Taskapp - Entretien (Single Page Application)  
  
Application de gestion des tâches avec authentification (Single Page Application).  
  
Crée dans le cadre d'un entretien pour un stage.  

### Tâches effectuées

#### Environnement Docker `./docker` :
- La création d'un environnement Docker pour tester ou déployer rapidement l'application 
	- docker-compose.yml : permettant l'installation d'un workspace(Dockerfile), d'un serveur nginx et de la base de donnée mongodb
	- Dockerfile : permettant la configuration du workspace  (incluant php8 avec les extensions nécessaires à laravel 8 et mongodb, npm, composer et git

#### Dans l'application `./` :  
- Vous pouvez créer un compte utilisateur
- Vous connecter à un compte si vous avez les identifiants
	- Compte demo disponible (nécessite l'exécution de la commande `php artisan db:seed`
		- Email : test@test.fr
		- Mot de passe : Test
- Vous pouvez ajouter, modifier, supprimer, voir et mettre une tâche comme étant terminée
- Vous pouvez trier les tâches
- Barre de navigation vous permettant de naviguer entre les pages (instantanément - sans recharger) et d'avoir un loader pour chaque action effectuée 
- Des notifications toasts
- Des tests unitaires permettant le contrôle du bon fonctionnement de l'API

## Technologies utilisées  
  
- Docker 
- PHP 8.0  
- Laravel 8
- MongoDB  
- React 16.8 (comme demandé)  
- Typescript

## Installation et utilisation
Cloner le dépôt GitHub :
```bash
> git clone https://github.com/yassine-kessal/aos-taskapp
```
### Avec Docker
1. Se rendre dans le dossier `./docker` build et lancer le container :
```bash
> cd docker
> docker-compose up -d --build
``` 
2. Entrer dans le workspace du container et préparer l'environnement laravel:
```bash
> docker-compose exec app bash # Accéder au workspace
# verifier qu'on se trouve bien dans le dossier /var/www sinon `cd /var/www`
> composer install # installer les dépendances PHP
> npm install # installer les dépendances JS/TS
> cp .env-example .env
> php artisan key:generate
> npm run prod 
> php artisan clear:all # custom command permettant de nettoyer tous les caches
```
4. [Optionnel] Mettre en place les migrations et des données de demo :
```bash
> php artisan migrate # Migrations (Optionnel puisqu'on utilise MongoDB)
> php artisan db:seed # Pour insérer des données de demo
```
5. Ouvrir dans le navigateur `http://127.0.0.1:8000`  et tester l'application

### Sans Docker

1. Préparer l'environnement laravel:
```bash
> composer install # installer les dépendances PHP
> npm install # installer les dépendances JS/TS
> cp .env-example .env
> php artisan key:generate
> npm run prod 
> php artisan clear:all # custom command permettant de nettoyer tous les caches
```
3. Configuration des fichiers `.env` et `resources/ts/bootstrap.ts`
2. [Optionnel] Mettre en place les migrations et des données de demo :
```bash
> php artisan migrate # Migrations (Optionnel puisqu'on utilise MongoDB)
> php artisan db:seed # Pour insérer des données de demo
```
5. Lancer le serveur `php artisan serve` et ouvrir dans le navigateur `http://127.0.0.1:8000`  (tester l'application)

### Configuration (Optionnel si vous utilisez Docker)
1. Éditez le fichier `.env` pour mettre en place :
	- APP_URL
	- La connexion vers votre serveur MongoDB
	- `SESSION_DOMAIN et SANCTUM_STATEFUL_DOMAINS` pour les requètes api (CORS, CSRF)
2. Éditez le fichier `resources/ts/bootstrap.ts` pour mettre en place :
	- window.axios.defaults.baseURL => l'url de base de l'api
	- baseFrontedAppUrl => l'url de base du site

## Tests
Des tests unitaires sont présent pour contrôler le bon fonctionnement de l'API 
```bash
> php artisan test
# or
> ./vendor/bin/phpunit
```
### Merci.