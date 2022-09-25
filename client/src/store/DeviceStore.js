import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor(){
        this._selectedType = {}
        this._selectedBrand = {}
        this._types = [
            {id: 1, name: "Холодильники"},
            {id: 2, name: "Смартфоны"},
        ]
        this._brands = [
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"},
        ]
        this._devices = [
            {id: 1, name: "IPhone 14 Pro", price: 1199, rating: 5, img: "https://my-apple-store.ru/wa-data/public/shop/products/30/26/12630/images/19824/19824.970.jpg"},
            {id: 2, name: "IPhone 14 Pro", price: 1199, rating: 5, img: "https://my-apple-store.ru/wa-data/public/shop/products/30/26/12630/images/19824/19824.970.jpg"},
            {id: 3, name: "IPhone 14 Pro", price: 1199, rating: 5, img: "https://my-apple-store.ru/wa-data/public/shop/products/30/26/12630/images/19824/19824.970.jpg"},
            {id: 4, name: "IPhone 14 Pro", price: 1199, rating: 5, img: "https://my-apple-store.ru/wa-data/public/shop/products/30/26/12630/images/19824/19824.970.jpg"}
        ]

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
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
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
}