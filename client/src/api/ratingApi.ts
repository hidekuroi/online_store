import { $authHost } from "./APIindex";


export const getGivenRating = async (deviceId: number) => {
    const response = await $authHost.get('api/rating', {params: {deviceId}})
    return response.data
}

export const addRating = async (deviceId: number, ratingValue: number) => {
    const response = await $authHost.put('api/rating', {deviceId, ratingValue})
    return response.data
}