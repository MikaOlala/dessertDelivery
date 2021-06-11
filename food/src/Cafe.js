import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';

import pancakesCard from './img/pancakes.jpg';
import tenge from './img/tenge.svg';
import plus from './img/add.png';
import minus from './img/minus.png';


import React, {useEffect, useState} from "react";
import {useParams, withRouter} from "react-router";
import {useCookies} from "react-cookie";

function NavbarDesserts() {
  const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
  const {pathVariable} = useParams();
  const [cat, setCat] = useState([]);

  async function loadCat() {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allCategoriesCafePath/" + pathVariable, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authentication": bearer
      }
    });
    let tableData = await response.json();
    setCat(tableData);
  }

  useEffect(()=> {
    loadCat();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-cat">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            {cat.map(c => (
              <li className="nav-item links-icons"><a href={'#' + c.label} className="nav-link "> {c.label} </a></li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

function Description() {
  const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
  const {pathVariable} = useParams();
  const [data, setData] = useState([]);

  async function loadData() {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/cafe/" + pathVariable, {
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
      <div className="mt-2 text-center">
        <h2>{data.name}</h2>
        <p className="text-2">{data.board}</p>
      </div>
  )
}

class Card extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }

  doPlus() {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Authentication": this.props.cookie
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(this.props.id)
    };
    fetch('http://localhost:8000/api/plus', requestOptions)
        .then((response) => response.json())
        .then(number => {
          this.setState({count: number});
        });
  }
  doMinus() {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Authentication": this.props.cookie
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(this.props.id)
    };
    fetch('http://localhost:8000/api/minus', requestOptions)
        .then((response) => response.json())
        .then(number => {
          this.setState({count: number});
        });
  }

  render() {
    return <div className="mb-4" style={{width: '48%'}}>
      <img src={this.props.pic} className="w-100 img-rounded mb-2"  alt={this.props.name}/>
      <div className="card-body text-card" style={{height: 200}}>
        <div className="container">
          <div className="row justify-content-between">
            <h5 className="card-title w-50 cafe-bold">{this.props.name}</h5>
            <div className="row my-auto mr-1">
              <p className="card-text">{this.props.price}</p>
              <img src={tenge} className="tenge-pic" alt={'tenge'}/>
            </div>
          </div>
          <div className="text-card-bottom row">
            <p className="card-text" style={{width: '80%'}}>{this.props.des}</p>
            <div className="ml-auto col">
              <img src={plus} className="plus-minus" onClick={() => this.doPlus()}/>
              <p className="text-3">{this.state.count}</p>
              <img src={minus} className="plus-minus" onClick={() => this.doMinus()}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}


class Categ extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authentication": this.props.cookie
      }
    };
    fetch('http://localhost:8000/api/allDessertsByCafe/' + this.props.path, requestOptions)
        .then((response) => response.json())
        .then(dessertList => {
          this.setState({ data: dessertList });
          this.setState({
            data: this.state.data.filter(n => n.category === this.props.cat)
          });
        });

  }

  render() {
    // this.state.data.filter(n => n.category === this.props.cat)
    return <div id={this.props.cat}>
      <h2 className="text-h mb-4">{this.props.cat}</h2>
      <div className=" row justify-content-between">
        {this.state.data.map(n => (
            <Card id={n.id} price={n.price} name={n.name} des={n.description} pic={n.url} cookie={this.props.cookie}/>
        ))}
      </div>
    </div>
  }

}


function Feed(params) {
  const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
  const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
  const {pathVariable} = useParams();
  const [cat, setCat] = useState([]);

  async function loadCat() {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allCategoriesCafePath/" + pathVariable, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authentication": bearer
      }
    });
    let tableData = await response.json();
    setCat(tableData);
  }

  useEffect(()=> {
    loadCat();
  }, []);

    return (
      <div>
        {cat.map(c => (
            <Categ cat={c.label} path={pathVariable} cookie={bearer}/>
        ))}
      </div>
    );
}

function Cafe() {
  return (
    <div>
      <NavbarDesserts/>
      <div className="container">
        <Description/>
        <Feed/>
      </div>
    </div>
  );
}

export default withRouter(Cafe);
