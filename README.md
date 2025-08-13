# AI-Powered Requirements Gathering Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://python.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)

A comprehensive AI-powered platform that transforms how businesses collect, analyze, and manage client requirements through intelligent document processing, meeting transcription, and context-aware AI analysis.

## 🚀 Features

- **📄 Document Management**: Upload, process, and analyze PDF, DOCX, and TXT files
- **🎥 Meeting Integration**: Automatic Zoom meeting recording and transcription
- **🤖 AI-Powered Analysis**: Multi-model AI chat with context awareness (GPT-4, Claude, Gemini)
- **🔍 Semantic Search**: Vector-based search across all documents and meetings
- **📊 Intelligent Reporting**: Automated report generation with insights and analytics
- **🔐 Enterprise Security**: Role-based access, encryption, and GDPR compliance
- **📱 Modern UI**: Responsive React interface with Material-UI components

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker & Docker Compose
- Git

### Quick Installation
```bash
# Clone the repository
git clone <your-repository-url>
cd requirement-gathering-app

# Start the development environment
docker-compose up -d
npm run dev:all

# Access the application
# Frontend: http://localhost:3001
# API Gateway: http://localhost:3000
```

For detailed setup instructions, see [Getting Started Guide](getting-started.md).

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
├── frontend/                       # React frontend application
├── backend/                        # Microservices backend
│   ├── api-gateway/               # Main API gateway
│   └── services/                  # Individual microservices
├── docker/                        # Docker configurations
├── scripts/                       # Development and deployment scripts
└── docs/                          # Additional documentation
```

## 🏗️ Architecture

The platform follows a microservices architecture with the following key components:

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │────│   API Gateway   │────│   Microservices │
│   (React)       │    │   (Node.js)     │    │   (Node.js/Python)
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
- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit + RTK Query
- **File Upload**: react-dropzone
- **Real-time**: Socket.io-client

### Backend
- **API Gateway**: Node.js + Express.js + TypeScript
- **Microservices**: Python FastAPI + Node.js
- **Authentication**: JWT + Passport.js
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

## 🚀 Installation

### Development Environment

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd requirement-gathering-app
   ```

2. **Set up environment variables**
   ```bash
   # Copy environment templates
   cp backend/api-gateway/.env.example backend/api-gateway/.env
   cp backend/services/document-service/.env.example backend/services/document-service/.env
   cp backend/services/ai-service/.env.example backend/services/ai-service/.env
   cp frontend/.env.example frontend/.env
   ```

3. **Start the development environment**
   ```bash
   # Start databases
   docker-compose -f docker-compose.dev.yml up -d
   
   # Install dependencies
   npm run install:all
   
   # Start all services
   npm run dev:all
   ```

For detailed installation instructions, see [Getting Started Guide](getting-started.md).

### Production Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose exec api-gateway npm run migrate
```

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
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend/api-gateway && npm test
cd backend/services/meeting-service && npm test

# Python service tests
cd backend/services/document-service && pytest
cd backend/services/ai-service && pytest
```

### Test Coverage
- Unit tests: 90%+ coverage target
- Integration tests: API endpoint testing
- End-to-end tests: Critical user flows

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
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

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
