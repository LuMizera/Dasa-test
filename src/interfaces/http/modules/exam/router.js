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
   *   Exam:
   *     type: "object"
   *     properties:
   *       id:
   *         description: "Database id."
   *         type: "string"
   *         format: "uuid"
   *       name:
   *         description: "Exam name."
   *         type: "string"
   *       type:
   *         description: "Exam type."
   *         type: "string"
   *         enum: ["analysis", "clinic", "image"]
   *       laboratories:
   *         description: "Exam related laboratories."
   *         type: "array"
   *         items:
   *           $ref: "#/definitions/Laboratory"
   *       status:
   *         description: "Exam status."
   *         type: "string"
   *         enum: ["active", "inactive"]
   *
   *   ExamBodyNoId:
   *     type: "object"
   *     properties:
   *       name:
   *         description: "Exam name, must be unique."
   *         type: "string"
   *       type:
   *         description: "Exam type."
   *         type: "string"
   *         enum: ["analysis", "clinic", "image"]
   *       laboratories:
   *         description: "Exam related laboratories."
   *         type: "array"
   *         items:
   *           type: "string"
   *           format: "uuid"
   *
   *   ExamBodyWithId:
   *     type: "object"
   *     properties:
   *       id:
   *         description: "Database id, required to find which Document you want to update."
   *         type: "string"
   *         format: "uuid"
   *         required: true
   *       name:
   *         description: "Exam name, must be unique."
   *         type: "string"
   *       type:
   *         description: "Exam type."
   *         type: "string"
   *         enum: ["analysis", "clinic", "image"]
   *       laboratories:
   *         description: "Exam related laboratories."
   *         type: "array"
   *         items:
   *           type: "string"
   *           format: "uuid"
   *
   *   ExamPaginatedResponse:
   *     type: "object"
   *     properties:
   *       docs:
   *         description: "Array of documents."
   *         type: "array"
   *         items:
   *           $ref: "#/definitions/Exam"
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
   *   ExamApiResponseSingleItem:
   *     type: "object"
   *     properties:
   *       success:
   *         type: "boolean"
   *         description: "Had success executing the query."
   *       data:
   *         description: "The actual response from API."
   *         $ref: "#/definitions/Exam"
   *
   *   ExamApiResponseMultipleItems:
   *     type: "object"
   *     properties:
   *       success:
   *         type: "boolean"
   *         description: "Had success executing the query."
   *       data:
   *         description: "The actual response from API."
   *         type: "array"
   *         items:
   *           $ref: "#/definitions/Exam"
   */

  /**
   * @swagger
   * /exams/paginate:
   *   get:
   *     tags:
   *     - "Exam"
   *     summary: "Search for Exams"
   *     description: "Returns a paginated list of exams according to a filter / pagination provided in the route parameters."
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
   *         description: "Filter the search with a specific exam name."
   *         type: "string"
   *       - name: "type"
   *         in: "query"
   *         description: "Filter the search with a specific exam type."
   *         type: "string"
   *         enum: ["analysis", "clinic", "image"]
   *       - name: "status"
   *         in: "query"
   *         description: "Filter the search with a specific status type, if not provided, it will automatically return 'active' exams."
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
   *               $ref: "#/definitions/ExamPaginatedResponse"
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
   * /exams/byId/{examId}:
   *   get:
   *     tags:
   *     - "Exam"
   *     summary: "Search for an Exam by it's id"
   *     description: "Returns a single exam by it's id."
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "examId"
   *         in: "path"
   *         description: "Exam ID."
   *         type: "number"
   *         required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/ExamApiResponseSingleItem"
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
   * /exams/create:
   *   post:
   *     tags:
   *     - "Exam"
   *     summary: "Create a new Exam"
   *     description: "Creates and returns a new Exam."
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - "application/json"
   *     parameters:
   *     - in: "body"
   *       name: "body"
   *       description: "Parameters to create the new Exam."
   *       schema:
   *         $ref: "#/definitions/ExamBodyNoId"
   *       required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/ExamApiResponseSingleItem"
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
   * /exams/createMany:
   *   post:
   *     tags:
   *     - "Exam"
   *     summary: "Create many Exams"
   *     description: "Creates and returns the exams."
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - "application/json"
   *     parameters:
   *     - in: "body"
   *       name: "body"
   *       description: "Parameters to create the new Exam."
   *       type: "array"
   *       items:
   *         $ref: "#/definitions/ExamBodyNoId"
   *       required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/ExamApiResponseMultipleItems"
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
   * /exams/update/{examId}:
   *   put:
   *     tags:
   *     - "Exam"
   *     summary: "Update an Exam"
   *     description: "Update an Exam by it's id."
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "examId"
   *         in: "path"
   *         description: "Exam ID."
   *         type: "number"
   *         required: "true"
   *       - name: "body"
   *         in: "body"
   *         description: |
   *           Exam body, put only the fields you want to update with its exact value. You also can associate and dessasociate laboratories to the exam
   *           PS: the laboratory must be active to be associated.
   *         schema:
   *           $ref: "#/definitions/ExamBodyNoId"
   *         required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/ExamApiResponseSingleItem"
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
   * /exams/updateMany:
   *   put:
   *     tags:
   *     - "Exam"
   *     summary: "Update many Exams"
   *     description: "Update many Exams."
   *     consumes:
   *       - "application/json"
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "body"
   *         in: "body"
   *         description: "Array of exams to be updated."
   *         schema:
   *           type: "array"
   *           items:
   *             $ref: "#/definitions/ExamBodyWithId"
   *         required: "true"
   *     responses:
   *       200:
   *         description: "Success"
   *         schema:
   *           $ref: "#/definitions/ExamApiResponseMultipleItems"
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
   * /exams/deactivate/{examId}:
   *   delete:
   *     tags:
   *     - "Exam"
   *     summary: "Deactivate an Exam"
   *     description: "Deactivate an Exam by it's id."
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "examId"
   *         in: "path"
   *         description: "Exam ID."
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
   * /exams/deactivateMany:
   *   delete:
   *     tags:
   *     - "Exam"
   *     summary: "Deactivate many Exams"
   *     description: "Deactivate many Exams."
   *     produces:
   *       - "application/json"
   *     parameters:
   *       - name: "body"
   *         in: "body"
   *         description: "Array of exams to be deactivated."
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
