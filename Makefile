# ─────────────────────────────────────────────────────────────
#  Naeem website
#  Run `make` on its own to see everything available.
# ─────────────────────────────────────────────────────────────

APP     := naeem-building
PORT    ?= 3000
URL     := http://localhost:$(PORT)
PIDFILE := $(APP)/.dev.pid
LOGFILE := $(APP)/.dev.log

.DEFAULT_GOAL := help
.PHONY: help up down restart status logs open build start images media check fmt install clean reset

help: ## Show this help
	@echo ""
	@echo "  Naeem website — available commands"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "  Site runs at $(URL)  (override with: make up PORT=4000)"
	@echo ""

install: ## Install dependencies
	@cd $(APP) && npm install

up: ## Start the website and open it in your browser
	@if [ -f $(PIDFILE) ] && kill -0 `cat $(PIDFILE)` 2>/dev/null; then \
		echo "Already running at $(URL)"; \
	else \
		lsof -ti tcp:$(PORT) | xargs kill -9 2>/dev/null || true; \
		cd $(APP) && PORT=$(PORT) nohup npm run dev > .dev.log 2>&1 & echo $$! > $(PIDFILE); \
		printf "Starting"; \
		for i in $$(seq 1 60); do \
			if curl -s -o /dev/null $(URL); then break; fi; \
			printf "."; sleep 0.5; \
		done; \
		echo ""; \
		echo "Running at $(URL)"; \
	fi
	@open $(URL) 2>/dev/null || true

down: ## Stop the website
	@if [ -f $(PIDFILE) ]; then kill `cat $(PIDFILE)` 2>/dev/null || true; rm -f $(PIDFILE); fi
	@lsof -ti tcp:$(PORT) | xargs kill -9 2>/dev/null || true
	@echo "Stopped."

restart: down up ## Restart the website

status: ## Is it running?
	@if lsof -ti tcp:$(PORT) > /dev/null 2>&1; then \
		echo "Running  — $(URL)"; \
	else \
		echo "Stopped  — run 'make up'"; \
	fi

logs: ## Tail the dev server log
	@tail -f $(LOGFILE)

open: ## Open the site in your browser
	@open $(URL)

images: ## Regenerate the sample illustrations
	@cd $(APP) && node scripts/generate-images.mjs

media: ## Cut the site footage in data/ into web-ready clips (needs ffmpeg)
	@cd $(APP) && node scripts/build-media.mjs

build: ## Build the production site
	@cd $(APP) && npm run build

start: build ## Build, then serve the production site
	@cd $(APP) && PORT=$(PORT) npm run start

check: ## Type-check and lint
	@cd $(APP) && npx tsc --noEmit && npm run lint

clean: ## Remove build output and logs
	@cd $(APP) && rm -rf .next .dev.log .dev.pid
	@echo "Cleaned."

reset: clean ## Clean, then reinstall dependencies
	@cd $(APP) && rm -rf node_modules && npm install
