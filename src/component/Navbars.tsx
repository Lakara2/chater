import React from "react";
import LogOut from "@/component/LogOut";

export default function Navbars() {
  return (<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example">
    <div className="container-xl">
      <a className="navbar-brand" href="/profile">Chater-app</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExample07XL">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/profile">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/channel">Channel</a>
          </li>
          <li>
            <a className="nav-link" href="/createchannel">Create Channel</a>
          </li>
        </ul>
        <form>
          <LogOut/>
        </form>
      </div>
    </div>
    </nav>
    </>
    )
}



