import {makeAutoObservable} from 'mobx'

export default class BasketStore {
    constructor(){
        this._totalCount = 0
        this._basketDevices = {}
        makeAutoObservable(this)
    }

    setTotalCount(count) {
        this._totalCount = count
    }
    setBasketDevices(devices) {
        this._basketDevices = devices
    }

    get totalCount() {
        return this._totalCount
    }
    get basketDevices() {
        return this._basketDevices
    }
}