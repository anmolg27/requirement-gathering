# AI-Powered Requirements Gathering Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-000000.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)

A comprehensive AI-powered platform that transforms how businesses collect, analyze, and manage client requirements through intelligent document processing, meeting transcription, and context-aware AI analysis.

## 🚀 Features

- **📄 Document Management**: Upload, process, and analyze PDF, DOCX, and TXT files
- **🎥 Meeting Integration**: Automatic Zoom meeting recording and transcription
- **🤖 AI-Powered Analysis**: Multi-model AI chat with context awareness (GPT-4, Claude, Gemini)
- **🔍 Semantic Search**: Vector-based search across all documents and meetings
- **📊 Intelligent Reporting**: Automated report generation with insights and analytics
- **🔐 Enterprise Security**: Role-based access, encryption, and GDPR compliance
- **📱 Modern UI**: Responsive Next.js interface with Material-UI components and dark mode

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Requirements](#requirements)
- [Installation](#installation)
- [Documentation](#documentation)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## 🏃‍♂️ Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- **Git** ([Download](https://git-scm.com/))
- **PowerShell** (Windows) or **Bash** (macOS/Linux)

### Quick Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd requirement-gathering-app
   ```

2. **Run the setup script**
   ```bash
   # Windows (PowerShell)
   npm run setup
   
   # macOS/Linux (Bash)
   npm run setup:bash
   ```

3. **Start the development environment**
   ```bash
   # Start all services
   npm run dev:all
   ```

4. **Access the application**
   - **Frontend**: http://localhost:3001
   - **API Gateway**: http://localhost:3000
   - **Database**: localhost:5432 (PostgreSQL)
   - **Cache**: localhost:6379 (Redis)

### Manual Setup (Alternative)

If you prefer to set up manually:

```bash
# 1. Install dependencies
npm run install:all

# 2. Start Docker services
docker-compose -f docker-compose.dev.yml up -d

# 3. Set up database
cd backend/api-gateway
npm run migrate
npm run seed

# 4. Start development servers
npm run dev:all
```

## 📋 Requirements

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **RAM** | 8 GB | 16 GB |
| **Storage** | 10 GB | 20 GB |
| **CPU** | 2 cores | 4+ cores |
| **OS** | Windows 10, macOS 10.15+, Ubuntu 20.04+ | Latest stable |

### Software Requirements

| Software | Version | Purpose |
|----------|---------|---------|
| **Node.js** | 18.x or higher | JavaScript runtime |
| **Docker Desktop** | 4.x or higher | Containerization |
| **Git** | 2.x or higher | Version control |
| **PowerShell** (Windows) | 5.x or higher | Script execution |
| **Bash** (macOS/Linux) | 3.x or higher | Script execution |

### Environment Variables

The following environment variables need to be configured:

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/reqgather"
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# AI Services (Optional for basic setup)
OPENAI_API_KEY="your-openai-key"
ANTHROPIC_API_KEY="your-anthropic-key"
GOOGLE_AI_API_KEY="your-google-key"
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="ReqGather"
```

## 🚀 Installation

### Step-by-Step Setup

1. **Verify Prerequisites**
   ```bash
   # Check Node.js version
   node --version  # Should be 18.x or higher
   
   # Check Docker
   docker --version
   docker-compose --version
   
   # Check Git
   git --version
   ```

2. **Clone and Setup**
   ```bash
   # Clone repository
   git clone <your-repository-url>
   cd requirement-gathering-app
   
   # Run automated setup
   npm run setup
   ```

3. **Verify Installation**
   ```bash
   # Check if all services are running
   docker ps
   
   # Test API connection
   curl http://localhost:3000/health
   
   # Access frontend
   # Open http://localhost:3001 in your browser
   ```

### Troubleshooting

#### Common Issues

**Port Already in Use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

**Docker Issues**
```bash
# Restart Docker Desktop
# Then run:
docker system prune -a
docker-compose -f docker-compose.dev.yml up -d
```

**Database Connection Issues**
```bash
# Check if PostgreSQL is running
docker logs postgres

# Reset database
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
```

**Node Modules Issues**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Documentation

This project includes comprehensive documentation to help you understand, set up, and use the platform effectively:

### 📖 Core Documentation

| Document | Description | Purpose |
|----------|-------------|---------|
| **[system-design.md](system-design.md)** | Complete system architecture and design | Understand the overall system design, components, and data flow |
| **[implementation-guide.md](implementation-guide.md)** | Technical implementation details and project structure | Get detailed technical specifications and implementation guidance |
| **[sprint-doc.md](sprint-doc.md)** | Sprint planning and project timeline | Follow the 6-sprint development plan with user stories and deliverables |
| **[working.md](working.md)** | How the system works in detail | Understand user workflows, technical processes, and real-world usage |

### 🛠️ Setup & Development

| Document | Description | Purpose |
|----------|-------------|---------|
| **[getting-started.md](getting-started.md)** | Step-by-step setup guide | Get the development environment running quickly |
| **docs/api/** | API documentation | Reference for all API endpoints and integrations |
| **docs/deployment/** | Deployment guides | Production deployment instructions |

### 📁 Project Structure

```
requirement-gathering-app/
├── 📄 README.md                    # This file - Project overview
├── 🏗️ system-design.md             # System architecture and design
├── ⚙️ implementation-guide.md      # Technical implementation details
├── 📅 sprint-doc.md                # Sprint planning and timeline
├── 🔧 working.md                   # How the system works
├── 🚀 getting-started.md           # Setup and installation guide
├── frontend/                       # Next.js frontend application
│   ├── src/
│   │   ├── app/                   # Next.js App Router
│   │   ├── components/            # React components
│   │   ├── contexts/              # React contexts
│   │   └── lib/                   # Utility functions
│   ├── package.json
│   └── next.config.js
├── backend/                        # Microservices backend
│   ├── api-gateway/               # Main API gateway
│   │   ├── src/
│   │   ├── prisma/                # Database schema
│   │   └── package.json
│   └── services/                  # Individual microservices
├── docker-compose.dev.yml         # Development Docker setup
├── scripts/                       # Development and deployment scripts
│   ├── setup.ps1                  # Windows setup script
│   └── setup.sh                   # Unix setup script
└── docs/                          # Additional documentation
```

## 🏗️ Architecture

The platform follows a microservices architecture with the following key components:

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │────│   API Gateway   │────│   Microservices │
│   (Next.js)     │    │   (Node.js)     │    │   (Node.js/Python)
└─────────────────┘    └─────────────────┘    └─────────────────┘
                               │
                       ┌─────────────────┐
                       │   Data Layer    │
                       │                 │
                       │ • PostgreSQL    │
                       │ • Pinecone      │
                       │ • Redis         │
                       │ • AWS S3        │
                       └─────────────────┘
```

### Core Services
- **API Gateway**: Authentication, routing, and request handling
- **Document Service**: File processing, text extraction, and vector embeddings
- **Meeting Service**: Zoom integration and transcription
- **AI Service**: Multi-model AI integration and context management
- **Auth Service**: User authentication and authorization

For detailed architecture information, see [System Design Document](system-design.md).

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v5 with dark mode
- **State Management**: React Context + Hooks
- **Styling**: Tailwind CSS + MUI System
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Real-time**: Socket.io-client

### Backend
- **API Gateway**: Node.js + Express.js + TypeScript
- **Microservices**: Python FastAPI + Node.js
- **Authentication**: JWT + bcryptjs
- **Database**: PostgreSQL 15 + Prisma ORM
- **Vector Database**: Pinecone
- **Cache**: Redis 7
- **File Storage**: AWS S3

### AI & ML
- **AI Models**: OpenAI GPT-4, Anthropic Claude, Google Gemini
- **Embeddings**: OpenAI text-embedding-ada-002
- **Transcription**: AssemblyAI
- **Vector Search**: Pinecone

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

## 📖 Usage

### Basic Workflow

1. **Create a Project**
   - Register/login to the platform
   - Create a new project with client details
   - Configure AI settings and team members

2. **Upload Documents**
   - Drag-and-drop or browse for files (PDF, DOCX, TXT)
   - Documents are automatically processed and indexed
   - View extracted text and metadata

3. **Schedule Meetings**
   - Create Zoom meetings with automatic recording
   - Meetings are transcribed with speaker identification
   - Content is integrated with document analysis

4. **AI Analysis**
   - Ask questions about requirements using AI chat
   - Get context-aware responses with citations
   - Generate summaries, estimations, and reports

5. **Generate Reports**
   - Create comprehensive reports for stakeholders
   - Export data in multiple formats
   - Share insights and recommendations

For detailed usage instructions and workflows, see [Working Document](working.md).

## 🔌 API Reference

### Authentication Endpoints
```http
POST /auth/login          # User login
POST /auth/register       # User registration
POST /auth/refresh        # Refresh JWT token
POST /auth/logout         # User logout
```

### Document Endpoints
```http
POST /documents/upload    # Upload document
GET /documents/:projectId # List project documents
GET /documents/:id        # Get document details
DELETE /documents/:id     # Delete document
```

### Meeting Endpoints
```http
POST /meetings/schedule   # Schedule meeting
GET /meetings/:projectId  # List project meetings
POST /meetings/:id/process # Process recording
GET /meetings/:id/transcript # Get transcript
```

### AI Chat Endpoints
```http
POST /ai/chat            # Send chat message
GET /ai/chat/:sessionId  # Get chat history
POST /ai/summarize       # Generate summary
POST /ai/estimate        # Generate estimation
```

For complete API documentation, see `docs/api/` directory.

## 🧪 Testing

### Run Tests
```bash
# Run all tests (frontend + backend)
npm test

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:api

# Run tests with coverage
cd frontend && npm run test:coverage
cd backend/api-gateway && npm run test:coverage
```

### Test Setup
- **Frontend**: Jest + React Testing Library for component testing
- **Backend**: Jest + Supertest for API endpoint testing
- **Coverage**: Built-in coverage reporting for both frontend and backend

### Writing Tests
- Frontend tests: `frontend/src/__tests__/`
- Backend tests: `backend/api-gateway/src/__tests__/`
- Example test files are provided to get started

## 📈 Development Roadmap

### Phase 1: Core Platform (Weeks 1-6)
- ✅ Foundation and authentication
- ✅ Document management system
- ✅ Meeting integration and transcription
- ✅ AI chat and context management

### Phase 2: Advanced Features (Weeks 7-12)
- ✅ Analytics dashboard
- ✅ Advanced reporting
- ✅ Requirement validation
- ✅ Production deployment

### Phase 3: Enhancements (Months 4-6)
- 🔄 Mobile application
- 🔄 Advanced AI model fine-tuning
- 🔄 Integration with project management tools
- 🔄 Advanced analytics and ML

For detailed sprint planning, see [Sprint Documentation](sprint-doc.md).

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write tests for new features (see [Testing](#-testing) section)
- Update documentation as needed
- Ensure all tests pass before submitting (`npm test`)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- 📖 **Documentation**: Start with the [Getting Started Guide](getting-started.md)
- 🐛 **Issues**: Report bugs and request features via GitHub Issues
- 💬 **Discussions**: Join community discussions on GitHub Discussions
- 📧 **Email**: Contact us at support@yourcompany.com

### Common Issues
- **Port conflicts**: Check if ports 3000, 3001, 8001, 8002 are available
- **Database connection**: Ensure PostgreSQL and Redis are running
- **API keys**: Verify all external service API keys are configured
- **Docker issues**: Check Docker and Docker Compose installation

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 and embeddings
- **Anthropic** for Claude AI model
- **Google** for Gemini AI model
- **Pinecone** for vector database
- **AssemblyAI** for transcription services
- **Zoom** for meeting integration
- **Material-UI** for the beautiful UI components

## 📊 Project Status

- **Current Version**: 1.0.0
- **Development Status**: Active Development
- **Last Updated**: December 2024
- **Next Release**: Q1 2025

---

**Built with ❤️ for better requirements gathering**

For questions, feedback, or contributions, please reach out to our team!
