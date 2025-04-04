import { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
const cx = classNames.bind(styles);

const availableTimes = Array.from({ length: 7 }, (_, i) => `${8 + i * 2}:00`);

function Booking() {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    guests: 1,
    technician: "",
    services: [],
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        services: checked
          ? [...prevData.services, value]
          : prevData.services.filter((s) => s !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullDateTime = `${formData.date} ${formData.time}`;
    console.log("Form Data Submitted: ", { ...formData, fullDateTime });
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>Đặt Lịch</h1>
      <Divider
        sx={{ my: 2, bgcolor: "black", height: 2, width: "800px", mt: 0 }}
      />
      <form onSubmit={handleSubmit} className={cx("form")}>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Số Điện Thoại *</label>
          <input
            className={cx("input")}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Họ Và Tên *</label>
          <input
            className={cx("input")}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Tổng Số Khách</label>
          <input
            className={cx("input")}
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
          />
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Yêu Cầu Thợ *</label>
          <select
            className={cx("input")}
            name="technician"
            value={formData.technician}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Thợ</option>
            <option value="th1">Thợ 1</option>
            <option value="th2">Thợ 2</option>
          </select>
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Dịch Vụ *</label>
          {["Dịch vụ 1", "Dịch vụ 2", "Dịch vụ 3"].map((service, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  name="services"
                  value={service}
                  checked={formData.services.includes(service)}
                  onChange={handleChange}
                />
              }
              label={service}
            />
          ))}
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Ngày Đặt *</label>
          <input
            className={cx("input")}
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Giờ Đặt *</label>
          <select
            className={cx("input")}
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Chọn giờ</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Box>
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Ghi Chú</label>
          <textarea
            className={cx("input")}
            name="note"
            value={formData.note}
            onChange={handleChange}
          ></textarea>
        </Box>
        <Box mb={2} className={cx("box")} sx={{ textAlign: "center" }}>
          <Button
            type="submit"
            sx={{
              backgroundColor: "var(--yellow)",
              color: "var(--dark)",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "var(--white)",
                color: "var(--black)",
              },
            }}
            fullWidth
            variant="contained"
          >
            Đặt Lịch
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Booking;
