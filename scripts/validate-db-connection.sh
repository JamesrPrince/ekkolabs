#!/usr/bin/env zsh
# Database connection validation script

# Load environment variables from .env or .env.production
if [[ -f .env.production ]]; then
  echo "\033[1;34mLoading production environment variables...\033[0m"
  source .env.production
elif [[ -f .env ]]; then
  echo "\033[1;34mLoading development environment variables...\033[0m"
  source .env
else
  echo "\033[1;31mError: No .env or .env.production file found\033[0m"
  exit 1
fi

# Check database URL format
echo "\033[1;33m▶ Checking DATABASE_URL format\033[0m"
if [[ -z "$DATABASE_URL" ]]; then
  echo "\033[1;31m✖ DATABASE_URL is not set\033[0m"
  exit 1
fi

# Detect connection type
if [[ "$DATABASE_URL" == postgresql://* ]]; then
  echo "\033[1;32m✓ Using direct PostgreSQL connection: $DATABASE_URL\033[0m"
  CONNECTION_TYPE="direct"
elif [[ "$DATABASE_URL" == prisma+postgres://* ]]; then
  echo "\033[1;32m✓ Using Prisma Accelerate connection\033[0m"
  CONNECTION_TYPE="accelerate"
else
  echo "\033[1;31m✖ Invalid DATABASE_URL format: $DATABASE_URL\033[0m"
  echo "DATABASE_URL must start with postgresql:// or prisma+postgres://"
  exit 1
fi

# Run the database test script
echo "\033[1;33m▶ Testing database connection...\033[0m"
NODE_ENV=$NODE_ENV npx tsx scripts/simple-db-test.ts

# Check if the test succeeded
if [[ $? -ne 0 ]]; then
  echo "\033[1;31m✖ Database connection test failed\033[0m"
  
  # Provide troubleshooting steps based on connection type
  if [[ "$CONNECTION_TYPE" == "direct" ]]; then
    echo "\n\033[1;34mTroubleshooting direct PostgreSQL connection:\033[0m"
    echo "1. Make sure PostgreSQL is running"
    echo "2. Check that the database exists and credentials are correct"
    echo "3. Verify network connectivity to database server"
  elif [[ "$CONNECTION_TYPE" == "accelerate" ]]; then
    echo "\n\033[1;34mTroubleshooting Prisma Accelerate connection:\033[0m"
    echo "1. Verify your Prisma Accelerate API key is valid"
    echo "2. Check that your underlying PostgreSQL database is accessible"
    echo "3. Confirm your Prisma Accelerate subscription is active"
  fi
  
  exit 1
else
  echo "\033[1;32m✓ Database connection successful!\033[0m"
fi
