import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../Fixed_component/Navbar";
import Footer from "../Fixed_component/Footer";

export default function Main_Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
