import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Booking.module.scss";
import {
  createAppointment,
  createNotification,
  findAllFreeBarber,
  findReceptionists,
  getAllServices,
} from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

const cx = classNames.bind(styles);

const availableTimes = Array.from({ length: 7 }, (_, i) => `${8 + i * 2}:00`);

function Booking() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const [allServices, setServices] = useState([]);
  const [endTime, setEndTime] = useState("");
  const [barbers, setBarbers] = useState([]);
  const [receptionists, setReceptionists] = useState([]);
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
      const updatedServices = checked
        ? [...formData.services, value]
        : formData.services.filter((s) => s !== value);

      setFormData((prevData) => ({
        ...prevData,
        services: updatedServices,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeEndTime = (updatedServices = formData.services) => {
    if (formData.date && formData.time) {
      const fullDateTime = `${formData.date} ${formData.time}`;
      const startMoment = moment(fullDateTime, "YYYY-MM-DD HH:mm");

      const selectedServiceDetails = allServices.filter((s) =>
        updatedServices.includes(s._id)
      );

      // Tính tổng thời gian các dịch vụ
      const totalDuration = selectedServiceDetails.reduce(
        (sum, s) => sum + s.service_duration,
        0
      );

      const calculatedEndTime = startMoment
        .clone()
        .add(totalDuration, "minutes")
        .format("YYYY-MM-DD HH:mm");

      setEndTime(calculatedEndTime);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullDateTime = `${formData.date} ${formData.time}`;

    const appointment = {
      customer: currentUser ? userID : null,
      barber: formData.technician === "" ? null : formData.technician,
      service: formData.services,
      start: fullDateTime,
      customer_name: formData.name,
      phone_number: formData.phone,
      notes: formData.note,
      end: endTime,
    };
    const data = await createAppointment(appointment, dispatch);

    if (data) {
      for (const r of receptionists) {
        await createNotification(
          accessToken,
          {
            user: r._id,
            title: "New Appointment",
            message: `Customer ${
              formData.name
            } has booked an appointment at ${moment(fullDateTime).format(
              "HH:mm DD/MM/YYYY"
            )}`,
            data: data.metadata,
            is_read: false,
          },
          dispatch
        );
      }

      toast.success("Đặt lịch thành công! Vào Lịch sử đặt lịch để kiểm tra.");

      setFormData({
        phone: "",
        name: "",
        guests: 1,
        technician: "",
        services: [],
        date: "",
        time: "",
        note: "",
      });

      setEndTime("");
    }
  };

  const handleGetService = async () => {
    const data = await getAllServices(dispatch);
    setServices(data.metadata);
  };

  const handleGetBarber = async () => {
    if (formData.date && formData.time && formData.services.length !== 0) {
      const fullDateTime = `${formData.date} ${formData.time}`;
      const startMoment = moment(fullDateTime, "YYYY-MM-DD HH:mm");
      const data = await findAllFreeBarber("", startMoment, endTime, dispatch);
      setBarbers(data.metadata);
    } else {
      const data = await findAllFreeBarber("", "", "", dispatch);
      setBarbers(data.metadata);
    }
  };

  const handleGetReceptionist = async () => {
    const data = await findReceptionists(dispatch);
    console.log("Receptionist", data);
    setReceptionists(data.metadata);
  };

  useEffect(() => {
    handleGetService();
    handleGetBarber();
    handleGetReceptionist();
  }, []);

  useEffect(() => {
    handleGetBarber();
  }, [endTime]);

  useEffect(() => {
    handleChangeEndTime(formData.services);
  }, [formData.date, formData.time, formData.services]);

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>Đặt Lịch</h1>
      <Divider
        sx={{ my: 2, bgcolor: "black", height: 2, width: "800px", mt: 0 }}
      />
      <Typography color="primary" fontWeight="bold">
        Lưu ý: Hãy đăng ký tài khoản trước khi đặt lịch để hưởng các ưu đãi về
        tích điểm đổi thưởng cũng như giảm giá!
      </Typography>
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
          <label className={cx("label")}>Dịch Vụ *</label>
          {allServices?.map((service, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  name="services"
                  value={service._id}
                  checked={formData.services.includes(service._id)}
                  onChange={handleChange}
                />
              }
              label={`${service.service_name} (${service.service_duration} phút) - Giá: ${service.service_price} VND`}
            />
          ))}
        </Box>
        {endTime && (
          <Typography color="primary" fontWeight="bold">
            Kết thúc dự kiến: {moment(endTime).format("DD-MM-YYYY HH:mm")}
          </Typography>
        )}
        <Box mb={2} className={cx("box")}>
          <label className={cx("label")}>Yêu Cầu Thợ</label>
          <select
            className={cx("input")}
            name="technician"
            value={formData.technician}
            onChange={handleChange}
          >
            <option value="">Chọn Thợ</option>
            {barbers.map((barber) => (
              <option key={barber._id} value={barber._id}>
                {barber.user_name}
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
