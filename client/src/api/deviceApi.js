import { $authHost, $host } from "./APIindex";


export const createType = async (typeName) => {
    const response = await $authHost.post('api/type', {name: typeName})
    return response.data
}
export const fetchTypes = async () => {
    const response = await $host.get('api/type')
    return response.data
}
export const deleteType = async (id) => {
    const response = await $authHost.delete('api/type', {data: {id}})
    return response.data
}

export const createBrand = async (brandName) => {
    const response = await $authHost.post('api/brand', {name: brandName})
    return response.data
}
export const fetchBrands = async () => {
    const response = await $host.get('api/brand')
    return response.data
}
export const deleteBrand = async (id) => {
    const response = await $authHost.delete('api/brand', {data: {id}})
    return response.data
}

export const createDevice = async (device) => {
    const response = await $authHost.post('api/device', device)
    return response.data
}
export const fetchDevices = async (typeId, brandId, page, limit=9, searchQuery='') => {
    const response = await $host.get('api/device', {params: {
        typeId, brandId, page, limit, searchQuery
    }})
    return response.data
}
export const fetchOneDevice = async (id) => {
    const response = await $host.get('api/device/' + id)
    return response.data
}
export const deleteDevice = async (id) => {
    const response = await $authHost.delete('api/device', {data: {id}})
    return response.data
}

