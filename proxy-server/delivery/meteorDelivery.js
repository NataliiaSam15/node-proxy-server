const express = require('express');
const router = express.Router();
const { getAllAsteroids } = require('../useCases/meteorUseCases');

router.get('/meteors', async (req, res) => {
    try {
        const data = await getAllAsteroids();
        console.log("Data sent to client:", data);
        res.json(data);
    } catch (error) {
        console.error("Error sending data to client:", error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;