const axios = require('axios');
const moment = require('moment');

const DATE_FORMAT = 'YYYY-MM-DD'
const NASA_API_KEY = '7hkUXfMMXpB9WDJmludTWbQd2wm6LdAf5SohbB91';
const START_DATE = moment().day(1).format(DATE_FORMAT);
const END_DATE = moment().day(5).format(DATE_FORMAT);

const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${NASA_API_KEY}`;

const getAllAsteroidsCount = () => {
    axios.get(API_URL)
        .then((response) => {
            printAllAsteroids(response.data)
        })
        .catch((error) => {
            console.error('Error fetching data from NASA API', error);
        });
}

const printJsonConsole = (data) => {
    console.log(JSON.stringify(data, null, 2));
}

const printAsteroidsCount = (asteroidCount) => {
    console.log(`From ${START_DATE} to ${END_DATE} were seen ${asteroidCount} asteroids.`);
}

const printAllAsteroids = (data) => {
    printJsonConsole(data);
    printAsteroidsCount(data.element_count);
}

getAllAsteroidsCount();