#!/bin/bash

echo "Setting up Requirements Gathering App Development Environment"
echo "================================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Check if Docker is installed
echo -e "${YELLOW}Checking prerequisites...${NC}"
if command -v docker &> /dev/null; then
    echo -e "${GREEN}Docker is installed${NC}"
else
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo -e "${GREEN}Node.js is installed${NC}"
else
    echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}Python is installed${NC}"
elif command -v python &> /dev/null; then
    echo -e "${GREEN}Python is installed${NC}"
else
    echo -e "${YELLOW}Python is not installed. Some features may not work.${NC}"
fi

echo -e "\n${YELLOW}Setting up environment files...${NC}"

# Create .env files if they don't exist
env_files=(
    "backend/api-gateway/.env"
    "backend/document-processor/.env"
    "backend/meeting-processor/.env"
    "backend/ai-service/.env"
    "frontend/.env"
)

for env_file in "${env_files[@]}"; do
    example_file="${env_file%.env}.env.example"
    if [ -f "$example_file" ]; then
        if [ ! -f "$env_file" ]; then
            cp "$example_file" "$env_file"
            echo -e "${GREEN}Created $env_file${NC}"
        else
            echo -e "${BLUE}$env_file already exists${NC}"
        fi
    fi
done

echo -e "\n${YELLOW}Installing dependencies...${NC}"

# Install root dependencies
echo -e "${CYAN}Installing root dependencies...${NC}"
npm install

# Install API Gateway dependencies
echo -e "${CYAN}Installing API Gateway dependencies...${NC}"
cd backend/api-gateway
npm install
cd ../..

# Install Frontend dependencies (if directory exists)
if [ -d "frontend" ]; then
    echo -e "${CYAN}Installing Frontend dependencies...${NC}"
    cd frontend
    npm install
    cd ..
fi

echo -e "\n${YELLOW}Starting Docker containers...${NC}"

# Start Docker containers
echo -e "${CYAN}Starting PostgreSQL and Redis...${NC}"
docker-compose -f docker-compose.dev.yml up -d postgres redis

# Wait for containers to be ready
echo -e "${CYAN}Waiting for containers to be ready...${NC}"
sleep 10

echo -e "\n${YELLOW}Setting up database...${NC}"

# Generate Prisma client and run migrations
cd backend/api-gateway
echo -e "${CYAN}Generating Prisma client...${NC}"
npx prisma generate

echo -e "${CYAN}Running database migrations...${NC}"
npx prisma migrate dev --name init

echo -e "${CYAN}Seeding database...${NC}"
npm run seed

cd ../..

echo -e "\n${GREEN}Setup completed successfully!${NC}"
echo -e "${GREEN}================================================================"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "${WHITE}1. Start the development servers: npm run dev:all${NC}"
echo -e "${WHITE}2. Access the frontend at: http://localhost:3001${NC}"
echo -e "${WHITE}3. API Gateway will be available at: http://localhost:3000${NC}"
echo -e "${WHITE}4. Check the documentation in the docs/ folder${NC}"
echo -e "\n${GREEN}Happy coding!${NC}"
