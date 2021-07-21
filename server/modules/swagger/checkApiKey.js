const crypto = require('../SHA512');

module.exports = {
	checkApiKey: function (req, res, next) {
		console.log('check 1' + req)

		const key = req.headers.api_key;
		const api_key = crypto.hashing(key); // api_key = akfafjalfjasdkfjaslkdjflja(암호문)
		console.log(api_key, 'api_key는??')
		if (api_key) { // jwt.secret = akfafjalfjasdkfjaslkdjflja(암호문)
			next();
		} else {
			res.sendStatus(401);
		}
	}
}