#!/usr/bin/env zsh
# Database setup and migration script for Ekko Labs

# Load environment variables
echo "Loading environment variables..."
if [[ -f .env ]]; then
  source .env
else
  echo "Error: .env file not found. Please create one based on .env.example"
  exit 1
fi

# Check for DATABASE_URL
if [[ -z "$DATABASE_URL" ]]; then
  echo "Error: DATABASE_URL is not set in your .env file"
  exit 1
fi

# Confirm the database URL is valid
if [[ ! "$DATABASE_URL" =~ ^(postgresql|prisma\+postgres):// ]]; then
  echo "Error: DATABASE_URL must start with postgresql:// or prisma+postgres://"
  exit 1
fi

echo "Database URL format is valid."

# Function to run Prisma commands
run_prisma_command() {
  local cmd=$1
  echo "Running: npx prisma $cmd"
  npx prisma $cmd
  if [[ $? -ne 0 ]]; then
    echo "Error: Failed to execute 'npx prisma $cmd'"
    exit 1
  fi
}

# Generate Prisma client
echo "Generating Prisma client..."
run_prisma_command "generate"

# Check if this is a new setup or migration
read -r "response?Do you want to (1) Initialize a new database or (2) Run migrations on existing database? [1/2]: "

case "$response" in
  1)
    echo "Initializing new database..."
    run_prisma_command "migrate dev --name initial-migration"
    
    read -r "seed_response?Do you want to seed the database with initial data? [y/N]: "
    if [[ "$seed_response" =~ ^[Yy]$ ]]; then
      echo "Seeding database..."
      npx tsx prisma/seed.ts
    fi
    ;;
  2)
    echo "Running migrations on existing database..."
    run_prisma_command "migrate dev"
    ;;
  *)
    echo "Invalid option. Exiting."
    exit 1
    ;;
esac

echo "Database setup complete!"
echo "You can now run 'npx prisma studio' to view your database."
