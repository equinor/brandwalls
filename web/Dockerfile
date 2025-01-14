# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
#COPY package.json pnpm-lock.yaml* .npmrc* ./
#COPY web/package.json web/
COPY pnpm-lock.yaml ./

#RUN \
#  if [ -f pnpm-lock.yaml ]; then pnpm m i --frozen-lockfile; \
#  else echo "Lockfile not found." && exit 1; \
#  fi

RUN pnpm fetch --prod
ADD . ./
RUN pnpm install -r --offline --prod

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/web/node_modules ./web/node_modules
COPY . .

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_API_READ_TOKEN
ARG ARG_SANITY_PROJECT_ID

ENV SANITY_API_READ_TOKEN ${ARG_SANITY_API_READ_TOKEN}
ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID ${ARG_SANITY_PROJECT_ID}

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm web build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_API_READ_TOKEN
ARG ARG_SANITY_PROJECT_ID

ENV SANITY_API_READ_TOKEN ${ARG_SANITY_API_READ_TOKEN}
ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID ${ARG_SANITY_PROJECT_ID}

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

ENV USER nextjs
ENV UID 1001

RUN addgroup -S "$USER"
RUN adduser -S --uid "$UID" "$USER"
RUN apk add --no-cache tini

# Do we need this in next 15, everything is in app?
# COPY --from=builder /app/web/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/web/.next/static ./.next/static

USER "$UID"

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
# ENV HOSTNAME="0.0.0.0"
ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "server.js"]