@echo off
REM Cloud Haiku Setup Script for Windows

echo.
echo Cloud Haiku - Setup Script
echo ============================
echo.

REM Check prerequisites
echo Checking prerequisites...
where node >nul 2>nul
if errorlevel 1 (
    echo Error: Node.js not found. Please install Node.js 18+
    exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
    echo Error: npm not found. Please install npm
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo OK Node.js %NODE_VERSION%
echo OK npm %NPM_VERSION%
echo.

REM Setup Frontend
echo Setting up Frontend...
cd frontend
call npm install
echo OK Frontend dependencies installed
echo.

REM Setup Backend
echo Setting up Backend...
cd ..\backend
call npm install
echo OK Backend dependencies installed

REM Setup environment
if not exist .env.local (
    copy .env.example .env.local
    echo Warning: Created .env.local - Please configure database connection
)

echo.
echo Setup complete!
echo.
echo To start development:
echo.
echo Terminal 1 - Frontend:
echo   cd frontend && npm run dev
echo.
echo Terminal 2 - Backend:
echo   cd backend && npm run dev
echo.
echo Terminal 3 - Database:
echo   cd backend && npm run prisma:studio
echo.
echo Frontend: http://localhost:3000
echo API: http://localhost:3001
echo Database: http://localhost:5555
echo.
