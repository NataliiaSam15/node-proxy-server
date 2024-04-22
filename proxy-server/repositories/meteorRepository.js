const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = process.env.NASA_API_URL;

const getAsteroidsData = async (startDate, endDate) => {
    console.log(`Fetching data from ${startDate} to ${endDate}...`)
    const response = await axios.get(NASA_API_URL, {
        params: {
            api_key: NASA_API_KEY,
            start_date: startDate,
            end_date: endDate
        }
    });

    const formattedMeteors = formatAsteroids(response.data);
    return formattedMeteors;
};

const formatAsteroids = (data) => {
    return data.near_earth_objects.map(asteroid => ({
        id: asteroid.id,
        name: asteroid.name,
        diameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
        is_potentially_hazardous: asteroid.is_potentially_hazardous_asteroid,
        close_approach_date: asteroid.close_approach_data[0].close_approach_date_full,
        relative_velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
    }));
};

module.exports = {
    getAsteroidsData,
    formatAsteroids
};