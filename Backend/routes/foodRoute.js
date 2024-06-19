import express from 'express';
import { Food } from '../models/foodModel.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new food item
router.post('/', auth, async (req, res) => {
    try {
        const { name, priceInCents, image } = req.body;

        if (!name || !priceInCents || !image) {
            return res.status(400).send({ message: 'Required fields are missing!' });
        }

        const newFood = { name, priceInCents, image };
        const food = await Food.create(newFood);

        return res.status(201).send(food);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Get all food items
router.get('/', async (req, res) => {
    try {
        const food = await Food.find({});
        return res.status(200).json({ data: food });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Delete a particular food item
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Food.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }

        return res.status(200).json({ message: 'Item successfully deleted', deletedItem: result });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Update a particular food item
router.put('/:id', auth, async (req, res) => {
    try {
        const { name, priceInCents, image } = req.body;
        const { id } = req.params;

        if (!name || !priceInCents) {
            return res.status(400).send({ message: 'Required fields are missing!' });
        }

        const updatedData = { name, priceInCents };
        if (image) updatedData.image = image; // Only update the image if provided

        const result = await Food.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
            return res.status(404).json({ message: 'Food not found' });
        }

        return res.status(200).send({ message: 'Food updated', updatedItem: result });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Get a particular food item
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        return res.status(200).json(food);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

export default router;
