const APIURL = '/api';

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function generateGuid () {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export const send = (endpoint, options) => {
  const guid = generateGuid();
  const settings = {
    method: options.method || 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'content-type': 'application/json'
    },
    body: options.json != null ? JSON.stringify(options.json) : undefined
  };

  return fetch(`${APIURL}/${endpoint}`, settings).then(response => {
    if (response.status === 204) return true;
    if (response.status > 499) return { error: { message: 'Unexpected error' } };
    return response.json();
  })
    .then(json => {
      if (json.error) {
        const error = new Error(json.error.message);
        error.guid = guid;
        throw error;
      } else {
        return json;
      }
    });
};
