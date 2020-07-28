#!/usr/bin/env bash
#
# Description
# ===========
#
# Pre-deploy hook. Does the following:
#   1. Shows the commits about to be pushed
#   2. Ask for confirmation (exit with 1 if not confirming)
#   3. Notify Slack
#
#
# Developing
# ==========
# 
# During development, the best way to test it is to call the script
# directly with `./scripts/pre-deploy.sh staging|production`. You can also set
# the `SLACK_CHANNEL` to your personnal channel so you don't flood the team.
# To do that, right click on your own name in Slack, `Copy link`, then
# only keep the last part of the URL.
#
# Or you can set `PUSH_TO_SLACK` to false to echo the payload instead of
# sending it.
#
# ------------------------------------------------------------------------------

if [ "$#" -ne 2 ]; then
  echo "Usage: [DEPLOY_MSG='An optional custom deploy message'] $0 staging|production APP_ID"
  exit 1
fi

SLACK_CHANNEL="CEZUS9WH3"

# ---- Utils ----

function confirm()
{
  echo -n "$@"
  read -e answer
  for response in y Y yes YES Yes Sure sure SURE OK ok Ok
  do
      if [ "$answer" == "$response" ]
      then
          return 0
      fi
  done

  # Any answer other than the list above is considerred a "no" answer
  return 1
}

function exit_success()
{
  echo "🚀  Deploying now..."
  exit 0
}

# ---- Ask for confirmation ----

echo "ℹ️  You're about to deploy current branch to $1 server."
confirm "❔ Are you sure (yes/no) > " || exit 1

# ---- Slack notification ----

cd -- "$(dirname $0)/.."
eval $(cat .env | grep OC_SLACK_DEPLOY_WEBHOOK=)

if [ -z "$OC_SLACK_DEPLOY_WEBHOOK" ]; then
  # Emit a warning as we don't want the deploy to crash just because we
  # havn't setup a Slack token. Get yours on https://api.slack.com/custom-integrations/legacy-tokens
  echo "ℹ️  OC_SLACK_DEPLOY_WEBHOOK is not set, I will not notify Slack about this deploy 😞  (please do it manually)"
  exit_success
fi

if [ ! -z "$DEPLOY_MSG" ]; then
  CUSTOM_MESSAGE="-- _$(echo $DEPLOY_MSG | sed 's/"/\\\\"/g' | sed "s/'/\\\\'/g")_"
fi

read -d '' PAYLOAD << EOF
  {
    "channel": "${SLACK_CHANNEL}",
    "text": "🍻️ Deploying *Zapier App* to *${1}* ${CUSTOM_MESSAGE}\\\n> https://zapier.com/app/developer/app/${2}",
    "as_user": true,
    "unfurl_media": false
  }
EOF

curl \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$PAYLOAD" \
  -s \
  --fail \
  "$OC_SLACK_DEPLOY_WEBHOOK" \
  &> /dev/null

if [ $? -ne 0 ]; then
  echo "⚠️  I won't be able to notify slack. Please do it manually and check your OC_SLACK_DEPLOY_WEBHOOK"
else
  echo "🔔  Slack notified about this deployment."
fi

# Always exit with 0 to continue the deploy even if slack notification failed
exit_success
