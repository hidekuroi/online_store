import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    constructor(){
        this._totalCount = 0
        this._basketDevices = []
        this._totalPrice = 0
        makeAutoObservable(this)
    }

    setTotalCount(count) {
        this._totalCount = count
    }
    setBasketDevices(devices) {
        this._basketDevices = devices
    }
    setTotalPrice(price) {
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