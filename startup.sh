#!/bin/bash

set -euo pipefail

# Environment setup
source src/.env
source src/.env.local

# Function definitions
log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") INFO: $*"
}

log_error() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") ERROR: $*" >&2
}

cleanup() {
  log_info "Cleaning up..."
}

trap cleanup EXIT ERR

# Main execution flow
log_info "Starting Fitness Tracker MVP..."

# Build the application
log_info "Building application..."
npm run build

# Start the application server
log_info "Starting application server..."
npm start