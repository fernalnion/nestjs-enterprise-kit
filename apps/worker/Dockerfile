FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /workspace

FROM base AS dependencies
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY apps/worker/package.json apps/worker/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/observability/package.json packages/observability/package.json
RUN pnpm install --filter @enterprise-kit/worker... --frozen-lockfile=false

FROM dependencies AS build
COPY tsconfig.base.json ./
COPY apps/worker apps/worker
COPY packages/contracts packages/contracts
COPY packages/observability packages/observability
RUN pnpm --filter @enterprise-kit/worker build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=dependencies /workspace/node_modules ./node_modules
COPY --from=build /workspace/apps/worker/dist ./dist
COPY --from=build /workspace/apps/worker/package.json ./package.json
USER node
CMD ["node", "dist/main.js"]
