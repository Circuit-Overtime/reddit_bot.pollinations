#!/bin/bash

# Use the same npx and node from the user's environment
NPX="/usr/bin/npx"
NODE="/usr/bin/node"
TSX="$NODE $($NPX which tsx)"

# Check if URL and TITLE are provided
if [ $# -lt 2 ]; then
  echo "❌ Usage: $0 <URL> <TITLE>"
  echo "Example: $0 'https://example.com/image.jpg' 'My Title Here'"
  exit 1
fi

URL="$1"
TITLE="$2"

cleanup() {
  local exit_code=$?
  echo ""
  echo "🧹 Cleaning up processes..."
  
  echo "📤 Committing and pushing changes to GitHub..."
  git add .
  git commit -m "Deploy updated link.ts and main.ts" 2>/dev/null || true
  git push origin main 2>/dev/null || true
  
  if [ ! -z "$PLAYTEST_PID" ] && kill -0 $PLAYTEST_PID 2>/dev/null; then
    kill -TERM $PLAYTEST_PID 2>/dev/null
    sleep 1
    kill -KILL $PLAYTEST_PID 2>/dev/null
  fi
  
  pkill -f "devvit playtest" 2>/dev/null || true
  pkill -f "node.*devvit" 2>/dev/null || true
  pkill -f "^node$" 2>/dev/null || true
  
  lsof -ti:5678 2>/dev/null | xargs kill -9 2>/dev/null || true
  
  zombies=$(ps aux | grep -c " <defunct>")
  if [ $zombies -gt 1 ]; then
    echo "⚠️  Found zombie processes, cleaning up..."
    ps aux | grep " <defunct>" | awk '{print $2}' | xargs -r kill -9 2>/dev/null || true
  fi
  
  sleep 1
  
  echo "✓ Cleanup complete"
  exit $exit_code
}

trap cleanup EXIT INT TERM

SUBREDDIT="pollinations_ai"

echo "🚀 Starting Pollinations deployment pipeline..."
echo "📝 Step 1: Updating link.ts with provided URL and TITLE..."

# Create link.ts with the provided URL and TITLE
cat > src/link.ts << EOF
const LINK = "$URL";
const TITLE = "$TITLE";
export {LINK, TITLE};
EOF

if [ $? -eq 0 ]; then
  echo "✓ link.ts updated successfully"
else
  echo "❌ Failed to update link.ts"
  exit 1
fi

echo "✓ link.ts updated, waiting 5 seconds..."
sleep 5

pkill -f "devvit playtest" 2>/dev/null || true
pkill -f "node.*devvit" 2>/dev/null || true
sleep 2

echo "📤 Step 2: Starting playtest mode..."
$NPX devvit playtest "$SUBREDDIT" &
PLAYTEST_PID=$!
sleep 3

echo "📝 Step 3: Triggering update (modify og_main.ts)..."
echo "" >> src/og_main.ts

echo "📊 Step 4: Watching for successful image post..."
echo ""

echo "⏱️  Keeping process alive for 2 minutes..."
sleep 120

echo ""
echo "✅ 2 minutes elapsed. Shutting down..."
exit 0