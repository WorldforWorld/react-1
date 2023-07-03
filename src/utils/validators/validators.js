export const required = value => {
  if (value) return undefined;
  return "Field is required";
};
export const maxLenthCreator = maxLength => value => {
  if (value.length > maxLength) return `Max length is ${maxLength} symbol`;
  return undefined;
};
