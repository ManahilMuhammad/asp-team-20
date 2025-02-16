const { FitnessMetric, User } = require("../models");

/**
 * Create a new fitness metric.
 * Expects: req.body to contain weight, bodyFatPercentage, workoutType, duration, and caloriesBurned.
 * The authenticated user's id is in req.user.id.
 */
const createFitnessMetric = async (req, res) => {
  try {
    const { date, weight, workoutType, duration, bodyFatPercentage, caloriesBurned } = req.body;

    // Verify the user exists (assumes req.user is set by auth middleware)
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the fitness metric record associated with the user
    const fitnessMetric = await FitnessMetric.create({
      userId: req.user.id,
      date,  // Optional: if not provided, defaults to current date per model definition
      weight,
      workoutType,
      duration,
      bodyFatPercentage,
      caloriesBurned,

    });

    return res.status(201).json(fitnessMetric);
  } catch (error) {
    console.error("Error creating fitness metric:", error);
    // Check if error is a validation error from Sequelize
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => err.message),
      });
    }
    return res.status(500).json({ message: "Server error while creating fitness metric" });
  }
};

/**
 * Get all fitness metrics for the authenticated user.
 */
const getFitnessMetrics = async (req, res) => {
  try {
    const metrics = await FitnessMetric.findAll({
      where: { userId: req.user.id },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });
    return res.status(200).json(metrics);
  } catch (error) {
    console.error("Error fetching fitness metrics:", error);
    return res.status(500).json({ message: "Server error while retrieving fitness metrics" });
  }
};

/**
 * Get a single fitness metric by its ID.
 * Only returns the metric if it belongs to the authenticated user.
 */
const getFitnessMetricById = async (req, res) => {
  try {
    const metric = await FitnessMetric.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],
      },
    });

    if (!metric) {
      return res.status(404).json({ message: "Fitness metric not found" });
    }

    return res.status(200).json(metric);
  } catch (error) {
    console.error("Error fetching fitness metric:", error);
    return res.status(500).json({ message: "Server error while retrieving the fitness metric" });
  }
};

/**
 * Update a fitness metric.
 * Only the user who created the metric is allowed to update it.
 */
const updateFitnessMetric = async (req, res) => {
  try {
    const metric = await FitnessMetric.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    // Check if metric exists and if the current user is the owner
    if (!metric) {
      return res.status(404).json({ message: "Fitness metric not found" });
    }
    if (metric.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to update this fitness metric" });
    }

    // Update the fitness metric with provided fields
    await metric.update(req.body);
    return res.status(200).json(metric);
  } catch (error) {
    console.error("Error updating fitness metric:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors.map((err) => err.message),
      });
    }
    return res.status(500).json({ message: "Server error while updating fitness metric" });
  }
};

/**
 * Delete a fitness metric.
 * Only the user who created the metric is allowed to delete it.
 */
const deleteFitnessMetric = async (req, res) => {
  try {
    const metric = await FitnessMetric.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    // Check if metric exists and if the current user is the owner
    if (!metric) {
      return res.status(404).json({ message: "Fitness metric not found" });
    }
    if (metric.userId !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this fitness metric" });
    }

    // Delete the fitness metric
    await metric.destroy();
    return res.status(200).json({ message: "Fitness metric deleted successfully" });
  } catch (error) {
    console.error("Error deleting fitness metric:", error);
    return res.status(500).json({ message: "Server error while deleting fitness metric" });
  }
};

module.exports = {
  createFitnessMetric,
  getFitnessMetrics,
  getFitnessMetricById,
  updateFitnessMetric,
  deleteFitnessMetric,
};
