#!/usr/bin/env bash
# Test helper: POST a remote image URL to the local Cloudinary upload route
# Usage: ./scripts/test-cloudinary-upload.sh

set -euo pipefail

URL="http://localhost:3000/api/cloudinary-upload"
REMOTE="https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg"

curl -v -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d "{\"remoteUrl\": \"$REMOTE\", \"filename\": \"shoes_test\"}"