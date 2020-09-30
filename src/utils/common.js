const whitelisted = '_.#&!-\\s';
export const regexps = {
  specialChars: {
    pattern: `^(?!\s)[A-Za-z0-9${whitelisted}\s-]*(?!\s)$`,// eslint-disable-line
    message: 'must not contain special characters'
  },
  whitelisted: {
    pattern: `^[A-Za-zÀ-ȕ0-9\\s${whitelisted}]+$`,
    message: `must only include ${whitelisted}, letters and numbers`
  },
  noSpace: {
    pattern: /^[^\s].*[^\s]$/,
    message: 'must not start or end with a space'
  },
  price: {
    pattern: /^\d*(\.\d{1,2})?$/,
    message: 'must be a valid price'
  },
  json: {
    pattern: /^{.*:.*}$/
  }
};

export const camalize = str => str.charAt(0).toUpperCase() + str.slice(1);
