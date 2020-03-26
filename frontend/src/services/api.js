import axios from 'axios'; //Importando módulo do node que fornece um client HTTP

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;