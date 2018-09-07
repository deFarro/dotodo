// Setup for fetch requests
const URL = 'http://localhost:3000/';

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
  // For development without backend

  // if (options.method === 'POST') {
  //   return new Promise((resolve, reject) => resolve({ username: 'Nix', sessionId: 1234567, _id: 123 }));
  // }

  // if (options.method === 'PUT') {
  //   return new Promise((resolve, reject) => resolve({ title: 'Title', description: 'Description', author: { username: 'Nix', sessionId: 1234567, _id: 123 }, status: 'completed' }));
  // }

  // return new Promise((resolve, reject) => resolve([{ _id: 12345, title: 'Title', description: 'Description', author: { username: 'Nix', sessionId: 1234567, _id: 123 }, status: 'completed' }]));
}

export const generateFetchOptions = (method, contents) => {
  return {
    method,
    credentials: 'include',
    body: contents,
    headers: HEADERS
  };
}
