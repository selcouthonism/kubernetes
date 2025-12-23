#!/bin/sh
# A simple traffic generator script that makes HTTP requests to a specified URL at regular intervals.

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <target> <interval-in-seconds>"
  exit 1
fi

TARGET_URL=$1
INTERVAL=$2

echo "Starting traffic generator to $TARGET_URL every $INTERVAL seconds..."

while true; do 
    REQUEST_TIME=$(date +"%Y-%m-%d %H:%M:%S")
    RESPONSE=$(curl -s -w " HTTP_STATUS:%{http_code}" "$TARGET_URL")
    
    echo "[$REQUEST_TIME] $RESPONSE"
    sleep $INTERVAL
done