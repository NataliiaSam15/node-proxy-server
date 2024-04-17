require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT;

app.get('/meteors', async (req, res) => {
    try {
        const response = await axios.get(process.env.NASA_API_URL, {
            params: {
                api_key: process.env.NASA_API_KEY,
                start_date: 'START_DATE',
                end_date: 'END_DATE'
            }
        });

        const formattedMeteors = response.data.near_earth_objects['START_DATE'].map(meteor => ({
            id: meteor.id,
            name: meteor.name,
            diameter: {
                meters: meteor.estimated_diameter.meters.estimated_diameter_max,
            },
            is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
            close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
            relative_velocity: {
                kilometers_per_second: meteor.close_approach_data[0].relative_velocity.kilometers_per_second,
            }
        }));
        res.json(formattedMeteors);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from NASA API' })
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});