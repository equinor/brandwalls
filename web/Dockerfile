FROM node:20-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV NODE_OPTIONS="--max_old_space_size=8192"

COPY package.json pnpm-lock.yaml ./
COPY web/package.json web/pnpm-lock.yaml web/

RUN \
  if [ -f pnpm-lock.yaml ]; then yarn global add pnpm@10.0.0 && pnpm m i --frozen-lockfile;\
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/web/node_modules ./web/node_modules
COPY . .

ARG ARG_SANITY_DATASET
ARG ARG_SANITY_API_READ_TOKEN
ARG ARG_SANITY_PROJECT_ID

ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}
ENV NEXT_PUBLIC_SANITY_PROJECT_ID ${ARG_SANITY_PROJECT_ID}
ENV SANITY_API_READ_TOKEN ${ARG_SANITY_API_READ_TOKEN}

# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN cd web && yarn build

# Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

ARG ARG_ENV
ARG ARG_SANITY_DATASET

ENV ENV ${ARG_ENV}
ENV NEXT_PUBLIC_SANITY_DATASET ${ARG_SANITY_DATASET}


ENV PORT 3000
ENV USER nextjs
ENV UID 12345
# https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -S "$USER"
RUN adduser -S --uid "$UID" "$USER"
RUN apk add --no-cache tini

# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown="$USER":"$USER" /app/web/.next/standalone .
COPY --from=builder --chown="$USER":"$USER" /app/web/.next/static ./.next/static

USER "$UID"

EXPOSE "$PORT"

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "server.js"]

