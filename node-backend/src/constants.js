module.exports = Object.freeze({
	HTTP_STATUS: {
		OK: 200,
		BAD_REQUEST: 400,
		NOT_FOUND: 404,
		METHOD_NOT_ALLOWED: 405,
		INTERNAL_SERVER_ERROR: 500,
	},
	PROVIDERS: {
		GOOGLE: 'google',
		MOCK_GOOGLE: 'mock_google',
	},
});
