import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor(){
        this._selectedType = {}
        this._selectedBrand = []
        this._types = []
        this._brands = []
        this._devices = []

        this._comments = []

        this._page = 1
        this._totalCount = 0
        this._limit = 16

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    pushSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = [...this._selectedBrand, brand]
    }
    setComments(comments) {
        this._comments = comments
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setLimit(limit) {
        this._limit = limit
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get comments() {
        return this._comments
    }
    get page() {
        return this._page
    }
    get totalCount() {
        return this._totalCount
    }
    get limit() {
        return this._limit
    }
}