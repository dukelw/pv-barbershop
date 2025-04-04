import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  Twitter,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "var(--dark)",
        color: "white",
        py: 5,
        width: "100vw",
      }}
    >
      <Container style={{ width: "1400px" }}>
        <Grid container spacing={4}>
          {/* Cột 1 */}
          <Grid item xs={12} md={4} textAlign="left">
            <Typography variant="h5" fontWeight="bold">
              MAN HAIRCUT
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>
              "Chúng tôi chăm sóc mái tóc của bạn, tôn vinh phong cách của bạn."
            </Typography>
            <img
              src="https://res.cloudinary.com/lewisshop/image/upload/v1743512129/toeic/answers/1743512126263-Logo.png.png"
              alt=""
            />
            <Box mt={2}>
              <IconButton sx={{ color: "white" }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Twitter />
              </IconButton>
            </Box>
          </Grid>

          {/* Cột 2 */}
          <Grid item xs={12} md={4} textAlign="left">
            <Typography variant="h6" fontWeight="bold">
              Liên hệ với chúng tôi
            </Typography>
            <TextField
              fullWidth
              label="Email của bạn"
              variant="filled"
              sx={{ backgroundColor: "white", borderRadius: 1, mt: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              style={{ backgroundColor: "var(--white)", color: "var(--dark)" }}
            >
              Gửi
            </Button>
          </Grid>

          {/* Cột 3 */}
          <Grid item xs={12} md={4} textAlign="left">
            <Typography variant="h6" fontWeight="bold">
              Liên kết
            </Typography>
            <section className={cx("contact-information")}>
              <div className={cx("contact-part")}>
                <Email sx={{ mr: 1, fontSize: "1.2rem" }} />
                <p className={cx("text")}>thevi16102004@gmail.com</p>
              </div>
              <div className={cx("contact-part")}>
                <Phone sx={{ mr: 1, fontSize: "1.2rem" }} />
                <p className={cx("text")}>+84 123 456 789</p>
              </div>
              <div className={cx("contact-part")}>
                <LocationOn sx={{ mr: 1, fontSize: "1.2rem" }} />
                <p className={cx("text")}>123 Đường ABC, TP.HCM</p>
              </div>
            </section>
            <Typography mt={2} variant="h6" fontWeight="bold">
              Lookbook
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              gap={1}
              flexWrap="wrap"
              sx={{marginTop: "12px"}}
            >
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Box
                  key={index}
                  component="img"
                  src={`https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1.jpg`}
                  sx={{ width: 60, height: 60, borderRadius: 1 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" textAlign="center" mt={4}>
          © {new Date().getFullYear()} BarberShop. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
