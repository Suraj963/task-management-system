const validateFormFields = (formData) => {
  const errors = {};

  if (!formData.name) {
    errors.name = "Name is required";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
    errors.name = "Name can only contain letters and spaces";
  }

  if (!formData.mobile) {
    errors.mobile = "Mobile number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
    errors.mobile = "Please enter a valid 10-digit mobile number";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
};

const validateSubmitFormFields = (formData) => {
  const errors = {};

  if (!formData.name || !formData.name.trim()) {
    errors.name = "Please enter a valid name";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
    errors.name = "Name can only contain letters and spaces";
  }

  if (!formData.mobile || !formData.mobile.trim()) {
    errors.mobile = "Please enter a valid mobile number";
  } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
    errors.mobile =
      "Please enter a valid 10-digit mobile number starting with 6-9";
  }

  if (!formData.email || !formData.email.trim()) {
    errors.email = "Please enter a valid email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Please enter a valid email format (example@domain.com)";
  }

  if (!formData.password) {
    errors.password = "Please enter a valid password";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  return errors;
};

const validateLoginFields = (formData) => {
  const errors = {};

  if (!formData.mobile) {
    errors.mobile = "Mobile number is required";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const validateLoginSubmitFields = (formData) => {
  const errors = {};

  if (!formData.mobile || !formData.mobile.trim()) {
    errors.mobile = "Please enter a valid mobile number";
  }

  if (!formData.password) {
    errors.password = "Please enter a valid password";
  }

  return errors;
};

export {
  validateFormFields,
  validateSubmitFormFields,
  validateLoginFields,
  validateLoginSubmitFields,
};
