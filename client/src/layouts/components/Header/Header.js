import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createAxios";
import { useEffect, useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Popover,
  Box,
} from "@mui/material";
import { Notifications, Delete, Check } from "@mui/icons-material";
import {
  deleteAllNotification,
  getNotifications,
  logout,
  markRead,
} from "../../../redux/apiRequest";
import socket from "../../../hooks/useSocket";

const cx = classNames.bind(styles);
function Header() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser);

  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [anchorNotif, setAnchorNotif] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const openNotif = Boolean(anchorNotif);

  const handleNotifClick = (event) => setAnchorNotif(event.currentTarget);
  const handleNotifClose = () => setAnchorNotif(null);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleAvatarClose = () => setAnchorEl(null);

  const handleDeleteAll = async () => {
    await deleteAllNotification(accessToken, userID, dispatch);
    loadNotifications();
  };

  const handleLogout = async () => {
    await logout(accessToken, userID, dispatch, navigate, axiosJWT);
  };

  const loadNotifications = async () => {
    const res = await getNotifications(userID, dispatch);
    if (res?.data) {
      setNotifications(res.data);
      setUnreadCount(res.data.filter((n) => !n.isRead).length);
    }
  };

  const handleMarkRead = async (id) => {
    await markRead(id, dispatch);
    loadNotifications();
  };

  useEffect(() => {
    if (!userID) return;

    socket.emit("join_room", userID);
    loadNotifications();

    socket.on("new_notification", () => {
      loadNotifications();
    });

    return () => socket.off("new_notification");
  }, [userID]);

  return (
    <header className={cx("container")}>
      <div className={cx("left-nav")}>
        <li>
          <Link to={"/booking"}>Đặt lịch</Link>
        </li>
        <li>
          <Link to={"/services"}>Dịch vụ</Link>
        </li>
        <li>
          <Link to={"/about"}>Câu chuyện</Link>
        </li>
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
        {currentUser && (
          <li style={{ visibility: "hidden" }}>
            <Link to={"/"}>Khoảng trắng cân</Link>
          </li>
        )}
        <li>
          <Link to={"/barbers"}>Nhân sự</Link>
        </li>

        {currentUser && (
          <>
            <li>
              <Tooltip title="Thông báo">
                <IconButton onClick={handleNotifClick}>
                  <Badge badgeContent={unreadCount} color="error">
                    <Notifications sx={{ color: "var(--white)" }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </li>

            <Popover
              open={openNotif}
              anchorEl={anchorNotif}
              onClose={handleNotifClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <List sx={{ width: 350, maxHeight: 400, overflowY: "auto" }}>
                {notifications.length !== 0 && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={2}
                    py={1}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Thông báo
                    </Typography>
                    <Button
                      color="error"
                      size="small"
                      onClick={handleDeleteAll}
                      sx={{ textTransform: "none" }}
                    >
                      Xoá tất cả
                    </Button>
                  </Box>
                )}
                {notifications.length === 0 ? (
                  <ListItem>
                    <ListItemText
                      style={{ color: "var(--black)" }}
                      primary="Không có thông báo"
                    />
                  </ListItem>
                ) : (
                  notifications.map((noti) => (
                    <ListItem
                      key={noti._id}
                      sx={{
                        backgroundColor: noti.is_read ? "#f5f5f5" : "#e3f2fd",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ color: "var(--black)" }}
                          >
                            {noti.title}
                          </Typography>
                        }
                        secondary={
                          <p
                            style={{
                              textDecoration: "none",
                              textTransform: "none",
                            }}
                          >
                            {noti.message}
                          </p>
                        }
                      />
                      <ListItemSecondaryAction>
                        {!noti.is_read && (
                          <IconButton onClick={() => handleMarkRead(noti._id)}>
                            <Check />
                          </IconButton>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                )}
              </List>
            </Popover>

            <IconButton onClick={handleAvatarClick}>
              <Avatar
                src={currentUser?.metadata.user.user_avatar}
                alt="User Avatar"
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleAvatarClose}
            >
              <MenuItem onClick={handleAvatarClose}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/gifts"
                >
                  Đổi thưởng
                </Link>
              </MenuItem>
              <MenuItem onClick={handleAvatarClose}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/account/${userID}`}
                >
                  Thông tin tài khoản
                </Link>
              </MenuItem>
              <MenuItem onClick={handleAvatarClose}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/history/${userID}`}
                >
                  Lịch sử đặt lịch
                </Link>
              </MenuItem>
              <MenuItem onClick={handleAvatarClose}>
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/change-password/${userID}`}
                >
                  Đổi mật khẩu
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleAvatarClose();
                  handleLogout();
                }}
              >
                Đăng xuất
              </MenuItem>
            </Menu>
          </>
        )}

        {!currentUser && (
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
    </header>
  );
}

export default Header;
