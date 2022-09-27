import { $host } from "./APIindex";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
    console.log($host.defaults.baseUrl)
    const response = await $host.post('api/user/registration', {email, password, role: 'USER'})
    return jwt_decode(response.data.token);
}
export const login = async (email, password) => {
    const response = await $host.post('api/user/login', {email, password})
    return jwt_decode(response.data.token);
}
export const check = async () => {
    const response = await ('api/user/auth')
    return response;
}