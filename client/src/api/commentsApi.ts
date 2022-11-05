import { $authHost, $host } from "./APIindex";


export const getComments = async (deviceId: number, page?: number, limit?: number, deletedAmount?: number) => {
    const response = await $host.get('api/comment', {params: {deviceId, page, limit, deletedAmount}})
    return response.data
}

export const addComment = async (deviceId: number, body: string) => {
    const response = await $authHost.post('api/comment', {deviceId, body})
    return response.data
}

export const removeComment = async (deviceId: number, commentId: number) => {
    const response = await $authHost.delete('api/comment', {data: {deviceId, commentId}})
    return response.data
}

export const getMyComments = async (userId: number) => {
    const response = await $authHost.get(`api/comment/${userId}`)
    return response.data
}