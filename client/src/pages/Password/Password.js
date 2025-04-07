import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createAxios";
import { changePassword } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import classNames from "classnames/bind";
import styles from "./ChangePassword.module.scss";

const cx = classNames.bind(styles);

function ChangePasswordForm() {
  // Lấy thông tin user + token từ Redux
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  // Khởi tạo axiosJWT
  const axiosJWT = createAxios(currentUser);

  const dispatch = useDispatch();

  // State quản lý dữ liệu form
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
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
    e.preventDefault();

    // Kiểm tra đầy đủ trường
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    // Kiểm tra mật khẩu mới và xác nhận
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Xác nhận mật khẩu mới không trùng khớp!");
      return;
    }

    try {
      // Gửi request đổi mật khẩu
      const res = await changePassword(
        accessToken,
        userID,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        dispatch,
        axiosJWT
      );

      // Nếu server trả về kết quả thành công
      if (res && res.metadata) {
        toast.success("Đổi mật khẩu thành công!");
        setForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        // Xử lý khi server trả về lỗi
        toast.error("Đổi mật khẩu thất bại!");
      }
    } catch (error) {
      toast.error("Đổi mật khẩu thất bại!");
    }
  };

  return (
    <div className={cx("change-password-container")}>
      <h2>Đổi mật khẩu</h2>
      <form className={cx("form")} onSubmit={handleSubmit}>
        <div className={cx("form-group")}>
          <label>Mật khẩu hiện tại</label>
          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu hiện tại"
          />
        </div>

        <div className={cx("form-group")}>
          <label>Mật khẩu mới</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
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

export default ChangePasswordForm;
