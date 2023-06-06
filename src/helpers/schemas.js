export const NAME_SCHEMA = {
  required: "This field is required",
  maxLength: {
    value: 99,
    message: "Max length exceeded (99 characters).",
  },
};
export const DESCRIPTION_SCHEMA = {
  required: "This field is required",
  maxLength: {
    value: 99,
    message: "Max length exceeded (99 characters).",
  },
};
export const PRICE_SCHEMA = {
  required: "This field is required.",
  min: {
    value: 1,
    message: "Price must be greater than 0.",
  },
};
export const ROOMS_SCHEMA = {
  required: "This field is required.",
  min: {
    value: 1,
    message: "Number of rooms must be greater than 0.",
  },
};
