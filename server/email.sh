#!/bin/bash

# Send an email using curl with EmailJS API
curl -X POST 'https://api.emailjs.com/api/v1.0/email/send' \
-H 'Content-Type: application/json' \
-d '{
  "service_id": "service_4w37ao6",
  "template_id": "template_c2nlb05",
  "user_id": "4KTn4uzA1fq-7eoQh",
  "template_params": {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Subject",
    "message": "This is a test message."
  }
}'
