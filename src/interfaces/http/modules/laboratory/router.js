const Status = require('http-status');
const { Router } = require('express');

module.exports = ({
  getUseCase,
  postUseCase,
  putUseCase,
  removeUseCase,
  logger,
  response: { Success, Fail },
}) => {
  const router = Router();

  /**
   * @swagger
   * definitions:
   *   Laboratory:
   *     type: "object"
   *     properties:
   *       id:
   *         description: "Database id."
   *         type: "string"
   *         format: "uuid"
   *       name:
   *         description: "Laboratory name."
   *         type: "string"
   *       address:
   *         description: "Laboratory type."
   *         type: "string"
   *       status:
   *         description: "Laboratory status."
   *         type: "string"
   *         enum: ["active", "inactive"]
   *
   *   LaboratoryBodyNoId:
   *     type: "object"
   *     properties:
   *       name:
   *         description: "Laboratory name, must be unique."
   *         type: "string"
   *       address:
   *         description: "Laboratory address."
   *         type: "string"
   *
   *   LaboratoryBodyWithId:
   *     type: "object"
   *     properties:
   *       id:
   *         description: "Database id, required to find which Document you want to update."
   *         type: "string"
   *         format: "uuid"
   *         required: true
   *       name:
   *         description: "Laboratory name, must be unique."
   *         type: "string"
   *       address:
   *         description: "Laboratory address."
   *         type: "string"
   *
   *   LaboratoryPaginatedResponse:
   *     type: "object"
   *     properties:
   *       docs:
   *         description: "Array of documents."
   *         type: "array"
   *         items:
   *           $ref: "#/definitions/Laboratory"
   *       totalDocs:
   *         description: "Total number of documents in collection that match a query ('limit' and 'page' parameters are not part of the query)."
   *         type: "number"
   *       limit:
   *         description: "Limit that was used."
   *         type: "string"
   *       totalPages:
   *         description: "Total number of pages."
   *         type: "number"
   *       page:
   *         description: "Current page number."
   *         type: "number"
   *       pagingCounter:
   *         description: "The starting index/serial/chronological number of first document in current page. (Eg: if page=2 and limit=10, then pagingCounter will be 11)"
   *         type: "number"
   *       hasPrevPage:
   *         description: "Availability of prev page."
   *         type: "boolean"
   *       hasNextPage:
   *         description: "Availability of next page."
   *         type: "boolean"
   *       prevPage:
   *         description: "Previous page number if available or NULL."
   *         type: "number"
   *         nullable: "true"
   *       nextPage:
   *         description: "Next page number if available or NULL."
   *         type: "number"
   *         nullable: "true"
   *
   *   LaboratoryApiResponseSingleItem:
   *     type: "object"
   *     properties:
   *       success:
   *         type: "boolean"
   *         description: "Had success executing the query."
   *       data:
   *         description: "The actual response from API."
   *         $ref: "#/definitions/Laboratory"
   *
   *   LaboratoryApiResponseMultipleItems:
   *     type: "object"
   *     properties:
   *       success:
   *         type: "boolean"
   *         description: "Had success executing the query."
   *       data:
   *         description: "The actual response from API."
   *         type: "array"
   *         items:
   *           $ref: "#/definitions/Laboratory"
   *
   *   LaboratoryApiResponseMessageOnly:
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
   * /laboratories/paginate:
   *   get:
   *     tags:
   *     - "Laboratory"
   *     summary: "Search for Laboratories"
   *     description: "Returns a paginated list of laboratories according to a filter / pagination provided in the route parameters."
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "limit"
   *         in: "query"
   *         description: "Filter used to limit the number of items in the response."
   *         type: "number"
   *       - name: "page"
   *         in: "query"
   *         description: "The page you wanna to retrive from the server, according to the limit."
   *         type: "number"
   *       - name: "name"
   *         in: "query"
   *         description: "Filter the search with a specific laboratory name."
   *         type: "string"
   *       - name: "address"
   *         in: "query"
   *         description: "Filter the search with a specific laboratory address."
   *         type: "string"
   *       - name: "status"
   *         in: "query"
   *         description: "Filter the search with a specific status type, if not provided, it will automatically return 'active' laboratories."
   *         type: "string"
   *         enum: ["active", "inactive"]
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           type: "object"
   *           properties:
   *             success:
   *               type: "boolean"
   *               description: "Had success executing the query."
   *             data:
   *               description: "The actual response from API."
   *               $ref: "#/definitions/LaboratoryPaginatedResponse"
   *             401:
   *               $ref: "#/responses/BadRequest"
   */
  router.get('/paginate', (req, res) => {
    getUseCase
      .paginate(req, res)
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  /**
   * @swagger
   * /laboratories/byId/{laboratoryId}:
   *   get:
   *     tags:
   *     - "Laboratory"
   *     summary: "Search for an laboratory by it's id"
   *     description: "Returns a single laboratory by it's id."
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "laboratoryId"
   *         in: "path"
   *         description: "Laboratory ID."
   *         type: "number"
   *         required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/LaboratoryApiResponseSingleItem"
   *       401:
   *         $ref: "#/responses/BadRequest"
   */
  router.get('/byId/:id', (req, res) => {
    getUseCase
      .byId({ id: req.params.id })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  /**
   * @swagger
   * /laboratories/create:
   *   post:
   *     tags:
   *     - "Laboratory"
   *     summary: "Create a new Laboratory"
   *     description: "Creates and returns a new Laboratory."
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - "application/json"
   *     parameters:
   *     - in: "body"
   *       name: "body"
   *       description: "Parameters to create the new Laboratory."
   *       schema:
   *         $ref: "#/definitions/LaboratoryBodyNoId"
   *       required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/LaboratoryApiResponseSingleItem"
   *       401:
   *         $ref: "#/responses/BadRequest"
   */
  router.post('/create', (req, res) => {
    postUseCase
      .create({ body: req.body })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  /**
   * @swagger
   * /laboratories/createMany:
   *   post:
   *     tags:
   *     - "Laboratory"
   *     summary: "Create many Laboratories"
   *     description: "Creates and returns the laboratories."
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - "application/json"
   *     parameters:
   *     - in: "body"
   *       name: "body"
   *       description: "Parameters to create the new Laboratory."
   *       type: "array"
   *       items:
   *         $ref: "#/definitions/LaboratoryBodyNoId"
   *       required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/LaboratoryApiResponseMultipleItems"
   *       401:
   *         $ref: "#/responses/BadRequest"
   */
  router.post('/createMany', (req, res) => {
    postUseCase
      .createMany({ body: req.body })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  /**
   * @swagger
   * /laboratories/update/{laboratoryId}:
   *   put:
   *     tags:
   *     - "Laboratory"
   *     summary: "Update an Laboratory"
   *     description: "Update an Laboratory by it's id."
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "laboratoryId"
   *         in: "path"
   *         description: "Laboratory ID."
   *         type: "number"
   *         required: "true"
   *       - name: "body"
   *         in: "body"
   *         description: "Laboratory body, put only the fields you want to update with its exact value."
   *         schema:
   *           $ref: "#/definitions/LaboratoryBodyNoId"
   *         required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/LaboratoryApiResponseSingleItem"
   *       401:
   *         $ref: "#/responses/BadRequest"
   */
  router.put('/update/:id', (req, res) => {
    putUseCase
      .update({ id: req.params.id, body: req.body })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  /**
   * @swagger
   * /laboratories/updateMany:
   *   put:
   *     tags:
   *     - "Laboratory"
   *     summary: "Update many Laboratories"
   *     description: "Update many Laboratories."
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "body"
   *         in: "body"
   *         description: "Array of laboratories to be updated."
   *         schema:
   *           type: "array"
   *           items:
   *             $ref: "#/definitions/LaboratoryBodyWithId"
   *         required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/LaboratoryApiResponseMultipleItems"
   *       401:
   *         $ref: "#/responses/BadRequest"
   */
  router.put('/updateMany', (req, res) => {
    putUseCase
      .updateMany({ body: req.body })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  /**
   * @swagger
   * /laboratories/deactivate/{laboratoryId}:
   *   delete:
   *     tags:
   *     - "Laboratory"
   *     summary: "Deactivate an Laboratory"
   *     description: "Deactivate an Laboratory by it's id."
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "laboratoryId"
   *         in: "path"
   *         description: "Laboratory ID."
   *         type: "number"
   *         required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/ApiResponseMessageOnly"
   *       401:
   *         $ref: "#/responses/BadRequest"
   */
  router.delete('/deactivate/:id', (req, res) => {
    removeUseCase
      .deactivateById({ id: req.params.id })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  /**
   * @swagger
   * /laboratories/deactivateMany:
   *   delete:
   *     tags:
   *     - "Laboratory"
   *     summary: "Deactivate many Laboratories"
   *     description: "Deactivate many Laboratories."
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "body"
   *         in: "body"
   *         description: "Array of laboratories to be deactivated."
   *         type: "array"
   *         items:
   *           type: "string"
   *           format: "uuid"
   *         required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/ApiResponseMessageOnly"
   *       401:
   *         $ref: "#/responses/BadRequest"
   */
  router.delete('/deactivateMany', (req, res) => {
    removeUseCase
      .deactivateMany({ body: req.body })
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  return router;
};
