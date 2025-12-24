import React, { Fragment } from "react";
import { Outlet } from "react-router";
import Footer from "~/components/footer";

export default function BookingWrapper() {
  return (
    <Fragment>
      <Outlet />
      <Footer />
    </Fragment>
  );
}
