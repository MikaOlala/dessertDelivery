import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';

import React, {useState} from "react";
import {Redirect} from "react-router";



function Registration() {
  const [telephone, editTelephone] = useState("");
  const [name, editName] = useState("");
  const [password, editPassword] = useState("");
  const [repassword, editRePassword] = useState("");
  const [message, editMessage] = useState('');

  const handleTelephoneChange = (event) => {
    editTelephone(event.target.value);
  }
  const handleNameChange = (event) => {
    editName(event.target.value);
  }
  const handlePasswordChange = (event) => {
    editPassword(event.target.value);
  }
  const handleRePasswordChange = (event) => {
    editRePassword(event.target.value);
  }

  const handleSubmit = event => {
    if(password===repassword) {
      const input = {name, telephone, password}
      reg(input);
      event.preventDefault();
    }
    else
      editMessage("Passwords don't match");
  }
  async function reg(data){
    const response = await fetch("http://localhost:8000/register", {
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
      window.location = "/login";
    }
    else {
      editMessage("User with this number is already registered") // ! page always reloads !
    }
  }

  return (
    <div className="margin-block-2">
      <h2 className="text-center">Registration</h2>
      <p className="text-3">{message}</p>
      <form className="my-4 text-center" onSubmit={handleSubmit}>
        <div className="search-box mb-4 flex-string">
          <p className="text-1">Phone number: </p>
          <input required className="mr-sm-2 search-text" value={telephone} onChange={handleTelephoneChange} type="telephone" minLength={11} maxLength={11} />
        </div>
        <div className="search-box mb-4 flex-string">
          <p className="text-1">Your name: </p>
          <input required className="mr-sm-2 search-text" value={name} onChange={handleNameChange} type="text"/>
        </div>
        <div className="search-box mb-4 flex-string">
          <p className="text-1">Password: </p>
          <input required className="mr-sm-2 search-text" value={password} onChange={handlePasswordChange} type="password"/>
        </div>
        <div className="search-box mb-4 flex-string">
          <p className="text-1">Password: </p>
          <input required className="mr-sm-2 search-text" value={repassword} onChange={handleRePasswordChange} type="password"/>
        </div>

        <button className="btn-purple">Register</button>
      </form>
    </div>
  );
}

export default Registration;
