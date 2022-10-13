import { $authHost, $host } from "./APIindex";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password, userName) => {
    const response = await $host.post('api/user/registration', {email, password, userName})
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token);
}
export const login = async (email, password) => {
    const response = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token);
}
export const check = async () => {
    const response = await $authHost.get('api/user/auth')
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token);
}
export const updateUser = async (userName) => {
    const response = await $authHost.put('/api/user/update', {userName})
    localStorage.setItem('token', response.data.token)
    return jwt_decode(response.data.token)
}