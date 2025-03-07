import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { publicRoutes, privateRoutes } from "../src/routes";
import "./App.css";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme();

function App() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const isAdmin = currentUser?.metadata.user.isAdmin;

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {currentUser &&
            isAdmin &&
            privateRoutes.map((route, index) => {
              if (route.type === "admin") {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              }
            })}
          {currentUser &&
            !isAdmin &&
            privateRoutes.map((route, index) => {
              if (route.type === "user") {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              }
            })}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
