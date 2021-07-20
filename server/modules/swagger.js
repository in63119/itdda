const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');
const options = {
	swaggerDefinition: {
		info: { title: 'datda API', version: '1.0.0', description: 'datda API 문서', },
		host: 'https://datda.link', basePath: '/'
	},
	apis: ['./routes/*.js', './swagger/*']
};
const specs = swaggereJsdoc(options);
module.exports = { swaggerUi, specs };
