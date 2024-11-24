// routes/cropTracker.js
const express = require("express");
const CropTracker = require("../models/cropTracker");
const router = express.Router();

// Get all crop records
router.get("/", async (req, res) => {
  try {
    const crops = await CropTracker.find();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific crop record by ID
router.get("/:id", async (req, res) => {
  try {
    const crop = await CropTracker.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    res.json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new crop record
router.post("/", async (req, res) => {
  const crop = new CropTracker({
    cropName: req.body.cropName,
    cropType: req.body.cropType,
    plantingDate: req.body.plantingDate,
    expectedHarvestDate: req.body.expectedHarvestDate,
    location: req.body.location,
    growthStage: req.body.growthStage,
    waterRequirements: req.body.waterRequirements,
    temperatureRange: req.body.temperatureRange,
    weatherConditions: req.body.weatherConditions,
    cropHealth: req.body.cropHealth,
    notes: req.body.notes,
    growthProgress: req.body.growthProgress,
  });

  try {
    const newCrop = await crop.save();
    res.status(201).json(newCrop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a crop record by ID
router.put("/:id", async (req, res) => {
  try {
    const crop = await CropTracker.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    crop.cropName = req.body.cropName || crop.cropName;
    crop.cropType = req.body.cropType || crop.cropType;
    crop.plantingDate = req.body.plantingDate || crop.plantingDate;
    crop.expectedHarvestDate =
      req.body.expectedHarvestDate || crop.expectedHarvestDate;
    crop.location = req.body.location || crop.location;
    crop.growthStage = req.body.growthStage || crop.growthStage;
    crop.waterRequirements =
      req.body.waterRequirements || crop.waterRequirements;
    crop.temperatureRange = req.body.temperatureRange || crop.temperatureRange;
    crop.weatherConditions =
      req.body.weatherConditions || crop.weatherConditions;
    crop.cropHealth = req.body.cropHealth || crop.cropHealth;
    crop.notes = req.body.notes || crop.notes;
    crop.growthProgress = req.body.growthProgress || crop.growthProgress;

    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a crop record by ID
router.delete("/:id", async (req, res) => {
  try {
    const crop = await CropTracker.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    await crop.remove();
    res.json({ message: "Crop deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
