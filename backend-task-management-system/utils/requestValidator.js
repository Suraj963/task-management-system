const yup = require('yup');

exports.validateRequest = async (request, keyToValidate) => {
  return yup
    .object()
    .shape({
      [keyToValidate]: yup.object().required()
    })
    .validate({ ...request }, { abortEarly: false })
    .then(() => null)
    .catch(errors => {
      const error = {};
      error.name = 'RequestError';
      error.message = errors.inner[0].message;
      throw error;
    });
};
