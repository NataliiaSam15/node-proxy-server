const { getAsteroidsData } = require('../repositories/meteorRepository');

const moment = require('moment');

const DATE_FORMAT = 'YYYY-MM-DD'

const getAllAsteroids = async () => {
    try {
        const startDate = moment().day(1).format(DATE_FORMAT);
        const endDate = moment().day(5).format(DATE_FORMAT);
        const asteroids = await getAsteroidsData(startDate, endDate);

        console.log(`From ${startDate} to ${endDate} were seen ${asteroidCount} asteroids.`);

        return asteroids;
    } catch (error) {
        console.error('Error in getAllAsteroids:', error);
        throw error;
    }
};

module.exports = {
    getAllAsteroids
};