import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';


import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import { Hint } from 'react-autocomplete-hint';

function NavbarDesserts() {
    const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
    const [data, setData] = useState([]);

    async function loadData() {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allCategoriesCafe", {
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

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-cat">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            {data.map(c => (
              <li className="nav-item links-icons"> {c.label}</li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

function Description() {
    const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
    const [data, setData] = useState([]);
    const [board, setBoard] = useState();

    const boardChange = event => {
        setBoard(event.target.value);
    }
    const doChange = event => {
        data.board = board;
        editBoard(data);
        event.preventDefault();
    }

    async function loadData() {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/cafe", {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Authentication": bearer
            }
        });
        let tableData = await response.json();
        setData(tableData);
        setBoard(tableData.board);
    }

    useEffect(()=> {
        loadData();
    }, []);

    async function editBoard(data) {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/editBoard", {
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
        window.location = "/moderator";
    }

  return (
    <div className="mt-2 text-center">
      <h2>{data.name}</h2>
      <form onSubmit={doChange}>
        <div className="textarea-box my-4 flex-string">
          <textarea className="mr-sm-2 search-text" rows='3' placeholder="Description" value={board} onChange={boardChange} />
        </div>
        <button className="btn-purple mb-4">Save</button>
      </form>
    </div>
  )
}

function Dessert() {
    const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [url, setURL] = useState();
    const [category, setCat] = useState();
    const [categoryList, setCategory] = useState([]);

    const changeName = event => {
        setName(event.target.value);
    }
    const changeDescription = event => {
        setDescription(event.target.value);
    }
    const changePrice = event => {
        setPrice(event.target.value);
    }
    const changeURL = event => {
        setURL(event.target.value);
    }
    const changeCat = event => {
        setCat(event.target.value);
    }

    const doAdding = event => {
        const inputData = {name, description, price, url, category}
        addDessert(inputData);
        event.preventDefault();
    }

    async function loadData() {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/categories", {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Authentication": bearer
            }
        });
        let tableData = await response.json();
        setCategory(tableData);
    }
    useEffect(()=> {
        loadData();
    }, []);

    async function addDessert(data) {
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addDessert", {
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
        window.location = "/moderator";
    }

  return(
      <div>
        <h2 className="mt-4">New Dessert</h2>
        <form className="text-center" onSubmit={doAdding}>
          <div className="search-box my-4 flex-string">
            <p className="text-1">Name: </p>
            <input required className="mr-sm-2 search-text" type="text" value={name} onChange={changeName}/>
          </div>
          <div className="search-box my-4 flex-string">
            <p className="text-1">Description: </p>
            <input required className="mr-sm-2 search-text" type="text" value={description} onChange={changeDescription}/>
          </div>

          <div className="search-box my-4 flex-string">
            <p className="text-1">Price: </p>
            <input required className="mr-sm-2 search-text" type="number" value={price} onChange={changePrice}/>
          </div>
            <div className="search-box my-4 flex-string">
                <p className="text-1">Pic URL: </p>
                <input required className="mr-sm-2 search-text" type="text" value={url} onChange={changeURL}/>
            </div>
          {/*<div className="custom-file search-box">*/}
          {/*  <input type="file" className="custom-file-input" id="customFile"/>*/}
          {/*  <label className="custom-file-label" htmlFor="customFile">Choose file</label>*/}
          {/*</div>*/}
            <div className="search-box my-4 flex-string">
                <p className="text-1">Category: </p>
                <Hint options={categoryList}>
                    <input required className="mr-sm-2 search-text" type="text" value={category} onChange={changeCat}/>
                </Hint>
            </div>
          <button className="btn-purple mb-4">Save</button>
        </form>
      </div>
  )
}

function Moderator(params) {
    if(params.role!=="moderator") {
        return (
            <div className="text-center margin-block">
                <h2>You should not be here....</h2>
            </div>
        )
    }
    else {
        return (
            <div>
                <NavbarDesserts/>
                <div className="container">
                    <Description/>
                    <Dessert/>
                </div>
            </div>
        );
    }
}

export default Moderator;
