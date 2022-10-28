import React, { useState } from "react";
import "./ShowList.css";
import Modal from "./Modal";

const ShowList = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [singleUser, setSingleUser] = useState(null);
  let length = localStorage.length;

  const users = props.users
    ? props.users
    : Object.keys(localStorage).map((key) =>
        JSON.parse(localStorage.getItem(key))
      );
  // console.log(users);

  return (
    <div className="outer1">
      <div className="header">
        <p>Show List</p>
        <p> {props.users ? (length = `1: Show`) : `${length}: Shows`}</p>
      </div>
      <hr />
      {users.map((user) => {
        // console.log(user);
        return (
          <>
            <div className="outer-layer">
              <div className="inner-layer">
                <div>
                  <img src={user.screenshots} alt="picture1" />
                </div>
                <div className="serial-title">
                  <span>{user.id}</span>
                  <p>
                    Durations: {Math.floor(user.content_duration / 60)} mins
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    setOpenModal(true);
                    setSingleUser(user);
                  }}
                >
                  View
                </button>
                {/* <button
                  onClick={() => {
                    localStorage.removeItem(user.id);
                    <ShowList />;
                  }}
                >
                  Delete
                </button> */}
              </div>
            </div>
            <hr />
          </>
        );
      })}
      {openModal ? (
        <Modal
          user={singleUser}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      ) : null}
    </div>
  );
};

export default ShowList;
