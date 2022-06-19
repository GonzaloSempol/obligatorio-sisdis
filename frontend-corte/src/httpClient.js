import axios from 'axios';

let httpClient = null;

export function createInstance() {
  httpClient = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8081/',
    headers: { 'Content-Type': 'application/json' }
  })
}

export { httpClient };