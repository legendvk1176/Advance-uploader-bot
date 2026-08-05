#!/bin/bash
set -e

# Start the existing bot worker in background so it doesn't block the web server.
# Running it in background ensures the web server (gunicorn) runs in foreground
# so Render can detect the open port.

echo "🐍 Starting background worker: main.py"
# Start worker in background and redirect output to nohup log so it doesn't get killed.
python3 main.py &

# Start gunicorn in foreground, binding to $PORT so Render can detect the open port.
# Use provided env vars with sensible defaults for local testing.
PORT=${PORT:-5000}
WEB_CONCURRENCY=${WEB_CONCURRENCY:-1}

echo "🚀 Starting web server: gunicorn app:app --bind 0.0.0.0:$PORT --workers $WEB_CONCURRENCY"
exec gunicorn app:app --bind 0.0.0.0:$PORT --workers $WEB_CONCURRENCY
