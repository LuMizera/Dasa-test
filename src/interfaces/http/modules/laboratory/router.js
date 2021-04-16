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

  router.get('/', (req, res) => {
    getUseCase
      .all(req, res)
      .then((data) => {
        res.status(Status.OK).json(Success(data));
      })
      .catch((error) => {
        logger.error(error);
        res.status(Status.BAD_REQUEST).json(Fail(error.message));
      });
  });

  router.get('/:id', (req, res) => {
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

  router.post('/', (req, res) => {
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

  router.put('/:id', (req, res) => {
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

  router.delete('/:id', (req, res) => {
    removeUseCase
      .inactiveById({ id: req.params.id })
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
