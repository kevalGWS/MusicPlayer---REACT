import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";

const Nav = (a) => {
  const openLibHandler = () => {
    a.setLibStatus(!a.libStatus);
  };

  return (
    <nav>
      <h1>Waves</h1>
      <button className={a.libStatus ? "library-active" : ""} onClick={openLibHandler}>
        Library
        <FontAwesomeIcon icon={faHeadphones}></FontAwesomeIcon>
      </button>
    </nav>
  );
};

export default Nav;
