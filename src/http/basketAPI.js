import {$authHost, $host} from "./index"


export const fetchBasket = async () => {
    const {data} = await $host.get('api/basket/getone')
    return data
}

export const append = async (id) => {
    const {data} = await $authHost.put(`api/basket/product/${id}/append/1`)
    console.log(data)
    return data

}

export const increment = async (id) => {
    const {data} = await $host.put(`api/basket/product/${id}/increment/1`)
    console.log(data)
    return data
}

export const decrement = async (id) => {
    const { data } = await $host.put(`api/basket/product/${id}/decrement/1`)
    return data
}

export const remove = async (id) => {
    const { data } = await $host.put(`api/basket/product/${id}/remove`)
    return data
}

export const clear = async () => {
    const { data } = await $host.put(`basket/clear`)
    return data
}