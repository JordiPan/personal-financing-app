import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BACKEND_URL;
const pkmnURL = import.meta.env.VITE_POKEMON_CARD_API_URL;
const pkmnKey = import.meta.env.VITE_POKEMON_CARD_API_KEY;

if (!baseURL || !pkmnURL || !pkmnKey) {
  throw new Error('Missing required environment variables.');
}
export const axiosDefault = axios.create({
    baseURL: baseURL
})
export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})
export const axiosPKMN = axios.create({
    baseURL: pkmnURL,
    headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': pkmnKey
    }
})