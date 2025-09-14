import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Layout: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="bg-bg min-h-screen" >
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Outlet context={{ searchValue }} />
    </div>
  );
};

export default Layout;
