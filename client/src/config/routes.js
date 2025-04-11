const routes = {
  signin: "/signin",
  signup: "/signup",
  booking: "/booking",
  updateBooking: "/update-appointment/:appointmentID",
  workbench: "/workbench",
  logout: "/logout",
  account: "/account/:userID",
  changePassword: "/change-password/:userID",
  about: "/about",
  gift: "/gifts",
  home: "/",
  notFound: "*",
};

export default routes;
