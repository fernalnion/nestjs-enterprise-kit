# Architecture decisions

This baseline implements the approved direction:

- Node.js 24, NestJS 11 and Fastify
- pnpm workspace modular monolith
- Separate API and worker processes
- PostgreSQL with Prisma; Redis and BullMQ
- Domain/application/infrastructure/presentation dependency direction
- Typed and fail-fast environment validation
- Transactional outbox schema and append-only audit schema
- Structured contracts for integration events and jobs
- AsyncLocalStorage request-context foundation
- OpenAPI enabled outside production
- Architecture checks through Dependency Cruiser

Feature modules should start minimally and grow into explicit application, domain,
infrastructure and presentation folders only when their complexity requires it.
