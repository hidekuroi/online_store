import { deviceTypeType, brandType, minDeviceDataType, commentType } from './../types/types';
import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    private _selectedType: deviceTypeType | null
    private _selectedBrand: brandType[] | []
    private _types: deviceTypeType[] | []
    private _brands: brandType[] | []
    private _devices: minDeviceDataType[] | []
    private _comments: commentType[] | []
    
    private _page: number
    private _totalCount: number
    private _limit: number

    constructor(){
        this._selectedType = null
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

    setTypes(types: deviceTypeType[]) {
        this._types = types
    }
    setBrands(brands: brandType[]) {
        this._brands = brands
    }
    setDevices(devices: minDeviceDataType[]) {
        this._devices = devices
    }
    setSelectedType(type: deviceTypeType | null) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand: brandType[]) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    pushSelectedBrand(brand: brandType) {
        this.setPage(1)
        this._selectedBrand = [...this._selectedBrand, brand]
    }
    setComments(comments: commentType[]) {
        this._comments = comments
    }
    setPage(page: number) {
        this._page = page
    }
    setTotalCount(count: number) {
        this._totalCount = count
    }
    setLimit(limit: number) {
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