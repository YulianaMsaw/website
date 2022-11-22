import { Container, Form, Button, Spinner } from 'react-bootstrap'
import React from 'react';
import { useState, useContext, useEffect } from 'react'
import { Context } from '../index'
import { userCreate, guestCreate } from '../http/orderAPI'
import { fetchBasket } from '../http/basketAPI.js'
import { check as checkAuth } from '../http/userAPI.js'
import { useHistory } from 'react-router-dom'
import {LOGIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE} from "../utils/consts";




const isValid = (input) => {
    let pattern
    switch (input.name) {
        case 'name':
            pattern = /^[-а-я]{2,}( [-а-я]{2,}){1,2}$/i
            return pattern.test(input.value.trim())
        case 'email':
            pattern = /^[-_.a-z]+@([-a-z]+\.){1,2}[a-z]+$/i
            return pattern.test(input.value.trim())
        case 'phone':
            pattern = /^\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/i
            return pattern.test(input.value.trim())
        case 'address':
            return input.value.trim() !== ''
    }
}

const Checkout =  () => {
    const { user, basket } = useContext(Context)
    const [fetching, setFetching] = useState(true) // loader, пока получаем корзину

    const [order, setOrder] = useState(null)

    const [value, setValue] = useState({name: '', email: '', phone: '', address: ''})
    const [valid, setValid] = useState({name: null, email: null, phone: null, address: null})

    const history=useHistory()

    useEffect(async () => {
        // если корзина пуста, здесь делать нечего
        const data = await fetchBasket()

        setFetching(false)

        // нужно знать, авторизован ли пользователь
        checkAuth()
            .then(data => {
                if (data) {
                    user.login(data)
                }
            })
            .catch(
                error => user.logout()
            )
    }, [])

    if (fetching) { // loader, пока получаем корзину
        return <Spinner animation="border" />
    }


    if (order) { // заказ был успешно оформлен
        return (
            <Container>
                <h1 className="mb-4 mt-4">Заказ оформлен</h1>
                <p>Наш менеджер скоро позвонит для уточнения деталей.</p>
            </Container>
        )
    }

    const handleChange = (event) => {
        setValue({...value, [event.target.name]: event.target.value})
        /*
         * Вообще говоря, проверять данные поля, пока пользователь не закончил ввод — неправильно,
         * проверять надо в момент потери фокуса. Но приходится проверять здесь, поскольку браузеры
         * автоматически заполняют поля. И отловить это событие — весьма проблематичная задача.
         */
        setValid({...valid, [event.target.name]: isValid(event.target)})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        setValue({
            name: event.target.name.value.trim(),
            email: event.target.email.value.trim(),
            phone: event.target.phone.value.trim(),
            address: event.target.address.value.trim(),
        })

        setValid({
            name: isValid(event.target.name),
            email: isValid(event.target.email),
            phone: isValid(event.target.phone),
            address: isValid(event.target.address),
        })

        if (valid.name) {
            let comment = event.target.comment.value.trim()
            comment = comment ? comment : null
            // форма заполнена правильно, можно отправлять данные
            const body = {...value, comment}
            console.log(body)
            const create = user.isAuth ? userCreate : guestCreate
            create(body)
                .then(
                    data => {
                        setOrder(data)
                        basket.products = []
                    }
                )
        }
    }

    console.log(order)
    return (
        <Container>
                <h1 className="mb-4 mt-4">Оформление заказа</h1>
                <Form noValidate onSubmit={handleSubmit}>
                <Form.Control
                name="name"
                value={value.name}
                onChange={e => handleChange(e)}
                isValid={valid.name === true}
                isInvalid={valid.name === false}
                placeholder="Введите имя и фамилию..."
                className="mb-3"
                />
                <Form.Control
                name="email"
                value={value.email}
                onChange={e => handleChange(e)}
                isValid={valid.email === true}
                isInvalid={valid.email === false}
                placeholder="Введите адрес почты..."
                className="mb-3"
                />
                <Form.Control
                name="phone"
                value={value.phone}
                onChange={e => handleChange(e)}
                isValid={valid.phone === true}
                isInvalid={valid.phone === false}
                placeholder="Введите номер телефона..."
                className="mb-3"
                />
                <Form.Control
                name="address"
                value={value.address}
                onChange={e => handleChange(e)}
                isValid={valid.address === true}
                isInvalid={valid.address === false}
                placeholder="Введите адрес доставки..."
                className="mb-3"
                />
                <Form.Control
                name="comment"
                className="mb-3"
                placeholder="Комментарий к заказу..."
                />
                <Button type="submit">Отправить</Button>
                </Form>
        </Container>

    )
}

export default Checkout
