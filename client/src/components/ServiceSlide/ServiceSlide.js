import React, { useState, useEffect, Fragment } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import styles from "./ServiceSlide.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const services = [
  {
    img: "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
    name: "Cắt tóc",
    description: "Tạo kiểu chuyên nghiệp với Pomade.",
  },
  {
    img: "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
    name: "Gội đầu",
    description: "Thư giãn với dầu gội cao cấp.",
  },
  {
    img: "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
    name: "Uốn tóc",
    description: "Tạo sóng tự nhiên, phong cách hiện đại.",
  },
  {
    img: "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
    name: "Nhuộm tóc",
    description: "Màu sắc đa dạng, hợp xu hướng.",
  },
  {
    img: "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
    name: "Dưỡng tóc",
    description: "Phục hồi tóc hư tổn, chắc khỏe.",
  },
  {
    img: "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
    name: "Tẩy tóc",
    description: "Làm sáng nền tóc trước khi nhuộm.",
  },
];

export default function ServiceSlide() {
  const [index, setIndex] = useState(0);
  const itemsPerPage = 5;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h4 className={cx("subtitle")}>About Our</h4>
      <h1 className={cx("title")}>Service</h1>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2}>
            {Array.from({ length: itemsPerPage }).map((_, i) => {
              const currentIndex = (index + i) % services.length;
              const service = services[currentIndex];
              return (
                <Grid item xs={12} sm={4} md={2.4} key={currentIndex}>
                  <Card
                    sx={{
                      height: "350px",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${service.img})`,
                        height: "150px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "background-image 0.5s ease",
                      }}
                    ></div>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        boxShadow: "0 1px 16px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div className={cx("card__content-top")}>
                        <Typography variant="h6" fontWeight="bold">
                          {service.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          mt={1}
                        >
                          {service.description}
                        </Typography>
                      </div>
                      <Button
                        className={cx("card__content-bottom")}
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          backgroundColor: "var(--dark)",
                          color: "var(--white)",
                        }}
                      >
                        Xem thêm
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            marginTop: "20px",
            paddingBottom: "40px",
          }}
        >
          <IconButton
            onClick={handlePrev}
            size="small"
            sx={{
              margin: "0 10px",
              color: "var(--white)",
              backgroundColor: "var(--dark)",
            }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleNext}
            size="small"
            sx={{
              margin: "0 10px",
              color: "var(--white)",
              backgroundColor: "var(--dark)",
            }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
