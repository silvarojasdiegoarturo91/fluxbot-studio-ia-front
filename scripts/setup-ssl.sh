#!/usr/bin/env bash
# setup-ssl.sh — Install certbot + obtain SSL cert for fluxbotia.com
#
# Run on Contabo as root, AFTER nginx config is in place and DNS resolves.
# Usage: sudo ./scripts/setup-ssl.sh

set -euo pipefail

DOMAIN="fluxbotia.com"
EMAIL="${CERTBOT_EMAIL:-}"

if [ -z "$EMAIL" ]; then
  read -rp "Email for Let's Encrypt notifications: " EMAIL
fi

echo "▸ Installing certbot..."
apt-get update -qq && apt-get install -y -qq certbot python3-certbot-nginx

echo "▸ Obtaining SSL certificate for ${DOMAIN} + www.${DOMAIN}..."
certbot certonly --nginx \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}" \
  --non-interactive \
  --agree-tos \
  --email "${EMAIL}" \
  --redirect

echo "▸ Setting up auto-renewal..."
systemctl enable certbot.timer
systemctl start certbot.timer

echo "▸ Testing renewal..."
certbot renew --dry-run

echo "▸ Done. SSL active for https://${DOMAIN}"
