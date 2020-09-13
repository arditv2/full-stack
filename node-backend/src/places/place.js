const makePlace = (id, name, address, { lat, lng } = {}, provider) => {
	if (!id) {
		throw new Error('Place must have an Id');
	}
	if (!name) {
		throw new Error('Place must have a name');
	}
	if (!address) {
		throw new Error('Place must have an address');
	}
	if (!provider) throw new Error('Place must have a provider');

	return Object.freeze({
		id,
		name,
		address,
		location: lat &&
			lng && {
				lat,
				lng,
			},
		provider,
	});
};

module.exports = makePlace;
