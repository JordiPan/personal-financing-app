import axios from 'axios';

export default axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})
export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {'Content-Type': 'application/json'}
})
export const axiosPKMN = axios.create({
    baseURL: import.meta.env.VITE_POKEMON_CARD_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': import.meta.env.VITE_POKEMON_CARD_API_KEY
    }
})