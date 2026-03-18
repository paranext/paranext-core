#!/bin/bash
# CDP Helper using websocat
# Prerequisites: websocat, jq, curl

CDP_PORT=9223

# Get WebSocket URL for Platform.Bible renderer
get_ws_url() {
  curl -s "http://localhost:$CDP_PORT/json" | \
    jq -r '.[] | select((.type=="page") and ((.url | contains("localhost:1212")) or (.title | contains("Platform.Bible")))) | .webSocketDebuggerUrl' | \
    head -1
}

case "$1" in
  screenshot)
    WS_URL=$(get_ws_url)
    if [ -z "$WS_URL" ]; then
      echo "Error: No Platform.Bible renderer found" >&2
      exit 1
    fi
    OUTPUT="${2:-/tmp/screenshot.png}"
    # Use -B to set a larger buffer for screenshot data (10MB)
    RESPONSE=$( (echo '{"id":1,"method":"Page.captureScreenshot","params":{"format":"png"}}'; sleep 2) | websocat -B 10485760 "$WS_URL" 2>/dev/null )
    echo "$RESPONSE" | jq -r '.result.data' | base64 -d > "$OUTPUT"
    echo "Screenshot saved to: $OUTPUT"
    ;;

  exec)
    WS_URL=$(get_ws_url)
    if [ -z "$WS_URL" ]; then
      echo "Error: No Platform.Bible renderer found" >&2
      exit 1
    fi
    CODE="$2"
    ESCAPED=$(echo "$CODE" | jq -Rs .)
    (echo "{\"id\":1,\"method\":\"Runtime.evaluate\",\"params\":{\"expression\":$ESCAPED,\"returnByValue\":true}}"; sleep 1) | \
      websocat "$WS_URL" | jq '.result.result.value // .result.result.description'
    ;;

  info)
    curl -s "http://localhost:$CDP_PORT/json" | \
      jq '.[] | select(.type=="page") | {title, url, type}'
    ;;

  list)
    curl -s "http://localhost:$CDP_PORT/json" | jq '.[] | {type, title, url}'
    ;;

  *)
    echo "CDP Helper for Platform.Bible Visual Verification"
    echo ""
    echo "Usage:"
    echo "  cdp-helper.sh screenshot [output-path]   Take screenshot"
    echo "  cdp-helper.sh exec \"<javascript>\"        Execute JS"
    echo "  cdp-helper.sh info                        Get page info"
    echo "  cdp-helper.sh list                        List targets"
    echo ""
    echo "Prerequisites: websocat, jq"
    echo "Start app with: ./refresh.sh"
    ;;
esac
