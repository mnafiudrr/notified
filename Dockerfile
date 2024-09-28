# Use Bun
FROM oven/bun

# Set work directory
WORKDIR /app

# Copy source code
COPY package.json ./
COPY src ./src
COPY .babelrc ./
COPY babel.config.js ./
COPY tsconfig.json ./

# Install dependencies
RUN bun install

# Expose port
EXPOSE 3000

# Run server
CMD ["bun", "run", "dev"]
