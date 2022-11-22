import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._id=null
        this._email=null
        this._isAuth = false
        this._isAdmin = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    login({id, email, role}) {
        this._id = id
        this._email = email
        this._isAuth = true
        this._isAdmin = role === 'ADMIN'
    }

    logout() {
        this._id=null
        this._email=null
        this._isAuth = false
        this._isAdmin = false
    }

}
