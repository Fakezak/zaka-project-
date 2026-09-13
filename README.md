Here's the **full README** for the Zaka Project Gateway with a **Free Fire New Lobby image/banner** added at the top.

---

# Zaka Project Gateway

<p align="center">
  <img src="./assets/freefire-new-lobby.png" alt="Free Fire New Lobby" width="900"/>
</p>

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-orange.svg)

A high-performance, scalable API gateway for the Zaka Project ecosystem. Handles routing, authentication, rate limiting, and service orchestration for all Zaka microservices — including the **Free Fire New Lobby** service.

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Free Fire New Lobby](#-free-fire-new-lobby)
- [API Reference](#-api-reference)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- **Intelligent Routing** — Dynamic route resolution to backend microservices
- **Authentication & Authorization** — JWT validation, OAuth2, and API key support
- **Rate Limiting** — Configurable per-client and per-route throttling
- **Load Balancing** — Round-robin, least-connections, and weighted strategies
- **Circuit Breaking** — Automatic failure detection and service isolation
- **Request/Response Transformation** — Header rewriting, payload mapping
- **Caching** — Redis-backed response caching
- **Observability** — Prometheus metrics, structured logging, distributed tracing
- **WebSocket Support** — Full-duplex proxy for real-time services (Free Fire lobby included)
- **CORS Management** — Centralized cross-origin policy

---

## 🏗 Architecture

```
                 ┌─────────────────┐
   Clients  ───► │  Zaka Gateway   │
                 └────────┬────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
  ┌──────────┐      ┌──────────┐      ┌────────────────┐
  │ Auth Svc │      │ Core Svc │      │ FreeFire Lobby │
  └──────────┘      └──────────┘      └────────────────┘
```

The gateway sits at the edge of the Zaka ecosystem, acting as a single entry point for all client traffic.

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x **or** Go >= 1.21
- Redis >= 7.0
- Docker & Docker Compose (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/zaka-project/gateway.git
cd gateway

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start the gateway
npm run start:dev
```

### Docker

```bash
docker compose up -d
```

The gateway will be available at `http://localhost:8080`.

---

## ⚙️ Configuration

Configuration is managed via environment variables or `config/gateway.yaml`.

| Variable | Description | Default |
|----------|-------------|---------|
| `GATEWAY_PORT` | Listening port | `8080` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | Secret for JWT validation | — |
| `RATE_LIMIT_WINDOW` | Rate limit window (ms) | `60000` |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |
| `LOG_LEVEL` | Logging verbosity | `info` |
| `TRACING_ENDPOINT` | OpenTelemetry collector URL | — |

### Example `gateway.yaml`

```yaml
routes:
  - path: /api/v1/auth/*
    service: auth-service
    auth: false
    rateLimit: 20

  - path: /api/v1/users/*
    service: user-service
    auth: true
    rateLimit: 100

  - path: /api/v1/freefire/lobby/*
    service: freefire-lobby-service
    auth: true
    rateLimit: 60
    websocket: true
    cache:
      ttl: 5s
```

---

## 🎮 Free Fire New Lobby

The gateway exposes a dedicated route group for **Free Fire New Lobby** management.

<p align="center">
  <img src="./assets/freefire-new-lobby.png" alt="Free Fire New Lobby Preview" width="700"/>
</p>

### Create Lobby

```http
POST /api/v1/freefire/lobby
```

**Request Body**
```json
{
  "mode": "battle-royale",
  "map": "bermuda",
  "maxPlayers": 4,
  "region": "sg",
  "isPrivate": true,
  "password": "optional"
}
```

**Response**
```json
{
  "lobbyId": "ff-9f3a2b",
  "joinCode": "ABC123",
  "host": "player_42",
  "players": 1,
  "maxPlayers": 4,
  "status": "waiting",
  "createdAt": "2026-09-13T10:00:00Z"
}
```

### Join / Leave Lobby

```http
POST   /api/v1/freefire/lobby/:lobbyId/join
DELETE /api/v1/freefire/lobby/:lobbyId/leave
```

### List Active Lobbies

```http
GET /api/v1/freefire/lobby?region=sg&mode=battle-royale
```

**Features**
- Real-time lobby state via WebSocket
- Region-aware matchmaking
- Auto-cleanup of idle lobbies (5 min timeout)
- Private lobbies with join codes

---

## 📡 API Reference

### Health Check

```http
GET /health
```

**Response**
```json
{
  "status": "ok",
  "uptime": 12345,
  "version": "1.0.0"
}
```

### Metrics

```http
GET /metrics
```

Returns Prometheus-formatted metrics.

### Proxy Routes

All requests matching a configured route are transparently forwarded:

```http
GET /api/v1/users/42
Authorization: Bearer <token>
```

---

## 🛠 Development

```bash
# Run in watch mode
npm run start:dev

# Lint
npm run lint

# Format
npm run format

# Build for production
npm run build
```

### Project Structure

```
gateway/
├── assets/
│   └── freefire-new-lobby.png   # Lobby banner/screenshot
├── src/
│   ├── config/         # Configuration loaders
│   ├── middleware/     # Auth, rate-limit, logging
│   ├── routes/         # Route definitions
│   ├── services/       # Backend service clients
│   ├── proxy/          # Proxy core
│   └── utils/          # Helpers
├── tests/
├── config/
└── docker-compose.yml
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# Coverage report
npm run test:cov
```

---

## 🚢 Deployment

### Kubernetes

```bash
kubectl apply -f deploy/k8s/
```

### Helm

```bash
helm install zaka-gateway ./deploy/helm
```

### Environment Promotion

| Environment | Branch | URL |
|-------------|--------|-----|
| Development | `develop` | dev.gateway.zaka.io |
| Staging | `release/*` | staging.gateway.zaka.io |
| Production | `main` | gateway.zaka.io |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🔗 Related Projects

- [Zaka Core](https://github.com/zaka-project/core)
- [Zaka Auth](https://github.com/zaka-project/auth)
- [Zaka CLI](https://github.com/zaka-project/cli)

---

<p align="center">Made with ❤️ by the Zaka Project Team</p>

---

### 📌 Notes on the image

- Save your Free Fire New Lobby image as: `assets/freefire-new-lobby.png`
- Replace the path if your file name is different (e.g., `.jpg`, `.gif`, or a hosted URL).
- If you're using a URL instead of a local file, swap `./assets/freefire-new-lobby.png` with your image link.

Want me to swap the image for a **hosted URL** or a **different filename**? Just tell me the link/name and I'll update it.
