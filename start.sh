#!/bin/bash

# Nexus - AI Automation Platform Startup Script
# This script starts the React frontend (runs on port 3001)

echo "🚀 Starting Nexus..."
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file with PORT=3001..."
    echo "PORT=3001" > .env
    echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
    echo ""
fi

echo "✨ Starting Nexus Electron app on port 3001..."
echo ""
echo "📍 React dev server: http://localhost:3001"
echo "🖥️  Electron window will open automatically"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

# Start the Electron application (starts React dev server + Electron window)
npm run start:electron
