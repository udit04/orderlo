import axios from 'axios'
const baseUrl = 'http://api.ordrlo.com'

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });