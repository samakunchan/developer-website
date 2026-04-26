# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app

# Add libc6-compat for compatibility with native modules
RUN apk add --no-cache libc6-compat

# Copy package management files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Stage 2: Build the application
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

# Compile translations before building (Lingui)
RUN if [ -f package.json ] && grep -q "lingui compile" package.json; then yarn compile; fi

# Build the project (Nitro build)
RUN yarn build

# Stage 3: Production runner
FROM node:22-alpine AS runner
WORKDIR /app

# Add libc6-compat for Prisma
RUN apk add --no-cache libc6-compat

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
