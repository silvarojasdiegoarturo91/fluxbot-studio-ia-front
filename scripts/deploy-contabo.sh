#!/usr/bin/env bash
# deploy-contabo.sh — Build locally, rsync standalone output to Contabo, restart service
#
# Usage:
#   CONTABO_HOST=diego-contabo ./scripts/deploy-contabo.sh
#
# Prerequisites:
#   - SSH key access to Contabo (ssh-agent or key in ~/.ssh)
#   - Node 18+ locally (for build)

set -euo pipefail

# --- Config (override via env) ---
HOST="${CONTABO_HOST:-diego-contabo}"
REMOTE_DIR="${REMOTE_DIR:-/home/diego/fluxbot-studio-ia-front}"
SERVICE_NAME="${SERVICE_NAME:-fluxbot-studio-ia-front}"

echo "▸ Building standalone output…"
npm run build -- --webpack

echo "▸ Syncing .next/standalone to ${HOST}:${REMOTE_DIR}…"
rsync -avz --delete \
  .next/standalone/fluxbot-studio-ia-front/ \
  "${HOST}:${REMOTE_DIR}/"

echo "▸ Syncing static assets…"
rsync -avz --delete \
  .next/static/ \
  "${HOST}:${REMOTE_DIR}/.next/static/"

echo "▸ Syncing public assets…"
rsync -avz --delete \
  public/ \
  "${HOST}:${REMOTE_DIR}/public/"

echo "▸ Restarting ${SERVICE_NAME}…"
ssh "${HOST}" "sudo systemctl restart ${SERVICE_NAME} && sudo systemctl status ${SERVICE_NAME} --no-pager"

echo "▸ Done. Site live at https://fluxbotia.com"
