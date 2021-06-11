import './App.css';
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';

import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import {useCookies} from "react-cookie";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function Admin(params) {
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [modalCafe, setModalCafe] = useState();
  const [modalModerator, setModalModerator] = useState();
  const [modalGroup, setModalGroup] = useState([]);

  function openModal(id) {
    setModalGroup(data.find(d => d.id === id))
    setModalCafe(modalGroup.name);
    setModalModerator(modalGroup.moderatorPhone);
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = '#4c1414';
  }
  function closeModal(){
    setIsOpen(false);
  }

  const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
  const [data, setData] = useState([]);
  const [newCafe, setCafe] = useState();

  async function loadData() {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    let response = await fetch("http://localhost:8000/api/cafes", {
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
    if(cookieJWT['jwt'])
      loadData();
  }, []);

  const CafeChange = event => {
    setCafe(event.target.value);
  }
  const ModalCafeChange = event => {
    setModalCafe(event.target.value)
  }
  const PhoneChange = event => {
    setModalModerator(event.target.value);
  }

  const doAdding = event => {
    addCafe(newCafe);
    event.preventDefault();
  }
  const doEdit = event => {
    modalGroup.name = modalCafe;
    modalGroup.moderatorPhone = modalModerator;
    // const inputData = {modalGroup.id, modalCafe, modalModerator, modalGroup.moderatorPhone}
    editCafe(modalGroup);
    event.preventDefault();
  }

  async function addCafe(data) {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    const response = await fetch("http://localhost:8000/api/addCafe", {
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
    window.location = "/admin";
  }
  async function editCafe(data) {
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    const response = await fetch("http://localhost:8000/api/editCafe", {
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
    if(response.status===409) {
      console.log("Something went wrong");
    }
    window.location = "/admin";
  }

  if(!cookieJWT['jwt'] || params.role!=="admin") {
    return (
        <div className="text-center margin-block">
          <h2>You should not be here....</h2>
        </div>
    )
  }
  else {
    return (
        <div>
          <h2 className="my-4">Cafe Management</h2>
          <form className="row" onSubmit={doAdding}>
            <div className="search-box my-4 w-50 flex-string">
              <p className="text-1">Name: </p>
              <input required className="mr-sm-2 search-text mr-0" type="text" value={newCafe} onChange={CafeChange}/>
            </div>
            <button className="btn-purple my-auto mr-3">Add New Cafe</button>
          </form>
          <table className="table-border-color">
            <thead>
            <tr className="row-table">
              <th scope="col">#</th>
              <th scope="col">Cafe</th>
              <th scope="col">Moderator</th>
              <th scope="col">Telephone</th>
            </tr>
            </thead>
            <tbody>
            {data?.map(n => (
                <tr>
                  <th scope="row">{n.id}</th>
                  <td className="moder-table" onClick={() => openModal(n.id)}>
                    <button className="btn-table w-100">{n.name}</button>
                  </td>
                  <td>{n.moderator}</td>
                  <td>{n.moderatorPhone}</td>
                </tr>
            ))}
            </tbody>
          </table>

          <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
          >

            <h2 ref={_subtitle => (subtitle = _subtitle)}>Changing the data</h2>

            <form className="my-4 text-center" onSubmit={doEdit}>
              <div className="search-box my-4 flex-string">
                <p className="text-1">Name: </p>
                <input required className="mr-sm-2 search-text" type="text" value={modalCafe}
                       onChange={ModalCafeChange}/>
              </div>
              <div className="search-box my-4 flex-string">
                <p className="text-1">ModerPhone: </p>
                <input required className="mr-sm-2 search-text" type="text" value={modalModerator}
                       onChange={PhoneChange} maxLength={11} minLength={11}/>
              </div>
              <div className="justify-content-between row mr-2 ml-2">
                <button className="btn-purple" onClick={closeModal}>Cancel</button>
                <button className="btn-purple">Change</button>
              </div>
            </form>
          </Modal>
        </div>
    );
  }
}

export default Admin;
