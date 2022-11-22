import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { SHOP_ROUTE, ORDER_ROUTE } from "../utils/consts";
import { Table, Spinner, Button } from 'react-bootstrap'
import BasketItem from './BasketItem.js'
import { increment, decrement, remove } from '../http/basketAPI.js'
import {useHistory} from 'react-router-dom'
import {set} from "mobx";


const BasketList = observer(() => {


    const {basket} = useContext(Context)
    const [fetching, setFetching] = useState(false)
    const history = useHistory()


    const goOrder=()=>{
        history.push(ORDER_ROUTE)
    }

    const goHome=()=>{

        history.push(SHOP_ROUTE)
    }
        const handleIncrement = async (id) => {
        setFetching(true)
        const data= await increment(id)
        basket.setProducts(data.products)
        setFetching(false)

    }

    const handleDecrement = async (id) => {
        setFetching(true)
        const data= await decrement(id)
        basket.setProducts(data.products)
        setFetching(false)
    }

    const handleRemove = async (id) => {
        setFetching(true)
        const data= await remove(id)
        basket.setProducts(data.products)
        setFetching(false)
    }

    if (fetching) {
        return <Spinner animation="border" />
    }


    const cost = basket.products.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return (
        <div>
            {basket && basket.count !== 0 ?(
                <>
                <Table bordered hover size="sm" className="mt-3">
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Сумма</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {basket.products.map(item =>
                        <BasketItem
                        key={item.id}
                        increment={handleIncrement}
                        decrement={handleDecrement}
                        remove={handleRemove}
                        {...item}
                    />
                    )}
                    <tr>
                        <th colSpan="3">Итого</th>
                        <th>{basket.sum}</th>
                        <th>руб.</th>
                    </tr>
                    </tbody>
                </Table>
                <Button  onClick={goHome}>Продолжить покупки</Button>
                </>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </div>
    )
}
)

export default BasketList