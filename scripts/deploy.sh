#!/bin/bash

# Check args (must provide env)

if [ "$#" -ne 1 ]; then
  echo "Usage: [DEPLOY_MSG='An optional custom deploy message'] $0 staging|production"
  exit 1
fi

# Set variables

if [ "$1" == "staging" ]; then
  APP_ID="21592"
  API_URL="https://staging.opencollective.com/api/graphql"
elif [ "$1" == "production" ]; then
  APP_ID="21484"
  API_URL="https://opencollective.com/api/graphql"
else
  echo "Unknwown ENV $1"
  exit 1
fi

# Call pre-deploy so user confirm and we notify slack
./scripts/pre-deploy.sh "$1" "$APP_ID" || exit 0

# Generate `.zapierapprc` file

echo "🔗  Linking App${APP_ID} ($1)"
cat <<EOF > .zapierapprc
  {
    "id": "${APP_ID}",
    "key": "App${APP_ID}"
  }
EOF

# Build app
ENV=$1 API_URL=$API_URL npm run zapier push
RETURN_CODE=$?

# Remove zappier config file

echo "✨ Cleaning temporary files"
rm .zapierapprc

# Exit gracefuly

if [ $RETURN_CODE -eq 0 ]; then
  echo "---------------------------------------------------------------------------------"
  echo ""
  echo "🎉 Success! View the app on 👉️ https://zapier.com/app/developer/app/$APP_ID"
  echo ""
fi

exit $RETURN_CODE
