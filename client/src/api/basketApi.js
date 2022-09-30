import { $authHost, $host } from "./APIindex";


export const getBasketDevices = async () => {
    const response = await $authHost.get('api/basket')
    return response.data
}
