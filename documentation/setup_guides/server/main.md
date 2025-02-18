# Software Requirements
- [PostgreSQL](https://www.postgresql.org)
- [HeidiSQL](https://www.heidisql.com) or another SQL client
- [node](https://nodejs.org/en) v22.13.0+

## Setting Up the App
1. Navigate to `src/server/config`, create a copy of `config.template.json` and name it `config.json`
2. Populate the `config.json` fields with the appropriate data
3. Navigate back to `src/server` and run `npm install` to install dependancies
4. Start the backend:
    - Production: `node server.js`
    - Development: `npm run dev`
5. Open `http://localhost:3000` in your browser
6. Use any of the API Endpoints e.g., http://localhost:3000/api/users listed in `setup_guides/server/authentication.md`