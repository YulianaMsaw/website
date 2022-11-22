import {$authHost, $host} from "./index"


export const userCreate = async (body) => {
    const { data } = await $authHost.post('order/user/create', body)
    return data
}
// получить список всех заказов пользователя
export const userGetAll = async () => {
    const { data } = await $authHost.get('order/user/getall')
    return data
}
// получить один заказ пользователя
export const userGetOne = async (id) => {
    const { data } = await $authHost.get(`order/user/getone/${id}`)
    return data
}

/*
 * для неавторизованного пользователя
 */

// создать новый заказ
export const guestCreate = async (body) => {
    const { data } = await $host.post('order/guest/create', body)
    return data
}