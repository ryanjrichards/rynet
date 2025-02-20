#!/bin/bash

echo "Setting up the environment..."

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

cd frontend

# Install Node.js dependencies
npm install

echo "Setup complete."
