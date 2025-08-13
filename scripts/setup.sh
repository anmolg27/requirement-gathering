#!/bin/bash

# Requirements Gathering Platform - Setup Script
# This script sets up the development environment for Sprint 1

set -e

echo "🚀 Setting up Requirements Gathering Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    print_success "Docker and Docker Compose are installed"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi

    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi

    print_success "Node.js $(node -v) is installed"
}

# Check if Python is installed
check_python() {
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.9+ first."
        exit 1
    fi

    PYTHON_VERSION=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
    PYTHON_MAJOR=$(echo $PYTHON_VERSION | cut -d'.' -f1)
    PYTHON_MINOR=$(echo $PYTHON_VERSION | cut -d'.' -f2)

    if [ "$PYTHON_MAJOR" -lt 3 ] || ([ "$PYTHON_MAJOR" -eq 3 ] && [ "$PYTHON_MINOR" -lt 9 ]); then
        print_error "Python 3.9+ is required. Current version: $PYTHON_VERSION"
        exit 1
    fi

    print_success "Python $PYTHON_VERSION is installed"
}

# Create environment files
setup_env_files() {
    print_status "Setting up environment files..."

    # API Gateway
    if [ ! -f "backend/api-gateway/.env" ]; then
        cp backend/api-gateway/env.example backend/api-gateway/.env
        print_success "Created backend/api-gateway/.env"
    else
        print_warning "backend/api-gateway/.env already exists"
    fi

    # Frontend
    if [ ! -f "frontend/.env" ]; then
        cat > frontend/.env << EOF
REACT_APP_API_URL=http://localhost:3000
REACT_APP_WS_URL=ws://localhost:3000
EOF
        print_success "Created frontend/.env"
    else
        print_warning "frontend/.env already exists"
    fi

    print_warning "Please update the environment files with your actual configuration values"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."

    # API Gateway
    print_status "Installing API Gateway dependencies..."
    cd backend/api-gateway
    npm install
    cd ../../

    # Frontend
    print_status "Installing Frontend dependencies..."
    cd frontend
    npm install
    cd ../

    print_success "Dependencies installed successfully"
}

# Setup database
setup_database() {
    print_status "Setting up database..."

    # Start databases
    docker-compose -f docker-compose.dev.yml up -d postgres redis

    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    sleep 10

    # Run database migrations
    print_status "Running database migrations..."
    cd backend/api-gateway
    npx prisma migrate dev --name init
    npx prisma generate
    cd ../../

    print_success "Database setup completed"
}

# Create seed data
create_seed_data() {
    print_status "Creating seed data..."

    cd backend/api-gateway
    npm run seed
    cd ../../

    print_success "Seed data created"
}

# Main setup function
main() {
    print_status "Starting setup process..."

    # Check prerequisites
    check_docker
    check_node
    check_python

    # Setup environment files
    setup_env_files

    # Install dependencies
    install_dependencies

    # Setup database
    setup_database

    # Create seed data
    create_seed_data

    print_success "Setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Update environment files with your actual configuration"
    echo "2. Start the development environment: docker-compose -f docker-compose.dev.yml up"
    echo "3. Access the application:"
    echo "   - Frontend: http://localhost:3001"
    echo "   - API Gateway: http://localhost:3000"
    echo "   - Health Check: http://localhost:3000/health"
    echo ""
    echo "Happy coding! 🚀"
}

# Run main function
main "$@"
