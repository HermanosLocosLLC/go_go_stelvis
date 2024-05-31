#!/bin/bash

# This script runs linting checks and tests to validate (or invalidate) the current build.

# Color variables
RED='\033[0;31m'
GREEN='\033[32;1m'
NC='\033[0m' # No color

# Run linting checks
LINT_COMMAND=lint docker compose -f docker-compose-lint.yml up --abort-on-container-exit

# Stop and exit if linting issues were found
if [ $? != 0 ]; then
  echo -e "\n${RED}❌ Linting checks failed. Stopping build check ❌\n${NC}"
  exit 1
fi

# Run unit tests
TEST_COMMAND=test:silent docker compose -f docker-compose-test.yml up --abort-on-container-exit

# Stop and exit if any unit tests failed
if [ $? != 0 ]; then
  echo -e "\n${RED}💩 Unit tests failed. Stopping build check 💩\n${NC}"
  exit 1
fi

echo -e "\n${GREEN}💥 All build checks passed 💥\n${NC}"
exit 0