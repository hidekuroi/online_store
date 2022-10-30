import { minDeviceDataType, fullDeviceDataType } from './../types/types';
import { $authHost, $host } from "./APIindex";


export const createType = async (typeName: string) => {
    const response = await $authHost.post('api/type', {name: typeName})
    return response.data
}
export const fetchTypes = async () => {
    const response = await $host.get('api/type')
    return response.data
}
export const deleteType = async (id: string) => {
    const response = await $authHost.delete('api/type', {data: {id}})
    return response.data
}

export const createBrand = async (brandName: string) => {
    const response = await $authHost.post('api/brand', {name: brandName})
    return response.data
}
export const fetchBrands = async () => {
    const response = await $host.get('api/brand')
    return response.data
}
export const deleteBrand = async (id: string) => {
    const response = await $authHost.delete('api/brand', {data: {id}})
    return response.data
}

export const createDevice = async (device: any) => {
    const response = await $authHost.post('api/device', device)
    return response.data
}
export const fetchDevices = async (typeId?: number, brandId?: number | number[], page?: number, limit=9, searchQuery='', orderBy?: string, order?: string) => {
    const response = await $host.get('api/device', {params: {
        typeId, brandId, page, limit, searchQuery, orderBy, order
    }})
    return response.data
}
export const fetchOneDevice = async (id: number) => {
    const response = await $host.get('api/device/' + id)
    return response.data
}
export const deleteDevice = async (id: number) => {
    const response = await $authHost.delete('api/device', {data: {id}})
    return response.data
}
export const updateDevice = async (device: any) => {
    const response = await $authHost.put('api/device', device)
    return response.data
}

