import { useState, useEffect } from "react";
import { validate, validateProperty } from "../utils/validation";

const useFormShipping = ({ initialData, onSubmit, schema }) => {
  const [data, setData] = useState(initialData || {});
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleChange = ({ target: { name, value } }) => {
    const error = { ...errors };
    const errorMessage = validateProperty(name, value, schema);
    if (errorMessage) error[name] = errorMessage;
    else delete error[name];

    setData({ ...data, [name]: value });
    setErrors(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data, schema);
    if (errors !== null) return setErrors(errors);

    onSubmit(data);
    setData(initialData);
    setErrors(null);
  };
  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
  };
};

export default useFormShipping;
