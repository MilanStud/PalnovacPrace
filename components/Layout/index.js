import "./layout.css";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="App" name="layout-body">
      <h1>Plánovač práce</h1>
      <div className="Page" name="outlet-body">
        <Outlet /> {/* to co je definovane route path vlozi Outlet sem */}
      </div>
    </div>
  );
}
