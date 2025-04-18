# shrinkwrap-legal-extension

## Environment Variables

This project uses environment variables for configuration. To set up your environment:

1. Copy the `.env.example` file to a new file named `.env`:
   ```
   cp .env.example .env
   ```

2. Edit the `.env` file to set your environment-specific values:
   ```
   # API configuration
   API_BASE_URL=http://localhost:8080  # URL of the API server
   ```

The `.env` file is excluded from version control to prevent sensitive information from being committed.
