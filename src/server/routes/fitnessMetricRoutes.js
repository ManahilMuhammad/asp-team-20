const express = require("express");
const router = express.Router();
// Import an authentication middleware
const { protect } = require("../middleware/auth.middelware");

// Import the recipe controller
const {
    createFitnessMetric,
    getFitnessMetrics,
    getFitnessMetricById,
    updateFitnessMetric,
    deleteFitnessMetric,
} = require("../controllers/fitnessMetricController");



/**
 * POST /api/fitness-metrics
 * Create a new fitness metric record.
 */
router.post("/", protect, createFitnessMetric);

/**
 * GET /api/fitness-metrics
 * Retrieve all fitness metrics for the authenticated user.
 */
router.get("/", getFitnessMetrics);

/**
 * GET /api/fitness-metrics/:id
 * Retrieve a single fitness metric by its ID for the authenticated user.
 */
router.get("/:id", getFitnessMetricById);

/**
 * PUT /api/fitness-metrics/:id
 * Update an existing fitness metric.
 */
router.put("/:id", protect, updateFitnessMetric);

/**
 * DELETE /api/fitness-metrics/:id
 * Delete a fitness metric record.
 */
router.delete("/:id", protect, deleteFitnessMetric);

module.exports = router;
