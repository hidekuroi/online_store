export type minDeviceDataType = {
    id: number,
    name: string,
    price: number,
    rating: number,
    img: string,
    createdAt: string,
    updatedAt: string,
    typeId: number,
    brandId: number
}

export type brandType = {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
}

export type deviceTypeType = {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string,
}

export type basketDeviceType = {
    deviceInfo: minDeviceDataType,
    amount: number,
    basketDeviceId: number
}

export type additionalInfoType = {
    createdAt: string,
    description: string,
    deviceId: number,
    id: number,
    title: string,
    updatedAt: string,

    //client-side variables
    toDelete: boolean,
    number: string
}

export type imageType = {
    id: number,
    img: string
}

export type fullDeviceDataType = minDeviceDataType & {
    info: Array<additionalInfoType>,
    images: Array<imageType>
}

export type commentBodyType = {
    body: string,
    createdAt: string,
    updatedAt: string,
    deviceId: number,
    id: number,
    userId: string
}

export type commentType = { 
    comment: commentBodyType,
    userName: string
}