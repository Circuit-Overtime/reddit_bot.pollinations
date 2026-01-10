#!/bin/bash

# Cleanup function to handle zombie processes and port cleanup
cleanup() {
  local exit_code=$?
  echo ""
  echo "🧹 Cleaning up processes..."
  
  # Kill the playtest process if it exists
  if [ ! -z "$PLAYTEST_PID" ] && kill -0 $PLAYTEST_PID 2>/dev/null; then
    kill -TERM $PLAYTEST_PID 2>/dev/null
    sleep 1
    kill -KILL $PLAYTEST_PID 2>/dev/null
  fi
  
  # Kill any remaining devvit processes
  pkill -f "devvit playtest" 2>/dev/null || true
  pkill -f "node.*devvit" 2>/dev/null || true
  
  # Kill any node processes using port 5678
  lsof -ti:5678 2>/dev/null | xargs kill -9 2>/dev/null || true
  
  # Wait a bit for processes to terminate
  sleep 1
  
  echo "✓ Cleanup complete"
  exit $exit_code
}

# Set trap to cleanup on exit
trap cleanup EXIT INT TERM

SUBREDDIT="pollinations_ai"
timeout=120
elapsed=0
interval=2

echo "🚀 Starting Pollinations deployment pipeline..."
echo "📝 Step 1: Generating image prompt and updating link.ts..."
npx tsx src/pipeline.ts
PIPELINE_EXIT_CODE=$?
if [ $PIPELINE_EXIT_CODE -eq 0 ]; then
  echo "✓ Pipeline completed successfully"
  if ! [ -f src/link.ts ] || [ -z "$(grep -o 'const LINK' src/link.ts)" ]; then
    echo "ℹ️  No merged PRs found. Exiting with success."
    exit 0
  fi
else
  echo "❌ Pipeline failed"
  exit 1
fi

echo "✓ Pipeline completed, waiting 5 seconds for link.ts to update..."
sleep 5

# Kill any existing devvit processes before starting new playtest
pkill -f "devvit playtest" 2>/dev/null || true
pkill -f "node.*devvit" 2>/dev/null || true
sleep 2

echo "📤 Step 2: Starting playtest mode..."
npx devvit playtest "$SUBREDDIT" &
PLAYTEST_PID=$!
sleep 3

echo "📝 Step 3: Triggering update (modify main.ts)..."
echo "" >> src/main.ts

echo "📊 Step 4: Watching for successful image post..."
echo ""

while [ $elapsed -lt $timeout ]; do
  if npx devvit logs "$SUBREDDIT" 2>&1 | grep -q "being created asynchronously"; then
    echo ""
    echo "✅ Image post triggered successfully!"
    echo "Exiting safely..."
    exit 0
  fi
  sleep $interval
  elapsed=$((elapsed + interval))
done

echo "❌ Timeout waiting for image post"
exit 1