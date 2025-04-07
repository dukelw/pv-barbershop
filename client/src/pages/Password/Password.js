import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { changePassword } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./Password.module.scss";

const cx = classNames.bind(styles);

function Password() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;

  const axiosJWT = createAxios(currentUser);
  const dispatch = useDispatch();

  const userEmail = currentUser?.metadata.user?.user_email || "";

  const [form, setForm] = useState({
    password: "",
    new_password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("currentUser:", currentUser);
    e.preventDefault();

    if (!form.password || !form.new_password || !form.confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (form.new_password !== form.confirmPassword) {
      toast.error("Xác nhận mật khẩu mới không trùng khớp!");
      return;
    }

    try {
      console.log(userEmail)
      const res = await changePassword(
        accessToken,
        userID,
        {
          email: userEmail,
          password: form.password,
          new_password: form.new_password,
        },
        dispatch,
        axiosJWT
      );

      if (res && res.metadata) {
        toast.success("Đổi mật khẩu thành công!");
        setForm({
          password: "",
          new_password: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Đổi mật khẩu thất bại!");
      }
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại!");
    }
  };

  return (
    <div className={cx("change-password-container")}>
      <h2>
        Đổi mật khẩu
      </h2>

      <form className={cx("form")} onSubmit={handleSubmit}>
        <div className={cx("form-group")}>
          <label>Mật khẩu hiện tại</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu hiện tại"
          />
        </div>

        <div className={cx("form-group")}>
          <label>Mật khẩu mới</label>
          <input
            type="password"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu mới"
          />
        </div>

        <div className={cx("form-group")}>
          <label>Xác nhận mật khẩu mới</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Xác nhận mật khẩu mới"
          />
        </div>

        <button type="submit" className={cx("submit-button")}>
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
}

export default Password;
