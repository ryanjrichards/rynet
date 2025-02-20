#!/bin/bash

echo "Starting the application..."

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
