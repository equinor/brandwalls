# syntax=docker/dockerfile:1

FROM node:24-alpine AS core-os
RUN apk add --no-cache libc6-compat curl

FROM core-os AS base
WORKDIR /app
RUN npm install --global pnpm@10.0.0 turbo@2.10.10

FROM base AS prepare
COPY . .
RUN turbo prune brandwalls-web --docker

FROM base AS builder
COPY --from=prepare /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prepare /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=prepare /app/out/json/ .

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --from=prepare /app/out/full/ .

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_PROJECT_ID

ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1

RUN --mount=type=secret,id=sanity_api_token \
  sh -ec 'SANITY_API_READ_TOKEN="$(cat /run/secrets/sanity_api_token)" turbo build --filter=brandwalls-web'

FROM core-os AS runner
RUN apk add --no-cache tini

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_PROJECT_ID

ENV NODE_ENV=production
ENV NEXT_PUBLIC_SANITY_DATASET=${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=${ARG_SANITY_PROJECT_ID}
ENV NEXT_TELEMETRY_DISABLED=1
ENV USER=nextjs
ENV UID=12345

RUN addgroup -S "$USER" && adduser -S --uid "$UID" "$USER"

WORKDIR /app
COPY --from=builder /app/web/public ./web/public
COPY --from=builder --chown="$USER":"$USER" /app/web/.next/standalone ./
COPY --from=builder --chown="$USER":"$USER" /app/web/.next/static ./web/.next/static

USER "$UID"
EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./web/server.js"]