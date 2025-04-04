import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createAxios";
import { useEffect } from "react";
import { logout } from "../../redux/apiRequest";

function Logout() {
  const currentUser = useSelector((state) => state.user.signin.currentUser);
  const accessToken = currentUser?.metadata.tokens.accessToken;
  const userID = currentUser?.metadata.user._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser);

  useEffect(() => {
    logout(accessToken, userID, dispatch, navigate, axiosJWT);
  });
  return <h1>Logging out...</h1>;
}

export default Logout;
