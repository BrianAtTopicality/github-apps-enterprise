# GitHub Apps Enterprise

[![CI Pipeline](https://github.com/BrianAtTopicality/github-apps-enterprise/actions/workflows/ci.yml/badge.svg)](https://github.com/BrianAtTopicality/github-apps-enterprise/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/BrianAtTopicality/github-apps-enterprise/actions/workflows/cd.yml/badge.svg)](https://github.com/BrianAtTopicality/github-apps-enterprise/actions/workflows/cd.yml)
[![codecov](https://codecov.io/gh/BrianAtTopicality/github-apps-enterprise/branch/main/graph/badge.svg)](https://codecov.io/gh/BrianAtTopicality/github-apps-enterprise)

> Enterprise-grade GitHub Apps implementation with multi-region deployment, AI/ML integration, chaos engineering, and comprehensive observability

## 🚀 Features

### Core Functionality
- **GitHub App Integration**: Secure webhook handling for repository events, pull requests, and issues
- **AI/ML Integration**: Advanced code analysis, automated review suggestions, and intelligent recommendations
- **Multi-Region Deployment**: Active-active architecture with automatic failover and geo-distributed endpoints
- **Real-time Processing**: Event-driven architecture with Redis-backed queue management

### Enterprise Capabilities
- **High Availability**: 99.99% uptime SLA with blue-green deployments and canary releases
- **Security**: End-to-end encryption, OAuth 2.0, webhook signature verification, and compliance with SOC 2
- **Observability**: Comprehensive monitoring with Prometheus, Grafana, Jaeger tracing, and structured logging
- **Scalability**: Horizontal scaling with Kubernetes, auto-scaling based on metrics, and efficient resource utilization
- **Chaos Engineering**: Automated fault injection and resilience testing

## 🏗️ Architecture

### Technology Stack
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js with custom middleware
- **Database**: PostgreSQL 15+ with connection pooling
- **Cache**: Redis 7+ for session management and queue processing
- **Monitoring**: Prometheus + Grafana + Jaeger
- **Container**: Docker with multi-stage builds
- **Orchestration**: Kubernetes with Helm charts

### System Components
```
┌─────────────────┐
│   GitHub API    │
└────────┬────────┘
         │
    ┌────▼─────┐
    │ Webhooks │
    └────┬─────┘
         │
┌────────▼──────────┐
│  Express Server   │
│  - Auth Middleware│
│  - Rate Limiting  │
│  - Validation     │
└────────┬──────────┘
         │
    ┌────▼────────────────────┐
    │   Business Logic Layer  │
    │  - Event Processing     │
    │  - AI/ML Integration    │
    │  - Workflow Automation  │
    └────┬────────────────────┘
         │
    ┌────▼────┐    ┌──────────┐
    │  Redis  │◄───┤PostgreSQL│
    └─────────┘    └──────────┘
```

## 📋 Prerequisites

- **Node.js**: v20.x or higher
- **Docker**: v24.x or higher
- **Docker Compose**: v2.20.x or higher
- **PostgreSQL**: v15.x or higher (for production)
- **Redis**: v7.x or higher (for production)
- **GitHub App**: Registered app with appropriate permissions

## 🚦 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/BrianAtTopicality/github-apps-enterprise.git
cd github-apps-enterprise
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your GitHub App credentials and configuration
```

### 4. Start Development Environment
```bash
# Start all services (app, PostgreSQL, Redis, Prometheus, Grafana, Jaeger)
docker-compose up -d

# Or run locally
npm run dev
```

### 5. Verify Installation
- **Application**: http://localhost:3000/health
- **Grafana**: http://localhost:3001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Jaeger**: http://localhost:16686
- **PgAdmin**: http://localhost:5050 (admin@admin.com/admin)

## 🔧 Configuration

### Environment Variables

See [.env.example](.env.example) for all configuration options:

```env
# GitHub App Configuration
GITHUB_APP_ID=your_app_id
GITHUB_PRIVATE_KEY=your_private_key
GITHUB_WEBHOOK_SECRET=your_webhook_secret
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/github_apps

# Redis Configuration
REDIS_URL=redis://localhost:6379
```

## 🔨 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server

# Testing
npm test            # Run test suite
npm run test:watch  # Run tests in watch mode
npm run test:cov    # Generate coverage report

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix linting issues
npm run format      # Format code with Prettier

# Type Checking
npm run type-check  # Run TypeScript compiler checks
```

### Project Structure
```
.
├── .github/
│   └── workflows/       # CI/CD workflows
├── src/
│   ├── index.ts        # Application entry point
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── models/         # Data models
│   └── utils/          # Utility functions
├── tests/              # Test files
├── k8s/                # Kubernetes manifests
├── docker-compose.yml  # Local development stack
├── Dockerfile          # Production container image
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 🚀 Deployment

### Docker

```bash
# Build production image
docker build -t ghcr.io/brianattopicality/github-apps-enterprise:latest .

# Run container
docker run -p 3000:3000 --env-file .env ghcr.io/brianattopicality/github-apps-enterprise:latest
```

### Kubernetes

```bash
# Deploy to Kubernetes
kubectl apply -f k8s/

# Check deployment status
kubectl rollout status deployment/github-apps -n production

# View logs
kubectl logs -f deployment/github-apps -n production
```

### GitHub Actions

Automated deployments are configured via GitHub Actions:
- **CI Pipeline**: Runs on every push/PR (lint, test, build, security scan)
- **CD Pipeline**: Deploys on tag creation (`v*.*.*`) or manual workflow dispatch

## 📊 Monitoring

### Metrics

- **Application Metrics**: Request rate, latency, error rate
- **System Metrics**: CPU, memory, disk I/O
- **Business Metrics**: Webhook processing time, GitHub API rate limits

### Dashboards

- **Grafana**: Pre-configured dashboards for application and infrastructure monitoring
- **Jaeger**: Distributed tracing for request flow analysis
- **Prometheus**: Time-series metrics storage and alerting

### Alerts

- High error rate (>5% of requests)
- Elevated response time (p95 >500ms)
- GitHub API rate limit approaching threshold
- Database connection pool exhaustion
- Memory usage >80%

## 🔒 Security

### Best Practices

- ✅ Webhook signature verification
- ✅ OAuth 2.0 authentication
- ✅ Secret management via environment variables
- ✅ Regular dependency updates and security scanning
- ✅ Rate limiting and DDoS protection
- ✅ Input validation and sanitization
- ✅ HTTPS/TLS enforcement
- ✅ Principle of least privilege for GitHub App permissions

### Security Scanning

Automated security scans run on every PR:
- **Trivy**: Container vulnerability scanning
- **npm audit**: Dependency vulnerability checking
- **CodeQL**: Static application security testing (SAST)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow TypeScript best practices
- Maintain code coverage >80%
- Update documentation as needed
- Follow conventional commit messages

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- [GitHub Apps Documentation](https://docs.github.com/en/apps)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prometheus](https://prometheus.io/)
- [Grafana](https://grafana.com/)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/BrianAtTopicality/github-apps-enterprise/issues)
- **Discussions**: [GitHub Discussions](https://github.com/BrianAtTopicality/github-apps-enterprise/discussions)
- **Email**: support@topicality.com

## 🗺️ Roadmap

- [x] Core GitHub App integration
- [x] Multi-region deployment
- [x] Comprehensive monitoring
- [x] CI/CD pipeline
- [ ] Advanced AI/ML features
- [ ] GraphQL API
- [ ] Plugin system
- [ ] Enhanced analytics dashboard
- [ ] Multi-cloud support (AWS, Azure, GCP)

---

**Built with ❤️ by [Topicality](https://github.com/BrianAtTopicality)**
