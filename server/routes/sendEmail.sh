#!/bin/bash

# Hardcoded variables for email
RECIPIENT_EMAIL=$1
USER_NAME=$2
SUBJECT="Thank You For Registering!!!"
CONTENT="Dear $2, Thank You For Registering to Our Forum Lefora. Hope You Enjoy Your Time! \nThank You,\nTeam LEFORA"
API_KEY=$3 # Replace with actual API key

# SendGrid API URL
SENDGRID_URL="https://api.sendgrid.com/v3/mail/send"

# Construct JSON payload
JSON_PAYLOAD=$(cat <<EOF
{
  "personalizations": [
    {
      "to": [
        {
          "email": "$RECIPIENT_EMAIL"
        }
      ],
      "subject": "$SUBJECT"
    }
  ],
  "from": {
    "email": "amratanshuwork@gmail.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "$CONTENT"
    }
  ]
}
EOF
)

# Log the payload for debugging
echo "Payload: $JSON_PAYLOAD"

# Send the request to SendGrid
RESPONSE=$(curl --request POST \
  --url $SENDGRID_URL \
  --header "Authorization: Bearer $API_KEY" \
  --header "Content-Type: application/json" \
  --data "$JSON_PAYLOAD" \
  --write-out "%{http_code}" \
  --silent --output /dev/null)

# Log the response code
echo "Curl response code: $RESPONSE"

if [ "$RESPONSE" -eq 202 ]; then
  echo "Email sent successfully."
else
  echo "Failed to send email. Response code: $RESPONSE"
fi
