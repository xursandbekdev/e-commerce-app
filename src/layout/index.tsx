import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Layout: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} />
      <Outlet context={{ searchValue }} />
    </>
  );
};

export default Layout;
