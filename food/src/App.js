import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';

import cake from './img/cake-slice.svg';
import donut from './img/donut.svg';
import pie from './img/apple-pie.svg';
import muffin from './img/muffin.svg';
import milk from './img/milk.svg';
import pancakesCard from './img/pancakes.jpg';
import tenge from './img/tenge.svg';
import loupe from './img/loupe.png';
import logo from './img/logo.svg'
import basket from './img/basket.svg';

import React, {useEffect, useState} from "react";
import {Redirect, useParams} from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Authorization from "./Authorization";
import Registration from "./Registration"
import Cafe from "./Cafe";
import Admin from "./Admin";
import Moderator from "./Moderator";
import Basket from "./Basket";
import {useCookies} from "react-cookie";


function NavbarDesserts() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item links-icons"><a href="/desserts/Cake" className="nav-link ">
                <img src={cake} className="img-icons" alt={'Cakes'}/>
                Cakes
              </a></li>
              <li className="nav-item links-icons"><a href="/desserts/Donut" className="nav-link">
                <img src={donut} className="img-icons" alt={'Donuts'}/>
                Donuts
              </a></li>
              <li className="nav-item links-icons"><a href="/desserts/Pie" className="nav-link">
                <img src={pie} className="img-icons" alt={'Pies'}/>
                Pies
              </a></li>
              <li className="nav-item links-icons"><a href="/desserts/Muffin" className="nav-link">
                <img src={muffin} className="img-icons" alt={'Muffins'}/>
                Muffins
              </a></li>
              <li className="nav-item links-icons"><a href="/desserts/Drink" className="nav-link">
                <img src={milk} className="img-icons" alt={'Drinks'}/>
                Drinks
              </a></li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

function Navbar() {
  const [cookieJWT] = useCookies(['jwt']);
  const [role, setRole] = useState([]);

  async function loadData() {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/getRole", {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authentication": bearer
      }
    });
    let tableData = await response.json();
    setRole(tableData);
  }

  useEffect(()=> {
    if(cookieJWT['jwt'])
      loadData();
  }, []);

  const Auth = () => {

    if (role.role==="admin") {
      return (
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item mr-3">
              <a className="nav-link" href="/admin">Admin</a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/basket"> Basket <img src={basket} className="basket"/></a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
          </ul>
      )
    }
    else if (role.role==="moderator") {
      return (
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item mr-3">
              <a className="nav-link" href="/moderator">Moderator</a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/basket"> Basket <img src={basket} className="basket"/></a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
          </ul>
      )
    }
    else {
      return (
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item mr-3">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/basket"> Basket <img src={basket} className="basket"/></a>
            </li>
            <li className="nav-item mr-3">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
          </ul>
      )
    }
  }
  const Offline = () => {
    return (
        <ul className="navbar-nav ml-auto mr-5">
          <li className="nav-item mr-3">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link" href="/login">Login</a>
          </li>
        </ul>
    )
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className=" container mt-3">
          <a className="navbar-brand logo-text" href="/"><img src={logo} className="logo"/> ChocoCookie</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {cookieJWT['jwt']?<Auth/>:<Offline/>}
          </div>
        </div>
      </nav>
    </div>
  )
}

function Footer() {
  return (
      <div className="footer">
        <div className="container">
          <div className="py-5 row justify-content-between">
            <h3>ChocoCookie</h3>
            <p className="my-auto">Copyright C 2018-2021</p>
          </div>
        </div>
      </div>
  )
}



function Search() {
  const [name, setName] = useState();
  const [data, setData] = useState([]);
  const [dataCafe, setDataCafe] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
  const nameChange = event => {
    setName(event.target.value);
  }

  const doSearch = event => {
    setIsSearch(true);
    loadData(name);
    event.preventDefault();
  }

  async function loadData(data) {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/search?name=" + name, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authentication": bearer
      }
    });
    let responseCafe = await fetch("http://localhost:8000/api/searchCafe?name=" + name, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authentication": bearer
      }
    });
    let tableData = await response.json();
    let tableDataCafe = await responseCafe.json();
    setData(tableData);
    setDataCafe(tableDataCafe);
  }

  if(!isSearch) {
    return (
        <div>
          <form className="search-box my-5" onSubmit={doSearch}>
            <input className="mr-sm-2 search-text" type="search" placeholder="Input name of the cafe or desert"
                   aria-label="Search" value={name} onChange={nameChange}/>
            <button className="my-auto my-sm-0 search-btn" type="submit"><img src={loupe} className="my-auto"/></button>
          </form>
          <Feed/>
        </div>
    )
  }
  else {
    return (
        <div>
          <form className="search-box my-5" onSubmit={doSearch}>
            <input className="mr-sm-2 search-text" type="search" placeholder="Input name of the cafe or desert"
                   aria-label="Search" value={name} onChange={nameChange}/>
            <button className="my-auto my-sm-0 search-btn" type="submit"><img src={loupe} className="my-auto"/></button>
          </form>
          <div className="text-center mb-5">
            <p className="text-2">Cafes:</p>
            {dataCafe.map(n => (
                <div>
                  <a href={'/cafe/' + n.name} className="text-2">{n.name}</a>
                  <br/>
                </div>
            ))}
          </div>
          <div className="row justify-content-between">
            {data.map(n => (
                <Card pic={n.picURL} cafe={n.cafe.name} price={n.price} name={n.name} />
            ))}
          </div>
        </div>
    )
  }
}

class Card extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="mb-4" style={{width: 300}}>
      <a href={'/cafe/' + this.props.cafe} className="increase"><img src={this.props.pic} className="w-100 img-rounded mb-2"  alt={this.props.name}/></a>
      <div className="card-body text-card">
        <div className="container">
          <div className="row justify-content-between">
            <h5 className="card-title w-50 cafe-bold">{this.props.cafe}</h5>
            <div className="row my-auto mr-1">
              <p className="card-text">{this.props.price}</p>
              <img src={tenge} className="tenge-pic" alt={'tenge'}/>
            </div>
          </div>
          <div className="text-card-bottom">
            <p className="card-text">{this.props.name}</p>
          </div>
        </div>
      </div>
    </div>
  }
}


function Feed(params) {
  const {pathVariable} = useParams();
  const [cookieJWT, editCookie] = useCookies(['jwt']);
  let [data, setData] = useState([]);

  async function loadData() {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/allDesserts", {
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

  if (pathVariable != null) {
    data = data.filter(n => n.category.label === pathVariable);
    return (
      <div className="row justify-content-between">
        {data.map(n => (
            <Card pic={n.picURL} cafe={n.cafe.name} price={n.price} name={n.name} />
        ))}
      </div>
    );
  }
  else {
    return (
        <div className="row justify-content-between">
          {data.map(n => (
              <Card pic={n.picURL} cafe={n.cafe.name} price={n.price} name={n.name} />
          ))}
        </div>
    )
  }
}

function GoOut() {
  return (
      <div className="text-center margin-block">
        <h2>You should not be here....</h2>
      </div>
  )
}
function GoAutho() {
  return (
      <div className="text-center margin-block">
        <h2>Get Authorization, please....</h2>
      </div>
  )
}


function Logout() {
  const [cookieJWT, editCookie, removeCookie] = useCookies(['jwt']);
  console.log(cookieJWT);
  removeCookie('jwt', undefined);
  console.log(cookieJWT);
  window.location = "/login";
}

function App() {
  const [role, setRole] = useState([]);
  const [cookieJWT, setCookieJWT] = useCookies(['jwt']);

  async function loadRole() {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/getRole", {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
        "Authentication": bearer
      }
    });
    let tableData = await response.json();
    setRole(tableData);
  }

  useEffect(()=> {
    if(cookieJWT['jwt'])
      loadRole();
  }, []);

  return (
    <div>
      <div className="back">
        <Navbar/>
        <Router>

          <Switch>
            <Route path = '/desserts/:pathVariable' component={Feed}>
              {cookieJWT['jwt'] ?
                  <div className="container">
                    <NavbarDesserts/>
                    <Search/>
                  </div> :
                  <GoAutho/>
              }
            </Route>
            <Route path = '/cafe/:pathVariable'>
              {cookieJWT['jwt'] ?
                  <Cafe/> :
                  <GoAutho/>
              }
            </Route>
            <Route path = '/login'>
              {!cookieJWT['jwt'] ?
                  <div className="container">
                    <Authorization/>
                  </div> :
                  <GoOut/>
              }
            </Route>
            <Route path = '/registration'>
              {!cookieJWT['jwt'] ?
                  <div className="container">
                    <Registration/>
                  </div> :
                  <GoOut/>
              }
            </Route>
            <Route path = '/logout'>
                <Logout/>
            </Route>
            <Route path = '/admin'>
                <div className="container">
                  <Admin role={role.role}/>
                </div> :
            </Route>
            <Route path = '/moderator'>
                <Moderator role={role.role}/>
            </Route>
            <Route path = '/basket'>
              {cookieJWT['jwt'] ?
                  <div className="container">
                    <Basket/>
                  </div> :
                  <GoAutho/>
              }
            </Route>
            <Route path = '/'> {
              cookieJWT['jwt'] ?
              <div className="container">
                <NavbarDesserts/>
                <Search/>
              </div> :
                  <GoAutho/>
            }
            </Route>
          </Switch>

        </Router>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
