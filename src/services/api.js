import axios from "axios";

var apiUrl = window.location.href.includes("localhost") ? 'https://localhost:7119/api' : 'https://apisunsale.azurewebsites.net/api';

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default api;
