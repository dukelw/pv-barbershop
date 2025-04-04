import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import styles from "./Signup.module.scss";
import { signup } from "../../redux/apiRequest";
import { Checkbox, FormControlLabel } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const cx = classNames.bind(styles);

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields
    if (!name || !email || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin.");
      setOpenSnackbar(true);
      return;
    }

    if (rememberMe) {
      Cookies.set("email", email, { expires: 7 });
      Cookies.set("password", password, { expires: 7 });
    }

    const user = { name, email, password };
    const result = await signup(user, dispatch, navigate);

    if (result === false) {
      setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
      setOpenSnackbar(true); // Open snackbar if signup fails
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("left-part")}>
          <Link to={"/"}>
            <img
              src="https://res.cloudinary.com/lewisshop/image/upload/v1743512129/toeic/answers/1743512126263-Logo.png.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className={cx("right-part")}>
          <h1 className={cx("title")}>Đăng ký</h1>
          <form
            onSubmit={handleSubmit}
            className={cx("form")}
            style={{ color: "white" }}
          >
            <Box mb={1}>
              <label style={{ color: "white" }}>Tên đăng ký</label>
              <input
                className={cx("input")}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onMouseOver={(e) => (e.target.style.borderColor = "black")}
                onMouseOut={(e) => (e.target.style.borderColor = "white")}
                onFocus={(e) => (e.target.style.borderColor = "white")}
              />
              {!name && openSnackbar && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  Vui lòng nhập tên
                </p>
              )}
            </Box>

            <Box mb={1}>
              <label style={{ color: "white" }}>Email</label>
              <input
                className={cx("input")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onMouseOver={(e) => (e.target.style.borderColor = "black")}
                onMouseOut={(e) => (e.target.style.borderColor = "white")}
                onFocus={(e) => (e.target.style.borderColor = "white")}
              />
              {!email && openSnackbar && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  Vui lòng nhập email
                </p>
              )}
            </Box>

            <Box mb={1}>
              <label style={{ color: "white" }}>Mật khẩu</label>
              <input
                className={cx("input")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!password && openSnackbar && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  Vui lòng nhập mật khẩu
                </p>
              )}
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: "var(--yellow)",
                      "&.Mui-checked": {
                        color: "var(--yellow)",
                      },
                    }}
                  />
                }
                label={
                  <span style={{ color: "white" }}>Ghi nhớ đăng nhập</span>
                }
              />
            </Box>
            <Box sx={{ textAlign: "center" }} mb={2}>
              <Button
                sx={{
                  backgroundColor: "var(--yellow)",
                  color: "var(--dark)",
                  fontWeight: "bold",
                  width: "200px",
                  "&:hover": {
                    backgroundColor: "var(--white)",
                    color: "var(--black)",
                  },
                }}
                type="submit"
                variant="contained"
              >
                Đăng ký
              </Button>
            </Box>
            <Box mb={2}>
              Đã có tài khoản
              <Link
                to="/signin"
                style={{
                  color: "var(--yellow)",
                  marginLeft: "12px",
                  fontWeight: "bold",
                }}
              >
                Đăng nhập
              </Link>
            </Box>
          </form>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <MuiAlert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </MuiAlert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default Signup;
