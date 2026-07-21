FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /workspace

FROM base AS dependencies
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY apps/api/package.json apps/api/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/observability/package.json packages/observability/package.json
RUN pnpm install --filter @enterprise-kit/api... --frozen-lockfile=false

FROM dependencies AS build
COPY tsconfig.base.json ./
COPY apps/api apps/api
COPY packages/contracts packages/contracts
COPY packages/observability packages/observability
RUN pnpm --filter @enterprise-kit/api build

FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=dependencies /workspace/node_modules ./node_modules
COPY --from=build /workspace/apps/api/dist ./dist
COPY --from=build /workspace/apps/api/package.json ./package.json
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
