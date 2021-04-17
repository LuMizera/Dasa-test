const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Status = require('http-status');
const { Router } = require('express');

module.exports = () => {
  const router = Router();

  const swaggerDefinition = {
    info: {
      title: 'Node DDD API Explorer',
      version: '1.0.0',
      description: 'Available REST Endpoints of Node DDD RESTful API',
    },
    host: `${process.env.API_SWAGGER}:${process.env.PORT}/api`,
    basePath: '/',
  };

  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['src/interfaces/http/modules/**/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);
  /**
   * @swagger
   * responses:
   *   BadRequest:
   *     description: BadRequest / Invalid Input
   */

  /**
   * @swagger
   * definitions:
   *   ApiResponseMessageOnly:
   *     type: "object"
   *     properties:
   *       success:
   *         description: "Had success executing the query."
   *         type: "boolean"
   *       data:
   *         description: "API response message."
   *         type: "object"
   *         properties:
   *           message:
   *             description: "API informative message."
   *             type: "string"
   */

  /**
   * @swagger
   * /:
   *   get:
   *     tags:
   *       - Status
   *     description: Returns API status
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: API Status
   */
  router.get('/', (req, res) => {
    res.status(Status.OK).json({ status: 'API working' });
  });

  router.get('/swagger/json', (req, res) => {
    res.status(Status.OK).json(swaggerSpec);
  });

  router.use('/swagger', swaggerUi.serve);
  router.get('/swagger', swaggerUi.setup(swaggerSpec));

  return router;
};
