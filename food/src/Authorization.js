import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';

import React, {useState} from "react";
import {useCookies} from 'react-cookie';


function Authorization() {
  const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
  const [email, editTelephone] = useState("");
  const [password, editPassword] = useState("");
  const [message, editMessage] = useState("");

  const handleTelephoneChange = (event) => {
    editTelephone(event.target.value)
  }
  const handlePasswordChange = (event) => {
    editPassword(event.target.value)
  }
  const handleChange = event => {
    const input = {email, password};
    auto(input);
    event.preventDefault();
  }
  async function auto(data){
    const response = await fetch("http://localhost:8000/auth", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    });
    if(response.status===200) {
      let jwt = await response.json();
      setCookieJWT('jwt', jwt);
      window.location = "/";
    }
    else {
      editMessage("Wrong telephone or password");
    }
  }

  return (
    <div className="margin-block">
      <h2 className="text-center">Authorization</h2>
      <p className="text-3">{message}</p>
      <form onSubmit={handleChange} className="my-4 text-center">
        <div className="search-box my-4">
          <input className="mr-sm-2 search-text text-center" type="text" value={email} onChange={handleTelephoneChange} minLength={11} maxLength={11} placeholder="Telephone Number"/>
        </div>
        <div className="search-box mb-4">
          <input className="mr-sm-2 search-text text-center" type="password" value={password} onChange={handlePasswordChange} placeholder="Password"/>
        </div>
        <div className="mb-4">
          <a href="/registration" className="link">I don't have an account</a>
        </div>

        <button className="btn-purple">Log in</button>
      </form>
    </div>
  );
}

export default Authorization;
