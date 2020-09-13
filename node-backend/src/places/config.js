require('dotenv').config();

module.exports = Object.freeze({
	services: {
		google: {
			basePath: 'https://maps.googleapis.com/maps/api',
			key: process.env.GOOGLE_API_KEY,
		},
	},
});
