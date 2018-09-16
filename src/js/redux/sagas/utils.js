// Setup for fetch requests
const URL = 'http://localhost:9090/';

// Add more header (like CORS) for production here
const HEADERS = new Headers({
  'Content-Type': 'application/json'
});

// Universal function to get/send any data
export const fetchData = (url, options) => {
  return fetch(URL + url, options)
    .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network error occured.');
      })
    .catch(err => err);
}

export const generateFetchOptions = (method, contents) => {
  return {
    method,
    mode: 'cors',
    body: contents,
    headers: HEADERS
  };
}
