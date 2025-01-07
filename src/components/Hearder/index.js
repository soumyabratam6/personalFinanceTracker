import React, { useEffect } from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userSvg from "../../assets/user.svg";
const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }else{
      navigate("/dhasboard");
    }
  }, [user, loading, navigate]);

  const logoutFun = () => {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logout Succesfully!!");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="navber">
      <p className="logo">financely</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* {console.log('User photoURL:', user.photoURL)} */}
          <img
            src={user.photoURL? user.photoURL: userSvg}
            alt="image_user"
            width={user.photoURL ? "32" : "24"}
            style={{ borderRadius: "50%" }}
          />
          <p className="logo link" onClick={logoutFun}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
