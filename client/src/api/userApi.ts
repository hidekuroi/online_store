import { $authHost, $host } from "./APIindex";
import jwt_decode from 'jwt-decode'

export const registration = async (email: string, password: string, userName: string) => {
    const response = await $host.post('api/user/registration', {email, password, userName})
    localStorage.setItem('token', response.data.token)
    const decoded = jwt_decode(response.data.token)
    //@ts-ignore
    return ({...decoded, img: response.data.img})
}
export const login = async (email: string, password: string) => {
    const response = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', response.data.token)
    const decoded = jwt_decode(response.data.token)
    //@ts-ignore
    return ({...decoded, img: response.data.img})
}
export const check = async () => {
    const response = await $authHost.get('api/user/auth')
    localStorage.setItem('token', response.data.token)
    const decoded = jwt_decode(response.data.token)
    //@ts-ignore
    return ({...decoded, img: response.data.img})
}
export const updateUser = async (form: any) => {
    const response = await $authHost.put('/api/user/update', form)
    localStorage.setItem('token', response.data.token)
    const decoded = jwt_decode(response.data.token)
    //@ts-ignore
    return ({...decoded, img: response.data.img})
}