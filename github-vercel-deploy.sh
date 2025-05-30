#!/bin/bash
# filepath: /Users/ekko/Developer/ekkolabs/github-vercel-deploy.sh

# Colors for terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}===========================================================${NC}"
echo -e "${BLUE}🚀 GitHub Push and Vercel Deployment Script - Ekko Labs${NC}"
echo -e "${BLUE}===========================================================${NC}"

# Step 1: Check git status
echo -e "${BLUE}📊 Checking git status...${NC}"
git status

# Step 2: Add all changes to git
echo -e "\n${BLUE}➕ Adding all changes to git...${NC}"
git add .

# Step 3: Prompt for commit message
echo -e "\n${YELLOW}Please enter a commit message (or press Enter for default message):${NC}"
read commit_msg

# Use default commit message if none provided
if [ -z "$commit_msg" ]; then
  commit_date=$(date "+%Y-%m-%d %H:%M:%S")
  commit_msg="Update blog system and improve database handling ($commit_date)"
  echo -e "${BLUE}Using default commit message: ${commit_msg}${NC}"
fi

# Step 4: Commit changes
echo -e "\n${BLUE}💾 Committing changes...${NC}"
git commit -m "$commit_msg"

# Step 5: Push to GitHub
echo -e "\n${BLUE}📤 Pushing to GitHub...${NC}"
git push

# Check if push was successful
if [ $? -ne 0 ]; then
  echo -e "\n${RED}❌ Failed to push to GitHub. Please fix any issues and try again.${NC}"
  exit 1
fi

echo -e "\n${GREEN}✅ Successfully pushed to GitHub!${NC}"

# Step 6: Deploy to Vercel using existing script
echo -e "\n${BLUE}🚀 Starting Vercel deployment...${NC}"
bash ./deploy-vercel.sh

echo -e "\n${GREEN}✅ GitHub push and Vercel deployment complete!${NC}"
echo -e "${BLUE}===========================================================${NC}"
echo -e "${GREEN}Your changes are now live on GitHub and Vercel!${NC}"
echo -e "${BLUE}===========================================================${NC}"
