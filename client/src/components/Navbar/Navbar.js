import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "var(--blue)" }}>
      <Toolbar>
        <Button
          sx={{ marginLeft: "auto" }}
          color="inherit"
          component={Link}
          to="/"
        >
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
