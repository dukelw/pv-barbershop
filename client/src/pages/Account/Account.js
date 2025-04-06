import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createAxios } from "../../createAxios";
import { MenuItem, Typography } from "@mui/material";
import { updateUser } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./Account.module.scss";

const cx = classNames.bind(styles);

function Account() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const userInfor = currentUser?.metadata.user;
  const dispatch = useDispatch();

  const normalizeGender = (gender) => (typeof gender === "string" ? gender : "unknown");

  const [form, setForm] = useState({
    userID: userID,
    name: userInfor?.user_name || "",
    email: userInfor?.user_email || "",
    birthday: userInfor?.user_birthday || "",
    phone: userInfor?.user_phone || "",
    avatar: userInfor?.user_avatar || "",
    gender: normalizeGender(userInfor?.user_gender),
    
  });

  const [editable, setEditable] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = () => {
    setEditable(true);
  };

  const handleSubmit = async () => {
    try {
      await updateUser(accessToken, userID, form, dispatch, axiosJWT);
      toast.success("Cập nhật thành công");
      setEditable(false);
    } catch (err) {
      console.error(err);
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>Thông tin tài khoản</div>

      <form className={cx("form")}>
        <div className={cx("box")}>
          <label className={cx("label")}>Họ và tên</label>
          <input
            className={cx("input")}
            type="text"
            name="name" // sửa lại name
            value={form.name}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>

        <div className={cx("box")}>
          <label className={cx("label")}>Email</label>
          <input
            className={cx("input")}
            type="email"
            name="email" // sửa lại name
            value={form.email}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>

        <div className={cx("box")}>
          <label className={cx("label")}>Số điện thoại</label>
          <input
            className={cx("input")}
            type="text"
            name="phone" // sửa lại name
            value={form.phone}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>

        <div className={cx("box")}>
          <label className={cx("label")}>Avatar URL</label>
          <input
            className={cx("input")}
            type="text"
            name="avatar" // sửa lại name
            value={form.avatar}
            onChange={handleChange}
            disabled={!editable}
          />
        </div>

        <div className={cx("box")}>
          <label className={cx("label")}>Giới tính</label>
          <select
            className={cx("input")}
            name="gender" // sửa lại name
            value={form.gender}
            onChange={handleChange}
            disabled={!editable}
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="unknown">Không rõ</option>
          </select>
        </div>

        <button
          type="button"
          onClick={!editable ? handleToggleEdit : handleSubmit}
        >
          {!editable ? "Cập nhật" : "Lưu"}
        </button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <MuiAlert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default Account;
