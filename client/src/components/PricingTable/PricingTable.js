import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import classNames from "classnames/bind";
import styles from "./PricingTable.module.scss";
const cx = classNames.bind(styles);

const services = [
  {
    name: "Cắt tóc",
    price: "100K",
    description: "Tạo kiểu chuyên nghiệp với Pomade.",
  },
  {
    name: "Gội đầu",
    price: "50K",
    description: "Thư giãn với dầu gội cao cấp.",
  },
  {
    name: "Uốn tóc",
    price: "200K",
    description: "Tạo sóng tự nhiên, phong cách hiện đại.",
  },
  {
    name: "Cắt tóc",
    price: "100K",
    description: "Tạo kiểu chuyên nghiệp với Pomade.",
  },
  {
    name: "Gội đầu",
    price: "50K",
    description: "Thư giãn với dầu gội cao cấp.",
  },
  {
    name: "Uốn tóc",
    price: "200K",
    description: "Tạo sóng tự nhiên, phong cách hiện đại.",
  },
];

const PricingTable = () => {
  return (
    <>
      <h4 className={cx("subtitle")}>Do not worry about</h4>
      <h1 className={cx("title")}>Pricing</h1>
      <Grid container spacing={2} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {service.name} - {service.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PricingTable;
