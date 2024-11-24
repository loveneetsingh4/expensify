const Tracker = require('../models/Tracker');

// Fetch all tracker records
exports.getAllTrackers = async (req, res) => {
    try {
        const trackers = await Tracker.find();
        res.status(200).json(trackers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new tracker entry
exports.createTracker = async (req, res) => {
    try {
        const { date, transactions } = req.body;

        const totalEarnings = transactions
            .filter(t => t.type === 'earning')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const tracker = new Tracker({
            date,
            totalEarnings,
            totalExpenses,
            transactions,
        });

        await tracker.save();
        res.status(201).json(tracker);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a transaction to an existing tracker entry
exports.addTransaction = async (req, res) => {
    try {
        const { id } = req.params; // Tracker ID
        const { type, amount, category, description } = req.body;

        const tracker = await Tracker.findById(id);
        if (!tracker) {
            return res.status(404).json({ error: 'Tracker not found' });
        }

        tracker.transactions.push({ type, amount, category, description });

        if (type === 'earning') {
            tracker.totalEarnings += amount;
        } else {
            tracker.totalExpenses += amount;
        }

        await tracker.save();
        res.status(200).json(tracker);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
