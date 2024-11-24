const express = require('express');
const { getAllTrackers, createTracker, addTransaction } = require('../controllers/trackController');

const router = express.Router();

// Fetch all tracker records
router.get('/', getAllTrackers);

// Create a new tracker entry
router.post('/', createTracker);

// Add a transaction to a tracker entry
router.post('/:id/transactions', addTransaction);

module.exports = router;
