#!/usr/bin/env bash
# setup-contabo.sh — One-time server setup for FluxBot Studio IA on Contabo
#
# Run as root on a fresh Ubuntu/Debian server.
# Usage: sudo ./scripts/setup-contabo.sh

set -euo pipefail

APP_DIR="/var/www/fluxbot-studio-ia"
NODE_VERSION="18"

echo "▸ Updating system..."
apt-get update -qq && apt-get upgrade -y -qq

echo "▸ Installing Node.js ${NODE_VERSION}..."
if ! command -v node &>/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y -qq nodejs
fi
echo "  Node $(node -v) | npm $(npm -v)"

echo "▸ Installing Nginx..."
apt-get install -y -qq nginx

echo "▸ Creating app directory..."
mkdir -p "${APP_DIR}"
mkdir -p /var/www/certbot

echo "▸ Installing systemd service..."
cp scripts/fluxbot-studio-ia.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable fluxbot-studio-ia

echo "▸ Configuring Nginx..."
cp scripts/nginx-fluxbotia.conf /etc/nginx/sites-available/fluxbotia.conf
ln -sf /etc/nginx/sites-available/fluxbotia.conf /etc/nginx/sites-enabled/fluxbotia.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo ""
echo "✅ Server ready. Next steps:"
echo "  1. Deploy the app:   CONTABO_HOST=<this-server-ip> ./scripts/deploy-contabo.sh"
echo "  2. Setup SSL:        sudo ./scripts/setup-ssl.sh"
echo ""
