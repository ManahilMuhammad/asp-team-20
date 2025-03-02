const express = require('express');
const router = express.Router();
const {fetchRecipes, calculateNutrition} = require('../controllers/mealController');

// Fetch recipe recommendations
router.get('/recipes', fetchRecipes);

// Calculate nutritional value
router.post('/nutrition',  calculateNutrition);

module.exports = router;