import { $authHost, $host } from "./APIindex";


export const getComments = async (deviceId) => {
    const response = await $host.get('api/comment', {params: {deviceId}})
    return response.data
}

export const addComment = async (deviceId, body) => {
    const response = await $authHost.post('api/comment', {deviceId, body})
    return response.data
}