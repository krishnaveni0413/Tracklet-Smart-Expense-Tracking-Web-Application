#!/bin/bash

# Cloud Haiku Setup Script
# Sets up both frontend and backend for development

set -e

echo "🌤️ Cloud Haiku - Setup Script"
echo "=============================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo "✅ npm $(npm --version)"
echo ""

# Setup Frontend
echo "📦 Setting up Frontend..."
cd frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd ../backend
npm install
echo "✅ Backend dependencies installed"

# Setup environment
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "⚠️  Created .env.local - Please configure database connection"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo ""
echo "Terminal 1 - Frontend:"
echo "  cd frontend && npm run dev"
echo ""
echo "Terminal 2 - Backend:"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 3 - Database:"
echo "  cd backend && npm run prisma:studio"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔌 API: http://localhost:3001"
echo "📊 Database: http://localhost:5555"
echo ""
