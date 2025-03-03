const axios = require('axios'); // To fetch recipe recommendations from a public API
const qs = require('qs'); // Import qs for query string formatting

const { SPOONACULAR_APIKEY } = require('../config/config');

// Search for recipes based on a query string
exports.fetchRecipes = async (req, res) => {

  // If the api key isn't set return a generic response
  if (!SPOONACULAR_APIKEY) {
    console.error("mealController can't run as it doesn't have a valid API Key to query Spoonacular's API !");
    return res.status(500).json({ error: 'Unable to query API.' });
  }

  try {
    const { query } = req.query;


    // Validate the query parameter
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query is required.' });
    }

    // API URL
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
      query
    )}&apiKey=${SPOONACULAR_APIKEY}`;
    const response = await axios.get(apiUrl);

    if (response.data && response.data.results) {
      res.json(response.data.results);
    } else {
      res.status(404).json({ error: 'No recipes found.' });
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes.' });
  }
};

// Calculate nutritional value
exports.calculateNutrition = async (req, res) => {

  // If the api key isn't set return a generic response
  if (!SPOONACULAR_APIKEY) {
    console.error("mealController can't run as it doesn't have a valid API Key to query Spoonacular's API !");
    return res.status(500).json({ error: 'Unable to query API.' });
  }

  try {
    const { ingredients } = req.body;

     if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "Ingredients array is required and must not be empty." });
    }

     // Convert ingredients array to newline-separated string
    const ingredientList = ingredients.join('\n');

    // Example: Call a nutrition API to get nutritional values
    const apiUrl = `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${SPOONACULAR_APIKEY}`;

    // Prepare form data
    const formData = qs.stringify({
      ingredientList, // Pass the newline-separated list of ingredients
      apiKey: apiUrl,
      includeNutrition: 'true',
    });

    // Make the POST request
    const response = await axios.post(apiUrl, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

     // Check response validity and return data
    if (response.data) {
      res.json(response.data);
    } else {
      res.status(404).json({ error: 'No nutrition information found.' });
    }
  } catch (error) {
    console.error('Error calculating nutrition:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to calculate nutrition.' });
  }
};