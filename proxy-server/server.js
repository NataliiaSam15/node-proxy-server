const express = require('express');
const meteorDelivery = require('./delivery/meteorDelivery');
const { getAllAsteroids } = require('./useCases/meteorUseCases');
const { printAllAsteroids } = require('./delivery/meteorDelivery');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/api', meteorDelivery);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        const data = await getAllAsteroids();
        console.log("Received data from getAllAsteroids:", data);
        printAllAsteroids(data);
    } catch (error) {
        console.error('Error fetching and printing data:', error);
    }
});