import Joi from "joi-browser";

export const validate = (data, schema) => {
  const { error } = Joi.validate(data, schema, { abortEarly: false });
  if (!error) return null;

  const errors = {};
  error.details.forEach((e) => (errors[e.path] = e.message));
  return errors;
};

export const validateProperty = (name, value, schema) => {
  const obj = { [name]: value };

  const newSchema = { [name]: schema[name] };

  const { error } = Joi.validate(obj, newSchema);

  return error ? error.details[0].message : null;
};
