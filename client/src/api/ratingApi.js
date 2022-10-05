import { $authHost, $host } from "./APIindex";


export const getGivenRating = async (deviceId) => {
    const response = await $authHost.get('api/rating', {params: {deviceId}})
    return response.data
}

export const addRating = async (deviceId, ratingValue) => {
    const response = await $authHost.put('api/rating', {deviceId, ratingValue})
    return response.data
}