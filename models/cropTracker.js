const mongoose = require("mongoose");

// Define the schema for Crop Tracker
const cropTrackerSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      trim: true,
    },
    cropType: {
      type: String,
      required: true,
      enum: ["Vegetable", "Fruit", "Grain", "Herb"], // Example crop types
    },
    plantingDate: {
      type: Date,
      required: true,
      default: Date.now, // Default to current date if not specified
    },
    expectedHarvestDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true, // Location where the crop is planted (could be a farm or region)
    },
    growthStage: {
      type: String,
      enum: [
        "Seedling",
        "Vegetative",
        "Flowering",
        "Fruiting",
        "Harvestable",
        "Completed",
      ], 
      default: "Seedling",
    },
    waterRequirements: {
      type: String,
      enum: ["Low", "Medium", "High"], // Categorize water needs for the crop
      required: true,
    },
    temperatureRange: {
      type: String,
      required: true, // e.g., "15-30°C"
    },
    weatherConditions: {
      type: Map,
      of: String, // Store weather data in key-value pairs (e.g., { rainfall: "10mm", temp: "25°C" })
      default: {},
    },
    cropHealth: {
      type: String,
      enum: ["Healthy", "Diseased", "Underdeveloped", "Overripe"],
      default: "Healthy",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    growthProgress: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        progress: {
          type: String,
          required: true, // e.g., "60% of the crop is ready"
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

module.exports = mongoose.model("CropTracker", cropTrackerSchema);
