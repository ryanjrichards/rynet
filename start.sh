#!/bin/bash

echo "Starting the application..."

# Check if the script is being sourced
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    echo "Please source this script: source start.sh"
    exit 1
fi

# Activate the virtual environment
source venv/bin/activate

# Install required packages
pip install -r requirements.txt

# Start the Flask backend
cd backend
flask run &

# Start the React application
cd ../frontend
npm run dev
