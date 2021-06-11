import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';

import React, {useEffect, useState} from "react";
import pancakesCard from "./img/pancakes.jpg";
import plus from "./img/add.png";
import minus from "./img/minus.png";
import tenge from "./img/tenge.svg";
import {useCookies} from "react-cookie";


function Order() {
    const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
    const [data, setData] = useState([]);
    const [currentAct, setCurrentAct] = useState();
    const [currentId, setCurrentId] = useState();
    const [local, setLocal] = useState();

    async function loadData() {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/getBasket", {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Authentication": bearer
            }
        });
        let tableData = await response.json();
        setData(tableData);
    }

    useEffect(()=> {
        loadData();
    }, []);

    const makeOrder = event => {
        doOrder(data);
        event.preventDefault();
    }

    async function doPlusMinus() {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const change = {currentId, currentAct};
        const response = await fetch("http://localhost:8000/api/plusMinus", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authentication": bearer
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(currentId, currentAct)
        });
    }

    async function doOrder(data) {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/order", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authentication": bearer
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
        window.location = "/";
    }

    let sum = data.reduce(function(prev, current) {
        return prev + (current.price*current.quantity)
    }, 0);
    return (
        <div className="mt-4">
            <h2>Placement of the order</h2>
            <form onSubmit={makeOrder}>
                <div className="order-box w-75 mx-auto">
                    {data.map(b => (
                        <div className="row justify-content-between mb-4 div-order">
                            <div className="pic-col">
                                <img src={b.url} className="img-basket"/>
                            </div>
                            <div className="name-col text-center" >
                                <p className="text-2">{b.name}</p>
                                <p className="text-3">{b.quantity * b.price} <img src={tenge} className="tenge-pic"/></p>
                            </div>
                            <div className="plus-minus-col">
                                <img src={plus} className="plus-minus" onClick={() => {setCurrentId(b.id); setCurrentAct("plus"); doPlusMinus()}}/>
                                <p className="text-3 mt-3">{b.quantity}</p>
                                <img src={minus} className="plus-minus" onClick={() => {setCurrentId(b.id); setCurrentAct("minus"); doPlusMinus()}}/>
                            </div>
                        </div>
                    ))}
                    <div>
                        <h4 className="text-2 float-right">Total: {sum}</h4>
                        <img src={tenge} className="tenge-pic float-right mr-2"/>
                    </div>
                </div>
                <div className="text-center">
                    <button className="btn-purple mt-4">Make an order</button>
                </div>
            </form>
        </div>
    )
}

function Basket() {
  return (
    <div>
      <div className="container">
        <Order/>

      </div>
    </div>
  );
}

export default Basket;
