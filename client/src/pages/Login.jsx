import React from "react";
import axiosURL from "../axiosConfig/axiosConfig";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if (!emailValue || !passwordValue) {
      alert("please fill in all fields");
      return;
    }
    try {
      await axiosURL.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      alert("logged in successfully");
      // localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="rows">
          <span>Email: </span>
          <input type="email" placeholder="email" ref={emailDom} />
        </div>
        <br />
        <div className="rows">
          <span>Password: </span>
          <input type="password" placeholder="password" ref={passwordDom} />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Login;
