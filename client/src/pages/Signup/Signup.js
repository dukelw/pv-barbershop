import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import styles from "./Signup.module.scss";
import { sendOtp, signup, verifyOtp } from "../../redux/apiRequest";
import { Checkbox, FormControlLabel, Modal, TextField } from "@mui/material";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [otp, setOtp] = useState("");
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      await sendOtp(email);
      toast.info("Đã gửi mã OTP đến email của bạn.");
      setOpenOtpModal(true);
    } catch (error) {
      toast.error("Gửi OTP thất bại.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(email, otp);
      console.log("data", res);

      if (res.metadata.verified) {
        if (rememberMe) {
          Cookies.set("email", email, { expires: 7 });
          Cookies.set("password", password, { expires: 7 });
        }

        const user = { name, email, password };
        const result = await signup(user, dispatch, navigate);

        if (result === false) {
          toast.error("Đăng ký thất bại. Vui lòng thử lại.");
        } else {
          toast.success("Đăng ký thành công!");
        }

        setOpenOtpModal(false);
      } else {
        toast.error("Mã OTP không đúng.");
      }
    } catch (error) {
      toast.error("Xác minh OTP thất bại.");
    }
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
          <form onSubmit={handleSubmit} className={cx("form")}>
            <Box mb={1}>
              <label style={{ color: "white" }}>Tên đăng ký</label>
              <input
                className={cx("input")}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box mb={1}>
              <label style={{ color: "white" }}>Email</label>
              <input
                className={cx("input")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <Box mb={1}>
              <label style={{ color: "white" }}>Mật khẩu</label>
              <div className={cx("input-wrapper")}>
                <input
                  className={cx("input")}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className={cx("toggle-password")}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
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
              Đã có tài khoản?
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
        </div>
      </div>

      {/* Modal nhập OTP */}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={openOtpModal}
        onClose={() => setOpenOtpModal(false)}
      >
        <Box
          sx={{
            backgroundColor: "var(--white)",
            width: "800px",
            padding: "40px",
            height: "200px",
            outline: "unset",
          }}
          className={cx("otp-modal")}
        >
          <h2>Xác thực OTP</h2>
          <TextField
            fullWidth
            label="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            onClick={handleVerifyOtp}
            variant="contained"
            fullWidth
            sx={{
              marginTop: 2,
              backgroundColor: "var(--yellow)",
              color: "var(--dark)",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "var(--white)",
                color: "var(--black)",
              },
            }}
          >
            Xác nhận OTP
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Signup;
