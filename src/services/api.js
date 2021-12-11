import axios from 'axios';

//61bfe88983a8aa74bfbbc0c6dba779725587a4f3
// base URL: https://api-ssl.bitly.com/v4

export const key = '61bfe88983a8aa74bfbbc0c6dba779725587a4f3';


const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
    }
})

export default api;

