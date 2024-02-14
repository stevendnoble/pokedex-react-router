import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export function Root() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}
