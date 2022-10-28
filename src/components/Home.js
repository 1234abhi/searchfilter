import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ShowList from "./ShowList";

const Home = () => {
  const [searchbar, setSearchbar] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState(null);
  // const [allKeys, setAllKeys] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchbar === "") {
      setError("Please enter data");
      return;
    }

    // let data;
    // let key;
    // if (users && users.id === searchbar) {
    //   data = localStorage.getItem(`${users.id}`);
    //   key = localStorage.key(data);
    //   console.log(key);
    //   setUsers(JSON.parse(data));
    //   return;
    // }
    let data;
    if (localStorage.length > 0) {
      const keys = Object.keys(localStorage);
      for (let key of keys) {
        if (key === searchbar.trim()) {
          data = localStorage.getItem(key);
          setUsers(JSON.parse(data));
          return;
        }
      }
    }

    // if (users) console.log(users.id);

    const fetchDetails = () => {
      // if (data) localStorage.removeItem(`${users.id}`);
      axios
        .get(
          `https://vodlib-akprox.zee5.com/netmagic/${searchbar.trim()}?username=z5xvod&password=Eam6OoWeek2jievu`
        )
        .then((res) => {
          let error = res.data.error;
          if (error) {
            setError(error);
            setUsers(null);
            return;
          } else {
            setUsers(res.data);
          }
        })
        .catch((err) => console.log(err));
    };

    fetchDetails();
  };
  return (
    <>
      <div className="outer">
        <div className="heading">Zee5</div>
        <div className="search-bar">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search"
              value={searchbar}
              onChange={(e) => setSearchbar(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      {localStorage.length > 0 && searchbar === "" ? (
        <>
          {/* {Object.keys(localStorage).map((key) => {
            console.log(key);
            return (
              <ShowList
                key={key}
                users={JSON.parse(localStorage.getItem(key))}
              />
            );
          })} */}
          <ShowList />
        </>
      ) : null}
      {users ? (
        <>
          {localStorage.setItem(`${users.id}`, JSON.stringify(users))}
          {/* {console.log(users)} */}
          <ShowList users={[users]} />
        </>
      ) : (
        <div>
          <h1>{error}</h1>
        </div>
      )}
    </>
  );
};

export default Home;
