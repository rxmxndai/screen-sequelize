## Create a New User Record

**Endpoint:** `POST /api/users`

**Description:** Create a new user record with provided data.

**Request:**
- Method: `POST`
- Headers: Content-Type: application/json
- Body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
