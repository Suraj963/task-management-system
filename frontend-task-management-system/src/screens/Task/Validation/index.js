const validateFormFields = (formData) => {
  const errors = {};

  if (!formData.title) {
    errors.title = "Title is required";
  }

  return errors;
};

export default validateFormFields;
