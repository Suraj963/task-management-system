const yup = require('yup');

exports.signUpValidation = async data => yup
  .object()
  .shape({
    name: yup.string().required('Name is required'),
    mobile: yup.string().required('Mobile is required'),
    password: yup.string().required('Password is required')
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
