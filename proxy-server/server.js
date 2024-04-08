require('dotenv').config();
const express = require('express');

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
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from NASA API' })
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});