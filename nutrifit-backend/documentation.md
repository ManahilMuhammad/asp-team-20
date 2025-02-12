## Technologies Used
- Backend: Node.js with Express
- Database: MongoDB(PostgreSQL)
- Authentication: JWT-based authentication


## API Endpoints
### User Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate and log in a user
- `GET /api/users` - Retrieves all users from the database

## Usage
### Setting Up the App
1. Install dependencies: `npm install`
2. Start the backend: `node server.js`
3. Open `http://localhost:3000` in your browser
4. Use any of the API Endpoints e.g., http://localhost:3000/api/users