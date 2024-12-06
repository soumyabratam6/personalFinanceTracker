import React from "react";
import Header from "../components/Hearder";
import SignupSigninComponent from "../components/SignupSignin";
const Signup = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SignupSigninComponent />
      </div>
    </div>
  );
};

export default Signup;
