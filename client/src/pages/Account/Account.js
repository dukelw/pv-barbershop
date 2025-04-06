import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createAxios } from "../../createAxios";
import { MenuItem, Typography } from "@mui/material";
import { findUser, updateUser, uploadImage } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./Account.module.scss";

const cx = classNames.bind(styles);

function Account() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);
  const [userInfor,setUserInfor] = useState({});
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
  const [file, setFile] = useState(null); // New state for file

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleToggleEdit = () => {
    setEditable(true);
  };
  const handleGetInfor = async() => {
    const data = await findUser(userID, dispatch)
    setUserInfor(data.metadata.user);
    console.log(data.metadata.user);
    setForm({
        userID: userID,
        name: data.metadata.user?.name || "",
        email: data.metadata.user?.email || "",
        birthday: data.metadata.user?.birthday || "",
        phone: data.metadata.user?.phone || "",
        avatar: data.metadata.user?.avatar || "",
        gender: normalizeGender(data.metadata.user?.gender),
      }
    );
  };

  useEffect(()=>{
    handleGetInfor()
  },[])
  const handleSubmit = async () => {
    try {
      // If file is selected, upload the image first
      if (file) {
        const imageUrl = await uploadImage(file, "avatars", dispatch); // Assuming "avatars" is your folder name
        setForm((prev) => ({ ...prev, avatar: imageUrl.img_url }));
      }

      // Update user information
      await updateUser(accessToken, userID, form, dispatch, axiosJWT);
      await handleGetInfor();
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
            name="name"
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
            name="email"
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
            name="phone"
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
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            disabled={!editable}
          />
          {form.avatar && !editable && (
            <div>
              <img src={form.avatar} alt="Avatar" width="100" />
            </div>
          )}
          {editable && (
            <div>
              <input type="file" onChange={handleFileChange} />
              {file && <img src={URL.createObjectURL(file)} alt="Avatar Preview" width="100" />}
            </div>
          )}
        </div>

        <div className={cx("box")}>
          <label className={cx("label")}>Giới tính</label>
          <select
            className={cx("input")}
            name="gender"
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
