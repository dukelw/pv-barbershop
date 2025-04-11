import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser, getAllGifts, redeemGift } from "../../redux/apiRequest";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import styles from "./Gift.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Gift() {
  const [gifts, setGifts] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userInfo = currentUser?.metadata.user;
  const [userPoint, setUserPoint] = useState(0);
  const userId = userInfo?._id;

  const handleGetGifts = async () => {
    const data = await getAllGifts(dispatch);
    setGifts(data || []);
  };

  const handleGetUser = async () => {
    const data = await findUser(userId, dispatch);
    setUserPoint(data.metadata.user.point);
  };

  const handleConfirmRedeem = async () => {
    if (selectedGift) {
      const data = await redeemGift(
        accessToken,
        { user_id: userId, gift_id: selectedGift._id, user_points: userPoint },
        dispatch
      );
      if (data) {
        toast.success("Đổi quà thành công", 2000);
        setSelectedGift(null);
        handleGetGifts();
        handleGetUser();
      }
    }
  };

  useEffect(() => {
    handleGetGifts();
    handleGetUser();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <h1 className={cx("title")}>Đổi quà</h1>
      <Typography variant="h5" gutterBottom>
        🎁 Số điểm tích lũy hiện tại của bạn: <strong>{userPoint}</strong>
      </Typography>

      <Grid container spacing={3}>
        {gifts.map((gift) => (
          <Grid item xs={12} sm={6} md={3} key={gift._id}>
            <Card
              sx={{ backgroundColor: "var(--dark)", color: "var(--white)" }}
            >
              <CardMedia
                component="img"
                height="180"
                image={gift.image}
                alt={gift.name}
              />
              <CardContent>
                <Typography variant="h6">{gift.name}</Typography>
                <Typography variant="body2">{gift.description}</Typography>
                <Typography mt={1}>
                  🎯 Cần: <strong>{gift.required_points}</strong> điểm
                </Typography>
                <Typography>📦 Còn: {gift.quantity}</Typography>
                <Typography>
                  📅 {new Date(gift.start_date).toLocaleDateString()} -{" "}
                  {new Date(gift.end_date).toLocaleDateString()}
                </Typography>

                <Button
                  fullWidth
                  sx={{
                    mt: 2,
                    color: "var(--dark)",
                    backgroundColor: "var(--white)",
                  }}
                  disabled={userPoint < gift.required_points}
                  onClick={() => setSelectedGift(gift)}
                >
                  Đổi quà
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirm dialog */}
      <Dialog open={!!selectedGift} onClose={() => setSelectedGift(null)}>
        <DialogTitle>Xác nhận đổi quà</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn đổi <strong>{selectedGift?.name}</strong> với{" "}
            <strong>{selectedGift?.required_points}</strong> điểm không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedGift(null)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleConfirmRedeem}
            variant="contained"
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Gift;
