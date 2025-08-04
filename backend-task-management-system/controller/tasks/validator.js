const yup = require('yup');

exports.createValidation = async data => yup
  .object()
  .shape({
    title: yup.string().required('Task Name is required'),
    // taskDesc:yup.string().required('task Description is required'),
    status:yup.string().required('task Status is required')

  })
  .validate(data, { abortEarly: false })
  .then(() => null)
  .catch(errors => {
    console.log(errors);
    const error = {};
    error.name = 'ValidationError';
    error.message = errors.inner[0].message;
    throw error;
  });
