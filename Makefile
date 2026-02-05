.PHONY: help install dev build start lint clean docker-build docker-up docker-down docker-dev docker-logs docker-shell

# Variables
DOCKER_IMAGE = quantumsite
DOCKER_TAG = latest

help: ## Affiche l'aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ==================== Développement local ====================

install: ## Installe les dépendances
	npm install

dev: ## Lance le serveur de développement
	npm run dev

build: ## Build l'application pour la production
	npm run build

start: ## Lance l'application en mode production
	npm run start

lint: ## Lance le linter
	npm run lint

clean: ## Nettoie les fichiers générés
	rm -rf .next node_modules

# ==================== Docker ====================

docker-build: ## Build l'image Docker de production
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

docker-up: ## Lance le conteneur en mode production
	@docker-compose up -d quantumsite || ( \
		echo "docker-up: echec, nettoyage du network puis nouvel essai..." ; \
		$(MAKE) docker-network-clean ; \
		docker-compose up -d quantumsite \
	)

docker-down: ## Arrête les conteneurs
	docker-compose down

docker-dev: ## Lance le conteneur en mode développement (avec hot reload)
	docker-compose --profile dev up quantumsite-dev

docker-logs: ## Affiche les logs du conteneur
	docker-compose logs -f

docker-shell: ## Ouvre un shell dans le conteneur
	docker-compose exec quantumsite sh

docker-clean: ## Supprime les images et volumes Docker
	docker-compose down -v --rmi local

docker-network-clean: ## Nettoie le network docker-compose (utile si l'option IPv6 change)
	docker network rm quantumsite_default || true

# ==================== Raccourcis ====================

up: docker-up ## Alias pour docker-up
down: docker-down ## Alias pour docker-down
logs: docker-logs ## Alias pour docker-logs
