import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/system";
import styles from "./LookBook.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const images = [
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
  "https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg",
];

const StyledCard = styled(Card)({
  transition: "transform 0.3s ease-in-out",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledCardMedia = styled(CardMedia)({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

function LookBook() {
  return (
    <>
      <h1 className={cx("subtitle")}>Our product here</h1>
      <h1 className={cx("title")}>Look Book</h1>
      <Grid container spacing={2} justifyContent="center" sx={{ pb: 4 }}>
        {images.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <StyledCard>
              <StyledCardMedia
                component="img"
                image={img}
                alt={`Look ${index + 1}`}
              />
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default LookBook;
