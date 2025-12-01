#!/bin/bash
set -e

echo "🚀 Deploying EventRadarApp..."

git pull origin main

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

pytest tests/

python src/app.py
