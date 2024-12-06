import React, { useState } from "react";
import "./styles.css";
import Input from "../input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();
  const signupWithEmail = () => {
    setLoading(true);
    //console.log(name)
    // eslint-disable-next-line eqeqeq
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user>>>>>", user);
            toast.success("user created!!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            creatDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and ConfirmPassword Don`t Match");
        setLoading(false);
      }
    } else {
      toast.error("All Field are Mendatory!!");
      setLoading(false);
    }
  };

  const creatDoc = async (user) => {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("doc created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("Doc already exists");
      setLoading(false);
    }
  };

  const LoginWithEmail = () => {
    //console.log('email',email)
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("userlogin--", user);
          toast.success("User Logged In !!");
          setEmail("");
          setPassword("");
          setLoading(false);
          navigate("/dhasboard");
        })
        .catch((error) => {
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All Field are Mendatory!!");
      setLoading(false);
    }
  };

  const siginupGoogle = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>>", user);
          creatDoc(user);
          toast.success("User Authenticated!!");
          navigate("/dhasboard");
          setLoading(false);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // The email of the user's account used.
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            LogIn on <span style={{ color: "var(--theme)" }}> financely</span>
          </h2>
          <form>
            <Input
              label={"email"}
              type="email"
              autoComplete="username"
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              label={"password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
              autoComplete="new-password"
            />
            <Button
              text={loading ? "loading..." : "Login Using Email and Password"}
              onClick={LoginWithEmail}
              disable={loading}
            />
            <p style={{ textAlign: "center", margin: 0 }}> or </p>
            <Button
              text={loading ? "loading..." : "Login Using Google"}
              blue={true}
              onClick={siginupGoogle}
              disable={loading}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              {" "}
              or Don`t Have an Accuant Already?Click here.
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            sign up on <span style={{ color: "var(--theme)" }}> financely</span>
          </h2>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              label={"email"}
              type="email"
              autoComplete="username"
              state={email}
              setState={setEmail}
              placeholder={"JohnDoe@gmail.com"}
            />
            <Input
              label={"password"}
              type="password"
              state={password}
              setState={setPassword}
              placeholder={"Example@123"} //style={{textAlign:'center',margin:0}}
              autoComplete="new-password"
            />
            <Input
              label={"confirm password"}
              type="password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
              autoComplete="new-password"
            />
            <Button
              text={loading ? "loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
              disable={loading}
            />
            <p className="p-login"> or </p>
            <Button
              text={loading ? "loading..." : "Signup Using Google"}
              onClick={siginupGoogle}
              blue={true}
              disable={loading}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              {" "}
              or Have an Accuant Already?Click here.
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignupSigninComponent;
