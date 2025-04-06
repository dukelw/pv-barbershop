import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import classNames from "classnames/bind";
import styles from "./Account.module.scss";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createAxios } from "../../createAxios";
import {
  MenuItem,
  Alert,
  Typography,
} from "@mui/material";

function Account() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const axiosJWT = createAxios(currentUser);

  const userInfor = currentUser?.metadata.user;

  // Convert gender value if it's object
  const normalizeGender = (gender) => {
    if (typeof gender === "string") return gender;
    if (gender === null || typeof gender !== "object") return "unknown";
    return "unknown";
  };

  const [form, setForm] = useState({
    user_name: userInfor?.user_name || "",
    user_email: userInfor?.user_email || "",
    user_gender: normalizeGender(userInfor?.user_gender),
    user_phone: userInfor?.user_phone || "",
    user_avatar: userInfor?.user_avatar || "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosJWT.put(
        `/api/users/${userID}`,
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSnackbar({ open: true, message: "Cập nhật thành công", severity: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Cập nhật thất bại", severity: "error" });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Thông tin tài khoản
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Họ và tên"
          name="user_name"
          value={form.user_name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Email"
          name="user_email"
          value={form.user_email}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Số điện thoại"
          name="user_phone"
          value={form.user_phone}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Avatar URL"
          name="user_avatar"
          value={form.user_avatar}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          select
          label="Giới tính"
          name="user_gender"
          value={form.user_gender}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="male">Nam</MenuItem>
          <MenuItem value="female">Nữ</MenuItem>
          <MenuItem value="unknown">Không rõ</MenuItem>
        </TextField>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Cập nhật
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Account;
