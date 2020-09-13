require('dotenv').config();
const app = require('./server');
const port = process.env.PORT || 4000;

app.listen(port, () => {
	if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY.length === 0) {
		console.warn('"GOOGLE_API_KEY" environment variable is missing.');
	}
	console.log(`Running on port ${port}`);
});
