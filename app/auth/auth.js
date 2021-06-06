const jwt = require('jsonwebtoken');
const config = require('config');
let appSecret = config.get('app.secret');
let tokenExpiresIn = config.get('app.auth.expires');
let tokenIssuer = config.get('app.auth.issuer');

exports.generateToken = (userData, options) => {
	let token = jwt.sign({
		userId: userData._id.toString()
	}, appSecret, {
		expiresIn: options.expires || tokenExpiresIn,
		issuer: tokenIssuer
	});
	return token;
};

exports.verifyToken = async (req, res, next) => {
	let decoded = false;
	try {
		console.log(1);
		
		decoded = await jwt.verify(req.headers["access-token"], appSecret);
		req.userId  = decoded.userId;
		return next();
	} catch (err) {
		console.log(err);
		res.status(401).send("Invalid Access Token")
	}
};
