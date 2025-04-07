import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { changePassword } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./Password.module.scss";
// Nếu muốn dùng icon:
import { Password as PasswordIcon } from "@mui/icons-material";

const cx = classNames.bind(styles);

function Password() {
  // Lấy thông tin user + token từ Redux (hoặc chỗ khác, tuỳ cấu trúc dự án)
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;

  // Tạo axiosJWT
  const axiosJWT = createAxios(currentUser);
  const dispatch = useDispatch();

  // Lấy email trực tiếp từ Redux để gửi lên server (không cho người dùng nhập)
  const userEmail = currentUser?.metadata.user?.user_email || "";

  // State quản lý dữ liệu form
  const [form, setForm] = useState({
    // API yêu cầu: "password" là mật khẩu cũ, "new_password" là mật khẩu mới
    password: "",
    new_password: "",
    confirmPassword: "",
  });

  // Hàm xử lý khi có thay đổi trong các ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm submit khi người dùng bấm nút "Đổi mật khẩu"
  const handleSubmit = async (e) => {
    console.log("currentUser:", currentUser);
    e.preventDefault();

    // Kiểm tra đầy đủ trường
    if (!form.password || !form.new_password || !form.confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra khớp mật khẩu mới
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

      // Nếu server trả về kết quả thành công
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
        <PasswordIcon />
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
