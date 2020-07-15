import axios from 'axios'
const baseUrl = 'https://api-ordrlo.herokuapp.com'

const ax = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type':'application/json'}
  });