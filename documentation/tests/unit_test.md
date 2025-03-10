# Unit Test Documentation for NutriFit App Authentication Endpoints

This document describes the unit tests written for the NutriFit backend authentication endpoints. The tests cover the registration and login functionalities. It explains the purpose, structure, dependencies, and usage of the tests.

---

## Overview

The NutriFit app uses Sequelize for data modeling, Express for the server, and JWT for authentication. The authentication endpoints (registration and login) are tested using Jest with an in-memory SQLite database to ensure that:

- **User registration** works as expected with valid credentials.
- Duplicate user registration is prevented.
- Password strength is enforced.
- **User login** works as expected with valid credentials.
- Login fails for invalid credentials (non-existent email or incorrect password).

The tests are defined in the file `tests/authController.test.js`.

---

## Prerequisites

Before running the tests, ensure that the following libraries are installed:

- **Jest**: For running the tests.
- **sqlite3**: For in-memory database testing with Sequelize (optional but recommended).
- **Supertest**: (Optional) For HTTP endpoint tests if needed.
- **bcryptjs**: For password hashing.
- **Sequelize** and **sequelize-cli**: For database interaction and migrations.

The dependencies should be installed using:

```bash
npm install
```

And if necessary, install any missing dev-dependencies:

```bash
npm install --save-dev jest sqlite3
```

The `package.json` is updated to run tests via Jest:

```bash
"scripts":  {
  "test": "jest",
  "build": "node esbuild.config.js",
  "dev": "nodemon server.js"
}
```


---

## Test Setup

### Database Setup
- The tests use an in-memory SQLite database to ensure isolation and speed.
- The Sequelize instance is synchronized (with `force: true`) before the tests run.
- The User table is cleared before each test to ensure tests do not interfere with one another.

### Mocks and Helpers
- **Mocking generateToken:**  
  The token generation function is mocked to return a fixed string (e.g., `"dummyToken"`) to ensure predictable outputs in tests.
  
- **Mock Response Object:**  
  A helper function creates a mock `res` (response) object with mocked `status` and `json` methods. This allows tests to inspect the HTTP status codes and JSON responses returned by controller functions.

---

## Test Cases

The test suite is divided into two main sections:

### 1. Registration Endpoint Tests

**File:** `tests/authController.test.js`  
**Controller Function:** `registerUser`

- **Successful Registration:**
  - **Test:** Should register a user with valid credentials.
  - **Description:**  
    A user is created with a valid name, email, and password that meets strength requirements. The test verifies that the controller responds with a `201` status code and returns a JSON object containing user details and a token.
  
- **Duplicate Email Registration:**
  - **Test:** Should not register a user if email already exists.
  - **Description:**  
    A user is pre-created in the database, and then a registration request with the same email is made. The expected result is a `400` status code with an error message stating "User already exists".

- **Weak Password – Too Short:**
  - **Test:** Should not register a user if the password is too short.
  - **Description:**  
    The test sends a registration request with a password shorter than 6 characters. The controller is expected to return a `400` status with an error message indicating that the password is too short.

- **Weak Password – Missing Uppercase or Symbol:**
  - **Test:** Should not register a user if the password does not contain at least one uppercase letter and one symbol.
  - **Description:**  
    The registration request includes a password that is long enough but lacks an uppercase letter and symbol. The expected response is a `400` status and a specific error message regarding password requirements.

### 2. Login Endpoint Tests

**File:** `tests/authController.test.js`  
**Controller Function:** `loginUser`

- **Successful Login:**
  - **Test:** Should login a user with valid credentials.
  - **Description:**  
    A user is created with a hashed password. A login request is made with the correct email and password. The test expects a successful `200` response with a JSON object containing the token and full user details (including fields like `age` and `motto`).

- **Non-Existing Email:**
  - **Test:** Should not login a user with a non-existing email.
  - **Description:**  
    The test sends a login request using an email that isn’t in the database. The expected result is a `400` status with an error message "Invalid email or password".

- **Incorrect Password:**
  - **Test:** Should not login a user with an incorrect password.
  - **Description:**  
    A user is created, then a login request is made with the correct email but wrong password. The expected outcome is a `400` status and an error message indicating invalid credentials.

---

## Running the Tests

To run the unit tests, execute the following command in the project’s root directory:

```bash
npm test
```

For a watch mode (automatically re-run tests on file changes), run:

```bash
npm test -- --watchAll
```

---

## Additional Notes

- **Error Handling:**  
  The tests are designed to catch both validation errors (like missing or invalid field values) and functional errors (like duplicate email registration).
  
- **Data Consistency:**  
  The test suite cleans up the database before each test to avoid data contamination. If you modify your model validations or defaults, ensure that your test data complies with these changes.

- **Mocking:**  
  The `generateToken` function is mocked for consistency across tests. If the token generation logic changes, update the mock accordingly.

- **Modular Design:**  
  The tests directly call controller functions using mock request (`req`) and response (`res`) objects. This approach isolates controller logic from the Express server and middleware, making tests faster and more focused on business logic.

---

## Summary

This documentation explains how the unit tests for the NutriFit app’s registration and login functionalities are structured. 
By following these guidelines, developers can ensure that changes to the authentication logic are covered by tests, thereby maintaining the integrity of the app’s core functionalities. 

For any questions or issues related to these tests, please refer to the test file comments or reach out to the development team.

--- 
