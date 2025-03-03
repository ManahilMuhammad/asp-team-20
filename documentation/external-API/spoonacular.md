# External API Usage Documentation

This document outline how the  application interacts with the external Spoonacular API. It covers two main functionalities:

1. **Fetching Recipes Recommendations**
2. **Calculating Nutritional Information**

---

## 1.How to  fetch the Recipe Recommendations

### Description

This endpoint fetches recipe recommendations based on a search query provided by the user.

### HTTP Method

`GET`

### Here is the API Endpoint:

https://api.spoonacular.com/recipes/complexSearch


### The Required Query Parameters:

- **query** (string): The search term for recipes (e.g., "chicken", "pasta", "fried chicken").
- **apiKey** (string): Your Spoonacular API key. Replace `enterYourAPIKeyHere` with your actual API key.

### How It Works

**Request Data Flow:**  
  The client sends a `GET` request with a query parameter. The application constructs the API URL by encoding the query 
and appending the API key.
  
**Example Request URL:**

https://api.spoonacular.com/recipes/complexSearch?query=chicken&apiKey=YOUR_API_KEY

**Example Form Data:**

**fried chicken**

**API Response:**  
The API returns a JSON object. The expected format includes a `results` field containing an array of recipe objects. 
If no recipes are found, the application returns a 404 error with a message indicating "No recipes found."

**Example  Data Response:**

**Spicy Fried Chicken w Sweet Chili Sauce**

**Baked Fried Chicken With Cauliflower Mash**

**How To Make Fried Chicken Without Frying**

**Crispy Southern Fried Chicken**

**Crispy Buttermilk Fried Chicken**

**Buttermilk Skillet Fried Chicken**

**Korean Extra Crispy Fried Chicken**

**Korean Extra Crispy Fried Chicken w Sweet Spicy Glaze**

**Chicken Brown "Fried" Rice**

**Stir Fried Quinoa, Brown Rice and Chicken Breast**

---

## 2. Calculate Nutritional Information

### Description

This endpoint calculates the nutritional value for a list of ingredients entered by the user. It uses a POST request to send ingredient data 
to Spoonacular's ingredient parsing endpoint.

### HTTP Method

`POST`

### API Endpoint

https://api.spoonacular.com/recipes/parseIngredients


### Required Data in the Request Form

**ingredientList** (string): A newline-separated string of ingredients.  

  **Example:**
**Crispy Southern Fried Chicken**

**includeNutrition** (string): Set to `"true"` to include nutritional data in the response.
**apiKey** (string): While the API key is included as a query parameter in the URL, 
ensure that it is correctly set in your request. Replace `enterYourAPIKeyHere` with your actual API key.

### How It Works

**Request Data Flow:**

The client sends a `POST` request with the form data. The ingredients array is converted to a newline-separated string, 
and the data is formatted using the `qs` library.

**Example Request URL:**

https://api.spoonacular.com/recipes/parseIngredients?apiKey=YOUR_API_KEY

**Example Form Data:**

Crispy Southern Fried Chicken



**Response:**  

The API returns detailed nutritional information for each ingredient parsed. If the response does not contain 
valid nutritional data, the application returns a 404 error with an appropriate message.

---

## Additional Notes

**API Key Management:**  

Both endpoints require a valid Spoonacular API key. Make sure to update `enterYourAPIKeyHere` with your actual key.

- **Error Handling:**  
- **400 Bad Request:** Triggered if required parameters (like the search query or ingredients array) are missing or invalid.
- **404 Not Found:** Returned when no data is found for the given query or ingredients.
- **500 Internal Server Error:** Used to indicate issues when fetching or processing the data from the API.

- **Dependencies:**
- **axios:** Used for making HTTP requests. Please make sure you install axios  at your end
- **qs:** Used to format data for POST requests (i.e., converting arrays into newline-separated strings for the `ingredientList`).
Be sure you have qs installed.

For further details on the Spoonacular API endpoints and their capabilities, 
refer to the [Spoonacular API Documentation](https://spoonacular.com/food-api).

---



