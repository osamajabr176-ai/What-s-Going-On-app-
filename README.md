# What-s-Going-On-app-
What's Going On app? – Secure Anonymous Messaging Backend  # Overview What's Going On app? is a secure, production‑ready backend for an anonymous messaging platform (inspired by the classic “What's Going On?” concept).
SarahaApplication – Secure Anonymous Messaging Backend

- JWT‑based authentication with short‑lived access tokens (15 min) and long‑lived refresh tokens (configurable TTL, default 7 days).
- Refresh‑token rotation and reuse detection with SHA‑256 hash storage in Redis.
- Rate‑limiting per‑IP, per‑recipient, and per‑IP‑recipient using Redis (rate-limit-redis).
- OTP verification with cryptographically secure random codes, hashed before storage.
- Two‑step verification (optional) and password reset flows.
- Comprehensive logging – JSON logger with redaction of sensitive fields and request correlation IDs.
- Robust validation via Zod schemas.
- Test suite (Jest + Supertest + mongodb‑memory‑server + test Redis) with failing‑first methodology.

The codebase follows modern JavaScript (ESM) standards, uses clean architecture, and is ready for containerisation (Docker Compose) and CI pipelines.

# Getting Started
## Prerequisites
- Node ≥ 20 (ESM support)
- Docker (optional, for Redis & MongoDB)
- Git

## Installation
```bash
# Clone repository
git clone https://github.com/your-username/SarahaApplication.git
cd SarahaApplication

# Install dependencies
npm ci

# Copy example environment and edit values
cp .env.example .env
# Edit .env – set JWT_SECRET, REFRESH_TOKEN_SECRET (≥32 chars), DB URLs, etc.
