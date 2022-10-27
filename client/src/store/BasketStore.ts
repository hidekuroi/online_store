import {makeAutoObservable} from 'mobx'
import { basketDeviceType } from '../types/types'

export default class BasketStore {
    private _totalCount: number
    private _basketDevices: basketDeviceType[]
    private _totalPrice: number

    constructor(){
        this._totalCount = 0
        this._basketDevices = []
        this._totalPrice = 0
        makeAutoObservable(this)
    }

    setTotalCount(count: number) {
        this._totalCount = count
    }
    setBasketDevices(devices:basketDeviceType[]) {
        this._basketDevices = devices
    }
    setTotalPrice(price: number) {
        this._totalPrice = price
    }

    get totalCount() {
        return this._totalCount
    }
    get basketDevices() {
        return this._basketDevices
    }
    get totalPrice() {
        return this._totalPrice
    }
}