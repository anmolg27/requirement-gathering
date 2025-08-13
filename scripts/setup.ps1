#!/usr/bin/env pwsh

Write-Host "Setting up Requirements Gathering App Development Environment" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green

# Check if Docker is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    Write-Host "Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Node.js is installed
try {
    node --version | Out-Null
    Write-Host "Node.js is installed" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if Python is installed
try {
    python --version | Out-Null
    Write-Host "Python is installed" -ForegroundColor Green
} catch {
    Write-Host "Python is not installed. Some features may not work." -ForegroundColor Yellow
}

Write-Host "`nSetting up environment files..." -ForegroundColor Yellow

# Create .env files if they don't exist
$envFiles = @(
    "backend/api-gateway/.env",
    "backend/document-processor/.env",
    "backend/meeting-processor/.env",
    "backend/ai-service/.env",
    "frontend/.env"
)

foreach ($envFile in $envFiles) {
    $exampleFile = $envFile -replace "\.env$", ".env.example"
    if (Test-Path $exampleFile) {
        if (-not (Test-Path $envFile)) {
            Copy-Item $exampleFile $envFile
            Write-Host "Created $envFile" -ForegroundColor Green
        } else {
            Write-Host "$envFile already exists" -ForegroundColor Blue
        }
    }
}

Write-Host "`nInstalling dependencies..." -ForegroundColor Yellow

# Install root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Cyan
npm install

# Install API Gateway dependencies
Write-Host "Installing API Gateway dependencies..." -ForegroundColor Cyan
Set-Location backend/api-gateway
npm install
Set-Location ../..

# Install Frontend dependencies (if directory exists)
if (Test-Path "frontend") {
    Write-Host "Installing Frontend dependencies..." -ForegroundColor Cyan
    Set-Location frontend
    npm install
    Set-Location ..
}

Write-Host "`nStarting Docker containers..." -ForegroundColor Yellow

# Start Docker containers
Write-Host "Starting PostgreSQL and Redis..." -ForegroundColor Cyan
docker-compose -f docker-compose.dev.yml up -d postgres redis

# Wait for containers to be ready
Write-Host "Waiting for containers to be ready..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

Write-Host "`nSetting up database..." -ForegroundColor Yellow

# Generate Prisma client and run migrations
Set-Location backend/api-gateway
Write-Host "Generating Prisma client..." -ForegroundColor Cyan
npx prisma generate

Write-Host "Running database migrations..." -ForegroundColor Cyan
npx prisma migrate dev --name init

Write-Host "Seeding database..." -ForegroundColor Cyan
npm run seed

Set-Location ../..

Write-Host "`nSetup completed successfully!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start the development servers: npm run dev" -ForegroundColor White
Write-Host "2. Access the application at: http://localhost:3000" -ForegroundColor White
Write-Host "3. API Gateway will be available at: http://localhost:3001" -ForegroundColor White
Write-Host "4. Check the documentation in the docs/ folder" -ForegroundColor White
Write-Host "`nHappy coding!" -ForegroundColor Green
