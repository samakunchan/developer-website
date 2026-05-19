# Stage 1: Install dependencies
FROM node:22-slim AS deps
WORKDIR /app

# Add openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Copy package management files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Stage 2: Build the application
FROM node:22-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Define build arguments so they are available during Vite compilation (build-time variables)
ARG VITE_APP_NAME
ARG VITE_RECAPTCHA_SITE_KEY
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY

# Generate Prisma client
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

# Compile translations before building (Lingui)
RUN if [ -f package.json ] && grep -q "lingui compile" package.json; then yarn compile; fi

# Build the project (Nitro build)
RUN yarn build

# Stage 3: Production runner
FROM node:22-slim AS runner
WORKDIR /app

# Add openssl for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files for database initialization and runtime
COPY package.json yarn.lock* ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output
COPY shells/docker-entrypoint-prod.sh ./entrypoint.sh

# Make entrypoint executable
RUN chmod +x ./entrypoint.sh

# Expose the application port
EXPOSE 3000

# Use the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]
