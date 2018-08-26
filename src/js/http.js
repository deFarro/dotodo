'use strict';

// Setup for fetch requests
const URL = 'http://localhost:3000/';

// Add more header (like CORS) for production here
const HEADERS = new Headers({
  'Content-Type': 'application/json'
});

export { URL, HEADERS };
