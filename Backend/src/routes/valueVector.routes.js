const { Router } = require('express');
const { check } = require('express-validator');
const {
  valueVectorPost,
  valueVectorGets,
  valueVectorGetById,
  valueVectorPut,
  valueVectorDelete,
  valueVectorGetByIdVector,
} = require('../controllers/valueVector.controller');
const { thereVectorById } = require('../helpers/db-validators');
const { validationJWT, fieldValidation } = require('../middlewares');

const valueVectorRouter = Router();
valueVectorRouter.get('/getValues', [validationJWT], valueVectorGets);
valueVectorRouter.get('/:id', [validationJWT], valueVectorGetByIdVector);
valueVectorRouter.get(
  '/:id',
  [
    validationJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(thereVectorById),
    fieldValidation,
  ],
  valueVectorGetById,
);
valueVectorRouter.post(
  '/addValueVector',
  [
    validationJWT,
    check('period', 'Period is required').not().isEmpty(),
    check('value').not().isEmpty(),
    check('position').not().isEmpty(),
    fieldValidation,
  ],
  valueVectorPost,
);
valueVectorRouter.put(
  '/:id',
  [
    validationJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('position', 'Position is required').not().isEmpty(),
    check('id').custom(thereVectorById),
    fieldValidation,
  ],
  valueVectorPut,
);
valueVectorRouter.delete(
  '/:id',
  [
    validationJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(thereVectorById),
    fieldValidation,
  ],
  valueVectorDelete,
);

module.exports = valueVectorRouter;
