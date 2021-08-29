const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
	swaggerDefinition: {
		info: {
			//스웨거 문서 작성될 내용들.
			title: 'datda API',
			version: '1.0.0',
			description: 'datda API 문서',
		},
		//TODO : 배포링크로 전환 필요함.
		//test url : http://localhost:5000/datda_docs/
		host: 'localhost:5000',
		basePath: '/',
		contact: {
			email: "expect.ta@gmail.com"
		},
		//TODO : api_key 등록 후 사용필요
		// securityDefinitions: {
		// 	api_key: {
		// 		type: 'apiKey',
		// 		in: 'header',
		// 		name: 'api_key',
		// 	}
		// }
	},
	//1. routes 폴더 아래 .js파일로 정의, 2. swagger폴더 아래 swagger 설정
	apis: ['./routes/*.js', './swagger/*']
};
const specs = swaggerJsdoc(options);
module.exports = { swaggerUi, specs };
