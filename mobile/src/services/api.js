import axios from 'axios'; //Pacote para fazer requisições HTTP

const api = axios.create({
    //IP do servidor onde esta o backend e a porta onde está rodando o node.js no backend 
    baseURL: 'http://192.168.1.104:3333'
});

export default api;