#!/bin/bash
#
# This script run on CircleCI to start the API, wait for it to
# be responsive then call `npm run zapier:test`
#
# ---------------------------------------------------------------

cd ~/api
echo "> Starting api server"
PG_DATABASE=opencollective_dvl npm start &
API_PID=$!
cd -

# Wait for a service to be up
function wait_for_service() {
  echo "> Waiting for $1 to be ready... "
  while true; do
    nc -z "$2" "$3"
    EXIT_CODE=$?
    if [ $EXIT_CODE -eq 0 ]; then
      echo "> Application $1 is up!"
      break
    fi
    sleep 1
  done
}

echo ""
wait_for_service API 127.0.0.1 3060

echo ""
echo "> Running Zapier tests"
API_URL=http://localhost:3060/graphql npm run zapier:test
RETURN_CODE=$?

echo "Killing all node processes"
kill $API_PID;
echo "Exiting with code $RETURN_CODE"
exit $RETURN_CODE
