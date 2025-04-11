import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./MainHeader.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createAxios";
import { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { logout } from "../../../redux/apiRequest";

const cx = classNames.bind(styles);
function MainHeader() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };
  return (
    <header className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("left-nav")}>
          <li>
            <Link to={"/booking"}>Đặt lịch</Link>
          </li>
          <li>
            <Link to={"/service"}>Dịch vụ</Link>
          </li>
          {!currentUser ? (
            <li style={{ visibility: "hidden" }}>
              <Link to={"/"}>Dịch vụ</Link>
            </li>
          ) : (
            <></>
          )}
        </div>
        <div className={cx("logo")}>
          <Link to={"/"}>
            <img
              src="https://res.cloudinary.com/lewisshop/image/upload/v1743512129/toeic/answers/1743512126263-Logo.png.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className={cx("right-nav")}>
          <li>
            <Link to={"/barber"}>Nhân sự</Link>
          </li>
          {currentUser ? (
            <div>
              <IconButton onClick={handleClick}>
                <Avatar
                  src={currentUser?.metadata.user.user_avatar}
                  alt="User Avatar"
                />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/my-bookings"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Xem lịch cắt tóc
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/gifts"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Đổi thưởng
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to={`/account/${userID}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Thông tin tài khoản
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to={`/change-password/${userID}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Đổi mật khẩu
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleLogout();
                  }}
                >
                  Đăng xuất
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <li>
                <Link to={"/signin"}>Đăng nhập</Link>
              </li>
              <li>
                <Link to={"/signup"}>Đăng ký</Link>
              </li>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
