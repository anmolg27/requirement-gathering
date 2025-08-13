# Getting Started - Requirements Gathering Tool

## Quick Start Guide

This guide will help you get the requirements gathering tool up and running on your local development environment.

## Prerequisites

### Required Software
- **Node.js** 18+ (Latest LTS recommended)
- **Python** 3.9+ 
- **Docker** & **Docker Compose**
- **Git**
- **Code Editor** (VS Code recommended)

### External Services Setup

#### 1. Zoom API Setup
1. Go to [Zoom Marketplace](https://marketplace.zoom.us/)
2. Create a new app of type "OAuth"
3. Note down your Client ID and Client Secret
4. Set redirect URL to `http://localhost:3000/auth/zoom/callback`

#### 2. AI Service API Keys
- **OpenAI**: Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Anthropic**: Get API key from [Anthropic Console](https://console.anthropic.com/)
- **Google AI**: Get API key from [Google AI Studio](https://aistudio.google.com/)

#### 3. Vector Database (Pinecone)
1. Sign up at [Pinecone](https://www.pinecone.io/)
2. Create a new index with dimension 1536 (for OpenAI embeddings)
3. Note down your API key and environment

#### 4. AWS S3 (File Storage)
1. Create an AWS account
2. Create an S3 bucket for file storage
3. Create IAM user with S3 access
4. Note down Access Key ID and Secret Access Key

## Installation Steps

### 1. Clone Repository
```bash
git clone <your-repository-url>
cd requirement-gathering-app
```

### 2. Environment Setup

Create environment files for each service:

#### Frontend Environment (frontend/.env)
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_WS_URL=ws://localhost:3000
```

#### API Gateway Environment (backend/api-gateway/.env)
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/reqgather
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Zoom API
ZOOM_CLIENT_ID=your-zoom-client-id
ZOOM_CLIENT_SECRET=your-zoom-client-secret
ZOOM_REDIRECT_URI=http://localhost:3000/auth/zoom/callback

# Service URLs
DOCUMENT_SERVICE_URL=http://localhost:8001
MEETING_SERVICE_URL=http://localhost:3002
AI_SERVICE_URL=http://localhost:8002
```

#### Document Service Environment (backend/services/document-service/.env)
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/reqgather

# Vector Database
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=requirements-documents

# File Storage
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_BUCKET_NAME=your-s3-bucket-name
AWS_REGION=us-east-1

# OpenAI for embeddings
OPENAI_API_KEY=your-openai-api-key
```

#### AI Service Environment (backend/services/ai-service/.env)
```env
# AI Model APIs
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
GOOGLE_API_KEY=your-google-api-key

# Vector Database
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX_NAME=requirements-documents

# Default Model Settings
DEFAULT_MODEL=gpt-4
MAX_TOKENS=4000
TEMPERATURE=0.7
```

#### Meeting Service Environment (backend/services/meeting-service/.env)
```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/reqgather

# Zoom API
ZOOM_CLIENT_ID=your-zoom-client-id
ZOOM_CLIENT_SECRET=your-zoom-client-secret

# Transcription Service (AssemblyAI)
ASSEMBLYAI_API_KEY=your-assemblyai-api-key

# File Storage
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_BUCKET_NAME=your-s3-bucket-name
AWS_REGION=us-east-1
```

### 3. Database Setup

#### Start PostgreSQL and Redis with Docker
```bash
# Create docker-compose.yml for development databases
cat > docker-compose.dev.yml << EOF
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: reqgather
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
EOF

# Start databases
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
cd ..
```

#### Backend Services
```bash
# API Gateway
cd backend/api-gateway
npm install
cd ../..

# Meeting Service
cd backend/services/meeting-service
npm install
cd ../../..

# Document Service
cd backend/services/document-service
pip install -r requirements.txt
cd ../../..

# AI Service
cd backend/services/ai-service
pip install -r requirements.txt
cd ../../..
```

### 5. Database Migrations

```bash
# Run from backend/api-gateway directory
cd backend/api-gateway
npx prisma migrate dev
npx prisma generate
cd ../..
```

### 6. Start Development Servers

Open 5 terminal windows/tabs and run each service:

#### Terminal 1 - Frontend
```bash
cd frontend
npm start
```

#### Terminal 2 - API Gateway
```bash
cd backend/api-gateway
npm run dev
```

#### Terminal 3 - Document Service
```bash
cd backend/services/document-service
uvicorn main:app --reload --port 8001
```

#### Terminal 4 - AI Service
```bash
cd backend/services/ai-service
uvicorn main:app --reload --port 8002
```

#### Terminal 5 - Meeting Service
```bash
cd backend/services/meeting-service
npm run dev
```

## Verification

### Check Service Health
1. **Frontend**: Open http://localhost:3001
2. **API Gateway**: Visit http://localhost:3000/health
3. **Document Service**: Visit http://localhost:8001/health
4. **AI Service**: Visit http://localhost:8002/health
5. **Meeting Service**: Visit http://localhost:3002/health

### Test Basic Functionality
1. **Registration**: Create a new user account
2. **Login**: Sign in with your credentials
3. **Document Upload**: Upload a test PDF/DOCX file
4. **AI Chat**: Ask a simple question about requirements

## Development Workflow

### Daily Development
```bash
# Start databases
docker-compose -f docker-compose.dev.yml up -d

# Start all services (run in separate terminals)
npm run dev:all  # If you create this script
```

### Database Management
```bash
# Reset database
npx prisma migrate reset

# View database
npx prisma studio

# Generate new migration
npx prisma migrate dev --name your-migration-name
```

### Testing
```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend/api-gateway && npm test
cd backend/services/meeting-service && npm test

# Python service tests
cd backend/services/document-service && pytest
cd backend/services/ai-service && pytest
```

## Common Issues & Solutions

### Issue: Port Already in Use
```bash
# Find and kill process using port
lsof -ti:3000 | xargs kill -9  # Replace 3000 with your port
```

### Issue: Database Connection Failed
```bash
# Restart PostgreSQL container
docker-compose -f docker-compose.dev.yml restart postgres

# Check database is running
docker-compose -f docker-compose.dev.yml ps
```

### Issue: Python Dependencies
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Issue: Node.js Version
```bash
# Use Node Version Manager
nvm install 18
nvm use 18
```

## Next Steps

1. **Explore the Code**: Start with the frontend components and API routes
2. **Add Sample Data**: Upload some test documents and schedule test meetings
3. **Test AI Features**: Try different AI models and queries
4. **Customize UI**: Modify the frontend to match your requirements
5. **Add Features**: Implement additional functionality based on your needs

## Development Tools Recommendations

### VS Code Extensions
- TypeScript and JavaScript Language Features
- Python
- Prisma
- Docker
- REST Client
- GitLens

### Browser Extensions
- React Developer Tools
- Redux DevTools

### Database Tools
- pgAdmin (PostgreSQL GUI)
- Redis Commander (Redis GUI)

## Support & Resources

- **Documentation**: Check the `/docs` folder for detailed API documentation
- **Issues**: Use GitHub issues for bug reports and feature requests
- **API Testing**: Use the provided Postman collection in `/docs/api`

Happy coding! 🚀
