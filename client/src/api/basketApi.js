import { $authHost } from "./APIindex";


export const getBasketDevices = async () => {
    const response = await $authHost.get('api/basket')
    return response.data
}

export const deleteBasketDevice = async (basketDeviceId) => {
    const response = await $authHost.delete('api/basket', {data: {basketDeviceId}})
    return response.data
}

export const addToBasket = async (deviceId) => {
    const response = await $authHost.post('api/basket', {deviceId})
    return response.data
}

export const updateAmount = async (basketDeviceId, amount) => {
    const response = await $authHost.put('api/basket', {basketDeviceId, amount})
    return response.data
} 
