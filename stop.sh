#!/bin/bash

echo "Stopping the application..."

# Stop the React application
pkill -f "npm start"

# Stop the Flask backend
pkill -f "flask run"
