import React from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const Modal = ({ openModal, setOpenModal, user }) => {
  return (
    <ReactModal
      isOpen={openModal}
      onRequestClose={() => setOpenModal(false)}
      style={{
        overlay: {},
        content: {
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "4px",
        },
      }}
    >
      <h3 style={{ position: "sticky" }}>{user.id}</h3>

      <div style={{ flex: "1", overflowY: "scroll", overflowX: "hidden" }}>
        {Object.keys(user).map((property) => (
          <React.Fragment key={property}>
            {/* console.log(property); */}
            {/* {console.log(props.users[property])} */}
            <fieldset>
              <legend>{property}</legend>
              <table>
                <tbody>
                  <tr>
                    <td>{user[property] ? user[property] : "null"}</td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
          </React.Fragment>
        ))}
      </div>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <button onClick={() => setOpenModal(false)}>Close</button>
      </div>
    </ReactModal>
  );
};

export default Modal;
