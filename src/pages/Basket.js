import React, {useContext} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import BasketList from '../components/BasketList.js'



const Basket = () => {
    return (
        <Container>
            <h1>Корзина</h1>
            <BasketList />
        </Container>


    )
};

export default Basket;
